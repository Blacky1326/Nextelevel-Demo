function doPost(e) {
  try {
    // Open the Google Sheet by its ID
    const sheet = SpreadsheetApp.openById("YOUR_SHEET_ID").getActiveSheet();

    // Extract form data
    const username = e.parameter.username;
    const rank = e.parameter.rank;

    // Append the data to the sheet
    sheet.appendRow([new Date(), username, rank]);

    // Return a success response
    return ContentService.createTextOutput(
      JSON.stringify({ status: "success", message: "Data saved successfully" })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    // Handle errors and return a failure response
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", message: error.message })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}