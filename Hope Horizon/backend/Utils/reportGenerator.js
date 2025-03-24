const PDFDocument = require('pdfkit');
const { createCanvas } = require('canvas');
const Chart = require('chart.js/auto');

const generateReport = async (student) => {
  const doc = new PDFDocument();
  
  // 1. Generate Progress Chart
  const canvas = createCanvas(600, 400);
  const ctx = canvas.getContext('2d');
  
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: student.domains.map(d => d.domainName),
      datasets: [{
        label: 'Completed Tasks',
        data: student.domains.map(d => d.tasks.filter(t => t.status === 'blue').length),
        backgroundColor: 'rgba(54, 162, 235, 0.5)'
      }]
    }
  });

  // Add chart to PDF
  doc.image(canvas.toBuffer(), 50, 150, { width: 500 });

  // 2. Domain Progress Table
  doc.addPage()
    .fontSize(12)
    .text('Domain Progress Details:', { underline: true });

  student.domains.forEach(domain => {
    doc.text(`\n${domain.domainName}:`)
      .text(`Completed: ${domain.tasks.filter(t => t.status === 'blue').length}/${domain.tasks.length}`);
  });

  return doc;
};