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
