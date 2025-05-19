
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import AuthGuard from "@/components/AuthGuard";
import { FileText, Users, Mail, Settings } from 'lucide-react';

const AdminDashboard = () => {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-white flex flex-col">
        <Helmet>
          <title>Admin Dashboard</title>
          <meta name="description" content="Administration dashboard" />
        </Helmet>
        <NavBar />
        <div className="flex-1 container mx-auto px-4 pt-24 pb-16">
          <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-[#3C3B6E]" />
                  Content Management
                </CardTitle>
                <CardDescription>Manage blog posts and other content</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link to="/admin/blog">Manage Blog Posts</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-[#B22234]" />
                  User Management
                </CardTitle>
                <CardDescription>Manage user profiles and permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link to="/admin/users">Manage Users</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-[#10B981]" />
                  Newsletter
                </CardTitle>
                <CardDescription>Manage newsletter subscribers</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link to="/admin/newsletter">Manage Newsletter</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-[#8B5CF6]" />
                  Site Settings
                </CardTitle>
                <CardDescription>Configure site-wide settings</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link to="/admin/settings">Site Settings</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </div>
    </AuthGuard>
  );
};

export default AdminDashboard;
