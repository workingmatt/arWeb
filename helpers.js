const https = require('https');
var request = require('request');
var fs = require('fs');

module.exports = {

	//replaced by getArtist
	test: function(res, name, feedId){
		var txt = name+":"+feedId;
		console.log("helpers.test: sending response: "+txt);
		res.send(txt);
	},

	//TODO this doesn't work - do it manually!
	checkFolders: function(list){
		for(var artist in list){
			var path = __dirname+"/public/images/"+artist+"/";
			fs.access(path, function(err){
				if(err){
					fs.mkdir(path,function(err){
						console.log("Error creating directory");
						console.log(err);
					});
				}
			});
		}
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
					//console.log(data);

					getArtistPosts(JSON.parse(data),name,postArray)
						.then(function(ret){
							console.log("getArtist: postArray");
							//console.log(postArray);
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
function getArtistPosts(feed,name,postArray){
	return new Promise(function(resolve,reject){
		console.log("getArtistInfo:");
		var postPromises = new Array;
		for (var i=0;i<feed.postCount;i++){
			if(feed.posts[i]!=undefined && feed.posts[i].has_image==1){
				postPromises.push(getPostInfo(feed, name, i, postArray));
			}
		}

		Promise.all(postPromises)
			.then(function(){
				console.log("Finished getting artist posts");
				resolve(postArray);
				// for (var i=0;i<postArray.length-1;i++){
				// 	downloadImage(postArray[i].image_url,postArray[i].artist,postArray[i].image);
				// }
			})
			.catch(function(err){
				console.log("Error in getArtistPosts.");
				console.log(err);
			});
	});
}

function getPostInfo(feed, name, i, postArray){
	return new Promise(function(resolve,reject){
		let objPost = new Object();

		objPost.artist = name;
		objPost.has_image = feed.posts[i].has_image;
		objPost.image = i;
		objPost.imageUrl = feed.posts[i].image;
		objPost.image_width = feed.posts[i].image_width;
		objPost.image_height = feed.posts[i].image_height;

		objPost.image_large = feed.posts[i].image_large;
		objPost.image_large_width = feed.posts[i].image_large_width;
		objPost.image_large_height = feed.posts[i].image_large_height;

		objPost.name = feed.posts[i].user_screen_name;
		objPost.text = feed.posts[i].text;
		objPost.network_name = feed.posts[i].network_name;
		var date = new Date(feed.posts[i].source_created_at);
		objPost.date = date.getDate()+'/'+date.getMonth()+'/'+date.getFullYear();//date.toLocaleDateString("en-GB");
		//console.log(objPost.date);
		postArray.push(objPost);

		var imagePromise = new Array;
		imagePromise.push(downloadImage(feed.posts[i].image, objPost, i));
		Promise.all(imagePromise)
			.then(function(){
				resolve();
			})
			.catch(function(err){
				console.log("getPostInfo imagePromise Error");
				console.log(err);
			});
		resolve(postArray);
	});
}

function downloadImage(url, objPost, index){
	return new Promise(function(resolve,reject){
		// console.log("download "+url+" : "+objPost.artist+" : "+" : "+index);
		let fileStream = fs.createWriteStream(__dirname+"/public/images/"+objPost.artist+"/"+index+".jpg");
		request(url, function(err,response,body){
			if(err){
				console.log("Error in downloadImage");
				console.log(err);
			}
			objPost.content_type=response.headers['content-type'];
		}).pipe(fileStream);

		fileStream.on('close', function(){
			resolve();
		});
		fileStream.on('error', function(err){
			reject(err);
		});
	});

}
