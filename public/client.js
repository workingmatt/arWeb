
console.log("Top of client.js");

//TODO error handling when response is empty
//Delete all image folder contents
//Rerun script

refreshArtist("jen");
refreshArtist("tak");
refreshArtist("dav");
refreshArtist("wei");
refreshArtist("dam");
refreshArtist("yay");
refreshArtist("jef");
refreshArtist("cec");
refreshArtist("ans");
refreshArtist("kar");
refreshArtist("jea");

function refreshArtist(name){
	$(function(){
		var urlText = "http://"+location.host+'/'+name;
	console.log("here: "+urlText);
		$.ajax({
			type: 'POST',
			url: urlText,
			success: function(data){
				console.log("Ajax success: "+urlText);
				handleFeedJson(data);
			},
			stop: function(){
				console.log("Ajax stop");
			}
		});
	})
}

function handleFeedJson(data){
	console.log("client.js handleFeedJson "+data.length);

}