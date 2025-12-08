import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export type ChecklistItemStatus = 'unchecked' | 'pass' | 'fail' | 'partial' | 'na';

export interface AuditData {
  auditInfo: {
    websiteUrl: string;
    auditorName: string;
    auditDate: string;
    reviewPeriod: string;
  };
  sections: {
    title: string;
    sectionNotes: string;
    items: {
      id: string;
      requirement: string;
      wcagRef?: string;
      status: ChecklistItemStatus;
      notes: string;
    }[];
  }[];
  stats: {
    totalItems: number;
    passCount: number;
    failCount: number;
    partialCount: number;
    naCount: number;
  };
  criticalIssues: string;
  recommendations: string;
}

const statusSymbols: Record<ChecklistItemStatus, string> = {
  unchecked: '☐',
  pass: '✓',
  fail: '✗',
  partial: '◐',
  na: '—',
};

const statusColors: Record<ChecklistItemStatus, [number, number, number]> = {
  unchecked: [128, 128, 128],
  pass: [34, 197, 94],
  fail: [239, 68, 68],
  partial: [245, 158, 11],
  na: [100, 116, 139],
};

export const generateFilledAuditPDF = (data: AuditData): void => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  let yPosition = margin;

  // Header
  doc.setFillColor(30, 41, 59);
  doc.rect(0, 0, pageWidth, 45, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('ADA/WCAG 2.1 AA Compliance Audit Report', margin, 18);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Website: ${data.auditInfo.websiteUrl || 'Not specified'}`, margin, 28);
  doc.text(`Auditor: ${data.auditInfo.auditorName || 'Not specified'}`, margin, 35);
  doc.text(`Date: ${data.auditInfo.auditDate || 'Not specified'}  |  Period: ${data.auditInfo.reviewPeriod || 'Not specified'}`, margin, 42);

  yPosition = 55;

  // Executive Summary
  const { stats } = data;
  const checkedItems = stats.passCount + stats.failCount + stats.partialCount + stats.naCount;
  const complianceRate = checkedItems > 0 ? Math.round(((stats.passCount + stats.naCount) / checkedItems) * 100) : 0;
  
  doc.setTextColor(30, 41, 59);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Executive Summary', margin, yPosition);
  yPosition += 10;

  // Summary stats table
  autoTable(doc, {
    startY: yPosition,
    head: [['Metric', 'Count', 'Percentage']],
    body: [
      ['Total Items Audited', stats.totalItems.toString(), '100%'],
      ['Items Passed', stats.passCount.toString(), `${Math.round((stats.passCount / stats.totalItems) * 100)}%`],
      ['Items Failed', stats.failCount.toString(), `${Math.round((stats.failCount / stats.totalItems) * 100)}%`],
      ['Items Partial', stats.partialCount.toString(), `${Math.round((stats.partialCount / stats.totalItems) * 100)}%`],
      ['Items N/A', stats.naCount.toString(), `${Math.round((stats.naCount / stats.totalItems) * 100)}%`],
      ['Overall Compliance', `${complianceRate}%`, complianceRate >= 90 ? 'Good' : complianceRate >= 70 ? 'Needs Work' : 'Critical'],
    ],
    margin: { left: margin, right: margin },
    theme: 'grid',
    styles: { fontSize: 9, cellPadding: 4 },
    headStyles: { fillColor: [59, 130, 246], textColor: [255, 255, 255] },
    columnStyles: {
      0: { cellWidth: 60 },
      1: { cellWidth: 30, halign: 'center' },
      2: { cellWidth: 30, halign: 'center' },
    },
  });

  yPosition = (doc as any).lastAutoTable.finalY + 10;

  // Compliance Status Badge
  const statusColor = complianceRate >= 90 ? [34, 197, 94] : complianceRate >= 70 ? [245, 158, 11] : [239, 68, 68];
  const statusText = complianceRate >= 90 ? 'COMPLIANT' : complianceRate >= 70 ? 'PARTIALLY COMPLIANT' : 'NON-COMPLIANT';
  
  doc.setFillColor(statusColor[0], statusColor[1], statusColor[2]);
  doc.roundedRect(margin, yPosition, 60, 10, 2, 2, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text(statusText, margin + 30, yPosition + 7, { align: 'center' });

  yPosition += 20;

  // Legend
  doc.setTextColor(30, 41, 59);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('Legend:', margin, yPosition);
  doc.setFont('helvetica', 'normal');
  doc.text('✓ = Pass    ✗ = Fail    ◐ = Partial    — = N/A    ☐ = Not Checked', margin + 20, yPosition);
  yPosition += 10;

  // Process each section
  data.sections.forEach((section) => {
    // Check for page break
    if (yPosition > pageHeight - 60) {
      doc.addPage();
      yPosition = margin;
    }

    // Section header
    doc.setFillColor(59, 130, 246);
    doc.rect(margin, yPosition, pageWidth - (margin * 2), 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(section.title, margin + 3, yPosition + 5.5);
    yPosition += 12;

    // Items table
    const tableData = section.items.map(item => {
      const statusSymbol = statusSymbols[item.status];
      return [
        statusSymbol,
        item.id,
        item.requirement,
        item.wcagRef || '-',
        item.notes || '-'
      ];
    });

    autoTable(doc, {
      startY: yPosition,
      head: [['Status', 'ID', 'Requirement', 'WCAG', 'Notes']],
      body: tableData,
      margin: { left: margin, right: margin },
      theme: 'grid',
      styles: {
        fontSize: 7,
        cellPadding: 2,
        lineColor: [200, 200, 200],
        lineWidth: 0.1,
      },
      headStyles: {
        fillColor: [241, 245, 249],
        textColor: [30, 41, 59],
        fontStyle: 'bold',
        fontSize: 7,
      },
      columnStyles: {
        0: { cellWidth: 12, halign: 'center' },
        1: { cellWidth: 12 },
        2: { cellWidth: 70 },
        3: { cellWidth: 12, halign: 'center' },
        4: { cellWidth: 65 },
      },
      didParseCell: (hookData) => {
        if (hookData.column.index === 0 && hookData.section === 'body') {
          const status = section.items[hookData.row.index]?.status;
          if (status && statusColors[status]) {
            hookData.cell.styles.textColor = statusColors[status];
            hookData.cell.styles.fontStyle = 'bold';
          }
        }
      },
      didDrawPage: () => {
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

    yPosition = (doc as any).lastAutoTable.finalY + 5;

    // Section notes
    if (section.sectionNotes) {
      doc.setFontSize(8);
      doc.setTextColor(100, 100, 100);
      doc.setFont('helvetica', 'italic');
      const noteLines = doc.splitTextToSize(`Section Notes: ${section.sectionNotes}`, pageWidth - (margin * 2));
      doc.text(noteLines, margin, yPosition);
      yPosition += noteLines.length * 4 + 5;
    }

    yPosition += 5;
  });

  // Critical Issues Page
  doc.addPage();
  yPosition = margin;

  doc.setFillColor(239, 68, 68);
  doc.rect(0, 0, pageWidth, 20, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Critical Issues Identified', margin, 14);
  yPosition = 30;

  doc.setTextColor(30, 41, 59);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  
  if (data.criticalIssues) {
    const issueLines = doc.splitTextToSize(data.criticalIssues, pageWidth - (margin * 2));
    doc.text(issueLines, margin, yPosition);
    yPosition += issueLines.length * 5 + 15;
  } else {
    doc.setTextColor(128, 128, 128);
    doc.text('No critical issues documented.', margin, yPosition);
    yPosition += 20;
  }

  // Recommendations
  doc.setFillColor(59, 130, 246);
  doc.rect(0, yPosition, pageWidth, 20, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Recommendations', margin, yPosition + 14);
  yPosition += 30;

  doc.setTextColor(30, 41, 59);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  
  if (data.recommendations) {
    const recLines = doc.splitTextToSize(data.recommendations, pageWidth - (margin * 2));
    doc.text(recLines, margin, yPosition);
    yPosition += recLines.length * 5 + 20;
  } else {
    doc.setTextColor(128, 128, 128);
    doc.text('No recommendations documented.', margin, yPosition);
    yPosition += 20;
  }

  // Sign-off section
  if (yPosition > pageHeight - 80) {
    doc.addPage();
    yPosition = margin;
  }

  doc.setFillColor(241, 245, 249);
  doc.rect(margin, yPosition, pageWidth - (margin * 2), 55, 'F');
  yPosition += 10;

  doc.setTextColor(30, 41, 59);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Auditor Sign-Off', margin + 5, yPosition);
  yPosition += 12;

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('Auditor Signature: ________________________________    Date: ________________', margin + 5, yPosition);
  yPosition += 10;
  doc.text('Reviewer Signature: ________________________________    Date: ________________', margin + 5, yPosition);
  yPosition += 12;
  
  const complianceStatus = complianceRate >= 90 ? 'Compliant' : complianceRate >= 70 ? 'Partially Compliant' : 'Non-Compliant';
  doc.text(`Final Compliance Status: ${complianceStatus} (${complianceRate}%)`, margin + 5, yPosition);

  // Footer
  doc.setFontSize(8);
  doc.setTextColor(128, 128, 128);
  doc.text('Dr. Troy Williams | Protecting America Through Technology™', pageWidth / 2, pageHeight - 10, { align: 'center' });

  // Save
  const filename = `ADA-Audit-Report-${data.auditInfo.websiteUrl?.replace(/[^a-z0-9]/gi, '-') || 'website'}-${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(filename);
};
