
/*
 * GET home page.
 */

exports.text = function(req, res){
  res.render('about', { title: 'UnBias.Me', checkPage: 'about' });
};

exports.postUrl = function(req, res) {
  res.send(req.body);
};
