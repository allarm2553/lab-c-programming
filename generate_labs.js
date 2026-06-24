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
            <!-- Memory blocks -->
            <text x="30" y="25" fill="#a5b4fc" font-size="12" font-family="Outfit" font-weight="600">Memory Allocation Representation</text>
            
            <!-- char x (1 byte) -->
            <rect x="30" y="45" width="40" height="50" rx="4" fill="#1e293b" stroke="#6366f1" stroke-width="2" />
            <text x="50" y="75" fill="#f8fafc" font-size="11" font-family="JetBrains Mono" text-anchor="middle">char</text>
            <text x="50" y="115" fill="#94a3b8" font-size="10" font-family="Sarabun" text-anchor="middle">1 Byte</text>
            
            <!-- int n (4 bytes) -->
            <rect x="90" y="45" width="160" height="50" rx="4" fill="#1e293b" stroke="#3b82f6" stroke-width="2" />
            <text x="170" y="75" fill="#f8fafc" font-size="11" font-family="JetBrains Mono" text-anchor="middle">int</text>
            <text x="170" y="115" fill="#94a3b8" font-size="10" font-family="Sarabun" text-anchor="middle">4 Bytes</text>

            <!-- double d (8 bytes) -->
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
    example2Desc: "ศึกษาโค้ดด้านล่าง และเติมส่วนคำสั่งรับค่าหน่วยความจำ (ช่องว่าง <code>____</code>) ใน IDE ของคุณเพื่อทดสอบการรันโปรแกรม:",
    example2Code: `#include <stdio.h>

int main() {
    int num;
    float score;
    
    printf("Enter integer: ");
    // เติมส่วนสัญลักษณ์อ้างอิงตำแหน่งในหน่วยความจำของ num (แทนที่ ____ ด้วย &num)
    scanf("%d", ____);
    
    printf("Enter float score: ");
    // เติมส่วน Format Specifier สำหรับตัวแปร float (แทนที่ ____ ด้วย %f)
    scanf("____", &score);
    
    printf("Value = %d, Score = %.1f\\n", num, score);
    return 0;
}`,
    challengeDesc: "พัฒนาโปรแกรมภาษา C เพื่อรับข้อมูลรัศมีของวงกลม (รัศมีเป็นเลขทศนิยม) จากแป้นพิมพ์ จากนั้นคำนวณและแสดงผลลัพธ์พื้นที่วงกลม (Area) และความยาวเส้นรอบวง (Circumference) โดยแสดงผลลัพธ์ทศนิยม 2 ตำแหน่ง",
    challengePlaceholder: `#include <stdio.h>
#define PI 3.14159265

int main() {
    float radius, area, circumference;
    
    printf("Enter radius: ");
    // เขียนโค้ดรับค่า รันผลการคำนวณ และแสดงผลลัพธ์ที่นี่
    
    return 0;
}`,
    question1: "1. อธิบายความแตกต่างระหว่างชนิดข้อมูล int, float และ double ในการเขียนโปรแกรมและการจองหน่วยความจำ",
    question1Placeholder: "เช่น int จอง 4 ไบต์สำหรับเลขจำนวนเต็ม, float จอง 4 ไบต์ทศนิยมละเอียดปกติ, double จอง 8 ไบต์ทศนิยมละเอียดสูง...",
    question2: "2. เพราะเหตุใดเมื่อต้องการรับค่าทศนิยมด้วย scanf() จึงต้องระบุประเภทฟอร์แมตแตกต่างจาก printf()?",
    question2Placeholder: "อธิบายตามหลักการระบุ %f หรือ %lf และความแตกต่างของการอ้างอิงตำแหน่งตัวแปรใน scanf...",
    conclusionPlaceholder: "วิเคราะห์ผลการทำแล็บ 1 อุปสรรค และการเรียนรู้เรื่องฟังก์ชันรับส่งข้อมูลพื้นฐาน...",
    codeKeywords: ["scanf","printf","radius","area","circumference"],
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
            <!-- Bitwise operations visualization -->
            <text x="30" y="25" fill="#a5b4fc" font-size="12" font-family="Outfit" font-weight="600">Bitwise AND Operation (5 & 3)</text>
            <!-- Binary 5: 0101 -->
            <rect x="50" y="45" width="100" height="30" rx="3" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
            <text x="100" y="65" fill="#f8fafc" font-size="11" font-family="JetBrains Mono" text-anchor="middle">5 = 0 1 0 1</text>
            
            <!-- Binary 3: 0011 -->
            <rect x="50" y="85" width="100" height="30" rx="3" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
            <text x="100" y="105" fill="#f8fafc" font-size="11" font-family="JetBrains Mono" text-anchor="middle">3 = 0 0 1 1</text>

            <!-- Operator and output -->
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
    example2Desc: "ศึกษาความสัมพันธ์ของข้อมูลแบบบิตคู่ และกรอกตัวดำเนินการในตำแหน่งช่องว่าง <code>____</code> เพื่อทำการหาค่าระดับบิต AND และ OR:",
    example2Code: `#include <stdio.h>

int main() {
    int a = 5;  // Binary: 0101
    int b = 3;  // Binary: 0011
    
    // เติมตัวดำเนินการระดับบิต AND (แทนที่ ____ ด้วย &)
    int and_res = a ____ b;
    
    // เติมตัวดำเนินการระดับบิต OR (แทนที่ ____ ด้วย |)
    int or_res = a ____ b;
    
    printf("Bitwise AND result: %d\\n", and_res);
    printf("Bitwise OR result: %d\\n", or_res);
    return 0;
}`,
    challengeDesc: "พัฒนาโปรแกรมรับเลขจำนวนเต็ม 2 ตัว จากนั้นหาและแสดงผลลัพธ์ของตัวดำเนินการระดับบิตเหล่านี้: AND (&), OR (|), XOR (^), และการเลื่อนบิตไปทางซ้าย 2 ตำแหน่ง (Left Shift 2) ของตัวเลขแรก",
    challengePlaceholder: `#include <stdio.h>

int main() {
    int a, b;
    printf("Enter two integers: ");
    // เขียนโค้ดรับข้อมูลและทำการวิเคราะห์ตัวดำเนินการระดับบิต (Bitwise Operators)
    return 0;
}`,
    question1: "1. ตัวดำเนินการเลื่อนบิต << (Left Shift) และ >> (Right Shift) ทำงานอย่างไร และมีผลลัพธ์สัมพันธ์กับการคูณ/หารอย่างไร?",
    question1Placeholder: "การเลื่อนบิตไปทางซ้าย 1 ตำแหน่งเสมือนการคูณด้วย 2 และการเลื่อนบิตขวาเสมือนการหารด้วย 2...",
    question2: "2. เพราะเหตุใดนิพจน์ 5 / 2 ในภาษา C จึงคำนวณได้ 2 และหากต้องการผลลัพธ์ทศนิยม 2.5 ต้องเขียนโค้ดอย่างไร?",
    question2Placeholder: "เนื่องจากเป็นการหารตัวเลขจำนวนเต็ม (Integer Division) หากต้องการทศนิยมต้องพิมพ์แบบ Type Casting เช่น (float)5 / 2 หรือใช้ 5.0 / 2...",
    conclusionPlaceholder: "สรุปสิ่งที่ได้รับจากการเรียนรู้ในบทที่ 2 และปัญหาเกี่ยวกับลำดับหรือระดับความละเอียดตัวดำเนินการ...",
    codeKeywords: ["&","\\\\|","\\\\^","<<",">>"],
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
            <!-- Decision Flowchart -->
            <!-- Score input -->
            <rect x="20" y="50" width="100" height="40" rx="4" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
            <text x="70" y="75" fill="#f8fafc" font-size="11" font-family="Sarabun" text-anchor="middle">รับคะแนน (Score)</text>
            
            <line x1="120" y1="70" x2="160" y2="70" stroke="#94a3b8" stroke-width="2" marker-end="url(#arrow)" />

            <!-- Diamond Condition -->
            <polygon points="160,70 210,40 260,70 210,100" fill="#1e293b" stroke="#f59e0b" stroke-width="2" />
            <text x="210" y="74" fill="#f8fafc" font-size="10" font-family="JetBrains Mono" text-anchor="middle">score >= 50</text>

            <!-- Yes Arrow -->
            <line x1="260" y1="70" x2="330" y2="70" stroke="#10b981" stroke-width="2" marker-end="url(#arrow)" />
            <text x="295" y="62" fill="#10b981" font-size="10" font-family="Outfit" font-weight="600">YES</text>

            <!-- Pass Box -->
            <rect x="330" y="50" width="90" height="40" rx="4" fill="#064e3b" stroke="#10b981" stroke-width="1.5" />
            <text x="375" y="75" fill="#10b981" font-size="11" font-family="Sarabun" text-anchor="middle" font-weight="600">ผ่าน (Pass)</text>

            <!-- No Arrow -->
            <path d="M 210 100 L 210 130 L 330 130" fill="none" stroke="#ef4444" stroke-width="2" marker-end="url(#arrow)" />
            <text x="230" y="122" fill="#ef4444" font-size="10" font-family="Outfit" font-weight="600">NO</text>

            <!-- Fail Box -->
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
    example2Desc: "ศึกษาการจับคู่ความเท่ากันของค่าเกรดตัวอักษร และกรอกคีย์เวิร์ดควบคุมในตำแหน่งช่องว่าง <code>____</code>:",
    example2Code: `#include <stdio.h>

int main() {
    char grade;
    printf("Enter grade (A, B, C): ");
    scanf(" %c", &grade);
    
    // เติมคีย์เวิร์ดสำหรับเริ่มการประเมิน switch (แทนที่ ____ ด้วย switch)
    ____ (grade) {
        case 'A':
            printf("Excellent!\\n");
            break;
        case 'B':
            printf("Good job!\\n");
            // เติมคีย์เวิร์ดหยุดการทำงานเล็ดลอดเคส (แทนที่ ____ ด้วย break)
            ____;
        default:
            printf("Try harder!\\n");
    }
    return 0;
}`,
    challengeDesc: "พัฒนาโปรแกรมภาษา C คำนวณภาษีเงินได้บุคคลธรรมดาเบื้องต้น โดยรับรายได้สุทธิต่อปี (เลขทศนิยม) จากนั้นคำนวณและแสดงยอดภาษีที่ต้องชำระตามอัตราก้าวหน้าดังนี้: ไม่เกิน 150,000 ยกเว้นภาษี (0%), 150,001 - 300,000 คิดภาษี 5%, 300,001 - 500,000 คิดภาษี 10%, ส่วนที่เกิน 500,000 คิดภาษี 15%",
    challengePlaceholder: `#include <stdio.h>

int main() {
    float income, tax = 0.0;
    printf("Enter net annual income: ");
    // คำนวณภาษีตามขั้นบันได และแสดงผลลัพธ์
    return 0;
}`,
    question1: "1. ในการตรวจสอบเงื่อนไขคะแนนเกรด เพราะเหตุใดโครงสร้างแบบ if-else if-else จึงมีประสิทธิภาพดีกว่าการใช้ if เดี่ยวหลายๆ ตัวแยกกัน?",
    question1Placeholder: "เนื่องจากในระบบ if-else if-else เมื่อเงื่อนไขแรกเป็นจริงแล้ว คอมพิวเตอร์จะไม่เสียเวลาตรวจสอบเงื่อนไขที่เหลือด้านล่าง...",
    question2: "2. อธิบายหน้าที่ของคีย์เวิร์ด break ในคำสั่ง switch-case และผลลัพธ์จะเกิดความผิดพลาดอย่างไรหากเราลืมเขียนล้อมรอบ case?",
    question2Placeholder: "break ทำหน้าที่หยุดการทำเงื่อนไขอื่นๆ และออกจาก switch หากลืมเขียน จะทำให้การประมวลผลไหลลงไปประมวลผลคำสั่งในเคสถัดไปต่อจนจบ (Fall-through)...",
    conclusionPlaceholder: "สรุปสิ่งที่ได้ศึกษาในบทนี้ เช่น การเขียนเงื่อนไขควบคุม และความแตกต่างในการจัดโครงสร้างโค้ดแบบเลือกทำ...",
    codeKeywords: ["if","else","tax","income","0.05","0.1","0.15"],
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
            <!-- Loop Visualization -->
            <!-- Start -->
            <circle cx="60" cy="70" r="25" fill="#1e293b" stroke="#3b82f6" stroke-width="2" />
            <text x="60" y="74" fill="#f8fafc" font-size="11" font-family="Sarabun" text-anchor="middle">i = 0</text>

            <line x1="85" y1="70" x2="140" y2="70" stroke="#94a3b8" stroke-width="2" marker-end="url(#arrow)" />

            <!-- Condition -->
            <polygon points="140,70 190,40 240,70 190,100" fill="#1e293b" stroke="#f59e0b" stroke-width="2" />
            <text x="190" y="74" fill="#f8fafc" font-size="11" font-family="JetBrains Mono" text-anchor="middle">i < N</text>

            <!-- Run statement arrow -->
            <line x1="240" y1="70" x2="310" y2="70" stroke="#10b981" stroke-width="2" marker-end="url(#arrow)" />
            <text x="275" y="62" fill="#10b981" font-size="10" font-family="Outfit" font-weight="600">TRUE</text>

            <!-- Statement box -->
            <rect x="310" y="50" width="120" height="40" rx="4" fill="#1e293b" stroke="#10b981" stroke-width="1.5" />
            <text x="370" y="75" fill="#f8fafc" font-size="11" font-family="Sarabun" text-anchor="middle">รันโค้ดและพิมพ์ค่า</text>

            <!-- Increment and feedback loop -->
            <path d="M 370 90 L 370 120 L 190 120 L 190 100" fill="none" stroke="#6366f1" stroke-width="2" marker-end="url(#arrow)" />
            <text x="280" y="115" fill="#a5b4fc" font-size="10" font-family="JetBrains Mono">i++ (ปรับค่า)</text>

            <!-- Exit arrow -->
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
    example2Desc: "ศึกษาการทำซ้ำเงื่อนไขตราบเท่าที่เป็นจริง และกรอกรหัสอัปเดตตัวแปรนับรอบในช่องว่าง <code>____</code> เพื่อป้องกัน Infinite Loop:",
    example2Code: `#include <stdio.h>

int main() {
    int count = 1;
    
    // เติมเงื่อนไขเมื่อ count น้อยกว่าหรือเท่ากับ 3 (แทนที่ ____ ด้วย count <= 3)
    while (____) {
        printf("Count: %d\\n", count);
        
        // เติมการบวกเพิ่มค่าตัวแปรนับรอบ (แทนที่ ____ ด้วย count++)
        ____;
    }
    return 0;
}`,
    challengeDesc: "เขียนโปรแกรมภาษา C รับตัวเลขจำนวนเต็มบวก N จากผู้ใช้งาน จากนั้นใช้ลูปซ้อนลูป (Nested Loops) พิมพ์รูปสามเหลี่ยมมุมฉากด้วยตัวอักษรดาว (*) จำนวน N แถว โดยแถวที่ 1 มีดาว 1 ตัว แถวที่ 2 มีดาว 2 ตัว ไล่ไปจนถึงแถวที่ N",
    challengePlaceholder: `#include <stdio.h>

int main() {
    int n, i, j;
    printf("Enter number of rows (N): ");
    // รับค่า N และใช้ลูป 2 ชั้นเพื่อวาดรูปสามเหลี่ยมดาว
    return 0;
}`,
    question1: "1. อธิบายความแตกต่างของเงื่อนไขการตรวจสอบลูปของ while และ do-while ในการใช้งานจริง",
    question1Placeholder: "while ตรวจสอบเงื่อนไขก่อนรัน หากเป็นเท็จจะไม่รันเลย แต่ do-while รันคำสั่งก่อน 1 รอบแล้วจึงตรวจสอบ...",
    question2: "2. อธิบายการทำงานและผลต่างของคำสั่ง break และ continue เมื่อเขียนควบคุมภายในตัวลูป",
    question2Placeholder: "break ใช้สำหรับออกจากลูปทันที แต่ continue จะข้ามคำสั่งที่เหลือในรอบปัจจุบันเพื่อไปเริ่มรอบถัดไป...",
    conclusionPlaceholder: "สรุปผลการศึกษาโครงสร้างลูปซ้อนลูป และปัญหาที่พบบ่อยในการเขียนเงื่อนไขที่ไม่มีวันสิ้นสุด (Infinite Loop)...",
    codeKeywords: ["for","while","scanf","rows","n","\\\\*"],
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
            <!-- Call Stack Diagram -->
            <text x="30" y="25" fill="#a5b4fc" font-size="12" font-family="Outfit" font-weight="600">Call Stack Visualization (Recursion)</text>
            
            <!-- main frame -->
            <rect x="30" y="45" width="100" height="50" rx="4" fill="#1e293b" stroke="#3b82f6" stroke-width="2" />
            <text x="80" y="75" fill="#f8fafc" font-size="11" font-family="JetBrains Mono" text-anchor="middle">main()</text>
            <text x="80" y="115" fill="#94a3b8" font-size="10" font-family="Sarabun" text-anchor="middle">Active Frame</text>

            <!-- Arrow calling -->
            <line x1="130" y1="70" x2="170" y2="70" stroke="#94a3b8" stroke-width="2" marker-end="url(#arrow)" />

            <!-- Recursive call 1 -->
            <rect x="170" y="45" width="110" height="50" rx="4" fill="#1e293b" stroke="#f59e0b" stroke-width="2" />
            <text x="225" y="75" fill="#f8fafc" font-size="11" font-family="JetBrains Mono" text-anchor="middle">fact(3)</text>
            
            <line x1="280" y1="70" x2="320" y2="70" stroke="#94a3b8" stroke-width="2" marker-end="url(#arrow)" />

            <!-- Recursive call 2 -->
            <rect x="320" y="45" width="110" height="50" rx="4" fill="#1e293b" stroke="#10b981" stroke-width="2" />
            <text x="375" y="75" fill="#f8fafc" font-size="11" font-family="JetBrains Mono" text-anchor="middle">fact(2)</text>

            <line x1="430" y1="70" x2="470" y2="70" stroke="#94a3b8" stroke-width="2" marker-end="url(#arrow)" />

            <!-- Base Case -->
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
    example2Desc: "ศึกษาการประมวลผลเลขยกกำลังแบบวนทำลายพารามิเตอร์ซ้อน และระบุตัวส่งเงื่อนไขกรณีฐานในช่องว่าง <code>____</code>:",
    example2Code: `#include <stdio.h>

// ฟังก์ชันคำนวณหาค่าเลขยกกำลัง base^exp
int power(int base, int exp) {
    // เติมกรณีฐาน (Base Case) เมื่อยกกำลัง 0 ให้ส่งค่ากลับเป็น 1 (แทนที่ ____ ด้วย exp == 0)
    if (____) {
        return 1;
    }
    // เติมการเรียกตัวเอง Recursion ย่อยรอบลงไป (แทนที่ ____ ด้วย power(base, exp - 1))
    return base * ____;
}

int main() {
    printf("2^3 = %d\\n", power(2, 3));
    return 0;
}`,
    challengeDesc: "พัฒนาโปรแกรมภาษา C เพื่อคำนวณหาค่าแฟกทอเรียล (Factorial) ของตัวเลขจำนวนเต็มบวก N โดยเปรียบเทียบการเขียน 2 ฟังก์ชันย่อยในซอร์สโค้ดเดียวกัน: ฟังก์ชันแรกใช้วิธีวนซ้ำด้วยลูป (Iterative) และฟังก์ชันที่สองใช้วิธีเรียกซ้อนตัวเอง (Recursive)",
    challengePlaceholder: `#include <stdio.h>

long long factorialIterative(int n);
long long factorialRecursive(int n);

int main() {
    int num;
    printf("Enter an integer: ");
    // รับข้อมูลและแสดงผลลัพธ์การเรียกใช้งานเปรียบเทียบฟังก์ชันทั้งสองแบบ
    return 0;
}`,
    question1: "1. การส่งค่าพารามิเตอร์แบบ Call-by-Value และ Call-by-Reference ในภาษา C แตกต่างกันอย่างไร?",
    question1Placeholder: "Call by Value จะก๊อปปี้ค่าของตัวแปรไปทำให้ค่าเดิมไม่เปลี่ยน ส่วน Call by Reference ส่งตำแหน่ง Address ทำให้แก้ไขค่าจริงได้...",
    question2: "2. เพราะเหตุใดฟังก์ชันแบบเรียกตัวเอง (Recursion) จึงต้องกำหนดกรณีฐาน (Base Case) ไว้ และหากไม่มีจะเกิดอะไรขึ้น?",
    question2Placeholder: "ถ้าไม่มี Base case ลูปจะทำงานซ้ำไม่รู้จบ ส่งผลให้เกิดปัญหาระบบเมมโมรี่ล้นหรือ Stack Overflow และทำให้โปรแกรมแครช...",
    conclusionPlaceholder: "วิเคราะห์ประโยชน์ของการแยกงานเป็นฟังก์ชันและข้อดีข้อเสียของโค้ดแบบ Recursive...",
    codeKeywords: ["factorial","n","factorialIterative","factorialRecursive"],
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
            <!-- Memory Array structure -->
            <text x="30" y="25" fill="#a5b4fc" font-size="12" font-family="Outfit" font-weight="600">String "Hello" in Memory Array</text>
            
            <!-- Elements -->
            <g transform="translate(30, 45)">
              <!-- H -->
              <rect x="0" y="0" width="50" height="50" fill="#1e293b" stroke="#6366f1" stroke-width="2" />
              <text x="25" y="30" fill="#f8fafc" font-size="14" font-family="JetBrains Mono" text-anchor="middle">'H'</text>
              <text x="25" y="65" fill="#94a3b8" font-size="10" font-family="JetBrains Mono" text-anchor="middle">str[0]</text>
              
              <!-- e -->
              <rect x="50" y="0" width="50" height="50" fill="#1e293b" stroke="#6366f1" stroke-width="2" />
              <text x="75" y="30" fill="#f8fafc" font-size="14" font-family="JetBrains Mono" text-anchor="middle">'e'</text>
              <text x="75" y="65" fill="#94a3b8" font-size="10" font-family="JetBrains Mono" text-anchor="middle">str[1]</text>

              <!-- l -->
              <rect x="100" y="0" width="50" height="50" fill="#1e293b" stroke="#6366f1" stroke-width="2" />
              <text x="125" y="30" fill="#f8fafc" font-size="14" font-family="JetBrains Mono" text-anchor="middle">'l'</text>
              <text x="125" y="65" fill="#94a3b8" font-size="10" font-family="JetBrains Mono" text-anchor="middle">str[2]</text>

              <!-- l -->
              <rect x="150" y="0" width="50" height="50" fill="#1e293b" stroke="#6366f1" stroke-width="2" />
              <text x="175" y="30" fill="#f8fafc" font-size="14" font-family="JetBrains Mono" text-anchor="middle">'l'</text>
              <text x="175" y="65" fill="#94a3b8" font-size="10" font-family="JetBrains Mono" text-anchor="middle">str[3]</text>

              <!-- o -->
              <rect x="200" y="0" width="50" height="50" fill="#1e293b" stroke="#6366f1" stroke-width="2" />
              <text x="225" y="30" fill="#f8fafc" font-size="14" font-family="JetBrains Mono" text-anchor="middle">'o'</text>
              <text x="225" y="65" fill="#94a3b8" font-size="10" font-family="JetBrains Mono" text-anchor="middle">str[4]</text>

              <!-- \\0 -->
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
    example2Desc: "ศึกษาการใช้สตริงอาร์เรย์ และระบุประเภทชนิดของข้อมูลและฟอร์แมตตัวแปรในช่องว่าง <code>____</code> เพื่อรับข้อมูลชื่อ:",
    example2Code: `#include <stdio.h>

int main() {
    // ประกาศประเภทข้อมูลอาร์เรย์ตัวอักษรสำหรับเก็บชื่อ (แทนที่ ____ ด้วย char)
    ____ name[30];
    
    printf("Enter your name: ");
    // เติม Format Specifier สำหรับตัวแปรสายอักษร (แทนที่ ____ ด้วย %s)
    scanf("____", name);
    
    printf("Hello, %s!\\n", name);
    return 0;
}`,
    challengeDesc: "เขียนโปรแกรมรับคำสตริง 1 คำ (ไม่เกิน 50 ตัวอักษร) จากนักศึกษา จากนั้นเขียนอัลกอริทึมสลับด้านสตริงดังกล่าว (Reverse String) และนับความยาวของตัวอักษรนั้นแสดงทางคอนโซล โดยห้ามเรียกใช้ฟังก์ชัน strlen() ที่มาจากไฟล์ไลบรารี <string.h>",
    challengePlaceholder: `#include <stdio.h>

int main() {
    char str[100];
    printf("Enter string: ");
    // รับค่า ย้อนกลับสตริง และหาความยาวสตริงด้วยการวนลูปเช็คตัวอักขระ '\\0'
    return 0;
}`,
    question1: "1. สตริงในภาษา C แตกต่างจากอาร์เรย์ชนิด char ทั่วไปอย่างไร และตัวอักษร '\\0' (Null character) มีความสำคัญอย่างไร?",
    question1Placeholder: "อาร์เรย์ char ทั่วไปไม่ต้องลงท้ายด้วยศูนย์ แต่สตริงจำเป็นต้องลงท้ายด้วย '\\0' เพื่อระบุการจบประโยคข้อความแก่ฟังก์ชันแสดงผล...",
    question2: "2. การจองขนาดพื้นที่อาร์เรย์แบบคงที่ (Static Array) เช่น int score[5]; มีข้อดีและข้อจำกัดอย่างไรในการทำงานจริง?",
    question2Placeholder: "ข้อดีคือประมวลผลเร็วและเขียนง่าย ข้อจำกัดคือไม่สามารถปรับยืดหรือขยายขนาดพื้นที่เมื่อต้องการเพิ่มข้อมูลตอนโปรแกรมกำลังทำงานได้...",
    conclusionPlaceholder: "เขียนสรุปความเข้าใจที่ได้รับเกี่ยวกับมิติของอาร์เรย์ และการเข้าถึงข้อมูลตัวชี้อาร์เรย์...",
    codeKeywords: ["stds","score","average","sum","for"],
    q1Keywords: ["1 มิติ","2 มิติ","แถว","คอลัมน์","ตาราง"],
    q2Keywords: ["\\\\0","null","จบ","array","character"]
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
            <!-- Pointer Diagram -->
            <text x="30" y="25" fill="#a5b4fc" font-size="12" font-family="Outfit" font-weight="600">Pointer Concept (*ptr points to variable x)</text>
            
            <!-- Variable x -->
            <rect x="50" y="55" width="100" height="40" rx="4" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
            <text x="100" y="75" fill="#f8fafc" font-size="11" font-family="JetBrains Mono" text-anchor="middle">x = 42</text>
            <text x="100" y="115" fill="#94a3b8" font-size="10" font-family="JetBrains Mono" text-anchor="middle">Addr: 0x7ffd</text>

            <!-- Pointer ptr -->
            <rect x="250" y="55" width="120" height="40" rx="4" fill="#1e293b" stroke="#10b981" stroke-width="1.5" />
            <text x="310" y="75" fill="#f8fafc" font-size="11" font-family="JetBrains Mono" text-anchor="middle">ptr = 0x7ffd</text>
            <text x="310" y="115" fill="#94a3b8" font-size="10" font-family="JetBrains Mono" text-anchor="middle">Addr: 0x7fff</text>

            <!-- Connection arrow -->
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
    printf("Value pointed by ptr (*ptr): %d\\n", *ptr); // ดึงค่าจาก Address
    return 0;
}`,
    example2Title: "โปรแกรมตัวอย่างที่ 2: การจองหน่วยความจำพลวัตและการเติม Syntax",
    example2Desc: "ศึกษาการจองข้อมูลแบบแมนนวลด้วย malloc() และเติมคำสั่งคืนพื้นที่ในช่องว่าง <code>____</code> เพื่อความปลอดภัย:",
    example2Code: `#include <stdio.h>
#include <stdlib.h>

int main() {
    int *p;
    
    // เติมคำสั่งสำหรับจองพื้นที่ขนาด int 1 ช่อง (แทนที่ ____ ด้วย malloc(sizeof(int)))
    p = (int *)____;
    
    if (p == NULL) {
        printf("Memory allocation failed!\\n");
        return 1;
    }
    
    *p = 500;
    printf("Value in allocated memory: %d\\n", *p);
    
    // เติมคำสั่งคืนหน่วยความจำให้กับระบบเพื่อลดปัญหา Memory leak (แทนที่ ____ ด้วย free(p))
    ____;
    return 0;
}`,
    challengeDesc: "เขียนโปรแกรมภาษา C เพื่อรับขนาดจำนวนเต็ม N จากผู้ใช้ จากนั้นจองหน่วยความจำแบบพลวัตสำหรับเก็บอาร์เรย์จำนวนเต็มขนาด N ตัวด้วย malloc() จากนั้นรับข้อมูลตัวเลข N ตัว คำนวณหาค่าเฉลี่ยของข้อมูลทั้งหมด แล้วแสดงผลลัพธ์ออกทางจอภาพ สุดท้ายให้คืนหน่วยความจำที่จองไว้ด้วย free()",
    challengePlaceholder: `#include <stdio.h>
#include <stdlib.h>

int main() {
    int n, *arr;
    printf("Enter number of elements (N): ");
    // รับค่า N, ทำการ malloc(), ตรวจเช็คค่า NULL, รับข้อมูลและหาเฉลี่ย และปิดท้ายด้วย free()
    return 0;
}`,
    question1: "1. ตัวดำเนินการสัญลักษณ์ * (Dereference operator) และ & (Address-of operator) มีความสัมพันธ์และต่างกันอย่างไรในพอยน์เตอร์?",
    question1Placeholder: "& ใช้สำหรับหา Address หรือที่อยู่อ้างอิงของตัวแปร ส่วน * ใช้สำหรับดึงข้อมูลหรือเข้าถึงตัวแปรผ่าน Address ที่ชี้ไป...",
    question2: "2. อธิบายเหตุผลสำคัญในการต้องเรียกคำสั่ง free() คืนหน่วยความจำหลังสิ้นสุดการใช้งาน และหากลืมจะเกิดความผิดพลาดใด?",
    question2Placeholder: "หากลืมเรียก free() หน่วยความจำจะถูกจองค้างไว้ทำให้เสียพื้นที่ระบบไปเปล่าๆ เกิดปัญหาหน่วยความจำรั่วไหล (Memory Leak)...",
    conclusionPlaceholder: "สรุปสิ่งที่เรียนรู้เกี่ยวกับแนวคิด RAM, Pointer และความสำคัญของการระมัดระวังข้อผิดพลาดของการใช้พอยน์เตอร์...",
    codeKeywords: ["malloc","free","sizeof","ptr","for"],
    q1Keywords: ["&","\\\\*","address","ชี้","ค่า","ตำแหน่ง"],
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
            <!-- Struct vs Union Memory -->
            <text x="30" y="25" fill="#a5b4fc" font-size="12" font-family="Outfit" font-weight="600">Struct vs Union Memory Layout</text>
            
            <!-- Struct layout -->
            <g transform="translate(30, 45)">
              <text x="0" y="-8" fill="#f8fafc" font-size="11" font-family="Outfit" font-weight="600">struct Layout (Parallel)</text>
              <rect x="0" y="0" width="50" height="35" rx="3" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
              <text x="25" y="20" fill="#3b82f6" font-size="10" font-family="JetBrains Mono" text-anchor="middle">char c</text>
              <rect x="50" y="0" width="120" height="35" rx="3" fill="#1e293b" stroke="#10b981" stroke-width="1.5" />
              <text x="110" y="20" fill="#10b981" font-size="10" font-family="JetBrains Mono" text-anchor="middle">int val (4B)</text>
              <text x="85" y="50" fill="#94a3b8" font-size="9" font-family="Sarabun" text-anchor="middle">รวมเนื้อที่ = แยกขนาดจอง</text>
            </g>

            <!-- Union layout -->
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
    example2Desc: "ศึกษาการดึงตัวแปรและข้อมูลภายใน struct มาประมวลผล และกรอกคำสั่งสมาชิกในช่องว่าง <code>____</code>:",
    example2Code: `#include <stdio.h>

// นิยามโครงสร้างผู้ใช้งานระบบ
struct User {
    int id;
    char username[20];
};

int main() {
    // ประกาศและก๊อปปี้ค่าเริ่มต้นลงตัวแปรโครงสร้าง (แทนที่ ____ ด้วย struct User)
    ____ user1 = {101, "admin"};
    
    // เติมการเข้าถึงตัวแปร username ด้านใน struct (แทนที่ ____ ด้วย user1.username)
    printf("User ID: %d, Name: %s\\n", user1.id, ____);
    return 0;
}`,
    challengeDesc: "สร้างโครงสร้างข้อมูล struct Student เพื่อบันทึกข้อมูลนักเรียน ได้แก่ รหัสนักศึกษา (สตริง), ชื่อ-นามสกุล (สตริง) และคะแนนเก็บ (ทศนิยม) จากนั้นเขียนโปรแกรมรับข้อมูลนักศึกษา 3 คน บันทึกค่าลงตัวแปร แสดงผลลัพธ์เป็นตารางให้เรียบร้อย และหาคะแนนเฉลี่ยรวมของนักศึกษาทุกคน",
    challengePlaceholder: `#include <stdio.h>

struct Student {
    char id[15];
    char name[50];
    float score;
};

int main() {
    struct Student stds[3];
    // เขียนคำสั่งวนซ้ำรับข้อมูล 3 คน แสดงผลลัพธ์ตารางและค่าเฉลี่ย
    return 0;
}`,
    question1: "1. อธิบายความแตกต่างที่สำคัญของการทำงานและการจองตำแหน่งหน่วยความจำระหว่าง struct และ union",
    question1Placeholder: "struct จองหน่วยความจำแยกตัวแปรสมาชิกทุกคน ส่วน union สมาชิกทุกคนแชร์พื้นที่เดียวกันและมีขนาดเท่าตัวแปรใหญ่สุด...",
    question2: "2. ในกรณีลักษณะงานใดที่เราควรเลือกนำ union มาเลือกประยุกต์ใช้งานแทนการใช้ struct ในการประมวลผล?",
    question2Placeholder: "ใช้ในงานที่ตัวแปรสมาชิกไม่ได้ถูกเรียกใช้งานพร้อมกัน เช่น ในอุปกรณ์ฝังตัวเพื่อจำกัดการใช้ RAM หรือแชร์แพ็กเกตข้อมูลการส่ง...",
    conclusionPlaceholder: "เขียนสรุปความสำคัญของการใช้ struct จัดการข้อมูลจำลองที่ซับซ้อน และการนำมาพัฒนาเป็นระบบฐานข้อมูลขนาดย่อม...",
    codeKeywords: ["struct","student","id","name","score","stds"],
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
            <!-- File handling visual -->
            <text x="30" y="25" fill="#a5b4fc" font-size="12" font-family="Outfit" font-weight="600">File Stream Communication Model</text>
            
            <!-- C Program -->
            <rect x="50" y="55" width="130" height="40" rx="4" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
            <text x="115" y="79" fill="#f8fafc" font-size="11" font-family="JetBrains Mono" text-anchor="middle">C Program (RAM)</text>

            <!-- Stream Arrow -->
            <path d="M 180 75 L 350 75" fill="none" stroke="#f59e0b" stroke-width="2.5" marker-end="url(#arrow)" />
            <text x="265" y="65" fill="#f59e0b" font-size="10" font-family="JetBrains Mono" text-anchor="middle">fopen("w", "r")</text>

            <!-- Disk File -->
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
    example2Desc: "ศึกษาการเปิดอ่านไฟล์ด้วยโหมดอ่านข้อความ และเติมตัวเช็คค่าพอยน์เตอร์ล้มเหลวในช่องว่าง <code>____</code>:",
    example2Code: `#include <stdio.h>

int main() {
    FILE *fp;
    char buffer[50];
    
    // เติมโหมดการเปิดเพื่ออ่านไฟล์ข้อความ (แทนที่ ____ ด้วย "r")
    fp = fopen("test.txt", "____");
    
    // ตรวจสอบพอยน์เตอร์การชี้ว่าเปิดล้มเหลวหรือไม่ (แทนที่ ____ ด้วย NULL)
    if (fp == ____) {
        printf("Could not open file!\\n");
        return 1;
    }
    
    fgets(buffer, 50, fp);
    printf("File Content: %s\\n", buffer);
    fclose(fp);
    return 0;
}`,
    challengeDesc: "พัฒนาโปรแกรมภาษา C เพื่อสร้างไฟล์เขียนข้อความชื่อ students.txt จากนั้นพิมพ์ข้อมูลชื่อและเกรดของตัวคุณเองลงไปในไฟล์ เมื่อทำการเขียนไฟล์เสร็จแล้ว ให้โปรแกรมเปิดอ่านดึงข้อมูลจากไฟล์ตัวหนังสือดังกล่าวขึ้นมาแสดงผลลัพธ์ย้อนกลับมาบนจอคอนโซลอีกครั้งให้สำเร็จ",
    challengePlaceholder: `#include <stdio.h>

int main() {
    FILE *fp;
    // เขียนโปรแกรมสร้างไฟล์ เขียนข้อมูล ปิดไฟล์ แล้วทำการเปิดขึ้นมาอ่านแสดงผลอีกรอบ
    return 0;
}`,
    question1: "1. การจัดการไฟล์ข้อมูลในรูปแบบ Text Mode และ Binary Mode แตกต่างกันอย่างไรในแง่ลักษณะไฟล์และขนาด?",
    question1Placeholder: "Text mode จัดเก็บเป็นตัวหนังสือธรรมดาที่มนุษย์อ่านเข้าใจได้ง่าย แต่ Binary mode จัดเก็บเป็นฐานข้อมูลบิตดิบตรงตามใน RAM...",
    question2: "2. เพราะเหตุใดเมื่อเขียนชุดคำสั่งภาษา C เพื่อจัดการไฟล์ เราจึงต้องตรวจสอบค่า pointer ของไฟล์ว่าเท่ากับ NULL หรือไม่หลัง fopen()?",
    question2Placeholder: "เพื่อตรวจสอบความปลอดภัยว่าเปิดไฟล์ได้สำเร็จจริงหรือไม่ ป้องกันข้อผิดพลาดหากพาธไฟล์ผิดหรือไม่มีสิทธิ์เขียนเพื่อไม่ให้โปรแกรมแครช...",
    conclusionPlaceholder: "วิเคราะห์ประโยชน์ของการบันทึกไฟล์ในการพัฒนาระบบ และข้อควรระวังในการปิดไฟล์ (fclose) ทุกครั้ง...",
    codeKeywords: ["fopen","fclose","fprintf","fscanf","students.txt","w","r"],
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
    example2Desc: "ศึกษาการคัดลอกและเชื่อมต่อข้อความแบบระบุจำนวนตัวอักษรสูงสุดเพื่อความปลอดภัย เติมคีย์เวิร์ดฟังก์ชันสตริงในช่องว่าง <code>____</code> ใน IDE เพื่อทดลองรัน:",
    example2Code: `#include <stdio.h>
#include <string.h>

int main() {
    char buffer[15];
    char source[] = "SuperLongString";
    char result[30] = "Prefix_";

    printf("--- การใช้งาน strncpy() และ strncat() ---\\n");
    
    // เติมคำสั่งคัดลอกสตริงแบบจำกัดจำนวนเพื่อความปลอดภัย (แทนที่ ____ ด้วย strncpy)
    ____(buffer, source, sizeof(buffer) - 1);
    buffer[sizeof(buffer) - 1] = '\\0'; // ใส่ null terminator ด้วยตนเองเสมอเมื่อใช้ strncpy
    printf("strncpy ผลลัพธ์ใน buffer: '%s'\\n", buffer);

    // เติมคำสั่งเชื่อมสตริงสูงสุด 5 ตัวอักษรแรก (แทนที่ ____ ด้วย strncat)
    ____(result, source, 5);
    printf("strncat ผลลัพธ์ใน result: '%s'\\n", result);

    return 0;
}`,
    challengeDesc: "พัฒนาโปรแกรมภาษา C เพื่อแก้ไขโจทย์ด้านล่างนี้ในโปรแกรมเดียว:<br>1. <b>ตรวจสอบ Serial Number</b>: รับเลขประจำเครื่อง (สูงสุด 20 ตัวอักษร) แสดงความยาว และตรวจว่าขึ้นต้นด้วย 'SN-' หรือไม่ (ใช้ fgets, strlen, strncmp)<br>2. <b>สร้างชื่อไฟล์รายงาน</b>: รับชื่ออุปกรณ์จากผู้ใช้ แล้วนำมาเชื่อมเข้ากับข้อความ '_Report.txt' เพื่อสร้างชื่อไฟล์ปลายทาง (ใช้ strcpy, strcat)<br>3. <b>จำลองเปลี่ยนสถานะอุปกรณ์</b>: เริ่มต้นสถานะเป็น 'Offline' รับคำสั่งจากผู้ใช้ หากเป็น 'connect' ให้เปลี่ยนสถานะเป็น 'Online' หากเป็น 'disconnect' ให้เปลี่ยนสถานะเป็น 'Offline' หากเป็นคำสั่งอื่นให้พิมพ์ 'คำสั่งไม่ถูกต้อง' และรักษาสถานะเดิมไว้ (ใช้ strcmp, strcpy)",
    challengePlaceholder: `#include <stdio.h>
#include <string.h>

void testSerialNumber();
void generateReportFilename();
void deviceStatusSimulator();

int main() {
    printf("=== กิจกรรมท้าทาย: String Functions ===\\n");
    testSerialNumber();
    printf("\\n");
    generateReportFilename();
    printf("\\n");
    deviceStatusSimulator();
    return 0;
}

void testSerialNumber() {
    char sn[30];
    printf("กรุณาป้อน Serial Number (สูงสุด 20 ตัวอักษร): ");
    // เขียนคำสั่งรับค่าและตรวจสอบรูปแบบขึ้นต้นด้วย SN- ที่นี่
}

void generateReportFilename() {
    char deviceName[50];
    char filename[100];
    printf("กรุณาป้อนชื่ออุปกรณ์: ");
    // เขียนคำสั่งรับค่าและต่อคำท้ายด้วย _Report.txt ที่นี่
}

void deviceStatusSimulator() {
    char status[20] = "Offline";
    char command[30];
    printf("สถานะอุปกรณ์ปัจจุบัน: %s\\n", status);
    printf("ป้อนคำสั่ง (connect/disconnect): ");
    // เขียนคำสั่งรับค่า เปรียบเทียบเพื่อสลับสถานะ และแสดงผลสถานะที่นี่
}`,
    question1: "1. อธิบายความแตกต่างและเหตุผลด้านความปลอดภัยในการเลือกใช้งานระหว่างฟังก์ชัน strcpy() และ strncpy()",
    question1Placeholder: "strcpy มีความเสี่ยงที่จะทำให้เกิด Buffer Overflow หากสตริงต้นทางมีความยาวมากกว่าอาเรย์ปลายทาง ขณะที่ strncpy จะกำหนดขนาดสูงสุดที่จะก๊อปปี้ทำให้ปลอดภัยกว่า แต่มีข้อควรระวังคือต้องใส่ \\0 ตัวปิดท้ายเองหากต้นทางยาวเกินกำหนด...",
    question2: "2. เพราะเหตุใดฟังก์ชัน fgets() จึงต้องมีพารามิเตอร์จำกัดขนาด (size) และเพราะเหตุใดนักพัฒนาจึงต้องจัดการกับอักษรขึ้นบรรทัดใหม่ (\\n) หลังการรับข้อมูล?",
    question2Placeholder: "เนื่องจาก fgets จะจำกัดจำนวนการอ่านข้อมูลจากอินพุตไม่ให้เกินขนาดของบัฟเฟอร์ (ป้องกัน Buffer Overflow) และเมื่อผู้ใช้กด Enter จะมีอักขระ \\n ติดเข้ามาในข้อความด้วย ทำให้ต้องเคลียร์ออกเพื่อให้ข้อมูลไม่ขึ้นบรรทัดใหม่เวลานำไปเชื่อมต่อหรือตรวจสอบ...",
    conclusionPlaceholder: "วิเคราะห์ประโยชน์ของฟังก์ชันสำเร็จรูปใน string.h ในการลดความซับซ้อนและเพิ่มความปลอดภัยของการพัฒนาแอปพลิเคชัน...",
    codeKeywords: ["fgets","strlen","strncmp","strcpy","strcat","connect","disconnect"],
    q1Keywords: ["overflow","ความยาว","n","ปลอดภัย","\\\\0"],
    q2Keywords: ["gets","ปลอดภัย","ขนาด","buffer","\\\\n","enter"]
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
            
            <!-- Source Code -->
            <rect x="20" y="45" width="90" height="50" rx="4" fill="#1e293b" stroke="#3b82f6" stroke-width="2" />
            <text x="65" y="70" fill="#f8fafc" font-size="10" font-family="JetBrains Mono" text-anchor="middle">Source Code</text>
            <text x="65" y="85" fill="#3b82f6" font-size="9" font-family="JetBrains Mono" text-anchor="middle">main.c</text>
            
            <!-- Arrow 1 -->
            <line x1="110" y1="70" x2="140" y2="70" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#arrow)" />
            
            <!-- Compiler -->
            <rect x="140" y="45" width="90" height="50" rx="4" fill="#1e293b" stroke="#f59e0b" stroke-width="2" />
            <text x="185" y="75" fill="#f8fafc" font-size="11" font-family="Outfit" text-anchor="middle">Compiler</text>
            
            <!-- Arrow 2 -->
            <line x1="230" y1="70" x2="260" y2="70" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#arrow)" />
            
            <!-- Object File -->
            <rect x="260" y="45" width="90" height="50" rx="4" fill="#1e293b" stroke="#a855f7" stroke-width="2" />
            <text x="305" y="70" fill="#f8fafc" font-size="10" font-family="JetBrains Mono" text-anchor="middle">Object File</text>
            <text x="305" y="85" fill="#a855f7" font-size="9" font-family="JetBrains Mono" text-anchor="middle">main.obj</text>
            
            <!-- Arrow 3 -->
            <line x1="350" y1="70" x2="380" y2="70" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#arrow)" />
            
            <!-- Linker -->
            <rect x="380" y="45" width="90" height="50" rx="4" fill="#1e293b" stroke="#10b981" stroke-width="2" />
            <text x="425" y="75" fill="#f8fafc" font-size="11" font-family="Outfit" text-anchor="middle">Linker</text>
            
            <!-- Arrow 4 -->
            <line x1="470" y1="70" x2="500" y2="70" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#arrow)" />
            
            <!-- Executable -->
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
    example2Desc: "ศึกษาตำแหน่งสำคัญของสัญกรณ์ไวยากรณ์ภาษา C และเติมส่วนโค้ดที่หายไปในช่องว่าง <code>____</code> เพื่อให้คอมไพเลอร์แปลโค้ดได้ผ่านการทดสอบ:",
    example2Code: `// เติมส่วนการประกาศนำเข้าห้องสมุด stdio.h (แทนที่ ____ ด้วย #include <stdio.h>)
____

// เติมคำสำคัญประกาศฟังก์ชันหลักของระบบ (แทนที่ ____ ด้วย int main())
____ {
    // เติมส่วนปิดท้ายคำสั่งแสดงข้อความด้วย Semi-colon (แทนที่ ____ ด้วย ;)
    printf("ตรวจสอบโครงสร้างโปรแกรมสำเร็จ")____
    
    // เติมส่วนส่งค่ากลับเพื่อยืนยันจบโปรแกรมปกติ (แทนที่ ____ ด้วย return 0;)
    ____
}`,
    challengeDesc: "พัฒนาและฝึกแก้ไขโครงสร้างโปรแกรมภาษา C ตามโจทย์กิจกรรมท้าทายดังนี้:<br>1. <b>Syntax Debugger</b>: ค้นหาและแก้ไขจุดผิดไวยากรณ์ 4 จุดในโค้ด C ที่เตรียมไว้ เพื่อให้คอมไพล์สำเร็จ (สังเกตเครื่องหมาย `;`, `#include`, การสะกด `printf`, และปีกกาเปิด-ปิด)<br>2. <b>โปรแกรมแสดงข้อมูลนักศึกษาพร้อมคอมเมนต์</b>: เขียนโปรแกรมที่ใช้ Directives และฟังก์ชัน `main` ในการพิมพ์ชื่อ-นามสกุล, รหัสนักศึกษา และกลุ่มเรียนของตัวคุณเอง พร้อมใช้คอมเมนต์แบบ Single-line (`//`) อธิบายหน้าที่ของโค้ดแต่ละบรรทัด<br>3. <b>ระบบสลับแสดงข้อความแบบโครงสร้างบล็อก</b>: รับเลข 1 หรือ 2 จากแป้นพิมพ์ หากเป็น 1 ให้พิมพ์ชื่อวิชา 'การเขียนโปรแกรมคอมพิวเตอร์' หากเป็น 2 ให้พิมพ์ชื่อสาขา 'เทคโนโลยีอิเล็กทรอนิกส์' หากเป็นค่าอื่นให้พิมพ์ 'เลือกไม่ถูกต้อง'",
    challengePlaceholder: `#include <stdio.h>

// ฟังก์ชันสำหรับแบบฝึกหัดกิจกรรม
void runSyntaxDebugger();
void printStudentProfile();
void runBlockSelection();

int main() {
    printf("=== กิจกรรมท้าทาย: C Program Structure ===\\n");
    runSyntaxDebugger();
    printf("\\n");
    printStudentProfile();
    printf("\\n");
    runBlockSelection();
    return 0;
}

// โจทย์ข้อที่ 1: ตรวจหาและแก้ไขคำสั่งให้ถูกต้อง (มีจุดผิด 4 ตำแหน่งในฟังก์ชันนี้)
void runSyntaxDebugger() {
    // --- โค้ดที่มีข้อผิดพลาด ---
    /*
    include <stdio.h>
    void runSyntaxDebugger() {
        print("Debugging test\\n")
        return 0
    }
    */
    
    // --- เขียนแก้ไขโครงสร้างที่ถูกต้องที่นี่ เพื่อรันคำสั่งและพิมพ์ข้อความได้ ---
    printf("แก้ไขคำสั่งเรียบร้อย: [อธิบายจุดแก้ไข 4 จุดที่นี่ในสายอักขระพิมพ์ข้อความ]\\n");
}

// โจทย์ข้อที่ 2: เขียนโปรแกรมโครงสร้างสมบูรณ์และใส่คอมเมนต์ประกอบทีละบรรทัด
void printStudentProfile() {
    // เขียนโค้ดประวัติของคุณพร้อมคอมเมนต์กำกับทุกคำสั่งที่นี่
}

// โจทย์ข้อที่ 3: เขียนรับเลข 1/2 และสลับแสดงคำอธิบาย
void runBlockSelection() {
    int choice;
    printf("ป้อนตัวเลือก (1 หรือ 2): ");
    // เขียนคำสั่งรับค่าและจัดโครงสร้างตรวจสอบเงื่อนไขที่นี่
}`,
    question1: "1. อธิบายหน้าที่ของ Preprocessor Directives (เช่น #include <stdio.h>) และระบุว่าจะเกิดข้อผิดพลาดอย่างไรหากเราลืมใส่ในโค้ดโปรแกรม?",
    question1Placeholder: "#include มีหน้าที่นำเข้าไฟล์ส่วนหัวของไลบรารีเพื่อเรียกใช้ฟังก์ชันสำเร็จรูป เช่น printf() หากลืมคอมไพเลอร์จะแสดงข้อผิดพลาด (Warning/Error) ว่าไม่รู้จักฟังก์ชันดังกล่าว...",
    question2: "2. อธิบายขั้นตอนที่คอมไพเลอร์ทำการแปลซอร์สโค้ดภาษา C ตั้งแต่ไฟล์ .c ไปจนกระทั่งได้ไฟล์ผลลัพธ์ .exe อย่างสังเขป",
    question2Placeholder: "เริ่มจาก Preprocessing เคลียร์คอมเมนต์และดึงไลบรารี -> Compiling แปลเป็นรหัสแอสเซมบลี -> Assembling แปลเป็นรหัสภาษาเครื่อง (.obj) -> Linking เชื่อมโยงไลบรารีเพื่อสร้างไฟล์รันผลลัพธ์ .exe...",
    conclusionPlaceholder: "วิเคราะห์ประโยชน์ของการจัดโครงสร้างโปรแกรมที่มีระเบียบ การใช้ย่อหน้า (Indentation) และความสำคัญของการคอมเมนต์ในกระบวนการทำงานร่วมกัน...",
    codeKeywords: ["include","stdio.h","int main()","runSyntaxDebugger","printStudentProfile","runBlockSelection"],
    q1Keywords: ["preprocessor","include","ห้องสมุด","ฟังก์ชันสำเร็จรูป","error","warning"],
    q2Keywords: ["compiling","linking","assembly","object","exe"]
  }
];

function generateCodeGs(lab) {
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
        "โค้ดโปรแกรมตอบคำท้าทาย", 
        "คำถามข้อที่ 1", "คำถามข้อที่ 2",
        "ลิงก์ไฟล์รูปภาพผลการทดลอง", "ลิงก์ไฟล์โค้ด (.c)", "สรุปผลการทดลอง",
        "คะแนนรวม (เต็ม 10)", "ข้อเสนอแนะระบบตรวจออโต้"
      ];
      sheet.appendRow(headers);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#e2e8f0");
      sheet.setFrozenRows(1);
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
    
    // Check Challenge Code (Max 5 pts)
    var code = data.challengeCode || "";
    var codeMatches = 0;
    codeKeywords.forEach(function(kw) {
      if (new RegExp(kw, 'i').test(code)) {
        codeMatches++;
      }
    });
    var codeScore = codeKeywords.length > 0 ? Math.round((codeMatches / codeKeywords.length) * 5) : 5;
    score += codeScore;
    feedback.push("Challenge Code: " + codeScore + "/5 (พบ " + codeMatches + "/" + codeKeywords.length + " คีย์เวิร์ด)");
    
    // Check Q1 (Max 2 pts)
    var q1 = data.question1 || "";
    var q1Matches = 0;
    q1Keywords.forEach(function(kw) {
      if (new RegExp(kw, 'i').test(q1)) {
        q1Matches++;
      }
    });
    var q1Score = q1Keywords.length > 0 ? (q1Matches >= 1 ? 2 : 0) : 2;
    score += q1Score;
    feedback.push("Q1: " + q1Score + "/2");
    
    // Check Q2 (Max 2 pts)
    var q2 = data.question2 || "";
    var q2Matches = 0;
    q2Keywords.forEach(function(kw) {
      if (new RegExp(kw, 'i').test(q2)) {
        q2Matches++;
      }
    });
    var q2Score = q2Keywords.length > 0 ? (q2Matches >= 1 ? 2 : 0) : 2;
    score += q2Score;
    feedback.push("Q2: " + q2Score + "/2");
    
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
    
    // 3. Log data to Spreadsheet
    var rowData = [
      new Date(),
      data.studentName,
      data.studentId,
      data.studentGroup,
      data.labDate,
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
      message: "บันทึกข้อมูลใบงานสำเร็จแล้ว! ข้อมูลของท่านถูกส่งไปที่ Google Sheet เรียบร้อย (คะแนนรวมประเมินออโต้: " + score + "/10)"
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
      display: grid;
      grid-template-columns: 1fr 2fr;
      gap: 1rem;
      margin-top: 1.5rem;
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
      header, .course-badge, .logo-container, .btn, .upload-area, .remove-file-btn, .modal-overlay, .copy-btn, .code-header, .connection-status {
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
          ${lab.purpose.map(p => '<li>' + p + '</li>').join('\n          ')}
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
              ${lab.equipments.map((e, index) => '<tr><td>' + (index + 1) + '</td><td>' + e.name + '</td><td>' + e.desc + '</td></tr>').join('')}
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
          <pre><code id="ex1Code">${lab.example1Code}</code></pre>
        </div>

        <h3>${lab.example2Title}</h3>
        <p>${lab.example2Desc}</p>
        <div class="code-container">
          <div class="code-header">
            <span>example2_fill.c</span>
            <button class="copy-btn" type="button" onclick="copyCode('ex2Code')"><i class="fa-regular fa-copy"></i> คัดลอก</button>
          </div>
          <pre><code id="ex2Code">${lab.example2Code}</code></pre>
        </div>

        <div class="challenge-frame">
          <h3><i class="fa-solid fa-trophy"></i> กิจกรรมท้าทาย (Lab Challenge)</h3>
          <p>${lab.challengeDesc}</p>
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
              <i class="fa-solid fa-user-graduate"></i> ข้อมูลผู้ส่งใบงาน
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

          <!-- Section 2: Code Submission -->
          <div class="form-section">
            <div class="form-section-title">
              <i class="fa-solid fa-file-code"></i> ผลการทำกิจกรรมท้าทาย (Source Code)
            </div>
            <div class="form-group">
              <label for="challengeCode">พิมพ์โค้ดภาษา C ตอบคำท้าทายของคุณที่นี่</label>
              <textarea id="challengeCode" class="code-textarea" required placeholder="${lab.challengePlaceholder.replace(/"/g, '&quot;').replace(/\\n/g, '\\\\n')}"></textarea>
            </div>
          </div>

          <!-- Section 3: Questions -->
          <div class="form-section">
            <div class="form-section-title">
              <i class="fa-solid fa-circle-question"></i> คำถามท้ายการทดลอง
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
              <i class="fa-solid fa-paperclip"></i> ไฟล์แนบ (Attachments)
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
              <i class="fa-solid fa-comment-dots"></i> สรุปผลการทดลอง
            </div>
            <div class="form-group">
              <label for="conclusion">สรุปและข้อเสนอแนะจากการทดลอง</label>
              <textarea id="conclusion" rows="4" required placeholder="${lab.conclusionPlaceholder}"></textarea>
            </div>
          </div>

          <!-- Actions -->
          <div class="button-group">
            <button type="button" class="btn btn-secondary" onclick="window.print()">
              <i class="fa-solid fa-print"></i> พิมพ์ PDF
            </button>
            <button type="submit" class="btn" id="submitBtn">
              <i class="fa-solid fa-paper-plane"></i> ส่งใบงานออนไลน์
            </button>
          </div>
        </form>
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
      
      // Setup default placeholder correctly
      document.getElementById('challengeCode').value = \\\`${lab.challengePlaceholder.replace(new RegExp('\\\\x60', 'g'), String.fromCharCode(96)).replace(new RegExp('\\\\\\\\$', 'g'), String.fromCharCode(36))}\\\`;
    });

    // Copy code helper
    function copyCode(elementId) {
      const codeText = document.getElementById(elementId).innerText;
      
      function fallbackCopy() {
        const textArea = document.createElement("textarea");
        textArea.value = codeText;
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          const successful = document.execCommand('copy');
          if (successful) {
            alert('คัดลอกโค้ดเรียบร้อยแล้ว!');
          } else {
            alert('ไม่สามารถคัดลอกโค้ดได้ กรุณาครอบดำคัดลอกด้วยตนเอง');
          }
        } catch (err) {
          alert('ไม่สามารถคัดลอกโค้ดได้: ' + err);
        }
        document.body.removeChild(textArea);
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(codeText).then(() => {
          alert('คัดลอกโค้ดเรียบร้อยแล้ว!');
        }).catch(err => {
          console.warn('Clipboard API failed, using fallback:', err);
          fallbackCopy();
        });
      } else {
        fallbackCopy();
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

      // Validate size
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
      e.preventDefault();
      
      const submitBtn = document.getElementById('submitBtn');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner loading-spinner"></i> กำลังดำเนินการ...';

      // Save Student Details to localStorage
      const nameVal = document.getElementById('studentName').value;
      const idVal = document.getElementById('studentId').value;
      const groupVal = document.getElementById('studentGroup').value;

      localStorage.setItem('student_name', nameVal);
      localStorage.setItem('student_id', idVal);
      localStorage.setItem('student_group', groupVal);

      // Collect data
      const payload = {
        studentName: nameVal,
        studentId: idVal,
        studentGroup: groupVal,
        labDate: document.getElementById('labDate').value,
        challengeCode: document.getElementById('challengeCode').value,
        question1: document.getElementById('question1').value,
        question2: document.getElementById('question2').value,
        conclusion: document.getElementById('conclusion').value,
        ...filesData
      };

      // Open Modal Loader
      openModal('loading', 'กำลังบันทึกข้อมูล...', 'ระบบกำลังรับส่งข้อมูลของท่านไปยังเซิร์ฟเวอร์ กรุณารอจนกว่ากระบวนการจะเสร็จสิ้น');

      const isGoogleAppsScript = (typeof google !== 'undefined' && google.script && google.script.run);
      
      if (isGoogleAppsScript) {
        google.script.run
          .withSuccessHandler((response) => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            if (response.status === 'success') {
              openModal('success', 'ส่งรายงานสำเร็จ!', response.message);
              // Clear fields
              document.getElementById('challengeCode').value = \\\`${lab.challengePlaceholder.replace(new RegExp('\\\\x60', 'g'), String.fromCharCode(96)).replace(new RegExp('\\\\\\\\$', 'g'), String.fromCharCode(36))}\\\`;
              document.getElementById('question1').value = '';
              document.getElementById('question2').value = '';
              document.getElementById('conclusion').value = '';
              removeFile('screenshot');
              removeFile('code');
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
          openModal('success', 'โหมดทดลองออฟไลน์สำเร็จ!', 'จำลองการส่งข้อมูลเสร็จสิ้น ข้อมูลผู้ส่งได้รับการเก็บบันทึกบนเบราว์เซอร์ของท่านแล้ว (หากเปิดใช้งานบน Google Script จริง ข้อมูลนี้จะถูกบันทึกไปยัง Google Sheet)');
        }, 1500);
      }
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
  </script>
</body>
</html>
`;
}

// Ensure the root path and subdirectories are created
const destDir = path.join(__dirname, 'scratch', 'lab-c-programming');
const labsDestDir = fs.existsSync(destDir) ? destDir : path.join(__dirname);

console.log(`Generating C programming labs basic, structure and 1 to 10 in: ${labsDestDir}`);

labs.forEach(lab => {
  const labDir = path.join(labsDestDir, lab.idName);
  if (!fs.existsSync(labDir)) {
    fs.mkdirSync(labDir, { recursive: true });
  }

  // Write Code.gs
  const codeGsContent = generateCodeGs(lab);
  fs.writeFileSync(path.join(labDir, 'Code.gs'), codeGsContent, 'utf-8');

  // Write index.html
  const indexHtmlContent = generateIndexHtml(lab);
  fs.writeFileSync(path.join(labDir, 'index.html'), indexHtmlContent, 'utf-8');

  console.log(`Generated files for ${lab.idName} successfully!`);
});

console.log('All C Labs generation complete!');

