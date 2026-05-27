# Simulacro 08 — Gestor de Incidencias de Soporte Técnico

## Distribución de tiempo (total: ~115 minutos)

| Parte | Archivo | Tiempo | Temas |
|-------|---------|--------|-------|
| 🖥️ DOM | `dom/ejercicio.html` | **~70 min** | Clase `Incidencia`, `#campos`, `createElement`, `dataset`, `classList`, `submit`, `delegación` |
| 📄 JSDoc | `jsdoc/ejercicio.js` | **~20 min** | `@param`, `@returns`, `@example`, `@typedef` |
| 🧪 Testing | `testing/ejercicio.test.js` | **~25 min** | `describe`, `test`, `expect`, `toBe`, `toThrow`, `toBeCloseTo` |

## Instrucciones

1. **Empieza por el DOM** — completa los 20 TODOs en orden.
2. **JSDoc** — las funciones ya funcionan, solo añade los comentarios.
3. **Testing** — escribe los tests; las funciones están en `testing/funciones.js`.
4. Usa las soluciones (`solucion.*`) solo si llevas más de 10 min bloqueado.

## Tema del simulacro

**Gestor de incidencias de soporte técnico** con:
- Clase `Incidencia` (campos privados, getters, setters)
- Tipos: software, hardware, red, usuario
- Prioridades: baja, media, alta, crítica
- Estados: `abierta → en_progreso → resuelta` (ciclo) · `cerrada` (terminal)
- Resumen: total, activas, resueltas/cerradas, incidencias críticas sin resolver
- Botón "Limpiar cerradas"

## Diferencias respecto al simulacro 07

| Aspecto | Simulacro 07 (Hotel) | Simulacro 08 (Incidencias) |
|---------|---------------------|---------------------------|
| Clase | `Reserva` | `Incidencia` |
| Select principal | Tipo habitación con precio | Tipo de incidencia |
| Select adicional | Noches (number input) | Prioridad (select) |
| Estado terminal | `cancelada` | `cerrada` |
| Ciclo de estados | pendiente→confirmada→checkin | abierta→en_progreso→resuelta |
| Resumen especial | Ingresos estimados | Críticas sin resolver |

## Checklist al terminar

- [ ] La clase usa `#campos` privados, el constructor llama a setters
- [ ] Cada tarjeta guarda todos los datos en `data-*`
- [ ] `aplicarClaseEstado()` elimina todas las clases antiguas antes de añadir la nueva
- [ ] El botón "Cerrar" pone el estado en "cerrada" (no llama a `siguienteEstado()`)
- [ ] El formulario hace `preventDefault()` + `reset()` + `focus()`
- [ ] La delegación usa `closest(".incidencia")` + `dataset.accion`
- [ ] Los 6 `describe` de testing tienen al menos 3 tests cada uno

---

## Sintaxis clave utilizada en este simulacro

### Múltiples clases de etiqueta (estado + tipo + prioridad)
```js
// Cada tarjeta tiene 3 etiquetas con clases dinámicas
const spanEstado    = document.createElement("span");
spanEstado.classList.add("etiqueta", `estado-${inc.getEstado()}`);
spanEstado.textContent = nombreEstado(inc.getEstado());

const spanTipo      = document.createElement("span");
spanTipo.classList.add("etiqueta", `tipo-${inc.getTipo()}`);

const spanPrioridad = document.createElement("span");
spanPrioridad.classList.add("etiqueta", `prioridad-${inc.getPrioridad()}`);
```

### Actualizar solo el span de estado sin recrear la tarjeta
```js
function actualizarTarjetaTrasCambio(tarjeta) {
  const estado = tarjeta.dataset.estado;
  const spanEstado = tarjeta.querySelector(".etiquetas .etiqueta:first-child");

  // Quitar solo la clase estado-* (mantener la clase "etiqueta")
  [...spanEstado.classList].forEach(c => {
    if (c.startsWith("estado-")) spanEstado.classList.remove(c);
  });
  spanEstado.classList.add(`estado-${estado}`);
  spanEstado.textContent = nombreEstado(estado);

  tarjeta.querySelector("p.muted").textContent = tarjeta.dataset.descripcion;
  aplicarClaseEstado(tarjeta);
}
```

### Conteo de críticas sin resolver en el resumen
```js
tarjetas.forEach(t => {
  const { estado, prioridad } = t.dataset;
  if (estado === "abierta" || estado === "en_progreso") activas++;
  if (estado === "resuelta" || estado === "cerrada")    resueltas++;
  // Crítica sin resolver = prioridad crítica Y no terminada
  if (prioridad === "critica" && estado !== "resuelta" && estado !== "cerrada") criticas++;
});
```

### Función formatearTiempo con condicional encadenado
```js
function formatearTiempo(horas) {
  if (horas < 1)   return (horas * 60) + " min";   // 0.5 → "30 min"
  if (horas === 1) return "1 hora";
  return horas + " horas";                           // 4 → "4 horas"
}
```

### Test con toEqual para el objeto ResumenTiempos
```js
test("alta, 50 → objeto correcto", () => {
  expect(calcularResumenTiempos("alta", 50))
    .toEqual({ tiempoEstimado: 4, coste: 200, descripcionTiempo: "4 horas" });
});
```
