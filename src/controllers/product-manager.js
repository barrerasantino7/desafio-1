const fs = require("fs");

class ProductManager {
    constructor(path){
        this.products = []
        this.path = path;
    }

    static ultId = 0;

    async getProduct(){
        const read = await fs.promises.readFile(this.path, "utf-8");
        const readJson = JSON.parse(read)

        return readJson;
     }

     async addProducts({title, description, code, price, status, stock, category, thumbnail}){
        
        let arrayProducts = await this.getProduct();

        if(arrayProducts.find((products)=>products.code === code)){
            console.log("ERROR")
        }

        const newProduct = {title, description, code, price, status: true, stock, category, thumbnail}
        if (arrayProducts.length > 0) {
            ProductManager.ultId = arrayProducts.reduce((maxId, product) => Math.max(maxId, product.id), 0);
        }
        newProduct.id = ++ProductManager.ultId; 

        arrayProducts.push(newProduct);
        await fs.promises.writeFile(this.path, JSON.stringify(arrayProducts, null, 2))
    }

    async getProductById(id){
        const products = await this.getProduct();
        const product = products.find((products)=> products.id == id)

        if(product){
            return product
        }else{
            console.log("Producto no encontrado")
        }
    }

    async deleteProdcutById(id){
        const products = await this.getProduct();
        const productDelete = products.findIndex((product)=> product.id === id)

        if(productDelete !== -1){
            products.splice(productDelete,1)
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2))
        }

    }

    async updateProduct(id,updateCamp){
        const products = await this.getProduct();
        const productById = products.findIndex((products)=> products.id === id);

        products[productById] = { ...products[productById], ...updateCamp};
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2))
    }
}

module.exports = ProductManager;
