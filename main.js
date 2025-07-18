const contenedor = document.getElementById('contenedor-productos');
const selectCategoria = document.getElementById('categoria-select');

class ProductoConCategoria {
  constructor(id, categoria, nombre, precio, imagen, cantidad = 1) {
    this.id = id;
    this.categoria = categoria;
    this.nombre = nombre;
    this.precio = precio;
    this.imagen = imagen;
    this.cantidad = cantidad;
    this.subtotal = this.precio * this.cantidad;
  }
  calcularSubtotal() {
    this.subtotal = this.precio * this.cantidad;
  }
}

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
  new Producto(6, "Joystick", 8500),
  new Producto(7, "Play station 5", 3000),
  new Producto(8, "Samsung s25 ultra", 7500),
  new Producto(9, "Smart tv", 9000),
];

const productosAgregados = [
  new Producto(10, "pc completa", 10000),
  new Producto(11, "auriculares inalambricos", 4000),
  new Producto(12, "iPad", 4000),
  new Producto(13, "silla gamer", 5000),
  new Producto(14, "smart 4k", 3500),
  new Producto(15, "torre", 7500),
  new Producto(16, "proyector led", 8500),
  new Producto(17, "consola", 3000),
];






// Inicializar carrito
let carrito = [];

function guardarCarritoEnLocalStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function cargarCarritoDeLocalStorage() {
  const carritoGuardado = localStorage.getItem("carrito");
  if (carritoGuardado) {
    const carritoParseado = JSON.parse(carritoGuardado);
    carrito.length = 0; // vaciar
    carritoParseado.forEach(item => {
      const prod = new Producto(item.id, item.nombre, item.precio, item.cantidad);
      prod.calcularSubtotal();
      carrito.push(prod);
    });
  }
}

function mostrarCarritoEnDOM() {
  const listaCarrito = document.getElementById("lista-carrito");
  const totalCarrito = document.getElementById("total-carrito");
  listaCarrito.innerHTML = "";
  let total = 0;

  carrito.forEach(prod => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.textContent = `${prod.nombre} x${prod.cantidad} - $${prod.subtotal}`;
    listaCarrito.appendChild(li);
    total += prod.subtotal;
  });

  totalCarrito.textContent = `Total: $${total}`;
}

function mostrarProductos(categoria) {
  contenedor.innerHTML = "";
  const filtrados = productosConCategoria.filter(p => p.categoria === categoria);
  if (filtrados.length === 0) {
    contenedor.innerHTML = '<p>No hay productos para esta categoría.</p>';
    return;
  }
  filtrados.forEach(p => {
    const card = document.createElement("div");
    card.classList.add("col-md-4", "mb-4");
    card.innerHTML = `
      <div class="card h-100">
        <img src="${p.imagen}" class="card-img-top" alt="${p.nombre}" />
        <div class="card-body">
          <h5 class="card-title">${p.nombre}</h5>
          <p class="card-text">Precio: $${p.precio}</p>
          <button class="btn btn-primary btn-comprar" data-id="${p.id}">Comprar</button>
        </div>
      </div>
    `;
    contenedor.appendChild(card);
  });
}
let productosConCategoria = [];
document.addEventListener("DOMContentLoaded", () => {
  const URL = "productos.json";

  // Cargar productos desde JSON
  function cargarCategorias(){
    fetch(URL)
      .then(response => response.json())
      .then(data => {
      productosConCategoria = data;
        renderCategorias(data);
})
      .catch(error => console.error("Error cargando productos:", error));
  }

  cargarCategorias();


  function renderCategorias(productos) {
    contenedor.innerHTML = ""; // limpiar antes de mostrer
    productos.forEach(producto => {
      const card = document.createElement("div");
      card.classList.add("col-md-4", "mb-4");
      card.innerHTML = `
        <div class="card h-100">
          <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}" />
          <div class="card-body">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">Precio: $${producto.precio}</p>
            <button class="btn btn-primary btn-comprar" data-id="${producto.id}">Agregar al carrito</button>
          </div>
        </div>
      `;
      contenedor.appendChild(card);
    });
  }

  // Cargar carrito guardado
  cargarCarritoDeLocalStorage();
  mostrarCarritoEnDOM();

  // Evento para cambio de categoría
  selectCategoria.addEventListener("change", (e) => {
    const categoria = e.target.value;
    if (!categoria) {
      contenedor.innerHTML = "";
    } else {
      mostrarProductos(categoria);
    }
  });
});



  // Escuchar clicks para agregar productos
document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('click', e => {
    if (e.target.classList.contains('btn-comprar')) {
      const id = parseInt(e.target.getAttribute('data-id'));
      const todosLosProductos = [...productos, ...productosAgregados, ...productosConCategoria];
      const prod = todosLosProductos.find(p => p.id === id);
      if (!prod) return;

      const existente = carrito.find(item => item.id === prod.id);
      if (existente) {
        existente.cantidad++;
        existente.calcularSubtotal();
      } else {
        const nuevoProd = new Producto(prod.id, prod.nombre, prod.precio);
        nuevoProd.calcularSubtotal();
        carrito.push(nuevoProd);
      }

      guardarCarritoEnLocalStorage();
      mostrarCarritoEnDOM();



      // SWEETALERT (PRODUCTO AGREGADO)
      Swal.fire({
        icon: 'success',
        title: '¡Agregado al carrito!',
        text: `${prod.nombre} fue añadido correctamente.`,
        showConfirmButton: false,
        timer: 1500
      });
    }
  });
});




  // Mostrar/ocultar carrito
  const botonCerrarCarrito = document.getElementById("cerrar-carrito");
  const carritoContainer = document.getElementById("carrito-container");
  const iconoCarrito = document.getElementById("icono-carrito");

  botonCerrarCarrito.addEventListener("click", () => {
    carritoContainer.classList.remove("mostrar");
  });

  iconoCarrito.addEventListener("click", () => {
    carritoContainer.classList.toggle("mostrar");
  });

  // Vaciar carrito
  window.vaciarCarrito = () => {
    carrito.length = 0;
    guardarCarritoEnLocalStorage();
    mostrarCarritoEnDOM();
  }
