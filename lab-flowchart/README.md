# 📋 คู่มือการตั้งค่าและอัปโหลดใบงาน Basic Flowchart

> **ใบงานที่ 2 — การเขียนผังงาน (Flowchart)**  
> ระบบส่งงานออนไลน์ผ่าน Google Apps Script → Google Sheets + Google Drive

---

## 📁 ไฟล์ในโฟลเดอร์นี้

| ไฟล์ | หน้าที่ |
|------|---------|
| `index.html` | ตัวใบงานที่นักเรียนเปิดและกรอกคำตอบ (serve ผ่าน local server) |
| `Code.gs` | สคริปต์ฝั่ง Google สำหรับบันทึกข้อมูล + หน้าตรวจงานครู |
| `grader.html` | หน้าตรวจงานสำหรับครู (ต้องอัปโหลดเข้า GAS ด้วย) |
| `README.md` | คู่มือนี้ |

---

## 🏗️ โครงสร้างระบบโดยรวม

```
┌─────────────────────────────────────────────┐
│         LOCAL SERVER (Node.js)              │
│         http://172.16.10.7:3000             │
│                                             │
│  นักเรียนเปิดใบงาน กรอกคำตอบ ส่งงาน         │
│  (เปิดเฉพาะตอนนักเรียนใช้งาน)               │
└──────────────┬──────────────────────────────┘
               │ ส่งข้อมูล (fetch POST)
               ▼
┌─────────────────────────────────────────────┐
│      GOOGLE APPS SCRIPT (Cloud)             │
│  https://script.google.com/macros/s/.../exec│
│                                             │
│  ├── (ไม่ใส่ param) → ใบงานนักเรียน         │
│  ├── ?page=grader  → หน้าตรวจงานครู ★      │
│  ├── Google Sheets → เก็บคำตอบ             │
│  └── Google Drive  → เก็บรูป Flowchart     │
│                                             │
│  ✅ ออนไลน์ตลอด 24 ชม. / เข้าได้ทุกที่     │
└─────────────────────────────────────────────┘
```

> **ครูไม่ต้องรอ local server** — เข้าตรวจงานผ่าน GAS URL ได้จากทุกที่ที่มีอินเทอร์เน็ต

---

## 🚀 ขั้นตอนการตั้งค่าครั้งแรก (ทำครั้งเดียว)

### ขั้นที่ 1 — สร้าง Google Spreadsheet

1. เปิด [Google Sheets](https://sheets.google.com) → **+ สร้างสเปรดชีตใหม่**
2. ตั้งชื่อ เช่น `Basic Flowchart - Lab Submissions`

---

### ขั้นที่ 2 — เปิด Google Apps Script

1. เปิดสเปรดชีตที่สร้างไว้
2. คลิกเมนู **Extensions (ส่วนขยาย)** → **Apps Script**

---

### ขั้นที่ 3 — เพิ่มไฟล์ใน Apps Script

> ⚠️ **ต้องเพิ่มไฟล์ให้ครบ 2 ไฟล์** มิฉะนั้นหน้าตรวจงานครูจะไม่ทำงาน

#### 3.1 — วาง Code.gs
1. คลิกที่ไฟล์ `Code.gs` ที่มีอยู่แล้ว
2. **ลบโค้ดเดิมทั้งหมด** แล้ววางโค้ดจากไฟล์ `Code.gs` ในโฟลเดอร์นี้
3. กด **💾 Save** (Ctrl+S)

#### 3.2 — เพิ่มไฟล์ grader.html (สำคัญมาก!)
1. คลิกไอคอน **➕** ข้างหัวข้อ "Files"
2. เลือก **HTML**
3. ตั้งชื่อว่า **`grader`** (พิมพ์แค่ `grader` ไม่ต้องพิมพ์ `.html`)
4. **ลบโค้ดเริ่มต้น** ออกทั้งหมด แล้ววางโค้ดจากไฟล์ `grader.html` ในโฟลเดอร์นี้
5. กด **💾 Save**

**โครงสร้างไฟล์ใน GAS ที่ถูกต้อง:**
```
📁 Apps Script Project
  ├── 📄 Code.gs       ✅ มีแล้ว (วางโค้ดใหม่)
  └── 📄 grader.html   ✅ ต้องสร้างเพิ่ม
```

---

### ขั้นที่ 4 — Deploy เป็น Web App

1. คลิกปุ่ม **Deploy** (มุมขวาบน) → **New deployment**
2. คลิกไอคอน ⚙️ ข้าง "Select type" → เลือก **Web app**
3. ตั้งค่าดังนี้:

   | ตัวเลือก | ค่าที่ต้องเลือก |
   |----------|----------------|
   | Description | `Basic Flowchart v1` |
   | Execute as | **Me** (อีเมลของคุณ) |
   | Who has access | **Anyone** |

4. คลิก **Deploy** → **Authorize access** → เลือกบัญชี → **Allow**

5. หลัง Deploy สำเร็จ จะได้ **Web App URL** ลักษณะนี้:
   ```
   https://script.google.com/macros/s/AKfycb.../exec
   ```
   > ⚠️ **คัดลอก URL นี้ไว้** — ต้องนำไปใส่ใน index.html และ server.js

---

### ขั้นที่ 5 — แก้ไข index.html ใส่ Script URL

เปิดไฟล์ `index.html` ค้นหาบรรทัด:
```javascript
const SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE";
```
แก้เป็น URL ที่ได้จาก Deploy:
```javascript
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycb.../exec";
```

---

### ขั้นที่ 6 — แก้ไข server.js ใส่ Grader URL

เปิดไฟล์ `server.js` ค้นหาบรรทัด:
```html
href="GRADER_URL_HERE"
```
แก้เป็น URL + `?page=grader`:
```html
href="https://script.google.com/macros/s/AKfycb.../exec?page=grader"
```

---

### ขั้นที่ 7 — Restart Server และทดสอบ

```powershell
node server.js
```

เปิดเบราว์เซอร์ทดสอบ:
- **ใบงานนักเรียน:** `http://172.16.10.7:3000/lab-flowchart/`
- **หน้าตรวจงานครู:** `https://script.google.com/macros/s/.../exec?page=grader`

---

## 🔍 ช่องทางเข้าหน้าตรวจงานครู

| ช่องทาง | วิธีเข้า |
|---------|---------|
| **จาก Portal** | เปิด `http://172.16.10.7:3000/` → การ์ด Basic Flowchart → ปุ่ม 🟡 **ตรวจงานนักเรียน (ครู)** |
| **URL โดยตรง** | `https://script.google.com/macros/s/.../exec?page=grader` |
| **จากที่บ้าน** | ใช้ URL โดยตรง — ไม่ต้องรอ local server |

---

## 🔄 การอัปเดต Code.gs หรือ grader.html (หลัง Deploy แล้ว)

ทุกครั้งที่แก้ไขโค้ดต้อง **Re-deploy** ถึงจะมีผล:

1. แก้ไขโค้ดใน Apps Script Editor
2. **Deploy** → **Manage deployments**
3. คลิกไอคอน ✏️ (Edit)
4. เปลี่ยน **Version** เป็น **"New version"**
5. คลิก **Deploy**

> ✅ URL เดิมยังใช้ได้ ไม่ต้องเปลี่ยนใน `index.html` หรือ `server.js`

---

## 📊 โครงสร้าง Google Sheet ที่ได้

เมื่อนักเรียนส่งงานครั้งแรก ระบบสร้าง Sheet ชื่อ **"Basic Flowchart Submissions"** อัตโนมัติ

| คอลัมน์ | ข้อมูล | สี |
|---------|--------|-----|
| A–D | Timestamp / ชื่อ / รหัส / ห้อง | 🔵 ฟ้า (อัตโนมัติ) |
| E–I | คำตอบข้อ 2.1.1–2.1.5 | 🔵 ฟ้า |
| J–L | ลิงก์รูป Flowchart ข้อ 2.2.1–2.2.3 | 🔵 ฟ้า |
| M–X | IPO + ลิงก์รูป ข้อ 2.3.1–2.3.3 | 🔵 ฟ้า |
| Y–Z | สรุปผล / คะแนนอัตโนมัติ | 🔵 ฟ้า |
| AB–AG | **★ คะแนนครูตรวจ (Flowchart 6 ข้อ)** | 🟡 เหลือง |
| AH | **★ หมายเหตุครู** | 🟡 เหลือง |
| AI | **★ คะแนนรวมสุดท้าย** | 🟡 เหลือง |
| AJ–AK | **★ ตรวจโดย / วันที่ตรวจ** | 🟡 เหลือง |

---

## 🎯 เกณฑ์คะแนน

| หมวด | ผู้ตรวจ | คะแนน |
|------|---------|-------|
| **ข้อ 2.1** สัญลักษณ์ผังงาน 5 ข้อ | ระบบ (keyword matching) | 5 |
| **ข้อ 2.2** Flowchart 3 รูป | **ครูตรวจ** (0–5 ต่อรูป) | 15 |
| **ข้อ 2.3** IPO 3 ข้อ × 3 ฟิลด์ | ระบบ (keyword matching) | 9 |
| **ข้อ 2.3** Flowchart 3 รูป | **ครูตรวจ** (0–5 ต่อรูป) | 15 |
| **สรุปผล** | ระบบ (กรอก > 10 ตัวอักษร) | 1 |
| **รวม** | | **45** |

---

## ❓ แก้ปัญหาที่พบบ่อย

### ❌ หน้า `?page=grader` แสดง source code แทนหน้าตรวจงาน
**สาเหตุ:** ยังไม่ได้เพิ่มไฟล์ `grader.html` เข้า GAS Project  
**แก้ไข:** ทำขั้นที่ 3.2 ซ้ำ — สร้างไฟล์ HTML ชื่อ `grader` ใน GAS แล้ว Re-deploy

---

### ❌ Error: `Unexpected token '<', '<!DOCTYPE ...' is not valid JSON`
**สาเหตุ:** `SCRIPT_URL` ใน index.html ยังเป็น placeholder หรือ URL ผิด  
**แก้ไข:** ตรวจสอบ `SCRIPT_URL` และ Re-deploy GAS

---

### ❌ กด "บันทึกคะแนน" ในหน้าครูแล้วไม่มีอะไรเกิดขึ้น
**สาเหตุ:** ลืมกรอกชื่อครูผู้ตรวจ (ช่องด้านบนขวา)  
**แก้ไข:** กรอกชื่อครูใน input "ชื่อครูผู้ตรวจ" ก่อนกดบันทึก

---

### ❌ รูปภาพ Flowchart ไม่แสดงในหน้าตรวจงาน
**สาเหตุ:** นักเรียนไม่ได้แนบรูป หรือรูปใหญ่เกิน (> 5MB)  
**แก้ไข:** ให้นักเรียนบีบอัดรูปก่อนแนบ แนะนำขนาด < 2MB

---

### ❌ Error: `ส่งข้อมูลไม่ได้: Failed to fetch`
**สาเหตุ:** CORS หรือ GAS URL ผิด  
**แก้ไข:** ตรวจสอบว่า Deploy ตั้ง **Who has access: Anyone** และ Re-deploy ใหม่

---

## 📞 ติดต่อผู้ดูแลระบบ

หากพบปัญหาอื่นๆ ติดต่อผู้ดูแลระบบ Lab C Programming Portal
