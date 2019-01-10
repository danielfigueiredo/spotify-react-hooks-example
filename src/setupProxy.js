const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  const spotifyAccountsProxy = proxy('/api', {
    target: process.env.REACT_APP_SPOTIFY_ACCOUNTS_BASE_URL,
    secure: false,
    changeOrigin: true,
    logLevel: 'info',
  });
  const spotifyAPIProxy = proxy('/v1', {
    target: process.env.REACT_APP_SPOTIFY_API_BASE_URL,
    secure: false,
    changeOrigin: true,
    logLevel: 'info',
  });
  app.use(spotifyAccountsProxy);
  app.use(spotifyAPIProxy);
};
