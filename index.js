var express = require('express');
var app = express();
var path = require('path');
var os = require('os');
var bodyParser = require('body-parser');
var fs = require('fs');

// log reqs
app.use(function log (req, res, next) {
  console.log([req.method, req.url].join(' '));
  next();
});

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine', 'jade');
app.get('/', function(req, res) {
    res.render("index",
               { agent: req.headers['user-agent'],
                 hostname: os.hostname(),
                 os: os.type(),
                 nodeversion: process.version
               });
});

var server = app.listen(process.env.PORT || 3000, function() {
    console.log('Listening on %s', process.env.PORT || 3000);
});
