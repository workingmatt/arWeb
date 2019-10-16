var http = require('http');
var fs = require('fs');
var ip = require('ip');
var host = ip.address(); //IP address of server changes with DHCP
var port = process.env.PORT || 2018;

var express = require('express');
var app = express();
var server = http.createServer(app);

var helpers = require('./helpers.js');

var list = {
	tak: "1",
	jen: "2",
	dav: "3",
	wei: "4",
	dam: "5",
	yay: "6",
	jef: "7",
	cec: "8",
	ans: "9",
	kar: "10",
	jea: "11"}

//app is the event listener
app.use(express.static(__dirname+'/public'));

app.get('/', function(req,res){
	res.sendFile(__dirname+'/index.html');
});

app.get('/:key', (req,res)=>{
	var key = req.params.key;
	console.log(key);
	helpers.test(res,key,list[key]);
});

server.listen(port, host);
console.log("Server listening on "+host+":"+port)



