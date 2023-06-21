function getData(i) {
  var sheet = SpreadsheetApp.getActive().getSheetByName("sheet1");
  var data = sheet.getRange(2, 1, 121, 25).getValues();
  var stocks = [];
  var stock = {};
  stock.name = data[i][3];
  stock.link = "" + data[i][18] + "";
  stocks.push(stock);
  return stocks;
}


function getEmailHtml(stockData) {
  var htmlTemplate = HtmlService.createTemplateFromFile("template.html");
  htmlTemplate.stockData = stockData;
  var htmlBody = htmlTemplate.evaluate().getContent();
  return htmlBody;
}


function sendEmail() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var startRow = 2;
  var numRows = 120;
  var dataRange = sheet.getRange(startRow, 1, numRows, 25)
  var data = dataRange.getValues();

  var count = 0;

  for (i in data) {
    var row = data[i];
    var emailAddress = row[10];

    var stockData = getData(i);
    var htmlBody = getEmailHtml(stockData);

    // MailApp.sendEmail({
    //   to: emailAddress,
    //   subject: "[SGUET] Chúc mừng bạn đã nhận được tấm vé tham gia BIGGAME 2022!!!",
    //   htmlBody: htmlBody
    // });


    ++count;
    Logger.log(count);
    Logger.log(stockData[0].name);
    Logger.log(stockData[0].link);
    Logger.log("Gửi email thành công đến" + JSON.stringify(emailAddress));
  }
}
