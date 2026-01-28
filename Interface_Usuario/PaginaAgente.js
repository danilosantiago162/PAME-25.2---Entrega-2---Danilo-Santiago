let requisicao = require("readline-sync");
const Agente = require("../Classes/Agente");

//Página do agente
function PaginaAgente(sistema, agente){

    while (true) { //garante que após cada execução de opção o usuário volte para página do condutor logado
        let opcao = requisicao.question(
            "\nBem vindo a pagina do agente, selecione a opcao de interesse:\n" +
            "Aperte 1: Ver meus dados \n" +
            "Aperte 2: Ver lista de veiculos \n"+
            "Aperte 3: Ver lista de condutores \n"+
            "Aperte 4: Aplicar multa \n"+
            "Aperte 5: Ver multas \n"+
            "Aperte 6: Alterar status da multa\n"+
            "Aperte 7: Alterar meus dados\n"+
            "Aperte 0: Voltar a Pagina Inicial\n"
            );
    
        switch(opcao){
            case "1":
                Agente.ver_dados_agente(agente);
                break;
            case "2":
                sistema.ver_lista_veiculos();
                break;
            case "3":
                sistema.ver_lista_condutores();
                break;
            case "4":
                sistema.aplicar_multa();
                break;
            case "5":
                sistema.ver_multas();
                break;
            case "6":
                sistema.alterar_status_multa();
                break;
            case "7":
                sistema.alterar_dados_agente(agente);
                break;   
            case "0":
                console.log("\nSaindo da página do condutor...");
                return;
        }
    }
}

module.exports = {PaginaAgente};