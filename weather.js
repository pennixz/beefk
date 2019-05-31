
function getForecast(){
	const latitude = 63.370;
	const longitude = 10.360;

	fetch("https://api.met.no/weatherapi/locationforecast/1.9/?lat="+latitude+"&lon="+longitude)
		.then(function (response){
			return response.text();
		}).then(function (res){
			let time = new Date();
			let tYear = time.getFullYear();
			let tMonth = time.getMonth() + 1;
			
			if (tMonth.toString().length == 1) {
				tMonth = "0" + tMonth;
			}
			let tDate = time.getDate();
			if (tDate.toString().length == 1) {
				tDate = "0" + tDate;
			}
			let tHour = time.getHours();
			if (tHour.toString().length == 1) {
				tHour = "0" + tHour;
			}

			let fullTimeDate = tYear + "-" + tMonth + "-" + tDate + "T" + tHour + ":00:00Z";
			
			if (window.DOMParser){
			    parser = new DOMParser();
			    xmlDoc = parser.parseFromString(res, "text/xml");
			}
			else{
			    xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
			    xmlDoc.async = false;
			    xmlDoc.loadXML(txt);
			}
			
			let x = xmlDoc.getElementsByTagName("time");

			for(let i = 0; i < x.length; i++){
				if (x[i].getAttribute('from') == fullTimeDate) {
					tempEl = x[i].getElementsByTagName("temperature")[0];
					document.getElementById('temperature').innerHTML = tempEl.getAttribute("value");
					humidEl = x[i].getElementsByTagName("humidity")[0];
					document.getElementById('humidity').innerHTML = humidEl.getAttribute("value");
					cloudEl = x[i].getElementsByTagName("cloudiness")[0];
					document.getElementById('cloudiness').innerHTML = cloudEl.getAttribute("percent");
					fogEl = x[i].getElementsByTagName("fog")[0];
					document.getElementById('fogginess').innerHTML = fogEl.getAttribute("percent");
					lowCloudEl = x[i].getElementsByTagName("lowClouds")[0];
					document.getElementById('lowClo').innerHTML = lowCloudEl.getAttribute("percent");
					mediumCloudEl = x[i].getElementsByTagName("mediumClouds")[0];
					document.getElementById('medClo').innerHTML = mediumCloudEl.getAttribute("percent");
					highCloudEl = x[i].getElementsByTagName("highClouds")[0];
					document.getElementById('highClo').innerHTML = highCloudEl.getAttribute("percent");
					break;
				}
			}
		})
}

getForecast();

// function getTextForecast(){
	
// 	fetch("https://api.met.no/weatherapi/textforecast/2.0/?forecast=landoverview")
// 	.then(function(response){
// 		return response.text();		
// 	})
// 	.then(function(res) {
		
// 		if (window.DOMParser){
// 		    parser = new DOMParser();
// 		    xmlDoc = parser.parseFromString(res, "text/xml");
// 		}
// 		else{
// 		    xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
// 		    xmlDoc.async = false;
// 		    xmlDoc.loadXML(txt);
// 		}

// 		console.log(xmlDoc);

// 		let x = xmlDoc.getElementsByTagName("location");
// 		for(let i = 0; i < x.length; i++){
// 			if (x[i].getAttribute('id') == "0504") {
// 				console.log(x[i]);
// 			}
// 		}
// 		// let y = x.childNodes[0];
// 		// let z = y.nodeValue;
// 		// let regex = /(?<=id="0504">).*/;
// 		console.log(x);
// 	})
// }

// getTextForecast();