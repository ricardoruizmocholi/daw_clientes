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
