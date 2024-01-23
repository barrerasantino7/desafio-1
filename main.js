const fs = require("fs");
class ProductManager {
    constructor(path){
        this.products = []
        this.path = path;
    }
     static id = 0;

     async getProduct(){
        const read = await fs.promises.readFile(this.path, "utf-8");
        const readJson = JSON.parse(read)

        return readJson;
     }

    async addProducts(title, description, price, thumbnail, code, stock){
        if(this.products.find((products)=>products.code === code)){
            console.log("ERROR")
        }else{
            ProductManager.id++
            this.products.push({id:ProductManager.id, title, description, price, thumbnail, code, stock})

            const productJson = JSON.stringify(this.products, null, 2)

            await fs.promises.writeFile(this.path, productJson);
        }
    }

    async getProductById(id){
        const products = await this.getProduct();
        const product = products.find((products)=> products.id === id)

        if(product){
            return product
        }else{
            console.log("Producto no encontrado")
        }
    }

    async deleteProdcutById(id){
        let deleteProducts = await this.getProduct();
        deleteProducts = deleteProducts.filter((product)=> product.id !== id);
        const newArray = JSON.stringify(deleteProducts, null, 2)
        await fs.promises.writeFile(this.path, newArray);

        return newArray; 
    }

    async updateProduct(id,updateCamp){
        const products = this.getProduct();
        const productById = products.find((products)=> products.id === id);

    }
}



