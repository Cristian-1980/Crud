let botonGuardar = document.getElementById('guardar')
botonGuardar.addEventListener('click', (evento) => agregarTarea(evento))

let botonActualizar = document.getElementById('actualizar')
botonActualizar.addEventListener('click', (evento) => actualizarTarea(evento))


let depto = document.getElementById('depto-1')
let cop = document.getElementById('cop')
let mail = document.getElementById('mail')

let contenedor = document.getElementById('tareas')

let tareas = []

function agregarTarea(e) {
  e.preventDefault()

  const tarea = {
    depto: depto.value, 
    cop: cop.value,
    mail: mail.value,
  }
  if (depto.value, cop.value , mail.value == ''){
    alert ('Debe Ingresar todos los datos');
    depto.focus();
    return false;
  } else
  
  tareas.push(tarea)
  guardarEnLS()
  mostrarTareas()
  limpiarInput()
  
}

function limpiarInput() {
  depto.value = ''
  cop.value = ''
  mail.value = ''
}

function editarTarea(boton, deptoTarea) {
  botonGuardar.style.display = 'none'
  botonActualizar.style.display = 'block'

  let tareaEnEdicion = tareas.find((tarea) => tarea.depto === deptoTarea)

  depto.value = tareaEnEdicion.depto
  cop.value = tareaEnEdicion.cop
  mail.value = tareaEnEdicion.mail
  depto.setAttribute('disabled', true)
}

function eliminarTarea(boton, depto) {
  boton.parentElement.parentElement.remove()
  tareas = tareas.filter((tarea) => tarea.depto !== depto)
  guardarEnLS()
 
}


function leerTareas() {
  let tareasEnLS = window.localStorage.getItem('tareas')


  tareas = JSON.parse(tareasEnLS) || []
  mostrarTareas()
}

function mostrarTareas() {
  contenedor.innerHTML = ''
  tareas.forEach((tarea) => {
    contenedor.innerHTML += `
            <article>
                <div>
                    <p i class="bi bi-list-ol mx-4"></i>Nº Depto:  ${tarea.depto}</p>
                    <p i class="bi bi-list-ol mx-4"></i>Nombre completo:  ${tarea.cop}</p>
                    <p i class="bi bi-envelope-check mx-4"></i> E-mail:  ${tarea.mail}</p>
                </div>
                <div>
                    <button onclick="editarTarea(this, '${tarea.depto}' )" id="button2" i class="bi bi-pencil-square"></i>Editar</button>
                    <button onclick="eliminarTarea(this, '${tarea.depto}' )" id="button3"  i class="bi bi-trash"></i>Borrar</button>
                </div>
            </article>
      `
  })
}

function guardarEnLS() {
  let arrayConvertidoAString = JSON.stringify(tareas)
  window.localStorage.setItem('tareas', arrayConvertidoAString)
}

function actualizarTarea(evento) {
  evento.preventDefault()

  let deptoTarea = depto.value
  let nuevoCop = cop.value
  let nuevaMail = mail.value

  tareas = tareas.map((tarea) => {
    if (tarea.depto === deptoTarea) {
      return {
        depto: deptoTarea,
        cop: nuevoCop,
        mail: nuevaMail,
      }
    } else {
      return tarea
    }
  })


  limpiarInput()
  botonGuardar.style.display = 'block'
  botonActualizar.style.display = 'none'
  depto.removeAttribute('disabled')
  guardarEnLS()
  mostrarTareas()
}

leerTareas()
