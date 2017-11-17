var express = require('express'),
  http = require('http'),
  bodyParser = require('body-parser');
//fs is the file system node core module(like header file in c++).For core module use direct name and user module->full path) 
var fs = require("fs");

var hostname = 'localhost';
var port = process.env.port;

var app = express();

app.use(bodyParser.json());

//Cross orgin issue
app.use(function (req, res, next) {

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-access-session,Pragma");
  res.header('Access-Control-Expose-Headers', 'x-access-token,Pragma,x-access-session');


  next();

});


app.get('/history', function (req, res, next) {
  res.json({
    'username': 'asd',
    'password': '123'
  })
});

app.post('/xrp', function (req, res, next) {
  console.log("request: ", req.body);
  var Details = ["quantity", "xrpPerBuyingPrice", "totalBuyingCost", "profit", "totalSellingcost", "xrpPerSellingPrice"];
  var totalBuyingCost = 0, totalSellingcost = 0, xrpPerSellingPrice = 0.0;
  var profit = (req.body.profit) * 1;
  totalBuyingCost = ((req.body.quantity * req.body.xrpPerBuyingPrice)) + ((req.body.quantity * req.body.xrpPerBuyingPrice) * 0.01);
  totalSellingcost = (totalBuyingCost + (req.body.profit * 1)) + (((totalBuyingCost + (req.body.profit * 1))) * 0.01);
  xrpPerSellingPrice = (((totalSellingcost * 1) / (req.body.quantity * 1)).toFixed(2)) * 1;
  //Details.quantity = req.body.quantity;
  var response = {
    "quantity": (req.body.quantity),
    "xrpPerBuyingPrice": req.body.xrpPerBuyingPrice,
    "totalBuyingCost": totalBuyingCost,
    "profit": req.body.profit,
    "totalSellingcost": totalSellingcost,
    "xrpPerSellingPrice": xrpPerSellingPrice
  }
  console.log("About to write the file")
  console.log(__dirname + '\\History.txt');

  //First argument file name,second arument content
  var data;
  var date = new Date();
  var currentHours = date.getHours();
  var minutes = date.getMinutes();
  var time = currentHours + ":" + minutes
  console.log(__dirname);
  fs.writeFile(__dirname + '\\History.txt', JSON.stringify(response) + "\n", { flag: 'a+' }, function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
  fs.readFile((__dirname + "\\Words.txt"), function (err, data) {
    if (err) {
      console.log(err)
    }
    else
      var quantity = data.toString().split(' ');
    fs.writeFile(__dirname + '\\parsedwordsfromfile.txt', quantity + "\n", { flag: 'a+' }, function (err) {
      if (err) throw err;
    })
    console.log(quantity);

    //console.log(JSON.parse(data))
  })
  var wordsHashMap = {};
  for (words in quantity) {
    ///if word does not exists then insert in the hash map
    //if (quantity[words] in wordsHashMap) {
    {
      wordsHashMap[words] = wordsHashMap[words] ? wordsHashMap[words]+1 : 1
     }
    ///else increase the count
    //console.log(array[i]);
    
  }
  fs.writeFile(__dirname + '\\parsedwordsfromfile.txt', wordsHashMap + "\n", { flag: 'a+' }, function (err) {
    if (err) throw err;
  })  
  // var quantity = this.data
  res.send(response)
})

var server = http.createServer(app);

server.listen(port, hostname, function () {
  console.log(`Server running at http://${hostname}:${port}/`);
});

//server.close();