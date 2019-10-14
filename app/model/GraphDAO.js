function GraphDAO(connect){
	this._connect = connect;
}

GraphDAO.prototype.getData = function(callback){
    // Get the documents collection
	// var collection = this._connect.pessoa.find();
	  return this._connect
}

module.exports = function(){
	return GraphDAO;
}

// class PessoaDAO {
// 	this._nome;

// 	contructor(nome){
// 		this.nome = nome;
// 	}

// 	function getNome(){
// 		return nome;
// 	}
// }

