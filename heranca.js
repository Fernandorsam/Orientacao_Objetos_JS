class Veiculo {
    rodas = 4;
    mover(direcao){}
    virar(direcao){}
}

class Moto extends Veiculo{ // herdando de Veiculos
    constructor(){
        super(); // puxa atributos e metodos de Veiculo
           this.rodas = 2;

    }
}