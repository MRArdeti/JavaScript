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
        console.log(this.listaProductos)
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

    eventoFinalizarCompra(){
        const finalizar_compra = document.getElementById("finalizar_compra")
        finalizar_compra.addEventListener("click", ()=> {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: '¡Compra realizada con éxito!',
                timer: 2000
            })
        })
    }
}

class Charla {
    constructor(id, nombre, descripcion, precio) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
    }
}

const ContP = new ProductoController()
const carrito = new Carrito()

// Realizar la solicitud Fetch para cargar el archivo JSON de charlas
fetch('../charlas.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('La solicitud de archivo JSON falló');
        }
        return response.json();
    })
    .then(data => {
        // Parsear los datos JSON y crear un array de objetos "charla"
        const charlas = data.charlas.map(charla => {
            let prod = new Producto(charla.id,charla.nombre,charla.descripcion,charla.precio, 1);
            ContP.agregar(prod);
            return prod;
        });

        // Ahora, 'charlas' contiene un array de objetos de la clase "Charla"
        carrito.recuperarStorage()

        ContP.mostrar();
        carrito.mostrar();
    })
    .catch(error => {
        console.error('Error al cargar el archivo JSON:', error);
    });












