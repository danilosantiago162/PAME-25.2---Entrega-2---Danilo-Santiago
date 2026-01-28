const Sistema = require("./Serviços/Sistema");
const PaginaInicial = require("./Interface_Usuario/PaginaInicial");

const sistema = new Sistema();
PaginaInicial(sistema);