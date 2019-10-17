const https = require('https');

module.exports = {

	test: function(res, name, feedId){
		var txt = name+":"+feedId;
		console.log("helpers.test: sending response: "+txt);
		res.send(txt);
	},

	getArtist(res, name, feedId){
		var txt = name+":"+feedId;
		console.log("helpers.getImages: sending response: "+txt);

		https.get('https://api.curator.io/v1/feeds/'+feedId+'/posts/?api_key=a750692d-1236-47c4-b108-69607e0e06af', function(resp){
			let data = '';
			resp.on('data',function(chunk){
				data+=chunk;
			});
			resp.on('end',function(){
				console.log("Got data from "+name+" feed");
				console.log(data);
			});
		});
		res.send(txt);
	}
}