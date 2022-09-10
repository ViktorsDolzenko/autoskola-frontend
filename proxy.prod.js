const PROXY_CONFIG = [
  {
    context: ['/api'],
    target: 'https://0ypps6d2.api.sanity.io',
    changeOrigin: true,
    pathRewrite: { '^/api': '' },
    secure: false,
  },
];

module.exports = PROXY_CONFIG;
