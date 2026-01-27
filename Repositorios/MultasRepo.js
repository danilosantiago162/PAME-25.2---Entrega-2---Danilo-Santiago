const fs = require("fs");

function listar_multas() {
    return JSON.parse(fs.readFileSync("multas.json", "utf-8"));
}

function salvar_multa(multa) {
    const lista = listar_multas();
    lista.push(multa);
    fs.writeFileSync("multas.json", JSON.stringify(lista, null, 2));
}
function buscarPorId(id) {
    return listar().find(m => m.id_unico === id);
}

module.exports = { listar_multas, salvar_multa, buscarPorId};