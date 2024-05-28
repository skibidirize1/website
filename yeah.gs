function doPost(e) {
    if (!e) {
        return ContentService.createTextOutput("No POST data received");
    }
    var data = e.parameter.message;
    if (!data) {
        return ContentService.createTextOutput("No 'message' parameter provided");
    }
  
    GmailApp.sendEmail("718604@salemkeizer.org","Hola" , data);
    return ContentService.createTextOutput("Email sent successfully!");
}
