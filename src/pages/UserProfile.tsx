
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";
import AuthGuard from "@/components/AuthGuard";

const UserProfile = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    avatar: "",
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.user_metadata?.full_name || "",
        email: user.email || "",
        avatar: user.user_metadata?.avatar_url || "",
      });
    }
  }, [user]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
      console.error("Error updating profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/");
      toast({
        title: "Signed out",
        description: "You have been signed out successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
      console.error("Error signing out:", error);
    }
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-white flex flex-col">
        <Helmet>
          <title>User Profile | Dr. Troy Williams</title>
          <meta name="description" content="Manage your profile settings" />
        </Helmet>
        <NavBar />
        <div className="flex-1 container mx-auto px-4 pt-24 pb-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">User Profile</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-1">
                <Card>
                  <CardContent className="p-6 flex flex-col items-center">
                    <Avatar className="h-24 w-24 mb-4">
                      {profileData.avatar ? (
                        <AvatarImage src={profileData.avatar} />
                      ) : (
                        <AvatarFallback className="text-lg">
                          {profileData.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <h2 className="text-xl font-medium">{profileData.name}</h2>
                    <p className="text-sm text-gray-500 mb-4">{profileData.email}</p>
                    <Button 
                      variant="outline" 
                      className="w-full mt-4" 
                      onClick={handleSignOut}
                    >
                      Sign Out
                    </Button>
                  </CardContent>
                </Card>
              </div>
              
              <div className="md:col-span-3">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>
                      Update your account information and preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="profile">
                      <TabsList className="mb-6">
                        <TabsTrigger value="profile">Profile</TabsTrigger>
                        <TabsTrigger value="security">Security</TabsTrigger>
                        <TabsTrigger value="preferences">Preferences</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="profile">
                        <form onSubmit={handleUpdateProfile} className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input 
                              id="name" 
                              value={profileData.name}
                              onChange={e => setProfileData({...profileData, name: e.target.value})}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input 
                              id="email" 
                              type="email"
                              value={profileData.email}
                              disabled={true}
                            />
                            <p className="text-sm text-gray-500">
                              Email address cannot be changed
                            </p>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="avatar">Avatar URL</Label>
                            <Input 
                              id="avatar" 
                              placeholder="https://example.com/avatar.png"
                              value={profileData.avatar}
                              onChange={e => setProfileData({...profileData, avatar: e.target.value})}
                            />
                          </div>
                          
                          <Button type="submit" disabled={isLoading}>
                            {isLoading ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                                Updating...
                              </>
                            ) : (
                              "Update Profile"
                            )}
                          </Button>
                        </form>
                      </TabsContent>
                      
                      <TabsContent value="security">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <h3 className="text-lg font-medium">Change Password</h3>
                            <p className="text-sm text-gray-500">
                              Update your password to keep your account secure
                            </p>
                          </div>
                          
                          <form className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="current-password">Current Password</Label>
                              <Input id="current-password" type="password" />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="new-password">New Password</Label>
                              <Input id="new-password" type="password" />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="confirm-password">Confirm New Password</Label>
                              <Input id="confirm-password" type="password" />
                            </div>
                            
                            <Button type="submit">Update Password</Button>
                          </form>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="preferences">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <h3 className="text-lg font-medium">Email Notifications</h3>
                            <p className="text-sm text-gray-500">
                              Manage your email notification preferences
                            </p>
                          </div>
                          
                          {/* Future implementation for notification preferences */}
                          <p className="text-sm text-gray-500">
                            Notification preferences will be available soon.
                          </p>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </AuthGuard>
  );
};

export default UserProfile;
