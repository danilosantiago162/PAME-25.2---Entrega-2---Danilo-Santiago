const fs = require("fs");
const requisicao = require("readline-sync");

const Condutor = require("../Classes/Condutor");
const Agente = require("../Classes/Agente");
const Multa = require("../Classes/Multa");
const Veiculo = require("../Classes/Veiculo");

const condutoresRepo = require("../Repositorios/CondutoresRepo");
const agentesRepo = require("../Repositorios/AgentesRepo");
const multasRepo = require("../Repositorios/MultasRepo");
const veiculosRepo = require("../Repositorios/VeiculosRepo");

const {gerarIdUnico} = require("./Id");
const {gerarNumMatricula} = require("./Matricula");

const {
    validarCPF, validarEMAIL, validarDATAcadastro, conferir_cpf_duplo_condutor, conferir_cpf_duplo_agente
} = require("./Validacao");



class Sistema {

    cadastro(){ //cadastro tanto de condutor quanto agente

        console.log("\nCaso deseje sair insira um cpf inválido!\n")
    
        let id_unico = gerarIdUnico();
        let nome = requisicao.question("Qual seu nome? ");
        let cpf = requisicao.question("Qual seu cpf? (APENAS NUMEROS) ");

        validarCPF(cpf);

        let email = requisicao.question("Insira seu email: ");

        validarEMAIL(email);

        let senha = requisicao.question("Insira sua senha: ", {hideEchoBack:true}); //senha com proteção visual
        let opcao = requisicao.question("\nAperte 1: Novo condutor\nAperte 2: Novo agente \n");

        if (opcao == "1"){

            if (!conferir_cpf_duplo_condutor(cpf)){ //verificação de duplicidade de cpf em condutores

                let data_de_nascimento = requisicao.question("Qual sua data de nascimento? (DD/MM/AAAA) ");
                    
                //if (!validarDATAcadastro(data_de_nascimento)){
                //    return;
                //};

                let condutor;

                condutor = new Condutor(id_unico, nome, cpf, email, senha, data_de_nascimento); //criação de objeto da classe Condutor

                //chamada de função que armazena o objeto em arquivo .json, vale ressaltar
                //que o objeto não é guardado no arquivo como objeto
                condutoresRepo.salvar_condutor(condutor);

                console.log("\nCadastro realizado com sucesso!!\n");

                } 
            return true;
        }

        if (opcao == "2"){

            if (!conferir_cpf_duplo_agente(cpf)){ //verificação de duplicidade de cpf em agentes

            let numero_matricula = gerarNumMatricula(); //chamada da função geradora de matrículas

            let agente;

            agente = new Agente(id_unico, nome, cpf, email, senha, numero_matricula); //criação de objeto da classe Agente

            agentesRepo.salvar_agente(agente); //chamada de função que armazena objeto em arquivo .json

            console.log("Cadastro realizado com sucesso!!");

            }
            return true;
        }
    }
    
    login(){
    
        let opcao = requisicao.question("Aperte 1: Condutor cadastrado\nAperte 2: Agente cadastrado\n")

        let email = requisicao.question("\nInsira seu email: ");
        let senha = requisicao.question("Insira sua senha: ", {hideEchoBack:true});


        switch(opcao){
            case "1":

                let condutores = condutoresRepo.listar_condutores();

                //procura condutor no arquivo .json 
                let condutor_encontrado = condutores.find(condutor => condutor.email === email && condutor.senha === senha);

                if (!condutor_encontrado){ 
                    console.log("\nEmail ou senha incorreto");
                } else {

                    console.log("\nLOGIN REALIZADO COM SUCESSO!!");
                    
                    return condutor_encontrado;
                }
                break;
            case "2":

                let agentes = agentesRepo.listar_agentes();

                //procura agente no arquivo .json 
                let agente_encontrado = agentes.find(agente => agente.email === email && agente.senha === senha);

                if (!agente_encontrado){
                    console.log("\nEmail ou senha incorreto\n");
                    
                } else {

                    console.log("\nLOGIN REALIZADO COM SUCESSO!!\n");
                    
                    return agente_encontrado;                
                }
                break;
        }
    }
    ver_lista_veiculos(){
        console.log("\n" + JSON.stringify(veiculosRepo.listar_veiculos(), null, 2)); //concatenação de string com array
    }
    ver_lista_condutores(){
        console.log("\n" + JSON.stringify(condutoresRepo.listar_condutores(), null, 2)); //concatenação de string com array
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

        multasRepo.salvar_multa(multa); //chamada de método que salva as informações do novo objeto no arquivo multas.json

        console.log("\nMULTA APLICADA COM SUCESSO!!\n");

        console.log(multa); //print da nova multa
    }
    ver_multas(){
        console.log("\n" + JSON.stringify(multasRepo.listar_multas(), null, 2)); //concatenação de string com array
    }
    //método que altera status de multa
    alterar_status_multa(){
        let multas = multasRepo.listar_multas();

        let id_unico = requisicao.question("\nInsira o id_unico da multa que deseja alterar o status: ");

        let multa_escolhida = multas.find( multas => multas.id_unico === id_unico); //verifica a existência de uma multa com o id_unico informado

        let status_novo = requisicao.question("\nInsira o novo status da multa " + multa_escolhida.id_unico + ": ");

        multa_escolhida.status = status_novo; //muda status anterior para o fornecido acima

        //reescreve o arquivo multas.json
        //Ao fazer a linha acima, o status da multa_escolhida já foi mudado na memória, porém não foi escrito no arquivo
        //a linha abaixo atualiza o arquivo
        fs.writeFileSync("multas.json", JSON.stringify(multas, null, 2));

        console.log("\nSTATUS MUDADO COM SUCESSO!!\n");

        return;
    }
    alterar_dados_agente(agente){ //método que altera dados do agente
        let opcao = requisicao.question(
            "\nQual dado gostaria de mudar?\n " +
            "Aperte 1: nome\n"+
            "Aperte 2: email\n"+
            "Aperte 3: senha\n"+
            "Aperte 4: cpf\n"  
        );

        let agentes = agentesRepo.listar_agentes();
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
                validarEMAIL(email);
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
    //função que mostra multas do condutor logado
    ver_minhas_multas(id_cliente) {

        let multas = multasRepo.listar_multas();
        let multas_encontradas = multas.filter( multa => multa.id_cliente === id_cliente); //verifica a existência de uma multa com o id_cliente igual ao id_cliente fonecido como parâmetro
        //vale ressaltar que esse id_cliente é o id_unico do cliente, são a mesma sequência alfanumérica
        //utiliza-se o filter e não o find pois podem ser mais de uma multa, o find mostra apenas 1


        if (multas_encontradas.length === 0){ //verifica a existência de multas
            console.log("\nNenhuma multa encontrada!\n")
            return;
        }

        console.log(multas_encontradas); //print das multas do condutor logado

    }
    cadastrar_veiculo(){ //cadastro de veículo
        let placa = requisicao.question("\nQual a placa do veiculo? ");
        let modelo = requisicao.question("Qual o modelo do veiculo? ");
        let marca = requisicao.question("Qual a marca do veiculo? ");
        let cor = requisicao.question("Qual a cor do veiculo? ");

        let veiculo = new Veiculo(placa, modelo, marca, cor); //criação de objeto da classe Veiculo

        veiculosRepo.salvar_veiculo(veiculo); //chamada de função que salva informações do novo objeto em arquivo .json

        console.log("\nCADASTRO REALIZADO COM SUCESSO!!\n");

        console.log(veiculo); //print com informações do novo veículo
    }
    pagar_multa(){

    }
    recorrer_multa(){

    }
    alterar_dados_condutor(){

    }



}

module.exports = Sistema;