var http = require("http");
var url = require("url");
var express = require("express");
var app = express();

function start(route) {
	app.use(express.static(__dirname + '/Public'));
	app.get('/', function(request, response) {
		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " received.");
        route(pathname);
        response.sendfile('Public/testPage.html')
		//response.end();
	});
	app.listen(9001);
	console.log("Server has started.");
}

exports.start = start;
