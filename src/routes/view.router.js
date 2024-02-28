const express = require("express");
const router = express.Router();

const productManager = require("../controllers/product-manager");
const productmanager = new productManager("./src/models/arrayProducts.json");

router.get("/", async (req, res)=>{
    const arrayproducts = await productmanager.getProduct();
    res.render("home", {arrayproducts})
})

router.get("/realtimeproducts", async (req,res)=>{
    const arrayproducts = await productmanager.getProduct();
    res.render("realtimeproducts", {arrayproducts})

})

router.get("/practica", (req, res)=>{
    res.render("index")
})

module.exports = router;