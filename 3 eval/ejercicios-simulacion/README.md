# Ejercicios de Simulación — 3ª Evaluación

Práctica progresiva para preparar el examen. Cada ejercicio añade un nuevo patrón.
Intenta resolver el `ejercicio.html` antes de mirar `solucion.html`.

## Mapa de ejercicios

| # | Carpeta | Dificultad | Temas clave |
|---|---------|-----------|-------------|
| 01 | [Clase con campos privados](01-clase-campos-privados/) | ⭐ Fácil | `#campos`, constructor, getters, setters con validación |
| 02 | [DOM dinámico y data-*](02-dom-dinamico-dataset/) | ⭐ Fácil | `createElement`, `dataset`, `classList` |
| 03 | [Formulario + Clase + DOM](03-formulario-clase-dom/) | ⭐⭐ Medio | `submit`, `preventDefault`, `reset`, `focus` + clase + tarjetas |
| 04 | [Testing con Jest](04-testing-jest/) | ⭐⭐ Medio | `describe`, `test`, `expect`, `toBe`, `toThrow`, `beforeEach` |
| 05 | [Delegación de eventos](05-delegacion-eventos/) | ⭐⭐⭐ Difícil | `closest()`, `data-accion`, `classList.toggle`, resumen |
| 06 | [Simulacro examen completo](06-simulacro-completo/) | ⭐⭐⭐⭐ Examen | Todos los temas: clase + DOM + formulario + delegación + resumen |

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

## Flujo testing (ejercicio 04)

```bash
cd 04-testing-jest
npm init -y
npm install --save-dev jest
# En package.json → "test": "jest"
npm test
```
