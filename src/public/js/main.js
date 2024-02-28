console.log("Funcionando");

const socket = io(); 
socket.emit("saludo","Hola")

socket.on("productos", (data)=>{
    console.log(data)
    renderProductos(data)
})

//Funcion para renderizar nuestros productos:
const renderProductos = (productos) =>{
    //Usamos DOM para hacer uso del div en el html
    const contenedorProductos = document.getElementById("contenedorProductos");
    //Para que no se dupliquen los productos
    contenedorProductos.innerHTML=""

    productos.forEach(item => {
        //creamos un DIV
        const card = document.createElement("div");
        card.classList.add("card");

        //se coloca lo que queremos inyectar en el div
        card.innerHTML = `
        <p>${item.title}</p>
        <p>${item.description}</p>
        <p>${item.code}</p>
        <p>${item.price}</p>
        <p>${item.status}</p>
        <p>${item.stock}</p>
        <p>${item.category}</p>
        <button>Eliminar</button>
        `;
        //Colocamos las card dentro del contenedor de productos.
        contenedorProductos.appendChild(card)

        //Boton para eliminar producto
        card.querySelector("button").addEventListener("click", ()=>{
            eliminarProducto(item.id);
        })
    });

}

const eliminarProducto = (id) =>{
    socket.emit("eliminarProducto", id)
}

let nuevoObjeto
function agregarDatos(){
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;
    const code = document.getElementById("code").value;
    const status = document.getElementById("status").value;
    const stock = document.getElementById("stock").value;
    const category= document.getElementById("category").value;


    nuevoObjeto = {title,description,price,code,status,stock,category};
    sumarProducto(nuevoObjeto);
}

const sumarProducto = (producto) =>{
    socket.emit("sumarProducto", producto)
}


 




