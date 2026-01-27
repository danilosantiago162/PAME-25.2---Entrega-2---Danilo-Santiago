//função que gera id_unico, garantindo a não duplicidade
const CondutoresRepo = require("../Repositorios/CondutoresRepo");
const AgentesRepo = require("../Repositorios/AgentesRepo");
const MultasRepo = require("../Repositorios/MultasRepo");

function gerarIdUnico() {

    while (true) { 
        const numeros = Math.floor(10000000 + Math.random() * 90000000);
        const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const l1 = letras[Math.floor(Math.random() * letras.length)];
        const l2 = letras[Math.floor(Math.random() * letras.length)];

        var id = `${numeros}${l1}${l2}`; 

        if (!CondutoresRepo.buscarPorId(id) && !AgentesRepo.buscarPorId(id) && !MultasRepo.buscarPorId(id)){
            return id;
        }
    }
}

module.exports = {gerarIdUnico};