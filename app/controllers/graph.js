module.exports.index = function(application, req, res, next){
  var db = application.app.db;
  var Pessoas = db.Pessoas;
  var page = req.query.page;
  console.log(req);
};

module.exports.edit = function(id, application, req, res){
    var db = application.app.db;
    res.render('./pessoa/form', { validacao : [], pessoa: doc });
};