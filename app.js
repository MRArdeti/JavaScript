class Producto{
    constructor(id, nombre, descripcion, precio, cantidad) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.cantidad = cantidad
    }

    aumentarCantidad(){
        this.cantidad++
    }

    disminuirCantidad(){
        this.cantidad--
    }
}

class ProductoController{
    constructor(){
        this.listaProductos = []
    }

    agregar(producto){
        this.listaProductos.push(producto)
    }

    mostrar(){
        let contenedorProducto = document.getElementById("contenedorProducto")
        this.listaProductos.forEach(producto => {
            contenedorProducto.innerHTML += `
            <div class="card text-center mb-3" style="width: 18rem;">
            <div class="card-body">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">${producto.descripcion}</p>
            <p class="card-text">$${producto.precio}</p>
            <button class="btn btn-primary" id="ap-${producto.id}">Añadir al carrito</button>
          </div>
        </div> `
        })

        this.listaProductos.forEach(producto => {
            const ap = document.getElementById(`ap-${producto.id}`)

            ap.addEventListener("click", ()=>{
                carrito.agregar(producto)
                carrito.guardarEnStorage()
                carrito.mostrar()
            })
        }) 
    }
}    

class Carrito{
    constructor(){
        this.listaCarrito = []
    }

    agregar(producto){
        this.listaCarrito.push(producto)
    }

    guardarEnStorage(){
        let listaCarritoJSON = JSON.stringify(this.listaCarrito)
        localStorage.setItem("listaCarrito", listaCarritoJSON)
    }

    recuperarStorage() {
        let listaCarritoJSON = localStorage.getItem("listaCarrito");
    
        if (listaCarritoJSON) { // Verificar si listaCarritoJSON no es null
            let listaCarritoJS = JSON.parse(listaCarritoJSON);
            let listaAux = [];
    
            listaCarritoJS.forEach(producto => {
                let nuevoProducto = new Producto(producto.id, producto.nombre, producto.descripcion, producto.precio, producto.cantidad);
                listaAux.push(nuevoProducto);
            });
    
            this.listaCarrito = listaAux;
        }
    }    

    mostrar(){
        let contenedorCarrito = document.getElementById("contenedorCarrito")
        contenedorCarrito.innerHTML = ""
        this.listaCarrito.forEach(producto => {
            contenedorCarrito.innerHTML += `
            <div class="card border-success mb-3" style="max-width: 18rem;">
                <div class="card-header">Charla</div>
                <div class="card-body text-success">
                <h5 class="card-title">${producto.nombre}</h5>
                <p class="card-text">$${producto.precio}</p>
                </div>
          </div> `
        })
        this.eventoEliminar()
        this.eventoAumentarCantidad()
        this.eventoDisminuirCantidad()
    }

    eventoEliminar(){
        this.listaCarrito.forEach(producto => {
            const ap_eliminar = document.getElementById(`ep-${producto.id}`)
            ap_eliminar.addEventListener("click", ()=>{
                this.eliminar(producto)
                this.guardarEnStorage()
                this.mostrar()
            })
        })
    }

    eventoAumentarCantidad(){
        this.listaCarrito.forEach(producto => {
            const ap_aumentar = document.getElementById(`aumentar-${producto.id}`)
            ap_aumentar.addEventListener("click", ()=>{
                producto.aumentarCantidad()
                this.mostrar()
            })
        })
    }

    eventoDisminuirCantidad(){
        this.listaCarrito.forEach(producto => {
            const ap_disminuir = document.getElementById(`disminuir-${producto.id}`)
            ap_disminuir.addEventListener("click", ()=>{
                producto.disminuirCantidad()
                this.mostrar()
            })
        })
    }

    calcularTotal(){
        return this.listaCarrito.reduce((acumulador,producto)=> acumulador + producto.precio * producto.cantidad ,0)
    }
    mostrarTotal(){
        const precio_total = document.getElementById("precio_total")
        precio_total.innerText = `Precio Total: $${this.calcularTotal()}`
    }
}
const ContP = new ProductoController()
const carrito = new Carrito()

carrito.recuperarStorage()

const ProdUno = new Producto(1, "Charla de Nutrición Deportiva", "Martes 8/11, duración de 4 horas con un break de 20 minutos. Se otorgs certificado.Cupos limitados", 6000)
const ProdDos = new Producto(2, "Alergia al gluten", "Viernes 21/10 de 16:00 a 20:00 y Sábado 22/10 de 10:00 a 13:00. Se otorga certificado. Cupos limitados", 8000)
const ProdTres = new Producto(3, "Intolerancia a la lactosa", "Jueves 20/10 de 17:00 a 19:00. Se otorga certificado. Cupos limitados", 4000)

ContP.agregar(ProdUno)
ContP.agregar(ProdDos)
ContP.agregar(ProdTres)

ContP.mostrar();
carrito.mostrar();








