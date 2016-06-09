/**
 * http://usejsdoc.org/
 */
//Lets require/import the HTTP module
var http = require('http');
var express = require('express');
var bodyParser = require("body-parser");
var app = express();

//Lets define a port we want to listen to
const PORT=7677; 


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', express.static('static'));

app.get('/test', function (req, res)  {
  res.send('PriceCompare Path: ' + req.url);
});

app.post('/reportPrice', function (req, res)  {
  console.log('Report Price: ' + req.url);
  console.log('  '+JSON.stringify(req.body));
  console.log('  url: ' + req.body.query_url);
  console.log('  search_user: ' + req.body.search_user);
  
  // TODO: Run Phantom on the query_url with the search_user profile and return the table
  res.end(JSON.stringify({'success':true,
    'data':[
      {'name':'Apple','price':'12.00'},
      {'name':'Cherry','price':'0.55'}
    ]}));
});

//Lets start our app
app.listen(PORT, function(){
  //Callback triggered when server is successfully listening. Hurray!
  console.log("Server listening on: http://localhost:%s", PORT);
});