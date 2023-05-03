class Atleta{
    peso;
    categoria;

    constructor(peso){
        this.peso = peso;
    }

    definirCategoria(){
        if(this.peso <= 50){
            this.categoria = 'Infantil';
        }else if(this.peso <= 65){
            this.categoria = 'Juvenil';
        }else{
            this.categoria = 'Adulto';
        }
    }

}
//-------------------------------------------------------

class Lutador extends Atleta {
    constructor(peso){
        this.categoria = peso;
    }
    definirCategoria(){
        if(this.peso <= 54){
            this.categoria = 'pluma';
        }else if(this.peso <= 60){
            this.categoria = 'leve';
        }else if(this.peso <= 75){
            this.categoria = 'meio leve';
        }
        else{
            this.categoria = 'pesado';
        }
    }
}