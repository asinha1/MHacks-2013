var request = require("request");
var http = require("http");
var llist = [];
var rlist = []; 
var JSON_extractor = function(list, url) {
  var obj = [];
  //Get JSON for multiple keywords
  for (i=0; i < list.length; i++)
  {
    var keyword = list[i];
    var request = api.request('POST',
    {
      'target' : keyword,
      'url': url_input,
      'apikey': '2094dd01fd7cbceb7e1bb916840e40e81f25d16f',
      'outputMode' : 'json'
    } , function (response) {
            // If the API sent an error msg, ignore keyword
    console.log("Got the API");
    if(response.status === 'ERROR') {}
    else
    {
    //Create object with keyword, score
    var temp = {word : keyword, score : response.docSentiment.score};
    if(response.docSentiment.mixed === 1)
    {
      //If its mixed, set sentiment to mixed
      temp.sentiment = 'mixed';
    }
    else
    {
      temp.sentiment = response.docSentiment.type;
    }
    //Add object to list
    obj.push(response);
    }
    });
    request.end();
  }
  return obj;
}

var extract_feels = function(url) {
  var liberal_feels = JSON_extractor(llist,url);
  var conservative_feels = JSON_extractor(rlist,url);

}
