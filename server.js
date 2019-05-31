let express = require('express');
let app = express();

app.use(express.static(__dirname));

app.get('/', (req, res) => 	res.sendFile( __dirname + "/" + "index.html"));


let server = app.listen(8080, () => {
	let host = server.address().address;
	let port = server.address().port;

	console.log("Listening on 8080")
})