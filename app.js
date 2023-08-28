// Primer Pre-Entrega
/* function descripcionCompra(pelicula, cantidad, precio){
    return "Pelicula: " + pelicula + " Cantidad de tickets: " + cantidad + " Total: " + precio;
}

let detalleCompra = "";
let total = 0;
let rta = "";

while(rta !== "-") {

    let pelicula = prompt("¿Qué pelicula desea ver?" + "\n" + "Barbie." + " " + "Ticket $1300 cada uno. Función 14:00 hs." + "\n" + "Rápidos y furiosos." + " " + "Ticket $1500 cada uno. Función 21:00 hs." + "\n" + "Elementos." + " " + "Ticket $1100 cada uno. Función 17:00 hs." + "\n" + "La noche del demonio." + " " + "Ticket $1500 cada uno. Función 23:00 hs.")
    let cantidad = Number(prompt("Ingrese la cantidad de entradas que desea comprar"));

    if(pelicula == "Barbie") {
        precio = 1300 * cantidad;
    }
    else if(pelicula == "Rápidos y furiosos") {
        precio = 1500 * cantidad;
    }
    else if(pelicula == "Elementos") {
        precio = 1100 * cantidad;
    }
    else if(pelicula == "La noche del demonio") {
        precio = 1500 * cantidad;
    }
    else {
        alert("Ingresó mal el nombre de la película");
    }

    total= total + precio;
    detalleCompra = detalleCompra + descripcionCompra(pelicula,cantidad,precio)
    alert(detalleCompra)
    
    rta = prompt("Ingrese `-` para salir. O hace click en `Aceptar` para continuar comprando")
}

alert(detalleCompra + "\n" + "El total de la compra es de:" + total);

*/ 

// Segunda Pre-Entrega
class Producto {

    constructor(nombre, precio) {
      this.nombre = nombre;
      this.precio = precio;
    }
  }

  let Pochoclos = new Producto("Pochoclos",1000);
  let Gaseosa = new Producto("Gaseosa", 600);
  let PapasFritas = new Producto("Papas fritas", 800);
  let Galletitas = new Producto("Galletitas", 500);
  let Alfajor = new Producto("Alfajor", 400);

  let ListaProd = [Pochoclos, Gaseosa, PapasFritas, Galletitas, Alfajor];
  let listaNombres = [];


  for (const prod of ListaProd) {
    listaNombres.push(prod.nombre);
  }

let total = 0;
let rta = "";
let detalleCompra = "";

while(rta !== "-") {

    let UsuarioProd = prompt("¿Qué producto desea comprar?" + "\n" + listaNombres.join(","))
    let subTotal = 0;
    let cantidad = 0;

    const mProd = ListaProd.find(function(producto){
        return producto.nombre == UsuarioProd
    }) 
    //si encuentra el producto
    if(mProd){
        alert("Producto en stock"+ " " + mProd.nombre)
        cantidad = Number(prompt("Ingrese la cantidad que desea comprar"));
        //calcula el sub total dependiendo la cantidad q llevara
        subTotal = mProd.precio * cantidad;
        //Detalla la compra
        detalleCompra += mProd.nombre + " x "  + cantidad + "\n";
        //Suma el total global
        total= total + subTotal;
       
    }else{
        //No se encontro el producto
        alert("el producto no se encuentra")
    }

  
    rta = prompt("Ingrese `-` para salir. O hace click en `Aceptar` para continuar comprando")
}

alert(detalleCompra + "\n" + "El total de la compra es de: " + total);













