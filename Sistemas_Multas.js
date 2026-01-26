console.log("Teste");

const requisicao = require("readline-sync");
const fs = require("fs");

function gerarIdUnico() {
    const numeros = Math.floor(10000000 + Math.random() * 90000000);
    const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const l1 = letras[Math.floor(Math.random() * letras.length)];
    const l2 = letras[Math.floor(Math.random() * letras.length)];

    return `${numeros}${l1}${l2}`;
}

function gerarNumMatricula() {

    const numMatricula = Math.floor(10000000 + Math.random() * 90000000);

    return `${numMatricula}`;

}

function carregarCondutores() {

    const condutores = fs.readFileSync("condutores.json", "utf-8");
    return JSON.parse(condutores);

}

function carregarAgentes() {

    const agentes = fs.readFileSync("agentes.json", "utf-8");
    return JSON.parse(agentes);

}

function PaginaInicial(){
    var opcao = requisicao.question("Bem vindo ao sistema de controle da Segue o Fluxo: " + "\n \n" + 
    "O que deseja fazer? \n \n" + " Cadastro: Aperte 1 \n login: Aperte 2 \n Sair do Sistema: Aperte 3 \n"
    );

    if (opcao == "1"){
        sistema.cadastro();
    }

    if (opcao == "2"){
        sistema.login();
    }

    if (opcao == "3"){
        //sistema.sair();
    }
}

class Pessoa {
    constructor(id_unico, nome, cpf, email, senha){
        this.id_unico = id_unico;
        this.nome = nome;
        this.cpf = cpf;
        this.email = email;
        this.senha = senha;
    }
}

class Condutor extends Pessoa{
    constructor(id_unico, nome, cpf, email, senha,data_de_nascimento){

        super(id_unico, nome, cpf, email, senha);
        this.data_de_nascimento = data_de_nascimento;
        this.tipo = "condutor";
    }
}

class Agente extends Pessoa{
    constructor(id_unico, nome, cpf, email, senha, numero_matricula){

        super(id_unico, nome, cpf, email, senha);
        this.numero_matricula = numero_matricula;
        this.tipo = "agente";

    }
}

class Veiculo{
    constructor(placa, modelo, marca, cor){
        this.placa = placa;
        this.modelo = modelo;
        this.marca = marca;
        this.cor = cor;
    }
}

class Multa{
    constructor(id_unico, id_cliente, tipo_infracao, valor, data_aplicacao, status){
        this.id_unico = id_unico;
        this.id_cliente = id_cliente;
        this.tipo_infracao = tipo_infracao;
        this.valor = valor;
        this.data_aplicacao = data_aplicacao;
        this.status = status;
    }
}

class Sistema{

    cadastro(){

        let id_unico = gerarIdUnico();
        let nome = requisicao.question("Qual seu nome? ");
        let cpf = requisicao.question("Qual seu cpf? ");
        let email = requisicao.question("Insira seu email: ");
        let senha = requisicao.question("Insira sua senha: ");

        let opcao = requisicao.question("Caso queira se cadastrar como um novo condutor aperte 1, caso queira se cadastrar como um novo agente aperte 2 \n");

        if (opcao == "1"){
            let data_de_nascimento = requisicao.question("Qual sua data de nascimento? ");

            let condutor;

            condutor = new Condutor(id_unico, nome, cpf, email, senha, data_de_nascimento);

            this.salvar_condutor(condutor);

            console.log("Cadastro realizado com sucesso!!");

            console.log(condutor);
        }

        if (opcao == "2"){

            let numero_matricula = gerarNumMatricula();

            let agente;

            agente = new Agente(id_unico, nome, cpf, email, senha, numero_matricula);

            this.salvar_agente(agente);

            console.log("Cadastro realizado com sucesso!!");

            console.log(agente);
        }
    }

    login(){

        let opcao = requisicao.question("Se voce for um condutor cadastrado, aperte 1. \nSe voce for um agente cadastrado, aperte 2? \n")

        let email = requisicao.question("Insira seu email: ");
        let senha = requisicao.question("Insira sua senha: ");


        switch(opcao){
            case "1":

                let condutores = carregarCondutores();
                let condutor_encontrado = condutores.find(condutor => condutor.email === email && condutor.senha === senha);

                if (!condutor_encontrado){
                    console.log("Email ou senha incorreto");
                } else {

                    console.log("Login realizado com sucesso!");
                    //condutor_logado();
                }
                break;
            case "2":

                let agentes = carregarAgentes();
                let agente_encontrado = agentes.find(agente => agente.email === email && agente.senha === senha);

                if (!agente_encontrado){
                    console.log("Email ou senha incorreto");
                } else {

                    console.log("Login realizado com sucesso!");
                    //agente_logado();
                }
        }
    }

    salvar_condutor(condutor_add){
        let condutores_lista = [];

        if (fs.existsSync("condutores.json")){
            condutores_lista = JSON.parse(fs.readFileSync("condutores.json", "utf-8"));
        }

        condutores_lista.push(condutor_add);

        fs.writeFileSync("condutores.json", JSON.stringify(condutores_lista, null, 2));
    }

    salvar_agente(agente_add){
        let agentes_lista = [];

        if (fs.existsSync("agentes.json")){
            agentes_lista = JSON.parse(fs.readFileSync("agentes.json", "utf-8"));
        }

        agentes_lista.push(agente_add);

        fs.writeFileSync("agentes.json", JSON.stringify(agentes_lista, null, 2));
    }


}

var sistema = new Sistema();

PaginaInicial();

