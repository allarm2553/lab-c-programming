# คู่มือเฉลยปฏิบัติการ Lab 11: การเชื่อมโยงภาษา C สู่ไมโครคอนโทรลเลอร์ (C to Microcontroller & Embedded Bridge)
## (Lab 11: C to Microcontroller & Embedded Systems Bridge - Laboratory Solution & Grading Key)

โฟลเดอร์นี้รวบรวมไฟล์ซอร์สโค้ดเฉลยภาษา C (`.c`), แนวทางการตอบคำถาม และเกณฑ์การประเมินผลสำหรับ **Lab 11: การเชื่อมโยงภาษา C สู่ไมโครคอนโทรลเลอร์ (C to Microcontroller & Embedded Bridge)** ระดับประกาศนียบัตรวิชาชีพชั้นสูง (ปวส.)

---

## 🎯 วัตถุประสงค์เชิงสมรรถนะของใบงาน
1. เข้าใจความแตกต่างของวงจรชีวิตโปรแกรมระหว่าง main() บนคอมพิวเตอร์ และ setup() / loop() บนไมโครคอนโทรลเลอร์
2. สามารถแปลงคำสั่งรับ-แสดงผลข้อมูลมาตรฐาน (printf/scanf) สู่การสื่อสารแบบอนุกรม (Serial Communication)
3. เข้าใจและประยุกต์ใช้แนวคิด Non-blocking Multi-tasking โดยใช้ฟังก์ชันจับเวลา millis() แทนการหน่วงเวลาด้วย delay()
4. สามารถบูรณาการความรู้ภาษา C เข้ากับการควบคุมขาพอร์ต I/O และเซนเซอร์ในงานไมโครคอนโทรลเลอร์และ IoT

---

## 📁 รายการไฟล์ในโฟลเดอร์ `solution/`

| ชื่อไฟล์ | คำอธิบาย |
| :--- | :--- |
| **`challenge_solution.c`** | ซอร์สโค้ดเฉลยกิจกรรมท้าทายเชิงอุตสาหกรรม/ระบบสมองกล (Lab Challenge) |
| **`example2_solution.c`** | ซอร์สโค้ดเฉลยโปรแกรมตัวอย่างที่ 2 (Fill in the Blanks) |
| **`README.md`** | เอกสารเฉลยละเอียดและเกณฑ์การตรวจให้คะแนน |

---

## 📝 1. เฉลยโปรแกรมตัวอย่างที่ 2 (Fill in the Blanks) - คะแนนเต็ม 2.0 คะแนน

### 1.1 ตัวแปรเวลาปัจจุบันที่อ่านได้
- **คำตอบที่ถูกต้อง:** `currentMillis`
- **คำตอบที่เป็นไปได้:** `currentMillis`, `millis()`

### 1.2 ตัวแปรกำหนดคาบเวลาตรวจสอบ
- **คำตอบที่ถูกต้อง:** `interval`
- **คำตอบที่เป็นไปได้:** `interval`, `500`

### ซอร์สโค้ดตัวอย่างที่ 2 ฉบับสมบูรณ์ (`example2_solution.c`):
```c
#include <stdio.h>
#include <stdbool.h>

int main() {
    unsigned long currentMillis = 1500;
    unsigned long previousMillis = 1000;
    const long interval = 500;
    bool ledState = false;

    if (currentMillis - previousMillis >= interval) {
        previousMillis = currentMillis;
        ledState = !ledState;
        printf("Interval Elapsed! LED Toggled to: %s\n", ledState ? "ON (HIGH)" : "OFF (LOW)");
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
> พัฒนาโปรแกรมจำลองการทำงานของ Smart IoT Controller แบบ Non-blocking Multi-tasking โดยจำลอง 2 งานทำงานร่วมกัน: 1) Task 1 (Sensor Polling): ทุกๆ 500 ms อ่านค่าอุณหภูมิเซนเซอร์และพิมพ์ออกทาง Serial, 2) Task 2 (Heartbeat Beacon): ทุกๆ 100 ms กระพริบไฟ LED แจ้งสถานะระบบ และมี Safety Override หากอุณหภูมิเกิน 40.0 C ให้สั่งเปิดพัดลมทันที


### 2.2 ซอร์สโค้ดเฉลยกิจกรรมท้าทาย (`challenge_solution.c`):
```c
#include <stdio.h>
#include <stdbool.h>

struct SystemState {
    float temperature;
    bool ledBeacon;
    bool coolingFan;
};

void runTaskSensor(unsigned long currentMs, unsigned long *prevMs, struct SystemState *sys) {
    if (currentMs - *prevMs >= 500) {
        *prevMs = currentMs;
        sys->temperature = 41.5f; 
        
        if (sys->temperature > 40.0f) {
            sys->coolingFan = true;
        } else {
            sys->coolingFan = false;
        }
        
        printf("[Task 1 @ %4lums] Sensor Temp: %.1f C -> Fan: %s\n", 
               currentMs, sys->temperature, sys->coolingFan ? "ACTIVATED [ON]" : "STANDBY [OFF]");
    }
}

void runTaskBeacon(unsigned long currentMs, unsigned long *prevMs, struct SystemState *sys) {
    if (currentMs - *prevMs >= 100) {
        *prevMs = currentMs;
        sys->ledBeacon = !sys->ledBeacon;
        printf("[Task 2 @ %4lums] Heartbeat LED: %s\n", 
               currentMs, sys->ledBeacon ? "BLINK (1)" : "DARK  (0)");
    }
}

int main() {
    struct SystemState myNode = {25.0f, false, false};
    unsigned long prevSensorMs = 0;
    unsigned long prevBeaconMs = 0;
    
    printf("=== SMART IOT CONTROLLER NON-BLOCKING SCHEDULER ===\n");
    
    for (unsigned long simTime = 100; simTime <= 1000; simTime += 100) {
        runTaskBeacon(simTime, &prevBeaconMs, &myNode);
        runTaskSensor(simTime, &prevSensorMs, &myNode);
    }
    
    printf("===================================================\n");
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

### ข้อที่ 1: 1. เพราะเหตุใดในระบบสมองกลฝังตัวแบบเรียลไทม์ (Real-Time Embedded Systems / IoT) จึงควรหลีกเลี่ยงการใช้คำสั่ง delay() และหันมาใช้ฟังก์ชัน millis() แทน? (1.5 คะแนน)
- **แนวทางการตอบที่ถูกต้อง:**
  - อธิบายหลักการ ความหมาย หรือกลไกการทำงานตามหัวข้ออย่างถูกต้องตรงประเด็น
  - มีการยกตัวอย่างประกอบ หรือระบุคีย์เวิร์ดสำคัญ เช่น `delay, millis, blocking, ค้าง, เรียลไทม์|multitask|task`
- **เกณฑ์การให้คะแนน:**
  - อธิบายได้ถูกต้องสมบูรณ์และยกตัวอย่างชัดเจน: **1.5 คะแนน**
  - ตอบถูกแต่ขาดรายละเอียดเชิงลึก: **0.8 - 1.0 คะแนน**
  - ไม่ตรงประเด็นหรือไม่ตอบ: **0.0 คะแนน**

### ข้อที่ 2: 2. อธิบายความแตกต่างของฟังก์ชัน setup() และ loop() ในสถาปัตยกรรม Super-loop ของ Arduino/ESP32 เมื่อเทียบกับฟังก์ชัน int main() ของภาษา C มาตรฐาน (1.5 คะแนน)
- **แนวทางการตอบที่ถูกต้อง:**
  - วิเคราะห์ข้อดี-ข้อจำกัด สาเหตุ หรือข้อควรระวังในการเขียนโปรแกรมจริง
  - มีคีย์เวิร์ดสำคัญ เช่น `setup, loop, main, เริ่มต้น, วนซ้ำ|ตลอดเวลา|super-loop`
- **เกณฑ์การให้คะแนน:**
  - วิเคราะห์ได้ถูกต้อง ครอบคลุมบริบททางเทคนิค: **1.5 คะแนน**
  - ตอบได้บางส่วน: **0.8 - 1.0 คะแนน**
  - ตอบไม่ตรงประเด็น: **0.0 คะแนน**

---

## 📊 4. สรุปผลและการสะท้อนคิด (Conclusion & Reflection)
- นักศึกษาควรสรุปองค์ความรู้ที่ได้รับจากใบงานนี้ ปัญหาที่พบในการทดลอง (เช่น ข้อผิดพลาดทางไวยากรณ์, ชนิดข้อมูล หรือหน่วยความจำ) และแนวทางแก้ไขเพื่อประยุกต์ใช้งานในระบบสมองกลหรืองานช่างจริง
