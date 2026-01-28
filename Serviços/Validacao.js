const condutor = require("../Classes/Condutor");
const agente = require("../Classes/Agente");
const multa = require("../Classes/Multa");
const veiculo = require("../Classes/Veiculo");

const condutoresRepo = require("../Repositorios/CondutoresRepo");
const agentesRepo = require("../Repositorios/AgentesRepo");
const multasRepo = require("../Repositorios/MultasRepo");
const veiculosRepo = require("../Repositorios/VeiculosRepo");

const {PaginaInicial} = require("../Interface_Usuario/PaginaInicial");

function validarCPF(cpf){ 
    if (cpf.length !== 11){ // verificação de coerência no número cpf
        console.log("\nCPF INVÁLIDO!!");
        PaginaInicial();
    }
}
function validarEMAIL(email){
    if (!email.includes("@gmail.com")) { //verificação de coerência no email
        console.log("Email inválido. Use um email @gmail.com");
        return;
    }
}
function validarDATAcadastro(data){
    if(!conferir_data_de_nascimento(data_de_nascimento)){ //verificação de coerência na data de nascimento 
        console.log("\nDATA INVALIDA!!\n");
        PaginaInicial();
    }
}
//função que confere a duplicidade de cpfs, chamada no cadastro
function conferir_cpf_duplo_condutor(cpf) {
    let condutores = condutoresRepo.listar_condutores();
    
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
    let agentes = agentesRepo.listar_agentes();

    let agente_encontrado = agentes.find(a => a.cpf === cpf);

    if (agente_encontrado){
        console.log("\nCPF já cadastrado!");
        return true;
    } else {
        return false;
    }
}

module.exports = {validarCPF, validarEMAIL, validarDATAcadastro, conferir_cpf_duplo_condutor, conferir_cpf_duplo_agente};