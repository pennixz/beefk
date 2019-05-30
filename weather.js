
function getForecast(){

	function success(position){
		const latitude = position.coords.latitude;
		const longitude = position.coords.longitude;
		console.log("latitude: "+latitude+", longitude: "+longitude);

		fetch("https://api.met.no/weatherapi/locationforecast/1.9/?lat="+latitude+"&lon="+longitude)
		.then(function (response){
			return response.text();
		}).then(function (res){
			if (window.DOMParser){
			    parser = new DOMParser();
			    xmlDoc = parser.parseFromString(res, "text/xml");
			}
			else{
			    xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
			    xmlDoc.async = false;
			    xmlDoc.loadXML(txt);
			}
			console.log(xmlDoc);
		})
	}

	function error() {
		console.log("err");
	}

	if(!navigator.geolocation){
		console.log("Negative.");
	}
	else{
		console.log("Confirmative.");
		return navigator.geolocation.getCurrentPosition(success, error);
	}
}


function getTextForecast(){
	
	fetch("https://api.met.no/weatherapi/textforecast/2.0/?forecast=landoverview")
	.then(function(response){
		return response.text();		
	})
	.then(function(res) {
		
		if (window.DOMParser){
		    parser = new DOMParser();
		    xmlDoc = parser.parseFromString(res, "text/xml");
		}
		else{
		    xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
		    xmlDoc.async = false;
		    xmlDoc.loadXML(txt);
		}

		console.log(xmlDoc);

		let x = xmlDoc.getElementsByTagName("time")[0];
		let y = x.childNodes[0];
		let z = y.nodeValue;
		// let regex = /(?<=id="0504">).*/;
		console.log(res);
	})
}

getForecast();
// getTextForecast();