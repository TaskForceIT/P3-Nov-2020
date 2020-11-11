module.exports = {
  port: 8088,
  staticFilesDirectory: '/www/profoundui/htdocs',
  staticFilesDirectories: ['static'],
  pathlist: ['pjssamples', 'P3NOV2020'],
  initialModules: {
    '/hello': 'pjssamples/hello',
    '/hello2': 'pjssamples/hello2',
    '/connect4': 'pjssamples/connect4',
    '/upload': 'pjssamples/upload',
    '/P3': 'P3NOV2020/P3',
  },
  dbDriver: 'IBMi',
  timeout: 3600,
  defaultMode: 'case-sensitive',
  connectorURL: 'https://as400.taskforce-it.de:8088',
  connectorCredentials: 'profoundp3\\creds\\credentials',
  profounduiLibrary: 'PROFOUND80',
  connectorLibrary: 'PROFOUNDP3',
  connectorIPFilter: function (ip) {
    return true;
  },
};
