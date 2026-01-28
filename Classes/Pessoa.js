class Pessoa {
    constructor(id_unico, nome, cpf, email, senha){
        this.id_unico = id_unico;
        this.nome = nome;
        this.cpf = cpf;
        this.email = email;
        this.senha = senha;
    }
    static getNome(){ 
        return this.nome;
    }
    static getCPF(){ 
        return this.cpf;
    }
    static getEmail(){ 
        return this.email;
    }
    static getSenha(){ 
        return this.senha;
    }
    static getID(){
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