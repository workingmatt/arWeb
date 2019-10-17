
console.log("In client.js");

refreshArtist("jen");

function refreshArtist(name){
	$(function(){
		var urlText = "http://"+location.host+'/'+name;
		$.ajax({
			type: 'POST',
			url: urlText,
			success: function(data){
				console.log("Ajax success: "+urlText);
			},
			stop: function(){
				console.log("Ajax stop");
			}
		});
	})
}
