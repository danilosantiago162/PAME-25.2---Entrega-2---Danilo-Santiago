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

function carregarMultas() {

    const multas = fs.readFileSync("multas.json", "utf-8");
    return JSON.parse(multas);

}

function carregarVeiculos() {

    const veiculos = fs.readFileSync("veiculos.json", "utf-8");
    return JSON.parse(veiculos);

}

function conferir_cpf_duplo_condutor(cpf) {
    let condutores = carregarCondutores();
    
    let condutor_encontrado = condutores.find(c => c.cpf === cpf);

    if (condutor_encontrado){
        console.log("\nCPF já cadastrado!");
        return true;
    } else {
        return false;
    }
}

function conferir_cpf_duplo_agente(cpf) {
    let agentes = carregarAgentes();

    let agente_encontrado = agentes.find( a => a.cpf === cpf);

    if (agente_encontrado){
        console.log("\nCPF já cadastrado!");
        return true;
    } else {
        return false;
    }
}

function PaginaInicial(){
    var opcao = requisicao.question("\nBem vindo ao sistema de controle da Segue o Fluxo: " + "\n \n" + 
    "O que deseja fazer? \n \n" + "Aperte 1: Cadastre-se \nAperte 2: Login \nAperte 3: Sair do Sistema \n"
    );

    if (opcao == "1"){
        sistema.cadastro();
    }

    if (opcao == "2"){
        sistema.login();
    }

    if (opcao === "3") {
        console.log("Encerrando o sistema...");
        process.exit(0);
    }

}

function PaginaCondutor(condutor){

    while (true) { 
        let opcao = requisicao.question(
            "\nBem vindo a pagina do condutor, selecione a opcao de interesse:\n" +
            "Aperte 1: Ver meus dados \n" +
            "Aperte 2: Ver minhas multas \n"+
            "Aperte 3: Cadastrar Veiculo \n"+
            "Aperte 4: Pagar multa \n"+
            "Aperte 5: Recorrer multa \n"+
            "Aperte 6: Alterar meus dados\n"
            ); 
        switch(opcao){
            case "1":
                sistema.ver_dados_condutor(condutor);
                break;
            case "2":
                sistema.ver_minhas_multas(condutor.id_unico);
                break;
            case "3":
                sistema.cadastrar_veiculo();
                break;
            case "4":
                sistema.pagar_multa(condutor.id_unico);
                break;
            case "5":
                sistema.recorrer_multa(condutor.id_unico);
                break;
            case "6":
                sistema.alterar_dados_condutor(condutor);
                break; 
            case "0":
                console.log("\nSaindo da página do condutor...");
                PaginaInicial();
            default:
                console.log("opcao invalida");
        }
    }
}

function PaginaAgente(agente){

    while (true) { 
        let opcao = requisicao.question(
            "\nBem vindo a pagina do agente, selecione a opcao de interesse:\n" +
            "Aperte 1: Ver meus dados \n" +
            "Aperte 2: Ver lista de veiculos \n"+
            "Aperte 3: Ver lista de condutores \n"+
            "Aperte 4: Aplicar multa \n"+
            "Aperte 5: Ver multas \n"+
            "Aperte 6: Alterar status da multa\n"+
            "Aperte 7: Alterar meus dados\n"+
            "Aperte 0: Voltar a Pagina Inicial"
            );
    
        switch(opcao){
            case "1":
                sistema.ver_dados_agente(agente);
                break;
            case "2":
                sistema.ver_lista_veiculos();
                break;
            case "3":
                sistema.ver_lista_condutores();
                break;
            case "4":
                sistema.aplicar_multa();
                break;
            case "5":
                sistema.ver_multas();
                break;
            case "6":
                sistema.alterar_status_multa();
                break;
            case "7":
                sistema.alterar_dados_agente(agente);
                break;   
            case "0":
                console.log("\nSaindo da página do condutor...");
                return PaginaInicial();
        }
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
    constructor(id_unico, nome, cpf, email, senha, data_de_nascimento){

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
        this.condutorlogado = null;
        this.agentelogado = null;
    }

    cadastro(){

        let id_unico = gerarIdUnico();
        let nome = requisicao.question("Qual seu nome? ");
        let cpf = requisicao.question("Qual seu cpf? ");
        let email = requisicao.question("Insira seu email: ");
        let senha = requisicao.question("Insira sua senha: ", {hideEchoBack:true});

        let opcao = requisicao.question("Caso queira se cadastrar como um novo condutor aperte 1, caso queira se cadastrar como um novo agente aperte 2 \n");

        if (opcao == "1"){

            if (!conferir_cpf_duplo_condutor(cpf)){ 

            let data_de_nascimento = requisicao.question("Qual sua data de nascimento? ");

            let condutor;

            condutor = new Condutor(id_unico, nome, cpf, email, senha, data_de_nascimento);

            this.salvar_condutor(condutor);

            console.log("\nCadastro realizado com sucesso!!");

            console.log(condutor);
            } 
            PaginaInicial();
        }

        if (opcao == "2"){

            if (!conferir_cpf_duplo_agente(cpf)){ 

            let numero_matricula = gerarNumMatricula();

            let agente;

            agente = new Agente(id_unico, nome, cpf, email, senha, numero_matricula);

            this.salvar_agente(agente);

            console.log("Cadastro realizado com sucesso!!");

            console.log(agente);
            }
            PaginaInicial();
        }
    }

    login(){

        let opcao = requisicao.question("Aperte 1: Condutor cadastrado\nAperte 2: Agente cadastrado\n")

        let email = requisicao.question("\nInsira seu email: ");
        let senha = requisicao.question("Insira sua senha: ", {hideEchoBack:true});


        switch(opcao){
            case "1":

                let condutores = carregarCondutores();
                let condutor_encontrado = condutores.find(condutor => condutor.email === email && condutor.senha === senha);

                if (!condutor_encontrado){
                    console.log("\nEmail ou senha incorreto");
                    this.login();
                } else {

                    console.log("\nLOGIN REALIZADO COM SUCESSO!!");
                    this.condutorlogado = condutor_encontrado;
                    PaginaCondutor(this.condutorlogado);// usado para "levar" a variável condutor_encontrado para página do condutorlogado
                }
                break;
            case "2":

                let agentes = carregarAgentes();
                let agente_encontrado = agentes.find(agente => agente.email === email && agente.senha === senha);

                if (!agente_encontrado){
                    console.log("\nEmail ou senha incorreto\n");
                    this.login();
                } else {

                    console.log("\nLOGIN REALIZADO COM SUCESSO!!\n");
                    this.agentelogado = agente_encontrado;
                    PaginaAgente(this.agentelogado);// usado para "levar" a variável agente_encontrado para página do agentelogado
                
                }
                break;
        }
    }

    ver_dados_agente(agente){
        console.log(agente);
    }

    ver_lista_veiculos(){

        let veiculos = carregarVeiculos();

        console.log(veiculos);
    }

    ver_lista_condutores(){

        let condutores = carregarCondutores();

        console.log(condutores);
    }

    alterar_status_multa(){
        let multas = carregarMultas();

        let id_unico = requisicao.question("\nInsira o id_unico da multa que deseja alterar o status: ");

        let multa_escolhida = multas.find( multas => multas.id_unico === id_unico);

        let status_novo = requisicao.question("\nInsira o novo status da multa " + multa_escolhida.id_unico +": ");

        multa_escolhida.status = status_novo;

        fs.writeFileSync("multas.json", JSON.stringify(multas, null, 2));

        console.log("\nSTATUS MUDADO COM SUCESSO!!\n");

        return;
    }

    aplicar_multa(){

        let id_unico = gerarIdUnico();

        let id_cliente = requisicao.question("\nInsira o id_unico do multado: ");
        let tipo_infracao = requisicao.question("Qual o tipo de infracao? ");
        let valor = requisicao.question("Qual o valor da infracao? ");

        const dia = new Date().getDate();
        const mes = new Date().getMonth() + 1;
        const ano = new Date().getFullYear();

        let data_aplicacao = `${dia}/${mes}/${ano}`;

        let status = requisicao.question("Insira o status da multa: ");

        let multa = new Multa(id_unico, id_cliente, tipo_infracao, valor, data_aplicacao, status);

        this.salvar_multa(multa);

        console.log("\nMULTA APLICADA COM SUCESSO!!\n");

        console.log(multa);
    }

    alterar_dados_agente(agente){
        let opcao = requisicao.question(
            "\nQual dado gostaria de mudar?\n " +
            "Aperte 1: nome"+
            "Aperte 2: email"+
            "Aperte 3: senha"+
            "Aperte 4: cpf"  
        );

        let agentes = carregarAgentes();
        let agente_encontrado = agentes.find( a => a.id_unico === agente.id_unico);

        switch(opcao){

            case "1":

                let nome = requisicao.question("\nQual seu novo nome? ")
                agente_encontrado.nome = nome;
                fs.writeFileSync("agentes.json", JSON.stringify(agentes, null, 2));
                Object.assign(agente, agente_encontrado);
                break;
            
            case "2":

                let email = requisicao.question("\nQual seu novo email? ");
                agente_encontrado.email = email;
                fs.writeFileSync("agentes.json", JSON.stringify(agentes, null, 2));
                Object.assign(agente, agente_encontrado);
                break;

            case "3":

                let senha = requisicao.question("\nQual sua nova senha?" , {hideEchoBack:true});
                agente_encontrado.senha = senha;
                fs.writeFileSync("agentes.json", JSON.stringify(agentes, null, 2));
                Object.assign(agente, agente_encontrado);
                break;
            
            case "4":

                let cpf = requisicao.question("\nQual seu novo cpf? ")
                agente_encontrado.cpf = cpf;
                fs.writeFileSync("agentes.json", JSON.stringify(agentes, null, 2));
                Object.assign(agente, agente_encontrado);
                break;
        }

        console.log("\nDADOS ALTERADOS COM SUCESSO!!\n");

        return;
    }
    

    ver_dados_condutor(condutor) {
        console.log(condutor);
    }

    ver_multas(){

        let multas = carregarMultas();

        console.log(multas);

        return
    }

    ver_minhas_multas(id_cliente) {

        let multas = carregarMultas();
        let multas_encontradas = multas.filter( multa => multa.id_cliente === id_cliente);

        if (multas_encontradas.length === 0){
            console.log("\nNenhuma multa encontrada!\n")
            return;
        }

        console.log(multas_encontradas);

    }

    pagar_multa(id_cliente) {

        this.ver_minhas_multas(id_cliente);

        let opcao = requisicao.question("\nInsira o id_unico da multa que quer pagar: ");

        let multas = carregarMultas();
        let multa_encontrada = multas.find( multa => multa.id_unico === opcao);

        multa_encontrada.status = "paga";

        fs.writeFileSync("multas.json", JSON.stringify(multas, null, 2));

        console.log("\nMULTA PAGA!!\n");

    }

    recorrer_multa(id_cliente) {

        this.ver_minhas_multas(id_cliente);

        let opcao = requisicao.question("\nInsira o id_unico da multa que quer recorrer: ");

        let multas = carregarMultas();
        let multa_encontrada = multas.find( multa => multa.id_unico === opcao);

        multa_encontrada.status = "recorrida";

        fs.writeFileSync("multas.json", JSON.stringify(multas, null, 2));

        console.log("\nMULTA RECORRIDA!!\n");

    }

    cadastrar_veiculo(){
        let placa = requisicao.question("\nQual a placa do veiculo? ");
        let modelo = requisicao.question("Qual o modelo do veiculo? ");
        let marca = requisicao.question("Qual a marca do veiculo? ");
        let cor = requisicao.question("Qual a cor do veiculo? ");

        let veiculo = new Veiculo(placa, modelo, marca, cor);

        this.salvar_veiculo(veiculo);

        console.log("\nCADASTRO REALIZADO COM SUCESSO!!\n");

        console.log(veiculo);
    }

    alterar_dados_condutor(condutor){

        let opcao = requisicao.question(
            "\nQual dado gostaria de mudar?\n " +
            "Aperte 1: nome"+
            "Aperte 2: email"+
            "Aperte 3: senha"+
            "Aperte 4: cpf"+
            "Aperte 5: data de nascimento\n"
        );

        let condutores = carregarCondutores();
        let condutor_encontrado = condutores.find( c => c.id_unico === condutor.id_unico);

        switch(opcao){

            case "1":

                let nome = requisicao.question("\nQual seu novo nome? ")
                condutor_encontrado.nome = nome;
                fs.writeFileSync("condutores.json", JSON.stringify(condutores, null, 2));
                Object.assign(condutor, condutor_encontrado);
                break;
            
            case "2":

                let email = requisicao.question("\nQual seu novo email? ");
                condutor_encontrado.email = email;
                fs.writeFileSync("condutores.json", JSON.stringify(condutores, null, 2));
                Object.assign(condutor, condutor_encontrado);
                break;

            case "3":

                let senha = requisicao.question("\nQual sua nova senha? ", {hideEchoBack:true});
                condutor_encontrado.senha = senha;
                fs.writeFileSync("condutores.json", JSON.stringify(condutores, null, 2));
                Object.assign(condutor, condutor_encontrado);
                break;
            
            case "4":

                let cpf = requisicao.question("\nQual seu novo cpf? ")
                condutor_encontrado.cpf = cpf;
                fs.writeFileSync("condutores.json", JSON.stringify(condutores, null, 2));
                Object.assign(condutor, condutor_encontrado);
                break;
            
            case "5":

                let data_de_nascimento = requisicao.question("\nQual sua nova data de nascimento? ")
                condutor_encontrado.data_de_nascimento = data_de_nascimento;
                fs.writeFileSync("condutores.json", JSON.stringify(condutores, null, 2));
                Object.assign(condutor, condutor_encontrado);
                break;
        }
        console.log("\nDADOS ALTERADOS COM SUCESSO!!\n");

        return;
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

