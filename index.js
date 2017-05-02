var express = require('express');
var app = express();
var os = require('os');
var bodyParser = require('body-parser');
var crypto = require('crypto');

// log reqs
app.use(function log(req, res, next) {
  console.log([req.method, req.url].join(' '));
  next();
});

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine', 'jade');
app.get('/', function(req, res) {
  crypto.pbkdf2('secret', 'salt', 100000, 512, 'sha512', function(err, key) {
    if (err) { throw err; }
    console.log(key.toString('hex')); 
  });

  res.render("index", {
    version: '2.0.0',
    agent: req.headers['user-agent'],
    hostname: os.hostname(),
    os: os.type(),
    nodeversion: process.version
  });
});

app.listen(process.env.PORT || 3000, function() {
  console.log('Listening on %s', process.env.PORT || 3000);
});
