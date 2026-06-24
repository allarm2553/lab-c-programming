/**
 * Web App for Lab 5: Functions & Scope
 * Designed by Antigravity AI
 */

function doGet(e) {
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setTitle('Lab 5: ฟังก์ชันและการขอบเขตตัวแปร (Functions & Scope)')
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
    var sheetName = "Lab C 5 Submissions";
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
    var folderName = "Lab C 5 Attachments";
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
    var codeKeywords = ["factorial","n","factorialIterative","factorialRecursive"];
    var q1Keywords = ["value","reference","copy","address","ตัวแปรเดิม"];
    var q2Keywords = ["base case","กรณีฐาน","ล้น","infinite","stack overflow"];
    
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
