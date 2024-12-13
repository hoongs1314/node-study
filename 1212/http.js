const http = require("http");

const server = http.createServer((req, res) => {
	if (req.url === "/") {
		console.log("welcome");
		res.write("welcome");
		res.end();
	}
});


server.listen(3001);

console.log("listening 3001 port");