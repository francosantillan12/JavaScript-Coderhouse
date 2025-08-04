// ======================= CONFIGURACIÓN =======================
const CONFIG = {
  horarioInicio: "10:00",
  horarioFin: "20:00",
  diasSemana: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
  meses: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
  servicios: {
    consulta: { nombre: "Consulta General", icono: "🩺", color: "#667eea" },
    vacuna: { nombre: "Vacunación", icono: "💉", color: "#28a745" },
    cirugia: { nombre: "Cirugía", icono: "⚕️", color: "#dc3545" },
    emergencia: { nombre: "Emergencia", icono: "🚨", color: "#fd7e14" },
    peluqueria: { nombre: "Peluquería", icono: "✂️", color: "#6f42c1" },
    control: { nombre: "Control", icono: "📋", color: "#17a2b8" }
  }
};

// ======================= CLASE TURNO =======================
class Turno {
  constructor(nombreMascota, tipoServicio, fecha, hora, observaciones = "") {
    this.id = Turno.obtenerProximoId();
    this.nombreMascota = nombreMascota;
    this.tipoServicio = tipoServicio;
    this.fecha = fecha;
    this.hora = hora;
    this.observaciones = observaciones;
    this.fechaCreacion = new Date().toISOString();
  }

  static obtenerProximoId = () => {
    const ultimoId = parseInt(localStorage.getItem("ultimoIdTurno")) || 0;
    const nuevoId = ultimoId + 1;
    localStorage.setItem("ultimoIdTurno", nuevoId.toString());
    return nuevoId.toString();
  };
}

// ======================= DATA MANAGER =======================
class DataManager {
  constructor() {
    this.turnos = [];
    this.filtrosActivos = { fecha: "", servicio: "", mascota: "" };
  }

  async inicializar() {
    this.turnos = JSON.parse(localStorage.getItem("turnosVeterinaria")) || [];
  }

  async guardarTurnos() {
    localStorage.setItem("turnosVeterinaria", JSON.stringify(this.turnos));
  }

  async agregarTurno(turno) {
    this.turnos.push(turno);
    await this.guardarTurnos();
  }

  async eliminarTurno(id) {
    this.turnos = this.turnos.filter(turno => turno.id !== id);
    await this.guardarTurnos();
  }

  obtenerTurnosFiltrados() {
    let turnosFiltrados = [...this.turnos];
    const { fecha, servicio, mascota } = this.filtrosActivos;

    if (fecha) turnosFiltrados = turnosFiltrados.filter(turno => turno.fecha === fecha);
    if (servicio) turnosFiltrados = turnosFiltrados.filter(turno => turno.tipoServicio === servicio);
    if (mascota) turnosFiltrados = turnosFiltrados.filter(turno =>
      turno.nombreMascota.toLowerCase().includes(mascota.toLowerCase())
    );

    return turnosFiltrados.sort((a, b) => {
      const fechaA = new Date(`${a.fecha} ${a.hora}`);
      const fechaB = new Date(`${b.fecha} ${b.hora}`);
      return fechaA - fechaB;
    });
  }
}

// ======================= UTILS =======================
const Utils = {
  formatearFecha: (fechaISO) => {
    const fecha = new Date(fechaISO);
    return `${fecha.getDate().toString().padStart(2, '0')}/${(fecha.getMonth() + 1)
      .toString().padStart(2, '0')}/${fecha.getFullYear()}`;
  },
  formatearHora: (hora) => hora.substring(0, 5),
  generarHorarios15Minutos: () => {
    const horarios = [];
    for (let h = 10; h <= 20; h++) {
      for (let m of [0, 15, 30, 45]) {
        if (h === 20 && m > 0) break;
        horarios.push(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`);
      }
    }
    return horarios;
  }
};

// ======================= UI MANAGER =======================
class UIManager {
  constructor(dataManager) {
    this.data = dataManager;
  }

  mostrarTurnos() {
    const turnosFiltrados = this.data.obtenerTurnosFiltrados();
    const container = document.getElementById("turnosContainer");

    if (!container) return;
    if (turnosFiltrados.length === 0) {
      container.innerHTML = `<p>No hay turnos.</p>`;
      return;
    }

    container.innerHTML = turnosFiltrados.map(turno => {
      const servicio = CONFIG.servicios[turno.tipoServicio];
      return `
        <div class="turno-reservado">
          <strong>${turno.nombreMascota}</strong> - ${servicio.icono} ${servicio.nombre}<br>
          📅 ${Utils.formatearFecha(turno.fecha)} - 🕐 ${Utils.formatearHora(turno.hora)}
          <button class="cancelar" data-id="${turno.id}">❌ Cancelar</button>
        </div>
      `;
    }).join("");
  }

  actualizarUI() {
    this.mostrarTurnos();
    inicializarCalendarioFull(this.data.turnos); // ← Integrar FullCalendar aquí
  }
}

// ======================= APP MANAGER =======================
class AppManager {
  constructor() {
    this.dataManager = new DataManager();
    this.uiManager = new UIManager(this.dataManager);
  }

  inicializar = async () => {
    await this.dataManager.inicializar();
    this.configurarEventos();
    this.configurarHorarios();
    this.uiManager.actualizarUI();
    this.bloquearFechasPasadas();
  };

  configurarEventos() {
    document.getElementById("formularioTurno")?.addEventListener("submit", (e) => {
      e.preventDefault();
      this.procesarFormulario();
    });

    document.getElementById("turnosContainer")?.addEventListener("click", (e) => {
      if (e.target.classList.contains("cancelar")) {
        const id = e.target.getAttribute("data-id");
        this.dataManager.eliminarTurno(id).then(() => this.uiManager.actualizarUI());
      }
    });

    document.getElementById("fechaTurno")?.addEventListener("change", () => {
      this.actualizarHorariosDisponibles();
    });
  }

  configurarHorarios() {
    const selectHora = document.getElementById("horaTurno");
    if (!selectHora) return;

    const horarios = Utils.generarHorarios15Minutos();
    horarios.forEach(horario => {
      const option = document.createElement("option");
      option.value = horario;
      option.textContent = horario;
      selectHora.appendChild(option);
    });
  }

  actualizarHorariosDisponibles() {
  const fechaSeleccionada = document.getElementById("fechaTurno").value.trim();
  const selectHora = document.getElementById("horaTurno");
  if (!fechaSeleccionada || !selectHora) return;

  const turnosGuardados = JSON.parse(localStorage.getItem("turnosVeterinaria")) || [];

  // Restaurar todas las opciones
  [...selectHora.options].forEach(opt => {
    if (opt.value !== "") {
      opt.disabled = false;
      opt.textContent = opt.value;
    }
  });

  // Filtrar SOLO los turnos de esa fecha exacta (string)
  turnosGuardados
    .filter(t => t.fecha.trim() === fechaSeleccionada) // 👈 comparación estricta de string
    .forEach(t => {
      const opt = [...selectHora.options].find(o => o.value === t.hora);
      if (opt) {
        opt.disabled = true;
        opt.textContent = `${opt.value} (Ocupado)`;
      }
    });
}


  bloquearFechasPasadas() {
    const fechaTurno = document.getElementById("fechaTurno");
    if (fechaTurno) {
      const hoy = new Date().toISOString().split('T')[0];
      fechaTurno.min = hoy;
    }
  }

  procesarFormulario = async () => {
    const nombre = document.getElementById("nombreMascota").value.trim();
    const tipoServicio = document.getElementById("tipoServicio").value;
    const fecha = document.getElementById("fechaTurno").value;
    const hora = document.getElementById("horaTurno").value;
    const observaciones = document.getElementById("observaciones").value.trim();

    if (!nombre || !tipoServicio || !fecha || !hora) {
      alert("Completa todos los campos obligatorios");
      return;
    }

    // 🚫 Bloquear fechas pasadas
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const fechaSeleccionada = new Date(fecha);
    if (fechaSeleccionada < hoy) {
      alert("No se pueden reservar turnos en fechas pasadas.");
      return;
    }

    const nuevoTurno = new Turno(nombre, tipoServicio, fecha, hora, observaciones);
    await this.dataManager.agregarTurno(nuevoTurno);
    this.uiManager.actualizarUI();
    this.actualizarHorariosDisponibles();
    document.getElementById("formularioTurno").reset();
  };
}

// ======================= FULLCALENDAR + MODAL =======================
function inicializarCalendarioFull(turnos) {
  const calendarioEl = document.getElementById('calendarioFull');
  if (!calendarioEl) return;

  const eventos = turnos.map(t => ({
    title: `${t.nombreMascota} - ${t.hora}`,
    start: t.fecha,
    allDay: true
  }));

  const calendario = new FullCalendar.Calendar(calendarioEl, {
    initialView: 'dayGridMonth',
    locale: 'es',
    events: eventos,
    height: 'auto',
    dateClick: function (info) {
      mostrarTurnosDelDia(info.dateStr, turnos);
    }
  });

  calendario.render();
}

// Modal
function mostrarTurnosDelDia(fechaISO, turnos) {
  const modal = document.getElementById("modalTurnosDia");
  const listaTurnos = document.getElementById("listaTurnosDia");
  listaTurnos.innerHTML = "";

  const turnosDelDia = turnos.filter(t => t.fecha === fechaISO);

  if (turnosDelDia.length === 0) {
    listaTurnos.innerHTML = `<p>No hay turnos para este día.</p>`;
  } else {
    turnosDelDia.forEach(t => {
      listaTurnos.innerHTML += `
        <div class="turno-dia-item">
          <strong>${t.nombreMascota}</strong> - ${t.hora} <br>
          ${CONFIG.servicios[t.tipoServicio]?.icono || ""} ${CONFIG.servicios[t.tipoServicio]?.nombre || ""}
        </div>
      `;
    });
  }

  modal.style.display = "block";
}

// Cerrar modal
document.querySelector(".modal-cerrar").onclick = function () {
  document.getElementById("modalTurnosDia").style.display = "none";
};

window.onclick = function (event) {
  const modal = document.getElementById("modalTurnosDia");
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// ======================= INICIALIZAR APP =======================
const app = new AppManager();
app.inicializar();
