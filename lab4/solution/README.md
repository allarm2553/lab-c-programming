# คู่มือเฉลยปฏิบัติการ Lab 4: โครงสร้างควบคุมแบบวนซ้ำ (Loops)
## (Lab 4: Loops & Nested Loops - Laboratory Solution & Grading Key)

โฟลเดอร์นี้รวบรวมไฟล์ซอร์สโค้ดเฉลยภาษา C (`.c`), แนวทางการตอบคำถาม และเกณฑ์การประเมินผลสำหรับ **Lab 4: โครงสร้างควบคุมแบบวนซ้ำ (Loops)** ระดับประกาศนียบัตรวิชาชีพชั้นสูง (ปวส.)

---

## 🎯 วัตถุประสงค์เชิงสมรรถนะของใบงาน
1. Understand the mechanics of loop controls (for, while, do-while) in C
2. Understand differences and appropriate use cases of each loop type
3. Capable of implementing nested loops to construct structured output formatting

---

## 📁 รายการไฟล์ในโฟลเดอร์ `solution/`

| ชื่อไฟล์ | คำอธิบาย |
| :--- | :--- |
| **`challenge_solution.c`** | ซอร์สโค้ดเฉลยกิจกรรมท้าทายเชิงอุตสาหกรรม/ระบบสมองกล (Lab Challenge) |
| **`example2_solution.c`** | ซอร์สโค้ดเฉลยโปรแกรมตัวอย่างที่ 2 (Fill in the Blanks) |
| **`README.md`** | เอกสารเฉลยละเอียดและเกณฑ์การตรวจให้คะแนน |

---

## 📝 1. เฉลยโปรแกรมตัวอย่างที่ 2 (Fill in the Blanks) - คะแนนเต็ม 2.0 คะแนน

### 1.1 เงื่อนไขเมื่อ count <= 3
- **คำตอบที่ถูกต้อง:** `count <= 3`
- **คำตอบที่เป็นไปได้:** `count <= 3`, `count<=3`, `count < 4`, `count<4`

### 1.2 การบวกเพิ่มค่าตัวแปรนับรอบ
- **คำตอบที่ถูกต้อง:** `count++`
- **คำตอบที่เป็นไปได้:** `count++`, `count ++`, `++count`, `count += 1`, `count=count+1`, `count = count + 1`

### ซอร์สโค้ดตัวอย่างที่ 2 ฉบับสมบูรณ์ (`example2_solution.c`):
```c
#include <stdio.h>

int main() {
    int count = 1;
    
    while (count <= 3) {
        printf("Count: %d\n", count);
        count++;
    }
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
> พัฒนาโปรแกรมจำลองการสร้างสัญญาณ PWM ควบคุมมอเตอร์ โดยรับค่า Duty Cycle (0 - 100%) และจำนวนคาบเวลา N คาบ จากนั้นใช้ลูปซ้อนลูป (Nested Loops) พิมพ์กราฟิกรูปคลื่นสัญญาณพัลส์ดิจิทัล 1 และ 0 ในแต่ละคาบเวลาตามสัดส่วน Duty Cycle พร้อมคำนวณแรงดันไฟฟ้าเฉลี่ย


### 2.2 ซอร์สโค้ดเฉลยกิจกรรมท้าทาย (`challenge_solution.c`):
```c
#include <stdio.h>

int main() {
    int dutyCycle, periods;
    printf("Enter PWM Duty Cycle (0 - 100%%): ");
    if (scanf("%d", &dutyCycle) == 1) {
        printf("Enter Number of Periods to generate (e.g. 5): ");
        if (scanf("%d", &periods) == 1) {
            int onUnits = dutyCycle / 10;
            int offUnits = 10 - onUnits;
            
            printf("\n--- Generated PWM Signal Waves (%d%% Duty Cycle) ---\n", dutyCycle);
            for (int p = 1; p <= periods; p++) {
                printf("Period %2d: [", p);
                for (int i = 0; i < onUnits; i++) {
                    printf("1");
                }
                for (int j = 0; j < offUnits; j++) {
                    printf("0");
                }
                printf("] Output Voltage ~ %.1f V\n", (dutyCycle / 100.0f) * 5.0f);
            }
        }
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

### ข้อที่ 1: 1. อธิบายความแตกต่างของเงื่อนไขการตรวจสอบลูปของ while และ do-while ในการใช้งานจริง (1.5 คะแนน)
- **แนวทางการตอบที่ถูกต้อง:**
  - อธิบายหลักการ ความหมาย หรือกลไกการทำงานตามหัวข้ออย่างถูกต้องตรงประเด็น
  - มีการยกตัวอย่างประกอบ หรือระบุคีย์เวิร์ดสำคัญ เช่น `ก่อน, หลัง, do-while, รอบ, อย่างน้อย`
- **เกณฑ์การให้คะแนน:**
  - อธิบายได้ถูกต้องสมบูรณ์และยกตัวอย่างชัดเจน: **1.5 คะแนน**
  - ตอบถูกแต่ขาดรายละเอียดเชิงลึก: **0.8 - 1.0 คะแนน**
  - ไม่ตรงประเด็นหรือไม่ตอบ: **0.0 คะแนน**

### ข้อที่ 2: 2. อธิบายการทำงานและผลต่างของคำสั่ง break และ continue เมื่อเขียนควบคุมภายในตัวลูป (1.5 คะแนน)
- **แนวทางการตอบที่ถูกต้อง:**
  - วิเคราะห์ข้อดี-ข้อจำกัด สาเหตุ หรือข้อควรระวังในการเขียนโปรแกรมจริง
  - มีคีย์เวิร์ดสำคัญ เช่น `break, continue, ออก, ข้าม`
- **เกณฑ์การให้คะแนน:**
  - วิเคราะห์ได้ถูกต้อง ครอบคลุมบริบททางเทคนิค: **1.5 คะแนน**
  - ตอบได้บางส่วน: **0.8 - 1.0 คะแนน**
  - ตอบไม่ตรงประเด็น: **0.0 คะแนน**

---

## 📊 4. สรุปผลและการสะท้อนคิด (Conclusion & Reflection)
- นักศึกษาควรสรุปองค์ความรู้ที่ได้รับจากใบงานนี้ ปัญหาที่พบในการทดลอง (เช่น ข้อผิดพลาดทางไวยากรณ์, ชนิดข้อมูล หรือหน่วยความจำ) และแนวทางแก้ไขเพื่อประยุกต์ใช้งานในระบบสมองกลหรืองานช่างจริง
