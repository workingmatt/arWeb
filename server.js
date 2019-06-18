var http = require('http');
var https = require('https');
var fs = require('fs');
var ip = require('ip');
var host = ip.address(); //IP address of server changes with DHCP
var port = process.env.PORT || 2018;


var options = {
	key: fs.readFileSync(__dirname+'/fcms-key.pem'),
	cert: fs.readFileSync(__dirname+'/fcms-cert.pem'),
	ca: fs.readFileSync(__dirname+'/certrequest.csr'),
	requestCert: false,
	rejectUnauthorized: false
};

var express = require('express');
var app = express();
var server = https.createServer(options, app);

//app is the event listener
app.use(express.static(__dirname+'/public'));

app.get('/', function(req,res){
	console.log("Got / route");
	res.sendFile(__dirname+'/index.html');
});
console.log("here");
server.listen(port, host);
if (server){
	console.log("server");
} else {
	console.log("no server");
}
console.log("Server listening on "+host+":"+port)



