// DECLARACION DE CONSTANTES O VARIABLES
const campoNombre= document.getElementById("nombre");
const campoApellido= document.getElementById("apellido")
const campoTelefono= document.getElementById ("telefono")
const formulario=document.getElementById("formulario");
const campoMail = document.getElementById("mail")
const campoText = document.getElementById("textarea")
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})


//DECLARACION DE FUNCIONES
campoNombre.oninput=() => {
    if (isNaN(campoNombre.value)) {
        campoNombre.style.color="black";
    } else {
        campoNombre.style.color="red";
    }
} 

campoApellido.oninput = () => {
    if (isNaN(campoApellido.value)) {
        campoApellido.style.color="black";
    } else {
        campoApellido.style.color="red";
    }
}

campoMail.oninput = () => {
    if (isNaN(campoMail.value)) {
        campoMail.style.color="black";
    } else {
        campoMail.style.color="red";
    }
}



formulario.addEventListener("submit", validarFormulario)

function validarFormulario (e) {
    if ((campoNombre.value=="") || (!isNaN(campoNombre.value)) || (campoApellido.value=="") || (!isNaN(campoApellido.value)) || (campoMail.value=="") || (!isNaN(campoMail.value)) )
    {
        e.preventDefault();
        swal ("Por favor llena todos los campos")
    } else if ((campoText.value=="") || (!isNaN(campoText.value))) {
        e.preventDefault();
        swal ("Pone tu duda en la casilla! Con gusto la responderemos!")
    } else if (campoTelefono.value <= 10){
        e.preventDefault();
    }
}
