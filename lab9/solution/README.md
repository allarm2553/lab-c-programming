# คู่มือเฉลยปฏิบัติการ Lab 9: การจัดการไฟล์ข้อมูล
## (Lab 9: File Handling I/O - Laboratory Solution & Grading Key)

โฟลเดอร์นี้รวบรวมไฟล์ซอร์สโค้ดเฉลยภาษา C (`.c`), แนวทางการตอบคำถาม และเกณฑ์การประเมินผลสำหรับ **Lab 9: การจัดการไฟล์ข้อมูล** ระดับประกาศนียบัตรวิชาชีพชั้นสูง (ปวส.)

---

## 🎯 วัตถุประสงค์เชิงสมรรถนะของใบงาน
1. Understand file streams (FILE *), open states and closing buffers
2. Understand difference between writing text records and binary data blocks
3. Capable of developing data storage logs onto disk media locally

---

## 📁 รายการไฟล์ในโฟลเดอร์ `solution/`

| ชื่อไฟล์ | คำอธิบาย |
| :--- | :--- |
| **`challenge_solution.c`** | ซอร์สโค้ดเฉลยกิจกรรมท้าทายเชิงอุตสาหกรรม/ระบบสมองกล (Lab Challenge) |
| **`example2_solution.c`** | ซอร์สโค้ดเฉลยโปรแกรมตัวอย่างที่ 2 (Fill in the Blanks) |
| **`README.md`** | เอกสารเฉลยละเอียดและเกณฑ์การตรวจให้คะแนน |

---

## 📝 1. เฉลยโปรแกรมตัวอย่างที่ 2 (Fill in the Blanks) - คะแนนเต็ม 2.0 คะแนน

### 1.1 โหมดการเปิดเพื่ออ่านไฟล์ข้อความ
- **คำตอบที่ถูกต้อง:** `"r"`
- **คำตอบที่เป็นไปได้:** `"r"`, `'r'`, `r`

### 1.2 ตรวจสอบพอยน์เตอร์การชี้ว่าเปิดล้มเหลวหรือไม่
- **คำตอบที่ถูกต้อง:** `NULL`
- **คำตอบที่เป็นไปได้:** `NULL`, `0`

### ซอร์สโค้ดตัวอย่างที่ 2 ฉบับสมบูรณ์ (`example2_solution.c`):
```c
#include <stdio.h>

int main() {
    FILE *fp;
    char buffer[50];
    
    fp = fopen("test.txt", "r");
    
    if (fp == NULL) {
        printf("Could not open file!\n");
        return 1;
    }
    
    fgets(buffer, 50, fp);
    printf("File Content: %s\n", buffer);
    fclose(fp);
    return 0;
}
```

- **คำสั่งคอมไพล์และทดสอบรัน:**
  ```bash
  gcc -Wall -Wextra -o example2_solution example2_solution.c
  ./example2_solution
  ```

---

## 🚀 2. เฉลยกิจกรรมท้าทาย (Lab Challenge Solution) - คะแนนเต็ม 4.0 คะแนน

### 2.1 บริบทโจทย์ท้าทายเชิงประยุกต์:
> พัฒนาโปรแกรมภาษา C จำลองระบบบันทึกประวัติเครื่องจักรลงไฟล์ CSV (Industrial Data Logger to 'datalog.csv') โดยใช้ fopen() โหมดเขียนไฟล์ บันทึกหัวคอลัมน์และข้อมูล 3 แซมเปิล (Sample, Time, Voltage_V, Temperature_C) ตรวจสอบตัวชี้ไฟล์ NULL และปิดไฟล์ด้วย fclose()


### 2.2 ซอร์สโค้ดเฉลยกิจกรรมท้าทาย (`challenge_solution.c`):
```c
#include <stdio.h>

int main() {
    FILE *fp = fopen("datalog.csv", "w");
    if (fp == NULL) {
        printf("Error creating datalog.csv!\n");
        return 1;
    }
    
    // Write CSV Header
    fprintf(fp, "Sample,Time,Voltage_V,Temperature_C\n");
    
    // Write Sample Industrial Records
    fprintf(fp, "1,09:00,380.2,42.5\n");
    fprintf(fp, "2,09:05,379.8,43.1\n");
    fprintf(fp, "3,09:10,381.0,44.0\n");
    
    fclose(fp);
    printf("Successfully logged industrial telemetry data to 'datalog.csv'!\n");
    return 0;
}
```

### 2.3 คำสั่งคอมไพล์และทดสอบรันบน Terminal:
```bash
gcc -Wall -Wextra -o challenge_solution challenge_solution.c
./challenge_solution
```

---

## 💡 3. เฉลยคำถามท้ายการทดลอง (Post-Lab Questions) - คะแนนเต็ม 3.0 คะแนน

### ข้อที่ 1: 1. การจัดการไฟล์ข้อมูลในรูปแบบ Text Mode และ Binary Mode แตกต่างกันอย่างไรในแง่ลักษณะไฟล์และขนาด? (1.5 คะแนน)
- **แนวทางการตอบที่ถูกต้อง:**
  - อธิบายหลักการ ความหมาย หรือกลไกการทำงานตามหัวข้ออย่างถูกต้องตรงประเด็น
  - มีการยกตัวอย่างประกอบ หรือระบุคีย์เวิร์ดสำคัญ เช่น `text, binary, ตัวอักษร, ไบนารี, มนุษย์อ่าน`
- **เกณฑ์การให้คะแนน:**
  - อธิบายได้ถูกต้องสมบูรณ์และยกตัวอย่างชัดเจน: **1.5 คะแนน**
  - ตอบถูกแต่ขาดรายละเอียดเชิงลึก: **0.8 - 1.0 คะแนน**
  - ไม่ตรงประเด็นหรือไม่ตอบ: **0.0 คะแนน**

### ข้อที่ 2: 2. เพราะเหตุใดเมื่อเขียนชุดคำสั่งภาษา C เพื่อจัดการไฟล์ เราจึงต้องตรวจสอบค่า pointer ของไฟล์ว่าเท่ากับ NULL หรือไม่หลัง fopen()? (1.5 คะแนน)
- **แนวทางการตอบที่ถูกต้อง:**
  - วิเคราะห์ข้อดี-ข้อจำกัด สาเหตุ หรือข้อควรระวังในการเขียนโปรแกรมจริง
  - มีคีย์เวิร์ดสำคัญ เช่น `null, สำเร็จ, แครช, ความปลอดภัย`
- **เกณฑ์การให้คะแนน:**
  - วิเคราะห์ได้ถูกต้อง ครอบคลุมบริบททางเทคนิค: **1.5 คะแนน**
  - ตอบได้บางส่วน: **0.8 - 1.0 คะแนน**
  - ตอบไม่ตรงประเด็น: **0.0 คะแนน**

---

## 📊 4. สรุปผลและการสะท้อนคิด (Conclusion & Reflection)
- นักศึกษาควรสรุปองค์ความรู้ที่ได้รับจากใบงานนี้ ปัญหาที่พบในการทดลอง (เช่น ข้อผิดพลาดทางไวยากรณ์, ชนิดข้อมูล หรือหน่วยความจำ) และแนวทางแก้ไขเพื่อประยุกต์ใช้งานในระบบสมองกลหรืองานช่างจริง
