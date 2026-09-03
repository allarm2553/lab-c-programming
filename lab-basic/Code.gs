/**
 * Web App for Lab Basic: Hello World
 * Designed by Antigravity AI
 */

function doGet(e) {
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setTitle('Lab Basic: การติดตั้งเครื่องมือและการเขียนโปรแกรมภาษา C แรก')
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
    var sheetName = "Lab C Basic Submissions";
    var sheet = ss.getSheetByName(sheetName);
    
    // Auto-create sheet if it doesn't exist
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      var headers = [
        "Timestamp", "ชื่อ-นามสกุล", "รหัสนักศึกษา", "กลุ่ม/ห้อง", "วันที่ทำการทดลอง",
        "เติมคำตอบตัวอย่างที่ 2 (Blanks)",
        "แบบทดสอบ 5 ข้อ (Quiz)",
        "โค้ดโปรแกรม Hello World", 
        "คำถามข้อที่ 1 (คอมไพเลอร์ทำหน้าที่อะไร)", "คำถามข้อที่ 2 (หน้าที่ของฟังก์ชัน main)",
        "ลิงก์ไฟล์รูปภาพผลการทดลอง", "ลิงก์ไฟล์โค้ด (.c)", "สรุปผลการทดลอง",
        "คะแนนแบบทดสอบ (เต็ม 5)",
        "คะแนนรวม (เต็ม 15)", "ข้อเสนอแนะระบบตรวจออโต้"
      ];
      sheet.appendRow(headers);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#e2e8f0");
      sheet.setFrozenRows(1);
    }
    
    // 2. Handle File Uploads (Drive Storage)
    var screenshotUrl = "ไม่ได้แนบไฟล์";
    var codeFileUrl = "ไม่ได้แนบไฟล์";
    
    // Auto-create/get a single shared folder inside the active spreadsheet's parent folder
    var folder;
    var sharedFolderName = "C_Programming_Lab_Attachments";
    try {
      var ssFile = DriveApp.getFileById(ss.getId());
      var parents = ssFile.getParents();
      var parentFolder = parents.hasNext() ? parents.next() : DriveApp.getRootFolder();
      
      var folders = parentFolder.getFoldersByName(sharedFolderName);
      if (folders.hasNext()) {
        folder = folders.next();
      } else {
        folder = parentFolder.createFolder(sharedFolderName);
      }
    } catch (err) {
      // Fallback to Google Drive root if parent access is restricted
      var folders = DriveApp.getFoldersByName(sharedFolderName);
      if (folders.hasNext()) {
        folder = folders.next();
      } else {
        folder = DriveApp.createFolder(sharedFolderName);
      }
    }
    
    // Process screenshot
    if (data.screenshotBase64 && data.screenshotName) {
      var screenshotBlob = Utilities.newBlob(
        Utilities.base64Decode(data.screenshotBase64.split(",")[1]),
        data.screenshotType,
        "lab-basic_" + data.studentId + "_" + data.studentName.replace(/\s+/g, '_') + "_screenshot_" + data.screenshotName
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
        "lab-basic_" + data.studentId + "_" + data.studentName.replace(/\s+/g, '_') + "_code_" + data.codeFileName
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
    var codeKeywords = ["printf", "\\\\n", "\\\\t"];
    var q1Keywords = ["แปล", "คอมไพล์", "ภาษาเครื่อง", "compiler", "แปลภาษา"];
    var q2Keywords = ["เริ่มต้น", "หลัก", "main", "จุดแรก", "จุดเริ่มต้น"];
    
    var score = 0;
    var feedback = [];
    
    // Check Fill-in-the-Blanks (Max 2 pts)
    var b1 = (data.blank1 || "").toString().trim();
    var b2 = (data.blank2 || "").toString().trim();
    var b3 = (data.blank3 || "").toString().trim();
    var b4 = (data.blank4 || "").toString().trim();
    
    var isB1Correct = (b1 === "\\n" || b1 === "\n");
    var isB2Correct = (b2 === "\\n" || b2 === "\n");
    var isB3Correct = (b3 === "\\t" || b3 === "\t");
    var isB4Correct = (b4 === "\\t" || b4 === "\t");
    
    var blankCorrectCount = 0;
    if (isB1Correct) blankCorrectCount++;
    if (isB2Correct) blankCorrectCount++;
    if (isB3Correct) blankCorrectCount++;
    if (isB4Correct) blankCorrectCount++;
    
    var blankScore = Math.round(blankCorrectCount * 0.5 * 10) / 10;
    score += blankScore;
    feedback.push("เติมคำตอบ Escape Characters: " + blankScore + "/2 (" + blankCorrectCount + "/4 ช่อง)");
    
    var blanksSummary = "1:" + b1 + ", 2:" + b2 + ", 3:" + b3 + ", 4:" + b4;

    
    // 2. Check Multiple Choice Quiz (Max 5 pts)
    var quizKey = {"quiz_q1":"B","quiz_q2":"B","quiz_q3":"C","quiz_q4":"B","quiz_q5":"C"};
    var quizCorrectCount = 0;
    var q1Ans = (data.quiz1 || "").toString().trim().toUpperCase();
    var q2Ans = (data.quiz2 || "").toString().trim().toUpperCase();
    var q3Ans = (data.quiz3 || "").toString().trim().toUpperCase();
    var q4Ans = (data.quiz4 || "").toString().trim().toUpperCase();
    var q5Ans = (data.quiz5 || "").toString().trim().toUpperCase();

    if (q1Ans === quizKey.quiz_q1) quizCorrectCount++;
    if (q2Ans === quizKey.quiz_q2) quizCorrectCount++;
    if (q3Ans === quizKey.quiz_q3) quizCorrectCount++;
    if (q4Ans === quizKey.quiz_q4) quizCorrectCount++;
    if (q5Ans === quizKey.quiz_q5) quizCorrectCount++;

    var quizScore = quizCorrectCount * 1.0;
    score += quizScore;
    feedback.push("แบบทดสอบปรนัย: " + quizScore + "/5 (ตอบถูก " + quizCorrectCount + "/5 ข้อ)");

    var quizSummary = "1:" + (q1Ans || "-") + (q1Ans === quizKey.quiz_q1 ? "(✓)" : "(✗)") + ", " +
                      "2:" + (q2Ans || "-") + (q2Ans === quizKey.quiz_q2 ? "(✓)" : "(✗)") + ", " +
                      "3:" + (q3Ans || "-") + (q3Ans === quizKey.quiz_q3 ? "(✓)" : "(✗)") + ", " +
                      "4:" + (q4Ans || "-") + (q4Ans === quizKey.quiz_q4 ? "(✓)" : "(✗)") + ", " +
                      "5:" + (q5Ans || "-") + (q5Ans === quizKey.quiz_q5 ? "(✓)" : "(✗)");
  

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
      quizSummary,
      data.challengeCode, // Code entered
      data.question1,
      data.question2,
      screenshotUrl,
      codeFileUrl,
      data.conclusion,
      quizScore,
      score,
      feedback.join(", ")
    ];
    
    sheet.appendRow(rowData);
    
    return {
      status: "success",
      message: "บันทึกข้อมูลใบงานสำเร็จแล้ว! ข้อมูลของท่านถูกส่งไปที่ Google Sheet เรียบร้อย (คะแนนรวมประเมินออโต้: " + score + "/15)\n\nรายละเอียดคะแนน:\n- " + feedback.join("\n- ")
    };
    
  } catch (error) {
    return {
      status: "error",
      message: "เกิดข้อผิดพลาดในการบันทึกข้อมูล: " + error.toString()
    };
  }
}
