const express = require ('express');
const router = express.Router();
const path = require ('path');
const bodyParser = require('body-parser');

// create express app
const app = express ();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

var allowCrossDomain = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
};
app.use(allowCrossDomain);

app.use (express.static ('public'));
app.use (express.static ('public/assets'));

app.get ('/', function (req, res) {
	return res.sendFile (path.resolve (__dirname, './public/index.html'));
});

var port = 4000;

// listen on server port
app.listen (port, function() {
	console.log ("Server is running on localhost:" + port + "/");
});
