var express = require('express'),
     http = require('http');

var hostname = 'localhost';
var port = 4000;

var app = express();

app.get('/history', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods","POST, GET, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-access-session,Pragma");
    res.header('Access-Control-Expose-Headers', 'x-access-token,Pragma,x-access-session' );
  console.log(req.headers);
   //res.end({ "username": "123" });
  //res.send({ a: 1 });
  res.json({
    'username': 'asd',
'password':'123'  })
});
app.use(function (req, res, next) {
  console.log(req.headers);
 
    res.writeHead(200, { 'Content-Type': 'text/html' });
  //res.end('<html><body><h1>Hello World</h1></body></html>');

});


var server = http.createServer(app);

server.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});

server.close();