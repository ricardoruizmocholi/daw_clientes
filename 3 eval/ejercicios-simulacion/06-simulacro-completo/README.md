# 06 — Simulacro Completo (Formato Examen)

## En qué consiste
Gestor de socios de un gimnasio. Replica exactamente el formato del examen trimestral: clase con campos privados, formulario, creación dinámica de tarjetas, delegación de eventos, máquina de estados y resumen estadístico. 20 TODOs en orden.

---

## Sintaxis utilizada

### Clase con campos privados (patrón examen completo)
```js
class Socio {
  #id; #nombre; #tipoMembresia; #cuotaMensual; #estado; #observaciones;

  constructor(id, nombre, tipoMembresia, cuotaMensual, observaciones) {
    this.#id = id;
    this.setNombre(nombre);
    this.setTipoMembresia(tipoMembresia);
    this.setCuotaMensual(cuotaMensual);
    this.setObservaciones(observaciones);
    this.#estado = "activo";  // valor inicial fijo
  }

  getId()            { return this.#id; }
  getEstado()        { return this.#estado; }
  setEstado(e)       { this.#estado = e; }
  // ... resto de getters y setters
}
```

### Leer data-precio de la opción seleccionada
```js
// En el HTML: <option value="mensual" data-cuota="30">Mensual - 30 €</option>
function obtenerCuotaSeleccionada() {
  const opcionSeleccionada = selMembresia.options[selMembresia.selectedIndex];
  return Number(opcionSeleccionada.dataset.cuota);  // "30" → 30
}
```

### Crear tarjeta con todos los datos en data-*
```js
function crearTarjetaSocio(socio) {
  const article = document.createElement("article");
  article.classList.add("socio");

  // Guardar TODOS los datos del objeto en data-* para leerlos en los eventos
  article.dataset.id           = socio.getId();
  article.dataset.nombre       = socio.getNombre();
  article.dataset.tipoMembresia = socio.getTipoMembresia();
  article.dataset.cuotaMensual = socio.getCuotaMensual();
  article.dataset.estado       = socio.getEstado();
  article.dataset.observaciones = socio.getObservaciones();

  // Construir el HTML interno con nodos creados
  const h3 = document.createElement("h3");
  h3.textContent = `Socio #${socio.getId()} — ${socio.getNombre()}`;
  // ... más nodos ...

  aplicarClaseEstado(article);  // ← siempre al crear
  return article;
}
```

### Máquina de estados — siguienteEstado()
```js
// Función auxiliar ya dada en el examen
function siguienteEstado(estado) {
  // ciclo: activo → suspendido → activo
  // "baja" es terminal: no aparece aquí → siguienteEstado("baja") → undefined → "activo" por defecto
  return { activo: "suspendido", suspendido: "activo" }[estado] || "activo";
}

// Usar en avanzarEstado:
function avanzarEstado(tarjeta) {
  if (tarjeta.dataset.estado === "baja") return;  // estado terminal: no avanzar
  tarjeta.dataset.estado = siguienteEstado(tarjeta.dataset.estado);
  actualizarTarjetaTrasCambio(tarjeta);
  actualizarResumen();
}
```

### aplicarClaseEstado — gestionar clase de fondo
```js
function aplicarClaseEstado(tarjeta) {
  // Quitar TODAS las clases de estado antes de añadir la nueva
  tarjeta.classList.remove("socio-suspendido", "socio-baja");
  const estado = tarjeta.dataset.estado;
  if (estado === "suspendido") tarjeta.classList.add("socio-suspendido");
  if (estado === "baja")       tarjeta.classList.add("socio-baja");
  // "activo" no tiene clase extra (es el estilo por defecto)
}
```

### actualizarTarjetaTrasCambio — refrescar sin recrear
```js
function actualizarTarjetaTrasCambio(tarjeta) {
  const estado = tarjeta.dataset.estado;
  const observaciones = tarjeta.dataset.observaciones;

  // Actualizar el span de estado: quitar clase vieja, poner nueva
  const span = tarjeta.querySelector(".etiqueta-estado");
  span.className = `etiqueta estado-${estado}`;  // reemplaza todas las clases
  span.textContent = nombreEstado(estado);

  // Actualizar párrafo de observaciones
  tarjeta.querySelector("p.observaciones").textContent = observaciones;

  aplicarClaseEstado(tarjeta);  // actualizar color de fondo
}
```

### Resumen — contar con querySelectorAll y dataset
```js
function actualizarResumen() {
  const todas = listaSocios.querySelectorAll(".socio");

  let activos = 0, suspendidos = 0, cuotaTotal = 0;

  todas.forEach(function(t) {
    const estado = t.dataset.estado;
    if (estado === "activo")     activos++;
    if (estado === "suspendido") suspendidos++;
    if (estado !== "baja")       cuotaTotal += Number(t.dataset.cuotaMensual);
  });

  document.getElementById("totalSocios").textContent      = todas.length;
  document.getElementById("totalActivos").textContent     = activos;
  document.getElementById("totalSuspendidos").textContent = suspendidos;
  document.getElementById("cuotaTotal").textContent       = cuotaTotal + " €";

  mensajeVacio.style.display = todas.length === 0 ? "block" : "none";
}
```

### Delegación completa — el patrón del examen
```js
listaSocios.addEventListener("click", function(event) {
  // 1. Encontrar el article más cercano
  const tarjeta = event.target.closest(".socio");
  if (!tarjeta) return;  // clic fuera de tarjeta

  // 2. ¿Se pulsó un botón de acción?
  const accion = event.target.dataset.accion;
  if (accion) {
    event.stopPropagation();
    if (accion === "avanzar")   avanzarEstado(tarjeta);
    if (accion === "editar")    editarObservaciones(tarjeta);
    if (accion === "baja")      darDeBaja(tarjeta);
    if (accion === "eliminar")  eliminarSocio(tarjeta);
    return;
  }

  // 3. Clic en la tarjeta → seleccionar
  seleccionar(tarjeta);
});
```

---

## Los 20 TODOs del simulacro — mapa rápido

| TODOs | Qué implementar |
|-------|----------------|
| 1 | Completar la clase `Socio` (campos + constructor + getters/setters) |
| 2-6 | `crearTarjetaSocio`: article + datos + cabecera + etiquetas + desc + botones |
| 7 | `aplicarClaseEstado` |
| 8 | `actualizarTarjetaTrasCambio` |
| 9 | `actualizarResumen` |
| 10 | `seleccionar` |
| 11 | `avanzarEstado` |
| 12 | `editarObservaciones` (prompt) |
| 13 | `darDeBaja` |
| 14 | `eliminarSocio` |
| 15-18 | Formulario: recoger datos + new Socio + crearTarjeta + reset/focus |
| 19 | Delegación de eventos |
| 20 | `btnLimpiarBajas` |
