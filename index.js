/**
 * Module dependencies.
 */
var express = require('express');
// var proxy = require('../_proxy'); // require('http-proxy-middleware');
var proxy = require('http-proxy-middleware');
/**
 * Configure proxy middleware
 */
var jsonPlaceholderProxy = proxy({
  target: 'http://v.juhe.cn',
  changeOrigin: true, // for vhosted sites, changes host header to match to target's host
  logLevel: 'debug'
});

var app = express();

/**
 * Add the proxy to express
 */
app.use('/joke/content/list.php', jsonPlaceholderProxy);

app.listen(3000);

console.log('[DEMO] Server: listening on port 3000');
console.log('[DEMO] Opening: http://localhost:3000/');

// require('open')('http://localhost:3000/');