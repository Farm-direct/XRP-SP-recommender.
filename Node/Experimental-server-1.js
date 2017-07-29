var express = require('express'),
  http = require('http'),
  bodyParser = require('body-parser');

var hostname = 'localhost';
var port = 4000;

var app = express();

app.use(bodyParser.json());

app.get('/history', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-access-session,Pragma");
  res.header('Access-Control-Expose-Headers', 'x-access-token,Pragma,x-access-session');
  console.log(req.headers);
  res.json({
    'username': 'asd',
    'password': '123'
  })
});

app.post('/xrp', function (req, res) {
  //res.setHeader('Content-Type', 'application/json');
  //res.send("request: ", req.body);
  console.log("request: ", req.body);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-access-session,Pragma");
  res.header('Access-Control-Expose-Headers', 'x-access-token,Pragma,x-access-session');
  var Details = ["quantity", "xrpPerBuyingPrice", "totalBuyingCost", "profit", "totalSellingcost", "xrpPerSellingPrice"];
  /**
   * To-do:Change the Details.* to necessary object 
   */
  var totalBuyingCost = 0, totalSellingcost = 0, xrpPerSellingPrice = 0.0;
  var profit = (req.body.profit)*1;
   totalBuyingCost = (req.body.quantity * req.body.xrpPerBuyingPrice) + ((req.body.quantity * req.body.xrpPerBuyingPrice) * 0.1);
   totalSellingcost = (totalBuyingCost + (req.body.profit*1) )+(((totalBuyingCost + (req.body.profit*1))) * 0.1);
   xrpPerSellingPrice = (totalSellingcost*1) / (req.body.quantity*1);
  //console.log(typeof profit);
   var response = {
     "quantity": req.body.quantity,
     "xrpPerBuyingPrice": req.body.xrpPerBuyingPrice,
     "totalBuyingCost": totalBuyingCost,
     "profit": req.body.profit,
     "totalSellingcost": totalSellingcost,
     "xrpPerSellingPrice": xrpPerSellingPrice
   }
  res.send(response)
})
app.use(function (req, res, next) {
  console.log(req.headers);

  res.writeHead(200, { 'Content-Type': 'text/html' });
  //res.end('<html><body><h1>Hello World</h1></body></html>');

});


var server = http.createServer(app);

server.listen(port, hostname, function () {
  console.log(`Server running at http://${hostname}:${port}/`);
});

server.close();