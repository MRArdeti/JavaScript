let miFormulario = document.getElementById("Formulario");
miFormulario.addEventListener("submit", function (e) {
    e.preventDefault(); 
    //Obtengo los datos del formulario
    const nombre = document.querySelector('input[aria-label="First name"]').value;
    const apellido = document.querySelector('input[aria-label="Last name"]').value;
    const email = document.querySelector('input[aria-label="Email"]').value;

    //Almaceno los datos del usuario en un obj
    const datosFormulario = {
        nombre: nombre,
        apellido: apellido,
        email: email
    };
    //Daremos de alta al usuario para luego contactarnos.
    //Post a la api, pasando los datosFormulario como cuerpo de la peticion POST
    fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosFormulario)
    }).then((response ) => {
        //Validamos la respuesta
        if(response.ok){
         document.getElementById("submiteSuccess").innerText = "Se ha dado de alta satisfactoriamente al usuario.";
         document.getElementById("submiteSuccess").style.color = "Black";
         return response.json();
        }
        else{
            document.getElementById("submiteSuccess").innerText = "No se ha podido dar de alta al usuario.";
             document.getElementById("submiteSuccess").style.color = "Red";
        }
    }).then((data) => {
        console.log("Respuesta de la api",data)
        //Reinicio el fomrulario
        miFormulario.reset();
    }).catch((error) => {
        document.getElementById("submiteSuccess").innerText = "No se ha podido dar de alta al usuario.";
        document.getElementById("submiteSuccess").style.color = "Red";
    })
   
});


/*
 .then(function(response) {
        if (!response.ok) {
            throw new Error('La solicitud no fue exitosa');
        }
        return response.json(); // Parsear la respuesta JSON
    })
    .then(function(data) {
        // Manejar la respuesta del servidor aquí
        console.log('Respuesta del servidor:', data);
        miFormulario.reset();
    })
    .catch(function(error) {
        // Manejar errores aquí
        console.error('Error:', error);
    });*/