import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  CheckCircle, 
  Clock, 
  FileText, 
  AlertCircle,
  Trophy,
  Target,
  Calendar
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface Enrollment {
  id: string;
  program_name: string;
  enrolled_at: string;
  status: string;
  completed_at?: string;
}

interface Submission {
  id: string;
  module_number: number;
  module_name: string;
  status: string;
  grade_status: string;
  score?: number;
  max_score: number;
  instructor_feedback?: string;
  submitted_at: string;
  reviewed_at?: string;
}

interface ProgressItem {
  module_number: number;
  status: string;
  started_at?: string;
  completed_at?: string;
  time_spent_minutes: number;
}

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [progress, setProgress] = useState<ProgressItem[]>([]);
  const [loading, setLoading] = useState(true);

  const modules = [
    { number: 0, name: "Orientation", estimatedMinutes: 20 },
    { number: 1, name: "FraudDNA™", estimatedMinutes: 40 },
    { number: 2, name: "AISF™", estimatedMinutes: 40 },
    { number: 3, name: "PPP™", estimatedMinutes: 40 },
    { number: 4, name: "PatriotProof™", estimatedMinutes: 40 },
    { number: 5, name: "ScamAtlas™", estimatedMinutes: 40 },
    { number: 6, name: "Compliance & Ethics Sprint", estimatedMinutes: 40 },
    { number: 7, name: "JobReady360", estimatedMinutes: 50 },
  ];

  useEffect(() => {
    if (user) {
      fetchStudentData();
    }
  }, [user]);

  const fetchStudentData = async () => {
    if (!user) return;

    try {
      // Fetch enrollment
      const { data: enrollmentData, error: enrollmentError } = await supabase
        .from('mentorship_enrollments')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .single();

      if (enrollmentError && enrollmentError.code !== 'PGRST116') {
        throw enrollmentError;
      }

      setEnrollment(enrollmentData);

      if (enrollmentData) {
        // Fetch submissions
        const { data: submissionsData, error: submissionsError } = await supabase
          .from('module_submissions')
          .select('*')
          .eq('enrollment_id', enrollmentData.id)
          .order('module_number');

        if (submissionsError) throw submissionsError;
        setSubmissions(submissionsData || []);

        // Fetch progress
        const { data: progressData, error: progressError } = await supabase
          .from('student_progress')
          .select('*')
          .eq('enrollment_id', enrollmentData.id)
          .order('module_number');

        if (progressError) throw progressError;
        setProgress(progressData || []);
      }

    } catch (error) {
      console.error('Error fetching student data:', error);
      toast.error('Failed to load your progress');
    } finally {
      setLoading(false);
    }
  };

  const enrollInProgram = async () => {
    if (!user) {
      toast.error('Please log in to enroll');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('mentorship_enrollments')
        .insert([{
          user_id: user.id,
          program_name: 'Cybersmarts.ai Mentorship: Intro Pack',
          status: 'active'
        }])
        .select()
        .single();

      if (error) throw error;

      setEnrollment(data);
      toast.success('Successfully enrolled in the mentorship program!');
      
    } catch (error) {
      console.error('Error enrolling:', error);
      toast.error('Failed to enroll in program');
    }
  };

  const getModuleStatus = (moduleNumber: number) => {
    const submission = submissions.find(s => s.module_number === moduleNumber);
    const progressItem = progress.find(p => p.module_number === moduleNumber);

    if (submission) {
      return {
        status: submission.grade_status,
        hasSubmission: true,
        score: submission.score,
        maxScore: submission.max_score,
        feedback: submission.instructor_feedback
      };
    }

    if (progressItem) {
      return {
        status: progressItem.status,
        hasSubmission: false
      };
    }

    return {
      status: 'not_started',
      hasSubmission: false
    };
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'redo':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-blue-600" />;
      case 'in_progress':
        return <Clock className="w-4 h-4 text-blue-600" />;
      default:
        return <BookOpen className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string, score?: number, maxScore?: number) => {
    const colors = {
      'pass': 'bg-green-100 text-green-800',
      'redo': 'bg-red-100 text-red-800',
      'pending': 'bg-yellow-100 text-yellow-800',
      'completed': 'bg-blue-100 text-blue-800',
      'in_progress': 'bg-blue-100 text-blue-800',
      'not_started': 'bg-gray-100 text-gray-800'
    };

    const labels = {
      'pass': 'Pass',
      'redo': 'Redo Required',
      'pending': 'Under Review',
      'completed': 'Completed',
      'in_progress': 'In Progress',
      'not_started': 'Not Started'
    };

    return (
      <Badge className={colors[status as keyof typeof colors] || colors.not_started}>
        {labels[status as keyof typeof labels] || 'Unknown'}
        {score !== undefined && maxScore && ` (${score}/${maxScore})`}
      </Badge>
    );
  };

  const calculateProgress = () => {
    const totalModules = modules.length;
    const completedModules = submissions.filter(s => s.grade_status === 'pass').length;
    return (completedModules / totalModules) * 100;
  };

  const getOverallStats = () => {
    const totalSubmissions = submissions.length;
    const passedModules = submissions.filter(s => s.grade_status === 'pass').length;
    const pendingGrades = submissions.filter(s => s.grade_status === 'pending').length;
    const totalTimeSpent = progress.reduce((sum, p) => sum + p.time_spent_minutes, 0);

    return {
      totalSubmissions,
      passedModules,
      pendingGrades,
      totalTimeSpent: Math.round(totalTimeSpent / 60 * 10) / 10 // Convert to hours with 1 decimal
    };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3C3B6E]"></div>
      </div>
    );
  }

  if (!enrollment) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <BookOpen className="w-6 h-6 text-[#3C3B6E]" />
            Join the Mentorship Program
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-600">
            Enroll in the Cybersmarts.ai Mentorship Program to start your journey in cybersecurity excellence.
          </p>
          <Button onClick={enrollInProgram} className="bg-[#3C3B6E] hover:bg-[#2A2952]">
            Enroll Now
          </Button>
        </CardContent>
      </Card>
    );
  }

  const stats = getOverallStats();
  const progressPercentage = calculateProgress();

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Target className="w-8 h-8 text-[#3C3B6E]" />
              <div>
                <p className="text-sm text-gray-600">Overall Progress</p>
                <p className="text-2xl font-bold">{progressPercentage.toFixed(0)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Trophy className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Modules Passed</p>
                <p className="text-2xl font-bold">{stats.passedModules}/{modules.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-yellow-600" />
              <div>
                <p className="text-sm text-gray-600">Pending Reviews</p>
                <p className="text-2xl font-bold">{stats.pendingGrades}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Time Invested</p>
                <p className="text-2xl font-bold">{stats.totalTimeSpent}h</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Program Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Modules Completed</span>
              <span>{stats.passedModules} of {modules.length}</span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Module Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Module Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {modules.map((module) => {
              const status = getModuleStatus(module.number);
              return (
                <div
                  key={module.number}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    {getStatusIcon(status.status)}
                    <div>
                      <h4 className="font-medium">
                        Module {module.number}: {module.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        Est. {module.estimatedMinutes} minutes
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {getStatusBadge(status.status, status.score, status.maxScore)}
                    {status.hasSubmission && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          // Navigate to submission details
                          window.location.href = `/mentorship-program?module=${module.number}`;
                        }}
                      >
                        View Submission
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Feedback */}
      {submissions.some(s => s.instructor_feedback) && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {submissions
                .filter(s => s.instructor_feedback)
                .slice(-3)
                .map((submission) => (
                  <div key={submission.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{submission.module_name}</h4>
                      {getStatusBadge(submission.grade_status, submission.score, submission.max_score)}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{submission.instructor_feedback}</p>
                    <p className="text-xs text-gray-500">
                      {submission.reviewed_at && new Date(submission.reviewed_at).toLocaleDateString()}
                    </p>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StudentDashboard;