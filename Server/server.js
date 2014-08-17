var express = require('express');
var hotels = require('./routes/hotelDetails');
 
var app = module.exports = express();
//app.use(app.router);
//app.use(error);
app.get('/api/hotels', hotels.getHotelsDetail);
app.get('*', function(req, res, next) {
  var err = new Error();
  err.status = 404;
  next(err);
});
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
//app.use(function(err, req, res, next) {
//  if(err.status !== 404) {
//    return next();
//  }
//  res.send(err.message || 'Not found');
//});
function error(err, req, res, next) {
  console.error("Error: "+err.stack);
  res.send(500);
}
 
app.listen(8085);
console.log('Listening on port 8085...');
