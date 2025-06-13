class Producto {
  constructor(id, nombre, precio, cantidad = 1) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.cantidad = cantidad;
    this.subtotal = this.precio * this.cantidad;
  }

  calcularSubtotal() {
    this.subtotal = this.precio * this.cantidad;
  }
}

const productos = [
  new Producto(1, "Samsung a55", 4500),
  new Producto(2, "Auriculares", 4000),
  new Producto(3, "Pc gamer", 5000),
  new Producto(4, "Iphone 12pro", 3500),
  new Producto(5, "Iphone 12pro max", 7500),
  new Producto(6, "Joysting", 8500),
  new Producto(7, "Play station 5", 3000),
  new Producto(8, "Samsung s25 ultra", 7500),
  new Producto(9, "Smart tv", 9000),
];

const carrito = [];

//guardar carrito en localstorage//
function guardarCarritoEnLocalStorage() {
localStorage.setItem("carrito", JSON.stringify(carrito));
}

// cargar carrito desde localStorage//
function cargarCarritoDeLocalStorage() {
const carritoGuardado = localStorage.getItem("carrito");
if (carritoGuardado) {
    const carritoParseado = JSON.parse(carritoGuardado);
    carrito.length = 0; // Vaciar carrito actual
    carritoParseado.forEach(item => {
    const prod = new Producto(item.id, item.nombre, item.precio, item.cantidad);
    prod.calcularSubtotal();
    carrito.push(prod);
    });
}
}

document.addEventListener("DOMContentLoaded", () => {
const nodoTitulo = document.getElementById("titulo");
const iconoCarrito = document.getElementById("icono-carrito");
const carritoContainer = document.getElementById("carrito-container");
const listaCarrito = document.getElementById("lista-carrito");
const totalCarrito = document.getElementById("total-carrito");

let nombre = prompt("Ingresa tu nombre");
nodoTitulo.innerText = "Bienvenid@ " + nombre + " a nuestra tienda online";

  // Cargar carrito guardado al iniciar//
cargarCarritoDeLocalStorage();
mostrarCarritoEnDOM();

  // Escuchar botones comprar//
document.querySelectorAll(".btn-comprar").forEach((boton) => {
    boton.addEventListener("click", (e) => {
    const id = parseInt(e.target.getAttribute("data-id"));
    const prod = productos.find((p) => p.id === id);

    if (!prod) return;

    const existente = carrito.find((item) => item.id === prod.id);
    if (existente) {
        existente.cantidad++;
        existente.calcularSubtotal();
    } else {
        carrito.push(new Producto(prod.id, prod.nombre, prod.precio));
    }

    guardarCarritoEnLocalStorage();
    mostrarCarritoEnDOM();
    });
});

  // Mostrar, ocultar carrito//
iconoCarrito.addEventListener("click", () => {
    carritoContainer.classList.toggle("mostrar");
});

  // Ocultar carrito si clic afuera//
document.addEventListener("click", (e) => {
    if (
    !carritoContainer.contains(e.target) &&
    !iconoCarrito.contains(e.target)
    ) {
    carritoContainer.classList.remove("mostrar");
    }
});

  // Vaciar carrito //
window.vaciarCarrito = () => {
    carrito.length = 0;
    guardarCarritoEnLocalStorage();
    mostrarCarritoEnDOM();
};

  // Función para mostrar el carrito en el DOM//
function mostrarCarritoEnDOM() {
    listaCarrito.innerHTML = "";
    let total = 0;

    carrito.forEach((prod) => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.textContent = `${prod.nombre} x${prod.cantidad} - $${prod.subtotal}`;
    listaCarrito.appendChild(li);
    total += prod.subtotal;
    });

    totalCarrito.textContent = `Total: $${total}`;
  }
});






const botones = document.querySelectorAll('.btn-comprar');


botones.forEach(boton => {
boton.innerText = 'Comprar ahora';
});




document.querySelectorAll('.btn-comprar');

botones.forEach(boton => {
boton.addEventListener('click', () => {
    alert('El producto se ha agregado al carrito');
});
});



