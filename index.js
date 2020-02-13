/**
 * Module dependencies.
 */
/***
 *               ii.                                         ;9ABH,          
 *              SA391,                                    .r9GG35&G          
 *              &#ii13Gh;                               i3X31i;:,rB1         
 *              iMs,:,i5895,                         .5G91:,:;:s1:8A         
 *               33::::,,;5G5,                     ,58Si,,:::,sHX;iH1        
 *                Sr.,:;rs13BBX35hh11511h5Shhh5S3GAXS:.,,::,,1AG3i,GG        
 *                .G51S511sr;;iiiishS8G89Shsrrsh59S;.,,,,,..5A85Si,h8        
 *               :SB9s:,............................,,,.,,,SASh53h,1G.       
 *            .r18S;..,,,,,,,,,,,,,,,,,,,,,,,,,,,,,....,,.1H315199,rX,       
 *          ;S89s,..,,,,,,,,,,,,,,,,,,,,,,,....,,.......,,,;r1ShS8,;Xi       
 *        i55s:.........,,,,,,,,,,,,,,,,.,,,......,.....,,....r9&5.:X1       
 *       59;.....,.     .,,,,,,,,,,,...        .............,..:1;.:&s       
 *      s8,..;53S5S3s.   .,,,,,,,.,..      i15S5h1:.........,,,..,,:99       
 *      93.:39s:rSGB@A;  ..,,,,.....    .SG3hhh9G&BGi..,,,,,,,,,,,,.,83      
 *      G5.G8  9#@@@@@X. .,,,,,,.....  iA9,.S&B###@@Mr...,,,,,,,,..,.;Xh     
 *      Gs.X8 S@@@@@@@B:..,,,,,,,,,,. rA1 ,A@@@@@@@@@H:........,,,,,,.iX:    
 *     ;9. ,8A#@@@@@@#5,.,,,,,,,,,... 9A. 8@@@@@@@@@@M;    ....,,,,,,,,S8    
 *     X3    iS8XAHH8s.,,,,,,,,,,...,..58hH@@@@@@@@@Hs       ...,,,,,,,:Gs   
 *    r8,        ,,,...,,,,,,,,,,.....  ,h8XABMMHX3r.          .,,,,,,,.rX:  
 *   :9, .    .:,..,:;;;::,.,,,,,..          .,,.               ..,,,,,,.59  
 *  .Si      ,:.i8HBMMMMMB&5,....                    .            .,,,,,.sMr
 *  SS       :: h@@@@@@@@@@#; .                     ...  .         ..,,,,iM5
 *  91  .    ;:.,1&@@@@@@MXs.                            .          .,,:,:&S
 *  hS ....  .:;,,,i3MMS1;..,..... .  .     ...                     ..,:,.99
 *  ,8; ..... .,:,..,8Ms:;,,,...                                     .,::.83
 *   s&: ....  .sS553B@@HX3s;,.    .,;13h.                            .:::&1
 *    SXr  .  ...;s3G99XA&X88Shss11155hi.                             ,;:h&,
 *     iH8:  . ..   ,;iiii;,::,,,,,.                                 .;irHA  
 *      ,8X5;   .     .......                                       ,;iihS8Gi
 *         1831,                                                 .,;irrrrrs&@
 *           ;5A8r.                                            .:;iiiiirrss1H
 *             :X@H3s.......                                .,:;iii;iiiiirsrh
 *              r#h:;,...,,.. .,,:;;;;;:::,...              .:;;;;;;iiiirrss1
 *             ,M8 ..,....,.....,,::::::,,...         .     .,;;;iiiiiirss11h
 *             8B;.,,,,,,,.,.....          .           ..   .:;;;;iirrsss111h
 *            i@5,:::,,,,,,,,.... .                   . .:::;;;;;irrrss111111
 *            9Bi,:,,,,......                        ..r91;;;;;iirrsss1ss1111
 */

var express = require('express');
// var proxy = require('../_proxy'); // require('http-proxy-middleware');
var proxy = require('http-proxy-middleware');
/**
 * Configure proxy middleware
 */
var jsonPlaceholderProxy = proxy({
    target: 'https://shop.2dian.com.cn/xcx',
    changeOrigin: true, // for vhosted sites, changes host header to match to target's host
    logLevel: 'debug'
});

var app = express();

/**
 * Add the proxy to express
 */

app.all("*", function (req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    // res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Origin", "http://192.168.56.1:9527");
    res.header('Access-Control-Allow-Credentials','true')
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "content-type,x-token");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    res.header("Connection","keep-alive")
    if(req){
        console.log(req.query,'req')
    }
    if (req.method.toLowerCase() == 'options')
    res.sendStatus(200)  //让options尝试请求快速结束
    else
        next();
})
const questions =
    { "code": 20000, "data": { "token": "admin-token" } }

// app.use('/vue-element-admin/user/login',jsonPlaceholderProxy)
app.post('/vue-element-admin/user/login', function (req, res) {
    res.status(200).json(questions)
});
const questions2 = { "code": 20000, "data": { "roles": ["admin"], "introduction": "I am a super administrator", "avatar": "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif", "name": "Super Admin" } }
app.get('/vue-element-admin/user/info', function (req, res) {
    
    res.status(200).json(questions2)
})
app.use('/joke/content/list.php', jsonPlaceholderProxy);
app.use('/joke/randJoke.php', jsonPlaceholderProxy);
app.use('/toutiao/index', jsonPlaceholderProxy);


app.use('/sys/authority/getAuthority', jsonPlaceholderProxy)
app.use('/shop/cate/getCategoryList', jsonPlaceholderProxy)
app.use('/sys/sysuser/login', jsonPlaceholderProxy)
app.use('/shop/cate/deleteCategory', jsonPlaceholderProxy)
app.use('/shop/cate/uploadAttachement', jsonPlaceholderProxy)
app.use('/shop/good/getGoodList', jsonPlaceholderProxy)
app.use('/shop/good/getGoodById',jsonPlaceholderProxy)
app.use('/shop/cate/getAllCateListName',jsonPlaceholderProxy)
app.use('/cy/business/content/getQuanShopGroupName',jsonPlaceholderProxy)
app.use(`/shop/good/uploadAttachement`,jsonPlaceholderProxy)
app.use(`/shop/good/deleteShopGood`,jsonPlaceholderProxy)
app.use(`/shop/brand/getBrandList`,jsonPlaceholderProxy)
app.use(`/shop/brand/uploadAttachement`,jsonPlaceholderProxy)
app.use(`/shop/brand/deleteBrand`,jsonPlaceholderProxy)



app.listen(3000);


// 获取本机ip地址利用导入os
function getIPAddress() {
    var interfaces = require('os').networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
}

const LOCAL_IP = getIPAddress()

console.log('[DEMO] Server: listening on port 3000 or ' + LOCAL_IP + ':3000');
console.log('[DEMO] Opening: http://localhost:3000/' + ' or http://' + LOCAL_IP + ':3000');

// require('open')('http://localhost:3000/');