module.exports = {
  pathlist: ['pjssamples', 'P3NOV2020', 'rpgoa'],
  initialModules: {
    '/hello': 'pjssamples/hello',
    '/hello2': 'pjssamples/hello2',
    '/connect4': 'pjssamples/connect4',
    '/upload': 'pjssamples/upload',
    '/P3': 'P3NOV2020/P3',
    '/serienbrief': 'P3NOV2020/serienbrief.js',
  },
  webservices: [
    {
      route: '/Users/:id',
      path: 'P3NOV2020/User',
      verb: 'all',
    },
    {
      route: '/Users',
      path: 'P3NOV2020/Users',
      verb: 'all',
    },
  ],
};
