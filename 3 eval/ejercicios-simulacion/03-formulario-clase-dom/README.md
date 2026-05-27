# 03 — Formulario + Clase + DOM

## En qué consiste
Combinar una clase `Tarea` con campos privados, un formulario HTML que crea nuevas tareas y un listado dinámico donde cada tarjeta permite completar o eliminar la tarea.

---

## Sintaxis utilizada

### Capturar el submit del formulario
```js
const form = document.getElementById("formTarea");
const inpTitulo = document.getElementById("inpTitulo");

form.addEventListener("submit", function(event) {
  // 1. Evitar que el formulario recargue la página
  event.preventDefault();

  // 2. Leer los valores de los campos
  const titulo = inpTitulo.value;
  const prioridad = document.getElementById("selPrioridad").value;

  // 3. Crear objeto con la clase
  const tarea = new Tarea(siguienteId, titulo, prioridad);

  // 4. Crear la tarjeta HTML e insertarla
  const tarjeta = crearTarjetaTarea(tarea);
  document.getElementById("listaTareas").appendChild(tarjeta);

  // 5. Limpiar el formulario y volver el foco al primer campo
  siguienteId++;
  form.reset();
  inpTitulo.focus();

  // 6. Actualizar contadores del resumen
  actualizarResumen();
});
```

### reset() y focus() — experiencia de usuario
```js
form.reset();       // vacía todos los campos del formulario de golpe
inpTitulo.focus();  // mueve el cursor al primer campo para el siguiente registro
```

### Actualizar una tarjeta existente (sin recrearla)
```js
function actualizarTarjeta(tarjeta) {
  const estado = tarjeta.dataset.estado;  // leer el dato guardado

  // Actualizar el span de estado (texto + clase CSS)
  const spanEstado = tarjeta.querySelector(".etiqueta-estado");
  spanEstado.textContent = nombreEstado(estado);
  // Quitar la clase antigua y poner la nueva
  spanEstado.className = `etiqueta-estado estado-${estado}`;

  // Actualizar clases del article según el estado
  tarjeta.classList.remove("tarea-completada", "tarea-cancelada");
  if (estado !== "pendiente") tarjeta.classList.add(`tarea-${estado}`);
}
```

### Eliminar una tarjeta del DOM
```js
function eliminarTarea(tarjeta) {
  // removeChild necesita el padre — closest o parentElement lo dan
  tarjeta.parentElement.removeChild(tarjeta);
  actualizarResumen();
}
```

### Contar elementos para el resumen
```js
function actualizarResumen() {
  const todas    = document.querySelectorAll(".tarea");               // NodeList
  const activas  = document.querySelectorAll(".tarea:not(.tarea-completada)");
  const completadas = document.querySelectorAll(".tarea-completada");

  document.getElementById("totalTareas").textContent   = todas.length;
  document.getElementById("tareasActivas").textContent = activas.length;
  document.getElementById("completadas").textContent   = completadas.length;

  // Mostrar u ocultar el mensaje de "lista vacía"
  const msg = document.getElementById("mensajeVacio");
  msg.style.display = todas.length === 0 ? "block" : "none";
}
```

---

## Conceptos clave aplicados

| Patrón | Para qué sirve |
|--------|---------------|
| `event.preventDefault()` | Bloquea el comportamiento nativo del `<form>` (recarga) |
| `form.reset()` | Limpia todos los `<input>`, `<select>` y `<textarea>` de golpe |
| `input.focus()` | Mejora la usabilidad: el usuario puede escribir el siguiente sin hacer clic |
| `tarjeta.dataset.estado` | Fuente de verdad de los datos — se lee al actualizar la tarjeta |
| `querySelector` dentro de `tarjeta` | Busca solo dentro de esa tarjeta, no en toda la página |
| `element.className = "..."` | Reemplaza TODAS las clases a la vez (diferente a `classList.add`) |
| `parentElement.removeChild(tarjeta)` | Elimina la tarjeta del DOM |
| `querySelectorAll(".clase").length` | Cuenta cuántos elementos tienen esa clase |

---

## El ciclo de vida de una tarea

```
[Formulario submit]
        ↓
new Tarea(id, titulo, prioridad)   ← clase con campos privados
        ↓
crearTarjetaTarea(tarea)           ← createElement + dataset + classList
        ↓
lista.appendChild(tarjeta)         ← aparece en pantalla
        ↓
[Usuario hace clic en botón]
        ↓
completarTarea(tarjeta)            ← cambia data-estado + actualizarTarjeta()
 o eliminarTarea(tarjeta)          ← removeChild + actualizarResumen()
```
