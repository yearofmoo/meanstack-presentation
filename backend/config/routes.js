module.exports = function(app) {
  //Article Routes
  var articles = require('../app/controllers/articles');
  app.get('/articles', articles.all);
  app.post('/articles', articles.create);
  app.get('/articles/:articleId', articles.show);
  app.put('/articles/:articleId', articles.update);
  app.del('/articles/:articleId', articles.destroy);

  //Finish with setting up the articleId param
  app.param('articleId', articles.article);
};
