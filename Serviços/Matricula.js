const AgentesRepo = require("../Repositorios/AgentesRepo");

function gerarNumMatricula() {

    while (true) { 

        const numMatricula = Math.floor(10000000 + Math.random() * 90000000);

        if (!AgentesRepo.buscarPorMatricula()){
            return numMatricula;
        }
    }
}

module.exports = {gerarNumMatricula};