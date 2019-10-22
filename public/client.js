
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
refreshArtist("ani");

function refreshArtist(name){
	$(function(){
		var urlText = "https://"+location.host+'/'+name;
		$.ajax({
			type: 'POST',
			url: urlText,
			timeout: 0,								//no timeout
			error: function(){						//https://stackoverflow.com/questions/3543683/determine-if-ajax-error-is-a-timeout
				console.log("Ajax error");
			},
			success: function(data){
				console.log("Ajax success: "+urlText);
				handleFeedJson(data);
			},
			stop: function(){
				console.log("Ajax stop");
			}
		});
		$('<a-assets>').append('<p>'+"ahoy me hearties"+'</p>');
	})
}

function handleFeedJson(data){
	console.log("client.js handleFeedJson "+data.length);

}