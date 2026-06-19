# คู่มือการติดตั้งและใช้งานระบบส่งใบงานออนไลน์วิชาเขียนโปรแกรมภาษา C (Google Sheets Web Apps)

โฟลเดอร์นี้ประกอบด้วยเว็บแอปพลิเคชัน (Web Apps) ทั้งหมด **12 ชุด** สำหรับวิชา **การเขียนโปรแกรมคอมพิวเตอร์ด้วยภาษา C (C Programming)** ซึ่งออกแบบมาให้ทันสมัยและใช้งานง่าย โดยนักศึกษาสามารถกรอกข้อมูล โค้ดท้าทาย และแนบภาพถ่ายหน้าจอผลลัพธ์การรันโปรแกรม ส่งตรงไปยัง **Google Sheets** และ **Google Drive** ของอาจารย์ผู้สอนได้ทันที

---

## 📁 โครงสร้างโปรเจกต์
- [lab-basic/](file:///C:/Users/terd2/.gemini/antigravity/scratch/lab-c-programming/lab-basic) - Lab Basic: แนะนำคอมไพเลอร์และการเขียนโปรแกรมแสดงผล Hello World
- [lab-structure/](file:///C:/Users/terd2/.gemini/antigravity/scratch/lab-c-programming/lab-structure) - Lab Basic: โครงสร้างและการทำงานของโปรแกรมภาษา C (C Program Structure & Flow)
- [lab1/](file:///C:/Users/terd2/.gemini/antigravity/scratch/lab-c-programming/lab1) - Lab 1: ชนิดข้อมูล ตัวแปร และฟังก์ชันรับส่งข้อมูลพื้นฐาน (printf, scanf)
- [lab2/](file:///C:/Users/terd2/.gemini/antigravity/scratch/lab-c-programming/lab2) - Lab 2: ตัวดำเนินการและการประเมินนิพจน์ (Operators & Expressions)
- [lab3/](file:///C:/Users/terd2/.gemini/antigravity/scratch/lab-c-programming/lab3) - Lab 3: โครงสร้างแบบเลือกทำ (Conditionals: if-else, switch-case)
- [lab4/](file:///C:/Users/terd2/.gemini/antigravity/scratch/lab-c-programming/lab4) - Lab 4: โครงสร้างแบบวนซ้ำ (Loops: for, while, do-while)
- [lab5/](file:///C:/Users/terd2/.gemini/antigravity/scratch/lab-c-programming/lab5) - Lab 5: ฟังก์ชันและการส่งผ่านพารามิเตอร์ (Functions & Scope)
- [lab6/](file:///C:/Users/terd2/.gemini/antigravity/scratch/lab-c-programming/lab6) - Lab 6: อาร์เรย์และสตริง (Arrays & Strings)
- [lab7/](file:///C:/Users/terd2/.gemini/antigravity/scratch/lab-c-programming/lab7) - Lab 7: พอยน์เตอร์และการจองหน่วยความจำแบบพลวัต (Pointers & Memory Management)
- [lab8/](file:///C:/Users/terd2/.gemini/antigravity/scratch/lab-c-programming/lab8) - Lab 8: โครงสร้างข้อมูลแบบผู้ใช้กำหนดเอง (Structures & Unions)
- [lab9/](file:///C:/Users/terd2/.gemini/antigravity/scratch/lab-c-programming/lab9) - Lab 9: การจัดการไฟล์ (File I/O)
- [lab10/](file:///C:/Users/terd2/.gemini/antigravity/scratch/lab-c-programming/lab10) - Lab 10: การใช้งานฟังก์ชันจัดการสตริง (String Functions)

---

## 🚀 วิธีการทดสอบรันบนเครื่องของคุณ (Local Preview)

คุณสามารถดูหน้าตาและทดสอบการพิมพ์ PDF / กรอกใบงานผ่านเว็บเซิร์ฟเวอร์จำลองบนเครื่องคอมพิวเตอร์ของคุณได้ดังนี้:

1. เปิด Terminal ในตำแหน่งโฟลเดอร์ `lab-c-programming`
2. เริ่มเซิร์ฟเวอร์จำลองด้วยคำสั่ง:
   ```bash
   npm start
   ```
3. เปิดเว็บเบราว์เซอร์ของคุณแล้วเข้าลิงก์: [http://localhost:3000/](http://localhost:3000/)
4. คุณสามารถคลิกเลือกเข้าชมและทดสอบกรอกข้อมูลของแต่ละใบงานได้ทันที

---

## 📊 ขั้นตอนการติดตั้งและ Deploy บน Google Sheets (ทำแยกทีละใบงาน)

เมื่อทดสอบหน้าเว็บเรียบร้อยและต้องการเปิดให้นักศึกษาส่งงานจริง ให้ทำตามขั้นตอนดังนี้:

### ขั้นตอนที่ 1: สร้าง Google Sheets ใหม่
1. ไปที่ [Google Sheets](https://sheets.google.com) และสร้างตารางงานใหม่ (Spreadsheet เปล่า)
2. ตั้งชื่อไฟล์ตามต้องการ เช่น *ตารางบันทึกผลแล็บภาษา C* (ใช้ไฟล์ร่วมกันได้ทุุกใบงาน สคริปต์จะแยกแท็บชีตให้อัตโนมัติ!)

### ขั้นตอนที่ 2: เปิด Google Apps Script
1. ที่เมนูด้านบนของ Google Sheet คลิกเลือก **ส่วนขยาย (Extensions)** -> **Apps Script**

### ขั้นตอนที่ 3: ใส่โค้ด Backend (`Code.gs`)
1. ดับเบิลคลิกเปิดไฟล์ `รหัส.gs` หรือ `Code.gs` ที่อยู่ทางด้านซ้าย
2. ลบโค้ดเริ่มต้นทั้งหมดออก
3. คัดลอกโค้ดทั้งหมดจากไฟล์ `Code.gs` ในโฟลเดอร์ใบงานที่ต้องการ (เช่นจาก `lab-basic/Code.gs` หรือ `lab1/Code.gs`) ไปวางทับแทนที่
4. กดบันทึก 💾

### ขั้นตอนที่ 4: ใส่โค้ด Frontend UI (`index.html`)
1. คลิกปุ่ม **+** (เพิ่มไฟล์ด้านซ้าย) -> เลือก **HTML**
2. ตั้งชื่อไฟล์นี้ว่า `index` (จะได้ชื่อไฟล์เป็น `index.html` ห้ามสะกดผิด)
3. ลบโค้ดเริ่มต้นในไฟล์ `index.html` ออกทั้งหมด
4. คัดลอกโค้ดจากไฟล์ `index.html` ของใบงานนั้นๆ มาวางทับลงไป
5. กดบันทึก 💾

### ขั้นตอนที่ 5: เริ่มการ Deploy เว็บแอป (New Deployment)
1. คลิกปุ่มสีน้ำเงินด้านขวาบนชื่อ **การใช้งานที่ใช้งานได้จริง (Deploy)** -> เลือก **การจัดการการใช้งานที่ใช้งานได้จริงใหม่ (New deployment)**
2. คลิกรูปเฟือง ⚙️ ข้าง "เลือกประเภท (Select type)" -> เลือก **เว็บแอป (Web app)**
3. ตั้งค่ารายละเอียดดังนี้:
   - **คำอธิบาย (Description):** *Lab X Worksheet Web App* (เปลี่ยน X เป็นเลขหรือชื่อใบงาน)
   - **เรียกใช้งานในฐานะ (Execute as):** เลือก **ฉัน (Me / อีเมลของคุณ)** (เพื่อสิทธิ์ในการเข้าถึงและบันทึกข้อมูลใน Sheet และ Drive ของคุณ)
   - **ผู้มีสิทธิ์เข้าถึง (Who has access):** เลือก **ทุกคน (Anyone)** (เพื่อให้นักเรียนเปิดลิงก์ส่งงานได้)
4. คลิกปุ่ม **การใช้งานที่ใช้งานได้จริง (Deploy)**
5. คลิก **อนุมัติสิทธิ์การเข้าถึง (Authorize Access)**
   - เลือกบัญชี Google ของคุณ
   - คลิกคำว่า **ขั้นสูง (Advanced)** ที่อยู่ด้านล่างซ้าย -> เลือก **ไปที่... (ไม่ปลอดภัย) / Go to ... (unsafe)**
   - คลิก **อนุญาต (Allow)**
6. คัดลอก **URL ของเว็บแอป (Web App URL)** ที่ปรากฏไปแจกให้นักศึกษาเข้ากรอกส่งงานได้เลย!
