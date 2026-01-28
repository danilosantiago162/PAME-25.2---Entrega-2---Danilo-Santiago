let {PaginaCondutor} = require("./PaginaCondutor"); 
let {PaginaAgente} = require("./PaginaAgente"); 

//PÁGINA INICIAL - Primeira a ser chamada, hub incial
function PaginaInicial(sistema){

    while (true) { //garante que após
        let opcao = requisicao.question(
            "\nBem vindo ao sistema de controle da Segue o Fluxo: " + "\n \n" + "O que deseja fazer? \n \n" + "Aperte 1: Cadastre-se \nAperte 2: Login \nAperte 3: Sair do Sistema \n"
        );

        if (opcao == "1"){
            sistema.cadastro();
        }

        if (opcao == "2"){
            let usuario = sistema.login();

            if (!usuario){
                continue;
            }

            if (usuario.tipo === "condutor") {
                PaginaCondutor(sistema, usuario);
            } 
            if (usuario.tipo === "agente") {
                PaginaAgente(sistema, usuario);
            }  
        }

        if (opcao === "3") {
            console.log("Encerrando o sistema...");
            process.exit(0);
        }
    }
}

module.exports = {PaginaInicial};