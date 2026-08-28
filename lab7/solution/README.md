# คู่มือเฉลยปฏิบัติการ Lab 7: พอยน์เตอร์และการจัดการหน่วยความจำพลวัต
## (Lab 7: Pointers & Memory Management - Laboratory Solution & Grading Key)

โฟลเดอร์นี้รวบรวมไฟล์ซอร์สโค้ดเฉลยภาษา C (`.c`), แนวทางการตอบคำถาม และเกณฑ์การประเมินผลสำหรับ **Lab 7: พอยน์เตอร์และการจัดการหน่วยความจำพลวัต** ระดับประกาศนียบัตรวิชาชีพชั้นสูง (ปวส.)

---

## 🎯 วัตถุประสงค์เชิงสมรรถนะของใบงาน
1. Understand concepts of pointer addresses (&, *) and memory dereferencing
2. Understand argument passing with address references (Call-by-Reference)
3. Capable of implementing heap memory management using dynamic structures (malloc/free)

---

## 📁 รายการไฟล์ในโฟลเดอร์ `solution/`

| ชื่อไฟล์ | คำอธิบาย |
| :--- | :--- |
| **`challenge_solution.c`** | ซอร์สโค้ดเฉลยกิจกรรมท้าทายเชิงอุตสาหกรรม/ระบบสมองกล (Lab Challenge) |
| **`example2_solution.c`** | ซอร์สโค้ดเฉลยโปรแกรมตัวอย่างที่ 2 (Fill in the Blanks) |
| **`README.md`** | เอกสารเฉลยละเอียดและเกณฑ์การตรวจให้คะแนน |

---

## 📝 1. เฉลยโปรแกรมตัวอย่างที่ 2 (Fill in the Blanks) - คะแนนเต็ม 2.0 คะแนน

### 1.1 คำสั่งจองพื้นที่ขนาด int 1 ช่อง
- **คำตอบที่ถูกต้อง:** `malloc(sizeof(int))`
- **คำตอบที่เป็นไปได้:** `malloc(sizeof(int))`, `malloc(sizeof (int))`, `malloc(4)`

### 1.2 คำสั่งคืนหน่วยความจำให้ระบบ
- **คำตอบที่ถูกต้อง:** `free(p)`
- **คำตอบที่เป็นไปได้:** `free(p)`, `free( p )`

### ซอร์สโค้ดตัวอย่างที่ 2 ฉบับสมบูรณ์ (`example2_solution.c`):
```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    int *p;
    
    p = (int *)malloc(sizeof(int));
    
    if (p == NULL) {
        printf("Memory allocation failed!\n");
        return 1;
    }
    
    *p = 500;
    printf("Value in allocated memory: %d\n", *p);
    
    free(p);
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
> พัฒนาโปรแกรมจัดสรรบัฟเฟอร์หน่วยความจำพลวัต (Dynamic Sensor Buffer) โดยรับจำนวนขนาดบัฟเฟอร์ N ตัวอย่าง ใช้ malloc() จองพื้นที่ใน Heap สำหรับ float N ตัว รับค่าและคำนวณค่าเฉลี่ยผ่านพอยน์เตอร์ จากนั้นคืนหน่วยความจำด้วย free() เพื่อป้องกัน Memory Leak


### 2.2 ซอร์สโค้ดเฉลยกิจกรรมท้าทาย (`challenge_solution.c`):
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

### 2.3 คำสั่งคอมไพล์และทดสอบรันบน Terminal:
```bash
gcc -Wall -Wextra -o challenge_solution challenge_solution.c
./challenge_solution
```

---

## 💡 3. เฉลยคำถามท้ายการทดลอง (Post-Lab Questions) - คะแนนเต็ม 3.0 คะแนน

### ข้อที่ 1: 1. ตัวดำเนินการสัญลักษณ์ * (Dereference operator) และ & (Address-of operator) มีความสัมพันธ์และต่างกันอย่างไรในพอยน์เตอร์? (1.5 คะแนน)
- **แนวทางการตอบที่ถูกต้อง:**
  - อธิบายหลักการ ความหมาย หรือกลไกการทำงานตามหัวข้ออย่างถูกต้องตรงประเด็น
  - มีการยกตัวอย่างประกอบ หรือระบุคีย์เวิร์ดสำคัญ เช่น `&, \*, address, ชี้, ค่า, ตำแหน่ง`
- **เกณฑ์การให้คะแนน:**
  - อธิบายได้ถูกต้องสมบูรณ์และยกตัวอย่างชัดเจน: **1.5 คะแนน**
  - ตอบถูกแต่ขาดรายละเอียดเชิงลึก: **0.8 - 1.0 คะแนน**
  - ไม่ตรงประเด็นหรือไม่ตอบ: **0.0 คะแนน**

### ข้อที่ 2: 2. อธิบายเหตุผลสำคัญในการต้องเรียกคำสั่ง free() คืนหน่วยความจำหลังสิ้นสุดการใช้งาน และหากลืมจะเกิดความผิดพลาดใด? (1.5 คะแนน)
- **แนวทางการตอบที่ถูกต้อง:**
  - วิเคราะห์ข้อดี-ข้อจำกัด สาเหตุ หรือข้อควรระวังในการเขียนโปรแกรมจริง
  - มีคีย์เวิร์ดสำคัญ เช่น `free, leak, หน่วยความจำ, คืน, ram`
- **เกณฑ์การให้คะแนน:**
  - วิเคราะห์ได้ถูกต้อง ครอบคลุมบริบททางเทคนิค: **1.5 คะแนน**
  - ตอบได้บางส่วน: **0.8 - 1.0 คะแนน**
  - ตอบไม่ตรงประเด็น: **0.0 คะแนน**

---

## 📊 4. สรุปผลและการสะท้อนคิด (Conclusion & Reflection)
- นักศึกษาควรสรุปองค์ความรู้ที่ได้รับจากใบงานนี้ ปัญหาที่พบในการทดลอง (เช่น ข้อผิดพลาดทางไวยากรณ์, ชนิดข้อมูล หรือหน่วยความจำ) และแนวทางแก้ไขเพื่อประยุกต์ใช้งานในระบบสมองกลหรืองานช่างจริง
