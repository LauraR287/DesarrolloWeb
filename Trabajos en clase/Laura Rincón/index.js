// let identificador = "value"
let identificador = "value"
let cocina = "platos"
console.log(identificador);

// String "texto"
// Numericos 1, 1.5
let edad = 18;
if (edad => 18) {
    console.log("Bienvenid@ a la fiesta");
} else {
    console.log("Usted no puede entrar a la fiesta");
}

let contador = 0;
for (let i = 0; i < 10; i++) {
    console.log(i);
}

// Declaracion de variables
var numero = 10; // Se puede modificar
if (true) {
    let nombre = "Laura"; // Alcance de un solo bloque, cambia
    console.log(nombre)
    const pi = 3.1416; // Alcance de un solo bloque, no cambia
    console.log(pi)
    numero = 20;
}
console.log(numero)

while (contador < 10) {
    console.log(contador);
    contador++;
}

let index = 3;
do {
    console.log(index)
} while (index < 2);


// Funciones

let numero1 = 10;
let numero2 = 5;

function suma(n1, n2){
    console.log(n1 + n2)
    return n1 + n2
}

suma(numero1, numero2)

// Funciones anonimas
const despedida = function(){
    console.log("Despedida")
}
despedida();

// Funciones flecha
const saludarFlecha = (nombre) => {
    console.log("Hola " + nombre + ", esta es la función tipo flecha")
}
saludarFlecha("Esteban")

// Funcion asincrona "Promesas" por que se puede o no cumplir.
