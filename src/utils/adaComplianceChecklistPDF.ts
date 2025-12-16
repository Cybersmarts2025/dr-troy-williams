import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface ChecklistItem {
  id: string;
  requirement: string;
  wcagRef?: string;
}

interface ChecklistSection {
  title: string;
  items: ChecklistItem[];
}

const complianceChecklist: ChecklistSection[] = [
  {
    title: '1. Perceivable - Text Alternatives (1.1)',
    items: [
      { id: '1.1.1', requirement: 'All images have descriptive alt text', wcagRef: '1.1.1' },
      { id: '1.1.2', requirement: 'Decorative images have empty alt="" or role="presentation"', wcagRef: '1.1.1' },
      { id: '1.1.3', requirement: 'Complex images have extended descriptions', wcagRef: '1.1.1' },
      { id: '1.1.4', requirement: 'Icons have accessible names (aria-label or sr-only text)', wcagRef: '1.1.1' },
      { id: '1.1.5', requirement: 'Charts/graphs have text alternatives', wcagRef: '1.1.1' },
      { id: '1.1.6', requirement: 'CAPTCHAs have audio alternatives', wcagRef: '1.1.1' },
    ]
  },
  {
    title: '2. Perceivable - Time-Based Media (1.2)',
    items: [
      { id: '1.2.1', requirement: 'Videos have captions', wcagRef: '1.2.2' },
      { id: '1.2.2', requirement: 'Audio content has transcripts', wcagRef: '1.2.1' },
      { id: '1.2.3', requirement: 'Live audio has real-time captions', wcagRef: '1.2.4' },
      { id: '1.2.4', requirement: 'Videos have audio descriptions', wcagRef: '1.2.5' },
      { id: '1.2.5', requirement: 'Media players are keyboard accessible', wcagRef: '1.2' },
    ]
  },
  {
    title: '3. Perceivable - Adaptable (1.3)',
    items: [
      { id: '1.3.1', requirement: 'Proper heading hierarchy (h1-h6)', wcagRef: '1.3.1' },
      { id: '1.3.2', requirement: 'Lists use proper markup (ul, ol, dl)', wcagRef: '1.3.1' },
      { id: '1.3.3', requirement: 'Tables have headers (th) and scope attributes', wcagRef: '1.3.1' },
      { id: '1.3.4', requirement: 'Form fields have associated labels', wcagRef: '1.3.1' },
      { id: '1.3.5', requirement: 'Landmark regions defined (main, nav, header, footer)', wcagRef: '1.3.1' },
      { id: '1.3.6', requirement: 'Reading order is logical', wcagRef: '1.3.2' },
      { id: '1.3.7', requirement: 'Instructions don\'t rely solely on sensory characteristics', wcagRef: '1.3.3' },
      { id: '1.3.8', requirement: 'Content works in portrait and landscape', wcagRef: '1.3.4' },
      { id: '1.3.9', requirement: 'Autocomplete attributes on input fields', wcagRef: '1.3.5' },
    ]
  },
  {
    title: '4. Perceivable - Distinguishable (1.4)',
    items: [
      { id: '1.4.1', requirement: 'Color is not the only means of conveying information', wcagRef: '1.4.1' },
      { id: '1.4.2', requirement: 'Audio controls available (pause, stop, mute)', wcagRef: '1.4.2' },
      { id: '1.4.3', requirement: 'Text contrast ratio is at least 4.5:1', wcagRef: '1.4.3' },
      { id: '1.4.4', requirement: 'Large text contrast ratio is at least 3:1', wcagRef: '1.4.3' },
      { id: '1.4.5', requirement: 'Text can be resized up to 200% without loss', wcagRef: '1.4.4' },
      { id: '1.4.6', requirement: 'No images of text (except logos)', wcagRef: '1.4.5' },
      { id: '1.4.7', requirement: 'Content reflows at 320px width', wcagRef: '1.4.10' },
      { id: '1.4.8', requirement: 'Non-text contrast is at least 3:1', wcagRef: '1.4.11' },
      { id: '1.4.9', requirement: 'Text spacing can be adjusted', wcagRef: '1.4.12' },
      { id: '1.4.10', requirement: 'Hover/focus content is dismissible', wcagRef: '1.4.13' },
    ]
  },
  {
    title: '5. Operable - Keyboard Accessible (2.1)',
    items: [
      { id: '2.1.1', requirement: 'All functionality available via keyboard', wcagRef: '2.1.1' },
      { id: '2.1.2', requirement: 'No keyboard traps', wcagRef: '2.1.2' },
      { id: '2.1.3', requirement: 'Custom keyboard shortcuts can be disabled', wcagRef: '2.1.4' },
      { id: '2.1.4', requirement: 'Focus indicator is visible', wcagRef: '2.4.7' },
      { id: '2.1.5', requirement: 'Focus order is logical', wcagRef: '2.4.3' },
      { id: '2.1.6', requirement: 'Skip navigation link provided', wcagRef: '2.4.1' },
    ]
  },
  {
    title: '6. Operable - Enough Time (2.2)',
    items: [
      { id: '2.2.1', requirement: 'Time limits can be extended or disabled', wcagRef: '2.2.1' },
      { id: '2.2.2', requirement: 'Auto-updating content can be paused', wcagRef: '2.2.2' },
      { id: '2.2.3', requirement: 'No time limits on essential activities', wcagRef: '2.2.1' },
      { id: '2.2.4', requirement: 'Session timeout warnings provided', wcagRef: '2.2.1' },
    ]
  },
  {
    title: '7. Operable - Seizures & Physical Reactions (2.3)',
    items: [
      { id: '2.3.1', requirement: 'No content flashes more than 3 times per second', wcagRef: '2.3.1' },
      { id: '2.3.2', requirement: 'Animation can be disabled (prefers-reduced-motion)', wcagRef: '2.3.3' },
    ]
  },
  {
    title: '8. Operable - Navigable (2.4)',
    items: [
      { id: '2.4.1', requirement: 'Page has descriptive title', wcagRef: '2.4.2' },
      { id: '2.4.2', requirement: 'Multiple ways to navigate (search, sitemap, nav)', wcagRef: '2.4.5' },
      { id: '2.4.3', requirement: 'Headings and labels are descriptive', wcagRef: '2.4.6' },
      { id: '2.4.4', requirement: 'Link purpose is clear from text', wcagRef: '2.4.4' },
      { id: '2.4.5', requirement: 'Breadcrumbs provided where appropriate', wcagRef: '2.4.8' },
      { id: '2.4.6', requirement: 'Current location indicated in navigation', wcagRef: '2.4.8' },
    ]
  },
  {
    title: '9. Operable - Input Modalities (2.5)',
    items: [
      { id: '2.5.1', requirement: 'Touch targets are at least 44x44 pixels', wcagRef: '2.5.5' },
      { id: '2.5.2', requirement: 'Drag operations have alternatives', wcagRef: '2.5.7' },
      { id: '2.5.3', requirement: 'Motion-based input has alternatives', wcagRef: '2.5.4' },
      { id: '2.5.4', requirement: 'Single pointer gestures have alternatives', wcagRef: '2.5.1' },
    ]
  },
  {
    title: '10. Understandable - Readable (3.1)',
    items: [
      { id: '3.1.1', requirement: 'Page language is identified (lang attribute)', wcagRef: '3.1.1' },
      { id: '3.1.2', requirement: 'Language changes are marked', wcagRef: '3.1.2' },
      { id: '3.1.3', requirement: 'Unusual words/jargon are defined', wcagRef: '3.1.3' },
      { id: '3.1.4', requirement: 'Abbreviations are expanded', wcagRef: '3.1.4' },
    ]
  },
  {
    title: '11. Understandable - Predictable (3.2)',
    items: [
      { id: '3.2.1', requirement: 'Focus doesn\'t trigger unexpected changes', wcagRef: '3.2.1' },
      { id: '3.2.2', requirement: 'Input doesn\'t trigger unexpected changes', wcagRef: '3.2.2' },
      { id: '3.2.3', requirement: 'Navigation is consistent across pages', wcagRef: '3.2.3' },
      { id: '3.2.4', requirement: 'Components with same function are consistent', wcagRef: '3.2.4' },
    ]
  },
  {
    title: '12. Understandable - Input Assistance (3.3)',
    items: [
      { id: '3.3.1', requirement: 'Error messages identify the field', wcagRef: '3.3.1' },
      { id: '3.3.2', requirement: 'Error messages suggest corrections', wcagRef: '3.3.3' },
      { id: '3.3.3', requirement: 'Required fields are indicated', wcagRef: '3.3.2' },
      { id: '3.3.4', requirement: 'Input format requirements are shown', wcagRef: '3.3.2' },
      { id: '3.3.5', requirement: 'Legal/financial submissions are reversible', wcagRef: '3.3.4' },
      { id: '3.3.6', requirement: 'Confirmation before final submission', wcagRef: '3.3.4' },
    ]
  },
  {
    title: '13. Robust - Compatible (4.1)',
    items: [
      { id: '4.1.1', requirement: 'HTML validates without errors', wcagRef: '4.1.1' },
      { id: '4.1.2', requirement: 'Custom components have ARIA roles', wcagRef: '4.1.2' },
      { id: '4.1.3', requirement: 'Status messages use ARIA live regions', wcagRef: '4.1.3' },
      { id: '4.1.4', requirement: 'Interactive elements have accessible names', wcagRef: '4.1.2' },
    ]
  },
  {
    title: '14. Forms & Interactive Elements',
    items: [
      { id: '14.1', requirement: 'All form fields have visible labels' },
      { id: '14.2', requirement: 'Labels are programmatically associated' },
      { id: '14.3', requirement: 'Fieldsets group related inputs' },
      { id: '14.4', requirement: 'Legends describe fieldset purpose' },
      { id: '14.5', requirement: 'Error states are announced to screen readers' },
      { id: '14.6', requirement: 'Success states are announced' },
      { id: '14.7', requirement: 'Form submission feedback is provided' },
      { id: '14.8', requirement: 'Inline validation doesn\'t interrupt users' },
    ]
  },
  {
    title: '15. Modal Dialogs & Overlays',
    items: [
      { id: '15.1', requirement: 'Focus moves to modal when opened' },
      { id: '15.2', requirement: 'Focus is trapped within modal' },
      { id: '15.3', requirement: 'Escape key closes modal' },
      { id: '15.4', requirement: 'Focus returns to trigger on close' },
      { id: '15.5', requirement: 'Modal has role="dialog" or role="alertdialog"' },
      { id: '15.6', requirement: 'Modal has aria-modal="true"' },
      { id: '15.7', requirement: 'Background content is inert when modal open' },
    ]
  },
  {
    title: '16. Testing & Documentation',
    items: [
      { id: '16.1', requirement: 'Tested with screen reader (NVDA/JAWS/VoiceOver)' },
      { id: '16.2', requirement: 'Tested keyboard-only navigation' },
      { id: '16.3', requirement: 'Tested at 200% zoom' },
      { id: '16.4', requirement: 'Tested with high contrast mode' },
      { id: '16.5', requirement: 'Automated testing tools run (axe, WAVE)' },
      { id: '16.6', requirement: 'Accessibility statement published' },
      { id: '16.7', requirement: 'Contact method for accessibility issues' },
      { id: '16.8', requirement: 'VPAT/ACR documentation maintained' },
    ]
  },
];

export const generateADAComplianceChecklistPDF = (): void => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  let yPosition = margin;

  // Header
  doc.setFillColor(30, 41, 59); // slate-800
  doc.rect(0, 0, pageWidth, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('ADA/WCAG 2.1 AA Compliance Checklist', margin, 18);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Comprehensive Audit Document for Web Accessibility', margin, 28);
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, margin, 35);

  yPosition = 50;

  // Audit Info Section
  doc.setTextColor(30, 41, 59);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Audit Information', margin, yPosition);
  yPosition += 8;

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setDrawColor(200, 200, 200);
  
  const auditFields = [
    'Website URL: _________________________________________________',
    'Auditor Name: ________________________________________________',
    'Audit Date: __________________________________________________',
    'Review Period: _______________________________________________',
  ];

  auditFields.forEach(field => {
    doc.text(field, margin, yPosition);
    yPosition += 7;
  });

  yPosition += 5;

  // Legend
  doc.setFillColor(241, 245, 249); // slate-100
  doc.rect(margin, yPosition, pageWidth - (margin * 2), 20, 'F');
  yPosition += 6;
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('Legend:', margin + 4, yPosition);
  
  doc.setFont('helvetica', 'normal');
  doc.text('☐ = Not Checked    ☑ = Pass    ☒ = Fail    N/A = Not Applicable    P = Partial', margin + 25, yPosition);
  yPosition += 8;
  doc.text('WCAG Ref = Web Content Accessibility Guidelines Reference Number', margin + 4, yPosition);
  yPosition += 12;

  // Process each section
  complianceChecklist.forEach((section, sectionIndex) => {
    // Check if we need a new page
    const estimatedHeight = 15 + (section.items.length * 22);
    if (yPosition + Math.min(estimatedHeight, 80) > pageHeight - 30) {
      doc.addPage();
      yPosition = margin;
    }

    // Section header
    doc.setFillColor(59, 130, 246); // blue-500
    doc.rect(margin, yPosition, pageWidth - (margin * 2), 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(section.title, margin + 3, yPosition + 5.5);
    yPosition += 12;

    // Table for items
    const tableData = section.items.map(item => [
      '☐',
      item.id,
      item.requirement,
      item.wcagRef || '-',
      '' // Notes column
    ]);

    autoTable(doc, {
      startY: yPosition,
      head: [['Status', 'ID', 'Requirement', 'WCAG', 'Notes']],
      body: tableData,
      margin: { left: margin, right: margin },
      theme: 'grid',
      styles: {
        fontSize: 8,
        cellPadding: 3,
        lineColor: [200, 200, 200],
        lineWidth: 0.1,
      },
      headStyles: {
        fillColor: [241, 245, 249],
        textColor: [30, 41, 59],
        fontStyle: 'bold',
        fontSize: 8,
      },
      columnStyles: {
        0: { cellWidth: 12, halign: 'center' },
        1: { cellWidth: 12 },
        2: { cellWidth: 95 },
        3: { cellWidth: 14, halign: 'center' },
        4: { cellWidth: 40 },
      },
      didDrawPage: (data) => {
        // Footer on each page
        doc.setFontSize(8);
        doc.setTextColor(128, 128, 128);
        doc.text(
          `Page ${doc.getCurrentPageInfo().pageNumber}`,
          pageWidth / 2,
          pageHeight - 10,
          { align: 'center' }
        );
      },
    });

    yPosition = (doc as any).lastAutoTable.finalY + 10;
  });

  // Add summary page
  doc.addPage();
  yPosition = margin;

  // Summary header
  doc.setFillColor(30, 41, 59);
  doc.rect(0, 0, pageWidth, 25, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Audit Summary & Sign-Off', margin, 17);
  yPosition = 35;

  // Summary stats section
  doc.setTextColor(30, 41, 59);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Compliance Summary', margin, yPosition);
  yPosition += 10;

  const totalItems = complianceChecklist.reduce((acc, section) => acc + section.items.length, 0);
  
  autoTable(doc, {
    startY: yPosition,
    head: [['Metric', 'Count', 'Percentage']],
    body: [
      ['Total Items Audited', totalItems.toString(), '100%'],
      ['Items Passed', '____', '____%'],
      ['Items Failed', '____', '____%'],
      ['Items N/A', '____', '____%'],
      ['Items Partial', '____', '____%'],
    ],
    margin: { left: margin, right: margin },
    theme: 'grid',
    styles: { fontSize: 10, cellPadding: 5 },
    headStyles: { fillColor: [59, 130, 246], textColor: [255, 255, 255] },
    columnStyles: {
      0: { cellWidth: 80 },
      1: { cellWidth: 40, halign: 'center' },
      2: { cellWidth: 40, halign: 'center' },
    },
  });

  yPosition = (doc as any).lastAutoTable.finalY + 15;

  // Critical Issues Section
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Critical Issues Identified', margin, yPosition);
  yPosition += 8;

  doc.setDrawColor(200, 200, 200);
  for (let i = 0; i < 6; i++) {
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 12;
  }

  yPosition += 5;

  // Recommendations Section
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Recommendations', margin, yPosition);
  yPosition += 8;

  for (let i = 0; i < 6; i++) {
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 12;
  }

  yPosition += 10;

  // Sign-off section
  doc.setFillColor(241, 245, 249);
  doc.rect(margin, yPosition, pageWidth - (margin * 2), 50, 'F');
  yPosition += 10;

  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Auditor Sign-Off', margin + 5, yPosition);
  yPosition += 12;

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('Auditor Signature: ________________________________    Date: ________________', margin + 5, yPosition);
  yPosition += 10;
  doc.text('Reviewer Signature: ________________________________    Date: ________________', margin + 5, yPosition);
  yPosition += 10;
  doc.text('Compliance Status:  ☐ Compliant    ☐ Partially Compliant    ☐ Non-Compliant', margin + 5, yPosition);

  // Footer
  doc.setFontSize(8);
  doc.setTextColor(128, 128, 128);
  doc.text('Dr. Troy Williams | Protecting America Through Technology™', pageWidth / 2, pageHeight - 10, { align: 'center' });

  // Save the PDF
  doc.save(`ADA-WCAG-Compliance-Checklist-${new Date().toISOString().split('T')[0]}.pdf`);
};
