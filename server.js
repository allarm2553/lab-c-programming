const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

http.createServer((req, res) => {
  // Normalize path and remove query parameters
  const urlPath = req.url.split('?')[0];

  // Route: Landing/Portal page
  if (urlPath === '/' || urlPath === '/index.html') {
    servePortal(res);
    return;
  }

  // Route: Helper guide for unconfigured grader URL
  if (urlPath === '/GRADER_URL_HERE') {
    serveGraderSetupGuide(res);
    return;
  }

  // Route: Individual Lab folders (e.g. /lab1 or /lab1/)
  const parts = urlPath.split('/').filter(Boolean);
  const labFolder = parts[0];

  if (labFolder && (labFolder === 'lab-flowchart' || labFolder === 'lab-basic' || labFolder === 'lab-structure' || /^lab([1-9]|10|11)$/.test(labFolder))) {
    // If accessing just the folder name, redirect or resolve to index.html
    const rest = parts.slice(1).join('/');
    let relativeFilePath = '';
    
    if (!rest || rest === 'index.html') {
      relativeFilePath = path.join(labFolder, 'index.html');
    } else {
      relativeFilePath = path.join(labFolder, rest);
    }

    let filePath = path.join(__dirname, relativeFilePath);

    // Basic security check: make sure we don't read outside our root directory
    if (!filePath.startsWith(__dirname)) {
      res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Forbidden: Access Denied / ปฏิเสธการเข้าถึง');
      return;
    }

    fs.readFile(filePath, (err, content) => {
      if (err) {
        if (err.code === 'ENOENT') {
          res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
          res.end(`File not found / ไม่พบไฟล์ที่ค้นหา: ${relativeFilePath}`);
        } else {
          res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
          res.end('Server Error: ' + err.code);
        }
      } else {
        let ext = path.extname(filePath);
        let contentType = 'text/html; charset=utf-8';
        if (ext === '.js') contentType = 'text/javascript; charset=utf-8';
        else if (ext === '.css') contentType = 'text/css; charset=utf-8';
        else if (ext === '.json') contentType = 'application/json; charset=utf-8';
        else if (ext === '.png') contentType = 'image/png';
        else if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
        else if (ext === '.ico') contentType = 'image/x-icon';

        res.writeHead(200, {
          'Content-Type': contentType,
          'Permissions-Policy': 'clipboard-read=*, clipboard-write=*',
          'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
        });
        res.end(content, 'utf-8');
      }
    });
  } else {
    // Invalid route
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Page not found / ไม่พบหน้านี้');
  }
}).listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`  C Programming Lab Sheets Portal is running!`);
  console.log(`  Local URL: http://localhost:${PORT}/`);
  console.log(`======================================================\n`);
});

// Helper function to serve the dynamic landing portal page
function servePortal(res) {
  const html = `<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>C Programming Lab Web Apps Portal</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Sarabun:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <style>
    :root {
      --bg-gradient-start: #0f172a;
      --bg-gradient-end: #020617;
      --card-bg: rgba(30, 41, 59, 0.7);
      --card-border: rgba(255, 255, 255, 0.08);
      --card-hover-border: rgba(99, 102, 241, 0.4);
      --text-main: #f8fafc;
      --text-muted: #94a3b8;
      --accent: #6366f1;
      --accent-gradient: linear-gradient(135deg, #6366f1, #a855f7);
      --body-font: 'Sarabun', sans-serif;
      --heading-font: 'Outfit', 'Sarabun', sans-serif;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: linear-gradient(135deg, var(--bg-gradient-start), var(--bg-gradient-end));
      color: var(--text-main);
      font-family: var(--body-font);
      min-height: 100vh;
      padding: 3rem 1.5rem;
    }
    .container { max-width: 1200px; margin: 0 auto; }
    header { text-align: center; margin-bottom: 3rem; }
    h1 {
      font-family: var(--heading-font);
      font-size: 2.5rem;
      font-weight: 700;
      background: linear-gradient(to right, #f8fafc, #cbd5e1);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 0.5rem;
    }
    .subtitle { color: var(--text-muted); font-size: 1.1rem; }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
      gap: 1.5rem;
    }
    .card {
      background: var(--card-bg);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid var(--card-border);
      border-radius: 16px;
      padding: 1.5rem;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      text-decoration: none;
      color: inherit;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      overflow: hidden;
    }
    .card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: var(--accent-gradient);
      opacity: 0;
      transition: opacity 0.3s;
    }
    .card:hover {
      transform: translateY(-5px);
      border-color: var(--card-hover-border);
      box-shadow: 0 10px 25px rgba(99, 102, 241, 0.15);
    }
    .card:hover::before { opacity: 1; }
    .card-header { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; }
    .card-icon {
      width: 42px;
      height: 42px;
      border-radius: 10px;
      background: rgba(99, 102, 241, 0.1);
      border: 1px solid rgba(99, 102, 241, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #a5b4fc;
      font-size: 1.25rem;
    }
    .card-title { font-family: var(--heading-font); font-size: 1.2rem; font-weight: 600; }
    .card-desc { color: var(--text-muted); font-size: 0.9rem; line-height: 1.5; margin-bottom: 1.5rem; flex-grow: 1; }
    .card-footer { display: flex; align-items: center; justify-content: space-between; font-size: 0.85rem; font-weight: 500; color: #a5b4fc; }
    .card-badge {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.05);
      padding: 0.25rem 0.6rem;
      border-radius: 6px;
      font-size: 0.75rem;
      color: var(--text-muted);
    }
    .grader-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      margin-top: 0.75rem;
      padding: 0.4rem 0.9rem;
      background: rgba(251, 191, 36, 0.15);
      border: 1px solid rgba(251, 191, 36, 0.4);
      border-radius: 8px;
      color: #fbbf24;
      font-size: 0.8rem;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.2s;
      width: fit-content;
    }
    .grader-btn:hover {
      background: rgba(251, 191, 36, 0.28);
      border-color: rgba(251, 191, 36, 0.7);
      color: #fde68a;
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>C Programming Lab Web Apps Portal</h1>
      <p class="subtitle">ระบบส่งใบงานออนไลน์วิชาเขียนโปรแกรมภาษา C (เชื่อมต่อ Google Sheets & Google Drive)</p>
    </header>
    <div class="grid">
      
      <!-- Basic Flowchart -->
      <div class="card" style="display:flex;flex-direction:column;justify-content:space-between;">
        <div>
          <div class="card-header">
            <div class="card-icon"><i class="fa-solid fa-diagram-project"></i></div>
            <div class="card-title">Basic Flowchart</div>
          </div>
          <div class="card-desc">การเขียนผังงาน (Flowchart) สัญลักษณ์มาตรฐาน การวิเคราะห์ Input-Process-Output และการออกแบบขั้นตอนการทำงานของโปรแกรม</div>
          <!-- ปุ่มตรวจงานครู -->
          <a href="https://script.google.com/a/macros/tatc.ac.th/s/AKfycbw4yyO-SchYUrk7RCFgFr3hAJHYucagnyyHyu4CoSz0f3bw_e_DBicTB12CPmelKCet_w/exec?page=grader" target="_blank" class="grader-btn" id="graderLink" title="เปิดหน้าตรวจงานสำหรับครู">
            <i class="fa-solid fa-clipboard-check"></i> ตรวจงานนักเรียน (ครู)
          </a>
        </div>
        <div class="card-footer" style="margin-top:1rem">
          <span class="card-badge">ผังงาน</span>
          <a href="/lab-flowchart/" style="color:#a5b4fc;font-size:0.85rem;font-weight:500;text-decoration:none">เข้าชมใบงาน <i class="fa-solid fa-arrow-right"></i></a>
        </div>
      </div>

      <!-- Basic Lab -->
      <a href="/lab-basic/" class="card">
        <div>
          <div class="card-header">
            <div class="card-icon"><i class="fa-solid fa-laptop-code"></i></div>
            <div class="card-title">Lab Basic: Hello World</div>
          </div>
          <div class="card-desc">การติดตั้งคอมไพเลอร์ GCC (MinGW/Online IDEs) การใช้งานคำสั่งพื้นฐาน และโครงสร้างหลักของภาษา C</div>
        </div>
        <div class="card-footer">
          <span class="card-badge">บทนำ</span>
          <span>เข้าชมใบงาน <i class="fa-solid fa-arrow-right"></i></span>
        </div>
      </a>

      <!-- Lab Structure -->
      <a href="/lab-structure/" class="card">
        <div>
          <div class="card-header">
            <div class="card-icon"><i class="fa-solid fa-sitemap"></i></div>
            <div class="card-title">Lab Basic: C Program Structure</div>
          </div>
          <div class="card-desc">โครงสร้างและส่วนประกอบพื้นฐานของโปรแกรมภาษา C (Directives, main, statements, comments) และกระบวนการ Compile & Link</div>
        </div>
        <div class="card-footer">
          <span class="card-badge">บทนำย่อย</span>
          <span>เข้าชมใบงาน <i class="fa-solid fa-arrow-right"></i></span>
        </div>
      </a>

      <!-- Lab 1 -->
      <a href="/lab1/" class="card">
        <div>
          <div class="card-header">
            <div class="card-icon"><i class="fa-solid fa-font"></i></div>
            <div class="card-title">Lab 1: Variables & Basic I/O</div>
          </div>
          <div class="card-desc">ชนิดข้อมูล ขอบเขตตัวแปร การรับข้อมูลด้วย scanf() และการแสดงผลลัพธ์ทศนิยมด้วย printf()</div>
        </div>
        <div class="card-footer">
          <span class="card-badge">บทที่ 1</span>
          <span>เข้าชมใบงาน <i class="fa-solid fa-arrow-right"></i></span>
        </div>
      </a>

      <!-- Lab 2 -->
      <a href="/lab2/" class="card">
        <div>
          <div class="card-header">
            <div class="card-icon"><i class="fa-solid fa-calculator"></i></div>
            <div class="card-title">Lab 2: Operators & Expressions</div>
          </div>
          <div class="card-desc">ตัวดำเนินการคณิตศาสตร์ การเปรียบเทียบ ตรรกศาสตร์ และตัวดำเนินการระดับบิต (Bitwise Operators)</div>
        </div>
        <div class="card-footer">
          <span class="card-badge">บทที่ 2</span>
          <span>เข้าชมใบงาน <i class="fa-solid fa-arrow-right"></i></span>
        </div>
      </a>

      <!-- Lab 3 -->
      <a href="/lab3/" class="card">
        <div>
          <div class="card-header">
            <div class="card-icon"><i class="fa-solid fa-code-branch"></i></div>
            <div class="card-title">Lab 3: Conditionals (if/switch)</div>
          </div>
          <div class="card-desc">โครงสร้างควบคุมการตัดสินใจแบบมีเงื่อนไข การใช้ if, else-if, nested if และคำสั่งเลือกทำ switch-case</div>
        </div>
        <div class="card-footer">
          <span class="card-badge">บทที่ 3</span>
          <span>เข้าชมใบงาน <i class="fa-solid fa-arrow-right"></i></span>
        </div>
      </a>

      <!-- Lab 4 -->
      <a href="/lab4/" class="card">
        <div>
          <div class="card-header">
            <div class="card-icon"><i class="fa-solid fa-arrows-spin"></i></div>
            <div class="card-title">Lab 4: Loops & Nested Loops</div>
          </div>
          <div class="card-desc">โครงสร้างควบคุมการวนซ้ำการใช้ for, while, do-while, break, continue และการซ้อนลูปเพื่อสร้างรูปทรงดาว</div>
        </div>
        <div class="card-footer">
          <span class="card-badge">บทที่ 4</span>
          <span>เข้าชมใบงาน <i class="fa-solid fa-arrow-right"></i></span>
        </div>
      </a>

      <!-- Lab 5 -->
      <a href="/lab5/" class="card">
        <div>
          <div class="card-header">
            <div class="card-icon"><i class="fa-solid fa-cubes"></i></div>
            <div class="card-title">Lab 5: Functions & Scope</div>
          </div>
          <div class="card-desc">การแบ่งส่วนโปรแกรมด้วยฟังก์ชัน การส่งผ่านพารามิเตอร์แบบ Call-by-Value และฟังก์ชันเรียกตัวเอง (Recursion)</div>
        </div>
        <div class="card-footer">
          <span class="card-badge">บทที่ 5</span>
          <span>เข้าชมใบงาน <i class="fa-solid fa-arrow-right"></i></span>
        </div>
      </a>

      <!-- Lab 6 -->
      <a href="/lab6/" class="card">
        <div>
          <div class="card-header">
            <div class="card-icon"><i class="fa-solid fa-list-ol"></i></div>
            <div class="card-title">Lab 6: Arrays & Strings</div>
          </div>
          <div class="card-desc">การจัดเก็บข้อมูลแถวลำดับ 1 มิติ และ 2 มิติ การเขียนโปรแกรมเมทริกซ์ และการประมวลผลสตริงด้วย &lt;string.h&gt;</div>
        </div>
        <div class="card-footer">
          <span class="card-badge">บทที่ 6</span>
          <span>เข้าชมใบงาน <i class="fa-solid fa-arrow-right"></i></span>
        </div>
      </a>

      <!-- Lab 7 -->
      <a href="/lab7/" class="card">
        <div>
          <div class="card-header">
            <div class="card-icon"><i class="fa-solid fa-magnifying-glass-location"></i></div>
            <div class="card-title">Lab 7: Pointers & Memory</div>
          </div>
          <div class="card-desc">เรียนรู้แนวคิดพอยน์เตอร์, ที่อยู่อ้างอิงในหน่วยความจำ (Addresses), Call-by-Reference และ Dynamic Memory (malloc/free)</div>
        </div>
        <div class="card-footer">
          <span class="card-badge">บทที่ 7</span>
          <span>เข้าชมใบงาน <i class="fa-solid fa-arrow-right"></i></span>
        </div>
      </a>

      <!-- Lab 8 -->
      <a href="/lab8/" class="card">
        <div>
          <div class="card-header">
            <div class="card-icon"><i class="fa-solid fa-id-card"></i></div>
            <div class="card-title">Lab 8: Structures & Unions</div>
          </div>
          <div class="card-desc">การจัดกลุ่มตัวแปรที่มีชนิดข้อมูลต่างกันด้วย struct และ union การสร้างอาร์เรย์ของโครงสร้าง และการประยุกต์ใช้งาน</div>
        </div>
        <div class="card-footer">
          <span class="card-badge">บทที่ 8</span>
          <span>เข้าชมใบงาน <i class="fa-solid fa-arrow-right"></i></span>
        </div>
      </a>

      <!-- Lab 9 -->
      <a href="/lab9/" class="card">
        <div>
          <div class="card-header">
            <div class="card-icon"><i class="fa-solid fa-file-arrow-up"></i></div>
            <div class="card-title">Lab 9: File Handling I/O</div>
          </div>
          <div class="card-desc">การเก็บข้อมูลถาวรด้วยไฟล์ เขียน/อ่านไฟล์ข้อมูลตัวอักษร (Text Files) และการเก็บข้อมูลโครงสร้างในรูปแบบไบนารี (Binary Files)</div>
        </div>
        <div class="card-footer">
          <span class="card-badge">บทที่ 9</span>
          <span>เข้าชมใบงาน <i class="fa-solid fa-arrow-right"></i></span>
        </div>
      </a>

      <!-- Lab 10 -->
      <a href="/lab10/" class="card">
        <div>
          <div class="card-header">
            <div class="card-icon"><i class="fa-solid fa-quote-left"></i></div>
            <div class="card-title">Lab 10: String Functions</div>
          </div>
          <div class="card-desc">การใช้งานฟังก์ชันจัดการสตริงมาตรฐาน เช่น strlen(), strcpy(), strcat(), strcmp(), fgets() และ puts() จาก &lt;string.h&gt;</div>
        </div>
        <div class="card-footer">
          <span class="card-badge">บทที่ 10</span>
          <span>เข้าชมใบงาน <i class="fa-solid fa-arrow-right"></i></span>
        </div>
      </a>

      <!-- Lab 11 -->
      <a href="/lab11/" class="card">
        <div>
          <div class="card-header">
            <div class="card-icon"><i class="fa-solid fa-microchip"></i></div>
            <div class="card-title">Lab 11: C to Microcontroller Bridge</div>
          </div>
          <div class="card-desc">การเชื่อมโยงภาษา C สู่ไมโครคอนโทรลเลอร์ สถาปัตยกรรม Super-Loop (setup/loop), Serial API, และ Non-blocking Multi-tasking ด้วย millis()</div>
        </div>
        <div class="card-footer">
          <span class="card-badge">บทพิเศษ</span>
          <span>เข้าชมใบงาน <i class="fa-solid fa-arrow-right"></i></span>
        </div>
      </a>

    </div>
  </div>
</body>
</html>`;

  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8',
    'Permissions-Policy': 'clipboard-read=*, clipboard-write=*',
    'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
  });
  res.end(html);
}

// Helper function to serve a beautiful setup guide if GRADER_URL_HERE is not set
function serveGraderSetupGuide(res) {
  const html = `<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>คู่มือการตั้งค่าระบบตรวจงาน (Grader Setup)</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&family=Sarabun:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <style>
    :root {
      --bg: #0f172a;
      --card-bg: rgba(30, 41, 59, 0.7);
      --border: rgba(255, 255, 255, 0.08);
      --accent: #fbbf24;
      --text: #f8fafc;
      --text-muted: #94a3b8;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: linear-gradient(135deg, var(--bg), #020617);
      color: var(--text);
      font-family: 'Sarabun', sans-serif;
      min-height: 100vh;
      padding: 3rem 1.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .card {
      background: var(--card-bg);
      backdrop-filter: blur(16px);
      border: 1px solid var(--border);
      border-radius: 20px;
      padding: 2.5rem;
      max-width: 800px;
      width: 100%;
      box-shadow: 0 20px 40px rgba(0,0,0,0.3);
    }
    .header {
      text-align: center;
      margin-bottom: 2rem;
      border-bottom: 1px solid var(--border);
      padding-bottom: 1.5rem;
    }
    .icon {
      font-size: 3.5rem;
      color: var(--accent);
      margin-bottom: 1rem;
    }
    h1 {
      font-family: 'Outfit', sans-serif;
      font-size: 1.8rem;
      margin-bottom: 0.5rem;
    }
    .step-title {
      font-weight: 600;
      color: #fbbf24;
      margin-top: 1.5rem;
      margin-bottom: 0.5rem;
      font-size: 1.1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .step-desc {
      color: var(--text-muted);
      font-size: 0.95rem;
      line-height: 1.6;
      padding-left: 1.8rem;
    }
    code {
      background: rgba(0,0,0,0.3);
      padding: 0.2rem 0.4rem;
      border-radius: 4px;
      font-family: monospace;
      color: #f43f5e;
      font-size: 0.9rem;
    }
    pre {
      background: #020617;
      padding: 1rem;
      border-radius: 8px;
      overflow-x: auto;
      margin: 0.5rem 0;
      border: 1px solid var(--border);
    }
    pre code {
      background: none;
      color: #38bdf8;
      padding: 0;
    }
    .highlight {
      color: #fbbf24;
      font-weight: bold;
    }
    .back-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      margin-top: 2rem;
      color: #6366f1;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.2s;
    }
    .back-btn:hover {
      color: #818cf8;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div class="icon"><i class="fa-solid fa-triangle-exclamation"></i></div>
      <h1>ยังไม่ได้ตั้งค่าลิงก์ตรวจงาน (Grader URL)</h1>
      <p style="color: var(--text-muted)">กรุณาทำตามขั้นตอนด้านล่างนี้ เพื่อเปิดใช้งานหน้าตรวจงานสำหรับครู</p>
    </div>
    
    <div>
      <div class="step-title">
        <span class="highlight">1.</span> สร้าง Google Sheets & Apps Script
      </div>
      <div class="step-desc">
        เปิด Google Sheets ใหม่ -> ไปที่เมนู <strong>Extensions (ส่วนขยาย)</strong> -> <strong>Apps Script</strong>
      </div>

      <div class="step-title">
        <span class="highlight">2.</span> ใส่ไฟล์ Code.gs และ grader.html
      </div>
      <div class="step-desc">
        <ul>
          <li>คัดลอกโค้ดทั้งหมดจากไฟล์ <code>lab-flowchart/Code.gs</code> ในโปรเจกต์นี้ ไปวางแทนที่โค้ดเดิมใน Apps Script</li>
          <li>คลิกปุ่ม <strong>+ (เพิ่มไฟล์)</strong> เลือก <strong>HTML</strong> ตั้งชื่อไฟล์ว่า <code>grader</code> (ไม่ต้องพิมพ์ .html) จากนั้นนำโค้ดทั้งหมดจากไฟล์ <code>lab-flowchart/grader.html</code> ไปวาง</li>
        </ul>
      </div>

      <div class="step-title">
        <span class="highlight">3.</span> Deploy Web App
      </div>
      <div class="step-desc">
        กดปุ่ม <strong>Deploy</strong> (ขวาบน) -> <strong>New deployment</strong> -> เลือกประเภท <strong>Web App</strong> -> ตั้งค่า <em>Execute as</em> เป็น <strong>Me</strong> และ <em>Who has access</em> เป็น <strong>Anyone</strong> -> กด Deploy และคัดลอก Web App URL ที่ได้
      </div>

      <div class="step-title">
        <span class="highlight">4.</span> นำ URL มาอัปเดตในไฟล์โค้ด
      </div>
      <div class="step-desc">
        <ul>
          <li>เปิดไฟล์ <code>server.js</code> ในโปรเจกต์ (บรรทัดที่ 228) เปลี่ยนจาก <code>GRADER_URL_HERE</code> เป็น Web App URL ที่ได้ โดยเติม <code>?page=grader</code> ท้ายสุด เช่น:<br>
          <pre><code>&lt;a href="https://script.google.com/macros/s/AKfycb.../exec?page=grader" ...&gt;</code></pre></li>
          <li>เปิดไฟล์ <code>lab-flowchart/index.html</code> (บรรทัดที่ 367) เปลี่ยนตัวแปร <code>SCRIPT_URL</code> ให้เป็น Web App URL เช่นเดียวกัน:<br>
          <pre><code>const SCRIPT_URL = "https://script.google.com/macros/s/AKfycb.../exec";</code></pre></li>
        </ul>
      </div>

      <div class="step-title">
        <span class="highlight">5.</span> รีสตาร์ท Local Server
      </div>
      <div class="step-desc">
        กด <code>Ctrl + C</code> ใน Command Prompt/Terminal เพื่อปิด server แล้วพิมพ์ <code>node server.js</code> ใหม่อีกครั้ง
      </div>
    </div>
    
    <div style="text-align: center; margin-top: 2rem;">
      <a href="/" class="back-btn"><i class="fa-solid fa-arrow-left"></i> กลับไปยังหน้าหลัก</a>
    </div>
  </div>
</body>
</html>`;

  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8',
    'Permissions-Policy': 'clipboard-read=*, clipboard-write=*',
    'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
  });
  res.end(html);
}
