var request = require("request");
var http = require("http");
var mongoose = require("mongoose");
alert("Going to Connect");
var mongoose = require('mongoose');
mongoose.connect('ec2-54-200-60-55.us-west-2.compute.amazonaws.com/news');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
   console.log("Connected");
});

var newsSchema = mongoose.Schema({
        link : String,
        bias : Number,
        lean : String
})
var summary = mongoose.model('Summary',newsSchema);

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
    if(response.status === 'ERROR') 
    {console.error.bind(console, 'connection error:');}
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

var get_total_positivity = function(list) {
  var pos = 0;
  var neg = 0;
  for (i=0; i < list.length;i++)
  {
    if (list[i].word === "positive") 
    {
      pos += score;
    }
    if (list[i].word === "negative")
    {
      neg += Math.abs(list[i].score);
    }
  }
  return [pos,neg]; 
}

var extract_feels = function(url) {
  var liberal_feels = JSON_extractor(llist,url);
  var conservative_feels = JSON_extractor(rlist,url);
  var lib_scores = get_total_positivity(liberal_feels);
  var con_scores = get_total_positivity(conservative_feels);
  
  var lbias = Math.abs(lib_scores[0] - lib_scores[1]);
  var rbias = Math.abs(con_scores[0] - con_scores[1]);
  var netbias = parseInt(Math.abs(lbias - rbias));
  if(lbias > rbias)
  {
    var lib_sum = new summary({link : url, bias : netbias, lean : "Liberal"});
    lib_sum.save(function (err,lib_sum) {
      if (err) //TODO
        {}
    });
  }
  else
  {
    var lib_sum = new summary({link : url, bias : netbias, lean : "Conservative"});
    lib_sum.save(function (err,lib_sum) {
      if (err) //TODO
      {}
    });
 
  }
}
