let express = require('express');
let app = express();

app.use(express.static(__dirname + "/public/"));

app.get('/', (req, res) => 	res.sendFile( __dirname + "index.html"));

app.get('/register', (req, res) => res.sendFile(__dirname + "login.html"))


let server = app.listen(8080, () => {
	let host = server.address().address;
	let port = server.address().port;

	console.log("Listening on 8080")
})