# Simulacro 07 — Gestor de Reservas de Hotel

## Distribución de tiempo (total: ~115 minutos)

| Parte | Archivo | Tiempo | Temas |
|-------|---------|--------|-------|
| 🖥️ DOM | `dom/ejercicio.html` | **~70 min** | Clase `Reserva`, `#campos`, `createElement`, `dataset`, `classList`, `submit`, `delegación` |
| 📄 JSDoc | `jsdoc/ejercicio.js` | **~20 min** | `@param`, `@returns`, `@example`, `@typedef` |
| 🧪 Testing | `testing/ejercicio.test.js` | **~25 min** | `describe`, `test`, `expect`, `toBe`, `toThrow` |

## Instrucciones

1. **Empieza por el DOM** — es la parte más larga y la más parecida al examen real.
2. **JSDoc**: abre `jsdoc/ejercicio.js` — las funciones ya están implementadas, añade los comentarios.
3. **Testing**: abre `testing/ejercicio.test.js` — las funciones ya están en `testing/funciones.js`, escribe los tests.
4. Consulta las soluciones (`solucion.*`) solo si llevas más de 10 min bloqueado en un TODO.

## Tema del simulacro

**Gestor de reservas de hotel** con:
- Clase `Reserva` (campos privados, getters, setters)
- Tipos de habitación: Individual (89 €/noche), Doble (129 €/noche), Suite (249 €/noche)
- Estados: `pendiente → confirmada → checkin` (ciclo) · `cancelada` (terminal)
- Resumen: total, activas, canceladas, ingresos estimados
- Botón "Eliminar canceladas"

## Checklist al terminar

- [ ] La clase `Reserva` usa `#campos` privados y el constructor llama a setters
- [ ] `obtenerPrecioSeleccionado()` lee `data-precio` de la opción seleccionada
- [ ] `crearTarjetaReserva()` guarda todos los datos en `data-*`
- [ ] `aplicarClaseEstado()` elimina las clases antiguas antes de añadir la nueva
- [ ] El formulario usa `preventDefault()` + `reset()` + `focus()`
- [ ] La delegación usa `closest(".reserva")` + `dataset.accion`
- [ ] `actualizarResumen()` se llama después de cada acción
- [ ] Cada función JSDoc tiene `@param`, `@returns` y `@example`
- [ ] Los tests cubren casos válidos, inválidos y errores con `toThrow`

---

## Sintaxis clave utilizada en este simulacro

### Leer data-precio de un `<option>` seleccionado
```js
// HTML: <option value="doble" data-precio="129">Doble — 129 €/noche</option>
const opcion = selHabitacion.options[selHabitacion.selectedIndex];
const precio = Number(opcion.dataset.precio);   // "129" → 129
```

### Clase de estado terminal (no avanzar)
```js
function avanzarEstado(tarjeta) {
  if (tarjeta.dataset.estado === "cancelada") return;  // terminal: bloquear
  tarjeta.dataset.estado = siguienteEstado(tarjeta.dataset.estado);
  actualizarTarjetaTrasCambio(tarjeta);
  actualizarResumen();
}
```

### Calcular ingresos estimados en el resumen
```js
function actualizarResumen() {
  const tarjetas = listaReservas.querySelectorAll(".reserva");
  let ingresos = 0;

  tarjetas.forEach(t => {
    const estado = t.dataset.estado;
    if (estado !== "cancelada") {
      ingresos += Number(t.dataset.precioNoche) * Number(t.dataset.noches);
    }
  });
  document.getElementById("ingresosEstimados").textContent = ingresos + " €";
}
```

### JSDoc con @typedef para objeto de retorno
```js
/**
 * @typedef  {Object} ResumenReserva
 * @property {number} importe Importe base sin IVA.
 * @property {number} iva     Importe del IVA aplicado.
 * @property {number} total   Total con IVA incluido.
 */

/**
 * Calcula el resumen de una reserva.
 * @param {number} precioNoche Precio por noche.
 * @param {number} noches      Número de noches.
 * @param {string} tipo        Tipo de habitación.
 * @returns {ResumenReserva}
 * @throws {Error} Si el número de noches no es válido.
 */
function calcularResumen(precioNoche, noches, tipo) { ... }
```

### Tests con toThrow y mensaje exacto
```js
test("noches=0 lanza error", () => {
  expect(() => calcularResumen(89, 0, "individual"))
    .toThrow("El número de noches no es válido (debe ser entre 1 y 30).");
});
```
