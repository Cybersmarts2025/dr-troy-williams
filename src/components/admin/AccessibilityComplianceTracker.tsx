import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
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
  Loader2,
  RefreshCw,
  ChevronDown,
  Clock
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAccessibilityScan } from '@/hooks/useAccessibilityScan';
import { ScanResult } from '@/utils/accessibilityScanner';
import { generateADAComplianceChecklistPDF } from '@/utils/adaComplianceChecklistPDF';

const iconMap: Record<string, React.ElementType> = {
  'form-labels': Type,
  'keyboard-nav': Keyboard,
  'focus-indicators': MousePointer2,
  'color-contrast': Contrast,
  'alt-text': Eye,
  'link-purpose': Link2,
  'screen-reader': Volume2,
  'touch-targets': MousePointer2,
  'focus-trap': Accessibility,
  'reduced-motion': Eye,
  'error-identification': AlertCircle,
  'lang-attribute': Type
};

const getStatusIcon = (status: ScanResult['status']) => {
  switch (status) {
    case 'complete':
      return <CheckCircle2 className="h-5 w-5 text-green-500" aria-hidden="true" />;
    case 'partial':
      return <AlertCircle className="h-5 w-5 text-amber-500" aria-hidden="true" />;
    case 'pending':
      return <XCircle className="h-5 w-5 text-red-500" aria-hidden="true" />;
  }
};

const getStatusBadge = (status: ScanResult['status']) => {
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
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [expandedItems, setExpandedItems] = React.useState<Set<string>>(new Set());
  const { toast } = useToast();
  
  const { report, isScanning, lastScanTime, scan } = useAccessibilityScan({ 
    autoScan: true 
  });

  // Calculate stats from scan results
  const results = report?.results || [];
  const completeCount = results.filter(item => item.status === 'complete').length;
  const partialCount = results.filter(item => item.status === 'partial').length;
  const pendingCount = results.filter(item => item.status === 'pending').length;
  const totalCount = results.length || 12;
  
  const progressScore = report?.overallScore || 0;
  const overallStatus = pendingCount > 0 ? 'needs-work' : partialCount > 0 ? 'almost-there' : 'compliant';

  const toggleExpanded = (id: string) => {
    setExpandedItems(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const generatePDFReport = async () => {
    if (!report) {
      toast({
        title: "No Scan Data",
        description: "Please run a scan first before generating a report.",
        variant: "destructive"
      });
      return;
    }

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
      doc.setFillColor(60, 59, 110);
      doc.rect(0, 0, pageWidth, 45, 'F');
      
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(24);
      doc.setFont('helvetica', 'bold');
      doc.text('WCAG 2.1 AA Compliance Report', 14, 22);
      
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text('Dr. Troy Williams - DrTroyWilliams.net', 14, 32);
      doc.text(`Generated: ${currentDate}`, 14, 40);
      
      doc.setTextColor(0, 0, 0);
      
      // Executive Summary
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('Executive Summary', 14, 58);
      
      // Overall Score Box
      const scoreBoxY = 65;
      doc.setFillColor(240, 253, 244);
      doc.roundedRect(14, scoreBoxY, 80, 30, 3, 3, 'F');
      
      doc.setFontSize(10);
      doc.setTextColor(22, 101, 52);
      doc.text('Overall Compliance Score', 18, scoreBoxY + 10);
      doc.setFontSize(24);
      doc.setFont('helvetica', 'bold');
      doc.text(`${Math.round(progressScore)}%`, 18, scoreBoxY + 24);
      
      // Status Box
      doc.setFillColor(
        overallStatus === 'compliant' ? 34 : overallStatus === 'almost-there' ? 245 : 239,
        overallStatus === 'compliant' ? 197 : overallStatus === 'almost-there' ? 158 : 68,
        overallStatus === 'compliant' ? 94 : overallStatus === 'almost-there' ? 11 : 68
      );
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
      doc.text(`• Last scan: ${lastScanTime?.toLocaleString() || 'N/A'}`, 14, statsY + 24);
      
      // Compliance Details Table
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('Automated Scan Results', 14, statsY + 45);
      
      const tableData = results.map(item => [
        item.category,
        item.name,
        item.description,
        `WCAG ${item.wcagCriteria}`,
        item.status === 'complete' ? '✓ Complete' : item.status === 'partial' ? '◐ Partial' : '✗ Pending',
        `${item.passCount}/${item.passCount + item.failCount}`
      ]);
      
      autoTable(doc, {
        startY: statsY + 50,
        head: [['Category', 'Criterion', 'Description', 'WCAG', 'Status', 'Pass/Total']],
        body: tableData,
        headStyles: {
          fillColor: [60, 59, 110],
          textColor: [255, 255, 255],
          fontStyle: 'bold',
          fontSize: 8
        },
        bodyStyles: {
          fontSize: 7,
          cellPadding: 2
        },
        columnStyles: {
          0: { cellWidth: 22 },
          1: { cellWidth: 28 },
          2: { cellWidth: 50 },
          3: { cellWidth: 25 },
          4: { cellWidth: 22 },
          5: { cellWidth: 18 }
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
      
      const finalY = (doc as any).lastAutoTable.finalY || 200;
      
      // Issues Section
      const issueItems = results.filter(item => item.issues.length > 0);
      if (issueItems.length > 0) {
        let currentY = finalY + 15;
        
        if (currentY + 40 > doc.internal.pageSize.getHeight()) {
          doc.addPage();
          currentY = 20;
        }
        
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('Issues Found', 14, currentY);
        
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        currentY += 10;
        
        issueItems.forEach((item) => {
          if (currentY + 20 > doc.internal.pageSize.getHeight()) {
            doc.addPage();
            currentY = 20;
          }
          
          doc.setFont('helvetica', 'bold');
          doc.text(`${item.name} (${item.issues.length} issue${item.issues.length > 1 ? 's' : ''})`, 14, currentY);
          doc.setFont('helvetica', 'normal');
          currentY += 6;
          
          item.issues.slice(0, 5).forEach((issue) => {
            doc.text(`  • ${issue}`, 14, currentY);
            currentY += 5;
          });
          
          if (item.issues.length > 5) {
            doc.text(`  ... and ${item.issues.length - 5} more issues`, 14, currentY);
            currentY += 5;
          }
          
          currentY += 5;
        });
      }
      
      // Footer on each page
      const pageCount = doc.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(128, 128, 128);
        doc.text(
          `Page ${i} of ${pageCount} | Automated Accessibility Scan Report`,
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
            <CardDescription className="flex items-center gap-2 mt-1">
              <span>Automated accessibility scanning</span>
              {lastScanTime && (
                <span className="text-xs flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-3 w-3" aria-hidden="true" />
                  Last scan: {lastScanTime.toLocaleTimeString()}
                </span>
              )}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Button
              onClick={scan}
              disabled={isScanning}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${isScanning ? 'animate-spin' : ''}`} aria-hidden="true" />
              {isScanning ? 'Scanning...' : 'Run Scan'}
            </Button>
            <Button
              onClick={generatePDFReport}
              disabled={isGenerating || !report}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              {isGenerating ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              ) : (
                <Download className="h-4 w-4" aria-hidden="true" />
              )}
              Export Report
            </Button>
            <Button
              onClick={generateADAComplianceChecklistPDF}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Audit Checklist
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
          {results.map((item) => {
            const Icon = iconMap[item.id] || Accessibility;
            const hasIssues = item.issues.length > 0;
            const isExpanded = expandedItems.has(item.id);
            
            return (
              <Collapsible
                key={item.id}
                open={isExpanded}
                onOpenChange={() => hasIssues && toggleExpanded(item.id)}
              >
                <div 
                  className={`rounded-lg border bg-card transition-colors ${hasIssues ? 'hover:bg-muted/50 cursor-pointer' : ''}`}
                >
                  <CollapsibleTrigger asChild disabled={!hasIssues}>
                    <div className="flex items-start gap-3 p-4">
                      <div className="flex-shrink-0 mt-0.5">
                        {getStatusIcon(item.status)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Icon className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                          <span className="font-medium text-sm">{item.name}</span>
                          {hasIssues && (
                            <ChevronDown 
                              className={`h-4 w-4 text-muted-foreground transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
                              aria-hidden="true"
                            />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">{item.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground font-mono">
                            WCAG {item.wcagCriteria}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">
                              {item.passCount}/{item.passCount + item.failCount}
                            </span>
                            {getStatusBadge(item.status)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent>
                    {hasIssues && (
                      <div className="px-4 pb-4 pt-0">
                        <div className="bg-red-50 dark:bg-red-950/20 rounded-md p-3 mt-2">
                          <p className="text-xs font-medium text-red-800 dark:text-red-200 mb-2">
                            Issues Found ({item.issues.length}):
                          </p>
                          <ul className="text-xs text-red-700 dark:text-red-300 space-y-1">
                            {item.issues.slice(0, 5).map((issue, idx) => (
                              <li key={idx} className="flex items-start gap-1">
                                <span className="text-red-500">•</span>
                                <span>{issue}</span>
                              </li>
                            ))}
                            {item.issues.length > 5 && (
                              <li className="text-red-600 dark:text-red-400 italic">
                                ...and {item.issues.length - 5} more issues
                              </li>
                            )}
                          </ul>
                        </div>
                      </div>
                    )}
                  </CollapsibleContent>
                </div>
              </Collapsible>
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
