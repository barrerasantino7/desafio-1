const express = require("express");
const app = express();
const PUERTO = 8080;

const productsRouter = require("./routes/products.router.js")
const cartRouter = require("./routes/cart.router.js")

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/", (req, res)=>{
    res.send("Página inicial")
})

app.use("/", productsRouter);

app.use("/", cartRouter);


app.listen(PUERTO, () =>{
    console.log(`Escuchando en el http://localhost:${PUERTO}`)
})
