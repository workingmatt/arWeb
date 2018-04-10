var http = require('http');
var https = require('https');
var fs = require('fs');

var options = {
	key: fs.readFileSync(__dirname+'/fcms-key.pem'),
	cert: fs.readFileSync(__dirname+'/fcms-cert.pem'),
	requestCert: false,
	rejectUnauthorized: false
};

var express = require('express');
var app = express();
var server = https.createServer(options, app);


//http handles incoming requests and pipes them to express

app.get('/', function(req,res){
	res.sendFile(__dirname+'/index.html');
});

server.listen(2018, '192.168.150.37');

console.log("Server running at port 2018");

