
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
				insertImgAssets(name);
			},
			stop: function(){
				console.log("Ajax stop");
			}
		});
	})
}

async function insertImgAssets(name){
		await sleep(5000);
		for(var j=0;j<maxIndex;j++){
			$("a-assets").append("<img id='"+name+j+"' src='images/"+name+"/"+j+".jpg'>");
		}
		startImageLoop(name);
}

function startImageLoop(name){
	console.log("startImageLoop called");
	setInterval(function(){
		var box = document.getElementById(name);
		box.src = "#"+name+index;
		index++;
		if (index>maxIndex){
			index = 0;
		}
	},5000);
}

function sleep(ms){
	return new Promise(resolve => setTimeout(resolve, ms));
}


