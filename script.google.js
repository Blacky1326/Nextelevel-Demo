function doPost(e) {
  try {
    // Open the Google Sheet by its ID
    const sheet = SpreadsheetApp.openById("1Zx51WFIAprs00YtCm6wfuIUgY7uwRtlPx17UVObC124").getActiveSheet();

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

function doGet(e) {
  try {
    // Open the Google Sheet by its ID
    const sheet = SpreadsheetApp.openById("1Zx51WFIAprs00YtCm6wfuIUgY7uwRtlPx17UVObC124").getActiveSheet();

    // Get all data from the sheet
    const data = sheet.getDataRange().getValues();

    // Convert the data to JSON format
    const users = data.slice(1).map(row => ({
      timestamp: row[0],
      username: row[1],
      rank: row[2],
    }));

    // Return the data as JSON
    return ContentService.createTextOutput(
      JSON.stringify({ status: "success", users: users })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    // Handle errors and return a failure response
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", message: error.message })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doDelete(e) {
  try {
    // Open the Google Sheet by its ID
    const sheet = SpreadsheetApp.openById("1Zx51WFIAprs00YtCm6wfuIUgY7uwRtlPx17UVObC124").getActiveSheet();

    // Clear all rows except the header
    sheet.deleteRows(2, sheet.getLastRow() - 1);

    // Return a success response
    return ContentService.createTextOutput(
      JSON.stringify({ status: "success", message: "All users deleted successfully" })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    // Handle errors and return a failure response
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", message: error.message })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}