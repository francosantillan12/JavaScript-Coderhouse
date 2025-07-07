// ***************************************
//         SECCIÓN TURNOS
//************************************** 

document.addEventListener("DOMContentLoaded", () => {
  class Turno {
    constructor(nombreMascota, fecha, hora) {
      this.nombreMascota = nombreMascota;
      this.fecha = fecha;  
      this.hora = hora;
    }
  }

  const formulario = document.getElementById("formularioTurno");
  const nombreInput = document.getElementById("nombreMascota");
  const fechaInput = document.getElementById("fechaTurno");
  const horaInput = document.getElementById("horaTurno");
  const turnosContainer = document.getElementById("turnosContainer");
  const selectorMesAnio = document.getElementById("selectorMesAnio");
  const calendario = document.getElementById("calendarioMensual");

  let turnos = JSON.parse(localStorage.getItem("turnosVeterinaria")) || [];

  function guardarTurnos() {
    localStorage.setItem("turnosVeterinaria", JSON.stringify(turnos));
  }

  // Función para mostrar fecha al usuario
  function formatearFecha(fechaISO) {
    const partes = fechaISO.split("-");
    return `${partes[2]}-${partes[1]}-${partes[0]}`;
  }

  function mostrarTurnos() {
    turnosContainer.innerHTML = "";
    for (const turno of turnos) {
      const li = document.createElement("li");
      li.textContent = ` ${turno.nombreMascota} -  ${formatearFecha(turno.fecha)} -  ${turno.hora}`;
      turnosContainer.appendChild(li);
    }
  }

  formulario.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = nombreInput.value.trim();
    const fecha = fechaInput.value; // ya viene en ISO "AAAA-MM-DD"
    const hora = horaInput.value;

    if (!nombre || !fecha || !hora) {
      alert("Por favor completá todos los campos.");
      return;
    }

    if (hora < "08:00" || hora > "20:00") {
      alert("Por favor elegí una hora entre las 8 y las 20hs.");
      return;
    }

    // Compruebo si ya hay un turno en la misma fecha y hora
    const turnoOcupado = turnos.some(
      (t) => t.fecha === fecha && t.hora === hora
    );

    if (turnoOcupado) {
      alert("Ese horario ya está ocupado.");
      return;
    }

    const nuevoTurno = new Turno(nombre, fecha, hora);
    turnos.push(nuevoTurno);
    guardarTurnos();
    mostrarTurnos();
    mostrarCalendarioMensual();
    formulario.reset();
  });

  function mostrarCalendarioMensual() {
    calendario.innerHTML = "";

    // Tomo año y mes del selectorMesAnio 
    const valor = selectorMesAnio.value; 
    const partes = valor.split("-");
    const anio = parseInt(partes[0]);
    const mes = parseInt(partes[1]);

    // Simplificamos a 30 días
    const diasDelMes = 30;

    for (let dia = 1; dia <= diasDelMes; dia++) {
      const divDia = document.createElement("div");
      divDia.classList.add("dia");

    // para comparar con turnos
    const diaStr = dia < 10 ? "0" + dia : "" + dia;
    const mesStr = mes < 10 ? "0" + mes : "" + mes;
    const fechaISO = `${anio}-${mesStr}-${diaStr}`;

    divDia.innerHTML = `<span>${dia}</span>`;

    // Filtrar turnos que coincidan con esta fecha ISO
    const turnosDelDia = turnos.filter(turno => turno.fecha === fechaISO);

    turnosDelDia.forEach(turno => {
      const divTurno = document.createElement("div");
      divTurno.classList.add("turno-ocupado");
      divTurno.textContent = `${turno.hora} - ${turno.nombreMascota}`;
      divDia.appendChild(divTurno);
    });

    calendario.appendChild(divDia);
    }
  }

  selectorMesAnio.addEventListener("change", mostrarCalendarioMensual);

  mostrarTurnos();
  mostrarCalendarioMensual();
});

