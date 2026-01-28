const fs = require("fs");

function listar_agentes() {
    return JSON.parse(fs.readFileSync("agentes.json", "utf-8"));
}

function salvar_agente(agente) {
    const lista = listar_agentes();
    lista.push(agente);
    fs.writeFileSync("agentes.json", JSON.stringify(lista, null, 2));
}
function buscarPorId(id) {
    return listar_agentes().find(a => a.id_unico === id);
}
function buscarPorMatricula(numMatricula) {
    return listar_agentes().find(a => a.numMatricula === numMatricula);
}

module.exports = { listar_agentes, salvar_agente, buscarPorId, buscarPorMatricula };