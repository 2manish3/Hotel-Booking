var fs = require('fs'),moment = require('moment'),path = require('path');
var file = "hotels.json", hData;

fs.readFile(file, 'utf8', function (err, data) {	  
	if (err) {
		console.log('Error: ' + err);
		res.send(500, 'hotels.json not found!');
		return;
	}
	hData = JSON.parse(data);	
});			


exports.getHotelsDetail = function (req, res) {
	console.log("getHotelsDetail called");
    res.setHeader('Access-Control-Allow-Origin', '*');    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');// Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
	var data;
	try{
		if(req.query.filterBy){
			var filterParams = req.query.filterBy.split(","),keyVal, tempFltData = JSON.parse(JSON.stringify(hData));
			for(var i=0; i < filterParams.length; i++){
				keyVal = filterParams[i].split("|");
				tempFltData.Establishments = filter(tempFltData.Establishments, keyVal[0], keyVal[1]);
			}
			if(req.query.sortBy)
				tempFltData.Establishments.sort(dynamicSort(req.query.sortBy));
			data = JSON.parse(JSON.stringify(tempFltData));
		}else{
			if(req.query.sortBy)
				hData.Establishments.sort(dynamicSort(req.query.sortBy));
			data = JSON.parse(JSON.stringify(hData));
		}
		var start, limit, Establishments;
		data.total = data.Establishments.length;
		if(req.query.paging){
			var stLt = req.query.paging.split("|");
			start = stLt[0], limit = stLt[1];
			Establishments = data.Establishments.slice(start, limit);
			data.Establishments = Establishments;
		}
		console.log("getHotelsDetail succeed!");		
		res.send(data);
	}catch(er){
		console.log("Error: "+er);
		res.send(500, 'oops! something broke');
	}	
};
function filter(set, key, value){
	var results = set.filter(function (entry) { return entry[key] == value; });
	return results;
};

function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}