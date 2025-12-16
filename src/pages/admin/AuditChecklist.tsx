import React, { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  Download, 
  ChevronDown, 
  CheckCircle2, 
  XCircle, 
  MinusCircle,
  AlertCircle,
  Save,
  RotateCcw,
  FileText
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import AdminGuard from '@/components/AdminGuard';
import { generateFilledAuditPDF, AuditData, ChecklistItemStatus } from '@/utils/auditChecklistExport';

type ItemStatus = 'unchecked' | 'pass' | 'fail' | 'partial' | 'na';

interface ChecklistItem {
  id: string;
  requirement: string;
  wcagRef?: string;
  status: ItemStatus;
  notes: string;
}

interface ChecklistSection {
  id: string;
  title: string;
  items: ChecklistItem[];
  sectionNotes: string;
  isExpanded: boolean;
}

const initialSections: Omit<ChecklistSection, 'sectionNotes' | 'isExpanded'>[] = [
  {
    id: 'perceivable-text',
    title: '1. Perceivable - Text Alternatives (1.1)',
    items: [
      { id: '1.1.1', requirement: 'All images have descriptive alt text', wcagRef: '1.1.1', status: 'unchecked', notes: '' },
      { id: '1.1.2', requirement: 'Decorative images have empty alt="" or role="presentation"', wcagRef: '1.1.1', status: 'unchecked', notes: '' },
      { id: '1.1.3', requirement: 'Complex images have extended descriptions', wcagRef: '1.1.1', status: 'unchecked', notes: '' },
      { id: '1.1.4', requirement: 'Icons have accessible names (aria-label or sr-only text)', wcagRef: '1.1.1', status: 'unchecked', notes: '' },
      { id: '1.1.5', requirement: 'Charts/graphs have text alternatives', wcagRef: '1.1.1', status: 'unchecked', notes: '' },
      { id: '1.1.6', requirement: 'CAPTCHAs have audio alternatives', wcagRef: '1.1.1', status: 'unchecked', notes: '' },
    ]
  },
  {
    id: 'perceivable-media',
    title: '2. Perceivable - Time-Based Media (1.2)',
    items: [
      { id: '1.2.1', requirement: 'Videos have captions', wcagRef: '1.2.2', status: 'unchecked', notes: '' },
      { id: '1.2.2', requirement: 'Audio content has transcripts', wcagRef: '1.2.1', status: 'unchecked', notes: '' },
      { id: '1.2.3', requirement: 'Live audio has real-time captions', wcagRef: '1.2.4', status: 'unchecked', notes: '' },
      { id: '1.2.4', requirement: 'Videos have audio descriptions', wcagRef: '1.2.5', status: 'unchecked', notes: '' },
      { id: '1.2.5', requirement: 'Media players are keyboard accessible', wcagRef: '1.2', status: 'unchecked', notes: '' },
    ]
  },
  {
    id: 'perceivable-adaptable',
    title: '3. Perceivable - Adaptable (1.3)',
    items: [
      { id: '1.3.1', requirement: 'Proper heading hierarchy (h1-h6)', wcagRef: '1.3.1', status: 'unchecked', notes: '' },
      { id: '1.3.2', requirement: 'Lists use proper markup (ul, ol, dl)', wcagRef: '1.3.1', status: 'unchecked', notes: '' },
      { id: '1.3.3', requirement: 'Tables have headers (th) and scope attributes', wcagRef: '1.3.1', status: 'unchecked', notes: '' },
      { id: '1.3.4', requirement: 'Form fields have associated labels', wcagRef: '1.3.1', status: 'unchecked', notes: '' },
      { id: '1.3.5', requirement: 'Landmark regions defined (main, nav, header, footer)', wcagRef: '1.3.1', status: 'unchecked', notes: '' },
      { id: '1.3.6', requirement: 'Reading order is logical', wcagRef: '1.3.2', status: 'unchecked', notes: '' },
      { id: '1.3.7', requirement: 'Instructions don\'t rely solely on sensory characteristics', wcagRef: '1.3.3', status: 'unchecked', notes: '' },
      { id: '1.3.8', requirement: 'Content works in portrait and landscape', wcagRef: '1.3.4', status: 'unchecked', notes: '' },
      { id: '1.3.9', requirement: 'Autocomplete attributes on input fields', wcagRef: '1.3.5', status: 'unchecked', notes: '' },
    ]
  },
  {
    id: 'perceivable-distinguishable',
    title: '4. Perceivable - Distinguishable (1.4)',
    items: [
      { id: '1.4.1', requirement: 'Color is not the only means of conveying information', wcagRef: '1.4.1', status: 'unchecked', notes: '' },
      { id: '1.4.2', requirement: 'Audio controls available (pause, stop, mute)', wcagRef: '1.4.2', status: 'unchecked', notes: '' },
      { id: '1.4.3', requirement: 'Text contrast ratio is at least 4.5:1', wcagRef: '1.4.3', status: 'unchecked', notes: '' },
      { id: '1.4.4', requirement: 'Large text contrast ratio is at least 3:1', wcagRef: '1.4.3', status: 'unchecked', notes: '' },
      { id: '1.4.5', requirement: 'Text can be resized up to 200% without loss', wcagRef: '1.4.4', status: 'unchecked', notes: '' },
      { id: '1.4.6', requirement: 'No images of text (except logos)', wcagRef: '1.4.5', status: 'unchecked', notes: '' },
      { id: '1.4.7', requirement: 'Content reflows at 320px width', wcagRef: '1.4.10', status: 'unchecked', notes: '' },
      { id: '1.4.8', requirement: 'Non-text contrast is at least 3:1', wcagRef: '1.4.11', status: 'unchecked', notes: '' },
      { id: '1.4.9', requirement: 'Text spacing can be adjusted', wcagRef: '1.4.12', status: 'unchecked', notes: '' },
      { id: '1.4.10', requirement: 'Hover/focus content is dismissible', wcagRef: '1.4.13', status: 'unchecked', notes: '' },
    ]
  },
  {
    id: 'operable-keyboard',
    title: '5. Operable - Keyboard Accessible (2.1)',
    items: [
      { id: '2.1.1', requirement: 'All functionality available via keyboard', wcagRef: '2.1.1', status: 'unchecked', notes: '' },
      { id: '2.1.2', requirement: 'No keyboard traps', wcagRef: '2.1.2', status: 'unchecked', notes: '' },
      { id: '2.1.3', requirement: 'Custom keyboard shortcuts can be disabled', wcagRef: '2.1.4', status: 'unchecked', notes: '' },
      { id: '2.1.4', requirement: 'Focus indicator is visible', wcagRef: '2.4.7', status: 'unchecked', notes: '' },
      { id: '2.1.5', requirement: 'Focus order is logical', wcagRef: '2.4.3', status: 'unchecked', notes: '' },
      { id: '2.1.6', requirement: 'Skip navigation link provided', wcagRef: '2.4.1', status: 'unchecked', notes: '' },
    ]
  },
  {
    id: 'operable-time',
    title: '6. Operable - Enough Time (2.2)',
    items: [
      { id: '2.2.1', requirement: 'Time limits can be extended or disabled', wcagRef: '2.2.1', status: 'unchecked', notes: '' },
      { id: '2.2.2', requirement: 'Auto-updating content can be paused', wcagRef: '2.2.2', status: 'unchecked', notes: '' },
      { id: '2.2.3', requirement: 'No time limits on essential activities', wcagRef: '2.2.1', status: 'unchecked', notes: '' },
      { id: '2.2.4', requirement: 'Session timeout warnings provided', wcagRef: '2.2.1', status: 'unchecked', notes: '' },
    ]
  },
  {
    id: 'operable-seizures',
    title: '7. Operable - Seizures & Physical Reactions (2.3)',
    items: [
      { id: '2.3.1', requirement: 'No content flashes more than 3 times per second', wcagRef: '2.3.1', status: 'unchecked', notes: '' },
      { id: '2.3.2', requirement: 'Animation can be disabled (prefers-reduced-motion)', wcagRef: '2.3.3', status: 'unchecked', notes: '' },
    ]
  },
  {
    id: 'operable-navigable',
    title: '8. Operable - Navigable (2.4)',
    items: [
      { id: '2.4.1', requirement: 'Page has descriptive title', wcagRef: '2.4.2', status: 'unchecked', notes: '' },
      { id: '2.4.2', requirement: 'Multiple ways to navigate (search, sitemap, nav)', wcagRef: '2.4.5', status: 'unchecked', notes: '' },
      { id: '2.4.3', requirement: 'Headings and labels are descriptive', wcagRef: '2.4.6', status: 'unchecked', notes: '' },
      { id: '2.4.4', requirement: 'Link purpose is clear from text', wcagRef: '2.4.4', status: 'unchecked', notes: '' },
      { id: '2.4.5', requirement: 'Breadcrumbs provided where appropriate', wcagRef: '2.4.8', status: 'unchecked', notes: '' },
      { id: '2.4.6', requirement: 'Current location indicated in navigation', wcagRef: '2.4.8', status: 'unchecked', notes: '' },
    ]
  },
  {
    id: 'operable-input',
    title: '9. Operable - Input Modalities (2.5)',
    items: [
      { id: '2.5.1', requirement: 'Touch targets are at least 44x44 pixels', wcagRef: '2.5.5', status: 'unchecked', notes: '' },
      { id: '2.5.2', requirement: 'Drag operations have alternatives', wcagRef: '2.5.7', status: 'unchecked', notes: '' },
      { id: '2.5.3', requirement: 'Motion-based input has alternatives', wcagRef: '2.5.4', status: 'unchecked', notes: '' },
      { id: '2.5.4', requirement: 'Single pointer gestures have alternatives', wcagRef: '2.5.1', status: 'unchecked', notes: '' },
    ]
  },
  {
    id: 'understandable-readable',
    title: '10. Understandable - Readable (3.1)',
    items: [
      { id: '3.1.1', requirement: 'Page language is identified (lang attribute)', wcagRef: '3.1.1', status: 'unchecked', notes: '' },
      { id: '3.1.2', requirement: 'Language changes are marked', wcagRef: '3.1.2', status: 'unchecked', notes: '' },
      { id: '3.1.3', requirement: 'Unusual words/jargon are defined', wcagRef: '3.1.3', status: 'unchecked', notes: '' },
      { id: '3.1.4', requirement: 'Abbreviations are expanded', wcagRef: '3.1.4', status: 'unchecked', notes: '' },
    ]
  },
  {
    id: 'understandable-predictable',
    title: '11. Understandable - Predictable (3.2)',
    items: [
      { id: '3.2.1', requirement: 'Focus doesn\'t trigger unexpected changes', wcagRef: '3.2.1', status: 'unchecked', notes: '' },
      { id: '3.2.2', requirement: 'Input doesn\'t trigger unexpected changes', wcagRef: '3.2.2', status: 'unchecked', notes: '' },
      { id: '3.2.3', requirement: 'Navigation is consistent across pages', wcagRef: '3.2.3', status: 'unchecked', notes: '' },
      { id: '3.2.4', requirement: 'Components with same function are consistent', wcagRef: '3.2.4', status: 'unchecked', notes: '' },
    ]
  },
  {
    id: 'understandable-input',
    title: '12. Understandable - Input Assistance (3.3)',
    items: [
      { id: '3.3.1', requirement: 'Error messages identify the field', wcagRef: '3.3.1', status: 'unchecked', notes: '' },
      { id: '3.3.2', requirement: 'Error messages suggest corrections', wcagRef: '3.3.3', status: 'unchecked', notes: '' },
      { id: '3.3.3', requirement: 'Required fields are indicated', wcagRef: '3.3.2', status: 'unchecked', notes: '' },
      { id: '3.3.4', requirement: 'Input format requirements are shown', wcagRef: '3.3.2', status: 'unchecked', notes: '' },
      { id: '3.3.5', requirement: 'Legal/financial submissions are reversible', wcagRef: '3.3.4', status: 'unchecked', notes: '' },
      { id: '3.3.6', requirement: 'Confirmation before final submission', wcagRef: '3.3.4', status: 'unchecked', notes: '' },
    ]
  },
  {
    id: 'robust',
    title: '13. Robust - Compatible (4.1)',
    items: [
      { id: '4.1.1', requirement: 'HTML validates without errors', wcagRef: '4.1.1', status: 'unchecked', notes: '' },
      { id: '4.1.2', requirement: 'Custom components have ARIA roles', wcagRef: '4.1.2', status: 'unchecked', notes: '' },
      { id: '4.1.3', requirement: 'Status messages use ARIA live regions', wcagRef: '4.1.3', status: 'unchecked', notes: '' },
      { id: '4.1.4', requirement: 'Interactive elements have accessible names', wcagRef: '4.1.2', status: 'unchecked', notes: '' },
    ]
  },
  {
    id: 'forms',
    title: '14. Forms & Interactive Elements',
    items: [
      { id: '14.1', requirement: 'All form fields have visible labels', status: 'unchecked', notes: '' },
      { id: '14.2', requirement: 'Labels are programmatically associated', status: 'unchecked', notes: '' },
      { id: '14.3', requirement: 'Fieldsets group related inputs', status: 'unchecked', notes: '' },
      { id: '14.4', requirement: 'Legends describe fieldset purpose', status: 'unchecked', notes: '' },
      { id: '14.5', requirement: 'Error states are announced to screen readers', status: 'unchecked', notes: '' },
      { id: '14.6', requirement: 'Success states are announced', status: 'unchecked', notes: '' },
      { id: '14.7', requirement: 'Form submission feedback is provided', status: 'unchecked', notes: '' },
      { id: '14.8', requirement: 'Inline validation doesn\'t interrupt users', status: 'unchecked', notes: '' },
    ]
  },
  {
    id: 'modals',
    title: '15. Modal Dialogs & Overlays',
    items: [
      { id: '15.1', requirement: 'Focus moves to modal when opened', status: 'unchecked', notes: '' },
      { id: '15.2', requirement: 'Focus is trapped within modal', status: 'unchecked', notes: '' },
      { id: '15.3', requirement: 'Escape key closes modal', status: 'unchecked', notes: '' },
      { id: '15.4', requirement: 'Focus returns to trigger on close', status: 'unchecked', notes: '' },
      { id: '15.5', requirement: 'Modal has role="dialog" or role="alertdialog"', status: 'unchecked', notes: '' },
      { id: '15.6', requirement: 'Modal has aria-modal="true"', status: 'unchecked', notes: '' },
      { id: '15.7', requirement: 'Background content is inert when modal open', status: 'unchecked', notes: '' },
    ]
  },
  {
    id: 'testing',
    title: '16. Testing & Documentation',
    items: [
      { id: '16.1', requirement: 'Tested with screen reader (NVDA/JAWS/VoiceOver)', status: 'unchecked', notes: '' },
      { id: '16.2', requirement: 'Tested keyboard-only navigation', status: 'unchecked', notes: '' },
      { id: '16.3', requirement: 'Tested at 200% zoom', status: 'unchecked', notes: '' },
      { id: '16.4', requirement: 'Tested with high contrast mode', status: 'unchecked', notes: '' },
      { id: '16.5', requirement: 'Automated testing tools run (axe, WAVE)', status: 'unchecked', notes: '' },
      { id: '16.6', requirement: 'Accessibility statement published', status: 'unchecked', notes: '' },
      { id: '16.7', requirement: 'Contact method for accessibility issues', status: 'unchecked', notes: '' },
      { id: '16.8', requirement: 'VPAT/ACR documentation maintained', status: 'unchecked', notes: '' },
    ]
  },
];

const STORAGE_KEY = 'ada-audit-checklist-data';

const AuditChecklist = () => {
  const { toast } = useToast();
  
  const [auditInfo, setAuditInfo] = useState({
    websiteUrl: '',
    auditorName: '',
    auditDate: new Date().toISOString().split('T')[0],
    reviewPeriod: '',
  });

  const [sections, setSections] = useState<ChecklistSection[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.sections || initialSections.map(s => ({ ...s, sectionNotes: '', isExpanded: false }));
      } catch {
        return initialSections.map(s => ({ ...s, sectionNotes: '', isExpanded: false }));
      }
    }
    return initialSections.map(s => ({ ...s, sectionNotes: '', isExpanded: false }));
  });

  const [criticalIssues, setCriticalIssues] = useState('');
  const [recommendations, setRecommendations] = useState('');

  // Load saved data on mount
  React.useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.auditInfo) setAuditInfo(parsed.auditInfo);
        if (parsed.criticalIssues) setCriticalIssues(parsed.criticalIssues);
        if (parsed.recommendations) setRecommendations(parsed.recommendations);
      } catch (e) {
        console.error('Failed to load saved audit data:', e);
      }
    }
  }, []);

  // Calculate statistics
  const allItems = sections.flatMap(s => s.items);
  const totalItems = allItems.length;
  const passCount = allItems.filter(i => i.status === 'pass').length;
  const failCount = allItems.filter(i => i.status === 'fail').length;
  const partialCount = allItems.filter(i => i.status === 'partial').length;
  const naCount = allItems.filter(i => i.status === 'na').length;
  const checkedCount = passCount + failCount + partialCount + naCount;
  const progressPercent = (checkedCount / totalItems) * 100;
  const compliancePercent = checkedCount > 0 ? ((passCount + naCount) / checkedCount) * 100 : 0;

  const updateItemStatus = useCallback((sectionId: string, itemId: string, status: ItemStatus) => {
    setSections(prev => prev.map(section => 
      section.id === sectionId
        ? { ...section, items: section.items.map(item => 
            item.id === itemId ? { ...item, status } : item
          )}
        : section
    ));
  }, []);

  const updateItemNotes = useCallback((sectionId: string, itemId: string, notes: string) => {
    setSections(prev => prev.map(section => 
      section.id === sectionId
        ? { ...section, items: section.items.map(item => 
            item.id === itemId ? { ...item, notes } : item
          )}
        : section
    ));
  }, []);

  const updateSectionNotes = useCallback((sectionId: string, notes: string) => {
    setSections(prev => prev.map(section => 
      section.id === sectionId ? { ...section, sectionNotes: notes } : section
    ));
  }, []);

  const toggleSection = useCallback((sectionId: string) => {
    setSections(prev => prev.map(section => 
      section.id === sectionId ? { ...section, isExpanded: !section.isExpanded } : section
    ));
  }, []);

  const saveProgress = useCallback(() => {
    const data = { auditInfo, sections, criticalIssues, recommendations };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    toast({ title: 'Progress Saved', description: 'Your audit progress has been saved locally.' });
  }, [auditInfo, sections, criticalIssues, recommendations, toast]);

  const resetChecklist = useCallback(() => {
    if (confirm('Are you sure you want to reset the entire checklist? This cannot be undone.')) {
      setSections(initialSections.map(s => ({ ...s, sectionNotes: '', isExpanded: false })));
      setAuditInfo({ websiteUrl: '', auditorName: '', auditDate: new Date().toISOString().split('T')[0], reviewPeriod: '' });
      setCriticalIssues('');
      setRecommendations('');
      localStorage.removeItem(STORAGE_KEY);
      toast({ title: 'Checklist Reset', description: 'All data has been cleared.' });
    }
  }, [toast]);

  const exportToPDF = useCallback(() => {
    const auditData: AuditData = {
      auditInfo,
      sections: sections.map(s => ({
        title: s.title,
        sectionNotes: s.sectionNotes,
        items: s.items.map(i => ({
          id: i.id,
          requirement: i.requirement,
          wcagRef: i.wcagRef,
          status: i.status as ChecklistItemStatus,
          notes: i.notes,
        })),
      })),
      stats: { totalItems, passCount, failCount, partialCount, naCount },
      criticalIssues,
      recommendations,
    };
    
    generateFilledAuditPDF(auditData);
    toast({ title: 'PDF Generated', description: 'Your completed audit checklist has been downloaded.' });
  }, [auditInfo, sections, totalItems, passCount, failCount, partialCount, naCount, criticalIssues, recommendations, toast]);

  const getStatusButton = (status: ItemStatus, currentStatus: ItemStatus, onClick: () => void) => {
    const isActive = status === currentStatus;
    const configs: Record<ItemStatus, { icon: React.ReactNode; label: string; activeClass: string }> = {
      pass: { icon: <CheckCircle2 className="h-4 w-4" />, label: 'Pass', activeClass: 'bg-green-500 text-white hover:bg-green-600' },
      fail: { icon: <XCircle className="h-4 w-4" />, label: 'Fail', activeClass: 'bg-red-500 text-white hover:bg-red-600' },
      partial: { icon: <AlertCircle className="h-4 w-4" />, label: 'Partial', activeClass: 'bg-amber-500 text-white hover:bg-amber-600' },
      na: { icon: <MinusCircle className="h-4 w-4" />, label: 'N/A', activeClass: 'bg-slate-500 text-white hover:bg-slate-600' },
      unchecked: { icon: null, label: '', activeClass: '' },
    };
    
    if (status === 'unchecked') return null;
    const config = configs[status];
    
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={onClick}
        className={`h-8 px-2 gap-1 ${isActive ? config.activeClass : ''}`}
      >
        {config.icon}
        <span className="hidden sm:inline">{config.label}</span>
      </Button>
    );
  };

  return (
    <AdminGuard>
      <Helmet>
        <title>ADA Audit Checklist | Dr. Troy Williams</title>
        <meta name="description" content="Interactive WCAG 2.1 AA compliance audit checklist" />
      </Helmet>
      
      <NavBar />
      
      <main className="min-h-screen bg-background pt-20 pb-12">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
                  <FileText className="h-8 w-8 text-primary" />
                  ADA Compliance Audit Checklist
                </h1>
                <p className="text-muted-foreground mt-1">WCAG 2.1 AA Interactive Assessment</p>
              </div>
              <div className="flex gap-2 flex-wrap">
                <Button onClick={saveProgress} variant="outline" className="gap-2">
                  <Save className="h-4 w-4" /> Save Progress
                </Button>
                <Button onClick={resetChecklist} variant="outline" className="gap-2">
                  <RotateCcw className="h-4 w-4" /> Reset
                </Button>
                <Button onClick={exportToPDF} className="gap-2">
                  <Download className="h-4 w-4" /> Export PDF
                </Button>
              </div>
            </div>

            {/* Progress Overview */}
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">{totalItems}</div>
                    <div className="text-xs text-muted-foreground">Total Items</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{passCount}</div>
                    <div className="text-xs text-muted-foreground">Passed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">{failCount}</div>
                    <div className="text-xs text-muted-foreground">Failed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-amber-600">{partialCount}</div>
                    <div className="text-xs text-muted-foreground">Partial</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-600">{naCount}</div>
                    <div className="text-xs text-muted-foreground">N/A</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{Math.round(compliancePercent)}%</div>
                    <div className="text-xs text-muted-foreground">Compliance</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Audit Progress</span>
                    <span>{checkedCount} / {totalItems} items checked</span>
                  </div>
                  <Progress value={progressPercent} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Audit Info */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Audit Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">Website URL</label>
                    <Input
                      value={auditInfo.websiteUrl}
                      onChange={e => setAuditInfo(prev => ({ ...prev, websiteUrl: e.target.value }))}
                      placeholder="https://example.com"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Auditor Name</label>
                    <Input
                      value={auditInfo.auditorName}
                      onChange={e => setAuditInfo(prev => ({ ...prev, auditorName: e.target.value }))}
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Audit Date</label>
                    <Input
                      type="date"
                      value={auditInfo.auditDate}
                      onChange={e => setAuditInfo(prev => ({ ...prev, auditDate: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Review Period</label>
                    <Input
                      value={auditInfo.reviewPeriod}
                      onChange={e => setAuditInfo(prev => ({ ...prev, reviewPeriod: e.target.value }))}
                      placeholder="Q4 2024"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Checklist Sections */}
          <div className="space-y-4">
            {sections.map(section => {
              const sectionPass = section.items.filter(i => i.status === 'pass').length;
              const sectionTotal = section.items.length;
              const sectionChecked = section.items.filter(i => i.status !== 'unchecked').length;
              
              return (
                <Collapsible
                  key={section.id}
                  open={section.isExpanded}
                  onOpenChange={() => toggleSection(section.id)}
                >
                  <Card>
                    <CollapsibleTrigger asChild>
                      <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base flex items-center gap-2">
                            <ChevronDown className={`h-4 w-4 transition-transform ${section.isExpanded ? 'rotate-180' : ''}`} />
                            {section.title}
                          </CardTitle>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{sectionChecked}/{sectionTotal}</Badge>
                            {sectionChecked === sectionTotal && sectionPass === sectionTotal && (
                              <Badge className="bg-green-500">Complete</Badge>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <CardContent className="pt-0 space-y-4">
                        {section.items.map(item => (
                          <div key={item.id} className="border rounded-lg p-4 space-y-3">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <Badge variant="secondary" className="text-xs">{item.id}</Badge>
                                  {item.wcagRef && (
                                    <Badge variant="outline" className="text-xs">WCAG {item.wcagRef}</Badge>
                                  )}
                                </div>
                                <p className="text-sm text-foreground">{item.requirement}</p>
                              </div>
                              <div className="flex gap-1">
                                {getStatusButton('pass', item.status, () => updateItemStatus(section.id, item.id, 'pass'))}
                                {getStatusButton('fail', item.status, () => updateItemStatus(section.id, item.id, 'fail'))}
                                {getStatusButton('partial', item.status, () => updateItemStatus(section.id, item.id, 'partial'))}
                                {getStatusButton('na', item.status, () => updateItemStatus(section.id, item.id, 'na'))}
                              </div>
                            </div>
                            <Input
                              placeholder="Add notes for this item..."
                              value={item.notes}
                              onChange={e => updateItemNotes(section.id, item.id, e.target.value)}
                              className="text-sm"
                            />
                          </div>
                        ))}
                        <div>
                          <label className="text-sm font-medium text-foreground">Section Notes</label>
                          <Textarea
                            placeholder="Add general notes for this section..."
                            value={section.sectionNotes}
                            onChange={e => updateSectionNotes(section.id, e.target.value)}
                            rows={2}
                          />
                        </div>
                      </CardContent>
                    </CollapsibleContent>
                  </Card>
                </Collapsible>
              );
            })}
          </div>

          {/* Summary Section */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Audit Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground">Critical Issues Identified</label>
                <Textarea
                  value={criticalIssues}
                  onChange={e => setCriticalIssues(e.target.value)}
                  placeholder="List critical accessibility issues that must be addressed..."
                  rows={4}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Recommendations</label>
                <Textarea
                  value={recommendations}
                  onChange={e => setRecommendations(e.target.value)}
                  placeholder="Provide recommendations for improving accessibility..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Export Actions */}
          <div className="mt-8 flex justify-center gap-4">
            <Button onClick={saveProgress} variant="outline" size="lg" className="gap-2">
              <Save className="h-5 w-5" /> Save Progress
            </Button>
            <Button onClick={exportToPDF} size="lg" className="gap-2">
              <Download className="h-5 w-5" /> Export Completed Audit PDF
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </AdminGuard>
  );
};

export default AuditChecklist;
