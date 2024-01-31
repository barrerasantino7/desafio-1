const fs = require("fs");

class CartManager{
    constructor(path){
        this.carrito = [];
        this.path = path;
    }

    static ultId = 0;

    async getCarrito(){
       const productCarts =  await fs.promises.readFile(this.path, "utf-8");

       return JSON.parse(productCarts)
    }

    async addCarrito(){
        const productCarts = await this.getCarrito();

        const newCart = {products: []}

        if (productCarts.length > 0) {
            CartManager.ultId = productCarts.reduce((maxId, product) => Math.max(maxId, product.id), 0);
        }
        newCart.id = ++CartManager.ultId;

        productCarts.push(newCart)

        return await fs.promises.writeFile(this.path, JSON.stringify(productCarts, null, 2))
    }

    async getCarritoById (id){
        const getId = await this.getCarrito();
        const cartById = getId.find((item)=> item.id == id);

        return cartById  
    }

    async getCartsProducts(id){
        const carts = await this.getCarrito();

        const cart = carts.find((cart)=>cart.id === id)

        return cart.products;
    }

    async addProductCart(cid, pid){
        const arrayCart = await this.getCarrito();
        const cartId = arrayCart.findIndex((cart)=> cart.cid === cid);

        if(cartId !== -1){
            const cartProducts = await this.getCartsProducts(cid);
            const cartProductsIndex = cartProducts.findIndex((product)=> product.pid === pid)

            if(cartProductsIndex !== -1){
                cartProducts[cartProductsIndex].quantity = cartProducts[cartProductsIndex].quantity + 1
            }else{
                cartProducts.push({pid, quantity : 1})
            }

            arrayCart[cartId].products = cartProducts;

            await fs.promises.writeFile(this.path, JSON.stringify(arrayCart, null, 2))
        }
    }

}

module.exports = CartManager;