const fs = require("fs");

function listar_veiculos() {
    return JSON.parse(fs.readFileSync("veiculos.json", "utf-8"));
}

function salvar_veiculo(veiculo) {
    const lista = listar_veiculos();
    lista.push(veiculo);
    fs.writeFileSync("veiculos.json", JSON.stringify(lista, null, 2));
}

module.exports = { listar_veiculos, salvar_veiculo};