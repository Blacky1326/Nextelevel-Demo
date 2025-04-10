const SHEET_ID = "1Zx51WFIAprs00YtCm6wfuIUgY7uwRtlPx17UVObC124"; // Ersetze durch die ID deines Google Sheets
const SHEET_NAME = "Fragpunk Anmeldung"; // Ersetze durch den Namen des Tabs in deinem Google Sheet

function doGet() {
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    if (!sheet) {
      throw new Error(`Sheet mit dem Namen "${SHEET_NAME}" wurde nicht gefunden.`);
    }

    const rows = sheet.getDataRange().getValues();
    const data = rows.slice(1).map((row, index) => ({
      id: index + 1,
      username: row[0],
      rank: row[1],
    }));

    return ContentService.createTextOutput(JSON.stringify(data))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, message: error.message })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    if (!sheet) {
      throw new Error(`Sheet mit dem Namen "${SHEET_NAME}" wurde nicht gefunden.`);
    }

    const data = JSON.parse(e.postData.contents);

    if (data.action === "add") {
      sheet.appendRow([data.username, data.rank]);
      return ContentService.createTextOutput(
        JSON.stringify({ success: true, message: "Benutzer hinzugefügt." })
      ).setMimeType(ContentService.MimeType.JSON);
    } else if (data.action === "delete") {
      const rowIndex = Number(data.id) + 1; // +1 wegen der Kopfzeile
      const username = sheet.getRange(rowIndex, 1).getValue(); // Benutzername aus der ersten Spalte
      sheet.deleteRow(rowIndex);
      return ContentService.createTextOutput(
        JSON.stringify({ success: true, message: "Benutzer gelöscht.", username: username })
      ).setMimeType(ContentService.MimeType.JSON);
    } else if (data.action === "deleteAll") {
      const lastRow = sheet.getLastRow();
      if (lastRow > 1) {
        sheet.deleteRows(2, lastRow - 1); // Alle Zeilen außer der Kopfzeile löschen
      }
      return ContentService.createTextOutput(
        JSON.stringify({ success: true, message: "Alle Benutzer wurden gelöscht." })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    return ContentService.createTextOutput(
      JSON.stringify({ success: false, message: "Ungültige Aktion." })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, message: error.message })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}