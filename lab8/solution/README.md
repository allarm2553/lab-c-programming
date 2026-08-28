# คู่มือเฉลยปฏิบัติการ Lab 8: โครงสร้างข้อมูลกำหนดเอง (Structures & Unions)
## (Lab 8: Structures & Unions - Laboratory Solution & Grading Key)

โฟลเดอร์นี้รวบรวมไฟล์ซอร์สโค้ดเฉลยภาษา C (`.c`), แนวทางการตอบคำถาม และเกณฑ์การประเมินผลสำหรับ **Lab 8: โครงสร้างข้อมูลกำหนดเอง (Structures & Unions)** ระดับประกาศนียบัตรวิชาชีพชั้นสูง (ปวส.)

---

## 🎯 วัตถุประสงค์เชิงสมรรถนะของใบงาน
1. Understand struct and union definitions, alignments and structural concepts
2. Capable of passing structure types into modular functions and arrays
3. Understand differences between structural memory segments and overlapping union spaces

---

## 📁 รายการไฟล์ในโฟลเดอร์ `solution/`

| ชื่อไฟล์ | คำอธิบาย |
| :--- | :--- |
| **`challenge_solution.c`** | ซอร์สโค้ดเฉลยกิจกรรมท้าทายเชิงอุตสาหกรรม/ระบบสมองกล (Lab Challenge) |
| **`example2_solution.c`** | ซอร์สโค้ดเฉลยโปรแกรมตัวอย่างที่ 2 (Fill in the Blanks) |
| **`README.md`** | เอกสารเฉลยละเอียดและเกณฑ์การตรวจให้คะแนน |

---

## 📝 1. เฉลยโปรแกรมตัวอย่างที่ 2 (Fill in the Blanks) - คะแนนเต็ม 2.0 คะแนน

### 1.1 ประกาศและกำหนดค่าเริ่มต้นโครงสร้าง User
- **คำตอบที่ถูกต้อง:** `struct User`
- **คำตอบที่เป็นไปได้:** `struct User`

### 1.2 การเข้าถึงตัวแปร username ด้านใน struct
- **คำตอบที่ถูกต้อง:** `user1.username`
- **คำตอบที่เป็นไปได้:** `user1.username`

### ซอร์สโค้ดตัวอย่างที่ 2 ฉบับสมบูรณ์ (`example2_solution.c`):
```c
#include <stdio.h>

struct User {
    int id;
    char username[20];
};

int main() {
    struct User user1 = {101, "admin"};
    printf("User ID: %d, Name: %s\n", user1.id, user1.username);
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
> พัฒนาโครงสร้างข้อมูลโหนดเซนเซอร์ IoT struct SensorNode ประกอบด้วย: int nodeID, float temperature, float humidity, int relayActive จากนั้นสร้างฟังก์ชัน displayTelemetry รับพอยน์เตอร์โครงสร้าง (struct SensorNode *node) เพื่อแสดงผลค่าโทรมาตรผ่านตัวดำเนินการ ->


### 2.2 ซอร์สโค้ดเฉลยกิจกรรมท้าทาย (`challenge_solution.c`):
```c
#include <stdio.h>

struct SensorNode {
    int nodeID;
    float temperature;
    float humidity;
    int relayActive;
};

void displayTelemetry(const struct SensorNode *node) {
    printf("\n--- IoT Telemetry Packet Report ---\n");
    printf("Sensor Node ID:  #%04d\n", node->nodeID);
    printf("Ambient Temp:    %.2f C\n", node->temperature);
    printf("Relative Humid:  %.2f %%\n", node->humidity);
    printf("Relay Status:    %s\n", node->relayActive ? "ACTIVATED [ON]" : "STANDBY [OFF]");
    printf("Total Struct Size: %zu Bytes\n", sizeof(struct SensorNode));
}

int main() {
    struct SensorNode node1;
    printf("Enter Node ID (e.g. 101): ");
    if (scanf("%d", &node1.nodeID) == 1) {
        printf("Enter Temperature (C): ");
        if (scanf("%f", &node1.temperature) == 1) {
            printf("Enter Humidity (%%): ");
            if (scanf("%f", &node1.humidity) == 1) {
                printf("Enter Relay State (1 for ON, 0 for OFF): ");
                if (scanf("%d", &node1.relayActive) == 1) {
                    displayTelemetry(&node1);
                }
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

### ข้อที่ 1: 1. อธิบายความแตกต่างที่สำคัญของการทำงานและการจองตำแหน่งหน่วยความจำระหว่าง struct และ union (1.5 คะแนน)
- **แนวทางการตอบที่ถูกต้อง:**
  - อธิบายหลักการ ความหมาย หรือกลไกการทำงานตามหัวข้ออย่างถูกต้องตรงประเด็น
  - มีการยกตัวอย่างประกอบ หรือระบุคีย์เวิร์ดสำคัญ เช่น `แชร์, แยก, ขนาด, หน่วยความจำ, ตัวแปรใหญ่สุด`
- **เกณฑ์การให้คะแนน:**
  - อธิบายได้ถูกต้องสมบูรณ์และยกตัวอย่างชัดเจน: **1.5 คะแนน**
  - ตอบถูกแต่ขาดรายละเอียดเชิงลึก: **0.8 - 1.0 คะแนน**
  - ไม่ตรงประเด็นหรือไม่ตอบ: **0.0 คะแนน**

### ข้อที่ 2: 2. ในกรณีลักษณะงานใดที่เราควรเลือกนำ union มาเลือกประยุกต์ใช้งานแทนการใช้ struct ในการประมวลผล? (1.5 คะแนน)
- **แนวทางการตอบที่ถูกต้อง:**
  - วิเคราะห์ข้อดี-ข้อจำกัด สาเหตุ หรือข้อควรระวังในการเขียนโปรแกรมจริง
  - มีคีย์เวิร์ดสำคัญ เช่น `ประหยัด, ram, สลับ, พร้อมกัน, ฝังตัว`
- **เกณฑ์การให้คะแนน:**
  - วิเคราะห์ได้ถูกต้อง ครอบคลุมบริบททางเทคนิค: **1.5 คะแนน**
  - ตอบได้บางส่วน: **0.8 - 1.0 คะแนน**
  - ตอบไม่ตรงประเด็น: **0.0 คะแนน**

---

## 📊 4. สรุปผลและการสะท้อนคิด (Conclusion & Reflection)
- นักศึกษาควรสรุปองค์ความรู้ที่ได้รับจากใบงานนี้ ปัญหาที่พบในการทดลอง (เช่น ข้อผิดพลาดทางไวยากรณ์, ชนิดข้อมูล หรือหน่วยความจำ) และแนวทางแก้ไขเพื่อประยุกต์ใช้งานในระบบสมองกลหรืองานช่างจริง
