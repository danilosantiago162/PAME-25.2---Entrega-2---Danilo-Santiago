//Ferramentas para input e arquivo .json
const requisicao = require("readline-sync");
const fs = require("fs");

//função que gera id_unico, garantindo a não duplicidade
function gerarIdUnico() {

    let multas = carregarMultas();
    let condutores = carregarCondutores();
    let agentes = carregarAgentes();

    while (true) { 
        const numeros = Math.floor(10000000 + Math.random() * 90000000);
        const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const l1 = letras[Math.floor(Math.random() * letras.length)];
        const l2 = letras[Math.floor(Math.random() * letras.length)];

        var id_unico = `${numeros}${l1}${l2}`;

        let multa_existente = multas.find( m => m.id_unico === id_unico); 
        let condutor_existente = condutores.find( c => c.id_unico === id_unico); 
        let agente_existente = agentes.find( a => a.id_unico === id_unico); 

        if (!multa_existente && !condutor_existente && !agente_existente){
            return id_unico;
        }
    }
}

//função que gera número de matrícula
//implementar não duplicidade
function gerarNumMatricula() {

    const numMatricula = Math.floor(10000000 + Math.random() * 90000000);

    return `${numMatricula}`;

}


function carregarCondutores() { //armazena o conteúdo do arquivo json para posterior alteração

    const condutores = fs.readFileSync("condutores.json", "utf-8");
    return JSON.parse(condutores);

}

function carregarAgentes() { //armazena o conteúdo do arquivo json para posterior alteração

    const agentes = fs.readFileSync("agentes.json", "utf-8");
    return JSON.parse(agentes);

}

function carregarMultas() { //armazena o conteúdo do arquivo json para posterior alteração

    const multas = fs.readFileSync("multas.json", "utf-8");
    return JSON.parse(multas);

}

function carregarVeiculos() { //armazena o conteúdo do arquivo json para posterior alteração

    const veiculos = fs.readFileSync("veiculos.json", "utf-8");
    return JSON.parse(veiculos);

}

//função que confere a duplicidade de cpfs, chamada no cadastro
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
//função que confere a duplicidade de cpfs, chamada no cadastro
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
//função que confere incoerência na data de nascimento
function conferir_data_de_nascimento(data) {
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = data.match(regex);

    if (!match) return false;

    const dia = Number(match[1]);
    const mes = Number(match[2]);
    const ano = Number(match[3]);

    const dataObj = new Date(ano, mes - 1, dia);

    return (
        dataObj.getFullYear() === ano &&
        dataObj.getMonth() === mes - 1 &&
        dataObj.getDate() === dia
    );
}

//PÁGINA INICIAL - Primeira a ser chamada, hub incial
function PaginaInicial(){
    var opcao = requisicao.question(
        "\nBem vindo ao sistema de controle da Segue o Fluxo: " + "\n \n" + "O que deseja fazer? \n \n" + "Aperte 1: Cadastre-se \nAperte 2: Login \nAperte 3: Sair do Sistema \n"
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
//Página do condutor logado
function PaginaCondutor(condutor){

    while (true) { //garante que após cada execução de opção o usuário volte para página do condutor logado
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
//Página do agente
function PaginaAgente(agente){

    while (true) { //garante que após cada execução de opção o usuário volte para página do condutor logado
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
//Class Pessoa, classe pai de condutor e agente
class Pessoa {
    constructor(id_unico, nome, cpf, email, senha){
        this.id_unico = id_unico;
        this.nome = nome;
        this.cpf = cpf;
        this.email = email;
        this.senha = senha;
    }
}
//Classe filha Condutor, herda os parâmtros do pai
class Condutor extends Pessoa{
    constructor(id_unico, nome, cpf, email, senha, data_de_nascimento){

        super(id_unico, nome, cpf, email, senha);
        this.data_de_nascimento = data_de_nascimento;
        this.tipo = "condutor"; //facilita na identificação do tipo de pessoa
    }
}
//Classe filha Agente, herda os parâmtros do pai
class Agente extends Pessoa{
    constructor(id_unico, nome, cpf, email, senha, numero_matricula){

        super(id_unico, nome, cpf, email, senha);
        this.numero_matricula = numero_matricula;
        this.tipo = "agente"; //facilita na identificação do tipo de pessoa

    }
}
//Classe Veiculo
class Veiculo{
    constructor(placa, modelo, marca, cor){
        this.placa = placa;
        this.modelo = modelo;
        this.marca = marca;
        this.cor = cor;
    }
}
//Classe Multa
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
//Classe Sistema, onde todas operações acontecem
class Sistema{

    constructor() {
        this.condutorlogado = null;
        this.agentelogado = null;
    }

    cadastro(){ //cadastro tanto de condutor quanto agente

        let id_unico = gerarIdUnico();
        let nome = requisicao.question("Qual seu nome? ");

        let cpf = requisicao.question("Qual seu cpf? (APENAS NUMEROS) ");

        if (cpf.length !== 11){ // verificação de coerência no número cpf
            console.log("\nCPF INVÁLIDO!!");
            PaginaInicial();
        }

        let email = requisicao.question("Insira seu email: ");

        if (!email.includes("@gmail.com")) { //verificação de coerência no email
        console.log("Email inválido. Use um email @gmail.com");
        return;
}
        let senha = requisicao.question("Insira sua senha: ", {hideEchoBack:true}); //senha com proteção visual

        let opcao = requisicao.question("\nAperte 1: Novo condutor\nAperte 2: Novo agente \n");

        if (opcao == "1"){

            if (!conferir_cpf_duplo_condutor(cpf)){ //verificação de duplicidade de cpf em condutores

                let data_de_nascimento = requisicao.question("Qual sua data de nascimento? (DD/MM/AAAA) ");
                    
                if(!conferir_data_de_nascimento(data_de_nascimento)){ //verificação de coerência na data de nascimento 
                    console.log("\nDATA INVALIDA!!\n");
                    PaginaInicial();
                }

                let condutor;

                condutor = new Condutor(id_unico, nome, cpf, email, senha, data_de_nascimento); //criação de objeto da classe Condutor

                //chamada de função que armazena o objeto em arquivo .json, vale ressaltar
                //que o objeto não é guardado no arquivo como objeto
                this.salvar_condutor(condutor); 
                console.log("\nCadastro realizado com sucesso!!\n");

                console.log(condutor); //print do novo condutor
                } 
            PaginaInicial();
        }

        if (opcao == "2"){

            if (!conferir_cpf_duplo_agente(cpf)){ //verificação de duplicidade de cpf em agentes

            let numero_matricula = gerarNumMatricula(); //chamada da função geradora de matrículas

            let agente;

            agente = new Agente(id_unico, nome, cpf, email, senha, numero_matricula); //criação de objeto da classe Agente

            this.salvar_agente(agente); //chamada de função que armazena objeto em arquivo .json

            console.log("Cadastro realizado com sucesso!!");

            console.log(agente); //print do novo agente
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

                //procura condutor no arquivo .json 
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

                //procura agente no arquivo .json 
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
    //print dos dados do agente
    ver_dados_agente(agente){
        console.log(agente);
    }
    //print da lista de veículos
    ver_lista_veiculos(){

        let veiculos = carregarVeiculos(); //variável veiculos recebe conteúdo do arquivo veiculos.json

        console.log(veiculos);
    }
    //print da lista de condutores
    ver_lista_condutores(){

        let condutores = carregarCondutores(); //variável condures recebe conteúdo do arquivo condutores.json

        console.log(condutores);
    }

    //método que altera status de multa
    alterar_status_multa(){
        let multas = carregarMultas();

        let id_unico = requisicao.question("\nInsira o id_unico da multa que deseja alterar o status: ");

        let multa_escolhida = multas.find( multas => multas.id_unico === id_unico); //verifica a existência de uma multa com o id_unico informado

        let status_novo = requisicao.question("\nInsira o novo status da multa " + multa_escolhida.id_unico +": ");

        multa_escolhida.status = status_novo; //muda status anterior para o fornecido acima

        //reescreve o arquivo multas.json
        //Ao fazer a linha acima, o status da multa_escolhida já foi mudado na memória, porém não foi escrito no arquivo
        //a linha abaixo atualiza o arquivo
        fs.writeFileSync("multas.json", JSON.stringify(multas, null, 2));

        console.log("\nSTATUS MUDADO COM SUCESSO!!\n");

        return;
    }
    //método para aplicação de multa
    aplicar_multa(){

        let id_unico = gerarIdUnico();

        let id_cliente = requisicao.question("\nInsira o id_unico do multado: ");
        let tipo_infracao = requisicao.question("Qual o tipo de infracao? ");
        let valor = requisicao.question("Qual o valor da infracao? "); 

        const dia = new Date().getDate(); //pega dia de hoje
        const mes = new Date().getMonth() + 1; //pega o mês atual
        const ano = new Date().getFullYear(); //pega o ano atual

        let data_aplicacao = `${dia}/${mes}/${ano}`;

        let status = requisicao.question("Insira o status da multa: ");

        let multa = new Multa(id_unico, id_cliente, tipo_infracao, valor, data_aplicacao, status); //criação de objeto da classe Multa

        this.salvar_multa(multa); //chamada de método que salva as informações do novo objeto no arquivo multas.json

        console.log("\nMULTA APLICADA COM SUCESSO!!\n");

        console.log(multa); //print da nova multa
    }

    alterar_dados_agente(agente){ //método que altera dados do agente
        let opcao = requisicao.question(
            "\nQual dado gostaria de mudar?\n " +
            "Aperte 1: nome"+
            "Aperte 2: email"+
            "Aperte 3: senha"+
            "Aperte 4: cpf"  
        );

        let agentes = carregarAgentes();
        let agente_encontrado = agentes.find( a => a.id_unico === agente.id_unico); //verifica a existência de um agente "a" com id_unico igual ao id_unico do "agente"

        switch(opcao){

            case "1":

                let nome = requisicao.question("\nQual seu novo nome? ")
                agente_encontrado.nome = nome;
                fs.writeFileSync("agentes.json", JSON.stringify(agentes, null, 2)); //salva novo nome
                Object.assign(agente, agente_encontrado); //altera os dados do agente para os dados do agente_encontrado
                break;
            
            case "2":

                let email = requisicao.question("\nQual seu novo email? ");
                if (!email.includes("@gmail.com")) { //verificação de coerência no email
                    console.log("Email inválido. Use um email @gmail.com");
                    return;
                }
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
    
    //função que printa os dadosdo condutor
    ver_dados_condutor(condutor) {
        console.log(condutor);
    }

    //função que printa lista de todas as multas
    ver_multas(){

        let multas = carregarMultas();

        console.log(multas);

        return
    }

    //função que mostra multas do condutor logado
    ver_minhas_multas(id_cliente) {

        let multas = carregarMultas();
        let multas_encontradas = multas.filter( multa => multa.id_cliente === id_cliente); //verifica a existência de uma multa com o id_cliente igual ao id_cliente fonecido como parâmetro
        //vale ressaltar que esse id_cliente é o id_unico do cliente, são a mesma sequência alfanumérica
        //utiliza-se o filter e não o find pois podem ser mais de uma multa, o find mostra apenas 1


        if (multas_encontradas.length === 0){ //verifica a existência de multas
            console.log("\nNenhuma multa encontrada!\n")
            return;
        }

        console.log(multas_encontradas); //print das multas do condutor logado

    }

    pagar_multa(id_cliente) { //método que altera status de multa para "paga" 

        this.ver_minhas_multas(id_cliente);//chamada de método 

        let opcao = requisicao.question("\nInsira o id_unico da multa que quer pagar: ");

        let multas = carregarMultas();
        let multa_encontrada = multas.find( multa => multa.id_unico === opcao);//verifica a existência de uma multa com o id_unico igual ao id_unico informado como parâmetro

        multa_encontrada.status = "paga"; //mudança de status 

        fs.writeFileSync("multas.json", JSON.stringify(multas, null, 2)); //salvamento de mudança

        console.log("\nMULTA PAGA!!\n");

    }

    recorrer_multa(id_cliente) { //método que altera status de multa para "recorrida" 

        this.ver_minhas_multas(id_cliente); //chamada de método 

        let opcao = requisicao.question("\nInsira o id_unico da multa que quer recorrer: "); 

        let multas = carregarMultas();
        let multa_encontrada = multas.find( multa => multa.id_unico === opcao); //verifica a existência de uma multa com o id_unico igual ao id_unico informado como parâmetro

        multa_encontrada.status = "recorrida"; //mudança de status

        fs.writeFileSync("multas.json", JSON.stringify(multas, null, 2)); //salvamento de mudança

        console.log("\nMULTA RECORRIDA!!\n");

    }

    cadastrar_veiculo(){ //cadastro de veículo
        let placa = requisicao.question("\nQual a placa do veiculo? ");
        let modelo = requisicao.question("Qual o modelo do veiculo? ");
        let marca = requisicao.question("Qual a marca do veiculo? ");
        let cor = requisicao.question("Qual a cor do veiculo? ");

        let veiculo = new Veiculo(placa, modelo, marca, cor); //criação de objeto da classe Veiculo

        this.salvar_veiculo(veiculo); //chamada de função que salva informações do novo objeto em arquivo .json

        console.log("\nCADASTRO REALIZADO COM SUCESSO!!\n");

        console.log(veiculo); //print com informações do novo veículo
    }

    alterar_dados_condutor(condutor){ //método que altera dados do condutor

        let opcao = requisicao.question(
            "\nQual dado gostaria de mudar?\n " +
            "Aperte 1: nome"+
            "Aperte 2: email"+
            "Aperte 3: senha"+
            "Aperte 4: cpf"+
            "Aperte 5: data de nascimento\n"
        );

        let condutores = carregarCondutores();
        let condutor_encontrado = condutores.find( c => c.id_unico === condutor.id_unico); //verifica a existência de condutor "c" com id_unico identico ao id_unico do "condutor" 

        switch(opcao){

            case "1":

                let nome = requisicao.question("\nQual seu novo nome? ")
                condutor_encontrado.nome = nome; //mudança de nome
                fs.writeFileSync("condutores.json", JSON.stringify(condutores, null, 2)); //salvamento da mudança
                Object.assign(condutor, condutor_encontrado); //altera dados do condutor para os dados de condutor_encontrado
                break;
            
            case "2":

                let email = requisicao.question("\nQual seu novo email? ");
                condutor_encontrado.email = email;
                if (!email.includes("@gmail.com")) { //verificação de coerência no email
                    console.log("Email inválido. Use um email @gmail.com");
                    return;
                }
                fs.writeFileSync("condutores.json", JSON.stringify(condutores, null, 2));//salvamento da mudança
                Object.assign(condutor, condutor_encontrado);
                break;

            case "3":

                let senha = requisicao.question("\nQual sua nova senha? ", {hideEchoBack:true});
                condutor_encontrado.senha = senha;
                fs.writeFileSync("condutores.json", JSON.stringify(condutores, null, 2));//salvamento da mudança
                Object.assign(condutor, condutor_encontrado);
                break;
            
            case "4":

                let cpf = requisicao.question("\nQual seu novo cpf? ")
                condutor_encontrado.cpf = cpf;
                fs.writeFileSync("condutores.json", JSON.stringify(condutores, null, 2));//salvamento da mudança
                Object.assign(condutor, condutor_encontrado);
                break;
            
            case "5":

                let data_de_nascimento = requisicao.question("\nQual sua nova data de nascimento? ")
                condutor_encontrado.data_de_nascimento = data_de_nascimento;
                fs.writeFileSync("condutores.json", JSON.stringify(condutores, null, 2));//salvamento da mudança
                Object.assign(condutor, condutor_encontrado);
                break;
        }
        console.log("\nDADOS ALTERADOS COM SUCESSO!!\n");

        return;
    }

    salvar_condutor(condutor_add){ //salva novo condutor
        let condutores_lista = [];

        if (fs.existsSync("condutores.json")){
            condutores_lista = JSON.parse(fs.readFileSync("condutores.json", "utf-8")); //variável recebe valores do arquivo .json
        }

        condutores_lista.push(condutor_add); //adiciona novo condutor à lista

        fs.writeFileSync("condutores.json", JSON.stringify(condutores_lista, null, 2)); //salva mudanças
    }

    salvar_agente(agente_add){ //salva novo agente
        let agentes_lista = [];

        if (fs.existsSync("agentes.json")){
            agentes_lista = JSON.parse(fs.readFileSync("agentes.json", "utf-8")); //variável recebe valores do arquivo .json
        }

        agentes_lista.push(agente_add); //adiciona novo agente à lista

        fs.writeFileSync("agentes.json", JSON.stringify(agentes_lista, null, 2)); //salva mudanças
    }

    salvar_multa(multa_add){ //salva nova multa
        let multas_lista = [];

        if (fs.existsSync("multas.json")){
            multas_lista = JSON.parse(fs.readFileSync("multas.json", "utf-8")); //variável recebe valores do arquivo .json
        }

        multas_lista.push(multa_add); //adiciona nova multa à lista

        fs.writeFileSync("multas.json", JSON.stringify(multas_lista, null, 2)); //salva mudanças
    }

    salvar_veiculo(veiculo_add){ //salva novo veiculo
        let veiculos_lista = [];

        if (fs.existsSync("veiculos.json")){
            veiculos_lista = JSON.parse(fs.readFileSync("veiculos.json", "utf-8")); //variável recebe valores do arquivo .json
        }

        veiculos_lista.push(veiculo_add); //adiciona novo veiculo à lista

        fs.writeFileSync("veiculos.json", JSON.stringify(veiculos_lista, null, 2)); //salva mudanças
    }


}

var sistema = new Sistema(); //criação de objeto da classe sistema

PaginaInicial(); //chamada da página inicial

