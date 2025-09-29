import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  GraduationCap, 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  User,
  Download,
  Calendar,
  Star
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface Submission {
  id: string;
  enrollment_id: string;
  user_id: string;
  module_number: number;
  module_name: string;
  submission_content: string;
  file_urls: string[];
  submitted_at: string;
  status: string;
  grade_status: string;
  score?: number;
  max_score: number;
  instructor_feedback?: string;
  reviewed_at?: string;
  // Join data from enrollment
  student_email?: string;
  student_name?: string;
}

interface Student {
  id: string;
  email: string;
  enrolled_at: string;
  status: string;
  program_name: string;
  submissions_count: number;
  completed_modules: number;
}

const InstructorDashboard: React.FC = () => {
  const { user } = useAuth();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [grading, setGrading] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    fetchInstructorData();
  }, []);

  const fetchInstructorData = async () => {
    try {
      // Fetch all pending submissions with student info
      const { data: submissionsData, error: submissionsError } = await supabase
        .from('module_submissions')
        .select(`
          *,
          mentorship_enrollments!inner(
            user_id,
            program_name,
            status,
            enrolled_at
          )
        `)
        .order('submitted_at', { ascending: false });

      if (submissionsError) throw submissionsError;

      // Get user profiles for student emails  
      const userIds = submissionsData?.map((s: any) => s.user_id) || [];
      const { data: profiles, error: profilesError } = await supabase.auth.admin.listUsers();
      
      const submissionsWithStudentInfo = submissionsData?.map((submission: any) => ({
        ...submission,
        student_email: profiles?.users?.find((p: any) => p.id === submission.user_id)?.email || 'Unknown',
        student_name: profiles?.users?.find((p: any) => p.id === submission.user_id)?.user_metadata?.name || 'Student'
      })) || [];

      setSubmissions(submissionsWithStudentInfo);

      // Fetch student enrollment stats
      const { data: enrollmentsData, error: enrollmentsError } = await supabase
        .from('mentorship_enrollments')
        .select('*')
        .eq('status', 'active');

      if (enrollmentsError) throw enrollmentsError;

      // Calculate stats for each student
      const studentStats = await Promise.all(
        (enrollmentsData || []).map(async (enrollment: any) => {
          const { data: studentSubmissions } = await supabase
            .from('module_submissions')
            .select('grade_status')
            .eq('enrollment_id', enrollment.id);

          const profile = profiles?.users?.find((p: any) => p.id === enrollment.user_id);
          
          return {
            id: enrollment.id,
            email: profile?.email || 'Unknown',
            enrolled_at: enrollment.enrolled_at,
            status: enrollment.status,
            program_name: enrollment.program_name,
            submissions_count: studentSubmissions?.length || 0,
            completed_modules: studentSubmissions?.filter(s => s.grade_status === 'pass').length || 0
          };
        })
      );

      setStudents(studentStats);

    } catch (error) {
      console.error('Error fetching instructor data:', error);
      toast.error('Failed to load instructor dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleGradeSubmission = async () => {
    if (!selectedSubmission || score < 0 || score > selectedSubmission.max_score) {
      toast.error('Please enter a valid score');
      return;
    }

    setGrading(true);

    try {
      const gradeStatus = score >= 7 ? 'pass' : 'redo';
      
      const { error } = await supabase
        .from('module_submissions')
        .update({
          score,
          instructor_feedback: feedback.trim() || null,
          grade_status: gradeStatus,
          reviewed_at: new Date().toISOString(),
          reviewed_by: user?.id
        })
        .eq('id', selectedSubmission.id);

      if (error) throw error;

      toast.success(`Submission graded as ${gradeStatus.toUpperCase()}`);
      
      // Refresh data and close modal
      fetchInstructorData();
      setSelectedSubmission(null);
      setFeedback('');
      setScore(0);

    } catch (error) {
      console.error('Error grading submission:', error);
      toast.error('Failed to grade submission');
    } finally {
      setGrading(false);
    }
  };

  const downloadFile = async (url: string, fileName: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(downloadUrl);
      
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download file');
    }
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'pass': 'bg-green-100 text-green-800',
      'redo': 'bg-red-100 text-red-800'
    };

    return (
      <Badge className={colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'}>
        {status.toUpperCase()}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3C3B6E]"></div>
      </div>
    );
  }

  const pendingSubmissions = submissions.filter(s => s.grade_status === 'pending');
  const totalSubmissions = submissions.length;
  const gradedSubmissions = submissions.filter(s => s.grade_status !== 'pending').length;

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-yellow-600" />
              <div>
                <p className="text-sm text-gray-600">Pending Reviews</p>
                <p className="text-2xl font-bold">{pendingSubmissions.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total Submissions</p>
                <p className="text-2xl font-bold">{totalSubmissions}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Graded</p>
                <p className="text-2xl font-bold">{gradedSubmissions}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <GraduationCap className="w-8 h-8 text-[#3C3B6E]" />
              <div>
                <p className="text-sm text-gray-600">Active Students</p>
                <p className="text-2xl font-bold">{students.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="submissions" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="submissions">Submissions to Review</TabsTrigger>
          <TabsTrigger value="students">Student Progress</TabsTrigger>
        </TabsList>

        <TabsContent value="submissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Submissions Awaiting Review
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingSubmissions.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">No pending submissions to review</p>
                ) : (
                  pendingSubmissions.map((submission) => (
                    <div
                      key={submission.id}
                      className="border rounded-lg p-4 hover:bg-gray-50"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-medium">
                            Module {submission.module_number}: {submission.module_name}
                          </h4>
                          <p className="text-sm text-gray-600">
                            Student: {submission.student_name} ({submission.student_email})
                          </p>
                          <p className="text-xs text-gray-500">
                            Submitted: {new Date(submission.submitted_at).toLocaleString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(submission.grade_status)}
                          <Button
                            onClick={() => setSelectedSubmission(submission)}
                            size="sm"
                            className="bg-[#3C3B6E] hover:bg-[#2A2952]"
                          >
                            Review
                          </Button>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 p-3 rounded">
                        <p className="text-sm line-clamp-3">{submission.submission_content}</p>
                      </div>
                      
                      {submission.file_urls && submission.file_urls.length > 0 && (
                        <div className="mt-3 flex gap-2">
                          {submission.file_urls.map((url, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              onClick={() => downloadFile(url, `submission-${index + 1}`)}
                            >
                              <Download className="w-3 h-3 mr-1" />
                              File {index + 1}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Student Progress Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {students.map((student) => (
                  <div
                    key={student.id}
                    className="border rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{student.email}</h4>
                        <p className="text-sm text-gray-600">
                          Enrolled: {new Date(student.enrolled_at).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-600">
                          Program: {student.program_name}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 mb-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm">
                            {student.completed_modules}/8 modules completed
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          {student.submissions_count} total submissions
                        </p>
                        <Badge variant="outline" className="mt-1">
                          {student.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Grading Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>
                Grade Submission - Module {selectedSubmission.module_number}: {selectedSubmission.module_name}
              </CardTitle>
              <p className="text-sm text-gray-600">
                Student: {selectedSubmission.student_name} ({selectedSubmission.student_email})
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-medium mb-2">Student Submission:</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="whitespace-pre-wrap">{selectedSubmission.submission_content}</p>
                </div>
              </div>

              {selectedSubmission.file_urls && selectedSubmission.file_urls.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Attached Files:</h4>
                  <div className="flex gap-2">
                    {selectedSubmission.file_urls.map((url, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        onClick={() => downloadFile(url, `submission-file-${index + 1}`)}
                      >
                        <Download className="w-3 h-3 mr-1" />
                        Download File {index + 1}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Score (out of {selectedSubmission.max_score})
                  </label>
                  <Input
                    type="number"
                    min="0"
                    max={selectedSubmission.max_score}
                    value={score}
                    onChange={(e) => setScore(parseInt(e.target.value) || 0)}
                    placeholder="Enter score"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    7+ points = Pass, &lt;7 points = Redo Required
                  </p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Instructor Feedback
                </label>
                <Textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Provide constructive feedback for the student..."
                  className="min-h-[120px]"
                />
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={handleGradeSubmission}
                  disabled={grading || score < 0 || score > selectedSubmission.max_score}
                  className="bg-[#3C3B6E] hover:bg-[#2A2952]"
                >
                  {grading ? 'Grading...' : 'Submit Grade'}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedSubmission(null);
                    setFeedback('');
                    setScore(0);
                  }}
                  disabled={grading}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default InstructorDashboard;