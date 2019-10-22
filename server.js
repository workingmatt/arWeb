var http = require('http');
var fs = require('fs');
var ip = require('ip');
var path = require('path');
var host = ip.address(); //IP address of server changes with DHCP
var port = process.env.PORT || 2018;

var express = require('express');
var app = express();
var server = http.createServer(app);

var helpers = require('./helpers.js');

var list = {
	tak: "5302cc00-a700-4fb3-ae86-43781467d170",
	jen: "fe3637e0-84db-44f9-8fe7-c9b89f740f87",
	dav: "b0717a06-d221-4d82-9617-2769ce320adb",
	wei: "ef9c2cc6-461c-4939-8405-320c8b74a02c",
	dam: "24ac2f52-2401-4a41-a536-783dd15b4e8d",
	yay: "2cef1cf4-2fed-419c-af36-9db5e35b7b61",
	jef: "6f3a7ea1-0c07-46b7-ab3a-7ae8045d72ff",
	cec: "fe2dffb7-b6fb-4f57-b429-78744571f116",
	ans: "d881fe93-fd1d-4add-9726-417141292667",
	kar: "71c16368-4c5a-4026-b0d8-0d81ac9b3b5a",
	ani: "47ca63a5-892b-41cb-998a-9d0e46b58fd7"}

//app is the event listener
app.use(express.static(path.join(__dirname+'/public')));
console.log("server.js: Done static");
//app.use(express.static(path.join(__dirname+'/public/images/kar')));

app.get('/', function(req,res){
	res.sendFile(__dirname+'/index.html');
});

app.get('/test', function(req,res){
	console.log("Server.js app.get /test");
	helpers.checkFolders(list);
	res.sendFile(__dirname+'/test.html');
})

app.post('/:key', (req,res)=>{
	console.log("Server.js app.post /:key");
	var key = req.params.key;
	//helpers.test(res,key,list[key]);
	helpers.getArtist(res, key, list[key])
		.then(function(v){
			console.log("Done get artist "+key);
		});
});

server.listen(port, host);
console.log("Server listening on "+host+":"+port)



