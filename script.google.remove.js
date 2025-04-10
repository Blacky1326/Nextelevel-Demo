function doPost(e) {
  try {
    const action = e.parameter.action;

    if (action === "deleteUser") {
      return deleteUser(e);
    } else if (action === "deleteAllUsers") {
      return deleteAllUsers();
    } else {
      throw new Error("Ungültige Aktion.");
    }
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", message: error.message })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function deleteUser(e) {
  const sheet = SpreadsheetApp.openById("1Zx51WFIAprs00YtCm6wfuIUgY7uwRtlPx17UVObC124").getActiveSheet();
  const usernameToDelete = e.parameter.username;

  if (!usernameToDelete) {
    throw new Error("Kein Benutzername angegeben.");
  }

  const data = sheet.getDataRange().getValues();
  let rowToDelete = -1;

  // Suche nach der Zeile mit dem angegebenen Benutzernamen
  for (let i = 1; i < data.length; i++) { // Überspringe die Kopfzeile
    if (data[i][1] === usernameToDelete) { // Spalte 1 enthält den Benutzernamen
      rowToDelete = i + 1; // +1, da die Zeilen in der Tabelle bei 1 beginnen
      break;
    }
  }

  if (rowToDelete > 0) {
    sheet.deleteRow(rowToDelete);
    return ContentService.createTextOutput(
      JSON.stringify({ status: "success", message: "Benutzer gelöscht" })
    ).setMimeType(ContentService.MimeType.JSON);
  } else {
    throw new Error("Benutzer nicht gefunden.");
  }
}

function deleteAllUsers() {
  const sheet = SpreadsheetApp.openById("1Zx51WFIAprs00YtCm6wfuIUgY7uwRtlPx17UVObC124").getActiveSheet();
  const lastRow = sheet.getLastRow();

  if (lastRow > 1) {
    sheet.deleteRows(2, lastRow - 1); // Löscht alle Zeilen außer der Kopfzeile
  }

  return ContentService.createTextOutput(
    JSON.stringify({ status: "success", message: "Alle Benutzer gelöscht" })
  ).setMimeType(ContentService.MimeType.JSON);
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
    const usernameToDelete = e.parameter.username;

    if (!usernameToDelete) {
      throw new Error("Kein Benutzername angegeben.");
    }

    const data = sheet.getDataRange().getValues();
    let rowToDelete = -1;

    // Suche nach der Zeile mit dem angegebenen Benutzernamen
    for (let i = 1; i < data.length; i++) { // Überspringe die Kopfzeile
      if (data[i][1] === usernameToDelete) { // Spalte 1 enthält den Benutzernamen
        rowToDelete = i + 1; // +1, da die Zeilen in der Tabelle bei 1 beginnen
        break;
      }
    }

    if (rowToDelete > 0) {
      sheet.deleteRow(rowToDelete);
      return ContentService.createTextOutput(
        JSON.stringify({ status: "success", message: "Benutzer gelöscht" })
      ).setMimeType(ContentService.MimeType.JSON);
    } else {
      throw new Error("Benutzer nicht gefunden.");
    }
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", message: error.message })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doOptions(e) {
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.JSON);
}