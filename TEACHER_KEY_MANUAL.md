# คู่มือเฉลยและเกณฑ์การตรวจประเมินคะแนนใบงานปฏิบัติการภาษา C (ระดับ ปวส. อาชีวศึกษา)
## (C Programming Laboratory - Vocational & Industrial Answer Keys & Grading Manual)

เอกสารนี้จัดทำขึ้นสำหรับผู้สอนและผู้ตรวจประเมิน เพื่อใช้เป็นคู่มืออ้างอิงเฉลยคำตอบ (Answer Keys), โค้ดเฉลยกิจกรรมท้าทายเชิงอุตสาหกรรม (Industrial & Embedded Challenge Solutions), คำตอบคำถามท้ายการทดลอง และชุดคีย์เวิร์ด (Keywords) ที่ระบบนำไปใช้ในการประเมินและคิดคะแนนอัตโนมัติ (Auto-grading System)

---

## 📊 โครงสร้างและเกณฑ์การคิดคะแนน (คะแนนเต็ม 10 คะแนนต่อใบงาน)

ทุกใบงานในระบบมีสัดส่วนคะแนนมาตรฐานเท่ากันทั้งหมด ดังนี้:

| ลำดับ | รายการประเมิน | คะแนนเต็ม | วิธีการประเมิน |
| :---: | :--- | :---: | :--- |
| **1** | **เติมคำตอบโปรแกรมตัวอย่างที่ 2 (Fill-in-the-Blanks)** | **2.0** | ตรวจสอบคำตอบตรงช่อง (Exact Match / Multi-pattern) |
| **2** | **ผลการทำกิจกรรมท้าทาย (Challenge Problem)** | **4.0** | ตรวจสอบคำสั่ง/ฟังก์ชัน/ไวยากรณ์ (`codeKeywords`) หรือตรวจกล่องข้อความ 5 ช่อง (`challengeBlanks`) |
| **3** | **คำถามท้ายการทดลอง ข้อที่ 1** | **1.5** | ตรวจสอบแนวคิดสำคัญและคำสำคัญทางเทคนิค (`q1Keywords`) |
| **4** | **คำถามท้ายการทดลอง ข้อที่ 2** | **1.5** | ตรวจสอบแนวคิดสำคัญและคำสำคัญทางเทคนิค (`q2Keywords`) |
| **5** | **การแนบไฟล์หลักฐาน (Attachments)** | **1.0** | แนบภาพบันทึกหน้าจอผลการรัน (0.5 คะแนน) + แนบไฟล์ซอร์สโค้ด `.c` (0.5 คะแนน) |
| **รวม** | **คะแนนรวมสุทธิต่อ 1 ใบงาน** | **10.0** | บันทึกลง Google Sheets และส่งผลลัพธ์แก่นักศึกษา |

---

## 🛡️ ระบบความปลอดภัยและตรวจจับการทุจริต (Anti-Cheat Protection)
- **ห้ามคัดลอกและวางข้อความ (Block Copy-Paste & Drop):** กล่องข้อความในส่วนคำถามท้ายการทดลองและสรุปผลการทดลองจะไม่อนุญาตให้กด `Ctrl+V`, `Cmd+V`, `Shift+Insert` หรือลากวาง เพื่อให้นักศึกษาต้องพิมพ์อธิบายด้วยความเข้าใจของตนเอง
- **Input Anomaly Detection:** มีระบบตรวจจับความผิดปกติหากมีการ Paste ผ่านเครื่องมือภายนอกหรือ Script อัตโนมัติ (ข้อยกเว้น: การใช้ Undo `Ctrl+Z`)
- **การส่งงานได้เพียงครั้งเดียว (One-Time Submission):** เมื่อนักศึกษากดยืนยันส่งงาน ระบบจะล็อกหน้าเว็บเป็นโหมดดูอย่างเดียว (View-Only) และบันทึกประวัติการส่งลงใน Google Sheet
- **การปลดล็อกส่งใหม่ (Resubmission Unlock):** อาจารย์สามารถเปิดสิทธิ์ให้นักศึกษาส่งใหม่ได้ง่ายๆ เพียงลบแถวเดิมใน Google Sheet (ดูคู่มือฉบับเต็มที่ [`TEACHER_ADMIN_MANUAL.md`](file:///Users/allarmmac/myjob_folder/MyLaB/Cprogramming/TEACHER_ADMIN_MANUAL.md))

---

# 📚 รายละเอียดเฉลยและเกณฑ์ตรวจรายใบงาน (ทั้ง 13 บทปฏิบัติการ)

---

### 1. Lab Basic: การติดตั้งเครื่องมือและการเขียนโปรแกรมภาษา C แรก
* **โฟลเดอร์ปฏิบัติการ:** `lab-basic/`
* **หัวข้อการเรียนรู้:** โครงสร้างโปรแกรมพื้นฐาน, ฟังก์ชัน `printf()` และ Escape Sequences (`\n`, `\t`)
* **เฉลยเติมคำสั่งตัวอย่างที่ 2 (2.0 คะแนน):**
  * ช่องที่ 1: `\n` | ช่องที่ 2: `\n` | ช่องที่ 3: `\t` | ช่องที่ 4: `\t`
* **กิจกรรมท้าทาย (4.0 คะแนน):** โปรแกรมแสดงป้ายสถานะเครื่องจักรในสายการผลิต (Industrial Machine Status Display)
  * **คีย์เวิร์ดตรวจโค้ด (`codeKeywords`):** `printf`, `\n`, `\t`, `Machine|CNC|Voltage|Current|RPM|Status`
  * **โค้ดเฉลย (`challenge_solution.c`):**
```c
#include <stdio.h>

int main() {
    printf("=== CNC MACHINE MONITORING SYSTEM ===\n");
    printf("Parameter\tValue\t\tUnit\n");
    printf("-------------------------------------\n");
    printf("Machine ID:\tCNC-01\n");
    printf("Line Voltage:\t380.5\t\tVAC\n");
    printf("Motor Current:\t14.8\t\tAmp\n");
    printf("Spindle Speed:\t2400\t\tRPM\n");
    printf("System Status:\tRUNNING [NORMAL]\n");
    printf("=====================================\n");
    return 0;
}
```

---

### 2. Lab Structure: โครงสร้างโปรแกรมภาษา C และกระบวนการคอมไพล์
* **โฟลเดอร์ปฏิบัติการ:** `lab-structure/`
* **หัวข้อการเรียนรู้:** Preprocessor Directives, ฟังก์ชันหลัก `main()`, Comment, และ Compile Lifecycle
* **เฉลยเติมคำสั่งตัวอย่างที่ 2 (2.0 คะแนน):**
  * ช่องที่ 1: `#include <stdio.h>` | ช่องที่ 2: `int main()` | ช่องที่ 3: `;` | ช่องที่ 4: `return 0;`
* **กิจกรรมท้าทาย (4.0 คะแนน):** โครงสร้างโปรแกรมควบคุมสัญญาณไฟกระพริบเตือนภัยโรงงาน (Alarm Beacon System)
  * **คีย์เวิร์ดตรวจโค้ด (`codeKeywords`):** `#include`, `#define`, `main`, `return`

---

### 3. Lab 1: ชนิดข้อมูล ตัวแปร และฟังก์ชันรับ-แสดงผลข้อมูลพื้นฐาน
* **โฟลเดอร์ปฏิบัติการ:** `lab1/`
* **หัวข้อการเรียนรู้:** `int`, `float`, `double`, `char`, `printf()`, `scanf()`, และ Format Specifiers
* **เฉลยเติมคำสั่งตัวอย่างที่ 2 (2.0 คะแนน):**
  * ช่องที่ 1: `%d` | ช่องที่ 2: `%f`
* **กิจกรรมท้าทาย (4.0 คะแนน):** การแปลงสัญญาณ Analog ADC (0-1023) เป็นระดับแรงดันไฟฟ้า (0.0-5.0V) และคำนวณกำลังไฟฟ้า $P=VI$
  * **คีย์เวิร์ดตรวจโค้ด (`codeKeywords`):** `scanf`, `printf`, `float|double`, `\*`, `%f|%lf`, `&`
  * **โค้ดเฉลย (`challenge_solution.c`):**
```c
#include <stdio.h>

int main() {
    int adcValue;
    float current, voltage, power;
    
    printf("Enter 10-bit ADC Raw Value (0-1023): ");
    if (scanf("%d", &adcValue) == 1) {
        printf("Enter Circuit Current (Amp): ");
        if (scanf("%f", &current) == 1) {
            voltage = (adcValue / 1023.0f) * 5.0f;
            power = voltage * current;
            
            printf("\n--- Electrical Measurement Results ---\n");
            printf("ADC Raw Value: %d\n", adcValue);
            printf("Measured Voltage: %.2f V\n", voltage);
            printf("Circuit Current:  %.2f A\n", current);
            printf("Calculated Power: %.2f W\n", power);
        }
    }
    return 0;
}
```

---

### 4. Lab 2: ตัวดำเนินการและการประเมินนิพจน์ (Operators & Bitwise)
* **โฟลเดอร์ปฏิบัติการ:** `lab2/`
* **หัวข้อการเรียนรู้:** Arithmetic, Relational, Logical, และ Bitwise Operators (`&`, `|`, `^`, `~`, `<<`, `>>`)
* **เฉลยเติมคำสั่งตัวอย่างที่ 2 (2.0 คะแนน):**
  * ช่องที่ 1: `&` | ช่องที่ 2: `|`
* **กิจกรรมท้าทาย (4.0 คะแนน):** การควบคุมและอ่านค่ารีจิสเตอร์พอร์ต I/O 8 บิต (PORTB Bit Manipulation)
  * **คีย์เวิร์ดตรวจโค้ด (`codeKeywords`):** `&`, `\|`, `\^`, `<<|>>`, `scanf`, `printf`
  * **โค้ดเฉลย (`challenge_solution.c`):**
```c
#include <stdio.h>

int main() {
    unsigned char portb;
    printf("Enter initial PORTB state (0-255): ");
    if (scanf("%hhu", &portb) == 1) {
        portb = portb | (1 << 3);     // Set Bit 3 (Relay ON)
        portb = portb & ~(1 << 5);    // Clear Bit 5 (Valve OFF)
        portb = portb ^ (1 << 7);     // Toggle Bit 7 (LED Toggle)
        
        printf("\n--- Updated PORTB Register Output ---\n");
        printf("PORTB Decimal: %d\n", portb);
        printf("PORTB Hex:     0x%02X\n", portb);
        printf("Bit 3 (Relay): %s\n", (portb & (1 << 3)) ? "ON" : "OFF");
        printf("Bit 5 (Valve): %s\n", (portb & (1 << 5)) ? "ON" : "OFF");
        printf("Bit 7 (LED):   %s\n", (portb & (1 << 7)) ? "ON" : "OFF");
    }
    return 0;
}
```

---

### 5. Lab 3: โครงสร้างควบคุมแบบมีเงื่อนไข (Control Flow: if-else & switch)
* **โฟลเดอร์ปฏิบัติการ:** `lab3/`
* **หัวข้อการเรียนรู้:** `if-else`, `if-else if-else`, และ `switch-case`
* **เฉลยเติมคำสั่งตัวอย่างที่ 2 (2.0 คะแนน):**
  * ช่องที่ 1: `switch` | ช่องที่ 2: `case` | ช่องที่ 3: `break;`
* **กิจกรรมท้าทาย (4.0 คะแนน):** ระบบตรวจวัดระดับน้ำในถังพักอุตสาหกรรม และควบคุมปั๊มน้ำ (Tank Water Level Controller)
  * **คีย์เวิร์ดตรวจโค้ด (`codeKeywords`):** `if`, `else`, `switch`, `case`, `break`, `scanf`, `printf`
  * **โค้ดเฉลย (`challenge_solution.c`):**
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

---

### 6. Lab 4: โครงสร้างการทำงานแบบวนรอบ (Loops & Iterations)
* **โฟลเดอร์ปฏิบัติการ:** `lab4/`
* **หัวข้อการเรียนรู้:** `for`, `while`, `do-while`, Nested Loops, `break`, `continue`
* **เฉลยเติมคำสั่งตัวอย่างที่ 2 (2.0 คะแนน):**
  * ช่องที่ 1: `while` | ช่องที่ 2: `count++`
* **กิจกรรมท้าทาย (4.0 คะแนน):** โปรแกรมจำลองการสร้างสัญญาณ PWM ควบคุมมอเตอร์ (Motor PWM Simulation)
  * **คีย์เวิร์ดตรวจโค้ด (`codeKeywords`):** `for|while`, `scanf`, `printf`, `%|PWM|duty|voltage`, `\n`
  * **โค้ดเฉลย (`challenge_solution.c`):**
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

---

### 7. Lab 5: ฟังก์ชันและการขอบเขตตัวแปร (Functions & Scope)
* **โฟลเดอร์ปฏิบัติการ:** `lab5/`
* **หัวข้อการเรียนรู้:** User-defined Functions, Call-by-Value, Call-by-Reference, Scope
* **เฉลยเติมคำสั่งตัวอย่างที่ 2 (2.0 คะแนน):**
  * ช่องที่ 1: `return a + b;` | ช่องที่ 2: `add(x, y)`
* **กิจกรรมท้าทาย (4.0 คะแนน):** ฟังก์ชันสอบเทียบเซนเซอร์วัดอุณหภูมิ (Sensor Calibration & Scaling)
  * **คีย์เวิร์ดตรวจโค้ด (`codeKeywords`):** `float|void|double`, `return`, `scanf`, `printf`, `&|\*`
  * **โค้ดเฉลย (`challenge_solution.c`):**
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

---

### 8. Lab 6: อาร์เรย์และสตริง (Arrays & Strings)
* **โฟลเดอร์ปฏิบัติการ:** `lab6/`
* **หัวข้อการเรียนรู้:** 1D/2D Arrays, String Representation, Null Terminator `\0`
* **เฉลยเติมคำสั่งตัวอย่างที่ 2 (2.0 คะแนน):**
  * ช่องที่ 1: `int numbers[5]` | ช่องที่ 2: `numbers[i]`
* **กิจกรรมท้าทาย (4.0 คะแนน):** อาร์เรย์เก็บบันทึกประวัติกระแสไฟฟ้า และตรวจจับกระแสเกิน (Peak Overload Detection)
  * **คีย์เวิร์ดตรวจโค้ด (`codeKeywords`):** `\[\]`, `for|while`, `scanf`, `printf`, `float|int`
  * **โค้ดเฉลย (`challenge_solution.c`):**
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

---

### 9. Lab 7: ตัวชี้และการจัดการหน่วยความจำ (Pointers & Dynamic Memory)
* **โฟลเดอร์ปฏิบัติการ:** `lab7/`
* **หัวข้อการเรียนรู้:** Pointer Declaration, Address-of `&`, Dereference `*`, `malloc()`, `free()`
* **เฉลยเติมคำสั่งตัวอย่างที่ 2 (2.0 คะแนน):**
  * ช่องที่ 1: `&num` | ช่องที่ 2: `*ptr`
* **กิจกรรมท้าทาย (4.0 คะแนน):** การจัดสรรหน่วยความจำพลวัต (Dynamic Sensor Buffer) และการอ่านค่าผ่าน Pointer
  * **คีย์เวิร์ดตรวจโค้ด (`codeKeywords`):** `\*`, `&`, `malloc`, `free`, `scanf|printf`
  * **โค้ดเฉลย (`challenge_solution.c`):**
```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    int n;
    printf("Enter number of sensor samples to record (N): ");
    if (scanf("%d", &n) == 1 && n > 0) {
        float *buffer = (float *)malloc(n * sizeof(float));
        if (buffer == NULL) {
            printf("Memory allocation failed!\n");
            return 1;
        }
        
        printf("Enter %d sensor readings:\n", n);
        float sum = 0.0f;
        for (int i = 0; i < n; i++) {
            printf("Reading #%d: ", i + 1);
            if (scanf("%f", buffer + i) == 1) {
                sum += *(buffer + i);
            }
        }
        
        printf("\n--- Dynamic Buffer Processing ---\n");
        printf("Allocated Memory: %zu Bytes\n", n * sizeof(float));
        printf("Processed Average: %.2f\n", sum / n);
        
        free(buffer);
        buffer = NULL;
        printf("Memory successfully released (Heap freed).\n");
    }
    return 0;
}
```

---

### 10. Lab 8: โครงสร้างข้อมูลและยูเนียน (Structures & Unions)
* **โฟลเดอร์ปฏิบัติการ:** `lab8/`
* **หัวข้อการเรียนรู้:** `struct`, `union`, Member Access (`.`, `->`), Memory Layout
* **เฉลยเติมคำสั่งตัวอย่างที่ 2 (2.0 คะแนน):**
  * ช่องที่ 1: `struct Point` | ช่องที่ 2: `p1.x`
* **กิจกรรมท้าทาย (4.0 คะแนน):** โครงสร้างข้อมูลโหนดตรวจวัด IoT (struct SensorNode Telemetry Record)
  * **คีย์เวิร์ดตรวจโค้ด (`codeKeywords`):** `struct`, `\.|\->`, `scanf`, `printf`, `float|int`
  * **โค้ดเฉลย (`challenge_solution.c`):**
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

---

### 11. Lab 9: การจัดการไฟล์ (File I/O)
* **โฟลเดอร์ปฏิบัติการ:** `lab9/`
* **หัวข้อการเรียนรู้:** `fopen()`, `fclose()`, `fprintf()`, `fscanf()`, `FILE*`
* **เฉลยเติมคำสั่งตัวอย่างที่ 2 (2.0 คะแนน):**
  * ช่องที่ 1: `fopen("test.txt", "w")` | ช่องที่ 2: `fclose(fp)`
* **กิจกรรมท้าทาย (4.0 คะแนน):** ระบบบันทึกข้อมูลประวัติเครื่องจักรลงไฟล์ CSV (Industrial Data Logger to `datalog.csv`)
  * **คีย์เวิร์ดตรวจโค้ด (`codeKeywords`):** `fopen`, `fclose`, `fprintf|fputs|fwrite`, `FILE`, `\.csv`
  * **โค้ดเฉลย (`challenge_solution.c`):**
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

---

### 12. Lab 10: การจัดการสตริงขั้นสูง (String Manipulation Library)
* **โฟลเดอร์ปฏิบัติการ:** `lab10/`
* **หัวข้อการเรียนรู้:** `<string.h>` Library (`strcpy`, `strncpy`, `strlen`, `strcmp`, `strcat`, `strstr`), Safe Input (`fgets`)
* **เฉลยเติมคำสั่งตัวอย่างที่ 2 (2.0 คะแนน):**
  * ช่องที่ 1: `strcpy(dest, src)` | ช่องที่ 2: `strlen(dest)`
* **กิจกรรมท้าทาย (4.0 คะแนน):** การแยกวิเคราะห์รหัสคำสั่งควบคุมอุปกรณ์ IoT ผ่าน Serial Interface (AT / Serial Command Parser)
  * **คีย์เวิร์ดตรวจโค้ด (`codeKeywords`):** `string\.h`, `fgets`, `strlen`, `strstr|strcmp|strncpy`, `printf`
  * **โค้ดเฉลย (`challenge_solution.c`):**
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

---

### 13. Lab Flowchart: การออกแบบผังงานและการไล่รหัสตรรกะโปรแกรม
* **โฟลเดอร์ปฏิบัติการ:** `lab-flowchart/`
* **หัวข้อการเรียนรู้:** ANSI/ISO Flowchart Standards, Trace Table / Dry Run, Debugging, Flowchart to C Code Bridge
* **สัดส่วนคะแนน 5 ตอน (10.0 คะแนนเต็ม):**
  * ตอนที่ 1: มาตรฐานและกฎของผังงาน (1.5 คะแนน)
  * ตอนที่ 2: การแกะรอยตรรกะ Loop ด้วย Trace Table (2.5 คะแนน)
  * ตอนที่ 3: Flowchart Debugging & Bug Hunting (2.0 คะแนน)
  * ตอนที่ 4: กิจกรรมท้าทาย (Auto Fan Temperature Controller) (3.0 คะแนน)
  * ตอนที่ 5: สรุปผลและการสะท้อนคิด (1.0 คะแนน)
* **โค้ดเฉลยตอนที่ 4 (`challenge_solution.c`):**
```c
#include <stdio.h>

int main() {
    float temp;
    printf("Enter Machine Temperature (C): ");
    if (scanf("%f", &temp) == 1) {
        printf("\n--- Auto Fan Controller Status ---\n");
        printf("Temperature: %.2f C\n", temp);
        if (temp >= 35.0f) {
            printf("Fan Status: HIGH SPEED [MAX COOLING]\n");
        } else if (temp >= 28.0f) {
            printf("Fan Status: MEDIUM SPEED [NORMAL COOLING]\n");
        } else {
            printf("Fan Status: OFF [STANDBY MODE]\n");
        }
    }
    return 0;
}
```
