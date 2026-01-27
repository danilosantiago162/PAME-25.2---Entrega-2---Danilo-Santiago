//Classe Veiculo
class Veiculo{
    constructor(placa, modelo, marca, cor){
        this.placa = placa;
        this.modelo = modelo;
        this.marca = marca;
        this.cor = cor;
    }
    getPlaca(){
        return this.placa;
    }
    getModelo(){
        return this.modelo;
    }
    getMarca(){
        return this.marca;
    }
    getCor(){ 
        return this.cor;
    }
    setPlaca(placa){
        this.placa = placa;
    }
    setModelo(modelo){
        this.modelo = modelo;
    }
    setMarca(marca){
        this.marca = marca;
    }
    setCor(cor){
        this.cor = cor;
    }
}