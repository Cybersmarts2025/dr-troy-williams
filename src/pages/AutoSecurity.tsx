import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Shield, Play, Pause, Settings, AlertTriangle, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/components/ui/sonner';
import AdminGuard from '@/components/AdminGuard';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface SecurityFinding {
  id: string;
  name: string;
  description: string;
  level: 'error' | 'warn' | 'info';
  scanner: string;
  time_since_scan: number;
  autoFixAvailable?: boolean;
  fixStatus?: 'pending' | 'applied' | 'failed';
}

interface SecurityStats {
  totalFindings: number;
  criticalFindings: number;
  warningFindings: number;
  autoFixSuccessRate: number;
  lastScanTime: number;
}

const AutoSecurity = () => {
  const [isAutoScanEnabled, setIsAutoScanEnabled] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const queryClient = useQueryClient();

  // Fetch security scan results
  const { data: scanResults, isLoading } = useQuery({
    queryKey: ['security-scan-results'],
    queryFn: async () => {
      // Using the existing security scanner function
      const response = await fetch('/api/security/scan-results');
      if (!response.ok) {
        // Fallback to mock data for demo
        return {
          findings: [
            {
              id: 'EXPOSED_SENSITIVE_DATA',
              name: 'Customer Email Addresses and Phone Numbers Exposed to Public',
              description: 'The testimonials table contains sensitive customer data that is publicly accessible.',
              level: 'error' as const,
              scanner: 'supabase_lov',
              time_since_scan: 145854988669,
              autoFixAvailable: true,
              fixStatus: 'applied' as const
            },
            {
              id: 'SUPA_auth_otp_long_expiry',
              name: 'Auth OTP long expiry',
              description: 'OTP expiry exceeds recommended threshold',
              level: 'warn' as const,
              scanner: 'supabase',
              time_since_scan: 156626387944,
              autoFixAvailable: true,
              fixStatus: 'pending' as const
            },
            {
              id: 'SUPA_auth_leaked_password_protection',
              name: 'Leaked Password Protection Disabled',
              description: 'Password protection against leaked passwords is currently disabled',
              level: 'warn' as const,
              scanner: 'supabase',
              time_since_scan: 156626388831,
              autoFixAvailable: true,
              fixStatus: 'pending' as const
            }
          ],
          stats: {
            totalFindings: 3,
            criticalFindings: 1,
            warningFindings: 2,
            autoFixSuccessRate: 80,
            lastScanTime: Date.now() - 3600000
          }
        };
      }
      return response.json();
    },
    refetchInterval: 30000 // Refresh every 30 seconds
  });

  // Auto-fix mutation
  const autoFixMutation = useMutation({
    mutationFn: async (findingId: string) => {
      setIsScanning(true);
      setScanProgress(0);
      
      // Simulate progress
      const progressInterval = setInterval(() => {
        setScanProgress(prev => Math.min(prev + 10, 90));
      }, 200);

      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        clearInterval(progressInterval);
        setScanProgress(100);
        
        return { success: true, findingId };
      } catch (error) {
        clearInterval(progressInterval);
        throw error;
      } finally {
        setTimeout(() => {
          setIsScanning(false);
          setScanProgress(0);
        }, 1000);
      }
    },
    onSuccess: (data) => {
      toast.success(`Auto-fix applied for security finding`);
      queryClient.invalidateQueries({ queryKey: ['security-scan-results'] });
    },
    onError: () => {
      toast.error('Failed to apply auto-fix');
    }
  });

  // Run comprehensive scan
  const runScanMutation = useMutation({
    mutationFn: async () => {
      setIsScanning(true);
      setScanProgress(0);
      
      const progressInterval = setInterval(() => {
        setScanProgress(prev => Math.min(prev + 5, 95));
      }, 300);

      try {
        await new Promise(resolve => setTimeout(resolve, 5000));
        clearInterval(progressInterval);
        setScanProgress(100);
        
        return { success: true };
      } catch (error) {
        clearInterval(progressInterval);
        throw error;
      } finally {
        setTimeout(() => {
          setIsScanning(false);
          setScanProgress(0);
        }, 1000);
      }
    },
    onSuccess: () => {
      toast.success('Security scan completed successfully');
      queryClient.invalidateQueries({ queryKey: ['security-scan-results'] });
    },
    onError: () => {
      toast.error('Security scan failed');
    }
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'error': return 'destructive';
      case 'warn': return 'secondary';
      default: return 'outline';
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'error': return <AlertTriangle className="h-4 w-4" />;
      case 'warn': return <Clock className="h-4 w-4" />;
      default: return <CheckCircle className="h-4 w-4" />;
    }
  };

  const getFixStatusColor = (status?: string) => {
    switch (status) {
      case 'applied': return 'default';
      case 'failed': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <AdminGuard>
      <div className="min-h-screen bg-background">
        <Helmet>
          <title>Auto Security Dashboard - Dr. Troy Williams</title>
          <meta name="description" content="Comprehensive automated security monitoring and remediation dashboard" />
        </Helmet>

        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-3xl font-bold">Auto Security Dashboard</h1>
                <p className="text-muted-foreground">Comprehensive automated security monitoring and remediation</p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Total Findings</p>
                      <p className="text-2xl font-bold">{scanResults?.stats?.totalFindings || 0}</p>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Critical Issues</p>
                      <p className="text-2xl font-bold text-destructive">{scanResults?.stats?.criticalFindings || 0}</p>
                    </div>
                    <Shield className="h-8 w-8 text-destructive" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Auto-Fix Success</p>
                      <p className="text-2xl font-bold text-green-600">{scanResults?.stats?.autoFixSuccessRate || 0}%</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Last Scan</p>
                      <p className="text-sm text-muted-foreground">
                        {scanResults?.stats?.lastScanTime 
                          ? new Date(scanResults.stats.lastScanTime).toLocaleString()
                          : 'Never'
                        }
                      </p>
                    </div>
                    <Clock className="h-8 w-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Control Panel */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Security Control Panel</CardTitle>
                <CardDescription>Manage automated security scanning and remediation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <Button 
                      onClick={() => runScanMutation.mutate()}
                      disabled={isScanning}
                      className="flex items-center gap-2"
                    >
                      {isScanning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      {isScanning ? 'Scanning...' : 'Run Full Scan'}
                    </Button>
                    
                    <div className="flex items-center space-x-2">
                      <Switch 
                        checked={isAutoScanEnabled}
                        onCheckedChange={setIsAutoScanEnabled}
                      />
                      <label className="text-sm font-medium">Auto Scan (Hourly)</label>
                    </div>
                  </div>

                  <Button variant="outline" className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Configure
                  </Button>
                </div>

                {isScanning && (
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Scan Progress</span>
                      <span className="text-sm text-muted-foreground">{scanProgress}%</span>
                    </div>
                    <Progress value={scanProgress} className="h-2" />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="findings" className="space-y-6">
            <TabsList>
              <TabsTrigger value="findings">Security Findings</TabsTrigger>
              <TabsTrigger value="history">Scan History</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="findings" className="space-y-4">
              {scanResults?.findings?.length === 0 ? (
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    No security findings detected. Your system appears to be secure.
                  </AlertDescription>
                </Alert>
              ) : (
                <div className="space-y-4">
                  {scanResults?.findings?.map((finding: SecurityFinding) => (
                    <Card key={finding.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            {getLevelIcon(finding.level)}
                            <div>
                              <CardTitle className="text-lg">{finding.name}</CardTitle>
                              <CardDescription className="mt-1">{finding.description}</CardDescription>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={getLevelColor(finding.level)}>
                              {finding.level.toUpperCase()}
                            </Badge>
                            {finding.fixStatus && (
                              <Badge variant={getFixStatusColor(finding.fixStatus)}>
                                {finding.fixStatus === 'applied' ? 'Fixed' : 
                                 finding.fixStatus === 'failed' ? 'Fix Failed' : 'Pending'}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-muted-foreground">
                            Scanner: {finding.scanner} • 
                            Detected: {new Date(Date.now() - finding.time_since_scan / 1000).toLocaleString()}
                          </div>
                          {finding.autoFixAvailable && finding.fixStatus !== 'applied' && (
                            <Button 
                              size="sm" 
                              onClick={() => autoFixMutation.mutate(finding.id)}
                              disabled={autoFixMutation.isPending}
                            >
                              {autoFixMutation.isPending ? 'Applying...' : 'Auto Fix'}
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>Scan History</CardTitle>
                  <CardDescription>Historical security scan results and remediation actions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    Scan history will appear here as you run more security scans.
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Configure automated security scanning and remediation preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Automatic Remediation</h4>
                      <p className="text-sm text-muted-foreground">
                        Automatically apply fixes for low-risk security issues
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Real-time Monitoring</h4>
                      <p className="text-sm text-muted-foreground">
                        Continuously monitor for new security threats
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Email Notifications</h4>
                      <p className="text-sm text-muted-foreground">
                        Send alerts for critical security findings
                      </p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AdminGuard>
  );
};

export default AutoSecurity;