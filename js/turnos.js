// Configuración del sistema
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

// Clase Turno optimizada
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
    console.log('=== OBTENIENDO PRÓXIMO ID ===');
    const ultimoId = parseInt(localStorage.getItem("ultimoIdTurno")) || 0;
    const nuevoId = ultimoId + 1;
    localStorage.setItem("ultimoIdTurno", nuevoId.toString());
    console.log('ID generado:', nuevoId);
    return nuevoId.toString();
  };
}

// Gestor de datos con fetch
class DataManager {
  constructor() {
    this.turnos = [];
    this.filtrosActivos = { fecha: "", servicio: "", mascota: "" };
  }

  async inicializar() {
    await this.cargarTurnos();
  }

  async cargarTurnos() {
    console.log('=== CARGANDO TURNOS ===');
    try {
      const response = await fetch('/api/turnos');
      if (response.ok) {
        this.turnos = await response.json();
        console.log('Datos cargados desde API:', this.turnos);
      } else {
        // Fallback a localStorage si no hay API
        this.turnos = JSON.parse(localStorage.getItem("turnosVeterinaria")) || [];
        console.log('Datos cargados desde localStorage:', this.turnos);
      }
    } catch (error) {
      // Fallback a localStorage
      this.turnos = JSON.parse(localStorage.getItem("turnosVeterinaria")) || [];
      console.log('Datos cargados desde localStorage (error):', this.turnos);
    }
  }

  async guardarTurnos() {
    console.log('=== GUARDANDO TURNOS ===');
    console.log('Turnos a guardar:', this.turnos);
    try {
      await fetch('/api/turnos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.turnos)
      });
      console.log('Turnos guardados en API');
    } catch (error) {
      // Fallback a localStorage
      localStorage.setItem("turnosVeterinaria", JSON.stringify(this.turnos));
      console.log('Turnos guardados en localStorage (fallback)');
    }
  }

  async agregarTurno(turno) {
    console.log('=== AGREGANDO TURNO ===');
    console.log('Turno a agregar:', turno);
    this.turnos.push(turno);
    console.log('Turno agregado al array, total:', this.turnos.length);
    await this.guardarTurnos();
    console.log('Turnos guardados correctamente');
  }

  async eliminarTurno(id) {
    console.log('=== ELIMINANDO TURNO ===');
    console.log('ID a eliminar:', id);
    console.log('Turnos antes de eliminar:', this.turnos.length);
    this.turnos = this.turnos.filter(turno => turno.id !== id);
    console.log('Turnos después de eliminar:', this.turnos.length);
    await this.guardarTurnos();
    console.log('Turnos guardados después de eliminar');
  }

  obtenerTurnosFiltrados() {
    console.log('=== OBTENIENDO TURNOS FILTRADOS ===');
    let turnosFiltrados = [...this.turnos];
    console.log('Turnos originales:', this.turnos);
    console.log('Filtros activos:', this.filtrosActivos);

    const { fecha, servicio, mascota } = this.filtrosActivos;

    if (fecha) {
      turnosFiltrados = turnosFiltrados.filter(turno => turno.fecha === fecha);
      console.log('Filtrados por fecha:', turnosFiltrados);
    }

    if (servicio) {
      turnosFiltrados = turnosFiltrados.filter(turno => turno.tipoServicio === servicio);
      console.log('Filtrados por servicio:', turnosFiltrados);
    }

    if (mascota) {
      turnosFiltrados = turnosFiltrados.filter(turno => 
        turno.nombreMascota.toLowerCase().includes(mascota.toLowerCase())
      );
      console.log('Filtrados por mascota:', turnosFiltrados);
    }

    const turnosOrdenados = turnosFiltrados.sort((a, b) => {
      const fechaA = new Date(`${a.fecha} ${a.hora}`);
      const fechaB = new Date(`${b.fecha} ${b.hora}`);
      return fechaA - fechaB;
    });
    
    console.log('Turnos ordenados:', turnosOrdenados);
    return turnosOrdenados;
  }
}

// Utilidades optimizadas
const Utils = {
  formatearFecha: (fechaISO) => {
    console.log('=== FORMATEANDO FECHA ===');
    console.log('Fecha ISO:', fechaISO);
    const fecha = new Date(fechaISO);
    console.log('Fecha objeto:', fecha);
    const [dia, mes, anio] = [
      fecha.getDate().toString().padStart(2, '0'),
      (fecha.getMonth() + 1).toString().padStart(2, '0'),
      fecha.getFullYear()
    ];
    const fechaFormateada = `${dia}/${mes}/${anio}`;
    console.log('Fecha formateada:', fechaFormateada);
    return fechaFormateada;
  },

  formatearHora: (hora) => {
    console.log('=== FORMATEANDO HORA ===');
    console.log('Hora original:', hora);
    const horaFormateada = hora.substring(0, 5);
    console.log('Hora formateada:', horaFormateada);
    return horaFormateada;
  },

  obtenerNombreDia: (fechaISO) => {
    console.log('=== OBTENIENDO NOMBRE DÍA ===');
    console.log('Fecha ISO:', fechaISO);
    const fecha = new Date(fechaISO);
    console.log('Fecha objeto:', fecha);
    const diaSemana = fecha.getDay();
    console.log('Día de la semana (número):', diaSemana);
    const nombreDia = CONFIG.diasSemana[diaSemana];
    console.log('Nombre del día:', nombreDia);
    return nombreDia;
  },

  obtenerNombreMes: (fechaISO) => {
    console.log('=== OBTENIENDO NOMBRE MES ===');
    console.log('Fecha ISO:', fechaISO);
    const fecha = new Date(fechaISO);
    console.log('Fecha objeto:', fecha);
    const mes = fecha.getMonth();
    console.log('Mes (número):', mes);
    const nombreMes = CONFIG.meses[mes];
    console.log('Nombre del mes:', nombreMes);
    return nombreMes;
  },

  generarHorarios15Minutos: () => {
    console.log('=== GENERANDO HORARIOS ===');
    const horarios = [];
    const [horaInicio, horaFin] = [10, 20];
    console.log('Rango de horas:', horaInicio, 'a', horaFin);

    for (const hora of Array.from({length: horaFin - horaInicio + 1}, (_, i) => horaInicio + i)) {
      for (const minuto of [0, 15, 30, 45]) {
        if (hora === horaFin && minuto > 0) break;
        
        const horaStr = hora.toString().padStart(2, '0');
        const minutoStr = minuto.toString().padStart(2, '0');
        const horario = `${horaStr}:${minutoStr}`;
        horarios.push(horario);
        console.log('Horario agregado:', horario);
      }
    }
    console.log('Horarios generados:', horarios);
    return horarios;
  }
};

// Gestor de validaciones
class Validator {
  static validarTurno = (nombre, tipoServicio, fecha, hora, turnos) => {
    console.log('=== VALIDANDO TURNO ===');
    console.log('Datos a validar:', { nombre, tipoServicio, fecha, hora });
    console.log('Turnos existentes:', turnos);
    
    const validaciones = [
      {
        condicion: !nombre || !tipoServicio || !fecha || !hora,
        mensaje: "Por favor completá todos los campos requeridos."
      },
      {
        condicion: new Date(`${fecha}T${hora}`) <= new Date(),
        mensaje: "No se pueden agendar turnos para fechas u horarios pasados."
      },
      {
        condicion: hora < CONFIG.horarioInicio || hora > CONFIG.horarioFin,
        mensaje: `El horario de atención es de ${CONFIG.horarioInicio} a ${CONFIG.horarioFin}.`
      },
      {
        condicion: new Date(`${fecha}T${hora}`).getDay() === 0,
        mensaje: "No atendemos los domingos."
      },
      {
        condicion: turnos.some(turno => turno.fecha === fecha && turno.hora === hora),
        mensaje: "Ese horario ya está ocupado. Elegí otro horario."
      }
    ];

    for (const [index, validacion] of validaciones.entries()) {
      console.log(`Validación ${index + 1}:`, validacion.condicion, validacion.mensaje);
      if (validacion.condicion) {
        console.log('Validación fallida:', validacion.mensaje);
        return { valido: false, mensaje: validacion.mensaje };
      }
    }

    console.log('Todas las validaciones pasaron');
    return { valido: true };
  };
}

// Gestor de UI
class UIManager {
  constructor(dataManager) {
    this.data = dataManager;
    this.modalConfirmacion = null;
    this.crearModalConfirmacion();
  }

  crearModalConfirmacion() {
    console.log('=== CREANDO MODAL DE CONFIRMACIÓN ===');
    this.modalConfirmacion = document.createElement('div');
    this.modalConfirmacion.className = 'modal-confirmacion';
    this.modalConfirmacion.innerHTML = `
      <div class="modal-content">
        <h3>Confirmar acción</h3>
        <p id="modal-mensaje"></p>
        <div class="modal-buttons">
          <button id="btn-confirmar" class="btn-primary">Confirmar</button>
          <button id="btn-cancelar" class="btn-secondary">Cancelar</button>
        </div>
      </div>
    `;
    document.body.appendChild(this.modalConfirmacion);
    console.log('Modal de confirmación creado y agregado al DOM');
  }

  mostrarConfirmacion(mensaje) {
    console.log('=== MOSTRANDO CONFIRMACIÓN ===');
    console.log('Mensaje:', mensaje);
    return new Promise((resolve) => {
      if (!this.modalConfirmacion) {
        console.error('Modal de confirmación no encontrado');
        resolve(false);
        return;
      }

      const mensajeElement = this.modalConfirmacion.querySelector('#modal-mensaje');
      const btnConfirmar = this.modalConfirmacion.querySelector('#btn-confirmar');
      const btnCancelar = this.modalConfirmacion.querySelector('#btn-cancelar');

      if (!mensajeElement || !btnConfirmar || !btnCancelar) {
        console.error('Elementos del modal no encontrados');
        resolve(false);
        return;
      }

      mensajeElement.textContent = mensaje;
      this.modalConfirmacion.style.display = 'flex';
      console.log('Modal de confirmación mostrado');

      const limpiarEventos = () => {
        btnConfirmar.removeEventListener('click', confirmar);
        btnCancelar.removeEventListener('click', cancelar);
        this.modalConfirmacion.style.display = 'none';
        console.log('Eventos del modal limpiados');
      };

      const confirmar = () => {
        console.log('Usuario confirmó');
        limpiarEventos();
        resolve(true);
      };

      const cancelar = () => {
        console.log('Usuario canceló');
        limpiarEventos();
        resolve(false);
      };

      btnConfirmar.addEventListener('click', confirmar);
      btnCancelar.addEventListener('click', cancelar);
      console.log('Eventos del modal configurados');
    });
  }

  mostrarNotificacion = (mensaje, tipo = "exito") => {
    console.log('=== MOSTRANDO NOTIFICACIÓN ===');
    console.log('Mensaje:', mensaje);
    console.log('Tipo:', tipo);
    const notificacion = document.getElementById("notificacion");
    console.log('Elemento notificación encontrado:', notificacion);
    if (!notificacion) {
      console.error('Elemento de notificación no encontrado');
      return;
    }
    
    notificacion.textContent = mensaje;
    notificacion.className = `notificacion ${tipo} mostrar`;
    console.log('Notificación configurada:', notificacion.className);
    
    setTimeout(() => {
      notificacion.classList.remove("mostrar");
      console.log('Notificación ocultada');
    }, 3000);
  };

  configurarHorarios15Minutos = () => {
    console.log('=== CONFIGURANDO HORARIOS ===');
    const horaInput = document.getElementById("horaTurno");
    console.log('Elemento hora encontrado:', horaInput);
    if (!horaInput) {
      console.error('Elemento de hora no encontrado');
      return;
    }
    
    const horarios = Utils.generarHorarios15Minutos();
    console.log('Horarios generados:', horarios);
    
    horaInput.innerHTML = '<option value="">Seleccionar hora</option>';
    
    for (const horario of horarios) {
      const option = document.createElement('option');
      option.value = horario;
      option.textContent = horario;
      horaInput.appendChild(option);
    }
    console.log('Horarios configurados correctamente');
  };

  actualizarHorariosDisponibles = () => {
    console.log('=== ACTUALIZANDO HORARIOS DISPONIBLES ===');
    const fechaSeleccionada = document.getElementById("fechaTurno")?.value;
    console.log('Fecha seleccionada:', fechaSeleccionada);
    if (!fechaSeleccionada) return;

    const horaInput = document.getElementById("horaTurno");
    if (!horaInput) {
      console.error('Elemento de hora no encontrado');
      return;
    }
    
    const opciones = horaInput.querySelectorAll('option');
    console.log('Opciones encontradas:', opciones.length);
    
    // Resetear opciones
    for (const option of opciones) {
      if (option.value !== '') {
        option.disabled = false;
        option.style.color = '';
        option.textContent = option.value;
      }
    }

    // Marcar ocupados
    const turnosOcupados = this.data.turnos.filter(turno => turno.fecha === fechaSeleccionada);
    console.log('Turnos ocupados para esta fecha:', turnosOcupados);
    for (const turno of turnosOcupados) {
      const opcionOcupada = horaInput.querySelector(`option[value="${turno.hora}"]`);
      if (opcionOcupada) {
        opcionOcupada.disabled = true;
        opcionOcupada.style.color = '#999';
        opcionOcupada.textContent = `${turno.hora} (Ocupado)`;
      }
    }
    console.log('Horarios actualizados correctamente');
  };

  actualizarEstadisticas = () => {
    console.log('=== ACTUALIZANDO ESTADÍSTICAS ===');
    const hoy = new Date().toISOString().split('T')[0];
    const inicioSemana = new Date();
    inicioSemana.setDate(inicioSemana.getDate() - inicioSemana.getDay());
    const finSemana = new Date(inicioSemana);
    finSemana.setDate(finSemana.getDate() + 6);

    const estadisticas = {
      total: this.data.turnos.length,
      hoy: this.data.turnos.filter(turno => turno.fecha === hoy).length,
      semana: this.data.turnos.filter(turno => {
        const fechaTurno = new Date(turno.fecha);
        return fechaTurno >= inicioSemana && fechaTurno <= finSemana;
      }).length
    };

    console.log('Estadísticas calculadas:', estadisticas);

    const elementos = {
      totalTurnos: document.getElementById("totalTurnos"),
      turnosHoy: document.getElementById("turnosHoy"),
      turnosSemana: document.getElementById("turnosSemana"),
      contadorTurnos: document.getElementById("contadorTurnos")
    };

    for (const [id, elemento] of Object.entries(elementos)) {
      if (elemento) {
        const valor = estadisticas[id === 'contadorTurnos' ? 'total' : id.replace('turnos', '').toLowerCase()];
        elemento.textContent = valor;
        console.log(`Elemento ${id} actualizado con valor:`, valor);
      } else {
        console.warn(`Elemento ${id} no encontrado`);
      }
    }
    console.log('Estadísticas actualizadas correctamente');
  };

  mostrarTurnos = () => {
    console.log('=== MOSTRANDO TURNOS ===');
    const turnosFiltrados = this.data.obtenerTurnosFiltrados();
    console.log('Turnos filtrados:', turnosFiltrados);
    const container = document.getElementById("turnosContainer");
    
    if (!container) {
      console.error('Contenedor de turnos no encontrado');
      return;
    }

    if (turnosFiltrados.length === 0) {
      console.log('No hay turnos para mostrar');
      container.innerHTML = `
        <div class="no-turnos">
          <p>${this.data.turnos.length === 0 ? 'No hay turnos agendados.' : 'No se encontraron turnos con los filtros aplicados.'}</p>
        </div>
      `;
      return;
    }

    console.log('Generando HTML para turnos');
    container.innerHTML = turnosFiltrados.map(turno => this.crearElementoTurno(turno)).join('');
    console.log('Turnos mostrados correctamente');
  };

  crearElementoTurno = (turno) => {
    console.log('=== CREANDO ELEMENTO TURNO ===');
    console.log('Turno a crear:', turno);
    const servicio = CONFIG.servicios[turno.tipoServicio];
    console.log('Servicio encontrado:', servicio);
    const html = `
      <div class="turno-item">
        <div class="turno-header">
          <span class="turno-mascota">${turno.nombreMascota}</span>
          <span class="turno-servicio" style="background-color: ${servicio.color}">
            ${servicio.icono} ${servicio.nombre}
          </span>
        </div>
        <div class="turno-details">
          <div class="turno-detail">
            <i>📅</i>
            <span>${Utils.formatearFecha(turno.fecha)} (${Utils.obtenerNombreDia(turno.fecha)})</span>
          </div>
          <div class="turno-detail">
            <i>🕐</i>
            <span>${Utils.formatearHora(turno.hora)}</span>
          </div>
          <div class="turno-detail">
            <i>📝</i>
            <span>ID: ${turno.id}</span>
          </div>
        </div>
        ${turno.observaciones ? `
          <div class="turno-observaciones">
            <strong>Observaciones:</strong> ${turno.observaciones}
          </div>
        ` : ''}
        <div class="turno-actions">
          <button class="btn-cancelar" data-id="${turno.id}">
            ❌ Cancelar Turno
          </button>
        </div>
      </div>
    `;
    console.log('HTML del turno generado');
    return html;
  };

  mostrarCalendarioMensual = () => {
    console.log('=== MOSTRANDO CALENDARIO MENSUAL ===');
    const calendario = document.getElementById("calendarioMensual");
    const selector = document.getElementById("selectorMesAnio");
    
    if (!calendario || !selector) {
      console.error('Elementos del calendario no encontrados');
      return;
    }
    
    const valor = selector.value;
    console.log('Valor del selector:', valor);
    const [anio, mes] = valor.split("-").map(Number);
    console.log('Año y mes:', anio, mes);

    const primerDia = new Date(anio, mes - 1, 1);
    const ultimoDia = new Date(anio, mes, 0);
    const diasDelMes = ultimoDia.getDate();
    const primerDiaSemana = primerDia.getDay();

    console.log('Días del mes:', diasDelMes);
    console.log('Primer día de la semana:', primerDiaSemana);

    let html = '';

    // Días vacíos
    for (const i of Array.from({length: primerDiaSemana}, (_, index) => index)) {
      html += '<div class="dia vacio"></div>';
    }

    // Días del mes
    for (const dia of Array.from({length: diasDelMes}, (_, index) => index + 1)) {
      const diaStr = dia.toString().padStart(2, '0');
      const mesStr = mes.toString().padStart(2, '0');
      const fechaISO = `${anio}-${mesStr}-${diaStr}`;

      const turnosDelDia = this.data.turnos.filter(turno => turno.fecha === fechaISO);
      const turnosOrdenados = turnosDelDia.sort((a, b) => a.hora.localeCompare(b.hora));

      html += this.crearDiaCalendario(dia, turnosOrdenados, fechaISO);
    }

    calendario.innerHTML = html;
    console.log('Calendario generado correctamente');
    this.agregarEventosCalendario();
  };

  crearDiaCalendario = (dia, turnosOrdenados, fechaISO) => {
    console.log('=== CREANDO DÍA DEL CALENDARIO ===');
    console.log('Día:', dia);
    console.log('Turnos ordenados:', turnosOrdenados);
    console.log('Fecha ISO:', fechaISO);
    
    const turnosAMostrar = turnosOrdenados.slice(0, 1);
    const turnosOcultos = turnosOrdenados.length - 1;
    console.log('Turnos a mostrar:', turnosAMostrar.length);
    console.log('Turnos ocultos:', turnosOcultos);

    let html = `<div class="dia" ${turnosOrdenados.length > 0 ? 'style="cursor: pointer;"' : ''}>`;
    html += `<span>${dia}</span>`;

    for (const turno of turnosAMostrar) {
      const servicio = CONFIG.servicios[turno.tipoServicio];
      html += `
        <div class="turno-ocupado" style="background-color: ${servicio.color}">
          <div>${Utils.formatearHora(turno.hora)}</div>
          <div>${turno.nombreMascota}</div>
          <div>${servicio.icono}</div>
        </div>
      `;
    }

    if (turnosOcultos > 0) {
      html += `<div class="turno-mas">+${turnosOcultos} más</div>`;
    }

    html += '</div>';
    console.log('HTML del día generado');
    return html;
  };

  agregarEventosCalendario = () => {
    console.log('=== AGREGANDO EVENTOS DEL CALENDARIO ===');
    const dias = document.getElementById("calendarioMensual").querySelectorAll('.dia:not(.vacio)');
    console.log('Días encontrados:', dias.length);
    for (const dia of dias) {
      const turnosDelDia = dia.querySelectorAll('.turno-ocupado');
      console.log('Turnos del día:', turnosDelDia.length);
      if (turnosDelDia.length > 0) {
        const fechaISO = this.obtenerFechaISO(dia);
        console.log('Fecha ISO del día:', fechaISO);
        const turnosOrdenados = this.data.turnos
          .filter(turno => turno.fecha === fechaISO)
          .sort((a, b) => a.hora.localeCompare(b.hora));
        
        dia.addEventListener("click", () => this.mostrarDetallesDia(fechaISO, turnosOrdenados));
        console.log('Evento click agregado al día');
      }
    }
    console.log('Eventos del calendario agregados correctamente');
  };

  obtenerFechaISO = (elementoDia) => {
    console.log('=== OBTENIENDO FECHA ISO ===');
    const valor = document.getElementById("selectorMesAnio").value;
    const [anio, mes] = valor.split("-").map(Number);
    const dia = parseInt(elementoDia.querySelector('span').textContent);
    const diaStr = dia.toString().padStart(2, '0');
    const mesStr = mes.toString().padStart(2, '0');
    const fechaISO = `${anio}-${mesStr}-${diaStr}`;
    console.log('Fecha ISO generada:', fechaISO);
    return fechaISO;
  };

  mostrarDetallesDia = (fecha, turnosDelDia) => {
    console.log('=== MOSTRANDO DETALLES DEL DÍA ===');
    console.log('Fecha:', fecha);
    console.log('Turnos del día:', turnosDelDia);
    const fechaFormateada = Utils.formatearFecha(fecha);
    const nombreDia = Utils.obtenerNombreDia(fecha);
    
    const contenidoHTML = `
      <div class="modal-detalles">
        <div class="detalles-dia-header">
          <h3>📅 ${fechaFormateada} - ${nombreDia}</h3>
          <button class="btn-cerrar-detalles">✕</button>
        </div>
        <div class="detalles-dia-content">
          ${turnosDelDia.length === 0 ? 
            '<p class="no-turnos-dia">No hay turnos agendados para este día.</p>' :
            turnosDelDia.map(turno => this.crearDetalleTurno(turno)).join('')
          }
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', contenidoHTML);
    console.log('Modal de detalles agregado al DOM');
    this.configurarEventosModal();
  };

  crearDetalleTurno = (turno) => {
    console.log('=== CREANDO DETALLE TURNO ===');
    console.log('Turno para detalle:', turno);
    const servicio = CONFIG.servicios[turno.tipoServicio];
    console.log('Servicio para detalle:', servicio);
    const html = `
      <div class="turno-detalle-dia">
        <div class="turno-detalle-header">
          <span class="turno-detalle-mascota">${turno.nombreMascota}</span>
          <span class="turno-detalle-servicio" style="background-color: ${servicio.color}">
            ${servicio.icono} ${servicio.nombre}
          </span>
        </div>
        <div class="turno-detalle-info">
          <span class="turno-detalle-hora">🕐 ${Utils.formatearHora(turno.hora)}</span>
          <span class="turno-detalle-id">📝 ID: ${turno.id}</span>
        </div>
        ${turno.observaciones ? `
          <div class="turno-detalle-obs">
            <strong>Observaciones:</strong> ${turno.observaciones}
          </div>
        ` : ''}
        <button class="btn-cancelar-detalle" data-id="${turno.id}">
          ❌ Cancelar
        </button>
      </div>
    `;
    console.log('HTML del detalle generado');
    return html;
  };

  configurarEventosModal = () => {
    console.log('=== CONFIGURANDO EVENTOS DEL MODAL ===');
    const modal = document.querySelector('.modal-detalles');
    console.log('Modal encontrado:', modal);
    if (!modal) {
      console.error('Modal no encontrado');
      return;
    }
    
    const btnCerrar = modal.querySelector(".btn-cerrar-detalles");
    const btnCancelar = modal.querySelectorAll(".btn-cancelar-detalle");
    console.log('Botones encontrados:', { btnCerrar, btnCancelar: btnCancelar.length });

    btnCerrar.addEventListener("click", () => {
      console.log('Cerrando modal');
      modal.remove();
    });
    
    for (const btn of btnCancelar) {
      btn.addEventListener("click", (e) => {
        const id = e.target.getAttribute("data-id");
        console.log('Cancelando turno con ID:', id);
        this.cancelarTurno(id);
        modal.remove();
      });
    }

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        console.log('Cerrando modal por clic fuera');
        modal.remove();
      }
    });
    console.log('Eventos del modal configurados correctamente');
  };

  async cancelarTurno(id) {
    console.log('=== CANCELANDO TURNO ===');
    console.log('ID del turno a cancelar:', id);
    const confirmado = await this.mostrarConfirmacion("¿Estás seguro de que querés cancelar este turno?");
    console.log('Confirmación:', confirmado);
    if (confirmado) {
      await this.data.eliminarTurno(id);
      console.log('Turno eliminado del data manager');
      this.actualizarUI();
      console.log('UI actualizada después de cancelar');
      this.mostrarNotificacion("Turno cancelado exitosamente.", "info");
    } else {
      console.log('Cancelación cancelada por el usuario');
    }
  }

  exportarTurnos = () => {
    console.log('=== EXPORTANDO TURNOS ===');
    console.log('Total de turnos:', this.data.turnos.length);
    if (this.data.turnos.length === 0) {
      console.log('No hay turnos para exportar');
      this.mostrarNotificacion("No hay turnos para exportar.", "error");
      return;
    }

    const turnosParaExportar = this.data.turnos.map(turno => ({
      ID: turno.id,
      Mascota: turno.nombreMascota,
      Servicio: CONFIG.servicios[turno.tipoServicio].nombre,
      Fecha: Utils.formatearFecha(turno.fecha),
      Hora: Utils.formatearHora(turno.hora),
      Observaciones: turno.observaciones || "Sin observaciones"
    }));

    console.log('Turnos para exportar:', turnosParaExportar);

    const csv = [
      Object.keys(turnosParaExportar[0]).join(','),
      ...turnosParaExportar.map(row => Object.values(row).join(','))
    ].join('\n');

    console.log('CSV generado:', csv);

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `turnos_veterinaria_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    console.log('Archivo descargado');
    this.mostrarNotificacion("Turnos exportados exitosamente.", "exito");
  };

  actualizarUI = () => {
    console.log('=== ACTUALIZANDO UI ===');
    this.mostrarTurnos();
    console.log('Turnos mostrados');
    this.mostrarCalendarioMensual();
    console.log('Calendario mostrado');
    this.actualizarEstadisticas();
    console.log('Estadísticas actualizadas');
    this.actualizarHorariosDisponibles();
    console.log('Horarios disponibles actualizados');
  };
}

// Gestor principal de la aplicación
class AppManager {
  constructor() {
    this.dataManager = new DataManager();
    this.uiManager = new UIManager(this.dataManager);
  }

  inicializar = async () => {
    console.log('=== INICIANDO APLICACIÓN ===');
    await this.dataManager.inicializar();
    console.log('Datos inicializados');
    this.configurarEventos();
    console.log('Eventos configurados');
    this.configurarInicializacion();
    console.log('Inicialización configurada');
    this.uiManager.actualizarUI();
    console.log('UI actualizada');
    
    setTimeout(() => {
      this.uiManager.mostrarNotificacion("¡Bienvenido al sistema de turnos de Veterinaria M.Freud! 🐾", "info");
    }, 1000);
  };

  configurarEventos = () => {
    console.log('=== CONFIGURANDO EVENTOS ===');
    const { ui, data } = { ui: this.uiManager, data: this.dataManager };

    // Formulario
    const formulario = document.getElementById("formularioTurno");
    console.log('Formulario encontrado:', formulario);
    if (formulario) {
      formulario.addEventListener("submit", (e) => {
        console.log('Evento submit del formulario disparado');
        e.preventDefault();
        this.procesarFormulario();
      });
      console.log('Evento submit configurado correctamente');
    } else {
      console.error('Formulario no encontrado');
    }

    // Filtros
    const filtroFecha = document.getElementById("filtroFecha");
    if (filtroFecha) {
      filtroFecha.addEventListener("change", (e) => {
        data.filtrosActivos.fecha = e.target.value;
        ui.mostrarTurnos();
      });
    }

    const filtroServicio = document.getElementById("filtroServicio");
    if (filtroServicio) {
      filtroServicio.addEventListener("change", (e) => {
        data.filtrosActivos.servicio = e.target.value;
        ui.mostrarTurnos();
      });
    }

    const buscarMascota = document.getElementById("buscarMascota");
    if (buscarMascota) {
      buscarMascota.addEventListener("input", (e) => {
        data.filtrosActivos.mascota = e.target.value;
        ui.mostrarTurnos();
      });
    }

    const limpiarFiltros = document.getElementById("limpiarFiltros");
    if (limpiarFiltros) {
      limpiarFiltros.addEventListener("click", () => {
        data.filtrosActivos = { fecha: "", servicio: "", mascota: "" };
        if (filtroFecha) filtroFecha.value = "";
        if (filtroServicio) filtroServicio.value = "";
        if (buscarMascota) buscarMascota.value = "";
        ui.mostrarTurnos();
        ui.mostrarNotificacion("Filtros limpiados.", "info");
      });
    }

    // Calendario
    const selectorMesAnio = document.getElementById("selectorMesAnio");
    if (selectorMesAnio) {
      selectorMesAnio.addEventListener("change", () => ui.mostrarCalendarioMensual());
    }
    
    const fechaTurno = document.getElementById("fechaTurno");
    if (fechaTurno) {
      fechaTurno.addEventListener("change", () => ui.actualizarHorariosDisponibles());
    }

    // Exportar
    const exportarTurnos = document.getElementById("exportarTurnos");
    if (exportarTurnos) {
      exportarTurnos.addEventListener("click", () => ui.exportarTurnos());
    }

    // Cancelar turnos
    const turnosContainer = document.getElementById("turnosContainer");
    if (turnosContainer) {
      turnosContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("btn-cancelar")) {
          const id = e.target.getAttribute("data-id");
          ui.cancelarTurno(id);
        }
      });
    }
  };

  procesarFormulario = async () => {
    console.log('=== PROCESANDO FORMULARIO ===');
    const { ui, data } = { ui: this.uiManager, data: this.dataManager };
    
    const elementos = {
      nombre: document.getElementById("nombreMascota"),
      tipoServicio: document.getElementById("tipoServicio"),
      fecha: document.getElementById("fechaTurno"),
      hora: document.getElementById("horaTurno"),
      observaciones: document.getElementById("observaciones"),
      formulario: document.getElementById("formularioTurno")
    };

    console.log('Elementos encontrados:', elementos);

    // Verificar que todos los elementos existan
    for (const [key, elemento] of Object.entries(elementos)) {
      if (!elemento) {
        console.error(`Elemento ${key} no encontrado`);
        ui.mostrarNotificacion("Error: Elementos del formulario no encontrados.", "error");
        return;
      }
    }
    
    const formData = {
      nombre: elementos.nombre.value.trim(),
      tipoServicio: elementos.tipoServicio.value,
      fecha: elementos.fecha.value,
      hora: elementos.hora.value,
      observaciones: elementos.observaciones.value.trim()
    };

    console.log('Datos del formulario:', formData);

    const validacion = Validator.validarTurno(
      formData.nombre, 
      formData.tipoServicio, 
      formData.fecha, 
      formData.hora, 
      data.turnos
    );

    console.log('Resultado de validación:', validacion);

    if (validacion.valido) {
      const nuevoTurno = new Turno(
        formData.nombre, 
        formData.tipoServicio, 
        formData.fecha, 
        formData.hora, 
        formData.observaciones
      );
      
      console.log('Nuevo turno creado:', nuevoTurno);
      await data.agregarTurno(nuevoTurno);
      console.log('Turno agregado exitosamente');
      ui.actualizarUI();
      elementos.formulario.reset();
      ui.mostrarNotificacion(`¡Turno agendado exitosamente para ${formData.nombre}!`, "exito");
    } else {
      console.log('Validación fallida:', validacion.mensaje);
      ui.mostrarNotificacion(validacion.mensaje, "error");
    }
  };

  configurarInicializacion = () => {
    console.log('=== CONFIGURANDO INICIALIZACIÓN ===');
    const { ui } = { ui: this.uiManager };
    
    // Configurar fecha mínima
    const fechaTurno = document.getElementById("fechaTurno");
    console.log('Elemento fecha encontrado:', fechaTurno);
    if (fechaTurno) {
      const hoy = new Date().toISOString().split('T')[0];
      fechaTurno.min = hoy;
      console.log('Fecha mínima configurada:', hoy);
    }
    
    // Configurar horarios
    console.log('Configurando horarios...');
    ui.configurarHorarios15Minutos();
    
    // Configurar mes actual
    const selectorMesAnio = document.getElementById("selectorMesAnio");
    console.log('Selector mes/año encontrado:', selectorMesAnio);
    if (selectorMesAnio) {
      const fechaActual = new Date();
      const mesActual = fechaActual.getMonth() + 1;
      const anioActual = fechaActual.getFullYear();
      const valorMesActual = `${anioActual}-${mesActual.toString().padStart(2, '0')}`;
      selectorMesAnio.value = valorMesActual;
      console.log('Mes actual configurado:', valorMesActual);
    }
    console.log('Inicialización completada');
  };
}

// Inicialización de la aplicación
const app = new AppManager();
app.inicializar();
   

