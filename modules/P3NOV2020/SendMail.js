function sendMail(mailFrom, mailTo, mailSubject, mailText) {
  pjs.define('mailFrom', { type: 'char', length: 255, refParm: mailFrom });
  pjs.define('mailTo', { type: 'char', length: 255, refParm: mailTo });
  pjs.define('mailSubject', {
    type: 'char',
    length: 255,
    refParm: mailSubject,
  });
  pjs.define('mailText', { type: 'char', length: 4095, refParm: mailText });

  try {
    let response = pjs.sendEmail({
      from: mailFrom,
      to: mailTo,
      subject: mailSubject,
      text: mailText,
    });

    return response.response.split('[')[0];
  } catch (error) {
    return error.toString();
  }
}

exports.run = sendMail;
exports.parms = [
  { type: 'char', length: 255 },
  { type: 'char', length: 255 },
  { type: 'char', length: 255 },
  { type: 'char', length: 4095 },
];
