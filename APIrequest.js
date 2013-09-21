var textSentiment = function(url_input) {
  var api = http.createClient(80, 'http://access.alchemyapi.com/calls/url/URLGetTextSentiment');
  var obj = {};
  var request = api.request('POST',
    {
      'url': url_input
      'apikey': 2094dd01fd7cbceb7e1bb916840e40e81f25d16f
      'outputMode' : json
    });

  request.on('response', function () {
      obj = JSON.parse(response); });    
  request.end();

// Need to put code to keep relevant parts of JSON
// and put into MongoDB
}

/*<!--
var url = "http://www.google.com/";
var method = "POST";
var postData = "Some data";

var async = true;
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var request = new XMLHttpRequest();
request.onload = function () {
   var status = request.status; // HTTP response status, e.g., 200 for "200 OK"
   var data = request.responseText; // Returned data, e.g., an HTML document.
}

request.open(method, url, async);

request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
request.send(postData);
-->*/
