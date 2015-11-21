var http = require('http'), 
    fs = require('fs'), 
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function(request, response) {
  var parsedUrl = url.parse(request.url);

  if(request.method === 'GET') {
    if(parsedUrl.path === '/listings') {
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(listingData));
    } else {
      response.writeHead(404);
      response.end('Bad gateway error'); 
    }
  } else {
    
  }
};

fs.readFile('listings.json', 'utf8', function(err, data) {
  if(err) throw err;
  listingData = JSON.parse(data);

  server = http.createServer(requestHandler);
  server.listen(port, function() {
    console.log('Server listening on: http://localhost:' + port);
  });
});
