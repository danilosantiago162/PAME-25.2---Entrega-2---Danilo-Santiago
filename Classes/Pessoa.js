class Pessoa {
    constructor(id_unico, nome, cpf, email, senha){
        this.id_unico = id_unico;
        this.nome = nome;
        this.cpf = cpf;
        this.email = email;
        this.senha = senha;
    }
    getNome(){ 
        return this.nome;
    }
    getCPF(){ 
        return this.cpf;
    }
    getEmail(){ 
        return this.email;
    }
    getSenha(){ 
        return this.senha;
    }
    getID(){
        return this.id_unico;
    }
    setNome(nome){
        this.nome = nome;
    }
    setCPF(cpf){
        this.cpf = cpf;
    }
    setEmail(email){
        this.email = email;
    }
    setSenha(senha){
        this.senha = senha;
    }
}

module.exports = Pessoa;