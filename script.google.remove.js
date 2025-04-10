function doPost(e) {
  try {
    const sheet = SpreadsheetApp.openById("1Zx51WFIAprs00YtCm6wfuIUgY7uwRtlPx17UVObC124").getActiveSheet();
    const username = e.parameter.username;
    const rank = e.parameter.rank;

    sheet.appendRow([new Date(), username, rank]);

    return ContentService.createTextOutput(
      JSON.stringify({ status: "success", message: "Data saved successfully" })
    )
      .setMimeType(ContentService.MimeType.JSON)
      .setContent("")
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", message: error.message })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  try {
    const sheet = SpreadsheetApp.openById("1Zx51WFIAprs00YtCm6wfuIUgY7uwRtlPx17UVObC124").getActiveSheet();
    const data = sheet.getDataRange().getValues();

    const users = data.slice(1).map(row => ({
      timestamp: row[0],
      username: row[1],
      rank: row[2],
    }));

    return ContentService.createTextOutput(
      JSON.stringify({ status: "success", users: users })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", message: error.message })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doDelete(e) {
  try {
    const sheet = SpreadsheetApp.openById("1Zx51WFIAprs00YtCm6wfuIUgY7uwRtlPx17UVObC124").getActiveSheet();
    const index = parseInt(e.parameter.index, 10);

    if (!isNaN(index) && index > 0) {
      sheet.deleteRow(index + 1); // +1 wegen der Kopfzeile
    } else {
      throw new Error("Ungültiger Index");
    }

    const response = {
      status: "success",
      message: "Benutzer gelöscht",
    };

    return ContentService.createTextOutput(JSON.stringify(response))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    const response = {
      status: "error",
      message: error.message,
    };

    return ContentService.createTextOutput(JSON.stringify(response))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doOptions(e) {
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.JSON);
}