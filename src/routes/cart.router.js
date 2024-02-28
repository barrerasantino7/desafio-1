const express = require("express")
const router = express.Router();

const CartManager = require("../controllers/cart-manager");
const cartmanager = new CartManager("./src/models/carrito.json");

//1)Listar los carritos
router.get("/api/carts", async (req, res)=>{
    res.json(await cartmanager.getCarrito());
})

router.get("/api/carts/:cid", async (req, res)=>{
    let cid = req.params.cid;
    const ById = await cartmanager.getCarritoById(cid); 

    if(ById){
        res.json(ById);
    }else{
        res.send("Producto no encontrado")
    }
})

router.post("/api/carts", async (req, res)=>{
    let newCart = req.body;
    await cartmanager.addCarrito(newCart);

})

router.post("/api/carts/:cid/products/:pid", async (req, res)=>{
    const {cid, pid} = req.params;

    await cartmanager.addProductCart(cid,pid);
    res.send("Producto agregado")
})


module.exports= router;