const Pessoa = require("./Pessoa");
//Classe filha Condutor, herda os parâmtros do pai
class Condutor extends Pessoa{
    constructor(id_unico, nome, cpf, email, senha, data_de_nascimento){

        super(id_unico, nome, cpf, email, senha);
        this.data_de_nascimento = data_de_nascimento;
        this.tipo = "condutor"; //facilita na identificação do tipo de pessoa
    }
    getDataNascimento(){
        return this.data_de_nascimento;
    }
    setDataNascimento(data){
        this.data_de_nascimento = data;
    }
}
module.exports = Condutor;