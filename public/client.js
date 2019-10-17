
console.log("Top of client.js");

refreshArtist("jen");
refreshArtist("tak");

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