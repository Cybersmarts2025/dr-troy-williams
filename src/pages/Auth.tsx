
import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { WebPageSchema } from '@/utils/schemaMarkup';

import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const { user, isLoading, signIn, signUp } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  if (!isLoading && user) {
    return <Navigate to="/" />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (activeTab === 'login') {
        await signIn(email, password);
        navigate('/');
      } else {
        await signUp(email, password);
      }
    } catch (error: any) {
      // Error handling is already done in AuthContext with toast messages
      console.error('Authentication error:', error);
    } finally {
      setIsSubmitting(false);
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
            </CardHeader>
            
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-2 mx-6 mb-4">
                <TabsTrigger value="login">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
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
      
      <Footer />
    </div>
  );
};

export default Auth;
