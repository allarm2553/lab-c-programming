/**
 * Google Apps Script — Basic Flowchart Lab
 * รองรับทั้งนักเรียนส่งงาน และครูตรวจให้คะแนน
 */

// ============================================================
//  ส่วนที่ 1: Routing — แยกหน้านักเรียน / หน้าครู
// ============================================================
function doGet(e) {
  var page = e && e.parameter && e.parameter.page;

  if (page === 'grader') {
    // หน้าตรวจงานสำหรับครู
    return HtmlService.createTemplateFromFile('grader')
      .evaluate()
      .setTitle('ตรวจใบงาน Basic Flowchart — ครู')
      .addMetaTag('viewport', 'width=device-width, initial-scale=1')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  }

  // หน้าใบงานนักเรียน (default)
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setTitle('ใบงาน Basic Flowchart: การเขียนผังงาน')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var result;

    if (data.action === 'saveTeacherScore') {
      result = saveTeacherScore(data);
    } else {
      result = submitLabData(data);
    }

    return ContentService
      .createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: 'doPost error: ' + err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ============================================================
//  ส่วนที่ 2: นักเรียนส่งงาน
// ============================================================
function submitLabData(data) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheetName = "Basic Flowchart Submissions";
    var sheet = ss.getSheetByName(sheetName);

    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      var headers = [
        "Timestamp", "ชื่อ-นามสกุล", "รหัสประจำตัว", "ชั้น/ห้อง",
        // ข้อ 2.1
        "2.1.1 Terminator", "2.1.2 I/O", "2.1.3 Decision", "2.1.4 Process", "2.1.5 Connector",
        // ข้อ 2.2 รูป
        "รูป 2.2.1 (ต้มบะหมี่)", "รูป 2.2.2 (ฝนตก)", "รูป 2.2.3 (Number)",
        // ข้อ 2.3 IPO + รูป
        "2.3.1 Input", "2.3.1 Process", "2.3.1 Output", "รูป 2.3.1 (Calories)",
        "2.3.2 Input", "2.3.2 Process", "2.3.2 Output", "รูป 2.3.2 (Circle)",
        "2.3.3 Input", "2.3.3 Process", "2.3.3 Output", "รูป 2.3.3 (Fahrenheit)",
        // สรุป
        "สรุปผลการปฏิบัติงาน",
        // คะแนนอัตโนมัติ
        "คะแนนอัตโนมัติ (เต็ม 45)", "รายละเอียดคะแนนอัตโนมัติ",
        // ═══ คอลัมน์ครูตรวจ ═══
        "★ คะแนนครู 2.2.1 (เต็ม 5)", "★ คะแนนครู 2.2.2 (เต็ม 5)", "★ คะแนนครู 2.2.3 (เต็ม 5)",
        "★ คะแนนครู 2.3.1 (เต็ม 5)", "★ คะแนนครู 2.3.2 (เต็ม 5)", "★ คะแนนครู 2.3.3 (เต็ม 5)",
        "★ หมายเหตุครู",
        "★ คะแนนรวมสุดท้าย", "★ ตรวจแล้วโดย", "★ วันที่ตรวจ"
      ];
      sheet.appendRow(headers);

      // สีหัวคอลัมน์อัตโนมัติ = ฟ้า, หัวคอลัมน์ครู = เหลือง
      sheet.getRange(1, 1, 1, 26).setFontWeight("bold").setBackground("#dbeafe");
      sheet.getRange(1, 27, 1, 10).setFontWeight("bold").setBackground("#fef9c3");
      sheet.setFrozenRows(1);
    }

    // อัปโหลดรูป
    var folderName = "Basic Flowchart Attachments";
    var folders = DriveApp.getFoldersByName(folderName);
    var folder = folders.hasNext() ? folders.next() : DriveApp.createFolder(folderName);

    function uploadImage(base64, fileName, mimeType, label) {
      if (!base64 || !fileName) return "ไม่ได้แนบรูป";
      var prefix = data.studentId + "_" + (data.studentName || "").replace(/\s+/g, '_') + "_" + label + "_";
      var blob = Utilities.newBlob(
        Utilities.base64Decode(base64.split(",")[1]), mimeType, prefix + fileName
      );
      var file = folder.createFile(blob);
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      return file.getUrl();
    }

    var url221 = uploadImage(data.flowchart221Base64, data.flowchart221Name, data.flowchart221Type, "221");
    var url222 = uploadImage(data.flowchart222Base64, data.flowchart222Name, data.flowchart222Type, "222");
    var url223 = uploadImage(data.flowchart223Base64, data.flowchart223Name, data.flowchart223Type, "223");
    var url231 = uploadImage(data.flowchart231Base64, data.flowchart231Name, data.flowchart231Type, "231");
    var url232 = uploadImage(data.flowchart232Base64, data.flowchart232Name, data.flowchart232Type, "232");
    var url233 = uploadImage(data.flowchart233Base64, data.flowchart233Name, data.flowchart233Type, "233");

    // คะแนนอัตโนมัติ
    var score = 0;
    var feedbackLines = [];

    // ข้อ 2.1 สัญลักษณ์
    var symbolAnswers = [
      { field: data.ans211, correct: ["เริ่มต้น","สิ้นสุด","terminator","terminal","จบ"], label: "2.1.1" },
      { field: data.ans212, correct: ["ข้อมูล","input","output","i/o","รับ","แสดง"], label: "2.1.2" },
      { field: data.ans213, correct: ["ตัดสิน","decision","เงื่อนไข","rhombus","เพชร"], label: "2.1.3" },
      { field: data.ans214, correct: ["process","ประมวล","กระบวน","คำนวณ"], label: "2.1.4" },
      { field: data.ans215, correct: ["connector","เชื่อม","วงกลม","จุดเชื่อม"], label: "2.1.5" }
    ];
    var sym_score = 0;
    symbolAnswers.forEach(function(item) {
      var ans = (item.field || "").toLowerCase().trim();
      if (item.correct.some(function(kw) { return ans.indexOf(kw.toLowerCase()) !== -1; })) {
        sym_score++;
      } else {
        feedbackLines.push("✗ " + item.label + ": ยังไม่ถูกต้อง");
      }
    });
    score += sym_score;
    feedbackLines.unshift("2.1 สัญลักษณ์: " + sym_score + "/5");

    // ข้อ 2.2 รูป (แนบ = 5, ไม่แนบ = 0 — ครูตรวจปรับได้)
    var pic22_auto = 0;
    var p22d = [];
    if (url221 !== "ไม่ได้แนบรูป") { pic22_auto += 5; p22d.push("2.2.1✓"); } else p22d.push("2.2.1✗");
    if (url222 !== "ไม่ได้แนบรูป") { pic22_auto += 5; p22d.push("2.2.2✓"); } else p22d.push("2.2.2✗");
    if (url223 !== "ไม่ได้แนบรูป") { pic22_auto += 5; p22d.push("2.2.3✓"); } else p22d.push("2.2.3✗");
    score += pic22_auto;
    feedbackLines.push("2.2 รูป (เบื้องต้น): " + pic22_auto + "/15 [" + p22d.join(",") + "] — ครูตรวจปรับ");

    // ข้อ 2.3 IPO
    function checkIPO(iv, pv, ov, lbl, ik, pk, ok) {
      var s = 0, d = lbl + "[";
      if ((iv||"").toLowerCase().indexOf(ik.toLowerCase()) !== -1) { s++; d += "I✓"; } else d += "I✗";
      if ((pv||"").toLowerCase().indexOf(pk.toLowerCase()) !== -1) { s++; d += "P✓"; } else d += "P✗";
      if ((ov||"").toLowerCase().indexOf(ok.toLowerCase()) !== -1) { s++; d += "O✓]"; } else d += "O✗]";
      return { score: s, detail: d };
    }
    var ipo231 = checkIPO(data.input231, data.process231, data.output231, "2.3.1","bodyweight","calories","calories");
    var ipo232 = checkIPO(data.input232, data.process232, data.output232, "2.3.2","r","circlearea","circlearea");
    var ipo233 = checkIPO(data.input233, data.process233, data.output233, "2.3.3","f","32","c");
    var ipo_score = ipo231.score + ipo232.score + ipo233.score;
    score += ipo_score;
    feedbackLines.push("2.3 IPO: " + ipo_score + "/9 [" + ipo231.detail + " " + ipo232.detail + " " + ipo233.detail + "]");

    // ข้อ 2.3 รูป
    var pic23_auto = 0;
    var p23d = [];
    if (url231 !== "ไม่ได้แนบรูป") { pic23_auto += 5; p23d.push("2.3.1✓"); } else p23d.push("2.3.1✗");
    if (url232 !== "ไม่ได้แนบรูป") { pic23_auto += 5; p23d.push("2.3.2✓"); } else p23d.push("2.3.2✗");
    if (url233 !== "ไม่ได้แนบรูป") { pic23_auto += 5; p23d.push("2.3.3✓"); } else p23d.push("2.3.3✗");
    score += pic23_auto;
    feedbackLines.push("2.3 รูป (เบื้องต้น): " + pic23_auto + "/15 [" + p23d.join(",") + "] — ครูตรวจปรับ");

    // สรุปผล
    var conc_score = (data.conclusion && data.conclusion.trim().length > 10) ? 1 : 0;
    score += conc_score;
    feedbackLines.push("สรุปผล: " + conc_score + "/1");

    var rowData = [
      new Date(), data.studentName||"", data.studentId||"", data.studentGroup||"",
      data.ans211||"", data.ans212||"", data.ans213||"", data.ans214||"", data.ans215||"",
      url221, url222, url223,
      data.input231||"", data.process231||"", data.output231||"", url231,
      data.input232||"", data.process232||"", data.output232||"", url232,
      data.input233||"", data.process233||"", data.output233||"", url233,
      data.conclusion||"",
      score, feedbackLines.join(" | "),
      // คอลัมน์ครู (ว่างไว้ให้ครูกรอก)
      "", "", "", "", "", "", "", "", "", ""
    ];

    sheet.appendRow(rowData);

    return {
      status: "success",
      message: "✅ ส่งใบงานสำเร็จ!\n\nคะแนนเบื้องต้น: " + score + "/45\n" +
               "(ครูจะตรวจรูป Flowchart และปรับคะแนนสุดท้ายอีกครั้ง)\n\n" +
               feedbackLines.join("\n")
    };

  } catch (error) {
    return { status: "error", message: "❌ เกิดข้อผิดพลาด: " + error.toString() };
  }
}

// ============================================================
//  ส่วนที่ 3: ครูดึงรายการงานที่ส่งมา (สำหรับหน้า grader)
// ============================================================
function getSubmissions() {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("Basic Flowchart Submissions");
    if (!sheet) return { status: "empty", rows: [] };

    var data = sheet.getDataRange().getValues();
    if (data.length <= 1) return { status: "empty", rows: [] };

    var headers = data[0];
    var rows = [];
    for (var i = 1; i < data.length; i++) {
      var row = data[i];
      rows.push({
        rowIndex: i + 1,  // 1-based row number in Sheet
        timestamp:    row[0] ? new Date(row[0]).toLocaleString('th-TH') : "",
        studentName:  row[1],
        studentId:    row[2],
        studentGroup: row[3],
        // รูป Flowchart ข้อ 2.2
        img221: row[9],   img222: row[10],  img223: row[11],
        // รูป Flowchart ข้อ 2.3
        img231: row[15],  img232: row[19],  img233: row[23],
        // คะแนนอัตโนมัติ
        autoScore: row[25],
        autoDetail: row[26],
        // คะแนนครู (คอลัมน์ 27–36 → index 27–36)
        t221: row[27], t222: row[28], t223: row[29],
        t231: row[30], t232: row[31], t233: row[32],
        teacherNote:  row[33],
        finalScore:   row[34],
        gradedBy:     row[35],
        gradedAt:     row[36] ? new Date(row[36]).toLocaleString('th-TH') : ""
      });
    }

    return { status: "ok", rows: rows };
  } catch (err) {
    return { status: "error", message: err.toString() };
  }
}

// ============================================================
//  ส่วนที่ 4: ครูบันทึกคะแนน Flowchart ลง Sheet
// ============================================================
function saveTeacherScore(data) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("Basic Flowchart Submissions");
    if (!sheet) return { status: "error", message: "ไม่พบ Sheet" };

    var rowIndex = parseInt(data.rowIndex);
    if (!rowIndex || rowIndex < 2) return { status: "error", message: "rowIndex ไม่ถูกต้อง" };

    // คำนวณคะแนนรวมสุดท้าย
    var t221 = parseFloat(data.t221) || 0;
    var t222 = parseFloat(data.t222) || 0;
    var t223 = parseFloat(data.t223) || 0;
    var t231 = parseFloat(data.t231) || 0;
    var t232 = parseFloat(data.t232) || 0;
    var t233 = parseFloat(data.t233) || 0;
    var teacherFlowchartScore = t221 + t222 + t223 + t231 + t232 + t233;

    // คะแนนอัตโนมัติ (ส่วนที่ไม่ใช่รูป Flowchart)
    var autoRow = sheet.getRange(rowIndex, 26).getValue(); // col Z = คะแนนอัตโนมัติ
    var autoNonPic = parseFloat(autoRow) || 0;

    // คำนวณคะแนนอัตโนมัติส่วนที่ไม่ใช่รูป (หักส่วนรูปออก)
    // autoScore = sym_score + pic22_auto + ipo_score + pic23_auto + conc_score
    // ส่วนรูปเบื้องต้น = pic22_auto + pic23_auto (max 30)
    // เราแทนที่ด้วยคะแนนครู
    // แต่เพื่อง่าย: finalScore = autoNonPic (ส่วนที่ไม่ใช่รูป) + teacherFlowchartScore
    // ส่วนที่ไม่ใช่รูป = sym_score + ipo_score + conc_score = max 15
    // ดึงจาก autoDetail
    var autoDetailCell = sheet.getRange(rowIndex, 27).getValue();
    // parse sym_score + ipo_score + conc_score จาก detail
    var nonPicScore = 0;
    var symMatch = autoDetailCell.match(/สัญลักษณ์: (\d+)/);
    if (symMatch) nonPicScore += parseInt(symMatch[1]);
    var ipoMatch = autoDetailCell.match(/IPO: (\d+)/);
    if (ipoMatch) nonPicScore += parseInt(ipoMatch[1]);
    var concMatch = autoDetailCell.match(/สรุปผล: (\d+)/);
    if (concMatch) nonPicScore += parseInt(concMatch[1]);

    var finalScore = nonPicScore + teacherFlowchartScore;

    // บันทึกลง Sheet (คอลัมน์ AB–AJ = col 28–37)
    sheet.getRange(rowIndex, 28).setValue(t221);
    sheet.getRange(rowIndex, 29).setValue(t222);
    sheet.getRange(rowIndex, 30).setValue(t223);
    sheet.getRange(rowIndex, 31).setValue(t231);
    sheet.getRange(rowIndex, 32).setValue(t232);
    sheet.getRange(rowIndex, 33).setValue(t233);
    sheet.getRange(rowIndex, 34).setValue(data.teacherNote || "");
    sheet.getRange(rowIndex, 35).setValue(finalScore);
    sheet.getRange(rowIndex, 36).setValue(data.gradedBy || "ครู");
    sheet.getRange(rowIndex, 37).setValue(new Date());

    // Highlight แถวที่ตรวจแล้ว
    sheet.getRange(rowIndex, 1, 1, sheet.getLastColumn()).setBackground("#f0fdf4");

    return {
      status: "success",
      finalScore: finalScore,
      message: "✅ บันทึกคะแนนสำเร็จ!\nคะแนนรวม: " + finalScore + " คะแนน\n(2.1+IPO+สรุป: " + nonPicScore + " | Flowchart ครูตรวจ: " + teacherFlowchartScore + ")"
    };

  } catch (err) {
    return { status: "error", message: "บันทึกไม่ได้: " + err.toString() };
  }
}
