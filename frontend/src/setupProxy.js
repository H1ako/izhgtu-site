const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  const proxy = createProxyMiddleware({
      target: 'http://127.0.0.1:8000',
      changeOrigin: true,
    })
  app.use(
    '/api',
    proxy
  );
  app.use(
    '/assets',
    proxy
  );
};
