
//TODO error handling when response is empty
//Delete all image folder contents
//Rerun script
console.log("in client.js");
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

		console.log("refreshArtist");
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
				handleFeedJson(name);
			},
			stop: function(){
				console.log("Ajax stop");
			}
		});
		$("a-assets").append("<p>ahoy me hearties</p>");
	})
}

function handleFeedJson(name){
	setInterval(function(){
		$("a-assets").append("<img id='"+name+"0' src='images/"+name+"/0.jpg'>");
	},5000);
	//console.log("client.js handleFeedJson "+data);
	//console.log(data);
	//console.log("****");

}