

class elementoCarrito {
    constructor(producto, cantidad) {
        this.producto = producto;
        this.cantidad = cantidad;
    }
}
//arrays

let carrito = [];
let productos = [];
let categorias = [];





//DEFINICION DE CONSTANTES O VARIABLES
const contenedorProductos = document.getElementById('contenedor-productos');
const contenedorCarritoCompras = document.getElementById("items")
const contenedorFooterCarrito = document.getElementById("footer");
let tarjetas=document.getElementById("TARJETAS");
let botonCompra = document.getElementById("botonCompra")
let botonCarrito = document.getElementById("botonVaciar")

//cargar el carrito
carrito = JSON.parse(localStorage.getItem("carrito")) || [];



//EJECUCION DE FUNCIONES
cards();
dibujarCarrito();
vaciarCarrito();
compra();


//DECLARACION DE FUNCIONES

//REALIZACION DE LAS CARDS


function cards () {
    fetch('../productos.json')
    .then((res) => res.json())
    .then((productos) => {
    for (const producto of productos) {
    let tarjeta=document.createElement("div");
    tarjeta.className="card col-6 col-md-4 col-lg-3 "
    tarjeta.innerHTML=`
    <div class="card" style="width: 18rem;">
    <img src= ${producto.imagen} class="card-img-top" alt="...">
        <h5 class="card-title">${producto.marca}</h5>
        <p class="card-text">Modelo: ${producto.modelo}</p>
        <p class="card-text">${producto.tipo}</p>
        <p class="card-text"><strong>Precio: $${producto.precio}</strong></p>
    <a href="#"  id="miBoton--${producto.modelo}"  class="btn boton__footer">COMPRAR</a>
    </div>
    `
    tarjetas.append(tarjeta);

    //EVENTOS DE BOTON DE CARDS
    let boton=document.getElementById(`miBoton--${producto.modelo}`);
    boton.addEventListener("click", (e) => {
        let elementosCarrito = new elementoCarrito (producto, 1)
        //pushea al array carrito
        carrito.push(elementosCarrito);

        //guarda en el local storage
        localStorage.setItem("carrito",JSON.stringify(carrito));

        dibujarCarrito();
        swal ({
            title: "¡Producto agregado!",
            text: `${producto.modelo} agregado al carrito de compra`,
            icon: "success",
            buttons: {
                cerrar: {
                    text: "Cerrar",
                    value: false
                },
                carrito: {
                    text: "Ir al carrito",
                    value: true
                }
            }
        }).then((irACarrito) => {

            if(irACarrito) {
                const myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {keyboard: true});
                const modalToggle = document.getElementById('toggleMyModal'); 
                myModal.show(modalToggle);

            }
        });
    })

}
})
}

//CARRITO
function dibujarCarrito() {

    let totalCarrito = 0;
    contenedorCarritoCompras.innerHTML = "";

    carrito.forEach(
        (elemento) => {
            let renglonesCarrito= document.createElement("tr");
            
            renglonesCarrito.innerHTML = `
                <td>${elemento.producto.marca}</td>
                <td>${elemento.producto.modelo}</td>
                <td><input id="cantidad-producto-${elemento.producto.modelo}" type="number" value="${elemento.cantidad}" min="1" max="1000" step="1" style="width: 30px;"/></td>
                <td style="width: 130px;">${elemento.producto.precio}</td>
                <td  style="width: 150px;">${elemento.producto.precio*1.21
                *elemento.cantidad}</td>
                <td><button id="eliminarDelCarrito${elemento.producto.modelo}" onclick="Eliminar()" style="color:brown;" class="btn btn-light"> 🗑 </button>
                </td>
            `;


            totalCarrito+=elemento.cantidad*elemento.producto.precio*1.21;
            contenedorCarritoCompras.append(renglonesCarrito);


            
            //agregamos evento a carrito
            let cantidadProductos = document.getElementById(`cantidad-producto-${elemento.producto.modelo}`);

            cantidadProductos.addEventListener("change", (e) => {
                let nuevaCantidad = e.target.value;
                elemento.cantidad = nuevaCantidad;
                dibujarCarrito();
            });
        }
        
    )

//OPERADOR TERNARIO TEXTO DE CARRITO
    carrito.length==0 ? contenedorFooterCarrito.innerHTML = `
    <th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>
    ` : contenedorFooterCarrito.innerHTML = `
    <th scope="row" colspan="5">Total de la compra: $${totalCarrito}</th>
    `;

}



//alert para terminar la compra
function compra () {
    botonCompra.onclick = (i) => {
        i.preventDefault;
        if (carrito.length === 0) {
            swal({
                text:'Selecciona un producto primero!',
                icon: "warning",
                timer: "3000"
                });
        } else {
            swal({
                title: "Estamos preparando tu compra!",
                text: "Muchas gracias por confiar en nosotros!",
                icon: "success",
                button: "Cerrar",
            });
            carrito.length= 0 
            contenedorCarritoCompras.innerText = `<th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>`
            const URLPOST="https://jsonplaceholder.typicode.com/posts";
            const nuevaOrden= carrito
            fetch(URLPOST,{
            method:'POST',
            body:JSON.stringify(nuevaOrden),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
            .then( resp => resp.json())
            .then( data => {
                //lo que retorna
                console.log("Detalles de su orden: ");
                console.log(data);
            })
            dibujarCarrito();
            localStorage.removeItem("carrito",JSON.stringify(carrito));
        }
        }
}

//alert para vaciar carrito 
function vaciarCarrito () {
    botonCarrito.onclick = (i) => {
        i.preventDefault;
        if (carrito.length===0) {
            swal({
                text:'Todavia no has agregado nada!',
                icon: "warning",
                timer: "3000"
                });
        } else {
            swal({
                title: "Productos eliminados",
                text: `Esperamos tu compra!`,
                icon: "success",
                buttons: {
                    cerrar: {
                        text: "Cerrar",
                        value: false
                    }
                }
            })
            carrito.length = 0
            contenedorCarritoCompras.innerText = `<th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>`
            dibujarCarrito();
            localStorage.removeItem("carrito",JSON.stringify(carrito));
        }
        
    }
}
// sacar del carrito 
function Eliminar (modelo) {
    let indice = carrito.find (prod => prod.modelo == modelo)
    carrito.splice (indice, 1);
    swal({
        text:"Producto eliminado del carro!",
        position: 'center',
        icon: "success",})
    dibujarCarrito();
}



