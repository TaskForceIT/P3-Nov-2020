const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');
const fs = require('fs');
const path = require('path');

function SerienbriefErstellen(
  empfaenger,
  adresse,
  plz,
  ort,
  land,
  betreff,
  nachricht
) {
  //Load the docx file as a binary
  const content = fs.readFileSync(
    path.resolve(__dirname, 'serienbrief.docx'),
    'binary'
  );

  const zip = new PizZip(content);
  let doc;

  try {
    doc = new Docxtemplater(zip);
  } catch (error) {
    // Catch compilation errors (errors caused by the compilation of the template : misplaced tags)
    errorHandler(error);
  }

  //set the templateVariables
  doc.setData({
    empfaenger,
    adresse,
    plz,
    ort,
    land,
    betreff,
    nachricht,
  });

  try {
    doc.render();
  } catch (error) {
    errorHandler(error);
  }

  const buf = doc.getZip().generate({ type: 'nodebuffer' });

  const fileName = `${empfaenger.trim()}-${Date.now()}.docx`;

  fs.writeFileSync(path.resolve(__dirname, 'Briefe', fileName), buf);
  return fileName;
}

function replaceErrors(key, value) {
  if (value instanceof Error) {
    return Object.getOwnPropertyNames(value).reduce(function (error, key) {
      error[key] = value[key];
      return error;
    }, {});
  }
  return value;
}

function errorHandler(error) {
  console.log(JSON.stringify({ error: error }, replaceErrors));

  if (error.properties && error.properties.errors instanceof Array) {
    const errorMessages = error.properties.errors
      .map(function (error) {
        return error.properties.explanation;
      })
      .join('\n');
    console.log('errorMessages', errorMessages);
    // errorMessages is a humanly readable message looking like this :
    // 'The tag beginning with "foobar" is unopened'
  }
  throw error;
}

module.exports = SerienbriefErstellen;
