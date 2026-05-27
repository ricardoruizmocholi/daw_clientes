# Ejercicios de Simulación — 3ª Evaluación

Práctica progresiva para preparar el examen. Cada ejercicio añade un nuevo patrón.
Intenta resolver el `ejercicio.html` o `ejercicio.test.js` antes de mirar la solución.

## Mapa de ejercicios

| # | Carpeta | Dificultad | Temas clave |
|---|---------|-----------|-------------|
| 01 | [Clase con campos privados](01-clase-campos-privados/) | ⭐ Fácil | `#campos`, constructor, getters, setters con validación |
| 02 | [DOM dinámico y data-*](02-dom-dinamico-dataset/) | ⭐ Fácil | `createElement`, `dataset`, `classList` |
| 03 | [Formulario + Clase + DOM](03-formulario-clase-dom/) | ⭐⭐ Medio | `submit`, `preventDefault`, `reset`, `focus` + clase + tarjetas |
| 04 | [Testing unitario Jest](04-testing-jest/) | ⭐⭐ Medio | `describe`, `test`, `expect`, `toBe`, `toThrow`, `beforeEach` |
| 05 | [Delegación de eventos](05-delegacion-eventos/) | ⭐⭐⭐ Difícil | `closest()`, `data-accion`, `classList.toggle`, resumen |
| 06 | [Simulacro examen completo](06-simulacro-completo/) | ⭐⭐⭐⭐ Examen | Todos los temas: clase + DOM + formulario + delegación + resumen |
| 07 | [Simulacro Hotel](07-simulacro-hotel/) | ⭐⭐⭐⭐ Examen | DOM + JSDoc + Testing unitario — Gestor de reservas |
| 08 | [Simulacro Incidencias](08-simulacro-incidencias/) | ⭐⭐⭐⭐ Examen | DOM + JSDoc + Testing unitario — Soporte técnico |
| 09 | [Testing integración: Carrito](09-testing-integracion-carrito/) | ⭐⭐⭐ Medio | `beforeEach`, pipeline de funciones, `toEqual`, `toHaveLength` |
| 10 | [Testing integración: Pedidos](10-testing-integracion-pedidos/) | ⭐⭐⭐⭐ Difícil | Pipeline encapsulado, errores propagados, estadísticas agregadas |

## Patrón del examen (repite en cada ejercicio)

```
1. Clase con #campos privados + getters/setters
2. Referencias al DOM (getElementById, querySelector)
3. Funciones auxiliares (formatear, calcular)
4. crearTarjeta(objeto) → createElement + dataset + classList
5. aplicarClaseEstado(tarjeta) → classList según data-estado
6. actualizarTarjeta(tarjeta) → lee data-*, actualiza DOM
7. actualizarResumen() → cuenta, calcula, muestra/oculta mensaje
8. acciones: cambiarEstado, editar, cancelar/baja, eliminar
9. formPedido.addEventListener("submit") → new Clase + crearTarjeta + reset
10. listaPedidos.addEventListener("click") → closest + data-accion + delegación
11. btnLimpiar → querySelectorAll + removeChild
```

## Checklist antes de entregar

- [ ] Clase usa `#campos` privados (no `_campo`)
- [ ] Constructor llama a los setters (no asigna directo)
- [ ] Setters validan los datos de entrada
- [ ] `crearTarjeta` usa `createElement` y guarda todo en `data-*`
- [ ] Delegación usa `closest('.clase')` + `dataset.accion`
- [ ] Formulario usa `preventDefault()` + `reset()` + `focus()`
- [ ] Clases CSS gestionadas con `classList.add/remove/toggle`
- [ ] `actualizarResumen()` se llama después de cada acción

## Flujo testing (ejercicios 04, 09, 10)

```bash
# Cualquier carpeta de testing ya tiene package.json listo
cd 04-testing-jest          # o 09-testing-integracion-carrito / 10-testing-integracion-pedidos
npm install                 # instala Jest
npm test                    # ejecuta todos los *.test.js
```

## Tests unitarios vs. tests de integración

| | Unitario (04) | Integración (09 y 10) |
|---|---|---|
| Qué testa | Una función aislada | Varias funciones en cadena |
| Estado compartido | Raramente | `beforeEach(() => { estado = [] })` |
| Fallo en función interna | No aplica | El error sube al test automáticamente |
| Matcher típico | `toBe` | `toEqual`, `toHaveLength`, `toBeCloseTo` |
