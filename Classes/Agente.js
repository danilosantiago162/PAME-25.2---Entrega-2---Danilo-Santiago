//Classe filha Agente, herda os parâmtros do pai
class Agente extends Pessoa{
    constructor(id_unico, nome, cpf, email, senha, numero_matricula){

        super(id_unico, nome, cpf, email, senha);
        this.numero_matricula = numero_matricula;
        this.tipo = "agente"; //facilita na identificação do tipo de pessoa

    }
    getNumMatricula(){
        return this.numero_matricula;
    }
    setNumMatricula(n) {
        this.numero_matricula = n
    }
}