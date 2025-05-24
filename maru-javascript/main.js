function saludar() {

    alert("Bienvenida/o a Un poco de todo, gracias por visitarnos");
}
saludar();



let string="Tienda online abierta 24/7"
console.log(string);



let nombre = prompt ("cual es tu nombre?");
alert("hola " + nombre + ", gracias por visitarnos");
console.log("hola " + nombre + ", gracias por visitarnos");

let edad = prompt("¿Cuántos años tenés?");
if (edad > 18) {
alert("Eres mayor de edad,puedes comprar");
console.log("Eres mayor de edad,puedes comprar");
}
else if (edad < 18){
    alert("Eres menor de edad, no puedes comprar");
    console.log("Eres menor de edad, no puedes comprar");
}




























// Productos
const productos = [
    { nombre: "Samsung a55", precio: 4500, stock: 3 },
    { nombre: "Auriculares", precio: 4000, stock: 8 },
    { nombre: "Pc gamer", precio: 5000, stock: 2 },
    { nombre: "Iphone 12pro", precio: 3500, stock: 3 },
    { nombre: "Iphone 12pro max", precio: 7500, stock: 1 },
    { nombre: "Joysting", precio: 8500, stock: 3 },
    { nombre: "Play station 5", precio: 3000, stock: 3 },
    { nombre: "Samsung s25 ultra", precio: 7500, stock: 5 },
    { nombre: "Smart tv", precio: 9000, stock: 7 }
];

console.log(productos);


let carrito = [];


let seleccion = prompt("¿Desea ver nuestros productos? (si/no)");
while (seleccion !== "si" && seleccion !== "no") {
    alert("Ingrese una opción válida");
    seleccion = prompt("¿Desea ver nuestros productos? (si/no)");
}



if (seleccion === "si") {
    alert("Estos son nuestros productos.");}
    let seguirComprando = true;

    while (seguirComprando) {
    
        // Mostrar productos
    
        let lista = "Estos son nuestros productos disponibles:\n";
        lista += "1. Samsung a55 $4500\n";
        lista += "2. Auriculares $4000\n";
        lista += "3. Pc gamer $5000\n";
        lista += "4. Iphone 12pro $3500\n";
        lista += "5. Iphone 12pro max $7500\n";
        lista += "6. Joysting $8500\n";
        lista += "7. Play station 5 $3000\n";
        lista += "8. Samsung s25 ultra $7500\n";
        lista += "9. Smart tv $9000\n";
        alert(lista);
        // Selección de producto
    
        let eleccion = parseInt(prompt("Elegí un producto del 1 al 9 para agregar al carrito"));
        if (eleccion >= 1 && eleccion <= productos.length) {
            let productoElegido = productos[eleccion - 1];
            carrito.push(productoElegido);
            alert("Agregaste al carrito: " + productoElegido.nombre + " $" + productoElegido.precio);
        } else {
            alert("Producto no disponible");
        }

    
        let agregarOtro = prompt("¿Deseás agregar otro producto? (si/no)");
        while (agregarOtro !== "si" && agregarOtro !== "no") {
            alert("Ingrese una opción válida");
            agregarOtro = prompt("¿Deseás agregar otro producto? (si/no)");
        }

        if (agregarOtro === "no") {
            seguirComprando = false;
        }
    }



    calcularPrecioFinal();
    console.log("Productos en el carrito:");
    for (let producto of carrito) {
        console.log(producto.nombre + " $" + producto.precio);
    }


// Función para total
function calcularPrecioFinal() {
    let total = 0;
    for (let producto of carrito) {
        total += producto.precio;
    }

    if (total > 0) {
        alert("El total de tu compra es: $" + total);
        console.log("El total de tu compra es: $" + total);
    }
}

function despedir() {
    alert("Gracias por tu visita,esperamos verte pronto");
}

despedir()
