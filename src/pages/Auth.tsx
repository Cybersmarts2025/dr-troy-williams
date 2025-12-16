
import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, Lock, Mail, AlertCircle } from 'lucide-react';
import { WebPageSchema } from '@/utils/schemaMarkup';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { validateAuthInput, validatePasswordResetInput } from '@/utils/authValidation';

import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [isSendingReset, setIsSendingReset] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const { user, isLoading, signIn, signUp } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  if (!isLoading && user) {
    return <Navigate to="/" />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationErrors([]);
    setIsSubmitting(true);

    try {
      // Validate inputs before submission
      const validation = validateAuthInput(email, password);
      
      if (!validation.isValid) {
        setValidationErrors(validation.errors);
        setIsSubmitting(false);
        return;
      }

      if (activeTab === 'login') {
        await signIn(validation.data!.email, validation.data!.password);
        navigate('/');
      } else {
        await signUp(validation.data!.email, validation.data!.password);
      }
    } catch (error: any) {
      // Error handling is done in AuthContext
      console.error('Authentication error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationErrors([]);
    setIsSendingReset(true);

    try {
      // Validate email input
      const validation = validatePasswordResetInput(resetEmail);
      
      if (!validation.isValid) {
        setValidationErrors(validation.errors);
        setIsSendingReset(false);
        return;
      }

      // Use production URL instead of localhost
      const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      const redirectUrl = isLocalhost 
        ? 'https://drtroywilliams.net/auth' 
        : `${window.location.origin}/auth`;
      
      const { error } = await supabase.auth.resetPasswordForEmail(validation.data!.email, {
        redirectTo: redirectUrl,
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Password reset email sent! Check your inbox.');
        setShowForgotPassword(false);
        setResetEmail('');
      }
    } catch (error: any) {
      console.error('Password reset error');
      toast.error('Failed to send reset email. Please try again.');
    } finally {
      setIsSendingReset(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f9fa] via-white to-[#e9ecef]">
      <Helmet>
        <title>{activeTab === 'login' ? 'Sign In' : 'Sign Up'} | Dr. Troy Williams</title>
        <meta 
          name="description" 
          content="Authenticate to access Dr. Troy Williams' exclusive content and publications."
        />
      </Helmet>

      <WebPageSchema
        name={`${activeTab === 'login' ? 'Sign In' : 'Sign Up'} | Dr. Troy Williams`}
        description="Authentication page for Dr. Troy Williams' website"
        url={`https://drtroywilliams.com/auth`}
      />

      <NavBar />
      
      <div className="container mx-auto px-4 py-12 pt-28">
        <div className="max-w-md mx-auto">
          <Card className="border-gray-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-center text-2xl font-bold text-red-600">
                {activeTab === 'login' ? 'Welcome Back' : 'Create Account'}
              </CardTitle>
              {activeTab === 'signup' && (
                <CardDescription className="text-center text-sm text-gray-600 mt-2">
                  Password must be at least 12 characters with uppercase, lowercase, number, and special character
                </CardDescription>
              )}
            </CardHeader>
            
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-2 mx-6 mb-4">
                <TabsTrigger value="login">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  {validationErrors.length > 0 && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        <ul className="list-disc pl-4 space-y-1">
                          {validationErrors.map((error, idx) => (
                            <li key={idx} className="text-sm">{error}</li>
                          ))}
                        </ul>
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        required
                        aria-describedby="email-description"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 pr-10"
                        required
                        aria-describedby="password-description"
                      />
                      <button 
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {activeTab === 'login' && (
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => setShowForgotPassword(true)}
                          className="text-sm text-[#3C3B6E] hover:underline"
                        >
                          Forgot password?
                        </button>
                      </div>
                    )}
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button 
                    type="submit" 
                    className="w-full bg-[#3C3B6E] hover:bg-blue-800"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Processing...' : activeTab === 'login' ? 'Sign In' : 'Sign Up'}
                  </Button>
                </CardFooter>
              </form>
            </Tabs>
          </Card>
        </div>
      </div>

      {/* Forgot Password Dialog */}
      <Dialog open={showForgotPassword} onOpenChange={setShowForgotPassword}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reset Password</DialogTitle>
            <DialogDescription>
              Enter your email address and we'll send you a link to reset your password.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleForgotPassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reset-email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  id="reset-email"
                  type="email"
                  placeholder="Enter your email address"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowForgotPassword(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-[#3C3B6E] hover:bg-blue-800"
                disabled={isSendingReset}
              >
                {isSendingReset ? 'Sending...' : 'Send Reset Link'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default Auth;
