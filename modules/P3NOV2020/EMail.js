function EMail(mailFrom, mailTo, mailSubject, mailText) {
  pjs.define('mailFrom', { type: 'char', length: 255, refParm: mailFrom });
  pjs.define('mailTo', { type: 'char', length: 255, refParm: mailTo });
  pjs.define('mailSubject', {
    type: 'char',
    length: 255,
    refParm: mailSubject,
  });
  pjs.define('mailText', { type: 'char', length: 4095, refParm: mailText });

  mailResponse = pjs.call(
    'P3NOV2020/SendMail.js',
    mailFrom,
    mailTo,
    mailSubject,
    mailText
  );
}

exports.run = EMail;
exports.parms = [
  { type: 'char', length: 255 },
  { type: 'char', length: 255 },
  { type: 'char', length: 255 },
  { type: 'char', length: 4095 },
];
