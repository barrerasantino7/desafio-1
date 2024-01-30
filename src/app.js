const express = require("express");
const ProductManager = require("./main.js")
const fs = require("fs");
const app = express();
const PUERTO = 8080;

app.use(express.urlencoded({extended:true}))

app.get("/", (req, res)=>{
    res.send("Página inicial")
})

app.get("/products", async (req, res)=>{
    const lecturaArchivo = await fs.promises.readFile("./arrayProducts.json", "utf-8")
    const lecturaJson = JSON.parse(lecturaArchivo)

    let limit = req.query.limit

    const limite = lecturaJson.slice(0,limit);

    if(limit){
        res.send(limite)
    }else{
        res.send(lecturaJson)
    }   
})

app.get("/products/:pid", async (req,res)=>{
    const pId = req.params.pid;

    const lecturaArchivo = await fs.promises.readFile("./arrayProducts.json", "utf-8")
    const lecturaJson = JSON.parse(lecturaArchivo)
    const productById = lecturaJson.find((products)=>products.id == pId)

    if(productById){
        res.send(productById);
    } else{
        res.send("Error: producto no encontrado");
    }

})










app.listen(PUERTO, () =>{
    console.log(`Escuchando en el http://localhost:${PUERTO}`)
})
