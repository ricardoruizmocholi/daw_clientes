# Programación de Eventos — Delegación, data-* y classList

## ¿Qué es?
Los eventos permiten reaccionar a acciones del usuario (clics, envíos de formulario, teclado). La delegación de eventos consiste en escuchar desde un contenedor padre y usar `closest()` para identificar el elemento real que disparó el evento.

## Sintaxis esencial
```js
// Añadir listener
elemento.addEventListener('click', function(event) {
  // event.target → elemento exacto que recibió el clic
  // event.currentTarget → elemento donde está el listener
  event.stopPropagation(); // detiene la propagación hacia arriba
  event.preventDefault();  // evita comportamiento por defecto (submit, link...)
});

// Delegación con closest() y dataset
contenedor.addEventListener('click', function(event) {
  const tarjeta = event.target.closest('.producto'); // sube el árbol
  if (!tarjeta) return;

  const accion = event.target.dataset.action;  // lee data-action="..."
  const nombre = tarjeta.dataset.nombre;        // lee data-nombre="..."
});

// Gestión de clases CSS
elemento.classList.add('activo');
elemento.classList.remove('activo');
elemento.classList.toggle('activo');          // añade si no está, quita si está
elemento.classList.contains('activo');        // true / false
```

## Ejemplo básico funcional
```js
// Tienda: delegar desde el contenedor, no desde cada botón
const tienda = document.getElementById('bloqueTienda');

tienda.addEventListener('click', function(event) {
  const tarjeta = event.target.closest('.producto');
  if (!tarjeta) return;

  // Resaltar producto al hacer clic en la tarjeta
  if (event.target.dataset.action !== 'add') {
    document.querySelectorAll('.producto')
      .forEach(p => p.classList.remove('resaltado'));
    tarjeta.classList.add('resaltado');
  }

  // Añadir al carrito al hacer clic en el botón
  if (event.target.dataset.action === 'add') {
    const nombre = tarjeta.dataset.nombre;
    const precio = tarjeta.dataset.precio;
    console.log('Añadido:', nombre, precio + '€');
  }
});
```

## Errores comunes
- Añadir un listener por cada elemento en un `forEach` → usa un único listener en el padre (delegación)
- Olvidar `if (!tarjeta) return` → el código falla si el clic es fuera de la tarjeta
- `event.target` vs `event.currentTarget` → `target` es quien disparó el evento; `currentTarget` es donde está el listener
- Usar `getAttribute('data-x')` cuando `dataset.x` es más limpio y directo

## Para el examen recuerda
- Patrón delegación: **un listener en el padre** → `closest()` para encontrar el ancestro correcto → `dataset` para leer la acción
- `closest('.clase')` sube por el árbol hasta encontrar el ancestro con esa clase (o `null` si no existe)
- `data-action="add"` en HTML → `element.dataset.action` en JS
- `classList.toggle('clase')` es ideal para mostrar/ocultar con CSS sin lógica extra
- `stopPropagation()` evita que el evento suba; `preventDefault()` evita el comportamiento del navegador

---

## Código exacto del examen — delegación completa

Este bloque aparece en todos los simulacros (06, 07, 08). Apréndetelo:

```js
// Un solo listener en el contenedor
listaIncidencias.addEventListener("click", function(event) {

  // PASO 1: ¿estamos dentro de una tarjeta?
  const tarjeta = event.target.closest(".incidencia");
  if (!tarjeta) return;  // clic en zona vacía → ignorar

  // PASO 2: ¿se pulsó un botón con data-accion?
  const accion = event.target.dataset.accion;
  if (accion) {
    event.stopPropagation();               // evitar que active el seleccionar
    if (accion === "avanzar")  avanzarEstado(tarjeta);
    if (accion === "editar")   editarDescripcion(tarjeta);
    if (accion === "cerrar")   cerrarIncidencia(tarjeta);
    if (accion === "eliminar") eliminarIncidencia(tarjeta);
    return;
  }

  // PASO 3: clic en la tarjeta (no en botón) → seleccionar
  seleccionarIncidencia(tarjeta);
});
```

```html
<!-- En el HTML, los botones declaran su acción -->
<button type="button" data-accion="avanzar" class="btn-avanzar">▶ Avanzar</button>
<button type="button" data-accion="eliminar" class="btn-eliminar">🗑 Eliminar</button>
```

## Formulario — los tres pasos obligatorios

```js
form.addEventListener("submit", function(event) {
  event.preventDefault();   // 1. Evitar recarga
  // ... crear objeto y tarjeta ...
  form.reset();             // 2. Limpiar campos
  primerCampo.focus();      // 3. Foco al primer input para el siguiente registro
});
```

**Ejercicios relacionados:** [05 — Delegación](../ejercicios-simulacion/05-delegacion-eventos/) · [06 — Simulacro completo](../ejercicios-simulacion/06-simulacro-completo/) · [07](../ejercicios-simulacion/07-simulacro-hotel/) · [08](../ejercicios-simulacion/08-simulacro-incidencias/)
