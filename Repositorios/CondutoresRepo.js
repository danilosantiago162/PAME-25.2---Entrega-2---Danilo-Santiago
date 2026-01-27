const fs = require("fs");

function listar_condutores() {
    return JSON.parse(fs.readFileSync("condutores.json", "utf-8"));
}

function salvar_condutor(condutor) {
    const lista = listar_condutores();
    lista.push(condutor);
    fs.writeFileSync("condutores.json", JSON.stringify(lista, null, 2));
}
function buscarPorId(id) {
    return listar().find(c => c.id_unico === id);
}
module.exports = { listar_condutores, salvar_condutor, buscarPorId};