
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

var index = 0;
var maxIndex = 5;
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
		for(var j=0;j<maxIndex;j++){
			$("a-assets").append("<img id='"+name+j"' src='images/"+name+"/"+j+".jpg'>");
		}
	},5000);
	//console.log("client.js handleFeedJson "+data);
	//console.log(data);
	//console.log("****");

}