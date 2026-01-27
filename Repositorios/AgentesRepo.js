const fs = require("fs");

function listar_agentes() {
    return JSON.parse(fs.readFileSync("agentes.json", "utf-8"));
}

function salvar_agente(agente) {
    const lista = listar_agentes();
    lista.push(agente);
    fs.writeFileSync("agentes.json", JSON.stringify(lista, null, 2));
}

module.exports = { listar_agentes, salvar_agente};