export class Ingredient{
    constructor(public name: string, public amount: number){}
}
/*la forma de arriba es equivalente a lo siguiente:*/
/*export class Ingredient{
    public nombre: string;
    public cantidad: number;
    constructor(nombre: string, cantidad: number){
        this.nombre = nombre;
        this.cantidad = cantidad;
    }
}
*/
