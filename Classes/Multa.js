//Classe Multa
class Multa{
    constructor(id_unico, id_cliente, tipo_infracao, valor, data_aplicacao, status){
        this.id_unico = id_unico;
        this.id_cliente = id_cliente;
        this.tipo_infracao = tipo_infracao;
        this.valor = valor;
        this.data_aplicacao = data_aplicacao;
        this.status = status;
    }
    getID_unico(){
        return this.id_unico;
    }
    getID_cliente(){
        return this.id_cliente;
    }
    getTipoInfracao(){
        return this.tipo_infracao;
    }
    getValor(){
        return this.valor;
    }
    getDataAplicacao(){
        return this.data_aplicacao;
    }
    getStatus(){
        return this.status;
    }
    setTipoInfracao(tipo_infracao){
        this.tipo_infracao = tipo_infracao;
    }
    setValor(valor){
        this.valor = valor;
    }
    setDataAplicacao(data_aplicacao){
        this.data_aplicacao = data_aplicacao;
    }
    setStatus(status){
        this.status = status;
    }
}