# 05 — Delegación de Eventos

## En qué consiste
Tres tarjetas de productos estáticas con botones (+, −, favorito, eliminar). Un **único listener** en el contenedor padre detecta todos los clics y decide qué acción ejecutar usando `closest()` y `dataset.accion`.

---

## Sintaxis utilizada

### El patrón de delegación completo
```js
const contenedor = document.getElementById("listaProductos");

contenedor.addEventListener("click", function(event) {
  // PASO 1: ¿el clic está dentro de alguna tarjeta?
  const tarjeta = event.target.closest(".producto");
  if (!tarjeta) return;  // clic fuera de tarjeta → ignorar

  // PASO 2: ¿el clic es en un botón con data-accion?
  const accion = event.target.dataset.accion;
  if (accion) {
    event.stopPropagation();  // evita que el clic siga subiendo al padre

    if (accion === "incrementar") incrementar(tarjeta);
    if (accion === "decrementar") decrementar(tarjeta);
    if (accion === "favorito")    toggleFavorito(tarjeta);
    if (accion === "eliminar")    eliminar(tarjeta);
    return;  // sale: ya se trató la acción del botón
  }

  // PASO 3: clic en la tarjeta (no en un botón) → seleccionar
  seleccionar(tarjeta);
});
```

### closest() — subir por el árbol DOM
```js
// closest(".clase") sube nodo a nodo hasta encontrar el ancestro con esa clase
// Devuelve null si no encuentra ninguno
const tarjeta = event.target.closest(".producto");

// Si el usuario hace clic en un <span> dentro de un <button>
// que está dentro de un <article class="producto">,
// closest(".producto") devuelve el article igualmente.
```

### data-accion en el HTML
```html
<!-- Los botones declaran su acción en data-accion -->
<button type="button" data-accion="incrementar">+</button>
<button type="button" data-accion="decrementar">−</button>
<button type="button" data-accion="favorito">♡</button>
<button type="button" data-accion="eliminar">🗑</button>
```

```js
// En JS se lee con dataset.accion
const accion = event.target.dataset.accion;  // "incrementar", "favorito"...
```

### classList.toggle — alternar estado visual
```js
function toggleFavorito(tarjeta) {
  tarjeta.classList.toggle("favorito");          // añade si no está, quita si está
  const btn = tarjeta.querySelector("[data-accion='favorito']");
  // Cambiar el texto del botón según el estado actual
  btn.textContent = tarjeta.classList.contains("favorito") ? "♥" : "♡";
}
```

### Leer y actualizar dataset para el contador
```js
function incrementar(tarjeta) {
  let cantidad = Number(tarjeta.dataset.cantidad);  // string → número
  cantidad++;
  tarjeta.dataset.cantidad = cantidad;              // actualizar el dato
  tarjeta.querySelector(".cantidad").textContent = cantidad;  // actualizar la vista
  actualizarTotal();
}

function decrementar(tarjeta) {
  let cantidad = Number(tarjeta.dataset.cantidad);
  if (cantidad <= 0) return;  // no bajar de 0
  cantidad--;
  tarjeta.dataset.cantidad = cantidad;
  tarjeta.querySelector(".cantidad").textContent = cantidad;
  actualizarTotal();
}
```

### Calcular el total recorriendo todas las tarjetas
```js
function actualizarTotal() {
  const tarjetas = document.querySelectorAll(".producto");
  let total = 0;

  tarjetas.forEach(function(t) {
    const precio   = Number(t.dataset.precio);    // leer de data-precio
    const cantidad = Number(t.dataset.cantidad);  // leer de data-cantidad
    total += precio * cantidad;
  });

  document.getElementById("totalCarrito").textContent = total.toFixed(2) + " €";
}
```

### stopPropagation — evitar que el clic llegue a la tarjeta
```js
// Sin stopPropagation: click en botón → se ejecuta la acción del botón
//                                     → TAMBIÉN se ejecuta el "seleccionar tarjeta"
// Con stopPropagation: el evento se detiene en el botón
event.stopPropagation();
```

---

## Conceptos clave aplicados

| Patrón | Para qué sirve |
|--------|---------------|
| Un listener en el padre | Más eficiente que poner listeners en cada botón |
| `closest(".clase")` | Localiza el ancestro correcto aunque el clic sea en un hijo interno |
| `dataset.accion` | Identifica qué botón se pulsó sin comparar clases ni textos |
| `classList.toggle` | Alterna un estado visual (favorito, activo, seleccionado...) |
| `classList.contains` | Comprueba si el estado está activo para decidir qué mostrar |
| `stopPropagation()` | Evita que el clic en un botón también dispare el handler de la tarjeta |
| `Number(dataset.x)` | Los valores de dataset son siempre strings; convertir para operar |

---

## Por qué se usa delegación en vez de un listener por botón

```
SIN delegación (16 listeners para 4 tarjetas × 4 botones):
  tarjeta1.querySelector("[data-accion=incrementar]").addEventListener("click", ...)
  tarjeta1.querySelector("[data-accion=decrementar]").addEventListener("click", ...)
  ... × 4 tarjetas = 16 listeners

CON delegación (1 solo listener):
  contenedor.addEventListener("click", ...) → detecta cualquier clic dentro
```

La delegación también funciona con tarjetas añadidas **después** de poner el listener.
