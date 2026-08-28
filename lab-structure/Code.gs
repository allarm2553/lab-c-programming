/**
 * Web App for Lab Basic: C Program Structure & Flow
 * Designed by Antigravity AI
 */

function doGet(e) {
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setTitle('Lab Basic: โครงสร้างและการทำงานของโปรแกรมภาษา C')
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
    var sheetName = "Lab C Structure Submissions";
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
    var folderName = "Lab C Structure Attachments";
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
    var codeKeywords = ["include","stdio.h","int main()","showInfo","printf","return 0"];
    var q1Keywords = ["preprocessor","include","ห้องสมุด","ฟังก์ชันสำเร็จรูป","error","warning"];
    var q2Keywords = ["compiling","linking","assembly","object","exe"];
    
    var score = 0;
    var feedback = [];
    
    // Check Fill-in-the-Blanks (Max 2 pts)
    var blankCorrectCount = 0;
    
    var b1 = (data.blank1 || "").toString().trim();
    var isB1Correct = ["#include <stdio.h>","#include<stdio.h>"].indexOf(b1) !== -1;
    if (isB1Correct) blankCorrectCount++;
    

    var b2 = (data.blank2 || "").toString().trim();
    var isB2Correct = ["int main()","int main(void)","int main( void )"].indexOf(b2) !== -1;
    if (isB2Correct) blankCorrectCount++;
    

    var b3 = (data.blank3 || "").toString().trim();
    var isB3Correct = [";"].indexOf(b3) !== -1;
    if (isB3Correct) blankCorrectCount++;
    

    var b4 = (data.blank4 || "").toString().trim();
    var isB4Correct = ["return 0;","return 0 ;","return(0);"].indexOf(b4) !== -1;
    if (isB4Correct) blankCorrectCount++;
    
    var totalBlanks = 4;
    var blankScore = totalBlanks > 0 ? Math.round((blankCorrectCount / totalBlanks) * 2 * 10) / 10 : 2;
    score += blankScore;
    feedback.push("เติมคำตอบตัวอย่างที่ 2: " + blankScore + "/2 (" + blankCorrectCount + "/" + totalBlanks + " ช่อง)");
    
    var blanksSummary = "1:" + b1 + ", " + "2:" + b2 + ", " + "3:" + b3 + ", " + "4:" + b4;

    
    // Check Challenge Blanks (Max 4 pts)
    var chBlankCorrectCount = 0;
    
    var ch_b1 = (data.ch_blank1 || "").toString().trim();
    var isChB1Correct = ["#include <stdio.h>","#include<stdio.h>"].indexOf(ch_b1) !== -1;
    if (isChB1Correct) chBlankCorrectCount++;
      

    var ch_b2 = (data.ch_blank2 || "").toString().trim();
    var isChB2Correct = ["void showInfo()","void showInfo(void)","void showInfo( void )"].indexOf(ch_b2) !== -1;
    if (isChB2Correct) chBlankCorrectCount++;
      

    var ch_b3 = (data.ch_blank3 || "").toString().trim();
    var isChB3Correct = ["int main()","int main(void)","int main( void )"].indexOf(ch_b3) !== -1;
    if (isChB3Correct) chBlankCorrectCount++;
      

    var ch_b4 = (data.ch_blank4 || "").toString().trim();
    var isChB4Correct = ["printf"].indexOf(ch_b4) !== -1;
    if (isChB4Correct) chBlankCorrectCount++;
      

    var ch_b5 = (data.ch_blank5 || "").toString().trim();
    var isChB5Correct = ["return 0;","return 0 ;","return(0);"].indexOf(ch_b5) !== -1;
    if (isChB5Correct) chBlankCorrectCount++;
      
    var totalChBlanks = 5;
    var codeScore = totalChBlanks > 0 ? Math.round((chBlankCorrectCount / totalChBlanks) * 4 * 10) / 10 : 4;
    score += codeScore;
    feedback.push("Challenge Blanks: " + codeScore + "/4 (" + chBlankCorrectCount + "/" + totalChBlanks + " ช่อง)");
    
    
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
