const express = require("express");
const app = express();
const PUERTO = 8080;
const exphbs= require("express-handlebars"); //Importa Handlebars
const socket = require("socket.io"); //Importación para Websockets

//Importar rutas
const productsRouter = require("./routes/products.router.js");
const cartRouter = require("./routes/cart.router.js");
const viewRouter= require("./routes/view.router.js");

//Middleware
app.use(express.static("./src/public"))// Enlace con carpeta Public
app.use(express.json()); //Avisamos al sistema que vamos a usar JSON
app.use(express.urlencoded({extended:true}));

//Handlebars
app.engine("handlebars", exphbs.engine()); //Esto configura Handlebars. Cuando express encuentre un archivo handlebars lo va a renderizar con el motor de plantillas.
app.set("view engine", "handlebars"); // Le decimos que el motor de plantillas a usar es Handlebars
app.set("views", "./src/views");//Le decimos donde se encuentran los archivos Handlebars

//Rutas
app.use("/", viewRouter);
app.use("/", productsRouter);
app.use("/", cartRouter);

//Crear referencia del server para poder trabajar con websocket
const httpServer = app.listen(PUERTO, () =>{
    console.log(`Escuchando en el http://localhost:${PUERTO}`)
})

//Importamos el controlador ProductManager para traer el array de productos
const ProductManager= require("./controllers/product-manager.js")
const productmanager= new ProductManager("./src/models/arrayProducts.json")

//Websocket desde el lado del servidor
const io = socket(httpServer);

io.on("connection", async (socket)=> {
    console.log("Un cliente se conecto conmigo");

    const productos = productmanager.getProduct();
    socket.emit("productos", await productos)

    socket.on("saludo", (data)=>{
        console.log(data)
    })

    socket.on("eliminarProducto", async (id)=>{

        await productmanager.deleteProdcutById(id);
        io.sockets.emit("productos", await productmanager.getProduct())
    })

    socket.on("sumarProducto", async (producto)=>{
        await productmanager.addProducts(producto)
        io.socket.emit("productos", await productmanager.getProduct())
        
    })

})// Inicia la conexion


