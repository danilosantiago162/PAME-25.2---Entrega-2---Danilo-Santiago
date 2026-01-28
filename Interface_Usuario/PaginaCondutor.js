let requisicao = require("readline-sync");
const Agente = require("../Classes/Agente");
const Condutor = require("../Classes/Condutor");

//Página do condutor logado
function PaginaCondutor(sistema, condutor){

    while (true) { //garante que após cada execução de opção o usuário volte para página do condutor logado
        let opcao = requisicao.question(
            "\nBem vindo a pagina do condutor, selecione a opcao de interesse:\n" +
            "Aperte 1: Ver meus dados \n" +
            "Aperte 2: Ver minhas multas \n"+
            "Aperte 3: Cadastrar Veiculo \n"+
            "Aperte 4: Pagar multa \n"+
            "Aperte 5: Recorrer multa \n"+
            "Aperte 6: Alterar meus dados\n"+
            "Aperte 0: Voltar para Pagina Inicial\n"
            ); 
        switch(opcao){
            case "1":
                Condutor.ver_dados_condutor(condutor);
                break;
            case "2":
                sistema.ver_minhas_multas(Condutor.getID());
                break;
            case "3":
                sistema.cadastrar_veiculo();
                break;
            case "4":
                sistema.pagar_multa(Condutor.getID());
                break;
            case "5":
                sistema.recorrer_multa(Condutor.getID());
                break;
            case "6":
                sistema.alterar_dados_condutor();
                break; 
            case "0":
                console.log("\nSaindo da página do condutor...");
                return;
            default:
                console.log("opcao invalida");
        }
    }
}

module.exports = {PaginaCondutor};