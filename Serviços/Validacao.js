const condutor = require("../Classes/Condutor");
const agente = require("../Classes/Agente");
const multa = require("../Classes/Multa");
const veiculo = require("../Classes/Veiculo");

const condutoresRepo = require("../Repositorios/CondutoresRepo");
const agentesRepo = require("../Repositorios/AgentesRepo");
const multasRepo = require("../Repositorios/MultasRepo");
const veiculosRepo = require("../Repositorios/VeiculosRepo");

function validarCPF(cpf){ 
    if (cpf.length !== 11){ // verificação de coerência no número cpf
        console.log("\nCPF INVÁLIDO!!");
        return false;
    }
    return true;
}
function validarEMAIL(email){
    if (!email.includes("@" && ".com")) { //verificação de coerência no email
        console.log("Email inválido. Use um email @gmail.com");
        return false;
    }
    return true;
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
function validarDATAcadastro(data){
    if(!conferir_data_de_nascimento(data)){ //verificação de coerência na data de nascimento 
        console.log("\nDATA INVALIDA!!\n");
        return false;
    }
    return true
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

function verificar_email_duplo_agente(email) {
    let agentes = agentesRepo.listar_agentes();

    let agente_encontrado = agentes.find(a => a.email === email);

    if (agente_encontrado){
        console.log("\nEMAIL já cadastrado!");
        return true;
    } else {
        return false;
    }
}
function verificar_email_duplo_condutor(email) {
    let condutores = condutoresRepo.listar_condutores();

    let condutor_encontrado = condutores.find(a => a.email === email);

    if (condutor_encontrado){
        console.log("\nEMAIL já cadastrado!");
        return true;
    } else {
        return false;
    }
}



module.exports = {validarCPF, validarEMAIL, validarDATAcadastro, conferir_cpf_duplo_condutor, conferir_cpf_duplo_agente, verificar_email_duplo_agente, verificar_email_duplo_condutor};