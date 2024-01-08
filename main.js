class ProductManager {
    constructor(){
        this.products = []
    }
     static id = 0;

     getProduct(){
         return this.products;
     }

    addProducts(title, description, price, thumbnail, code, stock){

        if(this.products.find((products)=>products.code === code)){
            console.log("ERROR")
        }else{
            ProductManager.id++
            this.products.push({id:ProductManager.id, title, description, price, thumbnail, code, stock})
        }
    }

    getProductById(id){
        if(this.products.find((products)=> products.id === id)){
            console.log("Product found")
        }else{
            console.log("Not found")
        }
    }

}




