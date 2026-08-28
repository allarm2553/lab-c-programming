# คู่มือเฉลยปฏิบัติการ Lab 3: โครงสร้างแบบเลือกทำ (Conditionals)
## (Lab 3: Conditionals (if/switch) - Laboratory Solution & Grading Key)

โฟลเดอร์นี้รวบรวมไฟล์ซอร์สโค้ดเฉลยภาษา C (`.c`), แนวทางการตอบคำถาม และเกณฑ์การประเมินผลสำหรับ **Lab 3: โครงสร้างแบบเลือกทำ (Conditionals)** ระดับประกาศนียบัตรวิชาชีพชั้นสูง (ปวส.)

---

## 🎯 วัตถุประสงค์เชิงสมรรถนะของใบงาน
1. Understand the logic and syntax of conditional statements in C
2. Can structure nested if-else statements correctly
3. Understand the appropriate usage of switch-case compared to if-else

---

## 📁 รายการไฟล์ในโฟลเดอร์ `solution/`

| ชื่อไฟล์ | คำอธิบาย |
| :--- | :--- |
| **`challenge_solution.c`** | ซอร์สโค้ดเฉลยกิจกรรมท้าทายเชิงอุตสาหกรรม/ระบบสมองกล (Lab Challenge) |
| **`example2_solution.c`** | ซอร์สโค้ดเฉลยโปรแกรมตัวอย่างที่ 2 (Fill in the Blanks) |
| **`README.md`** | เอกสารเฉลยละเอียดและเกณฑ์การตรวจให้คะแนน |

---

## 📝 1. เฉลยโปรแกรมตัวอย่างที่ 2 (Fill in the Blanks) - คะแนนเต็ม 2.0 คะแนน

### 1.1 คีย์เวิร์ดสำหรับเริ่มการประเมิน switch
- **คำตอบที่ถูกต้อง:** `switch`
- **คำตอบที่เป็นไปได้:** `switch`

### 1.2 คีย์เวิร์ดหยุดการทำงานเล็ดลอดเคส
- **คำตอบที่ถูกต้อง:** `break`
- **คำตอบที่เป็นไปได้:** `break`

### ซอร์สโค้ดตัวอย่างที่ 2 ฉบับสมบูรณ์ (`example2_solution.c`):
```c
#include <stdio.h>

int main() {
    char grade;
    printf("Enter grade (A, B, C): ");
    scanf(" %c", &grade);
    
    switch (grade) {
        case 'A':
            printf("Excellent!\n");
            break;
        case 'B':
            printf("Good job!\n");
            break;
        default:
            printf("Try harder!\n");
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
> พัฒนาโปรแกรมควบคุมปั๊มน้ำในถังพักอุตสาหกรรม โดยรับค่าระดับน้ำ (0.0 - 100.0%) และรหัสโหมดการทำงาน (1: Auto, 2: Manual Drain, 3: Emergency Stop) โดยใช้ switch-case ตรวจสอบโหมด และใช้ if-else if ตรวจสอบระดับน้ำ: ถ้าน้อยกว่า 20% สั่ง Pump High, 20-80% สั่ง Pump Normal, มากกว่า 80% สั่ง Stop Pump


### 2.2 ซอร์สโค้ดเฉลยกิจกรรมท้าทาย (`challenge_solution.c`):
```c
#include <stdio.h>

int main() {
    float waterLevel;
    int mode;
    
    printf("Enter Water Level (0.0 - 100.0%%): ");
    if (scanf("%f", &waterLevel) == 1) {
        printf("Enter Mode (1: AUTO, 2: MANUAL DRAIN, 3: EMERGENCY STOP): ");
        if (scanf("%d", &mode) == 1) {
            printf("\n--- System Control Status ---\n");
            switch (mode) {
                case 1:
                    printf("Mode: AUTOMATIC CONTROL\n");
                    if (waterLevel < 20.0f) {
                        printf("Water Status: LOW (%.1f%%) -> Pump Action: RUN HIGH SPEED\n", waterLevel);
                    } else if (waterLevel <= 80.0f) {
                        printf("Water Status: OPTIMAL (%.1f%%) -> Pump Action: RUN NORMAL SPEED\n", waterLevel);
                    } else {
                        printf("Water Status: FULL (%.1f%%) -> Pump Action: STOP PUMP\n", waterLevel);
                    }
                    break;
                case 2:
                    printf("Mode: MANUAL DRAIN -> Drain Valve: OPEN\n");
                    break;
                case 3:
                    printf("Mode: EMERGENCY STOP -> ALL PUMPS & VALVES SHUTDOWN!\n");
                    break;
                default:
                    printf("Invalid Mode Selected!\n");
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

### ข้อที่ 1: 1. ในการตรวจสอบเงื่อนไขคะแนนเกรด เพราะเหตุใดโครงสร้างแบบ if-else if-else จึงมีประสิทธิภาพดีกว่าการใช้ if เดี่ยวหลายๆ ตัวแยกกัน? (1.5 คะแนน)
- **แนวทางการตอบที่ถูกต้อง:**
  - อธิบายหลักการ ความหมาย หรือกลไกการทำงานตามหัวข้ออย่างถูกต้องตรงประเด็น
  - มีการยกตัวอย่างประกอบ หรือระบุคีย์เวิร์ดสำคัญ เช่น `ประสิทธิภาพ, ข้าม, ตรวจสอบ, เงื่อนไข`
- **เกณฑ์การให้คะแนน:**
  - อธิบายได้ถูกต้องสมบูรณ์และยกตัวอย่างชัดเจน: **1.5 คะแนน**
  - ตอบถูกแต่ขาดรายละเอียดเชิงลึก: **0.8 - 1.0 คะแนน**
  - ไม่ตรงประเด็นหรือไม่ตอบ: **0.0 คะแนน**

### ข้อที่ 2: 2. อธิบายหน้าที่ของคีย์เวิร์ด break ในคำสั่ง switch-case และผลลัพธ์จะเกิดความผิดพลาดอย่างไรหากเราลืมเขียนล้อมรอบ case? (1.5 คะแนน)
- **แนวทางการตอบที่ถูกต้อง:**
  - วิเคราะห์ข้อดี-ข้อจำกัด สาเหตุ หรือข้อควรระวังในการเขียนโปรแกรมจริง
  - มีคีย์เวิร์ดสำคัญ เช่น `break, switch, fall-through, ไหล`
- **เกณฑ์การให้คะแนน:**
  - วิเคราะห์ได้ถูกต้อง ครอบคลุมบริบททางเทคนิค: **1.5 คะแนน**
  - ตอบได้บางส่วน: **0.8 - 1.0 คะแนน**
  - ตอบไม่ตรงประเด็น: **0.0 คะแนน**

---

## 📊 4. สรุปผลและการสะท้อนคิด (Conclusion & Reflection)
- นักศึกษาควรสรุปองค์ความรู้ที่ได้รับจากใบงานนี้ ปัญหาที่พบในการทดลอง (เช่น ข้อผิดพลาดทางไวยากรณ์, ชนิดข้อมูล หรือหน่วยความจำ) และแนวทางแก้ไขเพื่อประยุกต์ใช้งานในระบบสมองกลหรืองานช่างจริง
