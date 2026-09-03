const fs = require('fs');
const path = require('path');

const labs = [
  {
    num: "1",
    idName: "lab1",
    titleTh: "Lab 1: ตัวแปร ชนิดข้อมูล และการรับส่งข้อมูลพื้นฐาน",
    titleEn: "Lab 1: Variables, Data Types & Basic I/O",
    sheetName: "Lab C 1 Submissions",
    folderName: "Lab C 1 Attachments",
    introTitle: "ชนิดข้อมูล ตัวแปร และฟังก์ชันรับส่งข้อมูลพื้นฐาน (printf, scanf)",
    introDesc: "เรียนรู้การใช้ตัวแปรชนิดต่างๆ การประกาศตัวแปร การรับอินพุตด้วย scanf() และแสดงผลลัพธ์ผ่าน printf()",
    purpose: [
      "เข้าใจประเภทตัวแปรพื้นฐานในภาษา C (int, float, char, double)",
      "เข้าใจการจองหน่วยความจำของตัวแปรแต่ละประเภท",
      "สามารถรับค่าจากแป้นพิมพ์ด้วย scanf() และควบคุมการแสดงผลทศนิยมด้วย printf() ได้อย่างถูกต้อง"
    ],
    equipments: [
      { name: "GCC Compiler (MinGW)", desc: "ใช้แปลงซอร์สโค้ดภาษา C (.c) เป็น Executable" },
      { name: "VS Code หรือ Text Editor", desc: "ใช้สำหรับเขียนและตรวจสอบไวยากรณ์ภาษา C" }
    ],
    theoryHtml: `
        <h2>3. ขนาดของชนิดข้อมูลพื้นฐานในภาษา C (Data Types & Memory)</h2>
        <p>หน่วยความจำที่จองไว้สำหรับตัวแปรแต่ละชนิดจะมีขนาดไม่เท่ากัน ขึ้นอยู่กับสถาปัตยกรรมของคอมพิวเตอร์และคอมไพเลอร์ที่ใช้งาน โดยทั่วไปขนาดมาตรฐานคือ:</p>
        
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>ชนิดข้อมูล</th>
                <th>คำสำคัญ (Keyword)</th>
                <th>ขนาด (Bytes)</th>
                <th>ตัวแทนแสดงผล (Format Specifier)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>จำนวนเต็ม</td>
                <td><code>int</code></td>
                <td>4 bytes</td>
                <td><code>%d</code> หรือ <code>%i</code></td>
              </tr>
              <tr>
                <td>ทศนิยมละเอียดปกติ</td>
                <td><code>float</code></td>
                <td>4 bytes</td>
                <td><code>%f</code></td>
              </tr>
              <tr>
                <td>ทศนิยมละเอียดสูง</td>
                <td><code>double</code></td>
                <td>8 bytes</td>
                <td><code>%lf</code></td>
              </tr>
              <tr>
                <td>ตัวอักษรเดี่ยว</td>
                <td><code>char</code></td>
                <td>1 byte</td>
                <td><code>%c</code></td>
              </tr>
            </tbody>
          </table>
        </div>
    `,
    diagramSvg: `
          <svg class="stages-diagram" viewBox="0 0 580 160">
            <text x="30" y="25" fill="#a5b4fc" font-size="12" font-family="Outfit" font-weight="600">Memory Allocation Representation</text>
            
            <rect x="30" y="45" width="40" height="50" rx="4" fill="#1e293b" stroke="#6366f1" stroke-width="2" />
            <text x="50" y="75" fill="#f8fafc" font-size="11" font-family="JetBrains Mono" text-anchor="middle">char</text>
            <text x="50" y="115" fill="#94a3b8" font-size="10" font-family="Sarabun" text-anchor="middle">1 Byte</text>
            
            <rect x="90" y="45" width="160" height="50" rx="4" fill="#1e293b" stroke="#3b82f6" stroke-width="2" />
            <text x="170" y="75" fill="#f8fafc" font-size="11" font-family="JetBrains Mono" text-anchor="middle">int</text>
            <text x="170" y="115" fill="#94a3b8" font-size="10" font-family="Sarabun" text-anchor="middle">4 Bytes</text>

            <rect x="270" y="45" width="280" height="50" rx="4" fill="#1e293b" stroke="#10b981" stroke-width="2" />
            <text x="410" y="75" fill="#f8fafc" font-size="11" font-family="JetBrains Mono" text-anchor="middle">double</text>
            <text x="410" y="115" fill="#94a3b8" font-size="10" font-family="Sarabun" text-anchor="middle">8 Bytes</text>
          </svg>
    `,
    example1Title: "โปรแกรมตัวอย่างที่ 1: การใช้ตัวแปรและการแสดงผลข้อมูลตัวเลข",
    example1Desc: "ศึกษาและคัดลอกโค้ดตัวอย่างนี้ไปรันใน IDE เพื่อดูวิธีการประกาศตัวแปรและการใช้ Format Specifier ร่วมกับ printf():",
    example1Code: `#include <stdio.h>

int main() {
    int age = 20;
    float gpa = 3.58;
    char grade = 'A';
    
    printf("Age: %d\\n", age);
    printf("GPA: %.2f\\n", gpa);
    printf("Grade: %c\\n", grade);
    return 0;
}`,
    example2Title: "โปรแกรมตัวอย่างที่ 2: การรับค่าทางแป้นพิมพ์และการเติม Syntax",
    example2Desc: "ศึกษาโค้ดด้านล่าง และเติมส่วนคำสั่งรับค่าหน่วยความจำ ในช่องว่างกล่องข้อความด้านล่าง เพื่อทดสอบการรันโปรแกรม:",
    blanks: [
      { id: "blank1", label: "อ้างอิงตำแหน่งหน่วยความจำของ num", placeholder: "พิมพ์คำตอบที่นี่...", answers: ["&num", "& num"] },
      { id: "blank2", label: "Format Specifier ตัวแปร float (score)", placeholder: "พิมพ์คำตอบที่นี่...", answers: ["%f"] }
    ],
    example2RawCode: `#include <stdio.h>

int main() {
    int num;
    float score;
    
    printf("Enter integer: ");
    // เติมส่วนสัญลักษณ์อ้างอิงตำแหน่งในหน่วยความจำของ num
    scanf("%d", [BLANK1]);
    
    printf("Enter float score: ");
    // เติมส่วน Format Specifier สำหรับตัวแปร float
    scanf("[BLANK2]", &score);
    
    printf("Value = %d, Score = %.1f\\n", num, score);
    return 0;
}`,
    example2SolutionCode: `#include <stdio.h>

int main() {
    int num;
    float score;
    
    printf("Enter integer: ");
    scanf("%d", &num);
    
    printf("Enter float score: ");
    scanf("%f", &score);
    
    printf("Value = %d, Score = %.1f\\n", num, score);
    return 0;
}`,
    challengeDesc: "พัฒนาโปรแกรมภาษา C สำหรับระบบวัดค่าทางไฟฟ้า โดยรับค่าสัญญาณดิจิทัลจากพอร์ต Analog ADC ขนาด 10 บิต (เลขจำนวนเต็ม 0 - 1023) และค่ากระแสไฟฟ้าในวงจร (เลขทศนิยม float หน่วยแอมแปร์) จากนั้นคำนวณ: 1) แรงดันไฟฟ้า Voltage = (ADC / 1023.0) * 5.0 (โวลต์) และ 2) กำลังไฟฟ้า Power = Voltage * Current (วัตต์) แสดงผลทศนิยม 2 ตำแหน่ง",
    challengePlaceholder: `#include <stdio.h>

int main() {
    int adcValue;
    float current, voltage, power;
    
    printf("Enter 10-bit ADC Raw Value (0-1023): ");
    // รับค่า ADC, กระแสไฟฟ้า คำนวณ Voltage และ Power แล้วแสดงผลที่นี่
    
    return 0;
}`,
    challengeSolutionCode: `#include <stdio.h>

int main() {
    int adcValue;
    float current, voltage, power;
    
    printf("Enter 10-bit ADC Raw Value (0-1023): ");
    if (scanf("%d", &adcValue) == 1) {
        printf("Enter Circuit Current (Amp): ");
        if (scanf("%f", &current) == 1) {
            voltage = (adcValue / 1023.0f) * 5.0f;
            power = voltage * current;
            
            printf("\\n--- Electrical Measurement Results ---\\n");
            printf("ADC Raw Value: %d\\n", adcValue);
            printf("Measured Voltage: %.2f V\\n", voltage);
            printf("Circuit Current:  %.2f A\\n", current);
            printf("Calculated Power: %.2f W\\n", power);
        }
    }
    return 0;
}`,
    question1: "1. อธิบายความแตกต่างระหว่างชนิดข้อมูล int, float และ double ในการเขียนโปรแกรมและการจองหน่วยความจำ",
    question1Placeholder: "อธิบายการใช้งาน ขนาดหน่วยความจำ (Byte) และรูปแบบข้อมูลที่จัดเก็บของแต่ละชนิด...",
    question2: "2. เพราะเหตุใดเมื่อต้องการรับค่าทศนิยมด้วย scanf() จึงต้องระบุประเภทฟอร์แมตแตกต่างจาก printf()?",
    question2Placeholder: "อธิบายหน้าที่ของเครื่องหมาย & (Address-of operator) และความแตกต่างของ Format Specifier ใน scanf...",
    conclusionPlaceholder: "วิเคราะห์ผลการทำแล็บ 1 อุปสรรค และการเรียนรู้เรื่องฟังก์ชันรับส่งข้อมูลพื้นฐาน...",
    codeKeywords: ["scanf","printf","float|double","\\*","%f|%lf","&"],
    q1Keywords: ["int","float","double","ไบต์","หน่วยความจำ"],
    q2Keywords: ["scanf","printf","&","address","specifier"]
  },
  {
    num: "2",
    idName: "lab2",
    titleTh: "Lab 2: ตัวดำเนินการและการประเมินนิพจน์",
    titleEn: "Lab 2: Operators & Expressions",
    sheetName: "Lab C 2 Submissions",
    folderName: "Lab C 2 Attachments",
    introTitle: "ตัวดำเนินการและการทำงานของนิพจน์ (Operators & Expressions)",
    introDesc: "เข้าใจการทำงานของตัวดำเนินการคณิตศาสตร์ การเปรียบเทียบ ตรรกศาสตร์ และตัวดำเนินการระดับบิต (Bitwise Operators) ในภาษา C",
    purpose: [
      "เข้าใจลำดับความสำคัญของตัวดำเนินการ (Operator Precedence)",
      "สามารถประยุกต์ใช้ตัวดำเนินการระดับบิต (Bitwise Operators) ในการจัดการข้อมูลเลขฐานสองได้",
      "เข้าใจความแตกต่างระหว่างตัวดำเนินการหารเลขจำนวนเต็ม (Integer Division) และหารทศนิยม"
    ],
    equipments: [
      { name: "GCC Compiler (MinGW)", desc: "ใช้แปลงซอร์สโค้ดภาษา C (.c) เป็น Executable" },
      { name: "VS Code หรือ Text Editor", desc: "ใช้สำหรับเขียนและตรวจสอบไวยากรณ์ภาษา C" }
    ],
    theoryHtml: `
        <h2>3. ลำดับความสำคัญของตัวดำเนินการ (Operator Precedence)</h2>
        <p>ตัวดำเนินการในภาษา C มีความสำคัญก่อนหลังต่างกัน นิพจน์จะถูกคำนวณตามลำดับความสำคัญดังต่อไปนี้ (จากบนลงล่าง):</p>
        <ul>
          <li><strong>ลำดับ 1:</strong> วงเล็บ <code>()</code>, การเข้าถึงสมาชิกอาร์เรย์ <code>[]</code></li>
          <li><strong>ลำดับ 2:</strong> ตัวดำเนินการเอกภาค <code>++</code>, <code>--</code>, <code>!</code>, ตัวชี้ <code>*</code>, <code>&</code></li>
          <li><strong>ลำดับ 3:</strong> คูณ <code>*</code>, หาร <code>/</code>, มอดุโล (เศษเหลือ) <code>%</code></li>
          <li><strong>ลำดับ 4:</strong> บวก <code>+</code>, ลบ <code>-</code></li>
          <li><strong>ลำดับ 5:</strong> เลื่อนบิต <code>&lt;&lt;</code>, <code>&gt;&gt;</code></li>
          <li><strong>ลำดับ 6:</strong> เปรียบเทียบ <code>&lt;</code>, <code>&lt;=</code>, <code>&gt;</code>, <code>&gt;=</code></li>
          <li><strong>ลำดับ 7:</strong> เปรียบเทียบความเท่ากัน <code>==</code>, <code>!=</code></li>
          <li><strong>ลำดับ 8:</strong> ตัวดำเนินการระดับบิต <code>&amp;</code>, <code>^</code>, <code>|</code></li>
          <li><strong>ลำดับ 9:</strong> ตัวดำเนินการทางตรรกศาสตร์ <code>&amp;&amp;</code>, <code>||</code></li>
          <li><strong>ลำดับ 10:</strong> กำหนดค่า <code>=</code>, <code>+=</code>, <code>-=</code>, <code>*=</code>, <code>/=</code></li>
        </ul>
    `,
    diagramSvg: `
          <svg class="stages-diagram" viewBox="0 0 580 150">
            <text x="30" y="25" fill="#a5b4fc" font-size="12" font-family="Outfit" font-weight="600">Bitwise AND Operation (5 & 3)</text>
            <rect x="50" y="45" width="100" height="30" rx="3" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
            <text x="100" y="65" fill="#f8fafc" font-size="11" font-family="JetBrains Mono" text-anchor="middle">5 = 0 1 0 1</text>
            
            <rect x="50" y="85" width="100" height="30" rx="3" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
            <text x="100" y="105" fill="#f8fafc" font-size="11" font-family="JetBrains Mono" text-anchor="middle">3 = 0 0 1 1</text>

            <text x="170" y="85" fill="#94a3b8" font-size="16" font-family="JetBrains Mono" text-anchor="middle">&amp;</text>

            <rect x="200" y="65" width="100" height="30" rx="3" fill="#1e295b" stroke="#10b981" stroke-width="2" />
            <text x="250" y="85" fill="#10b981" font-size="11" font-family="JetBrains Mono" text-anchor="middle">1 = 0 0 0 1</text>
          </svg>
    `,
    example1Title: "โปรแกรมตัวอย่างที่ 1: ตัวดำเนินการทางคณิตศาสตร์และการประเมินนิพจน์",
    example1Desc: "ทดสอบการรันการหาค่าเลขมอดุโล (หารเอาเศษ) และการใช้ Type Casting เพื่อเปลี่ยนชนิดข้อมูลจำนวนเต็มให้กลายเป็นทศนิยมในการหาร:",
    example1Code: `#include <stdio.h>

int main() {
    int x = 10, y = 3;
    int add = x + y;
    int mod = x % y;
    float div = (float)x / y; // แปลง x เป็น float ชั่วคราวเพื่อให้ได้ผลหารเป็นทศนิยม
    
    printf("Add: %d\\n", add);
    printf("Mod: %d\\n", mod);
    printf("Div: %.2f\\n", div);
    return 0;
}`,
    example2Title: "โปรแกรมตัวอย่างที่ 2: ตัวดำเนินการระดับบิต (Bitwise Operators) และการเติม Syntax",
    example2Desc: "ศึกษาความสัมพันธ์ของข้อมูลแบบบิตคู่ และกรอกตัวดำเนินการในตำแหน่งช่องว่างกล่องข้อความ เพื่อทำการหาค่าระดับบิต AND และ OR:",
    blanks: [
      { id: "blank1", label: "ตัวดำเนินการระดับบิต AND", placeholder: "พิมพ์คำตอบที่นี่...", answers: ["&"] },
      { id: "blank2", label: "ตัวดำเนินการระดับบิต OR", placeholder: "พิมพ์คำตอบที่นี่...", answers: ["|"] }
    ],
    example2RawCode: `#include <stdio.h>

int main() {
    int a = 5;  // Binary: 0101
    int b = 3;  // Binary: 0011
    
    // เติมตัวดำเนินการระดับบิต AND
    int and_res = a [BLANK1] b;
    
    // เติมตัวดำเนินการระดับบิต OR
    int or_res = a [BLANK2] b;
    
    printf("Bitwise AND result: %d\\n", and_res);
    printf("Bitwise OR result: %d\\n", or_res);
    return 0;
}`,
    example2SolutionCode: `#include <stdio.h>

int main() {
    int a = 5;  // Binary: 0101
    int b = 3;  // Binary: 0011
    
    int and_res = a & b;
    int or_res = a | b;
    
    printf("Bitwise AND result: %d\\n", and_res);
    printf("Bitwise OR result: %d\\n", or_res);
    return 0;
}`,
    challengeDesc: "พัฒนาโปรแกรมจำลองการควบคุมพอร์ต I/O (PORTB) ขนาด 8 บิต ของไมโครคอนโทรลเลอร์ โดยรับค่าสถานะเริ่มต้น (0-255) จากนั้นใช้ Bitwise Operators: 1) เปิด Relay 3 (Set Bit 3) ด้วย OR (|), 2) ปิด Valve 5 (Clear Bit 5) ด้วย AND (&) ร่วมกับ NOT (~), และ 3) สลับสถานะ LED 7 (Toggle Bit 7) ด้วย XOR (^) แสดงผลลัพธ์ฐาน 10 และฐาน 16 (0x%02X)",
    challengePlaceholder: `#include <stdio.h>

int main() {
    unsigned char portb;
    printf("Enter initial PORTB state (0-255): ");
    // เขียนโค้ด Bit Masking เพื่อควบคุม Bit 3, Bit 5 และ Bit 7 ที่นี่
    return 0;
}`,
    challengeSolutionCode: `#include <stdio.h>

int main() {
    unsigned char portb;
    printf("Enter initial PORTB state (0-255): ");
    if (scanf("%hhu", &portb) == 1) {
        portb = portb | (1 << 3);     // Set Bit 3 (Relay ON)
        portb = portb & ~(1 << 5);    // Clear Bit 5 (Valve OFF)
        portb = portb ^ (1 << 7);     // Toggle Bit 7 (LED Toggle)
        
        printf("\\n--- Updated PORTB Register Output ---\\n");
        printf("PORTB Decimal: %d\\n", portb);
        printf("PORTB Hex:     0x%02X\\n", portb);
        printf("Bit 3 (Relay): %s\\n", (portb & (1 << 3)) ? "ON" : "OFF");
        printf("Bit 5 (Valve): %s\\n", (portb & (1 << 5)) ? "ON" : "OFF");
        printf("Bit 7 (LED):   %s\\n", (portb & (1 << 7)) ? "ON" : "OFF");
    }
    return 0;
}`,
    question1: "1. ตัวดำเนินการเลื่อนบิต << (Left Shift) และ >> (Right Shift) ทำงานอย่างไร และมีผลลัพธ์สัมพันธ์กับการคูณ/หารอย่างไร?",
    question1Placeholder: "อธิบายหลักการเลื่อนบิต และความสัมพันธ์ของการเลื่อนบิตกับการเพิ่ม/ลดค่าทางคณิตศาสตร์...",
    question2: "2. เพราะเหตุใดนิพจน์ 5 / 2 ในภาษา C จึงคำนวณได้ 2 และหากต้องการผลลัพธ์ทศนิยม 2.5 ต้องเขียนโค้ดอย่างไร?",
    question2Placeholder: "อธิบายสาเหตุที่ได้เลขจำนวนเต็ม และวิธีการแปลงชนิดข้อมูล (Type Casting) เพื่อให้ได้ผลลัพธ์ทศนิยม...",
    conclusionPlaceholder: "สรุปสิ่งที่ได้รับจากการเรียนรู้ในบทที่ 2 และปัญหาเกี่ยวกับลำดับหรือระดับความละเอียดตัวดำเนินการ...",
    codeKeywords: ["&","\\|","\\^","<<","scanf","printf"],
    q1Keywords: ["เลื่อนบิต","คูณ","หาร","2"],
    q2Keywords: ["หาร","จำนวนเต็ม","casting","float","ทศนิยม"]
  },
  {
    num: "3",
    idName: "lab3",
    titleTh: "Lab 3: โครงสร้างแบบเลือกทำ (Conditionals)",
    titleEn: "Lab 3: Conditionals (if/switch)",
    sheetName: "Lab C 3 Submissions",
    folderName: "Lab C 3 Attachments",
    introTitle: "โครงสร้างควบคุมการตัดสินใจแบบมีเงื่อนไข (Conditionals)",
    introDesc: "ศึกษาและประยุกต์ใช้คำสั่งตรวจสอบเงื่อนไข if, else if, else และคำสั่งเลือกทำหลายทางเลือก switch-case",
    purpose: [
      "Understand the logic and syntax of conditional statements in C",
      "Can structure nested if-else statements correctly",
      "Understand the appropriate usage of switch-case compared to if-else"
    ],
    equipments: [
      { name: "GCC Compiler (MinGW)", desc: "ใช้แปลซอร์สโค้ดภาษา C (.c) เป็น Executable" },
      { name: "VS Code หรือ Text Editor", desc: "ใช้สำหรับเขียนและตรวจสอบไวยากรณ์ภาษา C" }
    ],
    theoryHtml: `
        <h2>3. โครงสร้างเงื่อนไขแบบต่างๆ ในภาษา C</h2>
        <p>โครงสร้างหลักแบ่งออกเป็น 2 แบบ ได้แก่:</p>
        <ol>
          <li><strong>โครงสร้างแบบ <code>if-else if-else</code>:</strong> เหมาะสำหรับการตรวจสอบช่วง หรือเงื่อนไขที่มีความซับซ้อน เช่น คะแนนสอบ หรือค่าภาษีเงินได้</li>
          <li><strong>โครงสร้างแบบ <code>switch-case</code>:</strong> เหมาะสำหรับกรณีที่มีตัวเลือกแน่นอนและจับคู่ตรงตัว (เช่น การแสดงผลตัวเลือกเมนู 1, 2, 3 หรือเทียบค่าตัวอักษร 'A', 'B')</li>
        </ol>
    `,
    diagramSvg: `
          <svg class="stages-diagram" viewBox="0 0 580 150">
            <rect x="20" y="50" width="100" height="40" rx="4" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
            <text x="70" y="75" fill="#f8fafc" font-size="11" font-family="Sarabun" text-anchor="middle">รับคะแนน (Score)</text>
            
            <line x1="120" y1="70" x2="160" y2="70" stroke="#94a3b8" stroke-width="2" marker-end="url(#arrow)" />

            <polygon points="160,70 210,40 260,70 210,100" fill="#1e293b" stroke="#f59e0b" stroke-width="2" />
            <text x="210" y="74" fill="#f8fafc" font-size="10" font-family="JetBrains Mono" text-anchor="middle">score >= 50</text>

            <line x1="260" y1="70" x2="330" y2="70" stroke="#10b981" stroke-width="2" marker-end="url(#arrow)" />
            <text x="295" y="62" fill="#10b981" font-size="10" font-family="Outfit" font-weight="600">YES</text>

            <rect x="330" y="50" width="90" height="40" rx="4" fill="#064e3b" stroke="#10b981" stroke-width="1.5" />
            <text x="375" y="75" fill="#10b981" font-size="11" font-family="Sarabun" text-anchor="middle" font-weight="600">ผ่าน (Pass)</text>

            <path d="M 210 100 L 210 130 L 330 130" fill="none" stroke="#ef4444" stroke-width="2" marker-end="url(#arrow)" />
            <text x="230" y="122" fill="#ef4444" font-size="10" font-family="Outfit" font-weight="600">NO</text>

            <rect x="330" y="110" width="90" height="30" rx="4" fill="#7f1d1d" stroke="#ef4444" stroke-width="1.5" />
            <text x="375" y="130" fill="#f8fafc" font-size="11" font-family="Sarabun" text-anchor="middle">ตก (Fail)</text>

            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#94a3b8" />
              </marker>
            </defs>
          </svg>
    `,
    example1Title: "โปรแกรมตัวอย่างที่ 1: การใช้โครงสร้างตรวจสอบเลขคู่/เลขคี่",
    example1Desc: "ศึกษาการใช้โครงสร้างแบบ if-else เพื่อตรวจสอบเศษเหลือในการตัดสินใจจำแนกประเภทตัวเลข:",
    example1Code: `#include <stdio.h>

int main() {
    int number;
    printf("Enter an integer: ");
    scanf("%d", &number);
    
    if (number % 2 == 0) {
        printf("%d is even number.\\n", number);
    } else {
        printf("%d is odd number.\\n", number);
    }
    return 0;
}`,
    example2Title: "โปรแกรมตัวอย่างที่ 2: โครงสร้างแบบ switch-case และการเติม Syntax",
    example2Desc: "ศึกษาการจับคู่ความเท่ากันของค่าเกรดตัวอักษร และกรอกคีย์เวิร์ดควบคุมในตำแหน่งช่องว่างกล่องข้อความ:",
    blanks: [
      { id: "blank1", label: "คีย์เวิร์ดสำหรับเริ่มการประเมิน switch", placeholder: "พิมพ์คำตอบที่นี่...", answers: ["switch"] },
      { id: "blank2", label: "คีย์เวิร์ดหยุดการทำงานเล็ดลอดเคส", placeholder: "พิมพ์คำตอบที่นี่...", answers: ["break"] }
    ],
    example2RawCode: `#include <stdio.h>

int main() {
    char grade;
    printf("Enter grade (A, B, C): ");
    scanf(" %c", &grade);
    
    // เติมคีย์เวิร์ดสำหรับเริ่มการประเมิน switch
    [BLANK1] (grade) {
        case 'A':
            printf("Excellent!\\n");
            break;
        case 'B':
            printf("Good job!\\n");
            // เติมคีย์เวิร์ดหยุดการทำงานเล็ดลอดเคส
            [BLANK2];
        default:
            printf("Try harder!\\n");
    }
    return 0;
}`,
    example2SolutionCode: `#include <stdio.h>

int main() {
    char grade;
    printf("Enter grade (A, B, C): ");
    scanf(" %c", &grade);
    
    switch (grade) {
        case 'A':
            printf("Excellent!\\n");
            break;
        case 'B':
            printf("Good job!\\n");
            break;
        default:
            printf("Try harder!\\n");
    }
    return 0;
}`,
    challengeDesc: "พัฒนาโปรแกรมควบคุมปั๊มน้ำในถังพักอุตสาหกรรม โดยรับค่าระดับน้ำ (0.0 - 100.0%) และรหัสโหมดการทำงาน (1: Auto, 2: Manual Drain, 3: Emergency Stop) โดยใช้ switch-case ตรวจสอบโหมด และใช้ if-else if ตรวจสอบระดับน้ำ: ถ้าน้อยกว่า 20% สั่ง Pump High, 20-80% สั่ง Pump Normal, มากกว่า 80% สั่ง Stop Pump",
    challengePlaceholder: `#include <stdio.h>

int main() {
    float waterLevel;
    int mode;
    printf("Enter Water Level (0.0 - 100.0%%): ");
    // รับค่าระดับน้ำและโหมดการทำงาน จากนั้นควบคุมระบบปั๊มที่นี่
    return 0;
}`,
    challengeSolutionCode: `#include <stdio.h>

int main() {
    float waterLevel;
    int mode;
    
    printf("Enter Water Level (0.0 - 100.0%%): ");
    if (scanf("%f", &waterLevel) == 1) {
        printf("Enter Mode (1: AUTO, 2: MANUAL DRAIN, 3: EMERGENCY STOP): ");
        if (scanf("%d", &mode) == 1) {
            printf("\\n--- System Control Status ---\\n");
            switch (mode) {
                case 1:
                    printf("Mode: AUTOMATIC CONTROL\\n");
                    if (waterLevel < 20.0f) {
                        printf("Water Status: LOW (%.1f%%) -> Pump Action: RUN HIGH SPEED\\n", waterLevel);
                    } else if (waterLevel <= 80.0f) {
                        printf("Water Status: OPTIMAL (%.1f%%) -> Pump Action: RUN NORMAL SPEED\\n", waterLevel);
                    } else {
                        printf("Water Status: FULL (%.1f%%) -> Pump Action: STOP PUMP\\n", waterLevel);
                    }
                    break;
                case 2:
                    printf("Mode: MANUAL DRAIN -> Drain Valve: OPEN\\n");
                    break;
                case 3:
                    printf("Mode: EMERGENCY STOP -> ALL PUMPS & VALVES SHUTDOWN!\\n");
                    break;
                default:
                    printf("Invalid Mode Selected!\\n");
            }
        }
    }
    return 0;
}`,
    question1: "1. ในการตรวจสอบเงื่อนไขคะแนนเกรด เพราะเหตุใดโครงสร้างแบบ if-else if-else จึงมีประสิทธิภาพดีกว่าการใช้ if เดี่ยวหลายๆ ตัวแยกกัน?",
    question1Placeholder: "อธิบายประสิทธิภาพการประมวลผลและการตรวจสอบเงื่อนไขที่ซ้ำซ้อนของการทำงานทั้งสองแบบ...",
    question2: "2. อธิบายหน้าที่ของคีย์เวิร์ด break ในคำสั่ง switch-case และผลลัพธ์จะเกิดความผิดพลาดอย่างไรหากเราลืมเขียนล้อมรอบ case?",
    question2Placeholder: "อธิบายบทบาทของคำสั่ง break และพฤติกรรมของโปรแกรม (Fall-through) หากไม่ใส่ break...",
    conclusionPlaceholder: "สรุปสิ่งที่ได้ศึกษาในบทนี้ เช่น การเขียนเงื่อนไขควบคุม และความแตกต่างในการจัดโครงสร้างโค้ดแบบเลือกทำ...",
    codeKeywords: ["if","else","switch","case","break","scanf","printf"],
    q1Keywords: ["ประสิทธิภาพ","ข้าม","ตรวจสอบ","เงื่อนไข"],
    q2Keywords: ["break","switch","fall-through","ไหล"]
  },
  {
    num: "4",
    idName: "lab4",
    titleTh: "Lab 4: โครงสร้างควบคุมแบบวนซ้ำ (Loops)",
    titleEn: "Lab 4: Loops & Nested Loops",
    sheetName: "Lab C 4 Submissions",
    folderName: "Lab C 4 Attachments",
    introTitle: "โครงสร้างควบคุมการวนซ้ำและการทำลูปซ้อนลูป",
    introDesc: "พัฒนาโปรแกรมวนซ้ำด้วยคำสั่ง for, while, do-while และทำความเข้าใจกับการซ้อนลูป (Nested Loops)",
    purpose: [
      "Understand the mechanics of loop controls (for, while, do-while) in C",
      "Understand differences and appropriate use cases of each loop type",
      "Capable of implementing nested loops to construct structured output formatting"
    ],
    equipments: [
      { name: "GCC Compiler (MinGW)", desc: "ใช้แปลซอร์สโค้ดภาษา C (.c) เป็น Executable" },
      { name: "VS Code หรือ Text Editor", desc: "ใช้สำหรับเขียนและตรวจสอบไวยากรณ์ภาษา C" }
    ],
    theoryHtml: `
        <h2>3. ลูปแบบหลักในภาษา C</h2>
        <ul>
          <li><strong>ลูป <code>for</code>:</strong> ใช้ในกรณีที่ทราบจำนวนรอบในการวนซ้ำที่แน่นอน เช่น วน 10 รอบ หรือวนตามขนาดของอาร์เรย์</li>
          <li><strong>ลูป <code>while</code>:</strong> ใช้เมื่อไม่ทราบจำนวนรอบที่แน่นอน แต่วนซ้ำตราบเท่าที่เงื่อนไขตรวจสอบยังคงเป็นจริง</li>
          <li><strong>ลูป <code>do-while</code>:</strong> คล้ายกับ while แต่รับประกันว่าคำสั่งภายในจะถูกรันอย่างน้อย 1 รอบเสมอ ก่อนทำการตรวจสอบเงื่อนไข</li>
        </ul>
    `,
    diagramSvg: `
          <svg class="stages-diagram" viewBox="0 0 580 150">
            <circle cx="60" cy="70" r="25" fill="#1e293b" stroke="#3b82f6" stroke-width="2" />
            <text x="60" y="74" fill="#f8fafc" font-size="11" font-family="Sarabun" text-anchor="middle">i = 0</text>

            <line x1="85" y1="70" x2="140" y2="70" stroke="#94a3b8" stroke-width="2" marker-end="url(#arrow)" />

            <polygon points="140,70 190,40 240,70 190,100" fill="#1e293b" stroke="#f59e0b" stroke-width="2" />
            <text x="190" y="74" fill="#f8fafc" font-size="11" font-family="JetBrains Mono" text-anchor="middle">i < N</text>

            <line x1="240" y1="70" x2="310" y2="70" stroke="#10b981" stroke-width="2" marker-end="url(#arrow)" />
            <text x="275" y="62" fill="#10b981" font-size="10" font-family="Outfit" font-weight="600">TRUE</text>

            <rect x="310" y="50" width="120" height="40" rx="4" fill="#1e293b" stroke="#10b981" stroke-width="1.5" />
            <text x="370" y="75" fill="#f8fafc" font-size="11" font-family="Sarabun" text-anchor="middle">รันโค้ดและพิมพ์ค่า</text>

            <path d="M 370 90 L 370 120 L 190 120 L 190 100" fill="none" stroke="#6366f1" stroke-width="2" marker-end="url(#arrow)" />
            <text x="280" y="115" fill="#a5b4fc" font-size="10" font-family="JetBrains Mono">i++ (ปรับค่า)</text>

            <path d="M 190 40 L 190 20 L 480 20 L 480 50" fill="none" stroke="#ef4444" stroke-width="2" marker-end="url(#arrow)" />
            <text x="310" y="15" fill="#ef4444" font-size="10" font-family="Outfit" font-weight="600">FALSE (จบการทำงาน)</text>

            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#94a3b8" />
              </marker>
            </defs>
          </svg>
    `,
    example1Title: "โปรแกรมตัวอย่างที่ 1: การใช้ลูป for ทวนซ้ำพิมพ์และหาผลรวม",
    example1Desc: "ศึกษาการใช้ลูปแบบกำหนดรอบการประมวลผลที่แน่นอน (for loop) เพื่อคำนวณสะสมผลรวมจาก 1 ถึง 5:",
    example1Code: `#include <stdio.h>

int main() {
    int sum = 0;
    for (int i = 1; i <= 5; i++) {
        printf("Round %d\\n", i);
        sum += i;
    }
    printf("Sum of 1 to 5 = %d\\n", sum);
    return 0;
}`,
    example2Title: "โปรแกรมตัวอย่างที่ 2: ลูปแบบตรวจสอบเงื่อนไข (while) และการเติม Syntax",
    example2Desc: "ศึกษาการทำซ้ำเงื่อนไขตราบเท่าที่เป็นจริง และกรอกรหัสอัปเดตตัวแปรนับรอบในช่องว่างกล่องข้อความ เพื่อป้องกัน Infinite Loop:",
    blanks: [
      { id: "blank1", label: "เงื่อนไขเมื่อ count <= 3", placeholder: "พิมพ์คำตอบที่นี่...", answers: ["count <= 3", "count<=3", "count < 4", "count<4"] },
      { id: "blank2", label: "การบวกเพิ่มค่าตัวแปรนับรอบ", placeholder: "พิมพ์คำตอบที่นี่...", answers: ["count++", "count ++", "++count", "count += 1", "count=count+1", "count = count + 1"] }
    ],
    example2RawCode: `#include <stdio.h>

int main() {
    int count = 1;
    
    // เติมเงื่อนไขเมื่อ count น้อยกว่าหรือเท่ากับ 3
    while ([BLANK1]) {
        printf("Count: %d\\n", count);
        
        // เติมการบวกเพิ่มค่าตัวแปรนับรอบ
        [BLANK2];
    }
    return 0;
}`,
    example2SolutionCode: `#include <stdio.h>

int main() {
    int count = 1;
    
    while (count <= 3) {
        printf("Count: %d\\n", count);
        count++;
    }
    return 0;
}`,
    challengeDesc: "พัฒนาโปรแกรมจำลองการสร้างสัญญาณ PWM ควบคุมมอเตอร์ โดยรับค่า Duty Cycle (0 - 100%) และจำนวนคาบเวลา N คาบ จากนั้นใช้ลูปซ้อนลูป (Nested Loops) พิมพ์กราฟิกรูปคลื่นสัญญาณพัลส์ดิจิทัล 1 และ 0 ในแต่ละคาบเวลาตามสัดส่วน Duty Cycle พร้อมคำนวณแรงดันไฟฟ้าเฉลี่ย",
    challengePlaceholder: `#include <stdio.h>

int main() {
    int dutyCycle, periods;
    printf("Enter PWM Duty Cycle (0 - 100%%): ");
    // รับค่า Duty Cycle และจำนวนคาบเวลา จากนั้นใช้ Nested Loop วาดสัญญาณ PWM ที่นี่
    return 0;
}`,
    challengeSolutionCode: `#include <stdio.h>

int main() {
    int dutyCycle, periods;
    printf("Enter PWM Duty Cycle (0 - 100%%): ");
    if (scanf("%d", &dutyCycle) == 1) {
        printf("Enter Number of Periods to generate (e.g. 5): ");
        if (scanf("%d", &periods) == 1) {
            int onUnits = dutyCycle / 10;
            int offUnits = 10 - onUnits;
            
            printf("\\n--- Generated PWM Signal Waves (%d%% Duty Cycle) ---\\n", dutyCycle);
            for (int p = 1; p <= periods; p++) {
                printf("Period %2d: [", p);
                for (int i = 0; i < onUnits; i++) {
                    printf("1");
                }
                for (int j = 0; j < offUnits; j++) {
                    printf("0");
                }
                printf("] Output Voltage ~ %.1f V\\n", (dutyCycle / 100.0f) * 5.0f);
            }
        }
    }
    return 0;
}`,
    question1: "1. อธิบายความแตกต่างของเงื่อนไขการตรวจสอบลูปของ while และ do-while ในการใช้งานจริง",
    question1Placeholder: "เปรียบเทียบลำดับการตรวจสอบเงื่อนไขก่อนหรือหลังการทำงาน และจำนวนรอบขั้นต่ำที่คำสั่งจะทำงาน...",
    question2: "2. อธิบายการทำงานและผลต่างของคำสั่ง break และ continue เมื่อเขียนควบคุมภายในตัวลูป",
    question2Placeholder: "อธิบายผลของการใช้ break และ continue ต่อรอบการทำงานของลูป...",
    conclusionPlaceholder: "สรุปผลการศึกษาโครงสร้างลูปซ้อนลูป และปัญหาที่พบบ่อยในการเขียนเงื่อนไขที่ไม่มีวันสิ้นสุด (Infinite Loop)...",
    codeKeywords: ["for|while","scanf","printf","\\*","\\\\n"],
    q1Keywords: ["ก่อน","หลัง","do-while","รอบ","อย่างน้อย"],
    q2Keywords: ["break","continue","ออก","ข้าม"]
  },
  {
    num: "5",
    idName: "lab5",
    titleTh: "Lab 5: ฟังก์ชันและการขอบเขตตัวแปร (Functions & Scope)",
    titleEn: "Lab 5: Functions & Scope",
    sheetName: "Lab C 5 Submissions",
    folderName: "Lab C 5 Attachments",
    introTitle: "การเขียนฟังก์ชันเพื่อจัดสรรโปรแกรมย่อย (Functions & Scope)",
    introDesc: "เรียนรู้การเขียนฟังก์ชันเพื่อแยกส่วนการทำงานของโค้ด การส่งพารามิเตอร์แบบ Call-by-Value และการใช้งานฟังก์ชันแบบเรียกตัวเอง (Recursion)",
    purpose: [
      "Understand functional modularity and programming structure with parameters",
      "Understand variable scope levels and stack frame call stacks",
      "Capable of constructing safe recursive functions without stack overflow"
    ],
    equipments: [
      { name: "GCC Compiler (MinGW)", desc: "ใช้แปลซอร์สโค้ดภาษา C (.c) เป็น Executable" },
      { name: "VS Code หรือ Text Editor", desc: "ใช้สำหรับเขียนและตรวจสอบไวยากรณ์ภาษา C" }
    ],
    theoryHtml: `
        <h2>3. โครงสร้างและการประกาศฟังก์ชันในภาษา C</h2>
        <p>ฟังก์ชันในภาษา C ประกอบด้วย 3 ส่วนสำคัญ:</p>
        <ol>
          <li><strong>ส่วนหัวประกาศ (Prototype):</strong> แนะนำโครงสร้างฟังก์ชันให้คอมไพเลอร์ทราบก่อนเขียน main()</li>
          <li><strong>ตัวฟังก์ชัน (Definition):</strong> โค้ดคำสั่งคำนวณจริงที่ถูกจัดวางไว้</li>
          <li><strong>การเรียกใช้ฟังก์ชัน (Call):</strong> สั่งประมวลผลและส่งพารามิเตอร์จากฟังก์ชันหลัก</li>
        </ol>
    `,
    diagramSvg: `
          <svg class="stages-diagram" viewBox="0 0 580 150">
            <text x="30" y="25" fill="#a5b4fc" font-size="12" font-family="Outfit" font-weight="600">Call Stack Visualization (Recursion)</text>
            
            <rect x="30" y="45" width="100" height="50" rx="4" fill="#1e293b" stroke="#3b82f6" stroke-width="2" />
            <text x="80" y="75" fill="#f8fafc" font-size="11" font-family="JetBrains Mono" text-anchor="middle">main()</text>
            <text x="80" y="115" fill="#94a3b8" font-size="10" font-family="Sarabun" text-anchor="middle">Active Frame</text>

            <line x1="130" y1="70" x2="170" y2="70" stroke="#94a3b8" stroke-width="2" marker-end="url(#arrow)" />

            <rect x="170" y="45" width="110" height="50" rx="4" fill="#1e293b" stroke="#f59e0b" stroke-width="2" />
            <text x="225" y="75" fill="#f8fafc" font-size="11" font-family="JetBrains Mono" text-anchor="middle">fact(3)</text>
            
            <line x1="280" y1="70" x2="320" y2="70" stroke="#94a3b8" stroke-width="2" marker-end="url(#arrow)" />

            <rect x="320" y="45" width="110" height="50" rx="4" fill="#1e293b" stroke="#10b981" stroke-width="2" />
            <text x="375" y="75" fill="#f8fafc" font-size="11" font-family="JetBrains Mono" text-anchor="middle">fact(2)</text>

            <line x1="430" y1="70" x2="470" y2="70" stroke="#94a3b8" stroke-width="2" marker-end="url(#arrow)" />

            <rect x="470" y="45" width="90" height="50" rx="4" fill="#311212" stroke="#ef4444" stroke-width="2" />
            <text x="515" y="75" fill="#f8fafc" font-size="11" font-family="JetBrains Mono" text-anchor="middle">fact(1)</text>
            <text x="515" y="115" fill="#ef4444" font-size="9" font-family="Sarabun" text-anchor="middle">Base Case (= 1)</text>
          </svg>
    `,
    example1Title: "โปรแกรมตัวอย่างที่ 1: การใช้ฟังก์ชันหาผลรวมเลขจำนวนเต็ม",
    example1Desc: "ศึกษาการแยกคำสั่งย่อยออกจากฟังก์ชันหลัก (main) และการส่งคืนค่ากลับ (Return Value):",
    example1Code: `#include <stdio.h>

// 1. ประกาศตัวต้นแบบ (Prototype)
int addNumbers(int a, int b);

int main() {
    // 2. เรียกใช้งานฟังก์ชัน
    int result = addNumbers(5, 7);
    printf("Result = %d\\n", result);
    return 0;
}

// 3. เขียนนิยามฟังก์ชันย่อย (Definition)
int addNumbers(int a, int b) {
    return a + b;
}`,
    example2Title: "โปรแกรมตัวอย่างที่ 2: ฟังก์ชันเรียกตัวเอง (Recursion) และการเติม Syntax",
    example2Desc: "ศึกษาการประมวลผลเลขยกกำลังแบบวนทำลายพารามิเตอร์ซ้อน และระบุตัวส่งเงื่อนไขกรณีฐานในช่องว่างกล่องข้อความ:",
    blanks: [
      { id: "blank1", label: "เงื่อนไข Base Case เมื่อ exp == 0", placeholder: "พิมพ์คำตอบที่นี่...", answers: ["exp == 0", "exp==0", "exp <= 0", "exp<=0"] },
      { id: "blank2", label: "การเรียก Recursion ย่อยรอบ", placeholder: "พิมพ์คำตอบที่นี่...", answers: ["power(base, exp - 1)", "power(base,exp-1)", "power(base, exp-1)"] }
    ],
    example2RawCode: `#include <stdio.h>

// ฟังก์ชันคำนวณหาค่าเลขยกกำลัง base^exp
int power(int base, int exp) {
    // เติมกรณีฐาน (Base Case) เมื่อยกกำลัง 0 ให้ส่งค่ากลับเป็น 1
    if ([BLANK1]) {
        return 1;
    }
    // เติมการเรียกตัวเอง Recursion ย่อยรอบลงไป
    return base * [BLANK2];
}

int main() {
    printf("2^3 = %d\\n", power(2, 3));
    return 0;
}`,
    example2SolutionCode: `#include <stdio.h>

int power(int base, int exp) {
    if (exp == 0) {
        return 1;
    }
    return base * power(base, exp - 1);
}

int main() {
    printf("2^3 = %d\\n", power(2, 3));
    return 0;
}`,
    challengeDesc: "พัฒนาโปรแกรมภาษา C สำหรับระบบวัดค่าเซนเซอร์ โดยสร้าง 2 ฟังก์ชัน: 1) calibrateTemperature(int rawADC) คำนวณแปลงค่า ADC เป็นอุณหภูมิองศาเซลเซียส และ 2) updateMinMax(float temp, float *minTemp, float *maxTemp) อัปเดตค่าอุณหภูมิต่ำสุด-สูงสุดผ่าน Call-by-Reference",
    challengePlaceholder: `#include <stdio.h>

float calibrateTemperature(int rawADC) {
    // แปลงค่า rawADC เป็น Celsius แล้ว return
}

void updateMinMax(float temp, float *minTemp, float *maxTemp) {
    // อัปเดตค่า minTemp และ maxTemp ผ่าน Pointer
}

int main() {
    // รับค่า ADC 3 แซมเปิล เรียกใช้ฟังก์ชัน และแสดงผลลัพธ์
    return 0;
}`,
    challengeSolutionCode: `#include <stdio.h>

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
        
        printf("\\n--- Sensor Calibration Results ---\\n");
        printf("Sample 1: %.2f C\\n", t1);
        printf("Sample 2: %.2f C\\n", t2);
        printf("Sample 3: %.2f C\\n", t3);
        printf("Average Temp: %.2f C\\n", avgT);
        printf("Min Temp: %.2f C, Max Temp: %.2f C\\n", minT, maxT);
    }
    return 0;
}`,
    question1: "1. การส่งค่าพารามิเตอร์แบบ Call-by-Value และ Call-by-Reference ในภาษา C แตกต่างกันอย่างไร?",
    question1Placeholder: "อธิบายกลไกการส่งผ่านข้อมูลของตัวแปรต้นทางและการส่งแอดเดรสที่มีผลต่อการเปลี่ยนแปลงค่าจริง...",
    question2: "2. เพราะเหตุใดฟังก์ชันแบบเรียกตัวเอง (Recursion) จึงต้องกำหนดกรณีฐาน (Base Case) ไว้ และหากไม่มีจะเกิดอะไรขึ้น?",
    question2Placeholder: "อธิบายหน้าที่ของ Base Case ในการหยุดการทำงาน และผลกระทบต่อหน่วยความจำ Stack หากโปรแกรมเรียกตัวเองไม่สิ้นสุด...",
    conclusionPlaceholder: "วิเคราะห์ประโยชน์ของการแยกงานเป็นฟังก์ชันและข้อดีข้อเสียของโค้ดแบบ Recursive...",
    codeKeywords: ["float|void|double","return","scanf","printf","&|\\*"],
    q1Keywords: ["value","reference","copy","address","ตัวแปรเดิม"],
    q2Keywords: ["base case","กรณีฐาน","ล้น","infinite","stack overflow"]
  },
  {
    num: "6",
    idName: "lab6",
    titleTh: "Lab 6: อาร์เรย์และสตริง (Arrays & Strings)",
    titleEn: "Lab 6: Arrays & Strings",
    sheetName: "Lab C 6 Submissions",
    folderName: "Lab C 6 Attachments",
    introTitle: "อาร์เรย์และสตริงการจัดการโครงสร้างข้อมูลแบบกล่องจัดเรียง",
    introDesc: "จัดการข้อมูลลำดับชุดอาร์เรย์ 1 มิติ 2 มิติ และการใช้งานสตริง (อาร์เรย์ตัวอักษร) พร้อมฟังก์ชันในห้องสมุด <string.h>",
    purpose: [
      "Understand allocation, indexing and array structures in C (1D/2D)",
      "Understand C character arrays and difference with standard data structures",
      "Capable of processing strings, character iterations and reverse formatting"
    ],
    equipments: [
      { name: "GCC Compiler (MinGW)", desc: "ใช้แปลซอร์สโค้ดภาษา C (.c) เป็น Executable" },
      { name: "VS Code หรือ Text Editor", desc: "ใช้สำหรับเขียนและตรวจสอบไวยากรณ์ภาษา C" }
    ],
    theoryHtml: `
        <h2>3. สตริงในภาษา C (Null-terminated Strings)</h2>
        <p>ภาษา C ไม่มีชนิดข้อมูล String โดยตรงเหมือนภาษาอื่น แต่จะเก็บในรูปของ <code>อาร์เรย์ตัวอักษร (char array)</code> ซึ่งต้องมีขนาดใหญ่กว่าความยาวของข้อความจริง 1 ช่อง เพื่อจัดเก็บอักขระพิเศษ <code>'\\0'</code> (Null Character) ที่ใช้ระบุจุดสิ้นสุดของข้อความ</p>
    `,
    diagramSvg: `
          <svg class="stages-diagram" viewBox="0 0 580 150">
            <text x="30" y="25" fill="#a5b4fc" font-size="12" font-family="Outfit" font-weight="600">String "Hello" in Memory Array</text>
            
            <g transform="translate(30, 45)">
              <rect x="0" y="0" width="50" height="50" fill="#1e293b" stroke="#6366f1" stroke-width="2" />
              <text x="25" y="30" fill="#f8fafc" font-size="14" font-family="JetBrains Mono" text-anchor="middle">'H'</text>
              <text x="25" y="65" fill="#94a3b8" font-size="10" font-family="JetBrains Mono" text-anchor="middle">str[0]</text>
              
              <rect x="50" y="0" width="50" height="50" fill="#1e293b" stroke="#6366f1" stroke-width="2" />
              <text x="75" y="30" fill="#f8fafc" font-size="14" font-family="JetBrains Mono" text-anchor="middle">'e'</text>
              <text x="75" y="65" fill="#94a3b8" font-size="10" font-family="JetBrains Mono" text-anchor="middle">str[1]</text>

              <rect x="100" y="0" width="50" height="50" fill="#1e293b" stroke="#6366f1" stroke-width="2" />
              <text x="125" y="30" fill="#f8fafc" font-size="14" font-family="JetBrains Mono" text-anchor="middle">'l'</text>
              <text x="125" y="65" fill="#94a3b8" font-size="10" font-family="JetBrains Mono" text-anchor="middle">str[2]</text>

              <rect x="150" y="0" width="50" height="50" fill="#1e293b" stroke="#6366f1" stroke-width="2" />
              <text x="175" y="30" fill="#f8fafc" font-size="14" font-family="JetBrains Mono" text-anchor="middle">'l'</text>
              <text x="175" y="65" fill="#94a3b8" font-size="10" font-family="JetBrains Mono" text-anchor="middle">str[3]</text>

              <rect x="200" y="0" width="50" height="50" fill="#1e293b" stroke="#6366f1" stroke-width="2" />
              <text x="225" y="30" fill="#f8fafc" font-size="14" font-family="JetBrains Mono" text-anchor="middle">'o'</text>
              <text x="225" y="65" fill="#94a3b8" font-size="10" font-family="JetBrains Mono" text-anchor="middle">str[4]</text>

              <rect x="250" y="0" width="60" height="50" fill="#311212" stroke="#ef4444" stroke-width="2" />
              <text x="280" y="30" fill="#ef4444" font-size="14" font-family="JetBrains Mono" text-anchor="middle">'\\0'</text>
              <text x="280" y="65" fill="#ef4444" font-size="10" font-family="JetBrains Mono" text-anchor="middle">str[5]</text>
            </g>
          </svg>
    `,
    example1Title: "โปรแกรมตัวอย่างที่ 1: การใช้และแสดงผลข้อมูลชุดอาร์เรย์ 1 มิติ",
    example1Desc: "ศึกษาโปรแกรมการจัดเก็บข้อมูลคะแนนสอบ และเรียกแสดงผลด้วยการวนซ้ำตามดัชนี (Index):",
    example1Code: `#include <stdio.h>

int main() {
    int scores[5] = {85, 90, 78, 92, 88};
    for (int i = 0; i < 5; i++) {
        printf("Student %d score: %d\\n", i + 1, scores[i]);
    }
    return 0;
}`,
    example2Title: "โปรแกรมตัวอย่างที่ 2: สตริงอาร์เรย์ตัวอักษรและการเติม Syntax",
    example2Desc: "ศึกษาการใช้สตริงอาร์เรย์ และระบุประเภทชนิดของข้อมูลและฟอร์แมตตัวแปรในช่องว่างกล่องข้อความ เพื่อรับข้อมูลชื่อ:",
    blanks: [
      { id: "blank1", label: "ประเภทชนิดข้อมูลอาร์เรย์ตัวอักษร", placeholder: "พิมพ์คำตอบที่นี่...", answers: ["char"] },
      { id: "blank2", label: "Format Specifier สำหรับสตริง", placeholder: "พิมพ์คำตอบที่นี่...", answers: ["%s", "%29s"] }
    ],
    example2RawCode: `#include <stdio.h>

int main() {
    // ประกาศประเภทข้อมูลอาร์เรย์ตัวอักษรสำหรับเก็บชื่อ
    [BLANK1] name[30];
    
    printf("Enter your name: ");
    // เติม Format Specifier สำหรับตัวแปรสายอักษร
    scanf("[BLANK2]", name);
    
    printf("Hello, %s!\\n", name);
    return 0;
}`,
    example2SolutionCode: `#include <stdio.h>

int main() {
    char name[30];
    
    printf("Enter your name: ");
    scanf("%s", name);
    
    printf("Hello, %s!\\n", name);
    return 0;
}`,
    challengeDesc: "พัฒนาโปรแกรมภาษา C บันทึกประวัติกระแสไฟฟ้ามอเตอร์ 5 ค่าลงในอาร์เรย์ float currentLog[5] จากนั้นคำนวณ: 1) กระแสไฟฟ้าเฉลี่ย (Average Current), 2) กระแสไฟฟ้าสูงสุด (Peak Current) และ 3) ตรวจสอบเงื่อนไขแจ้งเตือน [OVERLOAD WARNING!] หากค่า Peak เกิน 15.0 A",
    challengePlaceholder: `#include <stdio.h>

int main() {
    float currentLog[5];
    // รับค่ากระแสไฟฟ้า 5 ค่าลงในอาร์เรย์ คำนวณค่าเฉลี่ย หาค่า Peak และตรวจสอบ Overload
    return 0;
}`,
    challengeSolutionCode: `#include <stdio.h>

int main() {
    float currentLog[5];
    float sum = 0.0f, maxCurrent = 0.0f;
    
    printf("Enter 5 Motor Current Samples (Amp):\\n");
    for (int i = 0; i < 5; i++) {
        printf("Sample [%d]: ", i + 1);
        if (scanf("%f", &currentLog[i]) != 1) return 1;
        sum += currentLog[i];
        if (currentLog[i] > maxCurrent) {
            maxCurrent = currentLog[i];
        }
    }
    
    float avgCurrent = sum / 5.0f;
    printf("\\n--- Motor Current Analysis ---\\n");
    printf("Average Current: %.2f A\\n", avgCurrent);
    printf("Peak Current:    %.2f A\\n", maxCurrent);
    
    if (maxCurrent > 15.0f) {
        printf("Status: [OVERLOAD WARNING] Current exceeded 15.0A safe threshold!\\n");
    } else {
        printf("Status: [NORMAL] Motor operating within safe current limits.\\n");
    }
    
    return 0;
}`,
    question1: "1. สตริงในภาษา C แตกต่างจากอาร์เรย์ชนิด char ทั่วไปอย่างไร และตัวอักษร '\\0' (Null character) มีความสำคัญอย่างไร?",
    question1Placeholder: "อธิบายลักษณะของข้อมูลและสัญลักษณ์ระบุการสิ้นสุดข้อความ (Null-terminator) ของสตริง...",
    question2: "2. การจองขนาดพื้นที่อาร์เรย์แบบคงที่ (Static Array) เช่น int score[5]; มีข้อดีและข้อจำกัดอย่างไรในการทำงานจริง?",
    question2Placeholder: "วิเคราะห์ข้อดีด้านการเข้าถึงข้อมูลผ่านดัชนี (Index) และข้อจำกัดด้านขนาดหน่วยความจำคงที่ (Fixed size)...",
    conclusionPlaceholder: "เขียนสรุปความเข้าใจที่ได้รับเกี่ยวกับมิติของอาร์เรย์ และการเข้าถึงข้อมูลตัวชี้อาร์เรย์...",
    codeKeywords: ["\\[\\]","for|while","scanf","printf","float|int"],
    q1Keywords: ["1 มิติ","2 มิติ","แถว","คอลัมน์","ตาราง","\\0","null"],
    q2Keywords: ["\\0","null","จบ","array","character","static"]
  },
  {
    num: "7",
    idName: "lab7",
    titleTh: "Lab 7: พอยน์เตอร์และการจัดการหน่วยความจำพลวัต",
    titleEn: "Lab 7: Pointers & Memory Management",
    sheetName: "Lab C 7 Submissions",
    folderName: "Lab C 7 Attachments",
    introTitle: "เรียนรู้พอยน์เตอร์และการจองหน่วยความจำแบบไดนามิก",
    introDesc: "ทำความเข้าใจเกี่ยวกับตัวชี้หน่วยความจำ (Pointers), การดำเนินการกับพอยน์เตอร์ และการจัดสรรหน่วยความจำแบบพลวัตด้วย malloc() และ free()",
    purpose: [
      "Understand concepts of pointer addresses (&, *) and memory dereferencing",
      "Understand argument passing with address references (Call-by-Reference)",
      "Capable of implementing heap memory management using dynamic structures (malloc/free)"
    ],
    equipments: [
      { name: "GCC Compiler (MinGW)", desc: "ใช้แปลซอร์สโค้ดภาษา C (.c) เป็น Executable" },
      { name: "VS Code หรือ Text Editor", desc: "ใช้สำหรับเขียนและตรวจสอบไวยากรณ์ภาษา C" }
    ],
    theoryHtml: `
        <h2>3. หน่วยความจำ Heap vs Stack และคำสั่งจองหน่วยความจำพลวัต</h2>
        <p>หน่วยความจำจะจัดแบ่งพื้นที่การทำงานหลักสองแบบ:</p>
        <ul>
          <li><strong>Stack Memory:</strong> จองข้อมูลตัวแปรทั่วไปโดยอัตโนมัติเมื่อประกาศตัวแปรในฟังก์ชัน มีข้อจำกัดด้านขนาดและอายุการใช้งาน</li>
          <li><strong>Heap Memory:</strong> พื้นที่ว่างของระบบสำหรับจองพื้นที่ขนาดใหญ่ตามผู้เขียนกำหนด สามารถขยายและลบได้โดยใช้คำสั่ง <code>malloc()</code> หรือ <code>calloc()</code> และคืนที่ว่างด้วย <code>free()</code></li>
        </ul>
    `,
    diagramSvg: `
          <svg class="stages-diagram" viewBox="0 0 580 150">
            <text x="30" y="25" fill="#a5b4fc" font-size="12" font-family="Outfit" font-weight="600">Pointer Concept (*ptr points to variable x)</text>
            
            <rect x="50" y="55" width="100" height="40" rx="4" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
            <text x="100" y="75" fill="#f8fafc" font-size="11" font-family="JetBrains Mono" text-anchor="middle">x = 42</text>
            <text x="100" y="115" fill="#94a3b8" font-size="10" font-family="JetBrains Mono" text-anchor="middle">Addr: 0x7ffd</text>

            <rect x="250" y="55" width="120" height="40" rx="4" fill="#1e293b" stroke="#10b981" stroke-width="1.5" />
            <text x="310" y="75" fill="#f8fafc" font-size="11" font-family="JetBrains Mono" text-anchor="middle">ptr = 0x7ffd</text>
            <text x="310" y="115" fill="#94a3b8" font-size="10" font-family="JetBrains Mono" text-anchor="middle">Addr: 0x7fff</text>

            <path d="M 250 75 L 160 75" fill="none" stroke="#f59e0b" stroke-width="2.5" marker-end="url(#arrow)" />
            <text x="205" y="62" fill="#f59e0b" font-size="10" font-family="JetBrains Mono" text-anchor="middle">*ptr</text>

            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#f59e0b" />
              </marker>
            </defs>
          </svg>
    `,
    example1Title: "โปรแกรมตัวอย่างที่ 1: การใช้และอ้างอิงตำแหน่งหน่วยความจำผ่านพอยน์เตอร์",
    example1Desc: "ศึกษาการใช้เครื่องหมาย & เพื่อดึงตำแหน่ง และ * เพื่อดึงค่าจริงจากตำแหน่งหน่วยความจำที่ชี้ไป:",
    example1Code: `#include <stdio.h>

int main() {
    int x = 100;
    int *ptr = &x; // ptr เก็บที่อยู่ (Address) ของ x
    
    printf("Value of x: %d\\n", x);
    printf("Address of x: %p\\n", &x);
    printf("Value of ptr (Address): %p\\n", ptr);
    printf("Value pointed by ptr (*ptr): %d\\n", *ptr);
    return 0;
}`,
    example2Title: "โปรแกรมตัวอย่างที่ 2: การจองหน่วยความจำพลวัตและการเติม Syntax",
    example2Desc: "ศึกษาการจองข้อมูลแบบแมนนวลด้วย malloc() และเติมคำสั่งคืนพื้นที่ในช่องว่างกล่องข้อความ เพื่อความปลอดภัย:",
    blanks: [
      { id: "blank1", label: "คำสั่งจองพื้นที่ขนาด int 1 ช่อง", placeholder: "พิมพ์คำตอบที่นี่...", answers: ["malloc(sizeof(int))", "malloc(sizeof (int))", "malloc(4)"] },
      { id: "blank2", label: "คำสั่งคืนหน่วยความจำให้ระบบ", placeholder: "พิมพ์คำตอบที่นี่...", answers: ["free(p)", "free( p )"] }
    ],
    example2RawCode: `#include <stdio.h>
#include <stdlib.h>

int main() {
    int *p;
    
    // เติมคำสั่งสำหรับจองพื้นที่ขนาด int 1 ช่อง
    p = (int *)[BLANK1];
    
    if (p == NULL) {
        printf("Memory allocation failed!\\n");
        return 1;
    }
    
    *p = 500;
    printf("Value in allocated memory: %d\\n", *p);
    
    // เติมคำสั่งคืนหน่วยความจำให้กับระบบเพื่อลดปัญหา Memory leak
    [BLANK2];
    return 0;
}`,
    example2SolutionCode: `#include <stdio.h>
#include <stdlib.h>

int main() {
    int *p;
    
    p = (int *)malloc(sizeof(int));
    
    if (p == NULL) {
        printf("Memory allocation failed!\\n");
        return 1;
    }
    
    *p = 500;
    printf("Value in allocated memory: %d\\n", *p);
    
    free(p);
    return 0;
}`,
    challengeDesc: "พัฒนาโปรแกรมจัดสรรบัฟเฟอร์หน่วยความจำพลวัต (Dynamic Sensor Buffer) โดยรับจำนวนขนาดบัฟเฟอร์ N ตัวอย่าง ใช้ malloc() จองพื้นที่ใน Heap สำหรับ float N ตัว รับค่าและคำนวณค่าเฉลี่ยผ่านพอยน์เตอร์ จากนั้นคืนหน่วยความจำด้วย free() เพื่อป้องกัน Memory Leak",
    challengePlaceholder: `#include <stdio.h>
#include <stdlib.h>

int main() {
    int n;
    printf("Enter number of sensor samples to record (N): ");
    // ใช้ malloc() จองพื้นที่ Heap, รับค่าผ่าน Pointer, คำนวณค่าเฉลี่ย และ free()
    return 0;
}`,
    challengeSolutionCode: `#include <stdio.h>
#include <stdlib.h>

int main() {
    int n;
    printf("Enter number of sensor samples to record (N): ");
    if (scanf("%d", &n) == 1 && n > 0) {
        float *buffer = (float *)malloc(n * sizeof(float));
        if (buffer == NULL) {
            printf("Memory allocation failed!\\n");
            return 1;
        }
        
        printf("Enter %d sensor readings:\\n", n);
        float sum = 0.0f;
        for (int i = 0; i < n; i++) {
            printf("Reading #%d: ", i + 1);
            if (scanf("%f", buffer + i) == 1) {
                sum += *(buffer + i);
            }
        }
        
        printf("\\n--- Dynamic Buffer Processing ---\\n");
        printf("Allocated Memory: %zu Bytes\\n", n * sizeof(float));
        printf("Processed Average: %.2f\\n", sum / n);
        
        free(buffer);
        buffer = NULL;
        printf("Memory successfully released (Heap freed).\\n");
    }
    return 0;
}`,
    question1: "1. ตัวดำเนินการสัญลักษณ์ * (Dereference operator) และ & (Address-of operator) มีความสัมพันธ์และต่างกันอย่างไรในพอยน์เตอร์?",
    question1Placeholder: "อธิบายหน้าที่ของเครื่องหมายทั้งสองในการเข้าถึงตำแหน่งแอดเดรสและการอ่าน/เขียนค่าข้อมูลในหน่วยความจำ...",
    question2: "2. อธิบายเหตุผลสำคัญในการต้องเรียกคำสั่ง free() คืนหน่วยความจำหลังสิ้นสุดการใช้งาน และหากลืมจะเกิดความผิดพลาดใด?",
    question2Placeholder: "อธิบายการคืนพื้นที่หน่วยความจำ Heap ให้กับระบบ และผลกระทบที่เรียกว่า Memory Leak...",
    conclusionPlaceholder: "สรุปสิ่งที่เรียนรู้เกี่ยวกับแนวคิด RAM, Pointer และความสำคัญของการระมัดระวังข้อผิดพลาดของการใช้พอยน์เตอร์...",
    codeKeywords: ["\\*","&","malloc","free","scanf|printf"],
    q1Keywords: ["&","\\*","address","ชี้","ค่า","ตำแหน่ง"],
    q2Keywords: ["free","leak","หน่วยความจำ","คืน","ram"]
  },
  {
    num: "8",
    idName: "lab8",
    titleTh: "Lab 8: โครงสร้างข้อมูลกำหนดเอง (Structures & Unions)",
    titleEn: "Lab 8: Structures & Unions",
    sheetName: "Lab C 8 Submissions",
    folderName: "Lab C 8 Attachments",
    introTitle: "โครงสร้างข้อมูลแบบประยุกต์ใช้จัดกลุ่มตัวแปร (Structures & Unions)",
    introDesc: "ศึกษาการสร้างและประยุกต์ใช้โครงสร้างข้อมูลแบบ struct และ union ในการจัดเก็บข้อมูลที่มีชนิดข้อมูลแตกต่างกัน",
    purpose: [
      "Understand struct and union definitions, alignments and structural concepts",
      "Capable of passing structure types into modular functions and arrays",
      "Understand differences between structural memory segments and overlapping union spaces"
    ],
    equipments: [
      { name: "GCC Compiler (MinGW)", desc: "ใช้แปลซอร์สโค้ดภาษา C (.c) เป็น Executable" },
      { name: "VS Code หรือ Text Editor", desc: "ใช้สำหรับเขียนและตรวจสอบไวยากรณ์ภาษา C" }
    ],
    theoryHtml: `
        <h2>3. ความแตกต่างในการจัดสรรหน่วยความจำ</h2>
        <ul>
          <li><strong>โครงสร้างแบบ <code>struct</code>:</strong> จองขนาดหน่วยความจำแยกทีละตัวแปรสมาชิกและเอาผลรวมมารวมกัน (อาจมีการปัดขนาดไบต์ - Padding)</li>
          <li><strong>โครงสร้างแบบ <code>union</code>:</strong> ตัวแปรสมาชิกทุกตัวจะแชร์ตำแหน่งเริ่มต้น (Start Address) และจองหน่วยความจำเท่ากับสมาชิกตัวที่ <code>ใหญ่ที่สุด</code> เท่านั้น</li>
        </ul>
    `,
    diagramSvg: `
          <svg class="stages-diagram" viewBox="0 0 580 150">
            <text x="30" y="25" fill="#a5b4fc" font-size="12" font-family="Outfit" font-weight="600">Struct vs Union Memory Layout</text>
            
            <g transform="translate(30, 45)">
              <text x="0" y="-8" fill="#f8fafc" font-size="11" font-family="Outfit" font-weight="600">struct Layout (Parallel)</text>
              <rect x="0" y="0" width="50" height="35" rx="3" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
              <text x="25" y="20" fill="#3b82f6" font-size="10" font-family="JetBrains Mono" text-anchor="middle">char c</text>
              <rect x="50" y="0" width="120" height="35" rx="3" fill="#1e293b" stroke="#10b981" stroke-width="1.5" />
              <text x="110" y="20" fill="#10b981" font-size="10" font-family="JetBrains Mono" text-anchor="middle">int val (4B)</text>
              <text x="85" y="50" fill="#94a3b8" font-size="9" font-family="Sarabun" text-anchor="middle">รวมเนื้อที่ = แยกขนาดจอง</text>
            </g>

            <g transform="translate(300, 45)">
              <text x="0" y="-8" fill="#f8fafc" font-size="11" font-family="Outfit" font-weight="600">union Layout (Overlapping)</text>
              <rect x="0" y="0" width="150" height="35" rx="3" fill="#1e293b" stroke="#ef4444" stroke-width="2" />
              <text x="75" y="15" fill="#f8fafc" font-size="9" font-family="JetBrains Mono" text-anchor="middle">char c (1B) [starts at 0]</text>
              <text x="75" y="28" fill="#ef4444" font-size="9" font-family="JetBrains Mono" text-anchor="middle">int val (4B) [starts at 0]</text>
              <text x="75" y="50" fill="#94a3b8" font-size="9" font-family="Sarabun" text-anchor="middle">รวมเนื้อที่ = ขนาดตัวใหญ่สุด (4B)</text>
            </g>
          </svg>
    `,
    example1Title: "โปรแกรมตัวอย่างที่ 1: การใช้โครงสร้างข้อมูล struct บันทึกพิกัดจุด",
    example1Desc: "ศึกษาการรวมตัวแปรต่างสัญชาติตระกูลเป็นโครงสร้างชนิดเดียวกัน และการนำมาสร้างจุดพิกัดทางคณิตศาสตร์:",
    example1Code: `#include <stdio.h>

struct Point {
    int x;
    int y;
};

int main() {
    struct Point p1 = {10, 20};
    printf("Point coordinates: (%d, %d)\\n", p1.x, p1.y);
    return 0;
}`,
    example2Title: "โปรแกรมตัวอย่างที่ 2: การนิยามสมาชิกและการจอง และการเติม Syntax",
    example2Desc: "ศึกษาการดึงตัวแปรและข้อมูลภายใน struct มาประมวลผล และกรอกคำสั่งสมาชิกในช่องว่างกล่องข้อความ:",
    blanks: [
      { id: "blank1", label: "ประกาศและกำหนดค่าเริ่มต้นโครงสร้าง User", placeholder: "พิมพ์คำตอบที่นี่...", answers: ["struct User"] },
      { id: "blank2", label: "การเข้าถึงตัวแปร username ด้านใน struct", placeholder: "พิมพ์คำตอบที่นี่...", answers: ["user1.username"] }
    ],
    example2RawCode: `#include <stdio.h>

// นิยามโครงสร้างผู้ใช้งานระบบ
struct User {
    int id;
    char username[20];
};

int main() {
    // ประกาศและกำหนดค่าเริ่มต้นลงตัวแปรโครงสร้าง User
    [BLANK1] user1 = {101, "admin"};
    
    // เติมการเข้าถึงตัวแปร username ด้านใน struct
    printf("User ID: %d, Name: %s\\n", user1.id, [BLANK2]);
    return 0;
}`,
    example2SolutionCode: `#include <stdio.h>

struct User {
    int id;
    char username[20];
};

int main() {
    struct User user1 = {101, "admin"};
    printf("User ID: %d, Name: %s\\n", user1.id, user1.username);
    return 0;
}`,
    challengeDesc: "พัฒนาโครงสร้างข้อมูลโหนดเซนเซอร์ IoT struct SensorNode ประกอบด้วย: int nodeID, float temperature, float humidity, int relayActive จากนั้นสร้างฟังก์ชัน displayTelemetry รับพอยน์เตอร์โครงสร้าง (struct SensorNode *node) เพื่อแสดงผลค่าโทรมาตรผ่านตัวดำเนินการ ->",
    challengePlaceholder: `#include <stdio.h>

struct SensorNode {
    // ประกาศสมาชิกโหนดเซนเซอร์ที่นี่
};

void displayTelemetry(const struct SensorNode *node) {
    // แสดงผลข้อมูลผ่านตัวดำเนินการ ->
}

int main() {
    // รับค่าโหนดเซนเซอร์ เรียกใช้ displayTelemetry
    return 0;
}`,
    challengeSolutionCode: `#include <stdio.h>

struct SensorNode {
    int nodeID;
    float temperature;
    float humidity;
    int relayActive;
};

void displayTelemetry(const struct SensorNode *node) {
    printf("\\n--- IoT Telemetry Packet Report ---\\n");
    printf("Sensor Node ID:  #%04d\\n", node->nodeID);
    printf("Ambient Temp:    %.2f C\\n", node->temperature);
    printf("Relative Humid:  %.2f %%\\n", node->humidity);
    printf("Relay Status:    %s\\n", node->relayActive ? "ACTIVATED [ON]" : "STANDBY [OFF]");
    printf("Total Struct Size: %zu Bytes\\n", sizeof(struct SensorNode));
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
}`,
    question1: "1. อธิบายความแตกต่างที่สำคัญของการทำงานและการจองตำแหน่งหน่วยความจำระหว่าง struct และ union",
    question1Placeholder: "เปรียบเทียบการจัดสรรพื้นที่หน่วยความจำ (Memory Allocation) ให้กับสมาชิกแต่ละตัวระหว่าง Struct และ Union...",
    question2: "2. ในกรณีลักษณะงานใดที่เราควรเลือกนำ union มาเลือกประยุกต์ใช้งานแทนการใช้ struct ในการประมวลผล?",
    question2Placeholder: "ยกตัวอย่างสถานการณ์หรือระบบที่ต้องการประหยัดพื้นที่หน่วยความจำและใช้งานสมาชิกทีละหนึ่งรายการ...",
    conclusionPlaceholder: "เขียนสรุปความสำคัญของการใช้ struct จัดการข้อมูลจำลองที่ซับซ้อน และการนำมาพัฒนาเป็นระบบฐานข้อมูลขนาดย่อม...",
    codeKeywords: ["struct","\\.|\\->","scanf","printf","float|int"],
    q1Keywords: ["แชร์","แยก","ขนาด","หน่วยความจำ","ตัวแปรใหญ่สุด"],
    q2Keywords: ["ประหยัด","ram","สลับ","พร้อมกัน","ฝังตัว"]
  },
  {
    num: "9",
    idName: "lab9",
    titleTh: "Lab 9: การจัดการไฟล์ข้อมูล",
    titleEn: "Lab 9: File Handling I/O",
    sheetName: "Lab C 9 Submissions",
    folderName: "Lab C 9 Attachments",
    introTitle: "การบันทึกจัดเก็บบันทึกข้อมูลถาวรผ่านไฟล์ (File Handling I/O)",
    introDesc: "ศึกษาคำสั่งจัดการไฟล์ข้อมูลในภาษา C ทั้งในโหมดข้อความ (Text Mode) และโหมดไบนารี (Binary Mode) ด้วย fopen, fprintf, fscanf, fwrite, fread",
    purpose: [
      "Understand file streams (FILE *), open states and closing buffers",
      "Understand difference between writing text records and binary data blocks",
      "Capable of developing data storage logs onto disk media locally"
    ],
    equipments: [
      { name: "GCC Compiler (MinGW)", desc: "ใช้แปลซอร์สโค้ดภาษา C (.c) เป็น Executable" },
      { name: "VS Code หรือ Text Editor", desc: "ใช้สำหรับเขียนและตรวจสอบไวยากรณ์ภาษา C" }
    ],
    theoryHtml: `
        <h2>3. ฟังก์ชันพื้นฐานในการจัดการไฟล์ภาษา C</h2>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>ชื่อฟังก์ชัน</th>
                <th>วัตถุประสงค์ในการทำงาน</th>
                <th>โหมดรองรับหลัก</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>fopen()</code></td>
                <td>เปิดใช้งาน Stream เชื่อมต่อไปยังไฟล์ปลายทาง</td>
                <td>Text & Binary</td>
              </tr>
              <tr>
                <td><code>fclose()</code></td>
                <td>ปิดการเชื่อมโยง Stream และคืน Buffer สู่ดิสก์</td>
                <td>Text & Binary</td>
              </tr>
              <tr>
                <td><code>fprintf()</code> / <code>fscanf()</code></td>
                <td>เขียนและอ่านข้อมูลข้อความตามการจัดฟอร์แมต</td>
                <td>Text Mode</td>
              </tr>
              <tr>
                <td><code>fwrite()</code> / <code>fread()</code></td>
                <td>เขียนและอ่านข้อมูลระดับไบนารีตรงเข้าสู่ RAM/Struct</td>
                <td>Binary Mode</td>
              </tr>
            </tbody>
          </table>
        </div>
    `,
    diagramSvg: `
          <svg class="stages-diagram" viewBox="0 0 580 150">
            <text x="30" y="25" fill="#a5b4fc" font-size="12" font-family="Outfit" font-weight="600">File Stream Communication Model</text>
            
            <rect x="50" y="55" width="130" height="40" rx="4" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
            <text x="115" y="79" fill="#f8fafc" font-size="11" font-family="JetBrains Mono" text-anchor="middle">C Program (RAM)</text>

            <path d="M 180 75 L 350 75" fill="none" stroke="#f59e0b" stroke-width="2.5" marker-end="url(#arrow)" />
            <text x="265" y="65" fill="#f59e0b" font-size="10" font-family="JetBrains Mono" text-anchor="middle">fopen("w", "r")</text>

            <rect x="350" y="45" width="150" height="60" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="2" />
            <text x="425" y="70" fill="#10b981" font-size="12" font-family="Outfit" text-anchor="middle" font-weight="600">Data File (Storage)</text>
            <text x="425" y="90" fill="#94a3b8" font-size="10" font-family="JetBrains Mono" text-anchor="middle">students.txt</text>

            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#f59e0b" />
              </marker>
            </defs>
          </svg>
    `,
    example1Title: "โปรแกรมตัวอย่างที่ 1: การเปิดเขียนและบันทึกข้อความลงไฟล์ดิสก์",
    example1Desc: "ศึกษาคำสั่ง fopen ในโหมดเขียนทับ \"w\" และเรียกบันทึกข้อมูลแถวอักษรด้วย fprintf:",
    example1Code: `#include <stdio.h>

int main() {
    FILE *file = fopen("test.txt", "w");
    if (file == NULL) {
        printf("Error opening file!\\n");
        return 1;
    }
    fprintf(file, "Hello, C File Handling!\\n");
    fclose(file);
    printf("File written successfully.\\n");
    return 0;
}`,
    example2Title: "โปรแกรมตัวอย่างที่ 2: การเปิดอ่านดึงข้อมูลและการเติม Syntax",
    example2Desc: "ศึกษาการเปิดอ่านไฟล์ด้วยโหมดอ่านข้อความ และเติมตัวเช็คค่าพอยน์เตอร์ล้มเหลวในช่องว่างกล่องข้อความ:",
    blanks: [
      { id: "blank1", label: "โหมดการเปิดเพื่ออ่านไฟล์ข้อความ", placeholder: "พิมพ์คำตอบที่นี่...", answers: ["\"r\"", "'r'", "r"] },
      { id: "blank2", label: "ตรวจสอบพอยน์เตอร์การชี้ว่าเปิดล้มเหลวหรือไม่", placeholder: "พิมพ์คำตอบที่นี่...", answers: ["NULL", "0"] }
    ],
    example2RawCode: `#include <stdio.h>

int main() {
    FILE *fp;
    char buffer[50];
    
    // เติมโหมดการเปิดเพื่ออ่านไฟล์ข้อความ
    fp = fopen("test.txt", "[BLANK1]");
    
    // ตรวจสอบพอยน์เตอร์การชี้ว่าเปิดล้มเหลวหรือไม่
    if (fp == [BLANK2]) {
        printf("Could not open file!\\n");
        return 1;
    }
    
    fgets(buffer, 50, fp);
    printf("File Content: %s\\n", buffer);
    fclose(fp);
    return 0;
}`,
    example2SolutionCode: `#include <stdio.h>

int main() {
    FILE *fp;
    char buffer[50];
    
    fp = fopen("test.txt", "r");
    
    if (fp == NULL) {
        printf("Could not open file!\\n");
        return 1;
    }
    
    fgets(buffer, 50, fp);
    printf("File Content: %s\\n", buffer);
    fclose(fp);
    return 0;
}`,
    challengeDesc: "พัฒนาโปรแกรมภาษา C จำลองระบบบันทึกประวัติเครื่องจักรลงไฟล์ CSV (Industrial Data Logger to 'datalog.csv') โดยใช้ fopen() โหมดเขียนไฟล์ บันทึกหัวคอลัมน์และข้อมูล 3 แซมเปิล (Sample, Time, Voltage_V, Temperature_C) ตรวจสอบตัวชี้ไฟล์ NULL และปิดไฟล์ด้วย fclose()",
    challengePlaceholder: `#include <stdio.h>

int main() {
    // เขียนโค้ดสร้างไฟล์ datalog.csv บันทึกหัวตารางและข้อมูลโทรมาตรโรงงาน
    return 0;
}`,
    challengeSolutionCode: `#include <stdio.h>

int main() {
    FILE *fp = fopen("datalog.csv", "w");
    if (fp == NULL) {
        printf("Error creating datalog.csv!\\n");
        return 1;
    }
    
    // Write CSV Header
    fprintf(fp, "Sample,Time,Voltage_V,Temperature_C\\n");
    
    // Write Sample Industrial Records
    fprintf(fp, "1,09:00,380.2,42.5\\n");
    fprintf(fp, "2,09:05,379.8,43.1\\n");
    fprintf(fp, "3,09:10,381.0,44.0\\n");
    
    fclose(fp);
    printf("Successfully logged industrial telemetry data to 'datalog.csv'!\\n");
    return 0;
}`,
    question1: "1. การจัดการไฟล์ข้อมูลในรูปแบบ Text Mode และ Binary Mode แตกต่างกันอย่างไรในแง่ลักษณะไฟล์และขนาด?",
    question1Placeholder: "เปรียบเทียบรูปแบบการจัดเก็บข้อมูล การแปลงรหัสอักขระ และความเหมาะสมในการใช้งานไฟล์ทั้งสองโหมด...",
    question2: "2. เพราะเหตุใดเมื่อเขียนชุดคำสั่งภาษา C เพื่อจัดการไฟล์ เราจึงต้องตรวจสอบค่า pointer ของไฟล์ว่าเท่ากับ NULL หรือไม่หลัง fopen()?",
    question2Placeholder: "อธิบายความสำคัญในการตรวจสอบความพร้อมของไฟล์ ปัญหาพาธหรือสิทธิ์การเข้าถึง และการป้องกันโปรแกรมหยุดทำงานกะทันหัน...",
    conclusionPlaceholder: "วิเคราะห์ประโยชน์ของการบันทึกไฟล์ในการพัฒนาระบบ และข้อควรระวังในการปิดไฟล์ (fclose) ทุกครั้ง...",
    codeKeywords: ["fopen","fclose","fprintf|fputs|fwrite","FILE","\\.csv"],
    q1Keywords: ["text","binary","ตัวอักษร","ไบนารี","มนุษย์อ่าน"],
    q2Keywords: ["null","สำเร็จ","แครช","ความปลอดภัย"]
  },
  {
    num: "10",
    idName: "lab10",
    titleTh: "Lab 10: การใช้งานฟังก์ชันจัดการสตริง (String Functions)",
    titleEn: "Lab 10: String Functions",
    sheetName: "Lab C 10 Submissions",
    folderName: "Lab C 10 Attachments",
    introTitle: "การใช้งานฟังก์ชันจัดการสตริง (String Functions)",
    introDesc: "ศึกษาการเขียนโปรแกรมและการเรียกใช้งานฟังก์ชันจัดการสตริงพื้นฐาน เช่น strlen(), strcpy(), strcat(), strcmp(), fgets() และ puts() จาก string.h",
    purpose: [
      "เข้าใจหลักการและโครงสร้างของสตริง (String) ในภาษา C ซึ่งจบด้วย Null Character (\\0)",
      "สามารถเรียกใช้ฟังก์ชันจัดการสตริงพื้นฐานได้แก่ strlen(), strcpy(), strcat(), strcmp(), fgets() และ puts() ได้อย่างถูกต้อง",
      "สามารถประยุกต์ใช้ฟังก์ชันสตริงเพื่อแก้ปัญหาการจัดการข้อมูลประเภทข้อความได้"
    ],
    equipments: [
      { name: "GCC Compiler (MinGW)", desc: "ใช้แปลซอร์สโค้ดภาษา C (.c) เป็น Executable" },
      { name: "VS Code หรือ Text Editor", desc: "ใช้สำหรับเขียนและตรวจสอบไวยากรณ์ภาษา C" }
    ],
    theoryHtml: `
        <h2>3. ฟังก์ชันจัดการสตริงมาตรฐานในภาษา C (string.h)</h2>
        <p>ในภาษา C สตริงคืออาร์เรย์ของตัวอักษร (Character Array) ที่เรียงต่อกันและจบด้วย Null Character (<code>\\0</code>) เสมอ โดยการเปิดใช้งานฟังก์ชันเหล่านี้จะต้องนำเข้าไลบรารี <code>#include &lt;string.h&gt;</code></p>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>ฟังก์ชัน</th>
                <th>วัตถุประสงค์ในการทำงาน</th>
                <th>ค่าที่ส่งกลับ / ข้อควรระวัง</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>strlen(str)</code></td>
                <td>หาความยาวของสตริง (ไม่นับรวมตัวจบ <code>\\0</code>)</td>
                <td>จำนวนเต็มชนิด <code>size_t</code> แทนจำนวนตัวอักษร</td>
              </tr>
              <tr>
                <td><code>strcpy(dest, src)</code></td>
                <td>คัดลอกสตริงจาก <code>src</code> ไปยัง <code>dest</code></td>
                <td>ปลายทาง <code>dest</code> ต้องมีขนาดใหญ่พอ ไม่เช่นนั้นจะเกิด Buffer Overflow</td>
              </tr>
              <tr>
                <td><code>strncpy(dest, src, n)</code></td>
                <td>คัดลอกสตริงสูงสุด <code>n</code> ตัวอักษรไปยัง <code>dest</code></td>
                <td>ต้องใส่ตัวปิด <code>\\0</code> เองหาก <code>src</code> ยาวกว่า <code>n</code></td>
              </tr>
              <tr>
                <td><code>strcat(dest, src)</code></td>
                <td>เชื่อมสตริง <code>src</code> เข้าท้ายสตริง <code>dest</code></td>
                <td>ปลายทาง <code>dest</code> ต้องมีขนาดเพียงพอสะสมข้อความต่อท้ายทั้งหมด</td>
              </tr>
              <tr>
                <td><code>strncat(dest, src, n)</code></td>
                <td>เชื่อมสตริง <code>src</code> สูงสุด <code>n</code> ตัวอักษรเข้าท้าย <code>dest</code></td>
                <td>จะเติม <code>\\0</code> ให้อัตโนมัติที่ท้ายผลลัพธ์เชื่อม</td>
              </tr>
              <tr>
                <td><code>strcmp(str1, str2)</code></td>
                <td>เปรียบเทียบสองสตริง (Case-sensitive)</td>
                <td><code>0</code> เมื่อเท่ากัน, ค่าลบหาก <code>str1 &lt; str2</code>, ค่าบวกหาก <code>str1 &gt; str2</code></td>
              </tr>
              <tr>
                <td><code>strncmp(str1, str2, n)</code></td>
                <td>เปรียบเทียบสองสตริงเฉพาะ <code>n</code> ตัวอักษรแรก</td>
                <td>ใช้ตรวจสอบคำขึ้นต้น เช่น เช็คโปรโตคอล รหัส หรือ Serial Number</td>
              </tr>
              <tr>
                <td><code>fgets(str, size, stdin)</code></td>
                <td>รับข้อมูลสตริงจากคีย์บอร์ดอย่างปลอดภัย</td>
                <td>จะอ่านตัวอักษรขึ้นบรรทัดใหม่ (<code>\\n</code>) เข้ามาในสตริงด้วย</td>
              </tr>
              <tr>
                <td><code>puts(str)</code></td>
                <td>แสดงผลสตริงออกทางหน้าจอ</td>
                <td>จะแสดงผลข้อความและขึ้นบรรทัดใหม่ให้โดยอัตโนมัติ</td>
              </tr>
            </tbody>
          </table>
        </div>
    `,
    diagramSvg: `
          <svg class="stages-diagram" viewBox="0 0 580 150">
            <text x="30" y="25" fill="#a5b4fc" font-size="12" font-family="Outfit" font-weight="600">String Memory Representation of "Hello"</text>
            <g transform="translate(30, 45)">
              <rect x="0" y="0" width="60" height="40" rx="4" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
              <text x="30" y="25" fill="#f8fafc" font-size="14" font-family="JetBrains Mono" text-anchor="middle">'H'</text>
              <text x="30" y="55" fill="#94a3b8" font-size="10" font-family="JetBrains Mono" text-anchor="middle">[0]</text>
              
              <rect x="60" y="0" width="60" height="40" rx="4" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
              <text x="90" y="25" fill="#f8fafc" font-size="14" font-family="JetBrains Mono" text-anchor="middle">'e'</text>
              <text x="90" y="55" fill="#94a3b8" font-size="10" font-family="JetBrains Mono" text-anchor="middle">[1]</text>
              
              <rect x="120" y="0" width="60" height="40" rx="4" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
              <text x="150" y="25" fill="#f8fafc" font-size="14" font-family="JetBrains Mono" text-anchor="middle">'l'</text>
              <text x="150" y="55" fill="#94a3b8" font-size="10" font-family="JetBrains Mono" text-anchor="middle">[2]</text>
              
              <rect x="180" y="0" width="60" height="40" rx="4" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
              <text x="210" y="25" fill="#f8fafc" font-size="14" font-family="JetBrains Mono" text-anchor="middle">'l'</text>
              <text x="210" y="55" fill="#94a3b8" font-size="10" font-family="JetBrains Mono" text-anchor="middle">[3]</text>
              
              <rect x="240" y="0" width="60" height="40" rx="4" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
              <text x="270" y="25" fill="#f8fafc" font-size="14" font-family="JetBrains Mono" text-anchor="middle">'o'</text>
              <text x="270" y="55" fill="#94a3b8" font-size="10" font-family="JetBrains Mono" text-anchor="middle">[4]</text>
              
              <rect x="300" y="0" width="70" height="40" rx="4" fill="#1e1b4b" stroke="#ef4444" stroke-width="2" />
              <text x="335" y="25" fill="#ef4444" font-size="13" font-family="JetBrains Mono" text-anchor="middle">\\0 (Null)</text>
              <text x="335" y="55" fill="#94a3b8" font-size="10" font-family="JetBrains Mono" text-anchor="middle">[5]</text>

              <path d="M 0 -10 L 300 -10" fill="none" stroke="#10b981" stroke-width="2" />
              <text x="150" y="-18" fill="#10b981" font-size="11" font-family="Outfit" text-anchor="middle" font-weight="600">strlen("Hello") = 5 Characters</text>
              
              <path d="M 0 75 L 370 75" fill="none" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="3" />
              <text x="185" y="90" fill="#f59e0b" font-size="10" font-family="Sarabun" text-anchor="middle">ขนาดอาร์เรย์ขั้นต่ำที่ต้องจอง: char str[6]</text>
            </g>
          </svg>
    `,
    example1Title: "โปรแกรมตัวอย่างที่ 1: การใช้งานฟังก์ชันจัดการสตริงพื้นฐาน",
    example1Desc: "ศึกษาการประกาศตัวแปรสตริง การรับข้อมูลอย่างปลอดภัยด้วย fgets() การหาความยาว คัดลอก เชื่อมต่อ และการเปรียบเทียบสตริง:",
    example1Code: `#include <stdio.h>
#include <string.h>

int main() {
    char firstName[50];
    char lastName[50];
    char fullName[100];
    char correctPassword[] = "pvs2567";
    char userPassword[50];

    printf("--- โปรแกรมทดสอบฟังก์ชันสตริง ---\\n");

    printf("กรุณาป้อนชื่อจริงของคุณ: ");
    fgets(firstName, sizeof(firstName), stdin);
    firstName[strcspn(firstName, "\\n")] = 0; // ลบ \\n ออกจากท้ายสตริง

    printf("กรุณาป้อนนามสกุลของคุณ: ");
    fgets(lastName, sizeof(lastName), stdin);
    lastName[strcspn(lastName, "\\n")] = 0; // ลบ \\n ออกจากท้ายสตริง

    printf("\\n--- การใช้งาน strlen() ---\\n");
    printf("ความยาวของชื่อจริง '%s' คือ: %zu ตัวอักษร\\n", firstName, strlen(firstName));
    printf("ความยาวของนามสกุล '%s' คือ: %zu ตัวอักษร\\n", lastName, strlen(lastName));

    printf("\\n--- การใช้งาน strcpy() และ strcat() ---\\n");
    strcpy(fullName, firstName);
    printf("หลัง strcpy(fullName, firstName): '%s'\\n", fullName);

    strcat(fullName, " ");
    strcat(fullName, lastName);
    
    puts("ยินดีต้อนรับเข้าสู่ระบบ!");
    puts(fullName);

    printf("\\n--- การใช้งาน strcmp() ---\\n");
    printf("ป้อนรหัสผ่านเพื่อเข้าสู่ระบบ: ");
    fgets(userPassword, sizeof(userPassword), stdin);
    userPassword[strcspn(userPassword, "\\n")] = 0;

    if (strcmp(userPassword, correctPassword) == 0) {
        printf("รหัสผ่านถูกต้อง! ยินดีต้อนรับ.\\n");
    } else {
        printf("รหัสผ่านไม่ถูกต้อง. โปรดลองอีกครั้ง.\\n");
    }
    return 0;
}`,
    example2Title: "โปรแกรมตัวอย่างที่ 2: การใช้งาน strncpy() และ strncat()",
    example2Desc: "ศึกษาการคัดลอกและเชื่อมต่อข้อความแบบระบุจำนวนตัวอักษรสูงสุดเพื่อความปลอดภัย เติมคีย์เวิร์ดฟังก์ชันสตริงในช่องว่างกล่องข้อความ:",
    blanks: [
      { id: "blank1", label: "คำสั่งคัดลอกสตริงแบบจำกัดจำนวน", placeholder: "พิมพ์คำตอบที่นี่...", answers: ["strncpy"] },
      { id: "blank2", label: "คำสั่งเชื่อมสตริงแบบจำกัดจำนวน", placeholder: "พิมพ์คำตอบที่นี่...", answers: ["strncat"] }
    ],
    example2RawCode: `#include <stdio.h>
#include <string.h>

int main() {
    char buffer[15];
    char source[] = "SuperLongString";
    char result[30] = "Prefix_";

    printf("--- การใช้งาน strncpy() และ strncat() ---\\n");
    
    // เติมคำสั่งคัดลอกสตริงแบบจำกัดจำนวนเพื่อความปลอดภัย
    [BLANK1](buffer, source, sizeof(buffer) - 1);
    buffer[sizeof(buffer) - 1] = '\\0'; // ใส่ null terminator ด้วยตนเองเสมอเมื่อใช้ strncpy
    printf("strncpy ผลลัพธ์ใน buffer: '%s'\\n", buffer);

    // เติมคำสั่งเชื่อมสตริงสูงสุด 5 ตัวอักษรแรก
    [BLANK2](result, source, 5);
    printf("strncat ผลลัพธ์ใน result: '%s'\\n", result);

    return 0;
}`,
    example2SolutionCode: `#include <stdio.h>
#include <string.h>

int main() {
    char buffer[15];
    char source[] = "SuperLongString";
    char result[30] = "Prefix_";

    printf("--- การใช้งาน strncpy() และ strncat() ---\\n");
    
    strncpy(buffer, source, sizeof(buffer) - 1);
    buffer[sizeof(buffer) - 1] = '\\0';
    printf("strncpy ผลลัพธ์ใน buffer: '%s'\\n", buffer);

    strncat(result, source, 5);
    printf("strncat ผลลัพธ์ใน result: '%s'\\n", result);

    return 0;
}`,
    challengeDesc: "พัฒนาโปรแกรมถอดรหัสคำสั่ง Serial/IoT AT Command (เช่น $SET,RELAY,ON# หรือ $READ,TEMP#) โดยใช้ fgets() รับคำสั่งเข้าบัฟเฟอร์อย่างปลอดภัย และใช้ฟังก์ชันใน <string.h> (strstr, strcmp, strlen) ตรวจสอบและสั่งการจำลองการทำงานของอุปกรณ์",
    challengePlaceholder: `#include <stdio.h>
#include <string.h>

int main() {
    char cmdBuffer[64];
    printf("Enter Serial Command (e.g. $SET,RELAY,ON# or $READ,TEMP#): ");
    // รับคำสั่งและใช้ฟังก์ชัน string.h ตรวจสอบถอดรหัสคำสั่ง
    return 0;
}`,
    challengeSolutionCode: `#include <stdio.h>
#include <string.h>

int main() {
    char cmdBuffer[64];
    printf("Enter Serial Command (e.g. $SET,RELAY,ON# or $READ,TEMP#): ");
    if (fgets(cmdBuffer, sizeof(cmdBuffer), stdin) != NULL) {
        cmdBuffer[strcspn(cmdBuffer, "\\r\\n")] = '\\0';
        
        printf("\\n--- Command Packet Parser Analysis ---\\n");
        printf("Raw Packet:    %s (Length: %zu chars)\\n", cmdBuffer, strlen(cmdBuffer));
        
        if (strstr(cmdBuffer, "$SET,RELAY,ON#") != NULL) {
            printf("Action: Executing -> RELAY SWITCH ENERGIZED [ON]\\n");
        } else if (strstr(cmdBuffer, "$SET,RELAY,OFF#") != NULL) {
            printf("Action: Executing -> RELAY SWITCH DE-ENERGIZED [OFF]\\n");
        } else if (strstr(cmdBuffer, "$READ,TEMP#") != NULL) {
            printf("Action: Telemetry -> Reading Sensor Temp: 28.50 C\\n");
        } else {
            printf("Action: [UNKNOWN COMMAND] Syntax error or invalid header.\\n");
        }
    }
    return 0;
}`,
    question1: "1. อธิบายความแตกต่างและเหตุผลด้านความปลอดภัยในการเลือกใช้งานระหว่างฟังก์ชัน strcpy() และ strncpy()",
    question1Placeholder: "อธิบายความปลอดภัยในการจำกัดขนาดการคัดลอกข้อมูล และข้อควรระวังเกี่ยวกับตัวปิดท้ายสตริง...",
    question2: "2. เพราะเหตุใดฟังก์ชัน fgets() จึงต้องมีพารามิเตอร์จำกัดขนาด (size) และเพราะเหตุใดนักพัฒนาจึงต้องจัดการกับอักษรขึ้นบรรทัดใหม่ (\\n) หลังการรับข้อมูล?",
    question2Placeholder: "อธิบายการป้องกันปัญหา Buffer Overflow ของ fgets และเหตุผลที่ต้องจัดการอักขระขึ้นบรรทัดใหม่...",
    conclusionPlaceholder: "วิเคราะห์ประโยชน์ของฟังก์ชันสำเร็จรูปใน string.h ในการลดความซับซ้อนและเพิ่มความปลอดภัยของการพัฒนาแอปพลิเคชัน...",
    codeKeywords: ["string\\.h","fgets","strlen","strstr|strcmp|strncpy","printf"],
    q1Keywords: ["overflow","ความยาว","n","ปลอดภัย","\\0"],
    q2Keywords: ["gets","ปลอดภัย","ขนาด","buffer","\\n","enter"]
  },
  {
    num: "11",
    idName: "lab11",
    titleTh: "Lab 11: การเชื่อมโยงภาษา C สู่ไมโครคอนโทรลเลอร์ (C to Microcontroller & Embedded Bridge)",
    titleEn: "Lab 11: C to Microcontroller & Embedded Systems Bridge",
    sheetName: "Lab C 11 Submissions",
    folderName: "Lab C 11 Attachments",
    introTitle: "จากภาษา C บนคอมพิวเตอร์ สู่การพัฒนาเฟิร์มแวร์ไมโครคอนโทรลเลอร์ (ESP32/Arduino)",
    introDesc: "ศึกษาการแปลงโครงสร้างภาษา C จากคอนโซลสู่ระบบสมองกลฝังตัว การทำงานแบบ Super-Loop (setup และ loop), การสื่อสารแบบอนุกรม (Serial Communication), และการเขียนโปรแกรมแบบ Non-blocking Multi-tasking ด้วย millis()",
    purpose: [
      "เข้าใจความแตกต่างของวงจรชีวิตโปรแกรมระหว่าง main() บนคอมพิวเตอร์ และ setup() / loop() บนไมโครคอนโทรลเลอร์",
      "สามารถแปลงคำสั่งรับ-แสดงผลข้อมูลมาตรฐาน (printf/scanf) สู่การสื่อสารแบบอนุกรม (Serial Communication)",
      "เข้าใจและประยุกต์ใช้แนวคิด Non-blocking Multi-tasking โดยใช้ฟังก์ชันจับเวลา millis() แทนการหน่วงเวลาด้วย delay()",
      "สามารถบูรณาการความรู้ภาษา C เข้ากับการควบคุมขาพอร์ต I/O และเซนเซอร์ในงานไมโครคอนโทรลเลอร์และ IoT"
    ],
    equipments: [
      { name: "เครื่องคอมพิวเตอร์และโปรแกรม GCC / Arduino IDE", desc: "ใช้สำหรับเขียน คอมไพล์ และทดสอบเฟิร์มแวร์ C/C++" },
      { name: "บอร์ดไมโครคอนโทรลเลอร์ ESP32 หรือ Arduino Uno", desc: "บอร์ดพัฒนาสมองกลฝังตัวสำหรับทดลองรันโค้ดจริง" },
      { name: "เซนเซอร์อุณหภูมิ, หลอด LED, ตัวต้านทาน และ Breadboard", desc: "อุปกรณ์อินพุตและเอาต์พุตสำหรับทดสอบระบบควบคุม" }
    ],
    theoryHtml: `<p>ในการเขียนโปรแกรมภาษา C บนระบบปฏิบัติการคอมพิวเตอร์ทั่วไป ฟังก์ชัน <code>main()</code> จะเริ่มทำงานและจบการทำงานเมื่อคืนค่า <code>return 0;</code> แต่ในโลกของ <strong>ระบบสมองกลฝังตัว (Embedded Systems)</strong> และ <strong>ไมโครคอนโทรลเลอร์ (Microcontrollers)</strong> เช่น บอร์ด Arduino หรือ ESP32 สถาปัตยกรรมซอฟต์แวร์จะทำงานในรูปแบบ <strong>Super-Loop Architecture</strong></p>

<div class="code-container">
  <pre><code>// เปรียบเทียบสถาปัตยกรรมโปรแกรม
┌─────────────────────────────────┐       ┌─────────────────────────────────┐
│   Standard C (PC Application)   │       │   Embedded C (Arduino / ESP32)  │
├─────────────────────────────────┤       ├─────────────────────────────────┤
│ int main() {                    │       │ void setup() {                  │
│     // Initializations          │       │     // ทำงานเพียงครั้งเดียวตอนเริ่มระบบ│
│     // Business Logic           │       │ }                               │
│     return 0; // จบโปรแกรมทันที │       │ void loop() {                   │
│ }                               │       │     // วนซ้ำต่อเนื่องตลอดเวลาไม่รู้จบ│
│                                 │       │ }                               │
└─────────────────────────────────┘       └─────────────────────────────────┘</code></pre>
</div>

<h4 style="color:#38bdf8;margin-top:1.5rem;margin-bottom:0.5rem;"><i class="fa-solid fa-table-list"></i> 1. ตารางเทียบฟังก์ชัน C Standard vs Arduino / ESP32 API</h4>
<table style="width:100%;border-collapse:collapse;margin-bottom:1.5rem;font-size:0.9rem;">
  <thead>
    <tr style="border-bottom:2px solid rgba(255,255,255,0.1);text-align:left;color:#38bdf8;">
      <th style="padding:0.6rem;">การทำงาน (Operation)</th>
      <th style="padding:0.6rem;">ภาษา C มาตรฐาน (PC)</th>
      <th style="padding:0.6rem;">ไมโครคอนโทรลเลอร์ (Arduino / ESP32)</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
      <td style="padding:0.6rem;">แสดงผลข้อความ</td>
      <td style="padding:0.6rem;"><code>printf("Temp: %.2f\n", temp);</code></td>
      <td style="padding:0.6rem;"><code>Serial.printf("Temp: %.2f\n", temp);</code></td>
    </tr>
    <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
      <td style="padding:0.6rem;">การรับข้อมูล</td>
      <td style="padding:0.6rem;"><code>scanf("%d", &val);</code></td>
      <td style="padding:0.6rem;"><code>analogRead(PIN_ADC)</code> หรือ <code>Serial.read()</code></td>
    </tr>
    <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
      <td style="padding:0.6rem;">กำหนดทิศทางขาพอร์ต</td>
      <td style="padding:0.6rem;">- (จัดการผ่าน OS Driver)</td>
      <td style="padding:0.6rem;"><code>pinMode(PIN_LED, OUTPUT);</code></td>
    </tr>
    <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
      <td style="padding:0.6rem;">ควบคุมระดับแรงดันดิจิทัล</td>
      <td style="padding:0.6rem;">Bit Masking Register</td>
      <td style="padding:0.6rem;"><code>digitalWrite(PIN_RELAY, HIGH);</code></td>
    </tr>
    <tr>
      <td style="padding:0.6rem;">การจับเวลาแบบ Non-blocking</td>
      <td style="padding:0.6rem;"><code>clock()</code> หรือ <code>gettimeofday()</code></td>
      <td style="padding:0.6rem;"><code>millis()</code> (อ่านเวลามิลลิวินาทีนับแต่เปิดบอร์ด)</td>
    </tr>
  </tbody>
</table>

<h4 style="color:#38bdf8;margin-top:1.5rem;margin-bottom:0.5rem;"><i class="fa-solid fa-stopwatch"></i> 2. ทำไมต้องใช้ Non-blocking <code>millis()</code> แทน <code>delay()</code>?</h4>
<p>คำสั่ง <code>delay(1000)</code> จะทำให้ซีพียูหยุดทำงานทุกอย่างชั่วคราว (CPU Blocking) ทำให้ระบบไม่สามารถรับคำสั่งผ่าน WiFi, Bluetooth หรือ MQTT ได้ และไม่สามารถตรวจจับปุ่มกดฉุกเฉินได้ทันท่วงที ในระบบ IoT มืออาชีพจึงต้องใช้เทคนิค <strong>State & Time Interval Checking</strong> ด้วย <code>millis()</code> เพื่อให้ระบบทำงานหลายงานพร้อมกัน (Multi-tasking) ได้อย่างราบรื่น</p>`,
    example1Title: "โปรแกรมตัวอย่างที่ 1: การเขียนโปรแกรมโครงสร้าง Super-Loop และ Serial Output",
    example1Code: `#include <stdio.h>
#include <stdbool.h>

// ฟังก์ชัน setup() ทำงานรอบเดียวตอนบูตระบบ
void setup() {
    printf("[SYSTEM BOOT] Initializing Microcontroller Hardware...\\n");
    printf("[SERIAL] UART Baud Rate: 115200 bps\\n");
    printf("[GPIO] Pin 2 (Status LED) configured as OUTPUT\\n");
    printf("--------------------------------------------------\\n");
}

// ฟังก์ชัน loop() ทำงานวนรอบต่อเนื่อง
void loop(int loopCounter) {
    printf("[Loop #%d] Reading Sensor -> Processing Telemetry -> Status OK\\n", loopCounter);
}

int main() {
    setup();
    // จำลอง Super-loop วนทำงาน 3 รอบ
    for (int cycle = 1; cycle <= 3; cycle++) {
        loop(cycle);
    }
    printf("[INFO] In physical microcontrollers, loop() executes infinitely until powered off.\\n");
    return 0;
}`,
    example2Title: "โปรแกรมตัวอย่างที่ 2: การทำงานแบบ Non-blocking ด้วยการจับเวลา (millis() Pattern)",
    example2RawCode: `#include <stdio.h>
#include <stdbool.h>

int main() {
    unsigned long currentMillis = 1500;  // จำลองเวลาปัจจุบัน (ms)
    unsigned long previousMillis = 1000; // เวลาที่บันทึกไว้ล่าสุด (ms)
    const long interval = 500;           // คาบเวลาที่ต้องการตรวจสอบ (500 ms)
    bool ledState = false;

    // ตรวจสอบเงื่อนไขว่าผ่านไปครบช่วงเวลา interval หรือยัง
    if ([BLANK1] - previousMillis >= [BLANK2]) {
        previousMillis = currentMillis;
        ledState = !ledState; // สลับสถานะ LED (Toggle)
        printf("Interval Elapsed! LED Toggled to: %s\\n", ledState ? "ON (HIGH)" : "OFF (LOW)");
    }
    return 0;
}`,
    example2SolutionCode: `#include <stdio.h>
#include <stdbool.h>

int main() {
    unsigned long currentMillis = 1500;
    unsigned long previousMillis = 1000;
    const long interval = 500;
    bool ledState = false;

    if (currentMillis - previousMillis >= interval) {
        previousMillis = currentMillis;
        ledState = !ledState;
        printf("Interval Elapsed! LED Toggled to: %s\\n", ledState ? "ON (HIGH)" : "OFF (LOW)");
    }
    return 0;
}`,
    blanks: [
      { id: "blank1", label: "ตัวแปรเวลาปัจจุบันที่อ่านได้", answers: ["currentMillis", "millis()"] },
      { id: "blank2", label: "ตัวแปรกำหนดคาบเวลาตรวจสอบ", answers: ["interval", "500"] }
    ],
    challengeDesc: "พัฒนาโปรแกรมจำลองการทำงานของ Smart IoT Controller แบบ Non-blocking Multi-tasking โดยจำลอง 2 งานทำงานร่วมกัน: 1) Task 1 (Sensor Polling): ทุกๆ 500 ms อ่านค่าอุณหภูมิเซนเซอร์และพิมพ์ออกทาง Serial, 2) Task 2 (Heartbeat Beacon): ทุกๆ 100 ms กระพริบไฟ LED แจ้งสถานะระบบ และมี Safety Override หากอุณหภูมิเกิน 40.0 C ให้สั่งเปิดพัดลมทันที",
    challengePlaceholder: `#include <stdio.h>
#include <stdbool.h>

int main() {
    // พัฒนาระบบ Smart IoT Node Controller (Dual-Task Non-blocking) ที่นี่
    return 0;
}`,
    challengeSolutionCode: `#include <stdio.h>
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
        
        printf("[Task 1 @ %4lums] Sensor Temp: %.1f C -> Fan: %s\\n", 
               currentMs, sys->temperature, sys->coolingFan ? "ACTIVATED [ON]" : "STANDBY [OFF]");
    }
}

void runTaskBeacon(unsigned long currentMs, unsigned long *prevMs, struct SystemState *sys) {
    if (currentMs - *prevMs >= 100) {
        *prevMs = currentMs;
        sys->ledBeacon = !sys->ledBeacon;
        printf("[Task 2 @ %4lums] Heartbeat LED: %s\\n", 
               currentMs, sys->ledBeacon ? "BLINK (1)" : "DARK  (0)");
    }
}

int main() {
    struct SystemState myNode = {25.0f, false, false};
    unsigned long prevSensorMs = 0;
    unsigned long prevBeaconMs = 0;
    
    printf("=== SMART IOT CONTROLLER NON-BLOCKING SCHEDULER ===\\n");
    
    for (unsigned long simTime = 100; simTime <= 1000; simTime += 100) {
        runTaskBeacon(simTime, &prevBeaconMs, &myNode);
        runTaskSensor(simTime, &prevSensorMs, &myNode);
    }
    
    printf("===================================================\\n");
    return 0;
}`,
    question1: "1. เพราะเหตุใดในระบบสมองกลฝังตัวแบบเรียลไทม์ (Real-Time Embedded Systems / IoT) จึงควรหลีกเลี่ยงการใช้คำสั่ง delay() และหันมาใช้ฟังก์ชัน millis() แทน?",
    question1Placeholder: "อธิบายข้อเสียของการบล็อกซีพียู (CPU Blocking) และข้อดีของ Non-blocking Multitasking...",
    question2: "2. อธิบายความแตกต่างของฟังก์ชัน setup() และ loop() ในสถาปัตยกรรม Super-loop ของ Arduino/ESP32 เมื่อเทียบกับฟังก์ชัน int main() ของภาษา C มาตรฐาน",
    question2Placeholder: "เปรียบเทียบวงจรชีวิตการทำงาน (Lifecycle) การกำหนดค่าเริ่มต้นรอบเดียว และการวนซ้ำต่อเนื่อง...",
    conclusionPlaceholder: "สรุปสิ่งที่ได้รับจากการเรียนรู้เรื่องการแปลงภาษา C สู่ไมโครคอนโทรลเลอร์ และการเตรียมความพร้อมสู่วิชา IoT...",
    codeKeywords: ["millis|currentMs|time","setup|loop|task|Task","if|else","printf|Serial","struct|float|bool"],
    q1Keywords: ["delay","millis","blocking","ค้าง","เรียลไทม์|multitask|task"],
    q2Keywords: ["setup","loop","main","เริ่มต้น","วนซ้ำ|ตลอดเวลา|super-loop"]
  },
  {
    num: "basic-structure",
    idName: "lab-structure",
    titleTh: "Lab Basic: โครงสร้างและการทำงานของโปรแกรมภาษา C",
    titleEn: "Lab Basic: C Program Structure & Flow",
    sheetName: "Lab C Structure Submissions",
    folderName: "Lab C Structure Attachments",
    introTitle: "โครงสร้างและการทำงานของโปรแกรมภาษา C (C Program Structure & Flow)",
    introDesc: "ศึกษาโครงสร้างหลักและส่วนประกอบพื้นฐานของโปรแกรมภาษา C เช่น Preprocessor Directives, main function, statements และ comments พร้อมทำความเข้าใจกระบวนการ Compile และ Link",
    purpose: [
      "เข้าใจโครงสร้างและองค์ประกอบหลักของโค้ดภาษา C (Preprocessor Directives, Main Function, Statements, Comments)",
      "อธิบายกระบวนการคอมไพล์และการลิงก์ของโปรแกรมภาษา C (Compilation and Linking Process) ได้",
      "สามารถตรวจหาและแก้ไขจุดผิดพลาดไวยากรณ์พื้นฐาน (Syntax Errors Debugging) ได้อย่างถูกต้อง"
    ],
    equipments: [
      { name: "GCC Compiler (MinGW)", desc: "ใช้แปลซอร์สโค้ดภาษา C (.c) เป็น Executable" },
      { name: "VS Code หรือ Text Editor", desc: "ใช้สำหรับเขียนและตรวจสอบไวยากรณ์ภาษา C" }
    ],
    theoryHtml: `
        <h2>3. ส่วนประกอบที่สำคัญของโปรแกรมภาษา C</h2>
        <p>โปรแกรมภาษา C ที่สมบูรณ์จะมีโครงสร้างและส่วนประกอบพื้นฐานที่จัดเรียงลำดับดังนี้:</p>
        
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>ส่วนประกอบ</th>
                <th>คำอธิบาย</th>
                <th>ตัวอย่างการใช้งาน</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Preprocessor Directives</td>
                <td>ส่วนหัวที่ขึ้นต้นด้วย <code>#</code> สั่งงานคอมไพเลอร์ให้ดึงไลบรารีหรือกำหนดค่าคงที่ก่อนแปลโปรแกรม</td>
                <td><code>#include &lt;stdio.h&gt;</code> (ดึงไลบรารีจัดการ I/O)</td>
              </tr>
              <tr>
                <td>Main Function</td>
                <td>จุดเริ่มต้นการประมวลผลของโปรแกรม รันคำสั่งย่อยในวงเล็บปีกกา <code>{ ... }</code></td>
                <td><code>int main() { ... return 0; }</code></td>
              </tr>
              <tr>
                <td>Statements</td>
                <td>คำสั่งประมวลผลการทำงาน ต้องลงท้ายด้วยเครื่องหมาย Semi-colon (<code>;</code>) เสมอ</td>
                <td><code>printf("Hello");</code> หรือ <code>int x = 5;</code></td>
              </tr>
              <tr>
                <td>Comments</td>
                <td>คำอธิบายโค้ดที่คอมไพเลอร์ข้ามการแปลภาษา (ไม่มีผลต่อการทำงานของโปรแกรม)</td>
                <td>แบบบรรทัดเดียว: <code>// ข้อความ</code><br>แบบหลายบรรทัด: <code>/* ข้อความ */</code></td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>4. ขั้นตอนการแปลโปรแกรม (Compilation & Linking Process)</h2>
        <p>เมื่อสั่งรันโปรแกรมภาษา C ซอร์สโค้ดที่มนุษย์เขียนขึ้นจะเดินทางผ่านกระบวนการแปลภาษากลางหลายขั้นก่อนรันบน OS:</p>
        <ol>
          <li><strong>Preprocessing (ขั้นก่อนการแปล):</strong> เคลียร์ Directives และคอมเมนต์ นำโค้ดของไลบรารีมารวมเข้ากับซอร์สโค้ดหลัก</li>
          <li><strong>Compiling (ขั้นแปลภาษา):</strong> Compiler จะทำการตรวจสอบโครงสร้างไวยากรณ์ (Syntax) และแปลงซอร์สโค้ดภาษา C (<code>.c</code>) ให้กลายเป็นภาษาแอสเซมบลี (Assembly Code)</li>
          <li><strong>Assembling (ขั้นสร้างไฟล์วัตถุ):</strong> Assembler จะแปลงรหัสแอสเซมบลีให้เป็นภาษาเครื่องที่อยู่ในรูปไฟล์วัตถุ (Object File <code>.o</code> หรือ <code>.obj</code>)</li>
          <li><strong>Linking (ขั้นเชื่อมโยง):</strong> Linker จะเชื่อมโยง Object File เข้ากับฟังก์ชันสำเร็จรูปของระบบที่เรียกใช้ เพื่อผลิตไฟล์ผลลัพธ์ที่รันได้โดยตรง (Executable File <code>.exe</code> หรือ <code>.out</code>)</li>
        </ol>
    `,
    diagramSvg: `
          <svg class="stages-diagram" viewBox="0 0 580 160">
            <text x="30" y="20" fill="#a5b4fc" font-size="12" font-family="Outfit" font-weight="600">Compilation & Linking Workflow</text>
            
            <rect x="20" y="45" width="90" height="50" rx="4" fill="#1e293b" stroke="#3b82f6" stroke-width="2" />
            <text x="65" y="70" fill="#f8fafc" font-size="10" font-family="JetBrains Mono" text-anchor="middle">Source Code</text>
            <text x="65" y="85" fill="#3b82f6" font-size="9" font-family="JetBrains Mono" text-anchor="middle">main.c</text>
            
            <line x1="110" y1="70" x2="140" y2="70" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#arrow)" />
            
            <rect x="140" y="45" width="90" height="50" rx="4" fill="#1e293b" stroke="#f59e0b" stroke-width="2" />
            <text x="185" y="75" fill="#f8fafc" font-size="11" font-family="Outfit" text-anchor="middle">Compiler</text>
            
            <line x1="230" y1="70" x2="260" y2="70" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#arrow)" />
            
            <rect x="260" y="45" width="90" height="50" rx="4" fill="#1e293b" stroke="#a855f7" stroke-width="2" />
            <text x="305" y="70" fill="#f8fafc" font-size="10" font-family="JetBrains Mono" text-anchor="middle">Object File</text>
            <text x="305" y="85" fill="#a855f7" font-size="9" font-family="JetBrains Mono" text-anchor="middle">main.obj</text>
            
            <line x1="350" y1="70" x2="380" y2="70" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#arrow)" />
            
            <rect x="380" y="45" width="90" height="50" rx="4" fill="#1e293b" stroke="#10b981" stroke-width="2" />
            <text x="425" y="75" fill="#f8fafc" font-size="11" font-family="Outfit" text-anchor="middle">Linker</text>
            
            <line x1="470" y1="70" x2="500" y2="70" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#arrow)" />
            
            <rect x="500" y="45" width="70" height="50" rx="4" fill="#311212" stroke="#ef4444" stroke-width="2" />
            <text x="535" y="70" fill="#f8fafc" font-size="10" font-family="JetBrains Mono" text-anchor="middle">Executable</text>
            <text x="535" y="85" fill="#ef4444" font-size="9" font-family="JetBrains Mono" text-anchor="middle">main.exe</text>
            
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#94a3b8" />
              </marker>
            </defs>
          </svg>
    `,
    example1Title: "โปรแกรมตัวอย่างที่ 1: โครงสร้างโปรแกรมภาษา C ขั้นพื้นฐาน",
    example1Desc: "ศึกษาโครงสร้างส่วนประกอบของซอร์สโค้ดภาษา C อย่างเป็นระบบ สังเกตการใช้คำสั่งจัดระเบียบบรรทัดและฟังก์ชันหลัก main():",
    example1Code: `/* 
   โปรแกรมตัวอย่างแสดงโครงสร้างของภาษา C
   เขียนขึ้นเพื่อศึกษาหน้าที่ของแต่ละคำสั่ง
*/

#include <stdio.h> // 1. Preprocessor directive: นำเข้าส่วนหัวไลบรารีอินพุต/เอาต์พุต

// 2. Main function: ฟังก์ชันหลักและจุดเริ่มต้นการรันโปรแกรม
int main() {
    // 3. Statements: บล็อกคำสั่งการทำงานที่ปิดท้ายด้วยเซมิโคลอน (;)
    printf("ยินดีต้อนรับสู่การศึกษาโครงสร้างโปรแกรมภาษา C\\n");
    printf("สืบค้นคอมพิวเตอร์และเชื่อมต่อระบบส่งใบงานสำเร็จ\\n");
    
    // 4. Return statement: การส่งคืนค่าออกจากฟังก์ชัน (0 แทนการรันปกติปราศจากข้อผิดพลาด)
    return 0; 
}`,
    example2Title: "โปรแกรมตัวอย่างที่ 2: การเติมคำสั่งในโครงสร้างพื้นฐาน",
    example2Desc: "ศึกษาตำแหน่งสำคัญของสัญกรณ์ไวยากรณ์ภาษา C และเติมส่วนโค้ดที่หายไปในช่องว่างกล่องข้อความ เพื่อให้คอมไพเลอร์แปลโค้ดได้ผ่านการทดสอบ:",
    blanks: [
      { id: "blank1", label: "ประกาศนำเข้าห้องสมุด stdio.h", placeholder: "พิมพ์คำตอบที่นี่...", answers: ["#include <stdio.h>", "#include<stdio.h>"] },
      { id: "blank2", label: "ประกาศฟังก์ชันหลัก int main()", placeholder: "พิมพ์คำตอบที่นี่...", answers: ["int main()", "int main(void)", "int main( void )"] },
      { id: "blank3", label: "ปิดท้ายคำสั่งแสดงข้อความ", placeholder: "พิมพ์คำตอบที่นี่...", answers: [";"] },
      { id: "blank4", label: "ส่งค่ากลับจบโปรแกรมปกติ", placeholder: "พิมพ์คำตอบที่นี่...", answers: ["return 0;", "return 0 ;", "return(0);"] }
    ],
    example2RawCode: `// เติมส่วนการประกาศนำเข้าห้องสมุด stdio.h
[BLANK1]

// เติมคำสำคัญประกาศฟังก์ชันหลักของระบบ
[BLANK2] {
    // เติมส่วนปิดท้ายคำสั่งแสดงข้อความ
    printf("ตรวจสอบโครงสร้างโปรแกรมสำเร็จ")[BLANK3]
    
    // เติมส่วนส่งค่ากลับเพื่อยืนยันจบโปรแกรมปกติ
    [BLANK4]
}`,
    example2SolutionCode: `#include <stdio.h>

int main() {
    printf("ตรวจสอบโครงสร้างโปรแกรมสำเร็จ");
    return 0;
}`,
    challengeDesc: "ให้นักศึกษาเติมคำสั่งที่ถูกต้องลงในกล่องข้อความ [ กล่องข้อความ ] ของกิจกรรมท้าทาย เพื่อประกอบโครงสร้างโปรแกรมภาษา C ให้สมบูรณ์ ทั้งส่วน Preprocessor Directives, Function Prototype, ฟังก์ชันหลัก main(), การเรียกใช้ฟังก์ชัน และการส่งค่ากลับ (Return Value)",
    challengeBlanks: [
      { id: "ch_blank1", label: "Preprocessor Directive นำเข้า stdio.h", placeholder: "พิมพ์คำตอบที่นี่...", answers: ["#include <stdio.h>", "#include<stdio.h>"] },
      { id: "ch_blank2", label: "ประกาศ Function Prototype void showInfo()", placeholder: "พิมพ์คำตอบที่นี่...", answers: ["void showInfo()", "void showInfo(void)", "void showInfo( void )"] },
      { id: "ch_blank3", label: "ประกาศฟังก์ชันหลัก int main()", placeholder: "พิมพ์คำตอบที่นี่...", answers: ["int main()", "int main(void)", "int main( void )"] },
      { id: "ch_blank4", label: "คำสั่งแสดงข้อความ printf", placeholder: "พิมพ์คำตอบที่นี่...", answers: ["printf"] },
      { id: "ch_blank5", label: "คำสั่งส่งค่ากลับจบโปรแกรม return 0;", placeholder: "พิมพ์คำตอบที่นี่...", answers: ["return 0;", "return 0 ;", "return(0);"] }
    ],
    challengeRawCode: `/* 
   กิจกรรมท้าทาย: โครงสร้างโปรแกรมภาษา C ที่สมบูรณ์ (Complete Program Structure)
   เติมคำสั่งที่ถูกต้องลงในกล่องข้อความ เพื่อให้โปรแกรมคอมไพล์และทำงานได้อย่างสมบูรณ์
*/

// 1. เติมคำสั่ง Preprocessor Directive นำเข้าไลบรารี Standard I/O
[CH_BLANK1]

// 2. เติมการประกาศฟังก์ชันต้นแบบ (Function Prototype)
[CH_BLANK2];

// 3. จุดเริ่มต้นการทำงานของโปรแกรม (Main Function)
[CH_BLANK3] {
    // เรียกใช้งานฟังก์ชันย่อย
    showInfo();
    
    // 4. เติมคำสั่งแสดงข้อความทางหน้าจอ
    [CH_BLANK4]("C Program Structure Validated Successfully!\\n");
    
    // 5. เติมคำสั่งส่งค่ากลับเพื่อแจ้งระบบว่าโปรแกรมทำงานเสร็จสมบูรณ์
    [CH_BLANK5]
}

// นิยามฟังก์ชันย่อย (Function Definition)
void showInfo() {
    printf("=======================================\\n");
    printf("  C Programming: Structure Challenge   \\n");
    printf("=======================================\\n");
}`,
    challengePlaceholder: ``,
    challengeSolutionCode: `#include <stdio.h>

// 1. ประกาศ Function Prototype
void showInfo();

// 2. Main Function
int main() {
    // เรียกใช้งานฟังก์ชันย่อย
    showInfo();
    
    // แสดงข้อความยืนยันความถูกต้อง
    printf("C Program Structure Validated Successfully!\\n");
    
    // ส่งค่ากลับ 0 เพื่อยืนยันจบโปรแกรมปกติ
    return 0;
}

// 3. Function Definition
void showInfo() {
    printf("=======================================\\n");
    printf("  C Programming: Structure Challenge   \\n");
    printf("=======================================\\n");
}`,
    question1: "1. อธิบายหน้าที่ของ Preprocessor Directives (เช่น #include <stdio.h>) และระบุว่าจะเกิดข้อผิดพลาดอย่างไรหากเราลืมใส่ในโค้ดโปรแกรม?",
    question1Placeholder: "อธิบายหน้าที่ของ Preprocessor Directive ในการดึง Header File และผลกระทบต่อการเรียกใช้ฟังก์ชันมาตรฐาน...",
    question2: "2. อธิบายขั้นตอนที่คอมไพเลอร์ทำการแปลซอร์สโค้ดภาษา C ตั้งแต่ไฟล์ .c ไปจนกระทั่งได้ไฟล์ผลลัพธ์ .exe อย่างสังเขป",
    question2Placeholder: "อธิบาย 4 ขั้นตอนหลักของการแปลงภาษา C (Preprocessing -> Compilation -> Assembly -> Linking)...",
    conclusionPlaceholder: "วิเคราะห์ประโยชน์ของการจัดโครงสร้างโปรแกรมที่มีระเบียบ การใช้ย่อหน้า (Indentation) และความสำคัญของการคอมเมนต์ในกระบวนการทำงานร่วมกัน...",
    codeKeywords: ["include","stdio.h","int main()","showInfo","printf","return 0"],
    q1Keywords: ["preprocessor","include","ห้องสมุด","ฟังก์ชันสำเร็จรูป","error","warning"],
    q2Keywords: ["compiling","linking","assembly","object","exe"]
  }
];

function generateCodeGs(lab) {
  const blanks = lab.blanks || [];
  const blanksCheckingJs = blanks.map((b, idx) => {
    const answersArr = JSON.stringify(b.answers || []);
    return `
    var b${idx+1} = (data.${b.id} || "").toString().trim();
    var isB${idx+1}Correct = ${answersArr}.indexOf(b${idx+1}) !== -1;
    if (isB${idx+1}Correct) blankCorrectCount++;
    `;
  }).join('\n');

  const blanksSummaryJs = blanks.map((b, idx) => `"${idx+1}:" + b${idx+1}`).join(' + ", " + ');

  const challengeBlanks = lab.challengeBlanks || null;
  let challengeGradingJs = '';
  if (challengeBlanks) {
    const chBlanksCheckJs = challengeBlanks.map((b, idx) => {
      const answersArr = JSON.stringify(b.answers || []);
      return `
    var ch_b${idx+1} = (data.${b.id} || "").toString().trim();
    var isChB${idx+1}Correct = ${answersArr}.indexOf(ch_b${idx+1}) !== -1;
    if (isChB${idx+1}Correct) chBlankCorrectCount++;
      `;
    }).join('\n');

    challengeGradingJs = `
    // Check Challenge Blanks (Max 4 pts)
    var chBlankCorrectCount = 0;
    ${chBlanksCheckJs}
    var totalChBlanks = ${challengeBlanks.length};
    var codeScore = totalChBlanks > 0 ? Math.round((chBlankCorrectCount / totalChBlanks) * 4 * 10) / 10 : 4;
    score += codeScore;
    feedback.push("Challenge Blanks: " + codeScore + "/4 (" + chBlankCorrectCount + "/" + totalChBlanks + " ช่อง)");
    `;
  } else {
    challengeGradingJs = `
    // Check Challenge Code (Max 4 pts)
    var code = data.challengeCode || "";
    var codeMatches = 0;
    codeKeywords.forEach(function(kw) {
      if (new RegExp(kw, 'i').test(code)) {
        codeMatches++;
      }
    });
    var codeScore = codeKeywords.length > 0 ? Math.round((codeMatches / codeKeywords.length) * 4 * 10) / 10 : 4;
    score += codeScore;
    feedback.push("Challenge Code: " + codeScore + "/4 (พบ " + codeMatches + "/" + codeKeywords.length + " คีย์เวิร์ด)");
    `;
  }

  return `/**
 * Web App for ${lab.titleEn}
 * Designed by Antigravity AI
 */

function doGet(e) {
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setTitle('${lab.titleTh}')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Handles the submission of student lab data, including base64 file uploads.
 */
function submitLabData(data) {
  try {
    // 1. Open the active spreadsheet
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheetName = "${lab.sheetName}";
    var sheet = ss.getSheetByName(sheetName);
    
    // Auto-create sheet if it doesn't exist
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      var headers = [
        "Timestamp", "ชื่อ-นามสกุล", "รหัสนักศึกษา", "กลุ่ม/ห้อง", "วันที่ทำการทดลอง",
        "เติมคำตอบตัวอย่างที่ 2 (Blanks)",
        "โค้ดโปรแกรมตอบคำท้าทาย", 
        "คำถามข้อที่ 1", "คำถามข้อที่ 2",
        "ลิงก์ไฟล์รูปภาพผลการทดลอง", "ลิงก์ไฟล์โค้ด (.c)", "สรุปผลการทดลอง",
        "คะแนนรวม (เต็ม 10)", "ข้อเสนอแนะระบบตรวจออโต้"
      ];
      sheet.appendRow(headers);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#e2e8f0");
      sheet.setFrozenRows(1);
    }
    
    // Duplicate check: Check if this studentId has already submitted
    var lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      var idValues = sheet.getRange(2, 3, lastRow - 1, 1).getValues();
      var timestampValues = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
      for (var i = 0; i < idValues.length; i++) {
        if (idValues[i][0] && idValues[i][0].toString().trim() === data.studentId.toString().trim()) {
          var prevTime = timestampValues[i][0] ? Utilities.formatDate(new Date(timestampValues[i][0]), "Asia/Bangkok", "dd/MM/yyyy HH:mm") : "ก่อนหน้านี้";
          return {
            status: "duplicate",
            score: 0,
            feedback: "เคยส่งงานแล้ว",
            message: "⚠️ รหัสนักศึกษา " + data.studentId + " ได้ส่งใบงานนี้ไปแล้วเมื่อ " + prevTime + "\\\\nระบบอนุญาตให้ส่งได้เพียง 1 ครั้งเท่านั้น (หากต้องการส่งใหม่ กรุณาติดต่ออาจารย์ผู้สอน)"
          };
        }
      }
    }
    
    // 2. Handle File Uploads (Drive Storage)
    var screenshotUrl = "ไม่ได้แนบไฟล์";
    var codeFileUrl = "ไม่ได้แนบไฟล์";
    
    // Auto-create folders for uploads
    var folderName = "${lab.folderName}";
    var folders = DriveApp.getFoldersByName(folderName);
    var folder;
    if (folders.hasNext()) {
      folder = folders.next();
    } else {
      folder = DriveApp.createFolder(folderName);
    }
    
    // Process screenshot
    if (data.screenshotBase64 && data.screenshotName) {
      var screenshotBlob = Utilities.newBlob(
        Utilities.base64Decode(data.screenshotBase64.split(",")[1]),
        data.screenshotType,
        data.studentId + "_" + data.studentName.replace(/\\s+/g, '_') + "_screenshot_" + data.screenshotName
      );
      var file = folder.createFile(screenshotBlob);
      try {
        file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      } catch (e) {
        try {
          file.setSharing(DriveApp.Access.DOMAIN_WITH_LINK, DriveApp.Permission.VIEW);
        } catch (e2) {}
      }
      screenshotUrl = file.getUrl();
    }
    
    // Process code file
    if (data.codeBase64 && data.codeFileName) {
      var codeBlob = Utilities.newBlob(
        Utilities.base64Decode(data.codeBase64.split(",")[1]),
        data.codeFileType,
        data.studentId + "_" + data.studentName.replace(/\\s+/g, '_') + "_code_" + data.codeFileName
      );
      var file = folder.createFile(codeBlob);
      try {
        file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      } catch (e) {
        try {
          file.setSharing(DriveApp.Access.DOMAIN_WITH_LINK, DriveApp.Permission.VIEW);
        } catch (e2) {}
      }
      codeFileUrl = file.getUrl();
    }
    
    // 2.5 Run Auto-grading
    var codeKeywords = ${JSON.stringify(lab.codeKeywords || [])};
    var q1Keywords = ${JSON.stringify(lab.q1Keywords || [])};
    var q2Keywords = ${JSON.stringify(lab.q2Keywords || [])};
    
    var score = 0;
    var feedback = [];
    
    // Check Fill-in-the-Blanks (Max 2 pts)
    var blankCorrectCount = 0;
    ${blanksCheckingJs}
    var totalBlanks = ${blanks.length};
    var blankScore = totalBlanks > 0 ? Math.round((blankCorrectCount / totalBlanks) * 2 * 10) / 10 : 2;
    score += blankScore;
    feedback.push("เติมคำตอบตัวอย่างที่ 2: " + blankScore + "/2 (" + blankCorrectCount + "/" + totalBlanks + " ช่อง)");
    
    var blanksSummary = ${blanks.length > 0 ? blanksSummaryJs : '""'};

    ${challengeGradingJs}
    
    // Check Q1 (Max 1.5 pts)
    var q1 = data.question1 || "";
    var q1Matches = 0;
    q1Keywords.forEach(function(kw) {
      if (new RegExp(kw, 'i').test(q1)) {
        q1Matches++;
      }
    });
    var q1Score = q1Keywords.length > 0 ? (q1Matches >= 1 ? 1.5 : 0) : 1.5;
    score += q1Score;
    feedback.push("Q1: " + q1Score + "/1.5");
    
    // Check Q2 (Max 1.5 pts)
    var q2 = data.question2 || "";
    var q2Matches = 0;
    q2Keywords.forEach(function(kw) {
      if (new RegExp(kw, 'i').test(q2)) {
        q2Matches++;
      }
    });
    var q2Score = q2Keywords.length > 0 ? (q2Matches >= 1 ? 1.5 : 0) : 1.5;
    score += q2Score;
    feedback.push("Q2: " + q2Score + "/1.5");
    
    // Check Attachments (Max 1 pt)
    var attachScore = 0;
    if (data.screenshotBase64 && data.screenshotName) {
      attachScore += 0.5;
    }
    if (data.codeBase64 && data.codeFileName) {
      attachScore += 0.5;
    }
    score += attachScore;
    feedback.push("ไฟล์แนบ: " + attachScore + "/1");
    
    score = Math.round(score * 10) / 10;

    // 3. Log data to Spreadsheet
    var rowData = [
      new Date(),
      data.studentName,
      data.studentId,
      data.studentGroup,
      data.labDate,
      blanksSummary,
      data.challengeCode,
      data.question1,
      data.question2,
      screenshotUrl,
      codeFileUrl,
      data.conclusion,
      score,
      feedback.join(", ")
    ];
    
    sheet.appendRow(rowData);
    
    return {
      status: "success",
      message: "บันทึกข้อมูลใบงานสำเร็จแล้ว! ข้อมูลของท่านถูกส่งไปที่ Google Sheet เรียบร้อย (คะแนนรวมประเมินออโต้: " + score + "/10)\\n\\nรายละเอียดคะแนน:\\n- " + feedback.join("\\n- ")
    };
    
  } catch (error) {
    return {
      status: "error",
      message: "เกิดข้อผิดพลาดในการบันทึกข้อมูล: " + error.toString()
    };
  }
}
`;
}

function generateIndexHtml(lab) {
  const blanks = lab.blanks || [];
  const challengeBlanks = lab.challengeBlanks || null;

  // Generate interactive code snippet for Example 2
  let interactiveSnippetHtml = lab.example2RawCode || lab.example2Code;
  blanks.forEach((b, idx) => {
    const inputHtml = `<input type="text" id="${b.id}" class="code-inline-input" placeholder="____" maxlength="30" autocomplete="off" spellcheck="false" oninput="handleBlankInput('${b.id}', this.value)">`;
    interactiveSnippetHtml = interactiveSnippetHtml.replace(`[BLANK${idx+1}]`, inputHtml);
  });

  // JS for blank validation (Example 2)
  const jsBlankChecking = blanks.map((b, idx) => {
    const answersArr = JSON.stringify(b.answers || []);
    return `
      const b${idx+1} = (document.getElementById('${b.id}')?.value || '').trim();
      const isB${idx+1}Correct = ${answersArr}.indexOf(b${idx+1}) !== -1;
      const el${idx+1} = document.getElementById('${b.id}');
      applyClass(el${idx+1}, isB${idx+1}Correct);
      if (isB${idx+1}Correct) correctCount++;
    `;
  }).join('\n');

  const jsBlankPayload = blanks.map(b => `${b.id}: (document.getElementById('${b.id}')?.value || '').trim()`).join(',\n        ');

  const jsBlankClear = blanks.map(b => `'${b.id}'`).join(', ');

  // Challenge Blanks handling
  let challengeInteractiveSnippetHtml = '';
  let jsChallengeChecking = '';
  let jsChallengePayload = '';
  let jsChallengeClear = '';

  if (challengeBlanks) {
    challengeInteractiveSnippetHtml = lab.challengeRawCode;
    challengeBlanks.forEach((b, idx) => {
      const inputHtml = `<input type="text" id="${b.id}" class="code-inline-input" placeholder="____" maxlength="30" autocomplete="off" spellcheck="false" oninput="handleChallengeBlankInput('${b.id}', this.value)">`;
      challengeInteractiveSnippetHtml = challengeInteractiveSnippetHtml.replace(`[CH_BLANK${idx+1}]`, inputHtml);
    });

    jsChallengeChecking = challengeBlanks.map((b, idx) => {
      const answersArr = JSON.stringify(b.answers || []);
      return `
        const ch_b${idx+1} = (document.getElementById('${b.id}')?.value || '').trim();
        const isChB${idx+1}Correct = ${answersArr}.indexOf(ch_b${idx+1}) !== -1;
        const ch_el${idx+1} = document.getElementById('${b.id}');
        applyClass(ch_el${idx+1}, isChB${idx+1}Correct);
        if (isChB${idx+1}Correct) chCorrectCount++;
      `;
    }).join('\n');

    jsChallengePayload = challengeBlanks.map(b => `${b.id}: (document.getElementById('${b.id}')?.value || '').trim()`).join(',\n        ');
    jsChallengeClear = challengeBlanks.map(b => `'${b.id}'`).join(', ');
  }

  return `<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${lab.titleTh}</title>
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Sarabun:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <!-- FontAwesome Icons -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  
  <style>
    /* CSS Variables & Design System */
    :root {
      --bg-gradient-start: #0f172a;
      --bg-gradient-end: #020617;
      --card-bg: rgba(30, 41, 59, 0.7);
      --card-border: rgba(255, 255, 255, 0.08);
      --card-hover-border: rgba(99, 102, 241, 0.4);
      --text-main: #f8fafc;
      --text-muted: #94a3b8;
      --accent: #6366f1;
      --accent-glow: rgba(99, 102, 241, 0.3);
      --success: #10b981;
      --warning: #f59e0b;
      --danger: #ef4444;
      --info-frame-bg: rgba(59, 130, 246, 0.1);
      --info-frame-border: #3b82f6;
      --challenge-frame-bg: rgba(245, 158, 11, 0.08);
      --challenge-frame-border: #f59e0b;
      --body-font: 'Sarabun', sans-serif;
      --heading-font: 'Outfit', 'Sarabun', sans-serif;
      --mono-font: 'JetBrains Mono', monospace;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      background: linear-gradient(135deg, var(--bg-gradient-start), var(--bg-gradient-end));
      color: var(--text-main);
      font-family: var(--body-font);
      min-height: 100vh;
      line-height: 1.6;
      padding: 2rem 1rem;
    }

    .container {
      max-width: 1400px;
      margin: 0 auto;
    }

    header {
      text-align: center;
      margin-bottom: 2.5rem;
      position: relative;
    }

    .logo-container {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      margin-bottom: 0.5rem;
    }

    .logo-icon {
      font-size: 2.5rem;
      background: linear-gradient(135deg, #818cf8, #c084fc);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: pulse 3s infinite alternate;
    }

    h1 {
      font-family: var(--heading-font);
      font-size: 2.25rem;
      font-weight: 700;
      letter-spacing: -0.025em;
      background: linear-gradient(to right, #f8fafc, #cbd5e1);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .subtitle {
      color: var(--text-muted);
      font-size: 1rem;
      max-width: 700px;
      margin: 0.5rem auto 0;
    }

    .course-badge {
      display: inline-block;
      padding: 0.35rem 0.85rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 600;
      margin-top: 1rem;
      background: rgba(99, 102, 241, 0.1);
      color: #a5b4fc;
      border: 1px solid rgba(99, 102, 241, 0.2);
    }

    /* Layout Split */
    .dashboard-grid {
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      gap: 2rem;
      margin-bottom: 2rem;
    }

    @media (max-width: 1024px) {
      .dashboard-grid {
        grid-template-columns: 1fr;
      }
    }

    /* Glass Card Base */
    .glass-card {
      background: var(--card-bg);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid var(--card-border);
      border-radius: 16px;
      padding: 2rem;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      height: fit-content;
      position: relative;
      overflow: hidden;
    }

    .glass-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: linear-gradient(90deg, #6366f1, #a855f7);
      opacity: 0.8;
    }

    .card-title {
      font-family: var(--heading-font);
      font-size: 1.35rem;
      font-weight: 600;
      margin-bottom: 1.5rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      color: var(--text-main);
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      padding-bottom: 0.75rem;
    }

    .card-title i {
      color: var(--accent);
    }

    /* Custom Frames */
    .info-frame {
      background: var(--info-frame-bg);
      border-left: 4px solid var(--info-frame-border);
      border-radius: 8px;
      padding: 1.25rem;
      margin-bottom: 1.5rem;
    }

    .info-frame h3 {
      font-family: var(--heading-font);
      color: #93c5fd;
      font-size: 1.1rem;
      margin-bottom: 0.5rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .challenge-frame {
      background: var(--challenge-frame-bg);
      border-left: 4px solid var(--challenge-frame-border);
      border-radius: 8px;
      padding: 1.25rem;
      margin-bottom: 1.5rem;
      border: 1px solid rgba(245, 158, 11, 0.1);
      border-left-width: 4px;
    }

    .challenge-frame h3 {
      font-family: var(--heading-font);
      color: #fde047;
      font-size: 1.1rem;
      margin-bottom: 0.5rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    h2 {
      font-family: var(--heading-font);
      font-size: 1.5rem;
      margin-bottom: 1rem;
      color: #f1f5f9;
    }

    h3 {
      font-family: var(--heading-font);
      font-size: 1.15rem;
      margin: 1.5rem 0 0.75rem 0;
      color: #cbd5e1;
    }

    p {
      margin-bottom: 1rem;
      color: #cbd5e1;
      font-size: 0.95rem;
    }

    ul, ol {
      margin-left: 1.5rem;
      margin-bottom: 1rem;
      color: #cbd5e1;
      font-size: 0.95rem;
    }

    li {
      margin-bottom: 0.35rem;
    }

    .table-container {
      width: 100%;
      overflow-x: auto;
      border-radius: 8px;
      border: 1px solid rgba(255, 255, 255, 0.05);
      background: rgba(15, 23, 42, 0.3);
      margin-bottom: 1.5rem;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
      font-size: 0.9rem;
    }

    th {
      background: rgba(15, 23, 42, 0.6);
      padding: 0.75rem 1rem;
      font-weight: 600;
      color: var(--text-muted);
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }

    td {
      padding: 0.75rem 1rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.03);
      color: #e2e8f0;
    }

    tr:last-child td {
      border-bottom: none;
    }

    .stages-diagram-container {
      background: rgba(15, 23, 42, 0.4);
      border-radius: 12px;
      padding: 1.5rem;
      border: 1px solid rgba(255, 255, 255, 0.05);
      margin: 1.5rem 0;
      display: flex;
      justify-content: center;
    }

    .stages-diagram {
      width: 100%;
      max-width: 580px;
      height: auto;
    }

    /* Code Block styling */
    .code-container {
      position: relative;
      margin-bottom: 1.5rem;
      border-radius: 8px;
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.05);
    }

    .code-header {
      background: rgba(15, 23, 42, 0.8);
      padding: 0.5rem 1rem;
      font-size: 0.75rem;
      color: var(--text-muted);
      font-family: var(--mono-font);
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(255, 255, 255, 0.03);
    }

    .copy-btn {
      background: transparent;
      border: none;
      color: var(--text-muted);
      cursor: pointer;
      font-size: 0.85rem;
      transition: color 0.2s;
    }

    .copy-btn:hover {
      color: var(--accent);
    }

    pre {
      background: rgba(15, 23, 42, 0.5);
      padding: 1.25rem;
      overflow-x: auto;
      margin: 0;
    }

    code {
      font-family: var(--mono-font);
      font-size: 0.85rem;
      color: #38bdf8;
    }

    /* Compact Interactive Fill-in-the-Blank Code Block */
    .interactive-code-container {
      border: 1px solid rgba(99, 102, 241, 0.3);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
    }

    .code-comment {
      color: #94a3b8;
      font-style: italic;
    }

    input.code-inline-input,
    input[type="text"].code-inline-input {
      display: inline-block !important;
      vertical-align: middle !important;
      background: rgba(15, 23, 42, 0.95) !important;
      border: 1.5px dashed #818cf8 !important;
      border-radius: 5px !important;
      color: #38bdf8 !important;
      font-family: var(--mono-font) !important;
      font-size: 0.85rem !important;
      font-weight: 600 !important;
      padding: 2px 6px !important;
      width: 7ch;
      min-width: 55px !important;
      max-width: 95% !important;
      height: 25px !important;
      line-height: 21px !important;
      text-align: center !important;
      outline: none !important;
      box-shadow: none !important;
      transition: border-color 0.2s, background 0.2s, box-shadow 0.2s, width 0.15s ease !important;
      margin: 0 4px !important;
      box-sizing: content-box !important;
    }

    input.code-inline-input:focus,
    input[type="text"].code-inline-input:focus {
      border: 1.5px solid #6366f1 !important;
      background: rgba(30, 41, 59, 0.98) !important;
      box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.4) !important;
      color: #ffffff !important;
    }

    input.code-inline-input.correct,
    input[type="text"].code-inline-input.correct {
      border: 1.5px solid #10b981 !important;
      background: rgba(16, 185, 129, 0.2) !important;
      color: #34d399 !important;
      box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.25) !important;
    }

    input.code-inline-input.incorrect,
    input[type="text"].code-inline-input.incorrect {
      border: 1.5px solid #ef4444 !important;
      background: rgba(239, 68, 68, 0.2) !important;
      color: #f87171 !important;
      box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.25) !important;
    }

    .check-btn {
      background: linear-gradient(135deg, #10b981, #059669);
      color: #ffffff;
      border: none;
      border-radius: 6px;
      padding: 0.35rem 0.85rem;
      font-size: 0.78rem;
      font-family: var(--heading-font);
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      transition: all 0.2s ease;
      box-shadow: 0 2px 8px rgba(16, 185, 129, 0.25);
    }

    .check-btn:hover {
      filter: brightness(1.1);
      transform: translateY(-1px);
    }

    .blank-feedback-bar {
      background: rgba(15, 23, 42, 0.95);
      padding: 0.65rem 1rem;
      border-top: 1px solid rgba(255, 255, 255, 0.05);
      font-size: 0.85rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: var(--text-muted);
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .blank-score-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      font-weight: 500;
      font-size: 0.85rem;
    }

    .blank-score-badge.success { color: #34d399; }
    .blank-score-badge.partial { color: #fbbf24; }
    .blank-score-badge.idle { color: var(--text-muted); }

    /* Anti-Cheat Styling */
    .anti-cheat-pill {
      font-size: 0.72rem;
      font-weight: 600;
      color: #f87171;
      background: rgba(239, 68, 68, 0.12);
      border: 1px solid rgba(239, 68, 68, 0.3);
      padding: 0.2rem 0.6rem;
      border-radius: 9999px;
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      margin-left: auto;
      text-transform: none;
      letter-spacing: 0;
    }

    @keyframes antiCheatShake {
      0%, 100% { transform: translateX(0); border-color: var(--card-border); }
      20%, 60% { transform: translateX(-6px); border-color: var(--danger); box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.35); }
      40%, 80% { transform: translateX(6px); border-color: var(--danger); box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.35); }
    }

    .anti-cheat-alert {
      animation: antiCheatShake 0.5s ease-in-out !important;
      border-color: var(--danger) !important;
    }

    /* Forms */
    .form-section {
      margin-bottom: 1.5rem;
    }

    .form-section-title {
      font-family: var(--heading-font);
      font-size: 1.05rem;
      font-weight: 600;
      color: #94a3b8;
      margin-bottom: 1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
      margin-bottom: 1.25rem;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    @media (max-width: 640px) {
      .form-row {
        grid-template-columns: 1fr;
      }
    }

    label {
      font-size: 0.85rem;
      font-weight: 500;
      color: #cbd5e1;
    }

    .input-wrapper {
      position: relative;
      display: flex;
    }

    .input-icon {
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
      color: var(--text-muted);
      font-size: 0.95rem;
    }

    input[type="text"], input[type="date"], select, textarea {
      width: 100%;
      background: rgba(15, 23, 42, 0.5);
      border: 1px solid var(--card-border);
      border-radius: 8px;
      color: var(--text-main);
      padding: 0.75rem 1rem 0.75rem 2.5rem;
      font-family: var(--body-font);
      font-size: 0.95rem;
      outline: none;
      transition: border-color 0.3s, box-shadow 0.3s;
    }

    textarea {
      padding-left: 1rem;
      resize: vertical;
    }

    input:focus, select:focus, textarea:focus {
      border-color: var(--accent);
      box-shadow: 0 0 0 3px var(--accent-glow);
    }

    .code-textarea {
      font-family: var(--mono-font);
      font-size: 0.9rem;
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid var(--card-border);
      border-radius: 8px;
      color: #38bdf8;
      padding: 1rem;
      width: 100%;
      height: 180px;
      outline: none;
    }

    /* File Upload */
    .upload-area {
      border: 2px dashed rgba(255, 255, 255, 0.15);
      border-radius: 8px;
      padding: 1.5rem;
      text-align: center;
      background: rgba(15, 23, 42, 0.2);
      cursor: pointer;
      position: relative;
      transition: border-color 0.3s, background-color 0.3s;
      margin-bottom: 1rem;
    }

    .upload-area:hover, .upload-area.dragover {
      border-color: var(--accent);
      background: rgba(99, 102, 241, 0.05);
    }

    .upload-icon {
      font-size: 2rem;
      color: var(--text-muted);
      margin-bottom: 0.5rem;
    }

    .upload-text {
      font-size: 0.85rem;
      color: #cbd5e1;
    }

    .upload-hint {
      font-size: 0.75rem;
      color: var(--text-muted);
      margin-top: 0.25rem;
    }

    .file-input {
      display: none;
    }

    .file-preview {
      display: none;
      margin-top: 1rem;
      padding: 0.75rem;
      background: rgba(15, 23, 42, 0.4);
      border-radius: 6px;
      border: 1px solid rgba(255, 255, 255, 0.05);
      align-items: center;
      gap: 0.75rem;
    }

    .preview-thumbnail {
      width: 50px;
      height: 50px;
      border-radius: 4px;
      object-fit: cover;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .preview-details {
      flex-grow: 1;
      min-width: 0;
    }

    .preview-name {
      font-size: 0.8rem;
      color: #f1f5f9;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .preview-size {
      font-size: 0.7rem;
      color: var(--text-muted);
    }

    .remove-file-btn {
      background: transparent;
      border: none;
      color: var(--danger);
      cursor: pointer;
      font-size: 1.1rem;
    }

    /* Buttons */
    .button-group {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      margin-top: 1.5rem;
    }

    .button-sub-group {
      display: grid;
      grid-template-columns: 1fr 1.5fr;
      gap: 0.75rem;
    }

    .btn {
      width: 100%;
      background: linear-gradient(135deg, #6366f1, #4f46e5);
      color: #ffffff;
      border: none;
      border-radius: 8px;
      padding: 0.85rem;
      font-family: var(--heading-font);
      font-size: 1.05rem;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      box-shadow: 0 4px 14px rgba(99, 102, 241, 0.3);
      transition: all 0.2s;
    }

    .btn.btn-check-score {
      background: linear-gradient(135deg, #0d9488, #059669);
      color: #ffffff;
      box-shadow: 0 4px 14px rgba(13, 148, 136, 0.35);
      border: 1px solid rgba(255, 255, 255, 0.15);
      font-size: 1.02rem;
    }

    .btn.btn-check-score:hover {
      box-shadow: 0 6px 20px rgba(13, 148, 136, 0.5);
      filter: brightness(1.08);
      transform: translateY(-1px);
    }

    .btn.btn-secondary {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: none;
      color: var(--text-main);
    }

    .btn.btn-secondary:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    .btn:hover {
      transform: translateY(-1px);
      box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4);
    }

    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }

    /* Connection Banner */
    .connection-status {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      font-size: 0.8rem;
      margin-bottom: 1.5rem;
      padding: 0.5rem;
      border-radius: 8px;
      font-weight: 500;
    }

    .connection-status.local {
      background: rgba(245, 158, 11, 0.1);
      border: 1px solid rgba(245, 158, 11, 0.2);
      color: #f59e0b;
    }

    .connection-status.cloud {
      background: rgba(16, 185, 129, 0.1);
      border: 1px solid rgba(16, 185, 129, 0.2);
      color: #10b981;
    }

    /* Modal overlays */
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(2, 6, 17, 0.8);
      backdrop-filter: blur(8px);
      z-index: 9999;
      display: none;
      align-items: center;
      justify-content: center;
      padding: 1rem;
    }

    .modal-content {
      background: #1e293b;
      border: 1px solid var(--card-border);
      border-radius: 16px;
      max-width: 500px;
      width: 100%;
      padding: 2.25rem 2rem;
      text-align: center;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
      animation: modalScale 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    @keyframes modalScale {
      0% { transform: scale(0.9); opacity: 0; }
      100% { transform: scale(1); opacity: 1; }
    }

    .modal-icon {
      font-size: 3.5rem;
      margin-bottom: 1.25rem;
      display: inline-block;
    }

    .modal-icon.success { color: var(--success); animation: bounce 1s; }
    .modal-icon.error { color: var(--danger); animation: shake 0.5s; }

    .modal-title {
      font-family: var(--heading-font);
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 0.75rem;
      color: var(--text-main);
    }

    .modal-text {
      color: var(--text-muted);
      font-size: 0.95rem;
      margin-bottom: 1.5rem;
      line-height: 1.5;
      white-space: pre-line;
    }

    .modal-close-btn {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.08);
      color: var(--text-main);
      border-radius: 8px;
      padding: 0.6rem 2rem;
      cursor: pointer;
      font-weight: 500;
      font-size: 0.95rem;
    }

    .modal-close-btn:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    /* Pre-submission Score Modal Styles */
    .score-check-modal-content {
      max-width: 560px !important;
      text-align: left !important;
      padding: 1.75rem !important;
      max-height: 90vh;
      display: flex;
      flex-direction: column;
    }

    .score-modal-header {
      display: flex;
      align-items: center;
      gap: 0.85rem;
      margin-bottom: 1.25rem;
      padding-bottom: 0.85rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }

    .score-modal-icon {
      width: 44px;
      height: 44px;
      border-radius: 10px;
      background: linear-gradient(135deg, #0d9488, #10b981);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
      flex-shrink: 0;
      box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
    }

    .score-hero-card {
      background: linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(30, 41, 59, 0.9));
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 12px;
      padding: 1.1rem 1.25rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.25rem;
    }

    .score-big-num {
      font-family: var(--heading-font);
      font-size: 2.2rem;
      font-weight: 700;
      color: #38bdf8;
      line-height: 1;
    }

    .score-status-badge {
      padding: 0.35rem 0.85rem;
      border-radius: 9999px;
      font-size: 0.82rem;
      font-weight: 600;
      background: rgba(16, 185, 129, 0.15);
      color: #34d399;
      border: 1px solid rgba(16, 185, 129, 0.3);
    }

    .score-status-badge.warning {
      background: rgba(245, 158, 11, 0.15);
      color: #fbbf24;
      border-color: rgba(245, 158, 11, 0.3);
    }

    .score-status-badge.danger {
      background: rgba(239, 68, 68, 0.15);
      color: #f87171;
      border-color: rgba(239, 68, 68, 0.3);
    }

    .score-breakdown-list {
      overflow-y: auto;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
      margin-bottom: 1.25rem;
      padding-right: 0.25rem;
    }

    .score-item-row {
      background: rgba(15, 23, 42, 0.5);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 8px;
      padding: 0.75rem 1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem;
    }

    .score-item-info {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
      flex-grow: 1;
      min-width: 0;
    }

    .score-item-title {
      font-size: 0.88rem;
      font-weight: 600;
      color: #f1f5f9;
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }

    .score-item-desc {
      font-size: 0.75rem;
      color: var(--text-muted);
    }

    .score-item-points {
      font-family: var(--mono-font);
      font-size: 0.95rem;
      font-weight: 700;
      color: #38bdf8;
      white-space: nowrap;
      text-align: right;
    }

    .score-modal-actions {
      display: grid;
      grid-template-columns: 1fr 1.2fr;
      gap: 0.75rem;
      padding-top: 0.85rem;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
    }

    @keyframes pulse {
      0% { transform: scale(1); filter: drop-shadow(0 0 2px var(--accent-glow)); }
      100% { transform: scale(1.05); filter: drop-shadow(0 0 8px var(--accent)); }
    }

    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
      40% { transform: translateY(-15px); }
      60% { transform: translateY(-7px); }
    }

    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
      20%, 40%, 60%, 80% { transform: translateX(5px); }
    }

    .loading-spinner {
      animation: spin 1s linear infinite;
      margin-right: 0.5rem;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    /* Print Styles */
    @media print {
      body {
        background: white !important;
        color: black !important;
        padding: 0 !important;
      }
      .container {
        max-width: 100% !important;
        margin: 0 !important;
        padding: 0 !important;
      }
      header, .course-badge, .logo-container, .btn, .upload-area, .remove-file-btn, .modal-overlay, .copy-btn, .code-header, .connection-status, .check-btn, .blank-feedback-bar {
        display: none !important;
      }
      .dashboard-grid {
        display: block !important;
      }
      .glass-card {
        background: transparent !important;
        border: none !important;
        box-shadow: none !important;
        padding: 0 !important;
        margin-bottom: 2rem !important;
        backdrop-filter: none !important;
      }
      .glass-card::before {
        display: none !important;
      }
      .card-title {
        border-bottom: 2px solid #000 !important;
        color: #000 !important;
        margin-bottom: 1rem !important;
        padding-bottom: 0.5rem !important;
        font-weight: bold !important;
      }
      .card-title i {
        display: none !important;
      }
      .info-frame, .challenge-frame {
        background: #f8fafc !important;
        border: 1px solid #cbd5e1 !important;
        border-left: 4px solid #3b82f6 !important;
        color: #000 !important;
      }
      .challenge-frame {
        border-left-color: #f59e0b !important;
        page-break-inside: avoid;
      }
      .info-frame h3, .challenge-frame h3 {
        color: #000 !important;
      }
      p, li, td, th, label {
        color: #000 !important;
      }
      table {
        border: 1px solid #cbd5e1 !important;
      }
      th, td {
        border-bottom: 1px solid #cbd5e1 !important;
        background: transparent !important;
      }
      pre {
        background: #f8fafc !important;
        border: 1px solid #cbd5e1 !important;
      }
      code {
        color: #000 !important;
      }
      /* Convert inputs to dotted lines for print */
      input[type="text"], input[type="date"], select, textarea {
        background: transparent !important;
        border: none !important;
        border-bottom: 1px dotted #000 !important;
        border-radius: 0 !important;
        color: #000 !important;
        padding: 0.25rem 0 !important;
      }
      input.code-inline-input {
        background: transparent !important;
        border: none !important;
        border-bottom: 1px dotted #000 !important;
        color: #000 !important;
        font-weight: bold !important;
        min-width: 50px !important;
      }
      .input-icon {
        display: none !important;
      }
      .code-textarea {
        background: #f8fafc !important;
        border: 1px solid #cbd5e1 !important;
        color: #000 !important;
        height: auto !important;
        min-height: 150px;
        white-space: pre-wrap;
      }
      .print-file-indicator {
        display: block !important;
        font-style: italic;
        margin-top: 0.5rem;
        font-size: 0.85rem;
      }
    }

    .print-file-indicator {
      display: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <div class="logo-container">
        <i class="fa-solid fa-laptop-code logo-icon"></i>
      </div>
      <h1>${lab.titleTh}</h1>
      <p class="subtitle">${lab.introDesc}</p>
      <span class="course-badge">วิชาการเขียนโปรแกรมคอมพิวเตอร์ (C Programming)</span>
    </header>

    <div class="dashboard-grid">
      <!-- Left Column: Lab Guide -->
      <div class="glass-card">
        <div class="card-title">
          <i class="fa-solid fa-book-open"></i> คู่มือปฏิบัติการ
        </div>

        <h2>1. จุดประสงค์การทดลอง</h2>
        <ul>
          ${lab.purpose.map(p => `<li>${p}</li>`).join('\n          ')}
        </ul>

        <h2>2. อุปกรณ์และเครื่องมือการทดลอง</h2>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>ลำดับ</th>
                <th>เครื่องมือ/ซอฟต์แวร์</th>
                <th>วัตถุประสงค์</th>
              </tr>
            </thead>
            <tbody>
              ${lab.equipments.map((eq, i) => `
              <tr>
                <td>${i+1}</td>
                <td>${eq.name}</td>
                <td>${eq.desc}</td>
              </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        ${lab.theoryHtml}
        
        <div class="stages-diagram-container">
          ${lab.diagramSvg}
        </div>

        <h2>4. โปรแกรมตัวอย่างในการทดลอง (Examples for Testing)</h2>
        
        <h3>${lab.example1Title}</h3>
        <p>${lab.example1Desc}</p>
        <div class="code-container">
          <div class="code-header">
            <span>example1.c</span>
            <button class="copy-btn" type="button" onclick="copyCode('ex1Code')"><i class="fa-regular fa-copy"></i> คัดลอก</button>
          </div>
          <pre><code id="ex1Code">${lab.example1Code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        </div>

        <h3>${lab.example2Title}</h3>
        <p>${lab.example2Desc}</p>
        <div class="code-container interactive-code-container">
          <div class="code-header">
            <span><i class="fa-solid fa-pen-to-square"></i> example2_fill.c (เติมคำสั่งลงในกล่องข้อความ)</span>
            <div style="display: flex; gap: 0.5rem; align-items: center;">
              <button class="check-btn" type="button" onclick="checkBlanks()"><i class="fa-solid fa-circle-check"></i> ตรวจคำตอบ</button>
              <button class="copy-btn" type="button" onclick="copyInteractiveCode()"><i class="fa-regular fa-copy"></i> คัดลอกโค้ด</button>
            </div>
          </div>
          <pre><code id="ex2Code">${interactiveSnippetHtml.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/&lt;input([^&]*)&gt;/g, '<input$1>')}</code></pre>
          <div class="blank-feedback-bar">
            <span id="blankFeedbackBadge" class="blank-score-badge idle">
              <i class="fa-solid fa-circle-info"></i> พิมพ์คำตอบลงในช่องว่างแล้วคลิก "ตรวจคำตอบ"
            </span>
            <span id="blankScoreSummary" style="font-size:0.8rem;color:#94a3b8;">คะแนนส่วนนี้: 2 คะแนน (ช่องละ ${(2 / Math.max(1, blanks.length)).toFixed(1)} คะแนน)</span>
          </div>
        </div>

        <div class="challenge-frame">
          <h3><i class="fa-solid fa-trophy"></i> กิจกรรมท้าทาย (Lab Challenge)</h3>
          <p>${lab.challengeDesc}</p>
          ${challengeBlanks ? `
          <div class="code-container interactive-code-container" style="margin-top: 1rem; border-color: rgba(245, 158, 11, 0.4);">
            <div class="code-header" style="background: rgba(245, 158, 11, 0.15);">
              <span style="color: #fde047;"><i class="fa-solid fa-pen-to-square"></i> challenge_fill.c (เติมคำสั่งกิจกรรมท้าทาย)</span>
              <div style="display: flex; gap: 0.5rem; align-items: center;">
                <button class="check-btn" style="background: linear-gradient(135deg, #f59e0b, #d97706);" type="button" onclick="checkChallengeBlanks()"><i class="fa-solid fa-circle-check"></i> ตรวจคำตอบ</button>
                <button class="copy-btn" type="button" onclick="copyChallengeInteractiveCode()"><i class="fa-regular fa-copy"></i> คัดลอกโค้ด</button>
              </div>
            </div>
            <pre><code id="chExCode">${challengeInteractiveSnippetHtml.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/&lt;input([^&]*)&gt;/g, '<input$1>')}</code></pre>
            <div class="blank-feedback-bar">
              <span id="chBlankFeedbackBadge" class="blank-score-badge idle">
                <i class="fa-solid fa-circle-info"></i> พิมพ์คำตอบลงในช่องว่างแล้วคลิก "ตรวจคำตอบ"
              </span>
              <span id="chBlankScoreSummary" style="font-size:0.8rem;color:#94a3b8;">คะแนนส่วนนี้: 4 คะแนน (ช่องละ ${(4 / challengeBlanks.length).toFixed(1)} คะแนน)</span>
            </div>
          </div>
          ` : ''}
        </div>
      </div>

      <!-- Right Column: Submission Form -->
      <div class="glass-card">
        <div class="card-title">
          <i class="fa-solid fa-paper-plane"></i> ส่งรายงานการทดลอง
        </div>

        <div id="connectionStatus" class="connection-status local">
          <i class="fa-solid fa-circle-exclamation"></i>
          <span id="connectionText">Local Preview Mode (บันทึกข้อมูลแบบออฟไลน์)</span>
        </div>

        <form id="labForm" onsubmit="handleFormSubmit(event)">
          <!-- Section 1: Student Info -->
          <div class="form-section">
            <div class="form-section-title">
              <i class="fa-solid fa-user-graduate"></i> 1. ข้อมูลผู้ส่งใบงาน
            </div>
            
            <div class="form-group">
              <label for="studentName">ชื่อ - นามสกุล (ภาษาไทย)</label>
              <div class="input-wrapper">
                <i class="fa-solid fa-user input-icon"></i>
                <input type="text" id="studentName" required placeholder="เช่น นายสมชาย ดีใจ">
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="studentId">รหัสนักศึกษา</label>
                <div class="input-wrapper">
                  <i class="fa-solid fa-id-card input-icon"></i>
                  <input type="text" id="studentId" required placeholder="เช่น 65010999">
                </div>
              </div>
              <div class="form-group">
                <label for="studentGroup">กลุ่ม / ห้องเรียน</label>
                <div class="input-wrapper">
                  <i class="fa-solid fa-users input-icon"></i>
                  <input type="text" id="studentGroup" required placeholder="เช่น กลุ่ม 1 หรือ Sec 2">
                </div>
              </div>
            </div>

            <div class="form-group">
              <label for="labDate">วันที่ทำการทดลอง</label>
              <div class="input-wrapper">
                <i class="fa-solid fa-calendar-day input-icon"></i>
                <input type="date" id="labDate" required>
              </div>
            </div>
          </div>

          <!-- Section 2: Code Submission / Challenge -->
          <div class="form-section">
            <div class="form-section-title">
              <i class="fa-solid fa-file-code"></i> 2. ผลการทำกิจกรรมท้าทาย (${challengeBlanks ? 'Lab Challenge' : 'Source Code'})
            </div>
            ${challengeBlanks ? `
            <div style="background: rgba(15, 23, 42, 0.4); border: 1px solid var(--card-border); border-radius: 8px; padding: 1rem;">
              <p style="margin: 0; font-size: 0.9rem; color: #cbd5e1; display: flex; align-items: center; gap: 0.5rem;">
                <i class="fa-solid fa-circle-check" style="color: #10b981; font-size: 1.1rem;"></i>
                <span>ระบบเชื่อมต่อและดึงคำตอบจากกล่องข้อความใน <strong>กิจกรรมท้าทาย (ฝั่งซ้าย)</strong> ไปประเมินและบันทึกคะแนนโดยอัตโนมัติ (คะแนนเต็ม 4.0 คะแนน)</span>
              </p>
            </div>
            ` : `
            <div class="form-group">
              <label for="challengeCode">พิมพ์โค้ดภาษา C ของคุณที่นี่</label>
              <textarea id="challengeCode" class="code-textarea" required placeholder="${lab.challengePlaceholder.replace(/"/g, '&quot;')}"></textarea>
            </div>
            `}
          </div>

          <!-- Section 3: Questions -->
          <div class="form-section">
            <div class="form-section-title">
              <i class="fa-solid fa-circle-question"></i> 3. คำถามท้ายการทดลอง
              <span class="anti-cheat-pill" title="ระบบตรวจจับการลอก: ห้ามวางข้อความ (Paste)"><i class="fa-solid fa-shield-halved"></i> ห้ามวางข้อความ (No Paste)</span>
            </div>

            <div class="form-group">
              <label for="question1">${lab.question1}</label>
              <textarea id="question1" rows="3" required placeholder="${lab.question1Placeholder}"></textarea>
            </div>

            <div class="form-group">
              <label for="question2">${lab.question2}</label>
              <textarea id="question2" rows="3" required placeholder="${lab.question2Placeholder}"></textarea>
            </div>
          </div>

          <!-- Section 4: File Uploads -->
          <div class="form-section">
            <div class="form-section-title">
              <i class="fa-solid fa-paperclip"></i> 4. ไฟล์แนบ (Attachments)
            </div>

            <!-- Screenshot upload -->
            <div class="form-group">
              <label>1. รูปภาพหลักฐานการรันโปรแกรมสำเร็จ (Screenshot)</label>
              <div class="upload-area" id="screenshotArea" onclick="document.getElementById('screenshotInput').click()">
                <i class="fa-solid fa-image upload-icon"></i>
                <div class="upload-text">ลากไฟล์รูปภาพมาวางที่นี่ หรือคลิกเพื่อเลือกไฟล์</div>
                <div class="upload-hint">ยอมรับไฟล์ JPG, PNG ขนาดไม่เกิน 5MB</div>
                <input type="file" id="screenshotInput" class="file-input" accept="image/*" onchange="handleFileSelect(this, 'screenshot')">
              </div>
              <div class="file-preview" id="screenshotPreview">
                <img src="" class="preview-thumbnail" id="screenshotThumb">
                <div class="preview-details">
                  <div class="preview-name" id="screenshotName">file_name.png</div>
                  <div class="preview-size" id="screenshotSize">0 KB</div>
                </div>
                <button type="button" class="remove-file-btn" onclick="removeFile('screenshot')"><i class="fa-solid fa-xmark"></i></button>
              </div>
              <div class="print-file-indicator" id="printScreenshotText">ไฟล์ภาพแนบ: [ไม่ได้เลือกภาพ]</div>
            </div>

            <!-- Code file upload -->
            <div class="form-group">
              <label>2. ไฟล์ซอร์สโค้ดภาษา C (.c)</label>
              <div class="upload-area" id="codeArea" onclick="document.getElementById('codeInput').click()">
                <i class="fa-solid fa-file-arrow-up upload-icon"></i>
                <div class="upload-text">ลากไฟล์ .c มาวางที่นี่ หรือคลิกเพื่อเลือกไฟล์</div>
                <div class="upload-hint">ยอมรับไฟล์ประเภท .c ขนาดไม่เกิน 2MB</div>
                <input type="file" id="codeInput" class="file-input" accept=".c" onchange="handleFileSelect(this, 'code')">
              </div>
              <div class="file-preview" id="codePreview">
                <div class="card-icon" style="width: 40px; height: 40px;"><i class="fa-solid fa-code"></i></div>
                <div class="preview-details">
                  <div class="preview-name" id="codeFileName">main.c</div>
                  <div class="preview-size" id="codeFileSize">0 KB</div>
                </div>
                <button type="button" class="remove-file-btn" onclick="removeFile('code')"><i class="fa-solid fa-xmark"></i></button>
              </div>
              <div class="print-file-indicator" id="printCodeText">ไฟล์โค้ดแนบ: [ไม่ได้เลือกไฟล์โค้ด]</div>
            </div>
          </div>

          <!-- Section 5: Conclusion -->
          <div class="form-section">
            <div class="form-section-title">
              <i class="fa-solid fa-comment-dots"></i> 5. สรุปผลการทดลอง
              <span class="anti-cheat-pill" title="ระบบตรวจจับการลอก: ห้ามวางข้อความ (Paste)"><i class="fa-solid fa-shield-halved"></i> ห้ามวางข้อความ (No Paste)</span>
            </div>
            <div class="form-group">
              <label for="conclusion">สรุปและข้อเสนอแนะจากการทดลอง</label>
              <textarea id="conclusion" rows="4" required placeholder="${lab.conclusionPlaceholder}"></textarea>
            </div>
          </div>

          <!-- Actions -->
          <div class="button-group">
            <button type="button" class="btn btn-check-score" id="checkScoreBtn" onclick="checkPreSubmissionScore()">
              <i class="fa-solid fa-list-check"></i> ตรวจสอบคะแนนก่อนส่ง (Pre-check Score)
            </button>
            <div class="button-sub-group">
              <button type="button" class="btn btn-secondary" onclick="window.print()">
                <i class="fa-solid fa-print"></i> พิมพ์ PDF
              </button>
              <button type="submit" class="btn" id="submitBtn">
                <i class="fa-solid fa-paper-plane"></i> ส่งใบงานออนไลน์
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>



  <!-- Pre-submission Score Check Modal -->
  <div class="modal-overlay" id="scoreCheckModal">
    <div class="modal-content score-check-modal-content">
      <div class="score-modal-header">
        <div class="score-modal-icon"><i class="fa-solid fa-chart-pie"></i></div>
        <div>
          <h3 class="modal-title" style="text-align:left;margin-bottom:0.15rem;font-size:1.25rem;">ผลการประเมินคะแนนเบื้องต้น</h3>
          <p style="font-size:0.8rem;color:var(--text-muted);text-align:left;margin:0;">ตรวจสอบความสมบูรณ์และคะแนนประเมินก่อนส่งใบงานจริง</p>
        </div>
      </div>

      <!-- Score Hero Banner -->
      <div class="score-hero-card">
        <div class="score-big-num" id="preScoreTotal">0.0 <span style="font-size:1.1rem;color:#94a3b8;font-weight:400;">/ 10</span></div>
        <div class="score-status-badge" id="preScoreBadge">พร้อมส่งรายงาน</div>
      </div>

      <!-- Breakdown Table / Cards -->
      <div class="score-breakdown-list" id="preScoreBreakdown">
        <!-- Dynamic content rendered by checkPreSubmissionScore() -->
      </div>

      <!-- Modal Footer Action Buttons -->
      <div class="score-modal-actions">
        <button type="button" class="btn btn-secondary" onclick="closeScoreCheckModal()">
          <i class="fa-solid fa-pen-to-square"></i> กลับไปแก้ไข
        </button>
        <button type="button" class="btn" id="modalSubmitBtn" onclick="submitFromScoreModal()">
          <i class="fa-solid fa-paper-plane"></i> ยืนยันส่งใบงาน
        </button>
      </div>
    </div>
  </div>

  <!-- Submission Confirmation Modal (One-Time Final Submission) -->
  <div class="modal-overlay" id="confirmSubmitModal">
    <div class="modal-content" style="max-width: 500px; text-align: left; padding: 1.75rem;">
      <div style="display:flex; align-items:center; gap:0.75rem; margin-bottom:1rem; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:0.75rem;">
        <div style="width:42px;height:42px;border-radius:10px;background:linear-gradient(135deg, #f59e0b, #d97706);color:#fff;display:flex;align-items:center;justify-content:center;font-size:1.25rem;flex-shrink:0;">
          <i class="fa-solid fa-triangle-exclamation"></i>
        </div>
        <div>
          <h3 class="modal-title" style="margin:0;font-size:1.2rem;text-align:left;">ยืนยันการส่งใบงานขั้นสุดท้าย</h3>
          <p style="margin:0;font-size:0.8rem;color:var(--text-muted);">กรุณาตรวจสอบความถูกต้องก่อนยืนยัน</p>
        </div>
      </div>
      
      <div style="background:rgba(245, 158, 11, 0.1);border:1px solid rgba(245, 158, 11, 0.25);border-radius:8px;padding:0.85rem 1rem;color:#fde047;font-size:0.88rem;line-height:1.5;margin-bottom:1.25rem;">
        <i class="fa-solid fa-circle-exclamation"></i> <strong>คำเตือน:</strong> ใบงานนี้สามารถส่งได้ <u>เพียง 1 ครั้งเท่านั้น</u> และจะไม่สามารถแก้ไขได้อีกหลังจากกดยืนยัน (สามารถกด "ตรวจสอบคะแนนก่อนส่ง" เพื่อประเมินก่อนได้)
      </div>
      
      <p style="font-size:0.9rem;color:#cbd5e1;margin-bottom:1.5rem;line-height:1.6;">
        คุณต้องการยืนยันการส่งใบงานของ <strong><span id="confirmStudentName">-</span></strong> (รหัส <strong><span id="confirmStudentId">-</span></strong>) ใช่หรือไม่?
      </p>
      
      <div style="display:grid;grid-template-columns:1fr 1.3fr;gap:0.75rem;">
        <button type="button" class="btn btn-secondary" onclick="closeSubmitConfirmModal()">
          <i class="fa-solid fa-pen-to-square"></i> กลับไปตรวจอีกครั้ง
        </button>
        <button type="button" class="btn" style="background:linear-gradient(135deg, #10b981, #059669);" onclick="executeFinalSubmit()">
          <i class="fa-solid fa-paper-plane"></i> ยืนยันส่งงาน
        </button>
      </div>
    </div>
  </div>

  <!-- Toast Modal for Success/Error feedback -->
  <div class="modal-overlay" id="statusModal">
    <div class="modal-content">
      <span class="modal-icon" id="modalIcon"></span>
      <h3 class="modal-title" id="modalTitle">กำลังบันทึกข้อมูล...</h3>
      <p class="modal-text" id="modalText">ระบบกำลังรับส่งข้อมูลของท่าน กรุณารอสักครู่</p>
      <button class="modal-close-btn" onclick="closeModal()">ตกลง</button>
    </div>
  </div>

  <script>
    // Global Data variables for base64 files
    const filesData = {
      screenshotBase64: null,
      screenshotName: null,
      screenshotType: null,
      codeBase64: null,
      codeFileName: null,
      codeFileType: null
    };

    // Auto-setup when DOM is loaded
    document.addEventListener('DOMContentLoaded', () => {
      // 1. Check environment
      const isGoogleAppsScript = (typeof google !== 'undefined' && google.script && google.script.run);
      const connBanner = document.getElementById('connectionStatus');
      const connText = document.getElementById('connectionText');
      
      if (isGoogleAppsScript) {
        connBanner.className = 'connection-status cloud';
        connBanner.innerHTML = '<i class="fa-solid fa-cloud"></i> <span>เชื่อมต่อ Google Sheets แล้ว (Online Mode)</span>';
      } else {
        connBanner.className = 'connection-status local';
        connBanner.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> <span>Local Preview Mode (โหมดทดสอบออฟไลน์)</span>';
      }

      // 2. Set default Date
      const dateInput = document.getElementById('labDate');
      const today = new Date().toISOString().split('T')[0];
      dateInput.value = today;

      // 3. Load Student Info from LocalStorage
      const storedName = localStorage.getItem('student_name');
      const storedId = localStorage.getItem('student_id');
      const storedGroup = localStorage.getItem('student_group');
      
      if (storedName) document.getElementById('studentName').value = storedName;
      if (storedId) document.getElementById('studentId').value = storedId;
      if (storedGroup) document.getElementById('studentGroup').value = storedGroup;

      // 4. Drag & Drop features
      setupDragAndDrop('screenshotArea', 'screenshotInput', 'screenshot');
      setupDragAndDrop('codeArea', 'codeInput', 'code');

      // 5. Initialize Anti-Cheat protection
      initAntiCheat();

      // 6. Initialize Auto-Resize on inline inputs
      document.querySelectorAll('input.code-inline-input').forEach(input => {
        autoResizeInlineInput(input);
        input.addEventListener('input', () => autoResizeInlineInput(input));
      });

      // 7. Check if student already submitted this lab
      if (storedId) {
        const labStorageKey = 'submitted_${lab.idName}_' + storedId;
        const prevSubmitTime = localStorage.getItem(labStorageKey);
        if (prevSubmitTime) {
          lockFormAsSubmitted(prevSubmitTime);
        }
      }

      document.getElementById('studentId')?.addEventListener('change', (e) => {
        const sId = (e.target.value || '').trim();
        if (sId) {
          const labStorageKey = 'submitted_${lab.idName}_' + sId;
          const prevSubmitTime = localStorage.getItem(labStorageKey);
          if (prevSubmitTime) {
            lockFormAsSubmitted(prevSubmitTime);
          }
        }
      });
    });

    // Auto-Resize inline input to fit content dynamically
    function autoResizeInlineInput(el) {
      if (!el) return;
      const textLen = (el.value || '').length;
      const placeholderLen = (el.placeholder || '____').length;
      const chCount = Math.max(placeholderLen, textLen);
      el.style.width = (chCount + 2) + 'ch';
    }

    // Anti-Cheat: Prevent Paste and Drag-Drop in Questions and Conclusion
    function initAntiCheat() {
      const protectedIds = ['question1', 'question2', 'conclusion'];
      
      function showAntiCheatWarning(targetEl) {
        if (targetEl) {
          targetEl.classList.add('anti-cheat-alert');
          setTimeout(() => targetEl.classList.remove('anti-cheat-alert'), 800);
        }
        
        let toast = document.getElementById('_antiCheatToast');
        if (!toast) {
          toast = document.createElement('div');
          toast.id = '_antiCheatToast';
          toast.style.cssText = 'position:fixed;top:25px;left:50%;transform:translateX(-50%);' +
            'padding:12px 24px;border-radius:10px;font-size:14px;font-weight:600;' +
            'z-index:999999;box-shadow:0 8px 24px rgba(239,68,68,0.4);transition:all 0.3s cubic-bezier(0.4, 0, 0.2, 1);' +
            'pointer-events:none;white-space:nowrap;display:flex;align-items:center;gap:8px;' +
            'background:linear-gradient(135deg, #ef4444, #dc2626);color:#ffffff;border:1px solid #fca5a5;';
          document.body.appendChild(toast);
        }
        toast.innerHTML = '<i class="fa-solid fa-shield-halved" style="font-size:16px;"></i> <span>ระบบตรวจจับการลอก: ไม่อนุญาตให้วางข้อความ (Paste) กรุณาพิมพ์คำตอบด้วยตนเอง</span>';
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(-50%) translateY(0)';
        clearTimeout(toast._t);
        toast._t = setTimeout(() => {
          toast.style.opacity = '0';
          toast.style.transform = 'translateX(-50%) translateY(-10px)';
        }, 2800);
      }

      protectedIds.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;

        el.addEventListener('paste', (e) => {
          e.preventDefault();
          showAntiCheatWarning(el);
        });

        el.addEventListener('drop', (e) => {
          e.preventDefault();
          showAntiCheatWarning(el);
        });

        el.addEventListener('keydown', (e) => {
          if ((e.ctrlKey || e.metaKey) && (e.key === 'v' || e.key === 'V')) {
            e.preventDefault();
            showAntiCheatWarning(el);
          }
          if (e.shiftKey && e.key === 'Insert') {
            e.preventDefault();
            showAntiCheatWarning(el);
          }
        });

        let lastVal = el.value;
        el.addEventListener('input', (e) => {
          if (e.inputType === 'insertFromPaste' || e.inputType === 'insertFromDrop') {
            el.value = lastVal;
            showAntiCheatWarning(el);
            return;
          }
          if (el.value.length - lastVal.length > 25 && e.inputType !== 'historyUndo') {
            el.value = lastVal;
            showAntiCheatWarning(el);
            return;
          }
          lastVal = el.value;
        });
      });
    }

    // Handle blank input typing (Example 2)
    function handleBlankInput(id, val) {
      const inlineEl = document.getElementById(id);
      if (inlineEl) {
        inlineEl.classList.remove('correct', 'incorrect');
        autoResizeInlineInput(inlineEl);
      }

      const badge = document.getElementById('blankFeedbackBadge');
      if (badge) {
        badge.className = 'blank-score-badge idle';
        badge.innerHTML = '<i class="fa-solid fa-circle-info"></i> พิมพ์คำตอบลงในช่องว่างแล้วคลิก "ตรวจคำตอบ"';
      }
    }

    // Check blanks helper (Example 2)
    function checkBlanks(silent = false) {
      function applyClass(el, isOk) {
        if (!el) return;
        el.classList.remove('correct', 'incorrect');
        if (el.value.trim().length > 0) {
          el.classList.add(isOk ? 'correct' : 'incorrect');
        }
      }

      let correctCount = 0;
      ${jsBlankChecking}

      const totalBlanks = ${blanks.length};
      const blankScore = totalBlanks > 0 ? Number(((correctCount / totalBlanks) * 2).toFixed(1)) : 2.0;

      if (!silent) {
        const badge = document.getElementById('blankFeedbackBadge');
        if (badge) {
          if (correctCount === totalBlanks) {
            badge.className = 'blank-score-badge success';
            badge.innerHTML = '<i class="fa-solid fa-circle-check"></i> ถูกต้องครบถ้วน ' + totalBlanks + '/' + totalBlanks + ' ช่อง! (ได้ ' + blankScore + '/2.0 คะแนน)';
          } else if (correctCount > 0) {
            badge.className = 'blank-score-badge partial';
            badge.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> ถูกต้อง ' + correctCount + '/' + totalBlanks + ' ช่อง (ได้ ' + blankScore + '/2.0 คะแนน) — กรุณาตรวจดูอีกครั้ง';
          } else {
            badge.className = 'blank-score-badge';
            badge.style.color = 'var(--danger)';
            badge.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> ยังไม่ถูกต้อง กรุณาพิจารณาโค้ดและพิมพ์คำตอบใหม่';
          }
        }
      }

      return {
        correctCount: correctCount,
        blankScore: blankScore,
        totalBlanks: totalBlanks
      };
    }

    // Copy interactive code helper (Example 2)
    function copyInteractiveCode() {
      let codeStr = \`${lab.example2RawCode || lab.example2Code}\`;
      ${blanks.map((b, idx) => `
      const val_${b.id} = (document.getElementById('${b.id}')?.value || '____').trim();
      codeStr = codeStr.replace('[BLANK${idx+1}]', val_${b.id});
      `).join('')}

      function showCopyToast(msg, isError) {
        let toast = document.getElementById('_copyToast');
        if (!toast) {
          toast = document.createElement('div');
          toast.id = '_copyToast';
          toast.style.cssText = 'position:fixed;bottom:30px;left:50%;transform:translateX(-50%);' +
            'padding:10px 24px;border-radius:8px;font-size:15px;font-weight:600;' +
            'z-index:99999;box-shadow:0 4px 16px rgba(0,0,0,0.25);transition:opacity 0.4s;pointer-events:none;white-space:nowrap;';
          document.body.appendChild(toast);
        }
        toast.style.background = isError ? '#ef4444' : '#22c55e';
        toast.style.color = '#fff';
        toast.textContent = msg;
        toast.style.opacity = '1';
        clearTimeout(toast._t);
        toast._t = setTimeout(() => { toast.style.opacity = '0'; }, 2500);
      }

      if (window.isSecureContext && navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(codeStr)
          .then(() => showCopyToast('✓ คัดลอกโค้ดตัวอย่างที่ 2 แล้ว!'))
          .catch(() => showCopyToast('กรุณากด Ctrl+C หลังเลือกโค้ด', true));
      } else {
        const ta = document.createElement('textarea');
        ta.value = codeStr;
        ta.style.cssText = 'position:fixed;top:-9999px;left:-9999px;';
        document.body.appendChild(ta);
        ta.select();
        try {
          document.execCommand('copy');
          showCopyToast('✓ คัดลอกโค้ดตัวอย่างที่ 2 แล้ว!');
        } catch(e) {
          showCopyToast('กรุณากด Ctrl+C หลังเลือกโค้ด', true);
        }
        document.body.removeChild(ta);
      }
    }

    ${challengeBlanks ? `
    // Handle Challenge Blank input
    function handleChallengeBlankInput(id, val) {
      const inlineEl = document.getElementById(id);
      if (inlineEl) {
        inlineEl.classList.remove('correct', 'incorrect');
        autoResizeInlineInput(inlineEl);
      }

      const badge = document.getElementById('chBlankFeedbackBadge');
      if (badge) {
        badge.className = 'blank-score-badge idle';
        badge.innerHTML = '<i class="fa-solid fa-circle-info"></i> พิมพ์คำตอบลงในช่องว่างแล้วคลิก "ตรวจคำตอบ"';
      }
    }

    // Check Challenge Blanks helper
    function checkChallengeBlanks(silent = false) {
      function applyClass(el, isOk) {
        if (!el) return;
        el.classList.remove('correct', 'incorrect');
        if (el.value.trim().length > 0) {
          el.classList.add(isOk ? 'correct' : 'incorrect');
        }
      }

      let chCorrectCount = 0;
      ${jsChallengeChecking}

      const totalChBlanks = ${challengeBlanks.length};
      const chScore = totalChBlanks > 0 ? Number(((chCorrectCount / totalChBlanks) * 4).toFixed(1)) : 4.0;

      if (!silent) {
        const badge = document.getElementById('chBlankFeedbackBadge');
        if (badge) {
          if (chCorrectCount === totalChBlanks) {
            badge.className = 'blank-score-badge success';
            badge.innerHTML = '<i class="fa-solid fa-circle-check"></i> ถูกต้องครบถ้วน ' + totalChBlanks + '/' + totalChBlanks + ' ช่อง! (ได้ ' + chScore + '/4.0 คะแนน)';
          } else if (chCorrectCount > 0) {
            badge.className = 'blank-score-badge partial';
            badge.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> ถูกต้อง ' + chCorrectCount + '/' + totalChBlanks + ' ช่อง (ได้ ' + chScore + '/4.0 คะแนน) — กรุณาตรวจดูอีกครั้ง';
          } else {
            badge.className = 'blank-score-badge';
            badge.style.color = 'var(--danger)';
            badge.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> ยังไม่ถูกต้อง กรุณาพิจารณาโครงสร้างโค้ดและพิมพ์คำตอบใหม่';
          }
        }
      }

      return {
        chCorrectCount: chCorrectCount,
        challengeScore: chScore,
        totalChBlanks: totalChBlanks
      };
    }

    // Copy interactive code helper (Challenge)
    function copyChallengeInteractiveCode() {
      let codeStr = \`${lab.challengeRawCode || ''}\`;
      ${challengeBlanks.map((b, idx) => `
      const val_${b.id} = (document.getElementById('${b.id}')?.value || '____').trim();
      codeStr = codeStr.replace('[CH_BLANK${idx+1}]', val_${b.id});
      `).join('')}

      function showCopyToast(msg, isError) {
        let toast = document.getElementById('_copyToast');
        if (!toast) {
          toast = document.createElement('div');
          toast.id = '_copyToast';
          toast.style.cssText = 'position:fixed;bottom:30px;left:50%;transform:translateX(-50%);' +
            'padding:10px 24px;border-radius:8px;font-size:15px;font-weight:600;' +
            'z-index:99999;box-shadow:0 4px 16px rgba(0,0,0,0.25);transition:opacity 0.4s;pointer-events:none;white-space:nowrap;';
          document.body.appendChild(toast);
        }
        toast.style.background = isError ? '#ef4444' : '#22c55e';
        toast.style.color = '#fff';
        toast.textContent = msg;
        toast.style.opacity = '1';
        clearTimeout(toast._t);
        toast._t = setTimeout(() => { toast.style.opacity = '0'; }, 2500);
      }

      if (window.isSecureContext && navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(codeStr)
          .then(() => showCopyToast('✓ คัดลอกโค้ดกิจกรรมท้าทายแล้ว!'))
          .catch(() => showCopyToast('กรุณากด Ctrl+C หลังเลือกโค้ด', true));
      } else {
        const ta = document.createElement('textarea');
        ta.value = codeStr;
        ta.style.cssText = 'position:fixed;top:-9999px;left:-9999px;';
        document.body.appendChild(ta);
        ta.select();
        try {
          document.execCommand('copy');
          showCopyToast('✓ คัดลอกโค้ดกิจกรรมท้าทายแล้ว!');
        } catch(e) {
          showCopyToast('กรุณากด Ctrl+C หลังเลือกโค้ด', true);
        }
        document.body.removeChild(ta);
      }
    }
    ` : ''}

    // Copy standard code helper
    function copyCode(elementId) {
      const el = document.getElementById(elementId);
      const codeText = el ? el.innerText : '';
      if (!codeText) return;

      function showCopyToast(msg, isError) {
        let toast = document.getElementById('_copyToast');
        if (!toast) {
          toast = document.createElement('div');
          toast.id = '_copyToast';
          toast.style.cssText = 'position:fixed;bottom:30px;left:50%;transform:translateX(-50%);' +
            'padding:10px 24px;border-radius:8px;font-size:15px;font-weight:600;' +
            'z-index:99999;box-shadow:0 4px 16px rgba(0,0,0,0.25);transition:opacity 0.4s;pointer-events:none;white-space:nowrap;';
          document.body.appendChild(toast);
        }
        toast.style.background = isError ? '#ef4444' : '#22c55e';
        toast.style.color = '#fff';
        toast.textContent = msg;
        toast.style.opacity = '1';
        clearTimeout(toast._t);
        toast._t = setTimeout(() => { toast.style.opacity = '0'; }, 2500);
      }

      if (window.isSecureContext && navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(codeText)
          .then(() => showCopyToast('✓ คัดลอกโค้ดแล้ว!'))
          .catch(() => showCopyToast('กรุณากด Ctrl+C หลังเลือกโค้ด', true));
      } else {
        const ta = document.createElement('textarea');
        ta.value = codeText;
        ta.style.cssText = 'position:fixed;top:-9999px;left:-9999px;';
        document.body.appendChild(ta);
        ta.select();
        try {
          document.execCommand('copy');
          showCopyToast('✓ คัดลอกโค้ดแล้ว!');
        } catch(e) {
          showCopyToast('กรุณากด Ctrl+C หลังเลือกโค้ด', true);
        }
        document.body.removeChild(ta);
      }
    }

    // Drag and Drop setup helper
    function setupDragAndDrop(areaId, inputId, type) {
      const area = document.getElementById(areaId);
      const input = document.getElementById(inputId);

      area.addEventListener('dragover', (e) => {
        e.preventDefault();
        area.classList.add('dragover');
      });

      area.addEventListener('dragleave', () => {
        area.classList.remove('dragover');
      });

      area.addEventListener('drop', (e) => {
        e.preventDefault();
        area.classList.remove('dragover');
        if (e.dataTransfer.files.length > 0) {
          input.files = e.dataTransfer.files;
          handleFileSelect(input, type);
        }
      });
    }

    // Handle File upload, convert to base64
    function handleFileSelect(input, type) {
      const file = input.files[0];
      if (!file) return;

      const maxMegaBytes = (type === 'screenshot') ? 5 : 2;
      if (file.size > maxMegaBytes * 1024 * 1024) {
        alert(\`ขนาดไฟล์เกินกำหนด! ไฟล์ต้องมีขนาดไม่เกิน \${maxMegaBytes}MB\`);
        input.value = '';
        return;
      }

      const reader = new FileReader();
      reader.onload = function(e) {
        if (type === 'screenshot') {
          filesData.screenshotBase64 = e.target.result;
          filesData.screenshotName = file.name;
          filesData.screenshotType = file.type;

          document.getElementById('screenshotThumb').src = e.target.result;
          document.getElementById('screenshotName').innerText = file.name;
          document.getElementById('screenshotSize').innerText = (file.size / 1024).toFixed(1) + ' KB';
          document.getElementById('screenshotArea').style.display = 'none';
          document.getElementById('screenshotPreview').style.display = 'flex';
          document.getElementById('printScreenshotText').innerText = \`ไฟล์ภาพแนบ: \${file.name}\`;
        } else {
          filesData.codeBase64 = e.target.result;
          filesData.codeFileName = file.name;
          filesData.codeFileType = file.type;

          document.getElementById('codeFileName').innerText = file.name;
          document.getElementById('codeFileSize').innerText = (file.size / 1024).toFixed(1) + ' KB';
          document.getElementById('codeArea').style.display = 'none';
          document.getElementById('codePreview').style.display = 'flex';
          document.getElementById('printCodeText').innerText = \`ไฟล์โค้ดแนบ: \${file.name}\`;
        }
      };

      reader.readAsDataURL(file);
    }

    // Remove File helper
    function removeFile(type) {
      if (type === 'screenshot') {
        filesData.screenshotBase64 = null;
        filesData.screenshotName = null;
        filesData.screenshotType = null;
        document.getElementById('screenshotInput').value = '';
        document.getElementById('screenshotArea').style.display = 'block';
        document.getElementById('screenshotPreview').style.display = 'none';
        document.getElementById('printScreenshotText').innerText = 'ไฟล์ภาพแนบ: [ไม่ได้เลือกภาพ]';
      } else {
        filesData.codeBase64 = null;
        filesData.codeFileName = null;
        filesData.codeFileType = null;
        document.getElementById('codeInput').value = '';
        document.getElementById('codeArea').style.display = 'block';
        document.getElementById('codePreview').style.display = 'none';
        document.getElementById('printCodeText').innerText = 'ไฟล์โค้ดแนบ: [ไม่ได้เลือกไฟล์โค้ด]';
      }
    }

    // Handle Form submission
    function handleFormSubmit(e) {
      if (e) e.preventDefault();
      openSubmitConfirmModal();
    }

    function openSubmitConfirmModal() {
      const nameVal = (document.getElementById('studentName')?.value || '').trim();
      const idVal = (document.getElementById('studentId')?.value || '').trim();
      const groupVal = (document.getElementById('studentGroup')?.value || '').trim();

      if (!nameVal || !idVal || !groupVal) {
        openModal('error', 'กรุณากรอกข้อมูลให้ครบ', 'กรุณากรอกชื่อ-นามสกุล, รหัสนักศึกษา และกลุ่ม/ห้อง ให้ครบถ้วนก่อนส่งใบงาน');
        return;
      }

      const storageKey = 'submitted_${lab.idName}_' + idVal;
      const prevSubmitTime = localStorage.getItem(storageKey);
      if (prevSubmitTime) {
        openModal('error', 'ไม่อนุญาตให้ส่งซ้ำ', 'รหัสนักศึกษา ' + idVal + ' ได้ส่งใบงานนี้ไปแล้วเมื่อ ' + prevSubmitTime + '\\nระบบอนุญาตให้ส่งได้เพียง 1 ครั้งเท่านั้น');
        lockFormAsSubmitted(prevSubmitTime);
        return;
      }

      document.getElementById('confirmStudentName').innerText = nameVal;
      document.getElementById('confirmStudentId').innerText = idVal;
      document.getElementById('confirmSubmitModal').style.display = 'flex';
    }

    function closeSubmitConfirmModal() {
      document.getElementById('confirmSubmitModal').style.display = 'none';
    }

    // Final Submit execution
    function executeFinalSubmit() {
      closeSubmitConfirmModal();

      const submitBtn = document.getElementById('submitBtn');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner loading-spinner"></i> กำลังดำเนินการ...';

      // Save Student Details to localStorage
      const nameVal = document.getElementById('studentName').value.trim();
      const idVal = document.getElementById('studentId').value.trim();
      const groupVal = document.getElementById('studentGroup').value.trim();

      localStorage.setItem('student_name', nameVal);
      localStorage.setItem('student_id', idVal);
      localStorage.setItem('student_group', groupVal);

      // Check Blanks (Example 2)
      const blankResult = checkBlanks(true);

      // Check Challenge Code / Blanks
      let assembledCode = '';
      let chScore = 4.0;
      ${challengeBlanks ? `
      const chResult = checkChallengeBlanks(true);
      chScore = chResult.challengeScore;
      let tempCode = \`${lab.challengeRawCode || ''}\`;
      ${challengeBlanks.map((b, idx) => `
      const ch_val_${b.id} = (document.getElementById('${b.id}')?.value || '____').trim();
      tempCode = tempCode.replace('[CH_BLANK${idx+1}]', ch_val_${b.id});
      `).join('')}
      assembledCode = tempCode;
      ` : `
      assembledCode = document.getElementById('challengeCode')?.value || '';
      `}

      // Collect data
      const payload = {
        studentName: nameVal,
        studentId: idVal,
        studentGroup: groupVal,
        labDate: document.getElementById('labDate').value,
        ${jsBlankPayload},
        ${challengeBlanks ? jsChallengePayload + ',' : ''}
        blankScore: blankResult.blankScore,
        challengeCode: assembledCode,
        question1: document.getElementById('question1').value,
        question2: document.getElementById('question2').value,
        conclusion: document.getElementById('conclusion').value,
        ...filesData
      };

      // Open Modal Loader
      openModal('loading', 'กำลังบันทึกข้อมูล...', 'ระบบกำลังส่งข้อมูลใบงานของท่านไปยังเซิร์ฟเวอร์ กรุณารอสักครู่...');

      const isGoogleAppsScript = (typeof google !== 'undefined' && google.script && google.script.run);
      
      if (isGoogleAppsScript) {
        google.script.run
          .withSuccessHandler((response) => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            if (response.status === 'success') {
              const nowFormatted = new Date().toLocaleString('th-TH');
              localStorage.setItem('submitted_${lab.idName}_' + idVal, nowFormatted);
              lockFormAsSubmitted(nowFormatted);
              openModal('success', 'ส่งรายงานสำเร็จ!', response.message);
            } else if (response.status === 'duplicate') {
              openModal('error', 'ไม่อนุญาตให้ส่งซ้ำ', response.message);
              lockFormAsSubmitted('ก่อนหน้านี้');
            } else {
              openModal('error', 'เกิดข้อผิดพลาด', response.message);
            }
          })
          .withFailureHandler((err) => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            openModal('error', 'ระบบล้มเหลว', err.toString());
          })
          .submitLabData(payload);
      } else {
        // Offline simulation Mode (Local Preview)
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          
          const nowFormatted = new Date().toLocaleString('th-TH');
          localStorage.setItem('submitted_${lab.idName}_' + idVal, nowFormatted);
          lockFormAsSubmitted(nowFormatted);
          
          const codeKeywords = ${JSON.stringify(lab.codeKeywords || [])};
          const q1Keywords = ${JSON.stringify(lab.q1Keywords || [])};
          const q2Keywords = ${JSON.stringify(lab.q2Keywords || [])};
          
          const q1 = document.getElementById('question1').value || '';
          const q2 = document.getElementById('question2').value || '';
          
          // 1. Blank score (Max 2 pts)
          const blankScore = blankResult.blankScore;

          // 2. Challenge Score (Max 4 pts)
          let finalChScore = 4.0;
          let chFeedbackText = '';
          ${challengeBlanks ? `
          finalChScore = chScore;
          chFeedbackText = \`กิจกรรมท้าทาย (เติมคำสั่ง): \${finalChScore}/4 (\${chResult.chCorrectCount}/\${chResult.totalChBlanks} ช่อง)\`;
          ` : `
          let codeMatches = 0;
          codeKeywords.forEach(kw => {
            if (new RegExp(kw, 'i').test(assembledCode)) codeMatches++;
          });
          finalChScore = codeKeywords.length > 0 ? Number(((codeMatches / codeKeywords.length) * 4).toFixed(1)) : 4;
          chFeedbackText = \`Challenge Code: \${finalChScore}/4 (พบ \${codeMatches}/\${codeKeywords.length} คีย์เวิร์ด)\`;
          `}
          
          // 3. Q1 (Max 1.5 pts)
          let q1Matches = 0;
          q1Keywords.forEach(kw => {
            if (new RegExp(kw, 'i').test(q1)) q1Matches++;
          });
          const q1Score = q1Keywords.length > 0 ? (q1Matches >= 1 ? 1.5 : 0) : 1.5;
          
          // 4. Q2 (Max 1.5 pts)
          let q2Matches = 0;
          q2Keywords.forEach(kw => {
            if (new RegExp(kw, 'i').test(q2)) q2Matches++;
          });
          const q2Score = q2Keywords.length > 0 ? (q2Matches >= 1 ? 1.5 : 0) : 1.5;
          
          // 5. Attachments (Max 1 pt)
          let attachScore = 0;
          if (filesData.screenshotBase64) attachScore += 0.5;
          if (filesData.codeBase64) attachScore += 0.5;
          
          const score = Number((blankScore + finalChScore + q1Score + q2Score + attachScore).toFixed(1));
          
          const feedback = [
            \`เติมคำตอบตัวอย่างที่ 2: \${blankScore}/2 (\${blankResult.correctCount}/\${blankResult.totalBlanks} ช่อง)\`,
            chFeedbackText,
            \`Q1: \${q1Score}/1.5\`,
            \`Q2: \${q2Score}/1.5\`,
            \`ไฟล์แนบ: \${attachScore}/1\`
          ];
          
          const localMessage = \`จำลองการส่งข้อมูลเสร็จสิ้น! (หากเปิดใช้งานบน Google Script จริง ข้อมูลนี้จะถูกบันทึกไปยัง Google Sheet)\\n\\nคะแนนรวมประเมินออโต้: \${score}/10\\n\\nรายละเอียดคะแนน:\\n- \` + feedback.join('\\n- ');
          
          openModal('success', 'โหมดทดลองออฟไลน์สำเร็จ!', localMessage);
        }, 1500);
      }
    }

    function lockFormAsSubmitted(submittedTime) {
      const form = document.getElementById('labForm');
      if (!form) return;

      form.querySelectorAll('input, textarea, select, button[type="submit"], .upload-area, .remove-file-btn').forEach(el => {
        if (el.id !== 'printBtn' && !el.classList.contains('btn-secondary') && el.id !== 'checkScoreBtn') {
          el.disabled = true;
          if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.readOnly = true;
          }
        }
      });

      const submitBtn = document.getElementById('submitBtn');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.style.background = 'linear-gradient(135deg, #059669, #047857)';
        submitBtn.style.boxShadow = '0 4px 14px rgba(5, 150, 105, 0.4)';
        submitBtn.style.cursor = 'default';
        submitBtn.innerHTML = \`<i class="fa-solid fa-circle-check"></i> ส่งงานเรียบร้อยแล้ว (\${submittedTime})\`;
      }

      let notice = document.getElementById('submittedNoticeBanner');
      if (!notice) {
        notice = document.createElement('div');
        notice.id = 'submittedNoticeBanner';
        notice.style.cssText = 'background: rgba(16, 185, 129, 0.15); border: 1.5px solid rgba(16, 185, 129, 0.4); color: #34d399; padding: 0.85rem 1rem; border-radius: 10px; margin-bottom: 1.25rem; font-size: 0.9rem; display: flex; align-items: center; gap: 0.6rem; font-weight: 500;';
        const formSection0 = form.querySelector('.form-section');
        if (formSection0) form.insertBefore(notice, formSection0);
      }
      notice.innerHTML = \`<i class="fa-solid fa-lock" style="font-size:1.1rem;"></i> <span>ใบงานนี้ถูกส่งเรียบร้อยแล้วเมื่อ <strong>\${submittedTime}</strong> (โหมดดูอย่างเดียว / View-Only) สามารถกดปุ่มพิมพ์ PDF เพื่อบันทึกเป็นหลักฐานได้</span>\`;
    }

    // Modal helpers
    function openModal(status, title, text) {
      const modal = document.getElementById('statusModal');
      const icon = document.getElementById('modalIcon');
      const titleEl = document.getElementById('modalTitle');
      const textEl = document.getElementById('modalText');
      const closeBtn = modal.querySelector('.modal-close-btn');

      titleEl.innerText = title;
      textEl.innerText = text;
      closeBtn.style.display = (status === 'loading') ? 'none' : 'inline-block';

      if (status === 'loading') {
        icon.className = 'modal-icon';
        icon.innerHTML = '<i class="fa-solid fa-circle-notch loading-spinner" style="color: var(--accent);"></i>';
      } else if (status === 'success') {
        icon.className = 'modal-icon success';
        icon.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
      } else if (status === 'error') {
        icon.className = 'modal-icon error';
        icon.innerHTML = '<i class="fa-solid fa-circle-xmark"></i>';
      }

      modal.style.display = 'flex';
    }

    function closeModal() {
      document.getElementById('statusModal').style.display = 'none';
    }

    // Pre-submission Score Check System
    function checkPreSubmissionScore() {
      // 1. Run blank checks with visual feedback
      const blankResult = checkBlanks(false);
      const blankScore = blankResult.blankScore;

      // 2. Challenge Score
      let finalChScore = 4.0;
      let chTitle = "กิจกรรมท้าทาย (Challenge Code)";
      let chDesc = "";
      ${challengeBlanks ? `
      const chResult = checkChallengeBlanks(false);
      finalChScore = chResult.challengeScore;
      chTitle = "กิจกรรมท้าทาย (เติมคำสั่ง)";
      chDesc = \`ถูกต้อง \${chResult.chCorrectCount}/\${chResult.totalChBlanks} ช่องคำตอบ\`;
      ` : `
      const assembledCode = document.getElementById('challengeCode')?.value || '';
      const codeKeywords = ${JSON.stringify(lab.codeKeywords || [])};
      let codeMatches = 0;
      codeKeywords.forEach(kw => {
        if (new RegExp(kw, 'i').test(assembledCode)) codeMatches++;
      });
      finalChScore = codeKeywords.length > 0 ? Number(((codeMatches / codeKeywords.length) * 4).toFixed(1)) : 4.0;
      chDesc = \`พบ \${codeMatches}/\${codeKeywords.length} คำสั่ง/ไวยากรณ์สำคัญ\`;
      `}

      // 3. Question 1
      const q1 = (document.getElementById('question1')?.value || '').trim();
      const q1Keywords = ${JSON.stringify(lab.q1Keywords || [])};
      let q1Matches = 0;
      q1Keywords.forEach(kw => {
        if (new RegExp(kw, 'i').test(q1)) q1Matches++;
      });
      const q1Score = q1Keywords.length > 0 ? (q1Matches >= 1 ? 1.5 : 0) : 1.5;

      // 4. Question 2
      const q2 = (document.getElementById('question2')?.value || '').trim();
      const q2Keywords = ${JSON.stringify(lab.q2Keywords || [])};
      let q2Matches = 0;
      q2Keywords.forEach(kw => {
        if (new RegExp(kw, 'i').test(q2)) q2Matches++;
      });
      const q2Score = q2Keywords.length > 0 ? (q2Matches >= 1 ? 1.5 : 0) : 1.5;

      // 5. Attachments
      let attachScore = 0;
      if (filesData.screenshotBase64) attachScore += 0.5;
      if (filesData.codeBase64) attachScore += 0.5;

      // 6. Conclusion check
      const conclusion = (document.getElementById('conclusion')?.value || '').trim();
      const hasConclusion = conclusion.length > 5;

      // 7. Student info check
      const nameVal = (document.getElementById('studentName')?.value || '').trim();
      const idVal = (document.getElementById('studentId')?.value || '').trim();
      const groupVal = (document.getElementById('studentGroup')?.value || '').trim();
      const isInfoComplete = (nameVal && idVal && groupVal);

      // Total score
      const totalScore = Number((blankScore + finalChScore + q1Score + q2Score + attachScore).toFixed(1));

      // Render Modal Elements
      document.getElementById('preScoreTotal').innerHTML = \`\${totalScore.toFixed(1)} <span style="font-size:1.1rem;color:#94a3b8;font-weight:400;">/ 10</span>\`;

      const badgeEl = document.getElementById('preScoreBadge');
      if (totalScore >= 8.5 && isInfoComplete && hasConclusion) {
        badgeEl.className = 'score-status-badge';
        badgeEl.innerHTML = '<i class="fa-solid fa-circle-check"></i> พร้อมส่งรายงาน ยอดเยี่ยม!';
      } else if (totalScore >= 5.0) {
        badgeEl.className = 'score-status-badge warning';
        badgeEl.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> พอใช้ - ควรตรวจเพิ่ม';
      } else {
        badgeEl.className = 'score-status-badge danger';
        badgeEl.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> ยังไม่สมบูรณ์';
      }

      // Breakdown Items
      const breakdownEl = document.getElementById('preScoreBreakdown');
      breakdownEl.innerHTML = \`
        <!-- Student Info -->
        <div class="score-item-row">
          <div class="score-item-info">
            <div class="score-item-title">
              <i class="fa-solid fa-user-graduate" style="color:\${isInfoComplete ? '#34d399' : '#f87171'};"></i>
              ข้อมูลผู้ส่งใบงาน
            </div>
            <div class="score-item-desc">\${isInfoComplete ? \`ชื่อ: \${nameVal} (รหัส: \${idVal})\` : '⚠️ กรุณากรอกชื่อ, รหัสนักศึกษา และกลุ่มให้ครบถ้วน'}</div>
          </div>
          <div class="score-item-points" style="color:\${isInfoComplete ? '#34d399' : '#f87171'};">\${isInfoComplete ? 'ครบถ้วน' : 'ไม่ครบ'}</div>
        </div>

        <!-- Part 1: Blanks -->
        <div class="score-item-row">
          <div class="score-item-info">
            <div class="score-item-title">
              <i class="fa-solid fa-puzzle-piece" style="color:\${blankScore === 2 ? '#34d399' : (blankScore > 0 ? '#fbbf24' : '#f87171')};"></i>
              เติมคำตอบโปรแกรมตัวอย่างที่ 2
            </div>
            <div class="score-item-desc">ถูกต้อง \${blankResult.correctCount}/\${blankResult.totalBlanks} ช่องคำตอบ</div>
          </div>
          <div class="score-item-points">\${blankScore.toFixed(1)} / 2.0</div>
        </div>

        <!-- Part 2: Challenge -->
        <div class="score-item-row">
          <div class="score-item-info">
            <div class="score-item-title">
              <i class="fa-solid fa-code" style="color:\${finalChScore === 4 ? '#34d399' : (finalChScore >= 2 ? '#fbbf24' : '#f87171')};"></i>
              \${chTitle}
            </div>
            <div class="score-item-desc">\${chDesc}</div>
          </div>
          <div class="score-item-points">\${finalChScore.toFixed(1)} / 4.0</div>
        </div>

        <!-- Part 3: Q1 -->
        <div class="score-item-row">
          <div class="score-item-info">
            <div class="score-item-title">
              <i class="fa-solid fa-circle-question" style="color:\${q1Score > 0 ? '#34d399' : '#f87171'};"></i>
              คำถามท้ายการทดลอง ข้อที่ 1
            </div>
            <div class="score-item-desc">\${q1Score > 0 ? 'พบแนวคิดสำคัญในคำตอบ' : '⚠️ ยังไม่พบคำสำคัญทางเทคนิค กรุณาอธิบายเพิ่มเติม'}</div>
          </div>
          <div class="score-item-points">\${q1Score.toFixed(1)} / 1.5</div>
        </div>

        <!-- Part 4: Q2 -->
        <div class="score-item-row">
          <div class="score-item-info">
            <div class="score-item-title">
              <i class="fa-solid fa-circle-question" style="color:\${q2Score > 0 ? '#34d399' : '#f87171'};"></i>
              คำถามท้ายการทดลอง ข้อที่ 2
            </div>
            <div class="score-item-desc">\${q2Score > 0 ? 'พบแนวคิดสำคัญในคำตอบ' : '⚠️ ยังไม่พบคำสำคัญทางเทคนิค กรุณาอธิบายเพิ่มเติม'}</div>
          </div>
          <div class="score-item-points">\${q2Score.toFixed(1)} / 1.5</div>
        </div>

        <!-- Part 5: Attachments -->
        <div class="score-item-row">
          <div class="score-item-info">
            <div class="score-item-title">
              <i class="fa-solid fa-paperclip" style="color:\${attachScore === 1 ? '#34d399' : (attachScore > 0 ? '#fbbf24' : '#f87171')};"></i>
              ไฟล์แนบหลักฐานการทดลอง
            </div>
            <div class="score-item-desc">\${filesData.screenshotBase64 ? '✓ แนบภาพผลรัน (0.5)' : '✗ ยังไม่แนบภาพผลรัน'}, \${filesData.codeBase64 ? '✓ แนบไฟล์โค้ด (0.5)' : '✗ ยังไม่แนบไฟล์โค้ด'}</div>
          </div>
          <div class="score-item-points">\${attachScore.toFixed(1)} / 1.0</div>
        </div>

        <!-- Conclusion -->
        <div class="score-item-row">
          <div class="score-item-info">
            <div class="score-item-title">
              <i class="fa-solid fa-comment-dots" style="color:\${hasConclusion ? '#34d399' : '#f87171'};"></i>
              สรุปผลการทดลอง
            </div>
            <div class="score-item-desc">\${hasConclusion ? 'บันทึกสรุปผลเรียบร้อย' : '⚠️ กรุณาพิมพ์สรุปผลการทดลองด้วยตนเอง'}</div>
          </div>
          <div class="score-item-points" style="color:\${hasConclusion ? '#34d399' : '#f87171'};">\${hasConclusion ? 'เรียบร้อย' : 'ยังไม่ระบุ'}</div>
        </div>
      \`;

      // Open Score Modal
      document.getElementById('scoreCheckModal').style.display = 'flex';
    }

    function closeScoreCheckModal() {
      document.getElementById('scoreCheckModal').style.display = 'none';
    }

    function submitFromScoreModal() {
      closeScoreCheckModal();
      openSubmitConfirmModal();
    }

    // Auto-expand textareas when printing
    window.addEventListener('beforeprint', () => {
      document.querySelectorAll('textarea').forEach(el => {
        el.dataset.origHeight = el.style.height;
        el.style.height = 'auto';
        el.style.height = (el.scrollHeight + 4) + 'px';
        el.style.overflow = 'hidden';
      });
    });

    window.addEventListener('afterprint', () => {
      document.querySelectorAll('textarea').forEach(el => {
        if (el.dataset.origHeight !== undefined) {
          el.style.height = el.dataset.origHeight;
        } else {
          el.style.height = '';
        }
        el.style.overflow = '';
      });
    });
  </script>
</body>
</html>
`;
}

function generateSolutionReadme(lab) {
  const blanksList = (lab.blanks || []).map((b, idx) => {
    return '### 1.' + (idx + 1) + ' ' + b.label + '\n' +
      '- **คำตอบที่ถูกต้อง:** `' + b.answers[0] + '`\n' +
      '- **คำตอบที่เป็นไปได้:** ' + b.answers.map(a => '`' + a + '`').join(', ');
  }).join('\n\n');

  const chBlanksList = (lab.challengeBlanks || []).map((b, idx) => {
    return '### 2.' + (idx + 1) + ' ' + b.label + '\n' +
      '- **คำตอบที่ถูกต้อง:** `' + b.answers[0] + '`\n' +
      '- **คำตอบที่ระบบยอมรับ:** ' + b.answers.map(a => '`' + a + '`').join(', ');
  }).join('\n\n');

  const purposeList = (lab.purpose || []).map((p, i) => `${i+1}. ${p}`).join('\n');

  return `# คู่มือเฉลยปฏิบัติการ ${lab.titleTh}
## (${lab.titleEn} - Laboratory Solution & Grading Key)

โฟลเดอร์นี้รวบรวมไฟล์ซอร์สโค้ดเฉลยภาษา C (\`.c\`), แนวทางการตอบคำถาม และเกณฑ์การประเมินผลสำหรับ **${lab.titleTh}** ระดับประกาศนียบัตรวิชาชีพชั้นสูง (ปวส.)

---

## 🎯 วัตถุประสงค์เชิงสมรรถนะของใบงาน
${purposeList}

---

## 📁 รายการไฟล์ในโฟลเดอร์ \`solution/\`

| ชื่อไฟล์ | คำอธิบาย |
| :--- | :--- |
| **\`challenge_solution.c\`** | ซอร์สโค้ดเฉลยกิจกรรมท้าทายเชิงอุตสาหกรรม/ระบบสมองกล (Lab Challenge) |
| **\`example2_solution.c\`** | ซอร์สโค้ดเฉลยโปรแกรมตัวอย่างที่ 2 (Fill in the Blanks) |
| **\`README.md\`** | เอกสารเฉลยละเอียดและเกณฑ์การตรวจให้คะแนน |

---

## 📝 1. เฉลยโปรแกรมตัวอย่างที่ 2 (Fill in the Blanks) - คะแนนเต็ม 2.0 คะแนน

${blanksList}

### ซอร์สโค้ดตัวอย่างที่ 2 ฉบับสมบูรณ์ (\`example2_solution.c\`):
\`\`\`c
${lab.example2SolutionCode}
\`\`\`

- **คำสั่งคอมไพล์และทดสอบรัน:**
  \`\`\`bash
  gcc -Wall -Wextra -o example2_solution example2_solution.c
  ./example2_solution
  \`\`\`

---

## 🚀 2. เฉลยกิจกรรมท้าทาย (Lab Challenge Solution) - คะแนนเต็ม 4.0 คะแนน

### 2.1 บริบทโจทย์ท้าทายเชิงประยุกต์:
> ${lab.challengeDesc}

${lab.challengeBlanks ? `### 2.2 เฉลยช่องว่างกิจกรรมท้าทาย:
${chBlanksList}
` : ''}
### 2.2 ซอร์สโค้ดเฉลยกิจกรรมท้าทาย (\`challenge_solution.c\`):
\`\`\`c
${lab.challengeSolutionCode}
\`\`\`

### 2.3 คำสั่งคอมไพล์และทดสอบรันบน Terminal:
\`\`\`bash
gcc -Wall -Wextra -o challenge_solution challenge_solution.c
./challenge_solution
\`\`\`

---

## 💡 3. เฉลยคำถามท้ายการทดลอง (Post-Lab Questions) - คะแนนเต็ม 3.0 คะแนน

### ข้อที่ 1: ${lab.question1} (1.5 คะแนน)
- **แนวทางการตอบที่ถูกต้อง:**
  - อธิบายหลักการ ความหมาย หรือกลไกการทำงานตามหัวข้ออย่างถูกต้องตรงประเด็น
  - มีการยกตัวอย่างประกอบ หรือระบุคีย์เวิร์ดสำคัญ เช่น \`${(lab.q1Keywords || []).join(', ')}\`
- **เกณฑ์การให้คะแนน:**
  - อธิบายได้ถูกต้องสมบูรณ์และยกตัวอย่างชัดเจน: **1.5 คะแนน**
  - ตอบถูกแต่ขาดรายละเอียดเชิงลึก: **0.8 - 1.0 คะแนน**
  - ไม่ตรงประเด็นหรือไม่ตอบ: **0.0 คะแนน**

### ข้อที่ 2: ${lab.question2} (1.5 คะแนน)
- **แนวทางการตอบที่ถูกต้อง:**
  - วิเคราะห์ข้อดี-ข้อจำกัด สาเหตุ หรือข้อควรระวังในการเขียนโปรแกรมจริง
  - มีคีย์เวิร์ดสำคัญ เช่น \`${(lab.q2Keywords || []).join(', ')}\`
- **เกณฑ์การให้คะแนน:**
  - วิเคราะห์ได้ถูกต้อง ครอบคลุมบริบททางเทคนิค: **1.5 คะแนน**
  - ตอบได้บางส่วน: **0.8 - 1.0 คะแนน**
  - ตอบไม่ตรงประเด็น: **0.0 คะแนน**

---

## 📊 4. สรุปผลและการสะท้อนคิด (Conclusion & Reflection)
- นักศึกษาควรสรุปองค์ความรู้ที่ได้รับจากใบงานนี้ ปัญหาที่พบในการทดลอง (เช่น ข้อผิดพลาดทางไวยากรณ์, ชนิดข้อมูล หรือหน่วยความจำ) และแนวทางแก้ไขเพื่อประยุกต์ใช้งานในระบบสมองกลหรืองานช่างจริง
`;
}

// Ensure the root path and subdirectories are created
const labsDestDir = __dirname;

console.log(`Generating C programming labs in: ${labsDestDir}`);

labs.forEach(lab => {
  const labDir = path.join(labsDestDir, lab.idName);
  if (!fs.existsSync(labDir)) {
    fs.mkdirSync(labDir, { recursive: true });
  }

  // 1. Write Code.gs
  const codeGsContent = generateCodeGs(lab);
  fs.writeFileSync(path.join(labDir, 'Code.gs'), codeGsContent, 'utf-8');

  // 2. Write index.html
  const indexHtmlContent = generateIndexHtml(lab);
  fs.writeFileSync(path.join(labDir, 'index.html'), indexHtmlContent, 'utf-8');

  // 3. Create solution/ directory and files
  const solutionDir = path.join(labDir, 'solution');
  if (!fs.existsSync(solutionDir)) {
    fs.mkdirSync(solutionDir, { recursive: true });
  }

  if (lab.challengeSolutionCode) {
    fs.writeFileSync(path.join(solutionDir, 'challenge_solution.c'), lab.challengeSolutionCode, 'utf-8');
  }

  if (lab.example2SolutionCode) {
    fs.writeFileSync(path.join(solutionDir, 'example2_solution.c'), lab.example2SolutionCode, 'utf-8');
  }

  const solutionReadmeContent = generateSolutionReadme(lab);
  fs.writeFileSync(path.join(solutionDir, 'README.md'), solutionReadmeContent, 'utf-8');

  console.log(`✓ Generated index.html, Code.gs, and solution/ for ${lab.idName} successfully!`);
});

console.log('\nAll C Labs generation complete!');
