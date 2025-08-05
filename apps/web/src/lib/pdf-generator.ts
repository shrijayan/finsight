import { AnalysisReport } from 'lib/src/types';

/**
 * Generate PDF report from analysis data
 * This is a basic implementation that creates a simple PDF structure
 * @param report - Analysis report data
 * @returns PDF buffer
 */
export async function generateReportPDF(report: AnalysisReport): Promise<Buffer> {
  try {
    // Basic PDF generation using simple text-based approach
    // In a production environment, you might want to use libraries like:
    // - jsPDF with html2canvas for client-side generation
    // - Puppeteer for server-side generation with HTML templates
    // - PDFKit for programmatic PDF creation
    
    const pdfContent = generatePDFContent(report);
    
    // For now, return a simple text-based PDF structure
    // This is a minimal implementation to satisfy the interface
    const buffer = Buffer.from(pdfContent, 'utf8');
    return buffer;

  } catch (error) {
    console.error('PDF generation error:', error);
    throw new Error('Failed to generate PDF report');
  }
}

/**
 * Generate PDF content as text (basic implementation)
 * @param report - Analysis report data
 * @returns PDF content string
 */
function generatePDFContent(report: AnalysisReport): string {
  const createdDate = new Date(report.createdAt).toLocaleDateString();
  const data = report.generatedData;
  
  let content = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
/Resources <<
/Font <<
/F1 5 0 R
>>
>>
>>
endobj

4 0 obj
<<
/Length 1000
>>
stream
BT
/F1 16 Tf
50 750 Td
(${report.reportTitle}) Tj
0 -30 Td
/F1 12 Tf
(Generated on: ${createdDate}) Tj
0 -40 Td
/F1 14 Tf
(Financial Summary) Tj
0 -25 Td
/F1 12 Tf`;

  if (data) {
    content += `
(Total Income: $${data.totalIncome?.toLocaleString() || 0}) Tj
0 -20 Td
(Total Expenses: $${data.totalExpenses?.toLocaleString() || 0}) Tj
0 -20 Td
(Net Cash Flow: $${data.netCashFlow?.toLocaleString() || 0}) Tj
0 -30 Td`;

    // Add insights if available
    if (data.insights && data.insights.length > 0) {
      content += `/F1 14 Tf
(Key Insights) Tj
0 -25 Td
/F1 10 Tf`;
      
      data.insights.slice(0, 5).forEach((insight, index) => {
        const truncatedInsight = insight.description.substring(0, 80);
        content += `
(${index + 1}. ${truncatedInsight}${insight.description.length > 80 ? '...' : ''}) Tj
0 -15 Td`;
      });
    }

    // Add recommendations if available
    if (data.recommendations && data.recommendations.length > 0) {
      content += `
0 -20 Td
/F1 14 Tf
(Recommendations) Tj
0 -25 Td
/F1 10 Tf`;
      
      data.recommendations.slice(0, 5).forEach((rec, index) => {
        const truncatedRec = rec.suggestion.substring(0, 70);
        content += `
(${index + 1}. ${truncatedRec}${rec.suggestion.length > 70 ? '...' : ''}) Tj
0 -15 Td
(   Potential savings: $${rec.potentialSavings?.toLocaleString() || 0}) Tj
0 -15 Td`;
      });
    }
  }

  content += `
ET
endstream
endobj

5 0 obj
<<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
endobj

xref
0 6
0000000000 65535 f 
0000000010 00000 n 
0000000053 00000 n 
0000000104 00000 n 
0000000210 00000 n 
0000001300 00000 n 
trailer
<<
/Size 6
/Root 1 0 R
>>
startxref
1360
%%EOF`;

  return content;
}

/**
 * Advanced PDF generation using HTML template (future implementation)
 * This would be used with Puppeteer or similar libraries
 */
export function generateHTMLTemplate(report: AnalysisReport): string {
  const createdDate = new Date(report.createdAt).toLocaleDateString();
  const data = report.generatedData;
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>${report.reportTitle}</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 40px; }
            .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 20px; }
            .section { margin: 30px 0; }
            .metrics { display: flex; justify-content: space-around; margin: 20px 0; }
            .metric { text-align: center; padding: 15px; background: #f5f5f5; border-radius: 5px; }
            .insights, .recommendations { margin: 20px 0; }
            .insight-item, .rec-item { margin: 10px 0; padding: 10px; background: #f9f9f9; border-left: 4px solid #007bff; }
            @media print { body { margin: 0; } }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>${report.reportTitle}</h1>
            <p>Generated on: ${createdDate}</p>
            <p>Source Documents: ${report.sourceDocumentCount}</p>
        </div>
        
        ${data ? `
        <div class="section">
            <h2>Financial Summary</h2>
            <div class="metrics">
                <div class="metric">
                    <h3>Total Income</h3>
                    <p>$${data.totalIncome?.toLocaleString() || 0}</p>
                </div>
                <div class="metric">
                    <h3>Total Expenses</h3>
                    <p>$${data.totalExpenses?.toLocaleString() || 0}</p>
                </div>
                <div class="metric">
                    <h3>Net Cash Flow</h3>
                    <p>$${data.netCashFlow?.toLocaleString() || 0}</p>
                </div>
            </div>
        </div>
        
        ${data.insights && data.insights.length > 0 ? `
        <div class="section">
            <h2>Key Insights</h2>
            <div class="insights">
                ${data.insights.map((insight, index) => `
                    <div class="insight-item">
                        <strong>${index + 1}.</strong> ${insight.description}
                    </div>
                `).join('')}
            </div>
        </div>
        ` : ''}
        
        ${data.recommendations && data.recommendations.length > 0 ? `
        <div class="section">
            <h2>Recommendations</h2>
            <div class="recommendations">
                ${data.recommendations.map((rec, index) => `
                    <div class="rec-item">
                        <strong>${index + 1}.</strong> ${rec.suggestion}
                        <br><small>Potential savings: $${rec.potentialSavings?.toLocaleString() || 0}</small>
                    </div>
                `).join('')}
            </div>
        </div>
        ` : ''}
        ` : '<p>No analysis data available.</p>'}
        
        <div class="section" style="margin-top: 50px; font-size: 12px; color: #666;">
            <p>This report was generated automatically by the Bank Statement Analyzer.</p>
            <p>Report ID: ${report._id}</p>
        </div>
    </body>
    </html>
  `;
}
