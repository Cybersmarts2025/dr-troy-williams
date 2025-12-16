import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Upload, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

interface SubmissionFormProps {
  moduleNumber: number;
  moduleName: string;
  enrollmentId: string;
  existingSubmission?: any;
  onSubmissionComplete: () => void;
}

const SubmissionForm: React.FC<SubmissionFormProps> = ({
  moduleNumber,
  moduleName,
  enrollmentId,
  existingSubmission,
  onSubmissionComplete
}) => {
  const { user } = useAuth();
  const [submissionContent, setSubmissionContent] = useState(existingSubmission?.submission_content || '');
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    const validFiles = selectedFiles.filter(file => {
      const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'];
      const maxSize = 10 * 1024 * 1024; // 10MB
      
      if (!validTypes.includes(file.type)) {
        toast.error(`${file.name} is not a supported file type. Please upload PDF, DOCX, or PPTX files.`);
        return false;
      }
      
      if (file.size > maxSize) {
        toast.error(`${file.name} is too large. Maximum file size is 10MB.`);
        return false;
      }
      
      return true;
    });
    
    setFiles(validFiles);
  };

  const uploadFiles = async (): Promise<string[]> => {
    if (!user || files.length === 0) return [];

    const uploadedUrls: string[] = [];
    
    for (const file of files) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${moduleNumber}/${Date.now()}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from('mentorship-submissions')
        .upload(fileName, file);

      if (error) {
        console.error('Upload error:', error);
        throw new Error(`Failed to upload ${file.name}`);
      }

      if (data) {
        const { data: urlData } = supabase.storage
          .from('mentorship-submissions')
          .getPublicUrl(data.path);
        
        uploadedUrls.push(urlData.publicUrl);
      }
    }
    
    return uploadedUrls;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!user || !submissionContent.trim()) {
      toast.error('Please enter your submission content');
      return;
    }

    setSubmitting(true);
    setUploading(true);

    try {
      // Upload files first
      const fileUrls = await uploadFiles();
      
      const submissionData = {
        enrollment_id: enrollmentId,
        user_id: user.id,
        module_number: moduleNumber,
        module_name: moduleName,
        submission_content: submissionContent.trim(),
        file_urls: fileUrls,
        status: 'submitted',
        grade_status: 'pending'
      };

      if (existingSubmission) {
        // Update existing submission
        const { error } = await supabase
          .from('module_submissions')
          .update(submissionData)
          .eq('id', existingSubmission.id);

        if (error) throw error;
        toast.success('Submission updated successfully!');
      } else {
        // Create new submission
        const { error } = await supabase
          .from('module_submissions')
          .insert([submissionData]);

        if (error) throw error;
        toast.success('Submission created successfully!');
      }

      // Update progress
      await supabase
        .from('student_progress')
        .upsert({
          enrollment_id: enrollmentId,
          user_id: user.id,
          module_number: moduleNumber,
          status: 'completed',
          completed_at: new Date().toISOString()
        });

      onSubmissionComplete();
      
    } catch (error) {
      console.error('Submission error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to submit assignment');
    } finally {
      setSubmitting(false);
      setUploading(false);
    }
  };

  const getSubmissionStatus = () => {
    if (!existingSubmission) return null;
    
    const statusColors = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'pass': 'bg-green-100 text-green-800',
      'redo': 'bg-red-100 text-red-800'
    };
    
    return (
      <Badge className={statusColors[existingSubmission.grade_status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800'}>
        {existingSubmission.grade_status === 'pending' && <AlertCircle className="w-3 h-3 mr-1" />}
        {existingSubmission.grade_status === 'pass' && <CheckCircle className="w-3 h-3 mr-1" />}
        {existingSubmission.grade_status === 'redo' && <AlertCircle className="w-3 h-3 mr-1" />}
        {existingSubmission.grade_status.toUpperCase()}
        {existingSubmission.score && ` (${existingSubmission.score}/${existingSubmission.max_score})`}
      </Badge>
    );
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-[#3C3B6E]" />
            Submit Assignment - {moduleName}
          </CardTitle>
          {getSubmissionStatus()}
        </div>
      </CardHeader>

      <CardContent>
        {existingSubmission?.instructor_feedback && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Instructor Feedback:</h4>
            <p className="text-blue-800">{existingSubmission.instructor_feedback}</p>
            {existingSubmission.reviewed_at && (
              <p className="text-xs text-blue-600 mt-2">
                Reviewed on {new Date(existingSubmission.reviewed_at).toLocaleDateString()}
              </p>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Assignment Submission <span className="text-red-500">*</span>
            </label>
            <Textarea
              value={submissionContent}
              onChange={(e) => setSubmissionContent(e.target.value)}
              placeholder="Enter your assignment submission here. Follow the module requirements and rubric..."
              className="min-h-[200px] resize-none"
              required
              disabled={submitting}
            />
            <p className="text-xs text-gray-500 mt-1">
              Minimum 100 words required. Be clear, concise, and follow the rubric criteria.
            </p>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              Upload Files (Optional)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
              <div className="text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-4">
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <span className="mt-2 block text-sm font-medium text-gray-900">
                      Upload PDF, DOCX, or PPTX files
                    </span>
                    <span className="mt-1 block text-xs text-gray-500">
                      Maximum 10MB per file
                    </span>
                  </label>
                  <Input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    multiple
                    accept=".pdf,.docx,.pptx"
                    onChange={handleFileSelect}
                    disabled={submitting}
                  />
                </div>
              </div>
            </div>
            
            {files.length > 0 && (
              <div className="mt-4 space-y-2">
                <p className="text-sm font-medium">Selected Files:</p>
                {files.map((file, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                    <FileText className="h-4 w-4" />
                    <span>{file.name}</span>
                    <span className="text-xs">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <Button
              type="submit"
              disabled={!submissionContent.trim() || submitting}
              className="bg-[#3C3B6E] hover:bg-[#2A2952]"
            >
              {submitting ? (
                uploading ? 'Uploading Files...' : 'Submitting...'
              ) : existingSubmission ? 'Update Submission' : 'Submit Assignment'}
            </Button>
            
            {existingSubmission && (
              <Button
                type="button"
                variant="outline"
                onClick={onSubmissionComplete}
                disabled={submitting}
              >
                Cancel
              </Button>
            )}
          </div>
        </form>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium mb-2">Submission Guidelines:</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Follow the module rubric and requirements exactly</li>
            <li>• Use professional language and proper formatting</li>
            <li>• Submit files in PDF, DOCX, or PPTX format only</li>
            <li>• You can update your submission until it's graded</li>
            <li>• Grading uses Pass/Redo system (7+ points = Pass)</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubmissionForm;