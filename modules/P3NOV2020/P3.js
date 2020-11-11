const SerienbriefErstellen = require('./SerienbriefErstellen');
const fetch = require('node-fetch');
const Headers = fetch.Headers;

function common() {
  pjs.defineDisplay('display', 'p3.json');

  while (!exit) {
    if (!header) display.main.execute();

    header = menuSelection ? menuSelection : header;
    if (menuSelection) {
      responseText = '';
      commandText = '';
    }

    switch (header) {
      case 'Befehlsübertragung':
        display.Befehl.execute();
        if (accept) responseText = commands(commandText);
        break;
      case 'Fibonacci':
        display.Fibo.execute();
        if (accept) responseText = programs(commandText);
        break;
      case 'REST-API':
        if (!userUrl) userUrl = 'http://localhost:8088/Users';
        display.REST.execute();
        if (accept) {
          if (userId) {
            userUrl = 'http://localhost:8088/Users/' + userId;
          } else userUrl = 'http://localhost:8088/Users';
          if (restType && restId) {
            rest(restType, restId, restVorname, restNachname, restEmail);
            restType = restId = restVorname = restNachname = restEmail = null;
          }
        }
        break;
      case 'SQL-Query':
        display.SQL.execute();
        if (accept) responseText = queries(commandText);
        break;
      case 'Serienbriefe':
        display.Serienbriefe.execute();
        if (accept)
          if (!empfaenger) erstellteDatei = 'Fehler: Bitte Empfänger eingeben.';
          else if (!adresse)
            erstellteDatei = 'Fehler: Bitte Addresse eingeben.';
          else if (!plz) erstellteDatei = 'Fehler: Bitte PLZ eingeben.';
          else if (!ort) erstellteDatei = 'Fehler: Bitte Ort eingeben.';
          else if (!betreff) erstellteDatei = 'Fehler: Bitte Betreff eingeben.';
          else {
            erstellteDatei = SerienbriefErstellen(
              empfaenger,
              adresse,
              plz,
              ort,
              land,
              betreff,
              nachricht
            );
          }
        break;
      case 'QR-Code Erstellen':
        display.QRGen.execute();
        break;
      case 'QR-Code Scannen':
        display.QRScan.execute();
        break;
      case 'Excel-Support':
        const data = pjs.query('SELECT VORNAME,NACHNAME,EMAIL FROM Users');
        display.sfl001.replaceRecords(data);
        display.Excel.execute();
        break;
      case 'E-Mail':
        display.EMail.execute();
        if (accept) {
          if (!mailFrom) mailResponse = 'Bitte Absender eingeben.';
          else if (!mailTo) mailResponse = 'Bitte Empfänger eingeben.';
          else if (!mailSubject) mailResponse = 'Bitte Betreff eingeben.';
          else if (!mailText)
            mailResponse = 'Ein Mail ohne Inhalt kann nicht versendet werden.';
          else {
            mailResponse = pjs.call(
              'P3NOV2020/SendMail.js',
              mailFrom,
              mailTo,
              mailSubject,
              mailText
            );
          }
        }
        break;
      default:
        display.main.execute();
        break;
    }
  }
}

function commands(commandText) {
  try {
    let jobs = pjs.runCommand(commandText);
    return 'Done';
  } catch (error) {
    return 'Error\n' + error;
  }
}

function programs(commandText) {
  try {
    commandText = parseInt(commandText);
    if (!commandText || commandText < 1) commandText = 1;
  } catch (error) {
    commandText = 1;
  }
  let ausgaben = [];
  for (i = 1; i <= commandText; i++) {
    pjs.define('eingabe', {
      type: 'packed decimal',
      length: 5,
      decimals: 0,
      initValue: i,
    });
    pjs.define('ausgabe', {
      type: 'packed decimal',
      length: 20,
      decimals: 0,
    });
    try {
      pjs.call('FIBO', eingabe, ausgabe);
      ausgaben.push(ausgabe);
    } catch (error) {
      return 'Error\n' + error;
    }
  }
  return ausgaben.join();
}

function queries(commandText) {
  try {
    var orders = pjs.query(commandText);
    return JSON.stringify(orders, null, 2);
  } catch (error) {
    return 'Error\n' + error;
  }
}

function rest(restType, restId, restVorname, restNachname, restEmail) {
  switch (restType) {
    case 'DELETE':
      var requestOptions = {
        method: 'DELETE',
        redirect: 'follow',
      };

      fetch('http://localhost:8088/Users/' + restId, requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log('error', error));
      break;
    case 'POST':
      if (!restVorname || !restNachname || !restEmail) return;
      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      var raw = JSON.stringify({
        vorname: restVorname,
        nachname: restNachname,
        email: restEmail,
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      fetch('http://localhost:8088/Users/' + restId, requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result));
    case 'PUT':
      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      var raw = JSON.stringify({
        vorname: restVorname,
        nachname: restNachname,
        email: restEmail,
      });

      var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      fetch('http://localhost:8088/Users/' + restId, requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log('error', error));
    default:
      break;
  }
}

exports.run = common;
