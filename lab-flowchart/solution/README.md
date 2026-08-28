# คู่มือเฉลยปฏิบัติการ Lab Flowchart: การออกแบบผังงานและการไล่รหัสตรรกะโปรแกรม
## (Lab Flowchart: ANSI/ISO Flowchart Design, Trace Table & Debugging - Solution Manual)

โฟลเดอร์นี้รวบรวมเฉลยแบบฝึกหัดทั้ง 5 ตอนสำหรับ **Lab Flowchart**

---

## 📋 1. เฉลยตอนที่ 1: มาตรฐานสัญลักษณ์ผังงานและกฎการเชื่อมต่อ (1.5 คะแนน)

1. **สัญลักษณ์ Terminator (วงรี/ขอบมน):** จุดเริ่มต้น (Start) หรือ จุดสิ้นสุด (End/Stop) ของกระบวนการ
2. **สัญลักษณ์ Process (สี่เหลี่ยมผืนผ้า):** การประมวลผล, การคำนวณสูตรทางคณิตศาสตร์, หรือการกำหนดค่าตัวแปร
3. **สัญลักษณ์ Input/Output (สี่เหลี่ยมด้านขนาน):** การรับค่า (Input) หรือแสดงผลข้อมูล (Output) โดยไม่ระบุชนิดอุปกรณ์
4. **สัญลักษณ์ Decision (สี่เหลี่ยมข้าวหลามตัด):** การตัดสินใจ/เปรียบเทียบเงื่อนไข (มีเส้นทางออกจากเงื่อนไขอย่างน้อย 2 ทาง: True/Yes, False/No)
5. **สัญลักษณ์ Connector (วงกลมเล็ก):** จุดเชื่อมต่อเส้นทางการไหลภายในหน้าเดียวกัน

---

## 🔍 2. เฉลยตอนที่ 2: การแกะรอยตรรกะ Loop ด้วย Trace Table (2.5 คะแนน)

จากโจทย์โปรแกรมคำนวณผลรวม `sum` ของเลขคู่จาก 2 ถึง 6:
```c
int sum = 0;
for (int i = 2; i <= 6; i += 2) {
    sum += i;
}
```

| รอบการทำงาน (Iteration) | ค่าตัวแปร `i` | เงื่อนไข (`i <= 6`) | ค่าตัวแปร `sum` หลังบวก (`sum += i`) | ค่า `i` หลังเพิ่มค่า (`i += 2`) |
| :---: | :---: | :---: | :---: | :---: |
| **รอบเริ่มต้น (Init)** | 2 | - | 0 | - |
| **รอบที่ 1** | 2 | จริง (True) | 0 + 2 = **2** | 2 + 2 = **4** |
| **รอบที่ 2** | 4 | จริง (True) | 2 + 4 = **6** | 4 + 2 = **6** |
| **รอบที่ 3** | 6 | จริง (True) | 6 + 6 = **12** | 6 + 2 = **8** |
| **รอบตรวจสอบจบ** | 8 | เท็จ (False) | จบลูป (ค่าสุดท้าย = **12**) | - |

- **ผลลัพธ์สุดท้าย:** `sum = 12`

---

## 🐞 3. เฉลยตอนที่ 3: Flowchart Debugging & Bug Hunting (2.0 คะแนน)

- **จุดผิดพลาดที่พบ (Bug):**
  1. ลืมกำหนดค่าเริ่มต้นให้กับตัวแปรนับ (`count = 0`) หรือตัวสะสมค่า (`total = 0`)
  2. การลืมใส่สเต็ปเพิ่มค่า (`count = count + 1`) ก่อนวนลูปกลับ ทำให้เกิด **Infinite Loop** (ลูปไม่รู้จบ)
  3. สัญลักษณ์ Decision สลับทิศทางเส้นทาง True และ False

---

## 🚀 4. เฉลยตอนที่ 4: กิจกรรมท้าทาย (Auto Fan Temperature Controller) (3.0 คะแนน)

### 4.1 การวิเคราะห์ IPO Model:
- **Input (ข้อมูลเข้า):** `temp` (อุณหภูมิเครื่องจักร ทศนิยมองศาเซลเซียส)
- **Process (การประมวลผล):**
  - ถ้า `temp >= 35.0` -> `fanSpeed = "HIGH"`
  - ถ้า `temp >= 28.0` -> `fanSpeed = "MEDIUM"`
  - มิฉะนั้น (`temp < 28.0`) -> `fanSpeed = "OFF"`
- **Output (ข้อมูลออก):** `fanSpeed` (ระดับความเร็วพัดลมและสถานะแจ้งเตือน)

### 4.2 ซอร์สโค้ดเฉลยภาษา C (`challenge_solution.c`):
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

- **คำสั่งคอมไพล์และทดสอบรัน:**
  ```bash
  gcc -Wall -Wextra -o challenge_solution challenge_solution.c
  ./challenge_solution
  ```
