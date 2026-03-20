import puppeteer from 'puppeteer';

export const generateResumePdf = async (formData: any) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Helvetica', sans-serif; padding: 40px; color: #333; }
        h1 { color: #6d28d9; margin-bottom: 5px; }
        .role { font-size: 1.2rem; color: #4b5563; margin-bottom: 20px; }
        .section-title { font-size: 1.1rem; font-weight: bold; border-bottom: 2px solid #6d28d9; margin-top: 20px; margin-bottom: 10px; color: #6d28d9; }
        .contact { margin-bottom: 20px; font-size: 0.9rem; }
        .exp-item, .edu-item, .proj-item { margin-bottom: 15px; }
        .date { font-size: 0.85rem; color: #6b7280; }
        .company, .school, .proj-name { font-weight: bold; }
        ul { padding-left: 20px; }
        li { margin-bottom: 5px; }
      </style>
    </head>
    <body>
      <h1>${formData.personalInfo.name}</h1>
      <div class="role">${formData.personalInfo.role}</div>
      
      <div class="contact">
        ${formData.personalInfo.email} | ${formData.personalInfo.phone} | ${formData.personalInfo.location}<br/>
        ${formData.personalInfo.linkedin ? `LinkedIn: ${formData.personalInfo.linkedin} | ` : ''}
        ${formData.personalInfo.github ? `GitHub: ${formData.personalInfo.github}` : ''}
      </div>

      <div class="section-title">About</div>
      <p>${formData.about}</p>

      <div class="section-title">Experience</div>
      ${formData.experience.map((exp: any) => `
        <div class="exp-item">
          <div class="company">${exp.company} - ${exp.role}</div>
          <div class="date">${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}</div>
          <p>${exp.description}</p>
        </div>
      `).join('')}

      <div class="section-title">Skills</div>
      <p>${formData.skills.join(', ')}</p>

      <div class="section-title">Education</div>
      ${formData.education.map((edu: any) => `
        <div class="edu-item">
          <div class="school">${edu.school}</div>
          <div>${edu.degree} in ${edu.fieldOfStudy}</div>
          <div class="date">${edu.startDate} - ${edu.endDate}</div>
        </div>
      `).join('')}

      ${formData.projects && formData.projects.length > 0 ? `
        <div class="section-title">Projects</div>
        ${formData.projects.map((proj: any) => `
          <div class="proj-item">
            <div class="proj-name">${proj.name}</div>
            <p>${proj.description}</p>
            <div>Technologies: ${proj.technologies.join(', ')}</div>
          </div>
        `).join('')}
      ` : ''}
    </body>
    </html>
  `;

  await page.setContent(htmlContent);
  const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });

  await browser.close();
  return pdfBuffer;
};
