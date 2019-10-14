module.exports = function(application, req, res){

	application.get('/graph/', function(req, res, next){
		// const page = req.params.page;
		// console.log(req);
	    application.app.controllers.pessoas.index(application, req, res, next);
	});

	application.get('/pessoa/create',function(req,res){
	    application.app.controllers.pessoas.create(application, req, res);
	});

	application.get('/pessoa/edit/:id',function(req,res){
		const id = req.params.id;
		application.app.controllers.pessoas.edit(id, application, req, res);
	});

	application.post('/pessoa/create',function(req,res){
	    application.app.controllers.pessoas.store(application, req, res);
	});

	application.post('/pessoa/edit/:id',function(req,res){
	    application.app.controllers.pessoas.update(application, req, res);
	});

	application.post('/pessoa/delete/:id',function(req,res){
	    application.app.controllers.pessoas.remove(application, req, res);
	});

}