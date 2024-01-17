const fs = require("fs");

class ProductManager {
    constructor(path){
        this.products = []
        this.path = path;
    }
     static id = 0;

     async getProduct(){
        await this.leerArchivo(this.products);
     }

    async addProducts({title, description, price, thumbnail, code, stock}){

        if(this.products.find((products)=>products.code === code)){
            console.log("ERROR")
        }else{
            ProductManager.id++
            this.products.push({id:ProductManager.id, title, description, price, thumbnail, code, stock})

            await this.guardarArchivo(this.products);
        }
    }

    getProductById(id){
        if(this.products.find((products)=> products.id === id)){
            console.log("Product found")
        }else{
            console.log("Not found")
        }
    }

    async guardarArchivo (arrayProductos){
        await fs.promises.writeFile(this.path , JSON.stringify(arrayProductos, null , 2))
    
    }

    async leerArchivo(){
        const lectura = await fs.promises.readFile(this.path, "utf-8");
        const arrayProductos = JSON.parse(lectura);
        return arrayProductos
    }
}


