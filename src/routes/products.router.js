const express = require("express")
const router = express.Router();

const ProductManager = require("../controllers/product-manager")

const productManager = new ProductManager("./src/models/arrayProducts.json")


router.get("/api/products", async (req, res)=>{
    let limit = req.query.limit
    const productos = await productManager.getProduct();
    const limite = productos.slice(0,limit);
    
    if(limit){
        res.json(limite)
    }else{
        res.json(productos)
    }   
})

router.get("/api/products/:pid", async (req,res)=>{
    const pId = req.params.pid;
    const productoById = await productManager.getProductById(pId);

    if(productoById){
        res.json(productoById);
    } else{
        res.send("Error: producto no encontrado");
    }
})

router.post("/api/products", async (req, res)=>{
    const nuevoProducto = req.body;
    
    await productManager.addProducts(nuevoProducto);
})

router.delete("/api/products/:pid", async (req, res)=>{
    let pId = req.params.pid

    await productManager.deleteProdcutById(parseInt(pId));
})

router.put("/api/products/:pid", async (req, res)=>{
    let id = req.params.pid;
    const updateCamp = req.body

    await productManager.updateProduct(parseInt(id), updateCamp)
})

module.exports = router;