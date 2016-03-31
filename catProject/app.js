var http = require('http');

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end("Hello World\n");
});

// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(8000);
console.log("Server running at http://127.0.0.1:8000/");



// const http = require('http');
//
// http.createServer( (request, response) => {
//   response.writeHead(200, {'Content-Type': 'text/plain'});
//   response.end('Hello World\n');
// }).listen(8124);
//
// console.log('Server running at http://127.0.0.1:8124/');
/************************/


window.onload = function() {
	var button = document.querySelector("#getMessage");
	button.onclick = (function() {

		//ajax request
// 		var xhr = new XMLHttpRequest();
//   	xhr.open("GET", "www.freecodecamp.com/json/cats.json", true);
// 		xhr.send();

// 		var messageWell = document.querySelector(".message");
// 		console.log(messageWell);
// 		messageWell.innerHTML = "<p>Status: "+ xhr.status + "</p><br><p>StatusText: " + xhr.statusText+ "</p>";

	$.getJSON("./json/cats.json", function(data) {
        $(".message").html(JSON.stringify(data));
    });





// 		xhr.onreadystatechange = function() {
// 			if(xhr.status === 200 && xhr.readyState === 4) {
// 				var data = JSON.parse(xhr.responseText);
// 				console.log(data);
// 			}
// 			else { console.log("Request filed"); }
// 		};


	});
};
