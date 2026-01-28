const condutor = require("../Classes/Condutor");
const agente = require("../Classes/Agente");
const multa = require("../Classes/Multa");
const veiculo = require("../Classes/Veiculo");

const condutoresRepo = require("../Repositorios/CondutoresRepo");
const agentesRepo = require("../Repositorios/AgentesRepo");
const multasRepo = require("../Repositorios/MultasRepo");
const veiculosRepo = require("../Repositorios/VeiculosRepo");

const {gerarIdUnico} = require("./Id");
const {gerarNumMatricula} = require("./Matricula");

const {
    validarCPF, validarEMAIL, validarDATAcadastro, conferir_cpf_duplo_condutor, conferir_cpf_duplo_agente
} = require("./Validacao");

const {PaginaInicial} = require("../Interface_Usuario/PaginaInicial");



class Sistema {

    cadastro(){ //cadastro tanto de condutor quanto agente
    
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
                    
                validarDATAcadastro();

                let condutor;

                condutor = new Condutor(id_unico, nome, cpf, email, senha, data_de_nascimento); //criação de objeto da classe Condutor

                //chamada de função que armazena o objeto em arquivo .json, vale ressaltar
                //que o objeto não é guardado no arquivo como objeto
                condutoresRepo.salvar_condutor(condutor);

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

            agentesRepo.salvar_agente(agente); //chamada de função que armazena objeto em arquivo .json

            console.log("Cadastro realizado com sucesso!!");

            console.log(agente); //print do novo agente
            }
            PaginaInicial();
        }
    }
    
    login(){

    }
    ver_dados_agente(){

    }
    ver_lista_veiculos(){

    }
    ver_lista_condutores(){

    }
    aplicar_multa(){

    }
    ver_multas(){

    }
    alterar_status_multa(){

    }
    alterar_dados_agente(agente){

    }
    ver_dados_condutor(condutor){

    }
    ver_minhas_multas(){

    }
    cadastrar_veiculo(){

    }
    pagar_multa(){

    }
    recorrer_multa(){

    }
    alterar_dados_condutor(){

    }



}