# คู่มือเฉลยปฏิบัติการ Lab 10: การใช้งานฟังก์ชันจัดการสตริง (String Functions)
## (Lab 10: String Functions - Laboratory Solution & Grading Key)

โฟลเดอร์นี้รวบรวมไฟล์ซอร์สโค้ดเฉลยภาษา C (`.c`), แนวทางการตอบคำถาม และเกณฑ์การประเมินผลสำหรับ **Lab 10: การใช้งานฟังก์ชันจัดการสตริง (String Functions)** ระดับประกาศนียบัตรวิชาชีพชั้นสูง (ปวส.)

---

## 🎯 วัตถุประสงค์เชิงสมรรถนะของใบงาน
1. เข้าใจหลักการและโครงสร้างของสตริง (String) ในภาษา C ซึ่งจบด้วย Null Character (\0)
2. สามารถเรียกใช้ฟังก์ชันจัดการสตริงพื้นฐานได้แก่ strlen(), strcpy(), strcat(), strcmp(), fgets() และ puts() ได้อย่างถูกต้อง
3. สามารถประยุกต์ใช้ฟังก์ชันสตริงเพื่อแก้ปัญหาการจัดการข้อมูลประเภทข้อความได้

---

## 📁 รายการไฟล์ในโฟลเดอร์ `solution/`

| ชื่อไฟล์ | คำอธิบาย |
| :--- | :--- |
| **`challenge_solution.c`** | ซอร์สโค้ดเฉลยกิจกรรมท้าทายเชิงอุตสาหกรรม/ระบบสมองกล (Lab Challenge) |
| **`example2_solution.c`** | ซอร์สโค้ดเฉลยโปรแกรมตัวอย่างที่ 2 (Fill in the Blanks) |
| **`README.md`** | เอกสารเฉลยละเอียดและเกณฑ์การตรวจให้คะแนน |

---

## 📝 1. เฉลยโปรแกรมตัวอย่างที่ 2 (Fill in the Blanks) - คะแนนเต็ม 2.0 คะแนน

### 1.1 คำสั่งคัดลอกสตริงแบบจำกัดจำนวน
- **คำตอบที่ถูกต้อง:** `strncpy`
- **คำตอบที่เป็นไปได้:** `strncpy`

### 1.2 คำสั่งเชื่อมสตริงแบบจำกัดจำนวน
- **คำตอบที่ถูกต้อง:** `strncat`
- **คำตอบที่เป็นไปได้:** `strncat`

### ซอร์สโค้ดตัวอย่างที่ 2 ฉบับสมบูรณ์ (`example2_solution.c`):
```c
#include <stdio.h>
#include <string.h>

int main() {
    char buffer[15];
    char source[] = "SuperLongString";
    char result[30] = "Prefix_";

    printf("--- การใช้งาน strncpy() และ strncat() ---\n");
    
    strncpy(buffer, source, sizeof(buffer) - 1);
    buffer[sizeof(buffer) - 1] = '\0';
    printf("strncpy ผลลัพธ์ใน buffer: '%s'\n", buffer);

    strncat(result, source, 5);
    printf("strncat ผลลัพธ์ใน result: '%s'\n", result);

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
> พัฒนาโปรแกรมถอดรหัสคำสั่ง Serial/IoT AT Command (เช่น $SET,RELAY,ON# หรือ $READ,TEMP#) โดยใช้ fgets() รับคำสั่งเข้าบัฟเฟอร์อย่างปลอดภัย และใช้ฟังก์ชันจัดการสตริงใน &lt;string.h&gt; (เช่น strstr, strcmp, strlen) ตรวจสอบและสั่งการจำลองการทำงานของอุปกรณ์


### 2.2 ซอร์สโค้ดเฉลยกิจกรรมท้าทาย (`challenge_solution.c`):
```c
#include <stdio.h>
#include <string.h>

int main() {
    char cmdBuffer[64];
    printf("Enter Serial Command (e.g. $SET,RELAY,ON# or $READ,TEMP#): ");
    if (fgets(cmdBuffer, sizeof(cmdBuffer), stdin) != NULL) {
        cmdBuffer[strcspn(cmdBuffer, "\r\n")] = '\0';
        
        printf("\n--- Command Packet Parser Analysis ---\n");
        printf("Raw Packet:    %s (Length: %zu chars)\n", cmdBuffer, strlen(cmdBuffer));
        
        if (strstr(cmdBuffer, "$SET,RELAY,ON#") != NULL) {
            printf("Action: Executing -> RELAY SWITCH ENERGIZED [ON]\n");
        } else if (strstr(cmdBuffer, "$SET,RELAY,OFF#") != NULL) {
            printf("Action: Executing -> RELAY SWITCH DE-ENERGIZED [OFF]\n");
        } else if (strstr(cmdBuffer, "$READ,TEMP#") != NULL) {
            printf("Action: Telemetry -> Reading Sensor Temp: 28.50 C\n");
        } else {
            printf("Action: [UNKNOWN COMMAND] Syntax error or invalid header.\n");
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

### ข้อที่ 1: 1. อธิบายความแตกต่างและเหตุผลด้านความปลอดภัยในการเลือกใช้งานระหว่างฟังก์ชัน strcpy() และ strncpy() (1.5 คะแนน)
- **แนวทางการตอบที่ถูกต้อง:**
  - อธิบายหลักการ ความหมาย หรือกลไกการทำงานตามหัวข้ออย่างถูกต้องตรงประเด็น
  - มีการยกตัวอย่างประกอบ หรือระบุคีย์เวิร์ดสำคัญ เช่น `overflow, ความยาว, n, ปลอดภัย, \0`
- **เกณฑ์การให้คะแนน:**
  - อธิบายได้ถูกต้องสมบูรณ์และยกตัวอย่างชัดเจน: **1.5 คะแนน**
  - ตอบถูกแต่ขาดรายละเอียดเชิงลึก: **0.8 - 1.0 คะแนน**
  - ไม่ตรงประเด็นหรือไม่ตอบ: **0.0 คะแนน**

### ข้อที่ 2: 2. เพราะเหตุใดฟังก์ชัน fgets() จึงต้องมีพารามิเตอร์จำกัดขนาด (size) และเพราะเหตุใดนักพัฒนาจึงต้องจัดการกับอักษรขึ้นบรรทัดใหม่ (\n) หลังการรับข้อมูล? (1.5 คะแนน)
- **แนวทางการตอบที่ถูกต้อง:**
  - วิเคราะห์ข้อดี-ข้อจำกัด สาเหตุ หรือข้อควรระวังในการเขียนโปรแกรมจริง
  - มีคีย์เวิร์ดสำคัญ เช่น `gets, ปลอดภัย, ขนาด, buffer, \n, enter`
- **เกณฑ์การให้คะแนน:**
  - วิเคราะห์ได้ถูกต้อง ครอบคลุมบริบททางเทคนิค: **1.5 คะแนน**
  - ตอบได้บางส่วน: **0.8 - 1.0 คะแนน**
  - ตอบไม่ตรงประเด็น: **0.0 คะแนน**

---

## 📊 4. สรุปผลและการสะท้อนคิด (Conclusion & Reflection)
- นักศึกษาควรสรุปองค์ความรู้ที่ได้รับจากใบงานนี้ ปัญหาที่พบในการทดลอง (เช่น ข้อผิดพลาดทางไวยากรณ์, ชนิดข้อมูล หรือหน่วยความจำ) และแนวทางแก้ไขเพื่อประยุกต์ใช้งานในระบบสมองกลหรืองานช่างจริง
