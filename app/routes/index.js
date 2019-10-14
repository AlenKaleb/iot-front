
module.exports = function(application, req, res){
	
	application.get('/',  function(req, res, next){
		// const page = req.params.page;
		// console.log(req);
	    application.app.controllers.index.index(application, req, res, next);
	});

}