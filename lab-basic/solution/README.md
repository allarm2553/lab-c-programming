# คู่มือเฉลยปฏิบัติการ Lab Basic: Hello World และเครื่องมือพัฒนาภาษา C
## (Lab Basic: Hello World & C Development Tools - Solution Manual)

โฟลเดอร์นี้รวบรวมไฟล์ซอร์สโค้ดเฉลยภาษา C (`.c`) และแนวทางการประเมินผลสำหรับ **Lab Basic**

---

## 🎯 วัตถุประสงค์เชิงสมรรถนะของใบงาน
1. เข้าใจโครงสร้างโปรแกรมภาษา C พื้นฐาน และขั้นตอนการคอมไพล์และรันโปรแกรม
2. สามารถใช้ฟังก์ชัน `printf()` ร่วมกับ Escape Sequences (`\n`, `\t`) ในการจัดรูปแบบการแสดงผลข้อความและตารางได้อย่างถูกต้อง

---

## 📝 1. เฉลยโปรแกรมตัวอย่างที่ 2 (Fill in the Blanks) - คะแนนเต็ม 2.0 คะแนน

- **ช่องที่ 1:** `\n` (ขึ้นบรรทัดใหม่หลังคำว่า C Programming)
- **ช่องที่ 2:** `\n` (ขึ้นบรรทัดใหม่หลังคำว่า Laboratory)
- **ช่องที่ 3:** `\t` (เว้นระยะแท็บระหว่าง Item และ Price)
- **ช่องที่ 4:** `\t` (เว้นระยะแท็บระหว่าง Price และ Quantity)

### ซอร์สโค้ดตัวอย่างที่ 2 (`example2_solution.c`):
```c
#include <stdio.h>

int main() {
    printf("C Programming\n");
    printf("Laboratory\n");
    printf("Item\tPrice\tQuantity\n");
    return 0;
}
```

- **คำสั่งคอมไพล์และรัน:**
  ```bash
  gcc -Wall -Wextra -o example2_solution example2_solution.c
  ./example2_solution
  ```

---


---

## 🎯 2. เฉลยแบบทดสอบความรู้ (Multiple Choice Quiz 4 ตัวเลือก 5 ข้อ) - คะแนนเต็ม 5.0 คะแนน (ข้อละ 1.0 คะแนน)

| ข้อที่ | คำถาม | ตัวเลือกเฉลย | คำตอบที่ถูกต้อง | คำอธิบายเชิงวิชาการ |
| :---: | :--- | :---: | :--- | :--- |
| **1** | โปรแกรมประเภทคอมไพเลอร์ (Compiler) เช่น GCC ในการพัฒนาภาษา C ทำหน้าที่อะไร? | **ข (B)** | **แปลซอร์สโค้ดภาษา C ให้อยู่ในรูปของภาษาเครื่อง (Machine Code) ที่คอมพิวเตอร์ทำงานได้** | Compiler มีหน้าที่แปลง Source Code ภาษา C ให้กลายเป็นภาษาเครื่อง (Machine Code / Executable) |
| **2** | สัญลักษณ์ใดในภาษา C ที่ต้องใช้ปิดท้ายคำสั่งประมวลผล (Statement Terminator) เสมอ? | **ข (B)** | **; (Semicolon)** | เซมิโคลอน (;) คือตัวปิดท้ายคำสั่งประมวลผลในภาษา C หากขาดไปจะเกิดข้อผิดพลาด Syntax Error |
| **3** | ฟังก์ชันมาตรฐานใดในภาษา C ที่ใช้สำหรับแสดงผลข้อความออกทางหน้าจอคอนโซล (Console Output)? | **ค (C)** | **printf()** | printf() มาจาก 'print formatted' อยู่ใน <stdio.h> ใช้แสดงผลข้อความและค่าตัวแปร |
| **4** | รหัสควบคุมการแสดงผล (Escape Sequence) ใดที่ใช้สำหรับสั่งให้ขึ้นบรรทัดใหม่ในฟังก์ชัน printf()? | **ข (B)** | **\n** | \n คือรหัสแทนอักขระขึ้นบรรทัดใหม่ (Newline) ส่วน \t คือการแท็บ (Tab) |
| **5** | ไฟล์ซอร์สโค้ดของภาษา C มาตรฐานจะต้องบันทึกด้วยนามสกุลไฟล์ใด? | **ค (C)** | **.c** | ไฟล์ต้นฉบับภาษา C ใช้นามสกุล .c ส่วน .h คือ Header file และ .exe คือไฟล์ที่คอมไพล์แล้ว |

---

## 🚀 3. เฉลยกิจกรรมท้าทาย (Lab Challenge Solution) - คะแนนเต็ม 4.0 คะแนน

### 2.1 บริบทโจทย์ท้าทาย:
ให้นักศึกษาเขียนโปรแกรมภาษา C แสดงผลข้อมูลป้ายสถานะเครื่องจักรในสายการผลิต (Industrial Machine Status Display) ออกทางหน้าจอ โดยใช้ `\t` จัดคอลัมน์ให้ตรงกัน และใช้ `\n` ขึ้นบรรทัดใหม่

### 2.2 ซอร์สโค้ดเฉลยกิจกรรมท้าทาย (`challenge_solution.c`):
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

### 2.3 ผลการทำงาน (Output):
```text
=== CNC MACHINE MONITORING SYSTEM ===
Parameter	Value		Unit
-------------------------------------
Machine ID:	CNC-01
Line Voltage:	380.5		VAC
Motor Current:	14.8		Amp
Spindle Speed:	2400		RPM
System Status:	RUNNING [NORMAL]
=====================================
```

---

## 💡 4. เฉลยคำถามท้ายการทดลอง (Post-Lab Questions) - คะแนนเต็ม 3.0 คะแนน

### ข้อที่ 1: อธิบายหน้าที่ของ Header File `#include <stdio.h>` และฟังก์ชัน `main()` (1.5 คะแนน)
- **แนวทางคำตอบ:**
  - `#include <stdio.h>` คือ Preprocessor Directive ที่ทำหน้าที่นำเข้า Standard Input/Output Library เพื่อให้โปรแกรมสามารถเรียกใช้งานฟังก์ชันรับ-แสดงผลมาตรฐาน เช่น `printf()` และ `scanf()` ได้
  - `int main()` คือ ฟังก์ชันหลักที่เป็นจุดเริ่มต้นการทำงาน (Entry Point) ของโปรแกรมภาษา C เสมอ

### ข้อที่ 2: ความแตกต่างระหว่าง `\n` และ `\t` ในฟังก์ชัน `printf()` (1.5 คะแนน)
- **แนวทางคำตอบ:**
  - `\n` (Newline): เลื่อนตำแหน่งเคอร์เซอร์ลงไปบรรทัดใหม่
  - `\t` (Horizontal Tab): เลื่อนตำแหน่งเคอร์เซอร์ไปข้างหน้าตามระยะ Tab Stop (โดยทั่วไปคือ 4 หรือ 8 ตัวอักษร) นิยมใช้จัดตารางข้อมูลให้ตรงคอลัมน์
