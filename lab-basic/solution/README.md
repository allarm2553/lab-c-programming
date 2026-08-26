# เฉลยกิจกรรม Lab Basic (Solutions)

โฟลเดอร์นี้รวบรวมโค้ดเฉลยสำหรับ **Lab Basic: Hello World และเครื่องมือพัฒนาภาษา C**

---

## รายการไฟล์เฉลย

### 1. `challenge_solution.c`
โค้ดเฉลยสำหรับ **กิจกรรมท้าทาย (Lab Challenge)**
- **โจทย์:** แสดงผลกรอบข้อความต้อนรับ พร้อมระบุชื่อ-นามสกุล และรหัสนักศึกษา
- **คำสั่งคอมไพล์และรัน:**
  ```bash
  gcc -o challenge_solution.exe challenge_solution.c
  ./challenge_solution.exe
  ```
- **ผลลัพธ์ที่ได้ (Output):**
  ```text
  =======================================
    Welcome to C Programming Laboratory  
    My Name: Somchai Deejai (65010999)   
  =======================================
  ```

---

### 2. `example2_solution.c`
โค้ดเฉลยสำหรับ **โปรแกรมตัวอย่างที่ 2: เติม Escape Character (Fill in the Blanks)**
- **คำตอบที่เติมลงในช่องว่าง:**
  1. ช่องที่ 1: `\n` (ขึ้นบรรทัดใหม่ Line 1)
  2. ช่องที่ 2: `\n` (ขึ้นบรรทัดใหม่ Line 2)
  3. ช่องที่ 3: `\t` (เว้นระยะแท็บ Column 1 ถึง 2)
  4. ช่องที่ 4: `\t` (เว้นระยะแท็บ Column 2 ถึง 3)
- **คำสั่งคอมไพล์และรัน:**
  ```bash
  gcc -o example2_solution.exe example2_solution.c
  ./example2_solution.exe
  ```
