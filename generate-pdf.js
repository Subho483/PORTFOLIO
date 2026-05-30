const fs = require('fs');
const puppeteer = require('puppeteer');
const { marked } = require('marked');

async function generatePDF() {
  const mdContent = fs.readFileSync('public/resume.md', 'utf-8');
  const htmlContent = marked.parse(mdContent);

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <style>
        body {
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        h1, h2, h3 {
          color: #111;
          margin-bottom: 0.5em;
        }
        h1 { font-size: 24px; border-bottom: 2px solid #333; padding-bottom: 5px; }
        h2 { font-size: 18px; border-bottom: 1px solid #ddd; padding-bottom: 5px; margin-top: 20px;}
        h3 { font-size: 16px; margin-top: 15px;}
        p { margin-bottom: 10px; }
        ul { margin-bottom: 15px; padding-left: 20px; }
        li { margin-bottom: 5px; }
        a { color: #0066cc; text-decoration: none; }
      </style>
    </head>
    <body>
      ${htmlContent}
    </body>
    </html>
  `;

  const browser = await puppeteer.launch({
    headless: "new"
  });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });
  await page.pdf({
    path: 'public/resume.pdf',
    format: 'A4',
    printBackground: true,
    margin: { top: '20px', right: '20px', bottom: '20px', left: '20px' }
  });

  await browser.close();
  console.log('PDF generated at public/resume.pdf');
}

generatePDF().catch(console.error);
