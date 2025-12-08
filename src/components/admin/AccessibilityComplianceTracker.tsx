import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle2, 
  AlertCircle, 
  XCircle, 
  Accessibility,
  Eye,
  Keyboard,
  MousePointer2,
  Type,
  Link2,
  Volume2,
  Contrast
} from 'lucide-react';

interface ComplianceItem {
  id: string;
  name: string;
  description: string;
  status: 'complete' | 'partial' | 'pending';
  icon: React.ElementType;
  wcagCriteria: string;
}

const complianceItems: ComplianceItem[] = [
  {
    id: 'form-labels',
    name: 'Form Labels',
    description: 'All form inputs have associated labels',
    status: 'complete',
    icon: Type,
    wcagCriteria: '1.3.1, 3.3.2'
  },
  {
    id: 'keyboard-nav',
    name: 'Keyboard Navigation',
    description: 'All interactive elements are keyboard accessible',
    status: 'complete',
    icon: Keyboard,
    wcagCriteria: '2.1.1, 2.1.2'
  },
  {
    id: 'focus-indicators',
    name: 'Focus Indicators',
    description: 'Visible focus indicators on all focusable elements',
    status: 'complete',
    icon: MousePointer2,
    wcagCriteria: '2.4.7'
  },
  {
    id: 'color-contrast',
    name: 'Color Contrast',
    description: 'Text meets WCAG AA contrast ratios (4.5:1)',
    status: 'complete',
    icon: Contrast,
    wcagCriteria: '1.4.3'
  },
  {
    id: 'alt-text',
    name: 'Image Alt Text',
    description: 'All images have descriptive alt attributes',
    status: 'complete',
    icon: Eye,
    wcagCriteria: '1.1.1'
  },
  {
    id: 'link-purpose',
    name: 'Link Purpose',
    description: 'Links describe their destination or purpose',
    status: 'complete',
    icon: Link2,
    wcagCriteria: '2.4.4'
  },
  {
    id: 'screen-reader',
    name: 'Screen Reader Support',
    description: 'ARIA labels and live regions for dynamic content',
    status: 'complete',
    icon: Volume2,
    wcagCriteria: '4.1.2, 4.1.3'
  },
  {
    id: 'touch-targets',
    name: 'Touch Target Size',
    description: 'Interactive elements meet 44x44px minimum',
    status: 'complete',
    icon: MousePointer2,
    wcagCriteria: '2.5.5'
  },
  {
    id: 'focus-trap',
    name: 'Modal Focus Trap',
    description: 'Focus is trapped within modals and dialogs',
    status: 'complete',
    icon: Accessibility,
    wcagCriteria: '2.4.3'
  },
  {
    id: 'reduced-motion',
    name: 'Reduced Motion',
    description: 'Respects prefers-reduced-motion setting',
    status: 'complete',
    icon: Eye,
    wcagCriteria: '2.3.3'
  },
  {
    id: 'error-identification',
    name: 'Error Identification',
    description: 'Form errors are clearly identified and described',
    status: 'complete',
    icon: AlertCircle,
    wcagCriteria: '3.3.1'
  },
  {
    id: 'lang-attribute',
    name: 'Language Attribute',
    description: 'HTML lang attribute is set correctly',
    status: 'complete',
    icon: Type,
    wcagCriteria: '3.1.1'
  }
];

const getStatusIcon = (status: ComplianceItem['status']) => {
  switch (status) {
    case 'complete':
      return <CheckCircle2 className="h-5 w-5 text-green-500" aria-hidden="true" />;
    case 'partial':
      return <AlertCircle className="h-5 w-5 text-amber-500" aria-hidden="true" />;
    case 'pending':
      return <XCircle className="h-5 w-5 text-red-500" aria-hidden="true" />;
  }
};

const getStatusBadge = (status: ComplianceItem['status']) => {
  switch (status) {
    case 'complete':
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Complete</Badge>;
    case 'partial':
      return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Partial</Badge>;
    case 'pending':
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Pending</Badge>;
  }
};

const AccessibilityComplianceTracker = () => {
  const completeCount = complianceItems.filter(item => item.status === 'complete').length;
  const partialCount = complianceItems.filter(item => item.status === 'partial').length;
  const pendingCount = complianceItems.filter(item => item.status === 'pending').length;
  const totalCount = complianceItems.length;
  
  // Calculate overall progress (complete = 100%, partial = 50%, pending = 0%)
  const progressScore = ((completeCount * 100) + (partialCount * 50)) / totalCount;
  
  // Determine overall status
  const overallStatus = pendingCount > 0 ? 'needs-work' : partialCount > 0 ? 'almost-there' : 'compliant';

  return (
    <Card className="col-span-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Accessibility className="h-5 w-5 text-[#3C3B6E]" aria-hidden="true" />
              WCAG 2.1 AA Compliance Tracker
            </CardTitle>
            <CardDescription>
              Monitor accessibility compliance across your website
            </CardDescription>
          </div>
          <Badge 
            className={`text-sm px-3 py-1 ${
              overallStatus === 'compliant' 
                ? 'bg-green-500 text-white hover:bg-green-500' 
                : overallStatus === 'almost-there'
                ? 'bg-amber-500 text-white hover:bg-amber-500'
                : 'bg-red-500 text-white hover:bg-red-500'
            }`}
          >
            {overallStatus === 'compliant' ? 'WCAG AA Compliant' : overallStatus === 'almost-there' ? 'Almost There' : 'Needs Work'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">Overall Compliance Score</span>
            <span className="font-bold text-[#3C3B6E]">{Math.round(progressScore)}%</span>
          </div>
          <Progress 
            value={progressScore} 
            className="h-3"
            aria-label={`Accessibility compliance: ${Math.round(progressScore)}%`}
          />
          <div className="flex gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4 text-green-500" aria-hidden="true" />
              {completeCount} Complete
            </span>
            <span className="flex items-center gap-1">
              <AlertCircle className="h-4 w-4 text-amber-500" aria-hidden="true" />
              {partialCount} Partial
            </span>
            <span className="flex items-center gap-1">
              <XCircle className="h-4 w-4 text-red-500" aria-hidden="true" />
              {pendingCount} Pending
            </span>
          </div>
        </div>

        {/* Compliance Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {complianceItems.map((item) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.id}
                className="flex items-start gap-3 p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
              >
                <div className="flex-shrink-0 mt-0.5">
                  {getStatusIcon(item.status)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                    <span className="font-medium text-sm">{item.name}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground font-mono">
                      WCAG {item.wcagCriteria}
                    </span>
                    {getStatusBadge(item.status)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Links */}
        <div className="pt-4 border-t">
          <h4 className="text-sm font-medium mb-2">Resources</h4>
          <div className="flex flex-wrap gap-2">
            <a 
              href="https://www.w3.org/WAI/WCAG21/quickref/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-blue-600 hover:underline inline-flex items-center gap-1 min-h-[44px] px-2"
            >
              WCAG 2.1 Quick Reference
              <span className="sr-only">(opens in new tab)</span>
            </a>
            <a 
              href="/accessibility" 
              className="text-xs text-blue-600 hover:underline inline-flex items-center gap-1 min-h-[44px] px-2"
            >
              Accessibility Statement
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccessibilityComplianceTracker;
