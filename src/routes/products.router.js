const express = require("express")
const router = express.Router();

const ProductManager = require("../controllers/product-manager")
const productManager = new ProductManager("./src/models/arrayProducts.json")

//1)Listar todos los productos o poner un limite.
router.get("/api/products", async (req, res)=>{
    //Todos los productos
    const productos = await productManager.getProduct();
    //Marcar límite
    const limit = req.query.limit;
    const limite = productos.slice(0,limit);
    
    if(limit){
        res.json(limite)// (?limit=4)
    }else{
        res.json(productos)
    }   
})
//2)Producto por ID
router.get("/api/products/:pid", async (req,res)=>{
    const pId = req.params.pid;
    const productoById = await productManager.getProductById(pId);

    if(productoById){
        res.json(productoById);
    } else{
        res.send("Error: producto no encontrado");
    }
})
//3)Sumar un Producto
router.post("/api/products", async (req, res)=>{
    const nuevoProducto = req.body;
    
    await productManager.addProducts(nuevoProducto);
})
//4)Borrar un Producto por ID
router.delete("/api/products/:pid", async (req, res)=>{
    let pId = req.params.pid

    await productManager.deleteProdcutById(parseInt(pId));
})
//5)Actualizar un Producto
router.put("/api/products/:pid", async (req, res)=>{
    let id = req.params.pid;
    const updateCamp = req.body

    await productManager.updateProduct(parseInt(id), updateCamp)
})

module.exports = router;