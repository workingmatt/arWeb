const https = require('https');
var request = require('request');

module.exports = {

	//replaced by getArtist
	test: function(res, name, feedId){
		var txt = name+":"+feedId;
		console.log("helpers.test: sending response: "+txt);
		res.send(txt);
	},

	//Get raw json data from Curator.io feedId specified in server.js See feedIds.txt for list
	getArtist: function(res, name, feedId){
		var txt = name+":"+feedId;
		var postArray = new Array();
		postArray = [];

		return new Promise(function(resolve, reject){
			https.get('https://api.curator.io/v1/feeds/'+feedId+'/posts/?api_key=a750692d-1236-47c4-b108-69607e0e06af', function(resp){
				let data = '';
				resp.on('data',function(chunk){
					data+=chunk;
				});
				resp.on('end',function(){
					console.log("Got data from "+name+" feed");

					getArtistInfo(data,postArray)
						.then(function(ret){
							console.log(postArray);
							resolve(res.send(ret)); //resolve this getArtist promise
						})
					//console.log(data);
				});
				resp.on('error',function(err){
					console.log("helpers.getArtist: Error");
					console.log(err);
				})
			});
		});
		res.send(txt);
	}

}

//Translate feed into postArray
function getArtistInfo(feed,postArray){
	return new Promise(function(resolve,reject){
		console.log("getArtistInfo:");
		

		postArray.push("poo");
		resolve(feed,postArray);
	});
}