# คู่มือเฉลยปฏิบัติการ Lab 6: อาร์เรย์และสตริง (Arrays & Strings)
## (Lab 6: Arrays & Strings - Laboratory Solution & Grading Key)

โฟลเดอร์นี้รวบรวมไฟล์ซอร์สโค้ดเฉลยภาษา C (`.c`), แนวทางการตอบคำถาม และเกณฑ์การประเมินผลสำหรับ **Lab 6: อาร์เรย์และสตริง (Arrays & Strings)** ระดับประกาศนียบัตรวิชาชีพชั้นสูง (ปวส.)

---

## 🎯 วัตถุประสงค์เชิงสมรรถนะของใบงาน
1. Understand allocation, indexing and array structures in C (1D/2D)
2. Understand C character arrays and difference with standard data structures
3. Capable of processing strings, character iterations and reverse formatting

---

## 📁 รายการไฟล์ในโฟลเดอร์ `solution/`

| ชื่อไฟล์ | คำอธิบาย |
| :--- | :--- |
| **`challenge_solution.c`** | ซอร์สโค้ดเฉลยกิจกรรมท้าทายเชิงอุตสาหกรรม/ระบบสมองกล (Lab Challenge) |
| **`example2_solution.c`** | ซอร์สโค้ดเฉลยโปรแกรมตัวอย่างที่ 2 (Fill in the Blanks) |
| **`README.md`** | เอกสารเฉลยละเอียดและเกณฑ์การตรวจให้คะแนน |

---

## 📝 1. เฉลยโปรแกรมตัวอย่างที่ 2 (Fill in the Blanks) - คะแนนเต็ม 2.0 คะแนน

### 1.1 ประเภทชนิดข้อมูลอาร์เรย์ตัวอักษร
- **คำตอบที่ถูกต้อง:** `char`
- **คำตอบที่เป็นไปได้:** `char`

### 1.2 Format Specifier สำหรับสตริง
- **คำตอบที่ถูกต้อง:** `%s`
- **คำตอบที่เป็นไปได้:** `%s`, `%29s`

### ซอร์สโค้ดตัวอย่างที่ 2 ฉบับสมบูรณ์ (`example2_solution.c`):
```c
#include <stdio.h>

int main() {
    char name[30];
    
    printf("Enter your name: ");
    scanf("%s", name);
    
    printf("Hello, %s!\n", name);
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
> พัฒนาโปรแกรมภาษา C บันทึกประวัติกระแสไฟฟ้ามอเตอร์ 5 ค่าลงในอาร์เรย์ float currentLog[5] จากนั้นคำนวณ: 1) กระแสไฟฟ้าเฉลี่ย (Average Current), 2) กระแสไฟฟ้าสูงสุด (Peak Current) และ 3) ตรวจสอบเงื่อนไขแจ้งเตือน [OVERLOAD WARNING!] หากค่า Peak เกิน 15.0 A


### 2.2 ซอร์สโค้ดเฉลยกิจกรรมท้าทาย (`challenge_solution.c`):
```c
#include <stdio.h>

int main() {
    float currentLog[5];
    float sum = 0.0f, maxCurrent = 0.0f;
    
    printf("Enter 5 Motor Current Samples (Amp):\n");
    for (int i = 0; i < 5; i++) {
        printf("Sample [%d]: ", i + 1);
        if (scanf("%f", &currentLog[i]) != 1) return 1;
        sum += currentLog[i];
        if (currentLog[i] > maxCurrent) {
            maxCurrent = currentLog[i];
        }
    }
    
    float avgCurrent = sum / 5.0f;
    printf("\n--- Motor Current Analysis ---\n");
    printf("Average Current: %.2f A\n", avgCurrent);
    printf("Peak Current:    %.2f A\n", maxCurrent);
    
    if (maxCurrent > 15.0f) {
        printf("Status: [OVERLOAD WARNING] Current exceeded 15.0A safe threshold!\n");
    } else {
        printf("Status: [NORMAL] Motor operating within safe current limits.\n");
    }
    
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

### ข้อที่ 1: 1. สตริงในภาษา C แตกต่างจากอาร์เรย์ชนิด char ทั่วไปอย่างไร และตัวอักษร '\0' (Null character) มีความสำคัญอย่างไร? (1.5 คะแนน)
- **แนวทางการตอบที่ถูกต้อง:**
  - อธิบายหลักการ ความหมาย หรือกลไกการทำงานตามหัวข้ออย่างถูกต้องตรงประเด็น
  - มีการยกตัวอย่างประกอบ หรือระบุคีย์เวิร์ดสำคัญ เช่น `1 มิติ, 2 มิติ, แถว, คอลัมน์, ตาราง, \0, null`
- **เกณฑ์การให้คะแนน:**
  - อธิบายได้ถูกต้องสมบูรณ์และยกตัวอย่างชัดเจน: **1.5 คะแนน**
  - ตอบถูกแต่ขาดรายละเอียดเชิงลึก: **0.8 - 1.0 คะแนน**
  - ไม่ตรงประเด็นหรือไม่ตอบ: **0.0 คะแนน**

### ข้อที่ 2: 2. การจองขนาดพื้นที่อาร์เรย์แบบคงที่ (Static Array) เช่น int score[5]; มีข้อดีและข้อจำกัดอย่างไรในการทำงานจริง? (1.5 คะแนน)
- **แนวทางการตอบที่ถูกต้อง:**
  - วิเคราะห์ข้อดี-ข้อจำกัด สาเหตุ หรือข้อควรระวังในการเขียนโปรแกรมจริง
  - มีคีย์เวิร์ดสำคัญ เช่น `\0, null, จบ, array, character, static`
- **เกณฑ์การให้คะแนน:**
  - วิเคราะห์ได้ถูกต้อง ครอบคลุมบริบททางเทคนิค: **1.5 คะแนน**
  - ตอบได้บางส่วน: **0.8 - 1.0 คะแนน**
  - ตอบไม่ตรงประเด็น: **0.0 คะแนน**

---

## 📊 4. สรุปผลและการสะท้อนคิด (Conclusion & Reflection)
- นักศึกษาควรสรุปองค์ความรู้ที่ได้รับจากใบงานนี้ ปัญหาที่พบในการทดลอง (เช่น ข้อผิดพลาดทางไวยากรณ์, ชนิดข้อมูล หรือหน่วยความจำ) และแนวทางแก้ไขเพื่อประยุกต์ใช้งานในระบบสมองกลหรืองานช่างจริง
