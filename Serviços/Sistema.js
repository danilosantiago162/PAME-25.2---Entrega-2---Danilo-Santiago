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
    validarCPF, 
    validarEMAIL, 
    validarDATAcadastro, 
    conferir_cpf_duplo_condutor, 
    conferir_cpf_duplo_agente,
    verificar_email_duplo_agente,
    verificar_email_duplo_condutor
} = require("./Validacao");



class Sistema {

    cadastro(){ //cadastro tanto de condutor quanto agente

        console.log("\nCaso deseje sair insira um cpf inválido!\n")
    
        let id_unico = gerarIdUnico();
        let nome = requisicao.question("Qual seu nome? ");
        if (nome.length === 0){
            console.log("\nOPCAO INVALIDA\n");
            return;
        }
        let cpf = requisicao.question("Qual seu cpf? (APENAS NUMEROS) ");

        if (!validarCPF(cpf)){ //se cpf inválido, volta para página inicial
            console.log("\nCPF INVALIDO\n")
            return;
        };

        let email = requisicao.question("Insira seu email: ");

        if (!validarEMAIL(email)){ //se email inválido, volta para página inicial
            console.log("\nEMAIL INVALIDO\n")
            return;
        };

        let senha = requisicao.question("Insira sua senha: ", {hideEchoBack:true}); //senha com proteção visual
        let opcao = requisicao.question(
            "\nAperte 1: Novo condutor\nAperte 2: Novo agente \n"
            
        );

        if (opcao == "1"){

            if (verificar_email_duplo_condutor(email)){
                console.log("\nEMAIL JA CADASTRADO!!\n");
                return;
            }

            if (!conferir_cpf_duplo_condutor(cpf)){ //verificação de duplicidade de cpf em condutores

                let data_de_nascimento = requisicao.question("Qual sua data de nascimento? (DD/MM/AAAA) ");
                    
                if (!validarDATAcadastro(data_de_nascimento)){
                    return;
                };

                let condutor = new Condutor(id_unico, nome, cpf, email, senha, data_de_nascimento); //criação de objeto da classe Condutor

                //chamada de função que armazena o objeto em arquivo .json
                condutoresRepo.salvar_condutor(condutor);

                console.log("\nCadastro realizado com sucesso!!\n");

                } 
            return true;
        } else if (opcao == "2") {

            if (verificar_email_duplo_agente(email)){
                console.log("\nEMAIL JA CADASTRADO!!\n");
                return;
            }

            if (!conferir_cpf_duplo_agente(cpf)){ //verificação de duplicidade de cpf em agentes

                let numero_matricula = gerarNumMatricula(); //chamada da função geradora de matrículas

                let agente;

                agente = new Agente(id_unico, nome, cpf, email, senha, numero_matricula); //criação de objeto da classe Agente

                agentesRepo.salvar_agente(agente); //chamada de função que armazena objeto em arquivo .json

                console.log("\nCadastro realizado com sucesso!!\n");

            }
            return true;
        } else {
            console.log("\nOPCAO INVALIDA\n");
            return;
        }
    }
    
    login(){
    
        let opcao = requisicao.question("\nAperte 1: Condutor cadastrado\nAperte 2: Agente cadastrado\n")

        let email = requisicao.question("\nInsira seu email: ");
        let senha = requisicao.question("Insira sua senha: ", {hideEchoBack:true});


        switch(opcao){
            case "1":

                let condutores = condutoresRepo.listar_condutores();

                //procura condutor no arquivo .json 
                let condutor_encontrado = condutores.find(condutor => condutor.email === email && condutor.senha === senha);

                if (!condutor_encontrado){ 
                    console.log("\nEmail ou senha Incorretos\n");
                } else {

                    console.log("\nLOGIN REALIZADO COM SUCESSO!!\n");
                    
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
        let condutores = condutoresRepo.listar_condutores();

        let cpf = requisicao.question("\nInsira o CPF do multado: ");
        let condutor_multado = condutores.find(c => c.cpf === cpf);

        if (condutor_multado) {

            let id_cliente = condutor_multado.id_unico;

            let tipo_infracao = requisicao.question("Qual o tipo de infracao? ");
            let valor = requisicao.question("Qual o valor da infracao? "); 

            const dia = new Date().getDate(); //pega dia de hoje
            const mes = new Date().getMonth() + 1; //pega o mês atual
            const ano = new Date().getFullYear(); //pega o ano atual

            let data_aplicacao = `${dia}/${mes}/${ano}`;

            let status = "pendente";

            let multa = new Multa(id_unico, id_cliente, tipo_infracao, valor, data_aplicacao, status); //criação de objeto da classe Multa

            multasRepo.salvar_multa(multa); //chamada de método que salva as informações do novo objeto no arquivo multas.json

            console.log("\nMULTA APLICADA COM SUCESSO!!\n");

            console.log(multa); //print da nova multa
        } else {
            console.log("\nCONDUTOR NAO ENCONTRADO!!\n");
            return;
        }
    }
    ver_multas(){
        console.log("\n" + JSON.stringify(multasRepo.listar_multas(), null, 2)); //concatenação de string com array
    }
    //método que altera status de multa
    alterar_status_multa(){

        this.ver_multas();

        let multas = multasRepo.listar_multas();
        let id_unico = requisicao.question("\nInsira o id_unico da multa que deseja alterar o status: ");
        let multa_escolhida = multas.find( multas => multas.id_unico === id_unico); //verifica a existência de uma multa com o id_unico informado

        if (multa_escolhida){
            let status_novo = requisicao.question("\nInsira o novo status da multa " + multa_escolhida.id_unico + ": ");

            multa_escolhida.status = status_novo; //muda status anterior para o fornecido acima

            //reescreve o arquivo multas.json
            //Ao fazer a linha acima, o status da multa_escolhida já foi mudado na memória, porém não foi escrito no arquivo
            //a linha abaixo atualiza o arquivo
            fs.writeFileSync("multas.json", JSON.stringify(multas, null, 2));

            console.log("\nSTATUS MUDADO COM SUCESSO!!\n");

            return;

        } else {
            console.log("\nMULTA NAO ENCONTRADA!!\n");
            return;
        }
    }
    alterar_dados_agente(agente){ //método que altera dados do agente
        let opcao = requisicao.question(
            "\nQual dado gostaria de mudar?\n" +
            "Aperte 1: Nome\n"+
            "Aperte 2: Email\n"+
            "Aperte 3: Senha\n"+
            "Aperte 4: CPF\n"+
            "Aperte 0: Voltar para pagina anterior\n"  
        );

        let agentes = agentesRepo.listar_agentes();
        let agente_encontrado = agentes.find( a => a.id_unico === agente.id_unico); //verifica a existência de um agente "a" com id_unico igual ao id_unico do "agente"

        switch(opcao){

            case "1":

                let nome = requisicao.question("\nQual seu novo nome? ")
                if (nome.length === 0){
                    console.log("\nOPCAO INVALIDA\n");
                    return;
                }
                agente_encontrado.nome = nome;
                fs.writeFileSync("agentes.json", JSON.stringify(agentes, null, 2)); //salva novo nome
                Object.assign(agente, agente_encontrado); //altera os dados do agente para os dados do agente_encontrado
                break;
            
            case "2":

                let email = requisicao.question("\nQual seu novo email? ");
                if (!validarEMAIL(email)){ //se email inválido, volta para página do condutor
                    console.log("\nEMAIL INVALIDO\n")
                    return;
                };
                if (verificar_email_duplo_agente(email)){
                    console.log("\nEMAIL JA CADASTRADO!!\n");
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

                let cpf = requisicao.question("\nQual seu novo cpf? ");
                if (!validarCPF(cpf)){ //se cpf inválido, volta para página inicial
                    console.log("\nCPF INVALIDO\n")
                    return;
                };
                agente_encontrado.cpf = cpf;
                fs.writeFileSync("agentes.json", JSON.stringify(agentes, null, 2));
                Object.assign(agente, agente_encontrado);
                break;
            case "0":
                console.log("\nVoltando para página do agente...");
                return;
            default:
                console.log("\nOPCAO INVALIDA\n");
                return;
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
    pagar_multa(id_cliente) { //método que altera status de multa para "paga" 
    
        this.ver_minhas_multas(id_cliente);//lista as multas do condutor

        let opcao = requisicao.question("\nInsira o id_unico da multa que quer pagar: ");

        let multas = multasRepo.listar_multas();
        let multa_encontrada = multas.find( multa => multa.id_unico === opcao);//verifica a existência de uma multa com o id_unico igual ao id_unico informado como parâmetro

        if (multa_encontrada) { // verifica a existência da multa

            multa_encontrada.status = "paga" //mudança de status 
            fs.writeFileSync("multas.json", JSON.stringify(multas, null, 2)); //salvamento de mudança

        console.log("\nMULTA PAGA!!\n");
        } else {
            console.log("MULTA NÃO ENCONTRADA");
            return;
        }
    }
    recorrer_multa(id_cliente) { //método que altera status de multa para "recorrida" 
    
        this.ver_minhas_multas(id_cliente); //chamada de método 

        let opcao = requisicao.question("\nInsira o id_unico da multa que quer recorrer: "); 

        let multas = multasRepo.listar_multas();
        let multa_encontrada = multas.find( multa => multa.id_unico === opcao); //verifica a existência de uma multa com o id_unico igual ao id_unico informado como parâmetro

        if (multa_encontrada) { //verifica a existência da multa

        multa_encontrada.status = "recorrida"; //mudança de status

        fs.writeFileSync("multas.json", JSON.stringify(multas, null, 2)); //salvamento de mudança

        console.log("\nMULTA RECORRIDA!!\n");

        } else {
            console.log("MULTA NÃO ENCONTRADA");
            return;
        }
    }
    alterar_dados_condutor(condutor){ //método que altera dados do condutor
    
        let opcao = requisicao.question(
            "\nQual dado gostaria de mudar?\n " +
            "Aperte 1: Nome\n"+
            "Aperte 2: Email\n"+
            "Aperte 3: Senha\n"+
            "Aperte 4: CPF\n"+
            "Aperte 5: Data de Nascimento\n"+
            "Aperte 0: Voltar para pagina anterior\n"
        );

        let condutores = condutoresRepo.listar_condutores();
        let condutor_encontrado = condutores.find( c =>c.id_unico === condutor.id_unico)

        switch(opcao){

            case "1":

                let nome = requisicao.question("\nQual seu novo nome? ")
                condutor_encontrado.nome = nome; //mudança no objeto do .json
                condutor.nome = nome; //mudança de nome no condutor logado
                fs.writeFileSync("condutores.json", JSON.stringify(condutores, null, 2)); //salvamento da mudança
                break;
            
            case "2":

                let email = requisicao.question("\nQual seu novo email? ");
                if (!validarEMAIL(email)){ //se email inválido, volta para página do condutor
                    console.log("\nEMAIL INVALIDO\n")
                    return;
                };
                if (verificar_email_duplo_condutor(email)){
                    console.log("\nEMAIL JA CADASTRADO!!\n");
                    return;
                }
                condutor_encontrado.email = email; //mudança no objeto do .json
                condutor.email = email; //mudança de email no condutor logado
                fs.writeFileSync("condutores.json", JSON.stringify(condutores, null, 2));//salvamento da mudança
                break;

            case "3":

                let senha = requisicao.question("\nQual sua nova senha? ", {hideEchoBack:true});
                condutor_encontrado.senha = senha; //mudança no objeto do .json
                condutor.senha = senha; //mudança de senha no condutor logado
                fs.writeFileSync("condutores.json", JSON.stringify(condutores, null, 2));//salvamento da mudança
                break;
            
            case "4":

                let cpf = requisicao.question("\nQual seu novo cpf? ");
                if (!validarCPF(cpf)){ //se cpf inválido, volta para página inicial
                    console.log("\nCPF INVALIDO\n")
                    return;
                };
                condutor_encontrado.cpf = cpf;
                condutor.cpf = cpf; //mudança de cpf no condutor logado
                fs.writeFileSync("condutores.json", JSON.stringify(condutores, null, 2));//salvamento da mudança
                break;
            
            case "5":

                let data_de_nascimento = requisicao.question("\nQual sua nova data de nascimento? ")
                if (!validarDATAcadastro(data_de_nascimento)){
                    return;
                };
                condutor_encontrado.data_de_nascimento = data_de_nascimento; //mudança no objeto do .json
                condutor.data_de_nascimento = data_de_nascimento; //mudança de data de nascimento no condutor logado
                
                fs.writeFileSync("condutores.json", JSON.stringify(condutores, null, 2));//salvamento da mudança
                break;

            case "0":
                console.log("\nVoltando para página do condutor...");
                return;
            default:
                console.log("\nOPCAO INVALIDA\n");
        }
        console.log("\nDADOS ALTERADOS COM SUCESSO!!\n");

        return;
    }



}

module.exports = Sistema;