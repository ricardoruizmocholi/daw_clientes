# Acceso al Documento desde Código — Crear, Eliminar y Reemplazar Elementos

## ¿Qué es?
JavaScript permite crear nuevos nodos HTML en tiempo de ejecución, insertarlos en el árbol del DOM, modificarlos y eliminarlos sin recargar la página.

## Sintaxis esencial
```js
// Crear elemento
const nuevoDiv = document.createElement('div');
nuevoDiv.textContent = 'Hola mundo';
nuevoDiv.classList.add('tarjeta');
nuevoDiv.dataset.id = '42';        // → atributo data-id="42"

// Insertar en el DOM
padre.appendChild(nuevoDiv);                     // al final
padre.insertBefore(nuevoDiv, referencia);        // antes de otro nodo
padre.insertAdjacentElement('afterend', nuevo);  // posición exacta

// Eliminar y reemplazar
padre.removeChild(hijo);
padre.replaceChild(nuevoNodo, nodoAntiguo);
```

## Ejemplo básico funcional
```js
// Crear una lista de tareas dinámicamente
const lista = document.querySelector('#listaTareas');

function agregarTarea(texto) {
  const li = document.createElement('li');
  li.textContent = texto;
  li.dataset.estado = 'pendiente';
  lista.appendChild(li);
}

function eliminarUltima() {
  if (lista.lastElementChild) {
    lista.removeChild(lista.lastElementChild);
  }
}

agregarTarea('Estudiar DOM');
agregarTarea('Hacer ejercicios');
```

## Errores comunes
- Llamar a `appendChild` antes de que el DOM esté cargado → pon el `<script>` antes de `</body>` o usa `DOMContentLoaded`
- Olvidar asignar `textContent` o `innerHTML` → el elemento se crea vacío y no es visible
- Usar `removeChild` sin verificar que el hijo pertenece al padre → lanza `NotFoundError`

## Para el examen recuerda
- `createElement('etiqueta')` crea el nodo pero **no lo inserta** hasta usar `appendChild` o `insertBefore`
- `dataset.propiedad = valor` escribe `data-propiedad="valor"` en el HTML
- Para vaciar un contenedor: `contenedor.innerHTML = ''` o un bucle con `removeChild`
- `querySelector` busca el **primer** coincidente; `querySelectorAll` devuelve todos (NodeList)

---

## Cómo se usa esto en los ejercicios de simulación

La función `crearTarjeta()` que aparece en todos los simulacros aplica exactamente esta sintaxis. Este es el esquema que se repite en los ejercicios 03, 05, 06, 07 y 08:

```js
function crearTarjetaSocio(socio) {
  // 1 — Crear el nodo raíz
  const article = document.createElement("article");
  article.classList.add("socio");

  // 2 — Guardar TODOS los datos del objeto en data-* (fuente de verdad del DOM)
  article.dataset.id     = socio.getId();
  article.dataset.nombre = socio.getNombre();
  article.dataset.estado = socio.getEstado();
  article.dataset.cuota  = socio.getCuota();

  // 3 — Crear nodos hijos y anidarlos
  const h3 = document.createElement("h3");
  h3.textContent = `Socio #${socio.getId()} — ${socio.getNombre()}`;
  article.appendChild(h3);

  const etiqueta = document.createElement("span");
  etiqueta.classList.add("etiqueta", `estado-${socio.getEstado()}`);
  etiqueta.textContent = "Activo";
  article.appendChild(etiqueta);

  // 4 — Insertar en la lista visible
  document.getElementById("listaSocios").appendChild(article);
}
```

**La regla de los `data-*` en el examen:** todos los datos del objeto deben guardarse en el `dataset` del `article`. Si en algún momento necesitas leer el nombre, precio o estado de la tarjeta, lo lees de `tarjeta.dataset.x`, nunca del texto visible.

**Ejercicios relacionados:** [02 — DOM dinámico](../ejercicios-simulacion/02-dom-dinamico-dataset/) · [06 — Simulacro completo](../ejercicios-simulacion/06-simulacro-completo/) · [07 — Hotel](../ejercicios-simulacion/07-simulacro-hotel/) · [08 — Incidencias](../ejercicios-simulacion/08-simulacro-incidencias/)
