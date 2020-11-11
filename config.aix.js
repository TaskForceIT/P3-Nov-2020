let config = Object.assign(require('./paths'), {
  port: 8088,
  staticFilesDirectory: '/www/profoundui/htdocs',
  staticFilesDirectories: ['static'],
  dbDriver: 'IBMi',
  timeout: 3600,
  authenticate: 'none',
  connectorLibrary: 'PROFOUNDP3',
  profounduiLibrary: 'PROFOUND80',
  connectorCredentials: '/profoundp3/creds/credentials',
  defaultMode: 'case-sensitive',
  connectorIPFilter: function (ip) {
    console.log('Incoming IP: ' + ip);
    if (ip.indexOf('192.168.1.') == 0) return true;
  },
});

module.exports = config;
