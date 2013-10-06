// Builtin packages
var http = require('http');
var url = require('url');

// Express
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb:hack:hack,hack.kalosal.com/test');
var db = mongoose.connection;
db.once('open', function callback () {
    console.log("hooray!");
    var UserSchema = new Schema({
    	username: String,
    	password: String,
    	documents: {}
    })
    var User = mongoose.model('User', UserSchema);
    var jordan = new User({
    	username: "jhaines",
    	password: "kalosalrulez",
    	documents: {}
    });
    jordan.save(function(error, data) {
        if(error) {
        	console.log(error);
        } else {
        	console.log(data);
        }
    });
    User.find(function(err, people) {
    	if(err) {
    		console.log(error);
    	} else {
    		console.log(people);
    	}
    })
});

app.set('port', process.env.PORT || 3001);
app.use(express.favicon());
app.use(express.bodyParser());
//app.use(express.methodOverride());

//Check port
var port = process.env.PORT || 3001;
app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});

function start(route) {
	app.use(express.static(__dirname + '/Public'));
	app.get('/', function(request, response) {
		var pathname = url.parse(request.url).pathname;
		console.log('Request for ' + pathname + ' received.');
        route(pathname);
        response.sendfile('Public/testPage.html')
		//response.end();
	});

	app.get('/parse', function(request, response) {
		var pathname = url.parse(request.url).pathname;

		var dbox;
		var app;
		var key = "8higzkomex2c5jy";
		var secret = "rueapgelizhsyb1";
		dbox = require("dbox");
		app = dbox.app( {"app_key" : key, "app_secret" : secret} );

		app.requesttoken(function(status, request_token) {
			//console.log(request_token);
			console.log("Must visit: https://www.dropbox.com/1/oauth/authorize?oauth_token=#"+request_token.oauth_token);
		});


		console.log("Request for " + pathname + " received.");
        route(pathname);
        response.sendfile('Public/MarkdownParse.html')
		//response.end();
	});

	app.get('/login', function(request, response) {
        var pathname = url.parse(request.url).pathname;
	    console.log(pathname);
	});

	app.listen(9001);
	console.log('Server has started.');
}

exports.start = start;
exports.app = app;
