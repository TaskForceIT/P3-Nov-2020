let config = Object.assign(require('./paths'), {
  port: 8088,
  staticFilesDirectory: 'htdocs',
  staticFilesDirectories: ['static'],
  dbDriver: 'IBMi',
  timeout: 3600,
  connectorCredentials: __dirname + '\\creds\\credentials',
  connectorURL: 'http://192.168.1.201:8088',
  defaultMode: 'case-sensitive',
  mailTransport: {
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: 'grover.considine18@ethereal.email',
      pass: 'psXf3pxWSWHWDBkm1w',
    },
  },
  runCcsid: 273,
});

module.exports = config;
