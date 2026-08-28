/**
 * Web App for Lab 9: File Handling I/O
 * Designed by Antigravity AI
 */

function doGet(e) {
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setTitle('Lab 9: การจัดการไฟล์ข้อมูล')
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
    var sheetName = "Lab C 9 Submissions";
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
            message: "⚠️ รหัสนักศึกษา " + data.studentId + " ได้ส่งใบงานนี้ไปแล้วเมื่อ " + prevTime + "
ระบบอนุญาตให้ส่งได้เพียง 1 ครั้งเท่านั้น (หากต้องการส่งใหม่ กรุณาติดต่ออาจารย์ผู้สอน)"
          };
        }
      }
    }
    
    // 2. Handle File Uploads (Drive Storage)
    var screenshotUrl = "ไม่ได้แนบไฟล์";
    var codeFileUrl = "ไม่ได้แนบไฟล์";
    
    // Auto-create folders for uploads
    var folderName = "Lab C 9 Attachments";
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
        data.studentId + "_" + data.studentName.replace(/\s+/g, '_') + "_screenshot_" + data.screenshotName
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
        data.studentId + "_" + data.studentName.replace(/\s+/g, '_') + "_code_" + data.codeFileName
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
    var codeKeywords = ["fopen","fclose","fprintf|fputs","fgets|fscanf","FILE","\"w\"","\"r\""];
    var q1Keywords = ["text","binary","ตัวอักษร","ไบนารี","มนุษย์อ่าน"];
    var q2Keywords = ["null","สำเร็จ","แครช","ความปลอดภัย"];
    
    var score = 0;
    var feedback = [];
    
    // Check Fill-in-the-Blanks (Max 2 pts)
    var blankCorrectCount = 0;
    
    var b1 = (data.blank1 || "").toString().trim();
    var isB1Correct = ["\"r\"","'r'","r"].indexOf(b1) !== -1;
    if (isB1Correct) blankCorrectCount++;
    

    var b2 = (data.blank2 || "").toString().trim();
    var isB2Correct = ["NULL","0"].indexOf(b2) !== -1;
    if (isB2Correct) blankCorrectCount++;
    
    var totalBlanks = 2;
    var blankScore = totalBlanks > 0 ? Math.round((blankCorrectCount / totalBlanks) * 2 * 10) / 10 : 2;
    score += blankScore;
    feedback.push("เติมคำตอบตัวอย่างที่ 2: " + blankScore + "/2 (" + blankCorrectCount + "/" + totalBlanks + " ช่อง)");
    
    var blanksSummary = "1:" + b1 + ", " + "2:" + b2;

    
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
      message: "บันทึกข้อมูลใบงานสำเร็จแล้ว! ข้อมูลของท่านถูกส่งไปที่ Google Sheet เรียบร้อย (คะแนนรวมประเมินออโต้: " + score + "/10)\n\nรายละเอียดคะแนน:\n- " + feedback.join("\n- ")
    };
    
  } catch (error) {
    return {
      status: "error",
      message: "เกิดข้อผิดพลาดในการบันทึกข้อมูล: " + error.toString()
    };
  }
}
