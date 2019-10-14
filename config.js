var express = require('express');
var parseurl = require('parseurl');
var grenade = require('grenade');
var consign = require('consign');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
const debug = require("debug")("server");

var options = { 
  useErrorHandler: false, 
  continueMiddleware: false,
}

// NEW - Add CORS headers - see https://enable-cors.org/server_expressjs.html
//app.use(function(req, res, next) {
  //res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  //next();
//});


const port = process.env.SERVER_PORT || 3001;

// NEW - replace custom middleware with the cors() middleware
app.use(cors());

app.get("/api/ping", (req, res) => {
  
  res.send({
    msg: "Hello, World"
  });
});


app.set('view engine','frag');
app.set('views','./app/views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(express.static('./app/public'));

/**app.use(function (req, res, next) {
    var views = req.session.get('views', {});

    // get the url pathname
    var pathname = parseurl(req).pathname.slice(1);

    // count the views
    views[pathname] = (views[pathname] || 0) + 1;

    req.session.set('views', views);

    next();
});**/


// // This will set up the view engine.
grenade.express(app, {
    rootPath: './app/views',
    extension: 'frag'  
});

consign()
.then('./app/controllers')
.then('./app/model')
.include('./app/routes')
.into(app);

module.exports = app;