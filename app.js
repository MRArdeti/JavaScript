function descripcionCompra(pelicula, cantidad, precio){
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
