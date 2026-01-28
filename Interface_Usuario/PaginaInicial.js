const sistema = require("../Serviços/Sistema");

//PÁGINA INICIAL - Primeira a ser chamada, hub incial
function PaginaInicial(){
    var opcao = requisicao.question(
        "\nBem vindo ao sistema de controle da Segue o Fluxo: " + "\n \n" + "O que deseja fazer? \n \n" + "Aperte 1: Cadastre-se \nAperte 2: Login \nAperte 3: Sair do Sistema \n"
    );

    if (opcao == "1"){
        sistema.cadastro();
    }

    if (opcao == "2"){
        sistema.login();
    }

    if (opcao === "3") {
        console.log("Encerrando o sistema...");
        process.exit(0);
    }
}

module.exports = {PaginaInicial};