import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/sonner';

interface AdminGuardProps {
  children: React.ReactNode;
  redirectTo?: string;
}

const AdminGuard = ({ children, redirectTo = '/' }: AdminGuardProps) => {
  const { user, isLoading, isAdmin, userRole } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        toast.error("Please sign in to access this page");
        navigate('/auth');
      } else if (!isAdmin) {
        toast.error("Access denied. Admin privileges required.");
        navigate(redirectTo);
      }
    }
  }, [user, isLoading, isAdmin, navigate, redirectTo]);

  // Show nothing while loading or if not authenticated/authorized
  if (isLoading || !user || !isAdmin) {
    return null;
  }

  return <>{children}</>;
};

export default AdminGuard;