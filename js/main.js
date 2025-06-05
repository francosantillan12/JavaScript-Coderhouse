//******* MI CALCULADORA********** */

let historial = []

const pedirNumeros = () => {
  let numeroA = parseInt(prompt("Ingrese el primer número"))
  let numeroB = parseInt(prompt("Ingrese el segundo número"))
  return [numeroA, numeroB];
}

const sumar = (numeroA, numeroB) => {
  let resultado = numeroA + numeroB
  alert (numeroA + "+" + numeroB + "=" + resultado)
  let operacion = numeroA + " + " + numeroB + " = " + resultado;
  historial.push(operacion)
  console.log("Tu historial es:" + operacion)
}

const restar = (numeroA, numeroB) => {
  let resultado = numeroA - numeroB
  alert (numeroA + "-" + numeroB + "=" + resultado)
  let operacion = numeroA + " - " + numeroB + " = " + resultado;
  historial.push(operacion)
}

 const multiplicar = (numeroA, numeroB) => {
  let resultado = numeroA * numeroB
  alert (numeroA + "*" + numeroB + "=" + resultado)
  let operacion = numeroA + " * " + numeroB + " = " + resultado;
  historial.push(operacion)
 }

const dividir = (numeroA, numeroB) => {
  if (numeroB === 0) {
    alert("Error: No se puede dividir por cero");
    return;
  }
  let resultado = numeroA / numeroB;
  alert(numeroA + "/" + numeroB + "=" + resultado);
  let operacion = numeroA + " / " + numeroB + " = " + resultado;
  historial.push(operacion);
}



let menu = parseInt(prompt("elija una opcion: \n 1-sumar \n 2-restar \n 3-multiplicar \n 4-dividir \n 5-ver historial \n 6-salir"))


while(menu !== 6) { //que el numero que se le cargue a "menu" tiene que ser distinto que 5, de esta manera salgo
  if(menu >= 1 && menu <= 4) {
    let numeros = pedirNumeros()
    switch(menu){
      case 1: 
        sumar(numeros[0], numeros[1])
        break
      case 2: 
        restar(numeros[0], numeros[1])
        break
      case 3: 
        multiplicar(numeros[0], numeros[1])
        break
      case 4: 
        dividir(numeros[0], numeros[1])
        break
    }
  } else if(menu === 5) {
    if(historial.length === 0) {
      alert("Aún no hay operaciones en el historial")
    } else {
      alert("Historial:\n" + historial.join("\n"))
    }
  } else {
    alert("Opción incorrecta")
  }

  menu = parseInt(prompt("elija una opcion: \n 1-sumar \n 2-restar \n 3-multiplicar \n 4-dividir \n 5-ver historial \n 6-salir"))
}
alert("gracias")
 










// function sumar (){
//   let numeroA = parseInt(prompt("ingrese el primer numero"))
//   let numeroB = parseInt(prompt("ingrese el segundo numero"))
//   let resultado = numeroA + numeroB
//   alert(numeroA + "+" + numeroB + "=" + resultado )
// }

//  function restar (){
//    let numeroA = parseInt(prompt("ingrese el primer numero"))
//    let numeroB = parseInt(prompt("ingrese el segundo numero"))
//    let resultado = numeroA - numeroB
//    alert(numeroA + "-" + numeroB + "=" + resultado )
// }

// function multiplicar (){
//   let numeroA = parseInt(prompt("ingrese el primer numero"))
//   let numeroB = parseInt(prompt("ingrese el segundo numero"))
//   let resultado = numeroA * numeroB
//   alert(numeroA + "x" + numeroB + "=" + resultado )
// }


// function dividir (){
//   let numeroA = parseInt(prompt("ingrese el primer numero"))
//   let numeroB = parseInt(prompt("ingrese el segundo numero"))
//   let resultado = numeroA / numeroB
//   alert(numeroA + " / " + numeroB + "=" + resultado )
// }

// Función para pedir los dos números






//let  curso = " JavaScript-flex" 
/* De esta manera cree la valiable "curso" de tipo "sting" y 
            le asigné el nombre "javascript-flex"*/




//let comision = 90600 
/* Creé la variable "comision" de tipo "numerica" y le asigné un valor */



//let tutor = false 
/* Creé la variable "tutor" de tipo "booblean" y
 le asigné que sea "falso"  */ 


//let plataforma = "CoderHouse"

//console.log("Plataforma: "+plataforma)

//const academia = "CoderHouse"
//ACÁ CREE UNA "CONSTANTE" CON EL NOMBRE "CODERHOUSE" 


//let curso = prompt ("Ingrese la materia")
//let comision = prompt ("Ingrese el numero de comision") 


 
//console.log("Materia: "+curso+" Comision N "+comision+ "Academia:"+academia)
//console.log ("Comision N"+ comision)

//con "parseInt" todo lo que escribamos se transforma en tipo numerico
// let numeroA = parseInt(prompt("ingrese el primer numero")) 
 //let numeroB = parseInt(prompt("ingrese el segundo numero"))


 //let resultado = numeroA + numeroB 
 //console.log(resultado)




 //let edad = 20
 //let acceso = (edad => 18) && (edad <= 30)
 //console.log (acceso)

 //let temperatura = 91
 //let encender = (temperatura >= 80) && (temperatura <=93)
 //console.log (encender)

 //let edad = 20;
 //let dinero = false

 //if(edad >= 21 || dinero) {
   // console.log("ingresá")
 //} else {
 //   console.log("no podes ingresar bro")
 //} 


//AND (&&) = se tienen que cumplir ambas condiciones para que el resultado sea true.

//OR (||) = se tiene que cumplir al menos una de las condiciones




/*
let edad = null;
let nombre = "Carlos";

if (edad !== null && edad !== undefined) {
  console.log(`Tienes ${edad} años`);
} else {
  if (nombre) {
    console.log(`Bienvenido, ${nombre}`);
  } else {
    console.log("Información incompleta");
  }
}
  
En este ejemplo:

Paso 1: Verificamos si edad tiene un valor válido.

Paso 2: Si no, evaluamos si nombre está definido.

Paso 3: Dependiendo de las condiciones, mostramos el mensaje correspondiente.

*/

//USUARIOS
//const usuarios =  [
  //  {nombre: "Ana", edad: 20, aceptoTerminos: false},
    //{nombre: "Luis", edad:18,  aceptoTerminos: true},
    //{nombre: "Carlos", edad: 18, aceptoTerminos: true},
   // {nombre: "Maria", edad: 20, aceptoTerminos: true}
//]

//for (let i = 0; i < usuarios.length; i++){ // propiedad (.length) "le decis, va a iterar siempre que I sea menor a la cantidad de elementos que tiene el array de usuarios
//    if(usuarios[i].edad >=18 && usuarios[i].aceptoTerminos){
//        console.log(usuarios[i].nombre)
//    }
//} 

// VALIDADOR DE ACCESO


//let = color = prompt("color del semaforo (rojo, amarillo, verde)")



//if (color === "rojo"){
 // console.log("ALTO!")
//} else if (color === ("amarillo"){
//  console.log ("ATENCION!")
//} else (color === "verde"){
//  console.log("avance")
//}



//*********QUIZ DE TRES PREGUNTAS**************** */
/*let jugarOtraVez = prompt ("¿Estas listo para este quiz de 3 preguntas? si/no").toLowerCase().trim();

while (jugarOtraVez === "si"){

let puntaje = 0
let respuestaUsuario = prompt ("¿Quien salió campeón del mundo en el mundial de qatar 2022?\na) Alemania\nb) Francia\nc) Argentina");
let respuestaUsuario2 = prompt ("¿Quien metió 3 goles en la final del mundo en qatar 2022?\na) Mercado \nb) Mbappe \nc) Messi ");
let respuestaUsuario3 = prompt ("¿Quien patió el ultimo penal en la final en el mundial de qatar 2022? \na) Montiel \nb) Messi \nc) Tragliafico");

  
  if (respuestaUsuario === "c"){
  puntaje++
  console.log("Correcto, sumaste 1 punto!")
} else  {
  console.log ("Incorrecto")
}


if (respuestaUsuario2 === "b"){
  puntaje++
  console.log("Correcto, sumaste 1 punto")
} else {
  console.log ("Incorrecto, no sumaste puntos")
}


if (respuestaUsuario3 === "a"){
  puntaje++
  console.log("Correcto! sumaste 1 punto")
}else {
  console.log ("Incorrecto, no sumaste nada")
}


alert("Terminaste el quiz. Acertaste " + puntaje + " de 3 preguntas")
jugarOtraVez = prompt ("¿Querés seguír jugando? si/no").toLowerCase().trim();
}
*/

/*function saludar(nombre){
  console.log("hola" + nombre + "!");
}*/




/*function numero (numeroPar){
  if (numeroPar % 2 == 0){
    console.log("es par")
  }else{
    console.log("es impar")
  }
}

let  entrada = prompt("ingrese un numero");
let numeroUsuario = Number(entrada);
numero(numeroUsuario); */


/*function edad (edad){
  if (edad >= 18){
  console.log("podes votar")
  }else{
  console.log("no podes votar")
}
}
edad(21)//consola devuelte "podes votar"*/

/*function valorDeLibros(preciodelibro){
  const alquilerPorDia = 10
  return preciodelibro + alquilerPorDia
}
let libro = valorDeLibros(10)
let dias = alquilerPorDia + valorDeLibros

console.log(`el valor del libro es: $${libro}`)
*/


//let nombre = prompt("Decime tu nombre") 
//let edad = parseInt(prompt("Decime tu edad"))
/*let signo = prompt("¿Que signo sos?")

function saludar(nombre, edad, signo) {
  console.log("Hola " + nombre)
  console.log("Tu edad es " + edad)
  console.log("tu signo es " + signo)

  if (isNaN(edad)) {
    console.log("La edad ingresada no es válida.")
  } else if (edad >= 18) {
    console.log("Sos mayor de edad.")
  } else {
    console.log("Sos menor de edad.")
  } if (signo === "picis"){
    console.log("sos picis!!!,como justin")
  }else {
    console.log("No sos como justin")
  }
}

saludar(nombre, edad, signo)
*/

// let edadIngresada = parseInt(prompt("¿cuantos años tenes?"))
// function verificarEdad (){
//   let mayorDeEdad = edad >= 18
//   alert ()
// }




// SUMA 
//let primerNumero = parseInt(prompt("ingrese el primer numero"))
//let segundoNumero = parseInt(prompt("ingrese el segundo numero"))

//function sumar (numeroA, numeroB){
//  let resultado = numeroA + numeroB
//  return resultado
//}

//console.log(sumar(primerNumero, segundoNumero))
//***************HASTA ACÁ********* */

//********* SUMA CON FUNCION FLECHA!!**** 

//const calculadoraDel10 = primerNumero => primerNumero*10
//  console.log (calculadoreaDel10(10))




//********************* */



