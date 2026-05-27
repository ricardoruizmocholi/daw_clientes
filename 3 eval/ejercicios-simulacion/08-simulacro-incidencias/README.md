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
