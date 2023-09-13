let miFormulario = document.getElementById("Formulario");
miFormulario.addEventListener("submit", validarFormulario);

function validarFormulario(e){
    e.preventDefault();
    miFormulario.reset();
}