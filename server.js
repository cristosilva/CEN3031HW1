var http = require('http'), 
    fs = require('fs'), 
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;
var requestHandler = function(request, response) {
    var parsedUrl = url.parse(request.url);
//me:
    //if url has /listings, do a 200 code and write the listingData to the server
    if( parsedUrl.pathname == '/listings'){
      response.writeHead(200, {'Content-Type': 'text/plain'});
      response.end(listingData);
    }
    //if url does not havee /listings, do a 404 code and display Bad gateway error.
    else{
      response.writeHead(404);
      response.end("Bad gateway error");
    }
//end me.
  /*
    Your request handler should send listingData in the JSON format if a GET request 
    is sent to the '/listings' path. Otherwise, it should send a 404 error. 

    HINT: explore the request object and its properties 
    http://stackoverflow.com/questions/17251553/nodejs-request-object-documentation
   */
};

fs.readFile('listings.json', 'utf8', function(err, data) {
  //me
    //saves the data from the readFile to listingData then creates the server
    listingData = data;
    server = http.createServer(requestHandler);
    //the server is now started
    server.listen(port, function() {
    console.log('Server listening');
    });
    console.log('Server started?');
    //end me
    /*
    This callback function should save the data in the listingData variable, 
    then start the server. 
   */
});
