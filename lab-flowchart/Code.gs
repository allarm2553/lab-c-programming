/**
 * Google Apps Script — Basic Flowchart Lab (Upgraded 10.0 pts Edition)
 * รองรับการส่งงานนักเรียน, Auto-grading 5 ส่วน, แนบรูปขึ้น Google Drive และบันทึกลง Google Sheets
 */

// ============================================================
//  ส่วนที่ 1: Routing — แยกหน้านักเรียน / หน้าครู
// ============================================================
function doGet(e) {
  var page = e && e.parameter && e.parameter.page;

  if (page === 'grader') {
    return HtmlService.createTemplateFromFile('grader')
      .evaluate()
      .setTitle('ตรวจใบงาน Basic Flowchart — ครู')
      .addMetaTag('viewport', 'width=device-width, initial-scale=1')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  }

  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setTitle('ใบงาน Basic Flowchart: การออกแบบผังงานและการจำลองตรรกะ')
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
//  ส่วนที่ 2: นักเรียนส่งงาน (10.0 คะแนนเต็ม)
// ============================================================
function submitLabData(data) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheetName = "Flowchart Lab Submissions";
    var sheet = ss.getSheetByName(sheetName);

    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      var headers = [
        "Timestamp", "ชื่อ-นามสกุล", "รหัสประจำตัว", "ชั้น/ห้อง",
        // ตอนที่ 1: มาตรฐาน (1.5 คะแนน)
        "1.1 I/O สี่เหลี่ยมด้านขนาน", "1.2 ข้อความกำกับ Decision", "1.3 ทิศทาง Flow Line",
        // ตอนที่ 2: Trace Table (2.5 คะแนน)
        "2.1 Loop R1 (T/sum1)", "2.2 Loop R2 (T/sum3)", "2.3 Loop R3 (T/sum6)", "2.4 Loop R4 (T/sum10)", "2.5 Loop R5 (F/count5)", "2.6 Trace Output",
        // ตอนที่ 3: Debugging (2.0 คะแนน)
        "3.1 อธิบายจุดผิดที่ 1 (สัญลักษณ์)", "3.2 อธิบายจุดผิดที่ 2 (ตรรกะเงื่อนไข)",
        // ตอนที่ 4: Challenge BMI (3.0 คะแนน)
        "4.1 IPO Model (I/P/O)", "4.2 รูปผังงาน BMI (Google Drive Link)", "4.3 โค้ดภาษา C",
        // ตอนที่ 5: สรุปผล (1.0 คะแนน)
        "สรุปผลการทดลอง",
        // สรุปคะแนนอัตโนมัติ (10.0 คะแนน)
        "คะแนนอัตโนมัติ (เต็ม 10.0)", "รายละเอียดคะแนน",
        // ═══ คอลัมน์ครูตรวจ ═══
        "★ คะแนนครู ตอนที่ 3 (เต็ม 2.0)", "★ คะแนนครู ตอนที่ 4 ผังงาน (เต็ม 1.0)", "★ คะแนนครู ตอนที่ 4 โค้ด C (เต็ม 1.5)",
        "★ หมายเหตุครู", "★ คะแนนรวมสุดท้าย", "★ ตรวจแล้วโดย", "★ วันที่ตรวจ"
      ];
      sheet.appendRow(headers);
      sheet.getRange(1, 1, 1, 20).setFontWeight("bold").setBackground("#dbeafe");
      sheet.getRange(1, 21, 1, 7).setFontWeight("bold").setBackground("#fef9c3");
      sheet.setFrozenRows(1);
    }

    // 1. อัปโหลดรูปภาพผังงาน BMI ขึ้น Google Drive
    var folderName = "Flowchart Lab Attachments";
    var folders = DriveApp.getFoldersByName(folderName);
    var folder = folders.hasNext() ? folders.next() : DriveApp.createFolder(folderName);

    function uploadImage(base64, fileName, mimeType, label) {
      if (!base64 || !fileName) return "ไม่ได้แนบรูป";
      var prefix = data.studentId + "_" + (data.studentName || "").replace(/\s+/g, '_') + "_" + label + "_";
      var blob = Utilities.newBlob(
        Utilities.base64Decode(base64.split(",")[1]), mimeType, prefix + fileName
      );
      var file = folder.createFile(blob);
      try {
        file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      } catch (e) {
        try {
          file.setSharing(DriveApp.Access.DOMAIN_WITH_LINK, DriveApp.Permission.VIEW);
        } catch (e2) {}
      }
      return file.getUrl();
    }

    var bmiFlowchartUrl = uploadImage(data.flowchartBmiBase64, data.flowchartBmiName, data.flowchartBmiType, "BMI_Flowchart");

    // 2. คำนวณคะแนนอัตโนมัติ (Auto-Grading)
    var feedbackLines = [];

    // ตอนที่ 1: มาตรฐานและกฎ (1.5 คะแนน)
    var part1Answers = [
      { field: data.ans11, correct: ["input", "output", "รับ", "แสดง", "ข้อมูล", "i/o"], label: "1.1" },
      { field: data.ans12, correct: ["true", "false", "yes", "no", "จริง", "เท็จ", "ใช่", "ไม่ใช่"], label: "1.2" },
      { field: data.ans13, correct: ["บน", "ล่าง", "ซ้าย", "ขวา", "top", "bottom", "left", "right"], label: "1.3" }
    ];
    var p1Score = 0;
    part1Answers.forEach(function(item) {
      var ans = (item.field || "").toLowerCase().trim();
      if (item.correct.some(function(kw) { return ans.indexOf(kw.toLowerCase()) !== -1; })) {
        p1Score += 0.5;
      }
    });
    feedbackLines.push("ตอนที่ 1 (มาตรฐาน): " + p1Score.toFixed(1) + "/1.5");

    // ตอนที่ 2: Trace Table (2.5 คะแนน)
    var traceAnswers = [
      { field: data.tr_c1, correct: ["t", "true", "จริง", "yes"] },
      { field: data.tr_s1, correct: ["1"] },
      { field: data.tr_c2, correct: ["t", "true", "จริง", "yes"] },
      { field: data.tr_s2, correct: ["3"] },
      { field: data.tr_c3, correct: ["t", "true", "จริง", "yes"] },
      { field: data.tr_s3, correct: ["6"] },
      { field: data.tr_c4, correct: ["t", "true", "จริง", "yes"] },
      { field: data.tr_s4, correct: ["10"] },
      { field: data.tr_c5, correct: ["f", "false", "เท็จ", "no"] },
      { field: data.tr_count5, correct: ["5"] },
      { field: data.traceOutput, correct: ["10"] }
    ];
    var p2Correct = 0;
    traceAnswers.forEach(function(item) {
      var val = (item.field || "").toLowerCase().trim();
      if (item.correct.some(function(v) { return val === v || val.indexOf(v) !== -1; })) {
        p2Correct++;
      }
    });
    var p2Score = Number(((p2Correct / traceAnswers.length) * 2.5).toFixed(1));
    feedbackLines.push("ตอนที่ 2 (Trace Table): " + p2Score.toFixed(1) + "/2.5 (" + p2Correct + "/" + traceAnswers.length + " ช่อง)");

    // ตอนที่ 3: Debugging (2.0 คะแนน)
    var b1 = (data.bug1Desc || "").toLowerCase().trim();
    var b2 = (data.bug2Desc || "").toLowerCase().trim();
    var b1Match = ["process", "input", "สี่เหลี่ยม", "ด้านขนาน", "ผืนผ้า", "รับค่า"].some(function(kw) { return b1.indexOf(kw) !== -1; });
    var b2Match = ["true", "false", "สลับ", "yes", "no", "pass", "fail", "ตรงข้าม"].some(function(kw) { return b2.indexOf(kw) !== -1; });
    var p3Score = 0;
    if (b1Match && b1.length > 5) p3Score += 1.0;
    if (b2Match && b2.length > 5) p3Score += 1.0;
    feedbackLines.push("ตอนที่ 3 (Debugging): " + p3Score.toFixed(1) + "/2.0");

    // ตอนที่ 4: Challenge BMI (3.0 คะแนน)
    var ipoIn = (data.ipoInput || "").toLowerCase();
    var ipoP = (data.ipoProcess || "").toLowerCase();
    var ipoOut = (data.ipoOutput || "").toLowerCase();
    var ipoScore = 0;
    if (ipoIn.indexOf("weight") !== -1 || ipoIn.indexOf("height") !== -1 || ipoIn.indexOf("น้ำหนัก") !== -1) ipoScore += 0.2;
    if (ipoP.indexOf("bmi") !== -1 || ipoP.indexOf("/") !== -1 || ipoP.indexOf("*") !== -1) ipoScore += 0.2;
    if (ipoOut.indexOf("bmi") !== -1 || ipoOut.indexOf("overweight") !== -1 || ipoOut.indexOf("normal") !== -1) ipoScore += 0.1;
    ipoScore = Number(ipoScore.toFixed(1));

    var hasFlowchartImg = (bmiFlowchartUrl !== "ไม่ได้แนบรูป") ? 1.0 : 0.0;

    var cCode = (data.cCodeArea || "");
    var cKeywords = ["printf", "scanf", "if", "else", "bmi"];
    var cMatches = 0;
    cKeywords.forEach(function(kw) {
      if (new RegExp(kw, 'i').test(cCode)) cMatches++;
    });
    var cCodeScore = Number(((cMatches / cKeywords.length) * 1.5).toFixed(1));
    var p4Total = Number((ipoScore + hasFlowchartImg + cCodeScore).toFixed(1));
    feedbackLines.push("ตอนที่ 4 (Challenge): " + p4Total.toFixed(1) + "/3.0 [IPO:" + ipoScore + ", รูป:" + hasFlowchartImg + ", C-Code:" + cCodeScore + "]");

    // ตอนที่ 5: สรุปผล (1.0 คะแนน)
    var conc = (data.conclusion || "").trim();
    var p5Score = conc.length > 10 ? 1.0 : 0.0;
    feedbackLines.push("ตอนที่ 5 (สรุปผล): " + p5Score.toFixed(1) + "/1.0");

    var totalScore = Number((p1Score + p2Score + p3Score + p4Total + p5Score).toFixed(1));

    // บันทึกลงแถวของ Sheet
    var rowData = [
      new Date(),
      data.studentName,
      data.studentId,
      data.studentGroup,
      // 1
      data.ans11, data.ans12, data.ans13,
      // 2
      "R1: " + data.tr_c1 + " | " + data.tr_s1,
      "R2: " + data.tr_c2 + " | " + data.tr_s2,
      "R3: " + data.tr_c3 + " | " + data.tr_s3,
      "R4: " + data.tr_c4 + " | " + data.tr_s4,
      "R5: " + data.tr_c5 + " | " + data.tr_count5,
      data.traceOutput,
      // 3
      data.bug1Desc, data.bug2Desc,
      // 4
      "I: " + data.ipoInput + " | P: " + data.ipoProcess + " | O: " + data.ipoOutput,
      bmiFlowchartUrl,
      data.cCodeArea,
      // 5
      data.conclusion,
      // Total & feedback
      totalScore,
      feedbackLines.join(" | ")
    ];

    sheet.appendRow(rowData);

    return {
      status: "success",
      score: totalScore,
      feedback: feedbackLines.join("\n"),
      message: "บันทึกรายงานผลการทดลอง Flowchart สำเร็จ! คะแนนประเมินเบื้องต้น: " + totalScore + " / 10.0 คะแนน"
    };

  } catch (error) {
    return {
      status: "error",
      message: "เกิดข้อผิดพลาดในการบันทึกข้อมูล: " + error.toString()
    };
  }
}
