const SerienbriefErstellen = require('./SerienbriefErstellen');

function Serienbrief(empfaenger, adresse, plz, ort, land, betreff, nachricht) {
  pjs.define('empfaenger', { type: 'char', length: 255, refParm: empfaenger });
  pjs.define('adresse', { type: 'char', length: 255, refParm: adresse });
  pjs.define('plz', { type: 'unsigned integer', length: 5, refParm: plz });
  pjs.define('ort', { type: 'char', length: 255, refParm: ort });
  pjs.define('land', { type: 'char', length: 255, refParm: land });
  pjs.define('betreff', { type: 'char', length: 1024, refParm: betreff });
  pjs.define('nachricht', { type: 'char', length: 8196, refParm: nachricht });

  SerienbriefErstellen(empfaenger, adresse, plz, ort, land, betreff, nachricht);
}

exports.run = Serienbrief;
exports.parms = [
  { type: 'char', length: 255 },
  { type: 'char', length: 255 },
  { type: 'unsigned integer', length: 5 },
  { type: 'char', length: 255 },
  { type: 'char', length: 255 },
  { type: 'char', length: 1024 },
  { type: 'char', length: 8196 },
];
