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

app.all("*",function(req,res,next){
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send(200);  //让options尝试请求快速结束
    else
        next();
})


app.use('/joke/content/list.php', jsonPlaceholderProxy);
app.listen(3000);

// 获取本机ip地址利用导入os
function getIPAddress(){
    var interfaces = require('os').networkInterfaces();
    for(var devName in interfaces){
        var iface = interfaces[devName];
        for(var i=0;i<iface.length;i++){
            var alias = iface[i];
            if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){
                return alias.address;
            }
        }
    }
  }
  
  const LOCAL_IP = getIPAddress()

console.log('[DEMO] Server: listening on port 3000 or '+LOCAL_IP+':3000');
console.log('[DEMO] Opening: http://localhost:3000/'+' or http://'+LOCAL_IP+':3000');

// require('open')('http://localhost:3000/');