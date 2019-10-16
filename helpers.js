
module.exports = {

	test: function(res, name, feedId){
		var txt = name+":"+feedId;
		console.log("helpers.test: sending response: "+txt);
		res.send(txt);
	}
}