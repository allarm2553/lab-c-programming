# คู่มือเฉลยปฏิบัติการ Lab 5: ฟังก์ชันและการขอบเขตตัวแปร (Functions & Scope)
## (Lab 5: Functions & Scope - Laboratory Solution & Grading Key)

โฟลเดอร์นี้รวบรวมไฟล์ซอร์สโค้ดเฉลยภาษา C (`.c`), แนวทางการตอบคำถาม และเกณฑ์การประเมินผลสำหรับ **Lab 5: ฟังก์ชันและการขอบเขตตัวแปร (Functions & Scope)** ระดับประกาศนียบัตรวิชาชีพชั้นสูง (ปวส.)

---

## 🎯 วัตถุประสงค์เชิงสมรรถนะของใบงาน
1. Understand functional modularity and programming structure with parameters
2. Understand variable scope levels and stack frame call stacks
3. Capable of constructing safe recursive functions without stack overflow

---

## 📁 รายการไฟล์ในโฟลเดอร์ `solution/`

| ชื่อไฟล์ | คำอธิบาย |
| :--- | :--- |
| **`challenge_solution.c`** | ซอร์สโค้ดเฉลยกิจกรรมท้าทายเชิงอุตสาหกรรม/ระบบสมองกล (Lab Challenge) |
| **`example2_solution.c`** | ซอร์สโค้ดเฉลยโปรแกรมตัวอย่างที่ 2 (Fill in the Blanks) |
| **`README.md`** | เอกสารเฉลยละเอียดและเกณฑ์การตรวจให้คะแนน |

---

## 📝 1. เฉลยโปรแกรมตัวอย่างที่ 2 (Fill in the Blanks) - คะแนนเต็ม 2.0 คะแนน

### 1.1 เงื่อนไข Base Case เมื่อ exp == 0
- **คำตอบที่ถูกต้อง:** `exp == 0`
- **คำตอบที่เป็นไปได้:** `exp == 0`, `exp==0`, `exp <= 0`, `exp<=0`

### 1.2 การเรียก Recursion ย่อยรอบ
- **คำตอบที่ถูกต้อง:** `power(base, exp - 1)`
- **คำตอบที่เป็นไปได้:** `power(base, exp - 1)`, `power(base,exp-1)`, `power(base, exp-1)`

### ซอร์สโค้ดตัวอย่างที่ 2 ฉบับสมบูรณ์ (`example2_solution.c`):
```c
#include <stdio.h>

int power(int base, int exp) {
    if (exp == 0) {
        return 1;
    }
    return base * power(base, exp - 1);
}

int main() {
    printf("2^3 = %d\n", power(2, 3));
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
> พัฒนาโปรแกรมภาษา C สำหรับระบบวัดค่าเซนเซอร์ โดยสร้าง 2 ฟังก์ชัน: 1) calibrateTemperature(int rawADC) คำนวณแปลงค่า ADC เป็นอุณหภูมิองศาเซลเซียส และ 2) updateMinMax(float temp, float *minTemp, float *maxTemp) อัปเดตค่าอุณหภูมิต่ำสุด-สูงสุดผ่าน Call-by-Reference


### 2.2 ซอร์สโค้ดเฉลยกิจกรรมท้าทาย (`challenge_solution.c`):
```c
#include <stdio.h>

float calibrateTemperature(int rawADC) {
    return (rawADC * 0.0977f) - 10.0f;
}

void updateMinMax(float temp, float *minTemp, float *maxTemp) {
    if (temp < *minTemp) *minTemp = temp;
    if (temp > *maxTemp) *maxTemp = temp;
}

int main() {
    int adc1, adc2, adc3;
    printf("Enter 3 Raw ADC Samples: ");
    if (scanf("%d %d %d", &adc1, &adc2, &adc3) == 3) {
        float t1 = calibrateTemperature(adc1);
        float t2 = calibrateTemperature(adc2);
        float t3 = calibrateTemperature(adc3);
        
        float minT = t1, maxT = t1;
        updateMinMax(t2, &minT, &maxT);
        updateMinMax(t3, &minT, &maxT);
        
        float avgT = (t1 + t2 + t3) / 3.0f;
        
        printf("\n--- Sensor Calibration Results ---\n");
        printf("Sample 1: %.2f C\n", t1);
        printf("Sample 2: %.2f C\n", t2);
        printf("Sample 3: %.2f C\n", t3);
        printf("Average Temp: %.2f C\n", avgT);
        printf("Min Temp: %.2f C, Max Temp: %.2f C\n", minT, maxT);
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

### ข้อที่ 1: 1. การส่งค่าพารามิเตอร์แบบ Call-by-Value และ Call-by-Reference ในภาษา C แตกต่างกันอย่างไร? (1.5 คะแนน)
- **แนวทางการตอบที่ถูกต้อง:**
  - อธิบายหลักการ ความหมาย หรือกลไกการทำงานตามหัวข้ออย่างถูกต้องตรงประเด็น
  - มีการยกตัวอย่างประกอบ หรือระบุคีย์เวิร์ดสำคัญ เช่น `value, reference, copy, address, ตัวแปรเดิม`
- **เกณฑ์การให้คะแนน:**
  - อธิบายได้ถูกต้องสมบูรณ์และยกตัวอย่างชัดเจน: **1.5 คะแนน**
  - ตอบถูกแต่ขาดรายละเอียดเชิงลึก: **0.8 - 1.0 คะแนน**
  - ไม่ตรงประเด็นหรือไม่ตอบ: **0.0 คะแนน**

### ข้อที่ 2: 2. เพราะเหตุใดฟังก์ชันแบบเรียกตัวเอง (Recursion) จึงต้องกำหนดกรณีฐาน (Base Case) ไว้ และหากไม่มีจะเกิดอะไรขึ้น? (1.5 คะแนน)
- **แนวทางการตอบที่ถูกต้อง:**
  - วิเคราะห์ข้อดี-ข้อจำกัด สาเหตุ หรือข้อควรระวังในการเขียนโปรแกรมจริง
  - มีคีย์เวิร์ดสำคัญ เช่น `base case, กรณีฐาน, ล้น, infinite, stack overflow`
- **เกณฑ์การให้คะแนน:**
  - วิเคราะห์ได้ถูกต้อง ครอบคลุมบริบททางเทคนิค: **1.5 คะแนน**
  - ตอบได้บางส่วน: **0.8 - 1.0 คะแนน**
  - ตอบไม่ตรงประเด็น: **0.0 คะแนน**

---

## 📊 4. สรุปผลและการสะท้อนคิด (Conclusion & Reflection)
- นักศึกษาควรสรุปองค์ความรู้ที่ได้รับจากใบงานนี้ ปัญหาที่พบในการทดลอง (เช่น ข้อผิดพลาดทางไวยากรณ์, ชนิดข้อมูล หรือหน่วยความจำ) และแนวทางแก้ไขเพื่อประยุกต์ใช้งานในระบบสมองกลหรืองานช่างจริง
