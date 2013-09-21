
/*
 * GET home page.
 */

exports.text = function(req, res){
  res.render('about', { title: 'UnBias.Me', checkPage: 'about' });
};
