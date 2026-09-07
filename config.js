/**
 * C Programming E-Labs — Global Configuration
 * ตั้งค่าลิงก์ Google Apps Script Web App URL แยกทีละใบงาน สำหรับส่งคะแนนเข้า Google Sheets ของอาจารย์
 * 
 * 💡 วิธีใช้งาน:
 * นำ Web App URL ที่ได้จากการ Deploy (Deploy > New Deployment > Web app) ใน Google Apps Script
 * ของแต่ละใบงาน มาวางในช่องด้านล่างนี้ หรือแก้ไขผ่านหน้าต่าง "ตั้งค่าลิงก์ส่งงาน" บนหน้ารวม Portal ได้ทันที
 */

const LAB_CONFIG = {
  // พื้นฐาน & ผังงาน
  "lab-flowchart": "https://script.google.com/a/macros/tatc.ac.th/s/AKfycbw4yyO-SchYUrk7RCFgFr3hAJHYucagnyyHyu4CoSz0f3bw_e_DBicTB12CPmelKCet_w/exec",
  "lab-basic": "YOUR_GAS_URL_FOR_LAB_BASIC",
  "lab-structure": "YOUR_GAS_URL_FOR_LAB_STRUCTURE",

  // บทที่ 1 - 5 (พื้นฐาน, ตัวแปร, ควบคุม, ลูป, ฟังก์ชัน)
  "lab1": "YOUR_GAS_URL_FOR_LAB1",
  "lab2": "YOUR_GAS_URL_FOR_LAB2",
  "lab3": "YOUR_GAS_URL_FOR_LAB3",
  "lab4": "YOUR_GAS_URL_FOR_LAB4",
  "lab5": "YOUR_GAS_URL_FOR_LAB5",

  // บทที่ 6 - 8 (อาร์เรย์, พอยน์เตอร์, โครงสร้างข้อมูล)
  "lab6": "YOUR_GAS_URL_FOR_LAB6",
  "lab7": "YOUR_GAS_URL_FOR_LAB7",
  "lab8": "YOUR_GAS_URL_FOR_LAB8",

  // บทที่ 9 - 11 (ไฟล์, สตริง, ไมโครคอนโทรลเลอร์)
  "lab9": "YOUR_GAS_URL_FOR_LAB9",
  "lab10": "YOUR_GAS_URL_FOR_LAB10",
  "lab11": "YOUR_GAS_URL_FOR_LAB11"
};

/**
 * ดึง Web App URL ที่พร้อมใช้งาน (ดึงจาก localStorage ก่อน หากอาจารย์ตั้งค่าผ่าน UI)
 */
function getLabScriptUrl(labId) {
  if (typeof window !== 'undefined' && window.localStorage) {
    const custom = window.localStorage.getItem('gas_url_' + labId);
    if (custom && custom.trim().startsWith('https://script.google.com')) {
      return custom.trim();
    }
  }
  const url = LAB_CONFIG[labId] || '';
  if (url && !url.includes('YOUR_GAS_URL')) {
    return url.trim();
  }
  return '';
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { LAB_CONFIG, getLabScriptUrl };
}
