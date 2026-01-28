const AgentesRepo = require("../Repositorios/AgentesRepo");

function gerarNumMatricula() {

    while (true) { 

        var numMatricula = Math.floor(10000000 + Math.random() * 90000000);

        if (!AgentesRepo.buscarPorMatricula(numMatricula)){
            return numMatricula;
        }
    }
}

module.exports = {gerarNumMatricula};