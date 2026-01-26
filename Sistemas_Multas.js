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
    var opcao = requisicao.question("\nBem vindo ao sistema de controle da Segue o Fluxo: " + "\n \n" + 
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

function PaginaCondutor(condutor){
    let opcao = requisicao.question(
        "\nBem vindo a pagina do condutor, selecione a opcao de interesse:\n" +
        "Aperte 1: Ver meus dados \n" +
        "Aperte 2: Ver minhas multas \n"+
        "Aperte 3: Cadastrar Veiculo \n"+
        "Aperte 4: Pagar multa \n"+
        "Aperte 5: Recorrer multa \n"
        );
    
    switch(opcao){
        case "1":
            //sistema.ver_dados_condutor(condutor);
            PaginaCondutor(condutor);
        case "2":
            //sistema.ver_minhas_multas(condutor);
            PaginaCondutor(condutor);
        case "3":
            sistema.cadastrar_veiculo();
            PaginaCondutor(condutor);
        case "4":
            //sistema.pagar_multa();
            PaginaCondutor(condutor);
        case "5":
            //sistema.recorrer_multa();
            PaginaCondutor(condutor);
        
    }
}

function PaginaAgente(agente){
    let opcao = requisicao.question(
        "\nBem vindo a pagina do agente, selecione a opcao de interesse:\n" +
        "Aperte 1: Ver meus dados \n" +
        "Aperte 2: Ver lista de veiculos \n"+
        "Aperte 3: Ver lista de condutores \n"+
        "Aperte 4: Aplicar multa \n"+
        "Aperte 5: Ver multas \n"+
        "Aperte 6: Alterar status da multa"
        );
    switch(opcao){
        case "1":
            console.log(agente);
        case "2":

        case "3":
        case "4":
            sistema.aplicar_multa();
        case "5":
        
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

    constructor() {
        this.usuariologado = null;
        this.agentelogado = null;
    }

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

            PaginaInicial();
        }

        if (opcao == "2"){

            let numero_matricula = gerarNumMatricula();

            let agente;

            agente = new Agente(id_unico, nome, cpf, email, senha, numero_matricula);

            this.salvar_agente(agente);

            console.log("Cadastro realizado com sucesso!!");

            console.log(agente);

            PaginaInicial();
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
                    this.login();
                } else {

                    console.log("Login realizado com sucesso!");
                    this.usuariologado = condutor_encontrado;
                    PaginaCondutor(this.usuariologado);
                    //condutor_logado();
                }
                break;
            case "2":

                let agentes = carregarAgentes();
                let agente_encontrado = agentes.find(agente => agente.email === email && agente.senha === senha);

                if (!agente_encontrado){
                    console.log("Email ou senha incorreto");
                    this.login();
                } else {

                    console.log("Login realizado com sucesso!");
                    this.agentelogado = agente_encontrado;
                    PaginaAgente(this.agentelogado);
                    //agente_logado();
                }
                break;
        }
    }

    aplicar_multa(){

        let id_unico = gerarIdUnico();

        let id_cliente = requisicao.question("Insira o id_unico do multado: ");
        let tipo_infracao = requisicao.question("Qual o tipo de infracao? ");
        let valor = requisicao.question("Qual o valor da infracao? ");

        const dia = new Date().getDate();
        const mes = new Date().getMonth() + 1;
        const ano = new Date().getFullYear();

        let data_aplicacao = `${dia}/${mes}/${ano}`;

        let status = requisicao.question("Insira o status da multa: ");

        let multa = new Multa(id_unico, id_cliente, tipo_infracao, valor, data_aplicacao, status);

        this.salvar_multa(multa);

        console.log("Aplicacao de multa realizada com sucesso!!");

        console.log(multa);
    }

    cadastrar_veiculo(){
        let placa = requisicao.question("Qual a placa do veiculo? ");
        let modelo = requisicao.question("Qual o modelo do veiculo? ");
        let marca = requisicao.question("Qual a marca do veiculo? ");
        let cor = requisicao.question("Qual a cor do veiculo? ");

        let veiculo = new Veiculo(placa, modelo, marca, cor);

        this.salvar_veiculo(veiculo);

        console.log("Cadastro realizado com sucesso!!");

        console.log(veiculo);
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

    salvar_multa(multa_add){
        let multas_lista = [];

        if (fs.existsSync("multas.json")){
            multas_lista = JSON.parse(fs.readFileSync("multas.json", "utf-8"));
        }

        multas_lista.push(multa_add);

        fs.writeFileSync("multas.json", JSON.stringify(multas_lista, null, 2));
    }

    salvar_veiculo(veiculo_add){
        let veiculos_lista = [];

        if (fs.existsSync("veiculos.json")){
            veiculos_lista = JSON.parse(fs.readFileSync("veiculos.json", "utf-8"));
        }

        veiculos_lista.push(veiculo_add);

        fs.writeFileSync("veiculos.json", JSON.stringify(veiculos_lista, null, 2));
    }


}

var sistema = new Sistema();

PaginaInicial();

