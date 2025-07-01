//***************MI CALCULADORA ENTREGA N2 JS CODERHOUSE***************/

let app = document.getElementById("app");
if (!app) {
  const div = document.createElement("div");
  div.id = "app";
  document.body.appendChild(div);
  app = div;
}

app.classList.add("calculadora");

//****************  Construcción del layout (sin estilos inline) *******/
app.innerHTML = `
  <div class="display" id="display">0</div>
  ${[
    ['clear','00','%','÷'],
    ['7','8','9','×'],
    ['4','5','6','−'],
    ['1','2','3','+'],
    ['0','.','back','=']
  ].map(fila => `
    <div class="boton-fila">
      ${fila.map(btn => `
        <button
          class="
            ${btn === 'clear' ? 'clear' : ''}
            ${btn === '=' ? 'equal' : ''}
            ${btn === 'back' ? 'backspace' : ''}
            ${['÷','×','−','+'].includes(btn) ? 'operation' : 'boton-numero'}
            ${btn === '0' ? 'large' : ''}
          "
          data-btn="${btn}"
        >${btn === 'back' ? '←' : btn}</button>
      `).join('')}
    </div>
  `).join('')}

  <h3 class="historial-titulo">Historial</h3>
  <select id="filtro-operacion" class="filtro-operacion">
    <option value="todas">Todas</option>
    <option value="+">Suma (+)</option>
    <option value="−">Resta (−)</option>
    <option value="×">Multiplicación (×)</option>
    <option value="÷">División (÷)</option>
  </select>
  <ul id="historial" class="historial-lista"></ul>
  <button id="limpiar-historial" class="btn-limpiar-historial">Limpiar historial</button>
`;

// Variables y referencias
const display = document.getElementById("display");
let expr = "";

// Recuperar historial y filtro guardados o crear nuevos
let historial = JSON.parse(localStorage.getItem("historial")) || [];
const filtroSelect = document.getElementById("filtro-operacion");
const filtroGuardado = localStorage.getItem("filtroSeleccionado");
if (filtroGuardado) filtroSelect.value = filtroGuardado;

// Función para mostrar historial filtrado
const renderHistorial = () => {
  const ul = document.getElementById("historial");
  ul.innerHTML = "";

  const filtro = filtroSelect.value;

  // Filtrar con filter()
  const historialFiltrado = filtro === "todas"
    ? historial
    : historial.filter(op => op.expresion.includes(filtro));

  historialFiltrado.forEach(op => {
    const li = document.createElement("li");
    li.textContent = `${op.expresion} = ${op.resultado}`;
    ul.appendChild(li);
  });
};

renderHistorial();

// Manejo de botones de la calculadora
app.addEventListener("click", e => {
  const b = e.target.getAttribute("data-btn");
  if (!b) return;

  if (b === 'clear') {
    expr = "";
  } else if (b === 'back') {
    expr = expr.slice(0, -1);
  } else if (b === '=') {
    try {
      const resultado = eval(expr.replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-'));
      const operacion = {
        expresion: expr,
        resultado: resultado
      };
 const ultimaOperacion = historial[historial.length - 1];
if (
  !ultimaOperacion ||
  ultimaOperacion.expresion !== operacion.expresion ||
  ultimaOperacion.resultado !== operacion.resultado
) {
  historial.push(operacion);
  localStorage.setItem("historial", JSON.stringify(historial));
}

      expr = resultado.toString();
      renderHistorial();
    } catch {
      expr = "Error";
    }
  
} else {
  const operadores = ['+', '−', '×', '÷', '%'];
  if (expr === "" && operadores.includes(b)) {
    return;
  }
  
  // Controlar punto decimal
  if (b === '.') {
    // Encontrar la última posición de cualquier operador
  let lastOpIndex = -1;
    operadores.slice(0,4).forEach(op => {
      const idx = expr.lastIndexOf(op);
      if (idx > lastOpIndex) lastOpIndex = idx;
    });
    // ****Tomar el substring desde la posición después del último operador********
    const ultimoNumero = expr.substring(lastOpIndex + 1);
    // ************Si ya tiene un punto, no agregar otro**********************
    if (ultimoNumero.includes('.')) {
      return;
    }
  }

  expr += b === '%' ? '/100' : b;
}

  display.innerText = expr || "0";
});

//***********  cambio en filtro y guardarlo en localStorage *********/
filtroSelect.addEventListener("change", () => {
  localStorage.setItem("filtroSeleccionado", filtroSelect.value);
  renderHistorial();
});

// ************************Botón para limpiar historial************/
document.getElementById("limpiar-historial").addEventListener("click", () => {
  localStorage.removeItem("historial");
  historial = [];
  renderHistorial();
});

//*********EVENTO DE TECLADO********** */
document.addEventListener("keydown", (event) => {
  const tecla = event.key;

  //*********  Mapeo de teclas del teclado a botones de la calculadora*/
  const teclasValidas = ['0','1','2','3','4','5','6','7','8','9','.','+','-','*','/','%','Enter','Backspace','Delete'];

  if (!teclasValidas.includes(tecla)) return;

  // Mapeo de teclas a símbolos visuales de la calculadora
  const mapaTeclas = {
    '+': '+',
    '-': '−',
    '*': '×',
    '/': '÷',
    'Enter': '=',
    'Backspace': 'back',
    'Delete': 'clear'
  };

  const btnCalculadora = mapaTeclas[tecla] || tecla;

  const boton = document.querySelector(`[data-btn="${btnCalculadora}"]`);
  if (boton) {
    boton.click(); // Simula clic
  }
});



//********************************************************************************* */
//***************MI CALCULADORA ENTREGA N1***************/

// let historial = []
// let resultadoAnterior= null

// // const pedirNumeros = () => {
// //   let numeroA = parseInt(prompt("Ingrese el primer número"))
// //   let numeroB = parseInt(prompt("Ingrese el segundo número"))
// //   return [numeroA, numeroB];
// // }

// const pedirNumerosConMemoria = () => {
//   let numeroA;

//   if (resultadoAnterior !== null) {
//     let usarAnterior = prompt("¿Querés usar el resultado anterior (" + resultadoAnterior + ") como primer número? (si/no)");
    
//     if (usarAnterior.toLowerCase() === "si") {
//       numeroA = resultadoAnterior;
//     } else {
//       numeroA = parseInt(prompt("Ingrese el primer número"));
//     }
//   } else {
//     numeroA = parseInt(prompt("Ingrese el primer número"));
//   }

//   let numeroB = parseInt(prompt("Ingrese el segundo número"));
//   return [numeroA, numeroB];
// }
 
// const sumar = (numeroA, numeroB) => {
//   let resultado = numeroA + numeroB
//   alert (numeroA + "+" + numeroB + "=" + resultado)
//   let operacion = numeroA + " + " + numeroB + " = " + resultado;
//   historial.push(operacion)
//   console.log("Tu historial es:" + operacion)
//   resultadoAnterior = resultado
// }

// const restar = (numeroA, numeroB) => {
//   let resultado = numeroA - numeroB
//   alert (numeroA + "-" + numeroB + "=" + resultado)
//   let operacion = numeroA + " - " + numeroB + " = " + resultado;
//   historial.push(operacion)
//   resultadoAnterior = resultado
// }

//  const multiplicar = (numeroA, numeroB) => {
//   let resultado = numeroA * numeroB
//   alert (numeroA + "*" + numeroB + "=" + resultado)
//   let operacion = numeroA + " * " + numeroB + " = " + resultado;
//   historial.push(operacion)
//   resultadoAnterior = resultado
//  }

// const dividir = (numeroA, numeroB) => {
//   if (numeroB === 0) {
//     alert("Error: No se puede dividir por cero");
//     return;
//   }
//   let resultado = numeroA / numeroB;
//   alert(numeroA + "/" + numeroB + "=" + resultado);
//   let operacion = numeroA + " / " + numeroB + " = " + resultado;
//   historial.push(operacion);
//   resultadoAnterior = resultado
// }



// let menu = parseInt(prompt("elija una opcion: \n 1-sumar \n 2-restar \n 3-multiplicar \n 4-dividir \n 5-ver historial \n 6-salir"))


// while(menu !== 6) { //que el numero que se le cargue a "menu" tiene que ser distinto que 6, de esta manera salgo
//   if(menu >= 1 && menu <= 4) {
//     let numeros = pedirNumerosConMemoria()
//     switch(menu){
//       case 1: 
//         sumar(numeros[0], numeros[1])
//         break
//       case 2: 
//         restar(numeros[0], numeros[1])
//         break
//       case 3: 
//         multiplicar(numeros[0], numeros[1])
//         break
//       case 4: 
//         dividir(numeros[0], numeros[1])
//         break
//     }
//   } else if(menu === 5) {
//     if(historial.length === 0) {
//       alert("Aún no hay operaciones en el historial")
//     } else {
//       alert("Historial:\n" + historial.join("\n"))
//     }
//   } else {
//     alert("Opción incorrecta")
//   }

//   menu = parseInt(prompt("elija una opcion: \n 1-sumar \n 2-restar \n 3-multiplicar \n 4-dividir \n 5-ver historial \n 6-salir"))
// }
// alert("gracias")


//**************************************************************** */


//************************************************************ */
 

//******VETERINARIA LISTA PACIENTES XD*****/

// class Mascota{
//   static id = 0
//   constructor (nombre,tipo,edad){
//     this.id = ++Mascota.id //Aumentame en uno previamente lo que esté en la propiedad id de la clase Mascota
//     this.nombre = nombre,
//     this.tipo = tipo,
//     this.edad = edad
//   }
 
// } 

// const mascotas = []

// const cargaMascotas = () =>{
//   let cargaNombre = prompt("Ingrese el nombre de la mascota")
//   let cargaTipo = prompt("Ingrese el tipo de mascota")
//   let cargaEdad = parseInt(prompt("Ingrese la edad de su mascota"))

//   const mascota = new Mascota(cargaNombre, cargaTipo, cargaEdad)
//   mascotas.push(mascota) // "push" metodo para mandar cosas al array
// }

// //FUNCION QUE SE ENCARGA DE VER LAS MASCOTAS
// //Le digo al usuario que si no hay nada dentro del array muestre un alert 
// const verMascotas = () => {
//  if (mascotas.length === 0){ //.lenght nos dice cuantos elementos hay dentro del array
//   alert("No se cargaron mascotas aun")
//  } else{ //for..of nos permite recorrer el array
//     for(const mascota of mascotas){
//       console.log(mascota)
//     }
//  }
// }

// let menu = parseInt(prompt("Elija 1 para ver la lista de mascotas, 2 para cargar una mascota, 3 para salir"))

// while(menu !== 3){
//   switch(menu){
//     case 1:
//       verMascotas()
//       break
//     case 2:
//       cargaMascotas()
//       break
//     default:
//       alert("Opcion incorrecta") 
//   }
//   menu = parseInt(prompt("Elija 1 para ver el catalogo, 2 para cargar una mascota, 3 para salir"))
// }



// const productos = [
//   {
//     id: 1,
//     nombre:"Alimento para perro 10kg",
//     precio:15000,
//     categoria: "Alimento",
//   },
//   {
//     id: 2,
//     nombre:"Alimento para gato 3kg",
//     precio:9000,
//     categoria: "Alimento",
//   },
//   {
//     id: 3,
//     nombre:"Collar antipulgas",
//     precio:5000,
//     categoria: "Medicamento",
//   },
//   {
//     id: 4,
//     nombre:"Vacuna antirrábica",
//     precio:12000,
//     categoria: "Medicamento",
//   },
//   {
//     id: 5,
//     nombre:"Rascador para gato",
//     precio:8000,
//     categoria: "Juguete",
//   },
//   {
//     id: 6,
//     nombre:"Juguete mordillo para perro",
//     precio:3500,
//     categoria: "Juguete",
//   },
//   {
//     id: 7,
//     nombre:"Shamppo neutro para perros",
//     precio:4000,
//     categoria: "Higiene",
//   },
//   {
//     id: 8,
//     nombre:"Shamppo neutro para gatos",
//     precio:3750,
//     categoria: "Higiene",
//   } 
// ]




// //** "forEach()"ME MUESTRA EL ARRAY CON MIS PRODUCTOS

// // const verProductos = productos.forEach((producto) => {
// //   console.log(producto)
// // })


// //** */ "find()" ME MUESTRA EL PRODUCTO QUE YO ESTÉ BUSCANDO(SE USA SOLAMENTE PARA RESULTADOS QUE SEAN UNICOS(MATRICULAS,DNI, NUM DE SOCIO, PATENTE DE AUTO, ID ETC))
// // let idProducto = parseInt(prompt("ingrese el ID del producto que está buscando"))
// // const busqueda = productos.find(producto => producto.id === idProducto)
// //  console.log(busqueda)


// // ** "filter()" filtra PRODUCTOS POR MONTO/CATEGORIA
// const filtrados = productos.filter((producto) => producto.precio <= 15000) // mostrame precios menor o igual a 15000
//   console.log(filtrados)

// //Mostrar productos segun la categoria elegida por el usuario

// let opcion = parseInt(prompt(
//   "¿Qué estás buscando?\n" +
//   "1 - Alimento\n" +
//   "2 - Medicamento\n" +
//   "3 - Juguete\n" +
//   "4 - Higiene\n" +
//   "5 - Salir"
// ));


// while (opcion !== 5) {
//   let categoria = "";

//   switch (opcion) {
//     case 1:
//       categoria = "Alimento";
//       break;
//     case 2:
//       categoria = "Medicamento";
//       break;
//     case 3:
//       categoria = "Juguete";
//       break;
//     case 4:
//       categoria = "Higiene";
//       break;
//     default:
//       alert("Opción incorrecta");
//       break;
//   }

//   if (categoria) {
//     const filtrados = productos.filter(producto => producto.categoria === categoria);
    
//     if (filtrados.length > 0) {
//       let mensaje = ` Productos en la categoría ${categoria}:\n\n`;
//       for (const p of filtrados) {
//         mensaje += ` ${p.nombre} - $${p.precio}\n`;
//       }
//       alert(mensaje);
//     } else {
//       alert(`No hay productos en la categoría ${categoria}.`);
//     }
//   }

//   opcion = parseInt(prompt(
//     "¿Qué estás buscando?\n" +
//     "1 - Alimento\n" +
//     "2 - Medicamento\n" +
//     "3 - Juguete\n" +
//     "4 - Higiene\n" +
//     "5 - Salir"
//   ));
// }


// // **"some()" nos sirve para saber si tenemos algo en stock
// let buscar = prompt("ingrese el nombre del producto a ver si está en stock")
// let hayStock = productos.some((producto) => producto.nombre == buscar)
// if(hayStock){
//   console.log("lo tenemos")
// }else{
//   console.log("No está disponible actualmente")
// }

//** */ "MAP()" CREA UNA COPIA DEL ARRAY (UN DUPLICADO), SIRVE PARA CUANDO POR EJ TENEMOS QUE HACER UN DESCUENTO POR UN TIEMPO DETERMINADO
// 
//** "reduce()" SIRVE PARA CUANDO NECESITAMOS USAR UN TOTAL, REDUCE TODOS LOS VALORES NUMERICOS QUE LE DEMOS A UNA UNICA EXPRESION*/

// const total = productos.reduce((contador,producto) => contador + producto.precio, 0) 
// console.log(total)





//************************************************* */


