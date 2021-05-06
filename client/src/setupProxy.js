const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
//   app.use('/auth/google', 
//     createProxyMiddleware({target: 'http://localhost:8000', changeOrigin: false })
//   );

  app.use('/api/*', 
    createProxyMiddleware({target: 'http://localhost:8000', changeOrigin: false })
  );
};