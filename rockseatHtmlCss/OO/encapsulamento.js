
class Poligono{ // <<classe
    constructor(altura,largura){
        this.altura = altura;
        this.largura = largura;

    }
    get area(){ 
        return this.#calcularArea();

    }

    #calcularArea(){// >#< hash significa que não pode ser acessado fora da classe
        return this.altura * this.largura;
    }


}
//-----------------------------------------------------------

let poligono = new Poligono(20,40);
console.log(poligono.altura);