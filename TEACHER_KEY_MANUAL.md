# คู่มือเฉลยและเกณฑ์การตรวจประเมินคะแนนใบงานปฏิบัติการภาษา C
## (C Programming Laboratory - Teacher's Answer Keys & Grading Manual)

เอกสารนี้จัดทำขึ้นสำหรับผู้สอนและผู้ตรวจประเมิน เพื่อใช้เป็นคู่มืออ้างอิงเฉลยคำตอบ (Answer Keys), โค้ดเฉลยกิจกรรมท้าทาย (Challenge Solutions), คำตอบคำถามท้ายการทดลอง และชุดคีย์เวิร์ด (Keywords) ที่ระบบนำไปใช้ในการประเมินและคิดคะแนนอัตโนมัติ (Auto-grading System)

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
| **รวม** | **คะแนนรวมสุทธิต่อ 1 ใบงาน** | **10.0** | บันทึกลง Google Sheets และส่งอีเมลแจ้งผลลัพธ์แก่นักศึกษา |

---

## 🛡️ ระบบความปลอดภัยและตรวจจับการทุจริต (Anti-Cheat Protection)
- **ห้ามคัดลอกและวางข้อความ (Block Copy-Paste & Drop):** กล่องข้อความในส่วนคำถามท้ายการทดลองและสรุปผลการทดลองจะไม่อนุญาตให้กด `Ctrl+V`, `Cmd+V`, `Shift+Insert` หรือลากวาง เพื่อให้นักศึกษาต้องพิมพ์อธิบายด้วยความเข้าใจของตนเอง
- **Input Anomaly Detection:** มีระบบตรวจจับความผิดปกติหากมีการ Paste ผ่านเครื่องมือภายนอกหรือ Script อัตโนมัติ (ข้อยกเว้น: การใช้ Undo `Ctrl+Z`)

---

# 📚 รายละเอียดเฉลยและเกณฑ์ตรวจรายใบงาน

---

### 1. Lab Basic: การติดตั้งเครื่องมือและการเขียนโปรแกรมภาษา C แรก
* **โฟลเดอร์ปฏิบัติการ:** `lab-basic/`
* **หัวข้อการเรียนรู้:** การติดตั้ง GCC/VS Code, โครงสร้างโปรแกรมพื้นฐาน, ฟังก์ชัน `printf()` และ Escape Sequences (`\n`, `\t`)

#### 1.1 เฉลยเติมคำสั่งตัวอย่างที่ 2 (Blanks - 2.0 คะแนน)
* ช่องที่ 1: `\n` (ขึ้นบรรทัดใหม่)
* ช่องที่ 2: `\n` (ขึ้นบรรทัดใหม่)
* ช่องที่ 3: `\t` (เว้นวรรคแท็บ)
* ช่องที่ 4: `\t` (เว้นวรรคแท็บ)

#### 1.2 กิจกรรมท้าทาย (Challenge - 4.0 คะแนน)
* **โจทย์:** เขียนโปรแกรมแสดงข้อมูลประวัติตัวเองและตารางเรียน โดยจัดระยะห่างคอลัมน์ด้วย `\t` และขึ้นบรรทัดใหม่ด้วย `\n`
* **คีย์เวิร์ดตรวจโค้ด (`codeKeywords`):** `printf`, `\n`, `\t`
* **โค้ดเฉลย (`challenge_solution.c`):**
```c
#include <stdio.h>

int main() {
    printf("Name: Somchai Deejai\n");
    printf("Student ID: 65010999\n");
    printf("Department: Electronic Technology\n");
    printf("Subject:\tComputer Programming\n");
    printf("Time:\t\t09:00 - 12:00\n");
    return 0;
}
```

#### 1.3 คำถามท้ายการทดลอง (ข้อละ 1.5 คะแนน)
* **ข้อที่ 1:** คอมไพเลอร์ (Compiler) เช่น GCC มีหน้าที่อะไรในการพัฒนาโปรแกรมภาษา C?
  * **แนวคำตอบ:** ทำหน้าที่แปลซอร์สโค้ดภาษา C ที่มนุษย์เขียนขึ้น ให้กลายเป็นภาษาเครื่อง (Machine Code) หรือไฟล์ไบนารีที่คอมพิวเตอร์สามารถประมวลผลได้โดยตรง
  * **`q1Keywords`:** `แปล`, `คอมไพล์`, `ภาษาเครื่อง`, `compiler`, `แปลภาษา`
* **ข้อที่ 2:** ฟังก์ชัน `main()` มีความสำคัญอย่างไรในโปรแกรมภาษา C?
  * **แนวคำตอบ:** เป็นฟังก์ชันหลักและเป็นจุดเริ่มต้นการทำงาน (Entry Point) ของโปรแกรม คอมไพเลอร์จะเริ่มต้นประมวลผลคำสั่งแรกจากฟังก์ชัน `main()` เสมอ
  * **`q2Keywords`:** `เริ่มต้น`, `หลัก`, `main`, `จุดแรก`, `จุดเริ่มต้น`

---

### 2. Lab Structure: โครงสร้างและการทำงานของโปรแกรมภาษา C
* **โฟลเดอร์ปฏิบัติการ:** `lab-structure/`
* **หัวข้อการเรียนรู้:** Preprocessor Directives, Function Prototypes, Main Function, Statements, Comments และกระบวนการ Compilation & Linking

#### 2.1 เฉลยเติมคำสั่งตัวอย่างที่ 2 (Blanks - 2.0 คะแนน)
* ช่องที่ 1: `#include <stdio.h>`
* ช่องที่ 2: `int main()`
* ช่องที่ 3: `;`
* ช่องที่ 4: `return 0;`

#### 2.2 กิจกรรมท้าทาย (Challenge Blanks - 4.0 คะแนน)
* **โจทย์:** เติมคำสั่งโครงสร้างโปรแกรมภาษา C ให้สมบูรณ์ในกล่องข้อความ (5 ช่อง)
* **เฉลยทั้ง 5 ช่อง:**
  * ช่องที่ 1 (`ch_blank1`): `#include <stdio.h>` *(Preprocessor Directive)*
  * ช่องที่ 2 (`ch_blank2`): `void showInfo()` *(Function Prototype)*
  * ช่องที่ 3 (`ch_blank3`): `int main()` *(Main Function)*
  * ช่องที่ 4 (`ch_blank4`): `printf` *(Output Statement)*
  * ช่องที่ 5 (`ch_blank5`): `return 0;` *(Return Statement)*
* **โค้ดเฉลยสมบูรณ์ (`challenge_solution.c`):**
```c
#include <stdio.h>

void showInfo();

int main() {
    showInfo();
    printf("C Program Structure Validated Successfully!\n");
    return 0;
}

void showInfo() {
    printf("=======================================\n");
    printf("  C Programming: Structure Challenge   \n");
    printf("=======================================\n");
}
```

#### 2.3 คำถามท้ายการทดลอง (ข้อละ 1.5 คะแนน)
* **ข้อที่ 1:** หน้าที่ของ Preprocessor Directives (เช่น `#include <stdio.h>`) คืออะไร และหากลืมจะเกิดผลอย่างไร?
  * **แนวคำตอบ:** ทำหน้าที่นำเข้าไฟล์ส่วนหัวของไลบรารีก่อนเริ่มการแปลภาษา หากลืมคอมไพเลอร์จะไม่รู้จักฟังก์ชันมาตรฐาน เช่น `printf()` และจะแจ้งข้อผิดพลาด Error/Warning
  * **`q1Keywords`:** `preprocessor`, `include`, `ห้องสมุด`, `ฟังก์ชันสำเร็จรูป`, `error`, `warning`
* **ข้อที่ 2:** อธิบายขั้นตอนที่คอมไพเลอร์แปลโค้ดภาษา C ตั้งแต่ `.c` ไปจนถึง `.exe` สังเขป
  * **แนวคำตอบ:** ผ่าน 4 ขั้นตอน: 1) Preprocessing (จัดการ header) -> 2) Compiling (แปลงเป็น Assembly) -> 3) Assembling (แปลงเป็น Object File `.o`/`.obj`) -> 4) Linking (เชื่อมต่อไลบรารีสร้าง Executable `.exe`)
  * **`q2Keywords`:** `compiling`, `linking`, `assembly`, `object`, `exe`

---

### 3. Lab 1: ตัวแปร ชนิดข้อมูล และการรับส่งข้อมูลพื้นฐาน
* **โฟลเดอร์ปฏิบัติการ:** `lab1/`
* **หัวข้อการเรียนรู้:** Data Types (`int`, `float`, `double`, `char`), Memory Allocation, `scanf()`, `printf()` และ Format Specifiers

#### 3.1 เฉลยเติมคำสั่งตัวอย่างที่ 2 (Blanks - 2.0 คะแนน)
* ช่องที่ 1: `&num` (อ้างอิงตำแหน่งหน่วยความจำ)
* ช่องที่ 2: `%f` (Format specifier ของ float)

#### 3.2 กิจกรรมท้าทาย (Challenge - 4.0 คะแนน)
* **โจทย์:** รับค่ารัศมีวงกลม (ทศนิยม) จากนั้นคำนวณและแสดงพื้นที่วงกลม (Area) และเส้นรอบวง (Circumference) ทศนิยม 2 ตำแหน่ง
* **คีย์เวิร์ดตรวจโค้ด (`codeKeywords`):** `scanf`, `printf`, `float|double`, `*`, `%f|%lf`, `&`
* **โค้ดเฉลย (`challenge_solution.c`):**
```c
#include <stdio.h>
#define PI 3.14159265

int main() {
    float radius, area, circumference;
    
    printf("Enter radius: ");
    if (scanf("%f", &radius) == 1) {
        area = PI * radius * radius;
        circumference = 2 * PI * radius;
        
        printf("Radius = %.2f\n", radius);
        printf("Area = %.2f\n", area);
        printf("Circumference = %.2f\n", circumference);
    }
    return 0;
}
```

#### 3.3 คำถามท้ายการทดลอง (ข้อละ 1.5 คะแนน)
* **ข้อที่ 1:** อธิบายความแตกต่างระหว่างชนิดข้อมูล `int`, `float` และ `double` ในการจองหน่วยความจำ
  * **แนวคำตอบ:** `int` จอง 4 ไบต์สำหรับจำนวนเต็ม, `float` จอง 4 ไบต์สำหรับทศนิยมละเอียดเดี่ยว (6-7 ตำแหน่ง), `double` จอง 8 ไบต์สำหรับทศนิยมละเอียดสองเท่า (15 ตำแหน่ง)
  * **`q1Keywords`:** `int`, `float`, `double`, `ไบต์`, `หน่วยความจำ`
* **ข้อที่ 2:** เพราะเหตุใดการรับค่าทศนิยมด้วย `scanf()` จึงต้องส่งที่อยู่ด้วยเครื่องหมาย `&`?
  * **แนวคำตอบ:** เพราะ `scanf()` ต้องการตำแหน่งที่อยู่หน่วยความจำ (Memory Address) ของตัวแปรเพื่อนำค่าที่รับเข้ามาไปบันทึกตรงลงในพื้นที่ของตัวแปรนั้น
  * **`q2Keywords`:** `scanf`, `printf`, `&`, `address`, `specifier`

---

### 4. Lab 2: ตัวดำเนินการและการประเมินนิพจน์
* **โฟลเดอร์ปฏิบัติการ:** `lab2/`
* **หัวข้อการเรียนรู้:** Arithmetic, Relational, Logical, Bitwise Operators (`&`, `|`, `^`, `<<`), Operator Precedence และ Type Casting

#### 4.1 เฉลยเติมคำสั่งตัวอย่างที่ 2 (Blanks - 2.0 คะแนน)
* ช่องที่ 1: `&` (Bitwise AND)
* ช่องที่ 2: `|` (Bitwise OR)

#### 4.2 กิจกรรมท้าทาย (Challenge - 4.0 คะแนน)
* **โจทย์:** รับตัวเลขจำนวนเต็ม 2 ตัว จากนั้นหาและแสดงผลลัพธ์ของ `AND (&)`, `OR (|)`, `XOR (^)`, และ `Left Shift (<< 2)`
* **คีย์เวิร์ดตรวจโค้ด (`codeKeywords`):** `&`, `|`, `^`, `<<`, `scanf`, `printf`
* **โค้ดเฉลย (`challenge_solution.c`):**
```c
#include <stdio.h>

int main() {
    int a, b;
    printf("Enter two integers: ");
    if (scanf("%d %d", &a, &b) == 2) {
        printf("a & b  = %d\n", a & b);
        printf("a | b  = %d\n", a | b);
        printf("a ^ b  = %d\n", a ^ b);
        printf("a << 2 = %d\n", a << 2);
    }
    return 0;
}
```

#### 4.3 คำถามท้ายการทดลอง (ข้อละ 1.5 คะแนน)
* **ข้อที่ 1:** ตัวดำเนินการเลื่อนบิต `<<` และ `>>` สัมพันธ์กับการคูณ/หารอย่างไร?
  * **แนวคำตอบ:** เลื่อนบิตซ้าย 1 ครั้ง (`x << 1`) เสมือนการคูณด้วย 2, เลื่อนบิตขวา 1 ครั้ง (`x >> 1`) เสมือนการหารด้วย 2
  * **`q1Keywords`:** `เลื่อนบิต`, `คูณ`, `หาร`, `2`
* **ข้อที่ 2:** เพราะเหตุใดนิพจน์ `5 / 2` จึงได้ผลลัพธ์เป็น `2` และแก้เป็น `2.5` อย่างไร?
  * **แนวคำตอบ:** เพราะเป็นการหารจำนวนเต็ม (Integer Division) ทศนิยมจะถูกตัดทิ้ง แก้ไขโดยใช้ Type Casting เช่น `(float)5 / 2` หรือ `5.0 / 2`
  * **`q2Keywords`:** `หาร`, `จำนวนเต็ม`, `casting`, `float`, `ทศนิยม`

---

### 5. Lab 3: โครงสร้างแบบเลือกทำ (Conditionals)
* **โฟลเดอร์ปฏิบัติการ:** `lab3/`
* **หัวข้อการเรียนรู้:** `if`, `if-else`, `if-else if-else`, Nested if, `switch-case` และ `break`

#### 5.1 เฉลยเติมคำสั่งตัวอย่างที่ 2 (Blanks - 2.0 คะแนน)
* ช่องที่ 1: `switch`
* ช่องที่ 2: `break`

#### 5.2 กิจกรรมท้าทาย (Challenge - 4.0 คะแนน)
* **โจทย์:** คำนวณภาษีเงินได้บุคคลธรรมดาอัตราก้าวหน้า: 0-150,000 ยกเว้น (0%), 150,001-300,000 (5%), 300,001-500,000 (10%), เกิน 500,000 (15%)
* **คีย์เวิร์ดตรวจโค้ด (`codeKeywords`):** `if`, `else`, `scanf`, `printf`, `<=|>=|<|>`, `*`
* **โค้ดเฉลย (`challenge_solution.c`):**
```c
#include <stdio.h>

int main() {
    float income, tax = 0.0;
    printf("Enter net annual income: ");
    if (scanf("%f", &income) == 1) {
        if (income <= 150000) {
            tax = 0.0;
        } else if (income <= 300000) {
            tax = (income - 150000) * 0.05;
        } else if (income <= 500000) {
            tax = (150000 * 0.05) + ((income - 300000) * 0.10);
        } else {
            tax = (150000 * 0.05) + (200000 * 0.10) + ((income - 500000) * 0.15);
        }
        
        printf("Income: %.2f Baht\n", income);
        printf("Calculated Tax: %.2f Baht\n", tax);
    }
    return 0;
}
```

#### 5.3 คำถามท้ายการทดลอง (ข้อละ 1.5 คะแนน)
* **ข้อที่ 1:** ทำไมโครงสร้างแบบ `if-else if-else` จึงมีประสิทธิภาพดีกว่าการใช้ `if` เดี่ยวหลายตัว?
  * **แนวคำตอบ:** เพราะเมื่อเงื่อนไขใดเงื่อนไขหนึ่งเป็นจริงแล้ว โปรแกรมจะข้ามการตรวจสอบเงื่อนไขที่เหลือด้านล่างทันที ทำให้ประหยัดเวลาการประมวลผล
  * **`q1Keywords`:** `ประสิทธิภาพ`, `ข้าม`, `ตรวจสอบ`, `เงื่อนไข`
* **ข้อที่ 2:** อธิบายหน้าที่ของ `break` ใน `switch-case` และผลเสียหากลืมใส่
  * **แนวคำตอบ:** `break` ทำหน้าที่หยุดและกระโดดออกจากบล็อก `switch` หากลืมใส่จะเกิดปรากฏการณ์ Fall-through ทำให้โปรแกรมไหลไปประมวลผลคำสั่งในเคสถัดไปต่อจนจบ
  * **`q2Keywords`:** `break`, `switch`, `fall-through`, `ไหล`

---

### 6. Lab 4: โครงสร้างควบคุมแบบวนซ้ำ (Loops)
* **โฟลเดอร์ปฏิบัติการ:** `lab4/`
* **หัวข้อการเรียนรู้:** `for`, `while`, `do-while`, Loop Controls (`break`, `continue`) และ Nested Loops (ลูปซ้อนลูป)

#### 6.1 เฉลยเติมคำสั่งตัวอย่างที่ 2 (Blanks - 2.0 คะแนน)
* ช่องที่ 1: `count <= 3` (หรือ `count < 4`)
* ช่องที่ 2: `count++` (หรือ `++count`, `count += 1`)

#### 6.2 กิจกรรมท้าทาย (Challenge - 4.0 คะแนน)
* **โจทย์:** รับค่าจำนวนเต็มบวก N แล้วใช้ Nested Loops พิมพ์รูปสามเหลี่ยมมุมฉากด้วยเครื่องหมายดาว (`*`) จำนวน N แถว
* **คีย์เวิร์ดตรวจโค้ด (`codeKeywords`):** `for|while`, `scanf`, `printf`, `\*`, `\n`
* **โค้ดเฉลย (`challenge_solution.c`):**
```c
#include <stdio.h>

int main() {
    int n, i, j;
    printf("Enter number of rows (N): ");
    if (scanf("%d", &n) == 1) {
        for (i = 1; i <= n; i++) {
            for (j = 1; j <= i; j++) {
                printf("*");
            }
            printf("\n");
        }
    }
    return 0;
}
```

#### 6.3 คำถามท้ายการทดลอง (ข้อละ 1.5 คะแนน)
* **ข้อที่ 1:** อธิบายความแตกต่างของการตรวจสอบเงื่อนไขในลูป `while` และ `do-while`
  * **แนวคำตอบ:** `while` ตรวจสอบเงื่อนไขก่อนเริ่มทำงาน หากเงื่อนไขเป็นเท็จจะไม่ทำงานเลย, ส่วน `do-while` จะประมวลผลคำสั่งก่อนอย่างน้อย 1 รอบเสมอ แล้วจึงตรวจสอบเงื่อนไข
  * **`q1Keywords`:** `ก่อน`, `หลัง`, `do-while`, `รอบ`, `อย่างน้อย`
* **ข้อที่ 2:** อธิบายความแตกต่างของคำสั่ง `break` และ `continue` ในลูป
  * **แนวคำตอบ:** `break` สั่งให้ออกจากลูปการทำงานทันที, ส่วน `continue` จะข้ามคำสั่งที่เหลือในรอบปัจจุบันเพื่อไปเริ่มต้นการทำงานในรอบถัดไป
  * **`q2Keywords`:** `break`, `continue`, `ออก`, `ข้าม`

---

### 7. Lab 5: ฟังก์ชันและการขอบเขตตัวแปร (Functions & Scope)
* **โฟลเดอร์ปฏิบัติการ:** `lab5/`
* **หัวข้อการเรียนรู้:** Function Prototypes, Definitions, Parameters, Call-by-Value, Variable Scopes (Local vs Global) และ Recursion

#### 7.1 เฉลยเติมคำสั่งตัวอย่างที่ 2 (Blanks - 2.0 คะแนน)
* ช่องที่ 1: `exp == 0` (หรือ `exp <= 0`)
* ช่องที่ 2: `power(base, exp - 1)`

#### 7.2 กิจกรรมท้าทาย (Challenge - 4.0 คะแนน)
* **โจทย์:** คำนวณหาค่า Factorial ของตัวเลข N โดยเขียน 2 ฟังก์ชันย่อยในโค้ดเดียว: ฟังก์ชันลูป `factorialIterative(n)` และฟังก์ชันเรียกตัวเอง `factorialRecursive(n)`
* **คีย์เวิร์ดตรวจโค้ด (`codeKeywords`):** `return`, `for|while`, `if`, `scanf`, `printf`, `long|int`
* **โค้ดเฉลย (`challenge_solution.c`):**
```c
#include <stdio.h>

long long factorialIterative(int n) {
    long long res = 1;
    for (int i = 1; i <= n; i++) {
        res *= i;
    }
    return res;
}

long long factorialRecursive(int n) {
    if (n <= 1) return 1;
    return n * factorialRecursive(n - 1);
}

int main() {
    int num;
    printf("Enter an integer: ");
    if (scanf("%d", &num) == 1 && num >= 0) {
        printf("Iterative: %d! = %lld\n", num, factorialIterative(num));
        printf("Recursive: %d! = %lld\n", num, factorialRecursive(num));
    }
    return 0;
}
```

#### 7.3 คำถามท้ายการทดลอง (ข้อละ 1.5 คะแนน)
* **ข้อที่ 1:** การส่งค่าพารามิเตอร์แบบ Call-by-Value และ Call-by-Reference ต่างกันอย่างไร?
  * **แนวคำตอบ:** Call-by-Value จะคัดลอกสำเนาค่าไป ทำให้ฟังก์ชันไม่สามารถแก้ไขค่าตัวแปรเดิมได้, ส่วน Call-by-Reference ส่งตำแหน่ง Address ไป ทำให้ฟังก์ชันสามารถแก้ไขค่าจริงของตัวแปรต้นทางได้
  * **`q1Keywords`:** `value`, `reference`, `copy`, `address`, `ตัวแปรเดิม`
* **ข้อที่ 2:** ทำไม Recursion จึงต้องมี Base Case และหากลืมจะเกิดผลอย่างไร?
  * **แนวคำตอบ:** Base Case ใช้กำหนดจุดหยุดการเรียกตัวเอง หากลืมฟังก์ชันจะเรียกตัวเองไม่สิ้นสุดจนหน่วยความจำ Stack ล้น เกิดข้อผิดพลาด Stack Overflow และโปรแกรมแครช
  * **`q2Keywords`:** `base case`, `กรณีฐาน`, `ล้น`, `infinite`, `stack overflow`

---

### 8. Lab 6: อาร์เรย์และสตริง (Arrays & Strings)
* **โฟลเดอร์ปฏิบัติการ:** `lab6/`
* **หัวข้อการเรียนรู้:** 1D/2D Arrays, Character Arrays, Null Terminator (`\0`), String Input/Output

#### 8.1 เฉลยเติมคำสั่งตัวอย่างที่ 2 (Blanks - 2.0 คะแนน)
* ช่องที่ 1: `char`
* ช่องที่ 2: `%s`

#### 8.2 กิจกรรมท้าทาย (Challenge - 4.0 คะแนน)
* **โจทย์:** รับคำสตริง 1 คำ แล้วเขียนอัลกอริทึมนับความยาวและสลับด้านข้อความ (Reverse String) แสดงผลทางจอภาพ โดยห้ามใช้ `strlen()`
* **คีย์เวิร์ดตรวจโค้ด (`codeKeywords`):** `char`, `\0`, `while|for`, `scanf|fgets`, `printf|putchar|puts`, `[`
* **โค้ดเฉลย (`challenge_solution.c`):**
```c
#include <stdio.h>

int main() {
    char str[100];
    int len = 0;
    
    printf("Enter string: ");
    if (scanf("%99s", str) == 1) {
        while (str[len] !=  ) {
            len++;
        }
        
        printf("Length: %d\n", len);
        printf("Reversed: ");
        for (int i = len - 1; i >= 0; i--) {
            putchar(str[i]);
        }
        printf("\n");
    }
    return 0;
}
```

#### 8.3 คำถามท้ายการทดลอง (ข้อละ 1.5 คะแนน)
* **ข้อที่ 1:** สตริงในภาษา C ต่างจาก char array ทั่วไปอย่างไร และ `\0` สำคัญอย่างไร?
  * **แนวคำตอบ:** สตริงต้องปิดท้ายด้วย Null Character (`\0`) เสมอ เพื่อเป็นสัญลักษณ์แจ้งให้ฟังก์ชันแสดงผลทราบจุดสิ้นสุดของข้อความในหน่วยความจำ
  * **`q1Keywords`:** `1 มิติ`, `2 มิติ`, `แถว`, `คอลัมน์`, `ตาราง`, `\0`, `null`
* **ข้อที่ 2:** การจองพื้นที่อาร์เรย์แบบคงที่ (Static Array) เช่น `int score[5];` มีข้อดีและข้อจำกัดอย่างไร?
  * **แนวคำตอบ:** ข้อดีคือทำงานเร็วและเขียนง่าย, ข้อจำกัดคือไม่สามารถปรับยืดหรือขยายขนาดพื้นที่เมื่อต้องการเพิ่มข้อมูลตอนโปรแกรมกำลังรันได้
  * **`q2Keywords`:** `\0`, `null`, `จบ`, `array`, `character`, `static`

---

### 9. Lab 7: พอยน์เตอร์และการจัดการหน่วยความจำพลวัต
* **โฟลเดอร์ปฏิบัติการ:** `lab7/`
* **หัวข้อการเรียนรู้:** Pointers (`*`, `&`), Pointer Arithmetic, Heap vs Stack Memory, `malloc()`, `free()` และ Memory Leaks

#### 9.1 เฉลยเติมคำสั่งตัวอย่างที่ 2 (Blanks - 2.0 คะแนน)
* ช่องที่ 1: `malloc(sizeof(int))` (หรือ `malloc(4)`)
* ช่องที่ 2: `free(p)`

#### 9.2 กิจกรรมท้าทาย (Challenge - 4.0 คะแนน)
* **โจทย์:** รับค่าขนาด N แล้วจองหน่วยความจำแบบพลวัตด้วย `malloc()` เพื่อรับค่าตัวเลข N ตัว คำนวณหาค่าเฉลี่ย และคืนหน่วยความจำด้วย `free()`
* **คีย์เวิร์ดตรวจโค้ด (`codeKeywords`):** `malloc`, `free`, `sizeof`, `scanf`, `printf`, `*`
* **โค้ดเฉลย (`challenge_solution.c`):**
```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    int n, *arr;
    float sum = 0.0;
    
    printf("Enter number of elements (N): ");
    if (scanf("%d", &n) == 1 && n > 0) {
        arr = (int *)malloc(n * sizeof(int));
        if (arr == NULL) {
            printf("Memory allocation failed!\n");
            return 1;
        }
        
        printf("Enter %d integers:\n", n);
        for (int i = 0; i < n; i++) {
            scanf("%d", &arr[i]);
            sum += arr[i];
        }
        
        printf("Average = %.2f\n", sum / n);
        free(arr);
    }
    return 0;
}
```

#### 9.3 คำถามท้ายการทดลอง (ข้อละ 1.5 คะแนน)
* **ข้อที่ 1:** สัญลักษณ์ `*` (Dereference) และ `&` (Address-of) ต่างกันอย่างไรในพอยน์เตอร์?
  * **แนวคำตอบ:** `&` ใช้หาตำแหน่งที่อยู่ (Address) ของตัวแปร, ส่วน `*` ใช้เข้าถึงหรือดึงค่าจริงที่เก็บอยู่ในตำแหน่งที่พอยน์เตอร์ชี้ไป
  * **`q1Keywords`:** `&`, `*`, `address`, `ชี้`, `ค่า`, `ตำแหน่ง`
* **ข้อที่ 2:** เหตุผลสำคัญในการเรียกใช้ `free()` และหากลืมจะเกิดผลเสียอย่างไร?
  * **แนวคำตอบ:** เพื่อคืนพื้นที่หน่วยความจำ Heap ให้ระบบนำไปใช้งานต่อ หากลืมจะทำให้เกิดปัญหาหน่วยความจำรั่วไหล (Memory Leak) ทำให้กินแรมสะสมจนเครื่องแครช
  * **`q2Keywords`:** `free`, `leak`, `หน่วยความจำ`, `คืน`, `ram`

---

### 10. Lab 8: โครงสร้างข้อมูลกำหนดเอง (Structures & Unions)
* **โฟลเดอร์ปฏิบัติการ:** `lab8/`
* **หัวข้อการเรียนรู้:** `struct`, `union`, Member Access (`.`), Memory Alignment, Array of Structures

#### 10.1 เฉลยเติมคำสั่งตัวอย่างที่ 2 (Blanks - 2.0 คะแนน)
* ช่องที่ 1: `struct User`
* ช่องที่ 2: `user1.username`

#### 10.2 กิจกรรมท้าทาย (Challenge - 4.0 คะแนน)
* **โจทย์:** สร้าง `struct Student` (id, name, score) รับข้อมูลนักศึกษา 3 คน บันทึกลงอาร์เรย์โครงสร้าง แสดงผลตาราง และคำนวณคะแนนเฉลี่ย
* **คีย์เวิร์ดตรวจโค้ด (`codeKeywords`):** `struct`, `for|while`, `.`, `scanf`, `printf`
* **โค้ดเฉลย (`challenge_solution.c`):**
```c
#include <stdio.h>

struct Student {
    char id[15];
    char name[50];
    float score;
};

int main() {
    struct Student stds[3];
    float total = 0.0;
    
    printf("--- Input 3 Students ---\n");
    for (int i = 0; i < 3; i++) {
        printf("Student #%d ID: ", i + 1);
        scanf("%14s", stds[i].id);
        printf("Student #%d Name: ", i + 1);
        scanf("%49s", stds[i].name);
        printf("Student #%d Score: ", i + 1);
        scanf("%f", &stds[i].score);
        total += stds[i].score;
    }
    
    printf("\n--- Student Records ---\n");
    printf("%-15s %-20s %s\n", "ID", "Name", "Score");
    printf("---------------------------------------------\n");
    for (int i = 0; i < 3; i++) {
        printf("%-15s %-20s %.2f\n", stds[i].id, stds[i].name, stds[i].score);
    }
    printf("---------------------------------------------\n");
    printf("Average Score: %.2f\n", total / 3.0);
    
    return 0;
}
```

#### 10.3 คำถามท้ายการทดลอง (ข้อละ 1.5 คะแนน)
* **ข้อที่ 1:** อธิบายความแตกต่างของการจัดสรรหน่วยความจำระหว่าง `struct` และ `union`
  * **แนวคำตอบ:** `struct` จะจองหน่วยความจำแยกทีละสมาชิกและรวมขนาดเข้าด้วยกัน, ส่วน `union` สมาชิกทุกตัวจะแชร์ตำแหน่งเริ่มต้นเดียวกัน และมีขนาดเท่ากับสมาชิกตัวที่ใหญ่ที่สุดเท่านั้น
  * **`q1Keywords`:** `แชร์`, `แยก`, `ขนาด`, `หน่วยความจำ`, `ตัวแปรใหญ่สุด`
* **ข้อที่ 2:** งานลักษณะใดที่ควรเลือกใช้ `union` แทน `struct`?
  * **แนวคำตอบ:** งานที่ตัวแปรสมาชิกไม่ได้ถูกเรียกใช้งานพร้อมกัน เช่น การพัฒนาอุปกรณ์ฝังตัว (Embedded Systems) เพื่อประหยัด RAM หรือการแปลงแพ็กเกตข้อมูลเครือข่าย
  * **`q2Keywords`:** `ประหยัด`, `ram`, `สลับ`, `พร้อมกัน`, `ฝังตัว`

---

### 11. Lab 9: การจัดการไฟล์ข้อมูล (File Handling I/O)
* **โฟลเดอร์ปฏิบัติการ:** `lab9/`
* **หัวข้อการเรียนรู้:** File Streams (`FILE *`), `fopen()`, `fclose()`, `fprintf()`, `fgets()`, `fscanf()`, Text Mode (`"w"`, `"r"`)

#### 11.1 เฉลยเติมคำสั่งตัวอย่างที่ 2 (Blanks - 2.0 คะแนน)
* ช่องที่ 1: `"r"`
* ช่องที่ 2: `NULL` (หรือ `0`)

#### 11.2 กิจกรรมท้าทาย (Challenge - 4.0 คะแนน)
* **โจทย์:** สร้างไฟล์ `students.txt` เขียนชื่อและเกรดลงไป ปิดไฟล์ แล้วเปิดอ่านข้อมูลกลับมาแสดงผลทางหน้าจอคอนโซล
* **คีย์เวิร์ดตรวจโค้ด (`codeKeywords`):** `fopen`, `fclose`, `fprintf|fputs`, `fgets|fscanf`, `FILE`, `"w"`, `"r"`
* **โค้ดเฉลย (`challenge_solution.c`):**
```c
#include <stdio.h>

int main() {
    FILE *fp = fopen("students.txt", "w");
    if (fp == NULL) {
        printf("Cannot create file!\n");
        return 1;
    }
    
    fprintf(fp, "Name: Somchai Deejai, Grade: 4.00\n");
    fclose(fp);
    printf("File written successfully.\n");
    
    // เปิดอ่านไฟล์กลับมาแสดงผล
    fp = fopen("students.txt", "r");
    if (fp == NULL) {
        printf("Cannot open file for reading!\n");
        return 1;
    }
    
    char buffer[100];
    printf("\nReading from file:\n");
    while (fgets(buffer, sizeof(buffer), fp) != NULL) {
        printf("%s", buffer);
    }
    fclose(fp);
    
    return 0;
}
```

#### 11.3 คำถามท้ายการทดลอง (ข้อละ 1.5 คะแนน)
* **ข้อที่ 1:** Text Mode และ Binary Mode แตกต่างกันอย่างไรในแง่ลักษณะไฟล์?
  * **แนวคำตอบ:** Text Mode บันทึกเป็นตัวอักษรธรรมดาที่มนุษย์อ่านเข้าใจได้, ส่วน Binary Mode บันทึกเป็นข้อมูลไบนารีระดับบิตดิบตรงตามโครงสร้างในหน่วยความจำ RAM
  * **`q1Keywords`:** `text`, `binary`, `ตัวอักษร`, `ไบนารี`, `มนุษย์อ่าน`
* **ข้อที่ 2:** ทำไมต้องตรวจสอบค่า File Pointer ว่าเท่ากับ `NULL` หรือไม่หลัง `fopen()`?
  * **แนวคำตอบ:** เพื่อตรวจสอบว่าเปิดไฟล์สำเร็จจริงหรือไม่ ป้องกันข้อผิดพลาดกรณีไม่มีไฟล์อยู่จริง พาธผิด หรือไม่มีสิทธิ์เข้าถึง เพื่อไม่ให้โปรแกรมแครช
  * **`q2Keywords`:** `null`, `สำเร็จ`, `แครช`, `ความปลอดภัย`

---

### 12. Lab 10: การใช้งานฟังก์ชันจัดการสตริง (String Functions)
* **โฟลเดอร์ปฏิบัติการ:** `lab10/`
* **หัวข้อการเรียนรู้:** ฟังก์ชันมาตรฐานใน `<string.h>` (`strlen`, `strcpy`, `strncpy`, `strcat`, `strncat`, `strcmp`, `strncmp`, `fgets`)

#### 12.1 เฉลยเติมคำสั่งตัวอย่างที่ 2 (Blanks - 2.0 คะแนน)
* ช่องที่ 1: `strncpy`
* ช่องที่ 2: `strncat`

#### 12.2 กิจกรรมท้าทาย (Challenge - 4.0 คะแนน)
* **โจทย์:** รวม 3 ข้อในโปรแกรมเดียว: 1) ตรวจสอบ Serial Number ขึ้นต้นด้วย `SN-` (ใช้ `fgets`, `strlen`, `strncmp`), 2) ต่อชื่อไฟล์ `_Report.txt` (ใช้ `strcpy`, `strcat`), 3) จำลองสถานะอุปกรณ์ `connect`/`disconnect` (ใช้ `strcmp`, `strcpy`)
* **คีย์เวิร์ดตรวจโค้ด (`codeKeywords`):** `fgets`, `strlen`, `strncmp`, `strcpy|strncpy`, `strcat|strncat`, `strcmp`
* **โค้ดเฉลย (`challenge_solution.c`):**
```c
#include <stdio.h>
#include <string.h>

void testSerialNumber() {
    char sn[30];
    printf("กรุณาป้อน Serial Number (สูงสุด 20 ตัวอักษร): ");
    if (fgets(sn, sizeof(sn), stdin) != NULL) {
        sn[strcspn(sn, "\n")] = 0;
        printf("Length: %zu\n", strlen(sn));
        if (strncmp(sn, "SN-", 3) == 0) {
            printf("Valid Serial Number!\n");
        } else {
            printf("Invalid Serial Number (must start with SN-)\n");
        }
    }
}

void generateReportFilename() {
    char deviceName[50];
    char filename[100];
    printf("กรุณาป้อนชื่ออุปกรณ์: ");
    if (fgets(deviceName, sizeof(deviceName), stdin) != NULL) {
        deviceName[strcspn(deviceName, "\n")] = 0;
        strcpy(filename, deviceName);
        strcat(filename, "_Report.txt");
        printf("Generated Filename: %s\n", filename);
    }
}

void deviceStatusSimulator() {
    char status[20] = "Offline";
    char command[30];
    printf("สถานะอุปกรณ์ปัจจุบัน: %s\n", status);
    printf("ป้อนคำสั่ง (connect/disconnect): ");
    if (fgets(command, sizeof(command), stdin) != NULL) {
        command[strcspn(command, "\n")] = 0;
        if (strcmp(command, "connect") == 0) {
            strcpy(status, "Online");
        } else if (strcmp(command, "disconnect") == 0) {
            strcpy(status, "Offline");
        } else {
            printf("คำสั่งไม่ถูกต้อง\n");
        }
        printf("สถานะอุปกรณ์หลังประมวลผล: %s\n", status);
    }
}

int main() {
    printf("=== กิจกรรมท้าทาย: String Functions ===\n");
    testSerialNumber();
    printf("\n");
    generateReportFilename();
    printf("\n");
    deviceStatusSimulator();
    return 0;
}
```

#### 12.3 คำถามท้ายการทดลอง (ข้อละ 1.5 คะแนน)
* **ข้อที่ 1:** อธิบายความปลอดภัยระหว่าง `strcpy()` และ `strncpy()`
  * **แนวคำตอบ:** `strcpy()` เสี่ยงเกิดปัญหา Buffer Overflow หากข้อความต้นทางยาวกว่าอาร์เรย์ปลายทาง, ขณะที่ `strncpy()` ปลอดภัยกว่าเพราะกำหนดจำนวนตัวอักษรสูงสุดที่คัดลอกได้
  * **`q1Keywords`:** `overflow`, `ความยาว`, `n`, `ปลอดภัย`, `\0`
* **ข้อที่ 2:** ทำไม `fgets()` ต้องมีพารามิเตอร์จำกัดขนาด (size) และทำไมต้องเคลียร์ `\n`?
  * **แนวคำตอบ:** กำหนดขนาดเพื่อป้องกัน Buffer Overflow และต้องเคลียร์ `\n` เพราะ `fgets()` จะอ่านอักขระ Enter ขึ้นบรรทัดใหม่ติดเข้ามาด้วย หากไม่เคลียร์จะทำให้การเปรียบเทียบหรือเชื่อมสตริงผิดพลาด
  * **`q2Keywords`:** `gets`, `ปลอดภัย`, `ขนาด`, `buffer`, `\n`, `enter`

---

### 13. Lab Flowchart: การออกแบบผังงานและการจำลองตรรกะ (Flowchart & Logic Tracing)
* **โฟลเดอร์ปฏิบัติการ:** `lab-flowchart/`
* **หัวข้อการเรียนรู้:** มาตรฐานสัญลักษณ์ ANSI/ISO, กฎของ Flow Line, การทำ Trace Table (Dry Run) สำหรับ Loop Accumulator, การ Debug ผังงาน, การวิเคราะห์ IPO Model และการแปลงผังงานเป็นโปรแกรมภาษา C

#### 13.1 เฉลยตอนที่ 1: มาตรฐานและกฎของผังงาน (1.5 คะแนน)
* **1.1 สัญลักษณ์สี่เหลี่ยมด้านขนาน:** การรับข้อมูลหรือแสดงผล / General Input-Output (`input`, `output`, `รับ`, `แสดง`)
* **1.2 ข้อความกำกับเส้นทางออกจาก Decision:** `True / False` หรือ `Yes / No` (จริง / เท็จ)
* **1.3 ทิศทางการไหลมาตรฐาน:** บนลงล่าง (Top to Bottom) หรือ ซ้ายไปขวา (Left to Right)

#### 13.2 เฉลยตอนที่ 2: การแกะรอยตรรกะ (Trace Table - 2.5 คะแนน)
* **รอบที่ 1:** เงื่อนไข `count <= 4` = `True`, `count` = 1, `sum` หลังบวก = `1`
* **รอบที่ 2:** เงื่อนไข `count <= 4` = `True`, `count` = 2, `sum` หลังบวก = `3`
* **รอบที่ 3:** เงื่อนไข `count <= 4` = `True`, `count` = 3, `sum` หลังบวก = `6`
* **รอบที่ 4:** เงื่อนไข `count <= 4` = `True`, `count` = 4, `sum` หลังบวก = `10`
* **รอบที่ 5 (จบ):** เงื่อนไข `count <= 4` = `False`, `count` = `5`, `sum` = `10`
* **ค่า Output ที่แสดงผลออกทางจอภาพ:** `10`

#### 13.3 เฉลยตอนที่ 3: ตรวจสอบและแก้จุดผิด (Debugging - 2.0 คะแนน)
* **จุดผิดที่ 1 (1.0 คะแนน):** สัญลักษณ์รับค่า Input score ใช้รูปสี่เหลี่ยมผืนผ้า (Process) ซึ่งผิดมาตรฐาน ต้องแก้ไขเป็นรูปสี่เหลี่ยมด้านขนาน (Parallelogram)
* **จุดผิดที่ 2 (1.0 คะแนน):** เส้นทางเลือก True/False สลับกัน ทำให้เมื่อได้คะแนน >= 50 กลับไปพิมพ์ "FAIL" และคะแนน < 50 กลับไปพิมพ์ "PASS" วิธีแก้คือสลับป้ายกำกับ True/False ให้ถูกต้อง

#### 13.4 เฉลยตอนที่ 4: กิจกรรมท้าทาย Flowchart to C Code (3.0 คะแนน)
* **4.1 วิเคราะห์ IPO Model (0.5 คะแนน):**
  * Input: `weight`, `height` (น้ำหนัก, ส่วนสูง)
  * Process: `BMI = weight / (height * height)`
  * Output: `BMI`, ข้อความ `Overweight` หรือ `Normal`
* **4.2 แนบรูปภาพผังงาน (1.0 คะแนน):** ผังงานโปรแกรมคำนวณ BMI ตามมาตรฐาน
* **4.3 โค้ดภาษา C (1.5 คะแนน - `codeKeywords: printf, scanf, if, else, bmi`):**
```c
#include <stdio.h>

int main() {
    float weight, height, bmi;
    printf("Enter weight (kg) and height (m): ");
    scanf("%f %f", &weight, &height);

    bmi = weight / (height * height);
    printf("BMI = %.2f\n", bmi);

    if (bmi >= 25.0) {
        printf("Overweight\n");
    } else {
        printf("Normal\n");
    }

    return 0;
}
```

#### 13.5 ตอนที่ 5: สรุปผลการทดลองและการสะท้อนคิด (1.0 คะแนน)
* อธิบายประโยชน์ของการทำ Flowchart และ Trace Table ก่อนลงมือเขียนโค้ด เพื่อป้องกันข้อผิดพลาดเชิงตรรกะ (Logic Error) และ Infinite Loop (Anti-Cheat Protection: ห้าม Paste)

---

*เอกสารคู่มือนี้ซิงก์ตรงกับระบบตรวจคำตอบใน `Code.gs` และ `index.html` ทุกใบงาน*

