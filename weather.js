
function getForecast(){
	const latitude = 63.370;
	const longitude = 10.360;
	let temperature = 0;
	let humidity = 0;
	let fogginess = 0;
	let cloudiness = 0;
	let lowCloud = 0;
	let mediumCloud = 0;
	let highCloud = 0;

	let temperatureElement = document.getElementById('temperature');
	let humidityElement = document.getElementById('humidity');
	let foggniessElement = document.getElementById('fogginess');
	let cloudinessElement = document.getElementById('cloudiness');
	let lowCloudElement = document.getElementById('lowClo');
	let mediumCloudElement = document.getElementById('medClo');
	let highCloudElement = document.getElementById('highClo');

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
			let tMinutes = time.getMinutes();
			if (tMinutes.toString().length == 1) {
				tMinutes = "0" + tMinutes;
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
			console.log(x);
			for(let i = 0; i < x.length; i++){
				if (x[i].getAttribute('from') == fullTimeDate) {
					tempEl = x[i].getElementsByTagName("temperature")[0];
					temperature = tempEl.getAttribute("value");
					humidEl = x[i].getElementsByTagName("humidity")[0];
					humidity = humidEl.getAttribute("value");
					cloudEl = x[i].getElementsByTagName("cloudiness")[0];
					cloudiness = cloudEl.getAttribute("percent");
					fogEl = x[i].getElementsByTagName("fog")[0];
					fogginess = fogEl.getAttribute("percent");
					lowCloudEl = x[i].getElementsByTagName("lowClouds")[0];
					lowCloud = lowCloudEl.getAttribute("percent");
					mediumCloudEl = x[i].getElementsByTagName("mediumClouds")[0];
					mediumCloud = mediumCloudEl.getAttribute("percent");
					highCloudEl = x[i].getElementsByTagName("highClouds")[0];
					highCloud = highCloudEl.getAttribute("percent");
					break;
				}
			}
		}).then(function(){
			temperatureElement.innerHTML = temperature;
			humidityElement.innerHTML = humidity;
			cloudinessElement.innerHTML = cloudiness;
			foggniessElement.innerHTML = fogginess;
			lowCloudElement.innerHTML = lowCloud;
			mediumCloudElement.innerHTML = mediumCloud;
			highCloudElement.innerHTML = highCloud;
		})
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

		let x = xmlDoc.getElementsByTagName("location");
		for(let i = 0; i < x.length; i++){
			if (x[i].getAttribute('id') == "0504") {
				console.log(x[i]);
			}
		}
		// let y = x.childNodes[0];
		// let z = y.nodeValue;
		// let regex = /(?<=id="0504">).*/;
		console.log(x);
	})
}

getForecast();
// getTextForecast();