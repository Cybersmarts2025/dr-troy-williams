import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
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
  Contrast,
  Download,
  Loader2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ComplianceItem {
  id: string;
  name: string;
  description: string;
  status: 'complete' | 'partial' | 'pending';
  icon: React.ElementType;
  wcagCriteria: string;
  category: string;
}

const complianceItems: ComplianceItem[] = [
  {
    id: 'form-labels',
    name: 'Form Labels',
    description: 'All form inputs have associated labels',
    status: 'complete',
    icon: Type,
    wcagCriteria: '1.3.1, 3.3.2',
    category: 'Perceivable'
  },
  {
    id: 'keyboard-nav',
    name: 'Keyboard Navigation',
    description: 'All interactive elements are keyboard accessible',
    status: 'complete',
    icon: Keyboard,
    wcagCriteria: '2.1.1, 2.1.2',
    category: 'Operable'
  },
  {
    id: 'focus-indicators',
    name: 'Focus Indicators',
    description: 'Visible focus indicators on all focusable elements',
    status: 'complete',
    icon: MousePointer2,
    wcagCriteria: '2.4.7',
    category: 'Operable'
  },
  {
    id: 'color-contrast',
    name: 'Color Contrast',
    description: 'Text meets WCAG AA contrast ratios (4.5:1)',
    status: 'complete',
    icon: Contrast,
    wcagCriteria: '1.4.3',
    category: 'Perceivable'
  },
  {
    id: 'alt-text',
    name: 'Image Alt Text',
    description: 'All images have descriptive alt attributes',
    status: 'complete',
    icon: Eye,
    wcagCriteria: '1.1.1',
    category: 'Perceivable'
  },
  {
    id: 'link-purpose',
    name: 'Link Purpose',
    description: 'Links describe their destination or purpose',
    status: 'complete',
    icon: Link2,
    wcagCriteria: '2.4.4',
    category: 'Operable'
  },
  {
    id: 'screen-reader',
    name: 'Screen Reader Support',
    description: 'ARIA labels and live regions for dynamic content',
    status: 'complete',
    icon: Volume2,
    wcagCriteria: '4.1.2, 4.1.3',
    category: 'Robust'
  },
  {
    id: 'touch-targets',
    name: 'Touch Target Size',
    description: 'Interactive elements meet 44x44px minimum',
    status: 'complete',
    icon: MousePointer2,
    wcagCriteria: '2.5.5',
    category: 'Operable'
  },
  {
    id: 'focus-trap',
    name: 'Modal Focus Trap',
    description: 'Focus is trapped within modals and dialogs',
    status: 'complete',
    icon: Accessibility,
    wcagCriteria: '2.4.3',
    category: 'Operable'
  },
  {
    id: 'reduced-motion',
    name: 'Reduced Motion',
    description: 'Respects prefers-reduced-motion setting',
    status: 'complete',
    icon: Eye,
    wcagCriteria: '2.3.3',
    category: 'Operable'
  },
  {
    id: 'error-identification',
    name: 'Error Identification',
    description: 'Form errors are clearly identified and described',
    status: 'complete',
    icon: AlertCircle,
    wcagCriteria: '3.3.1',
    category: 'Understandable'
  },
  {
    id: 'lang-attribute',
    name: 'Language Attribute',
    description: 'HTML lang attribute is set correctly',
    status: 'complete',
    icon: Type,
    wcagCriteria: '3.1.1',
    category: 'Understandable'
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
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  
  const completeCount = complianceItems.filter(item => item.status === 'complete').length;
  const partialCount = complianceItems.filter(item => item.status === 'partial').length;
  const pendingCount = complianceItems.filter(item => item.status === 'pending').length;
  const totalCount = complianceItems.length;
  
  // Calculate overall progress (complete = 100%, partial = 50%, pending = 0%)
  const progressScore = ((completeCount * 100) + (partialCount * 50)) / totalCount;
  
  // Determine overall status
  const overallStatus = pendingCount > 0 ? 'needs-work' : partialCount > 0 ? 'almost-there' : 'compliant';

  const generatePDFReport = async () => {
    setIsGenerating(true);
    
    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      
      // Header with branding
      doc.setFillColor(60, 59, 110); // Navy blue
      doc.rect(0, 0, pageWidth, 45, 'F');
      
      // Title
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(24);
      doc.setFont('helvetica', 'bold');
      doc.text('WCAG 2.1 AA Compliance Report', 14, 22);
      
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text('Dr. Troy Williams - DrTroyWilliams.net', 14, 32);
      doc.text(`Generated: ${currentDate}`, 14, 40);
      
      // Reset text color
      doc.setTextColor(0, 0, 0);
      
      // Executive Summary Section
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('Executive Summary', 14, 58);
      
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      
      // Overall Score Box
      const scoreBoxY = 65;
      doc.setFillColor(240, 253, 244); // Light green
      doc.roundedRect(14, scoreBoxY, 80, 30, 3, 3, 'F');
      
      doc.setFontSize(10);
      doc.setTextColor(22, 101, 52); // Dark green
      doc.text('Overall Compliance Score', 18, scoreBoxY + 10);
      doc.setFontSize(24);
      doc.setFont('helvetica', 'bold');
      doc.text(`${Math.round(progressScore)}%`, 18, scoreBoxY + 24);
      
      // Status Box
      doc.setFillColor(overallStatus === 'compliant' ? 34 : overallStatus === 'almost-there' ? 245 : 239, 
                       overallStatus === 'compliant' ? 197 : overallStatus === 'almost-there' ? 158 : 68,
                       overallStatus === 'compliant' ? 94 : overallStatus === 'almost-there' ? 11 : 68);
      doc.roundedRect(100, scoreBoxY, 96, 30, 3, 3, 'F');
      
      doc.setFontSize(10);
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'normal');
      doc.text('Compliance Status', 104, scoreBoxY + 10);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      const statusText = overallStatus === 'compliant' ? 'WCAG AA COMPLIANT' : 
                         overallStatus === 'almost-there' ? 'ALMOST COMPLIANT' : 'NEEDS ATTENTION';
      doc.text(statusText, 104, scoreBoxY + 24);
      
      // Statistics
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      
      const statsY = 105;
      doc.text(`• ${completeCount} of ${totalCount} criteria fully met`, 14, statsY);
      doc.text(`• ${partialCount} criteria partially met`, 14, statsY + 8);
      doc.text(`• ${pendingCount} criteria requiring attention`, 14, statsY + 16);
      
      // Compliance Details Table
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('Compliance Details', 14, statsY + 35);
      
      // Group items by category
      const categories = ['Perceivable', 'Operable', 'Understandable', 'Robust'];
      
      const tableData = complianceItems.map(item => [
        item.category,
        item.name,
        item.description,
        `WCAG ${item.wcagCriteria}`,
        item.status === 'complete' ? '✓ Complete' : item.status === 'partial' ? '◐ Partial' : '✗ Pending'
      ]);
      
      autoTable(doc, {
        startY: statsY + 40,
        head: [['Category', 'Criterion', 'Description', 'WCAG Reference', 'Status']],
        body: tableData,
        headStyles: {
          fillColor: [60, 59, 110],
          textColor: [255, 255, 255],
          fontStyle: 'bold',
          fontSize: 9
        },
        bodyStyles: {
          fontSize: 8,
          cellPadding: 3
        },
        columnStyles: {
          0: { cellWidth: 25 },
          1: { cellWidth: 30 },
          2: { cellWidth: 55 },
          3: { cellWidth: 30 },
          4: { cellWidth: 25 }
        },
        alternateRowStyles: {
          fillColor: [248, 250, 252]
        },
        didParseCell: (data) => {
          if (data.column.index === 4 && data.section === 'body') {
            const status = data.cell.raw as string;
            if (status.includes('Complete')) {
              data.cell.styles.textColor = [22, 101, 52];
            } else if (status.includes('Partial')) {
              data.cell.styles.textColor = [180, 83, 9];
            } else {
              data.cell.styles.textColor = [185, 28, 28];
            }
          }
        }
      });
      
      // Get final Y position after table
      const finalY = (doc as any).lastAutoTable.finalY || 200;
      
      // Recommendations Section (if there are issues)
      if (partialCount > 0 || pendingCount > 0) {
        const partialItems = complianceItems.filter(item => item.status !== 'complete');
        
        if (finalY + 40 > doc.internal.pageSize.getHeight()) {
          doc.addPage();
          doc.setFontSize(16);
          doc.setFont('helvetica', 'bold');
          doc.text('Recommendations', 14, 20);
        } else {
          doc.setFontSize(16);
          doc.setFont('helvetica', 'bold');
          doc.text('Recommendations', 14, finalY + 15);
        }
        
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        let recY = finalY + 25;
        
        partialItems.forEach((item, index) => {
          doc.text(`${index + 1}. ${item.name}: ${item.description}`, 14, recY);
          recY += 8;
        });
      }
      
      // Footer on each page
      const pageCount = doc.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(128, 128, 128);
        doc.text(
          `Page ${i} of ${pageCount} | Confidential - For Internal Use Only`,
          pageWidth / 2,
          doc.internal.pageSize.getHeight() - 10,
          { align: 'center' }
        );
        doc.text(
          'Protecting America Through Technology™',
          pageWidth / 2,
          doc.internal.pageSize.getHeight() - 5,
          { align: 'center' }
        );
      }
      
      // Save the PDF
      doc.save(`WCAG-Compliance-Report-${new Date().toISOString().split('T')[0]}.pdf`);
      
      toast({
        title: "Report Generated",
        description: "Your accessibility compliance report has been downloaded.",
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "Generation Failed",
        description: "There was an error generating the report. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="col-span-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Accessibility className="h-5 w-5 text-[#3C3B6E]" aria-hidden="true" />
              WCAG 2.1 AA Compliance Tracker
            </CardTitle>
            <CardDescription>
              Monitor accessibility compliance across your website
            </CardDescription>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={generatePDFReport}
              disabled={isGenerating}
              variant="outline"
              className="gap-2"
            >
              {isGenerating ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              ) : (
                <Download className="h-4 w-4" aria-hidden="true" />
              )}
              {isGenerating ? 'Generating...' : 'Export PDF Report'}
            </Button>
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
