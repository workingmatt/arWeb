var http = require('http');
var fs = require('fs');
var ip = require('ip');
var host = ip.address(); //IP address of server changes with DHCP
var port = process.env.PORT || 2018;

var express = require('express');
var app = express();
var server = http.createServer(app);

//app is the event listener
app.use(express.static(__dirname+'/public'));

app.get('/', function(req,res){
	res.sendFile(__dirname+'/index.html');
});

server.listen(port, host);
console.log("Server listening on "+host+":"+port)



