# El Modelo de Objetos del DOM

## ¿Qué es?
El DOM (Document Object Model) es la representación en árbol del documento HTML que el navegador crea en memoria, permitiendo acceder y manipular cada elemento como un objeto JavaScript.

## Sintaxis esencial
```js
// El DOM es un árbol de nodos
// document → nodo raíz
// document.documentElement → <html>
// document.body → <body>

// Tipos de nodo
console.log(nodo.nodeType);   // 1 = elemento, 3 = texto, 8 = comentario
console.log(nodo.nodeName);   // "DIV", "P", "#text"...
console.log(nodo.nodeValue);  // solo en nodos de texto
```

## Ejemplo básico funcional
```js
// Inspeccionar la estructura del DOM
const titulo = document.querySelector('h1');

console.log(titulo.nodeType);    // 1 (elemento)
console.log(titulo.nodeName);    // "H1"
console.log(titulo.parentNode);  // nodo padre
console.log(titulo.childNodes);  // NodeList con hijos (incluye texto)
console.log(titulo.children);    // HTMLCollection solo con elementos hijo
```

## Errores comunes
- Confundir `childNodes` con `children` → `childNodes` incluye nodos de texto, `children` solo elementos HTML
- Acceder al DOM antes de que cargue → envuelve el código en `DOMContentLoaded` o ponlo antes de `</body>`
- Olvidar que `nodeValue` es `null` en elementos → úsalo solo en nodos de texto (`nodeType === 3`)

## Para el examen recuerda
- El árbol DOM siempre empieza en `document` → `document.documentElement` → `document.head` / `document.body`
- `nodeType === 1` = elemento, `nodeType === 3` = texto
- `childNodes` devuelve NodeList (incluye texto); `children` devuelve HTMLCollection (solo etiquetas)
- Cada nodo tiene `parentNode`, `firstChild`, `lastChild`, `nextSibling`, `previousSibling`

---

## Cómo se usa esto en los ejercicios de simulación

En los ejercicios del examen no navegas por el árbol con `firstChild` o `nextSibling`; en cambio usas selectores y propiedades de colección. Estas son las formas concretas que aparecen:

```js
// Contar todos los elementos de un tipo para el resumen
const tarjetas = document.querySelectorAll(".incidencia");  // NodeList
tarjetas.forEach(t => { /* recorrer */ });
console.log(tarjetas.length);  // cuántas hay

// Limpiar un contenedor eliminando todos sus hijos
const lista = document.getElementById("listaIncidencias");
while (lista.firstElementChild) {
  lista.removeChild(lista.firstElementChild);
}

// Encontrar el padre de un nodo para eliminarlo
boton.addEventListener("click", () => {
  const tarjeta = boton.closest(".incidencia");  // sube por el árbol
  tarjeta.parentElement.removeChild(tarjeta);    // parentElement = el contenedor
});
```

**Ejercicios relacionados:** [02 — DOM dinámico](../ejercicios-simulacion/02-dom-dinamico-dataset/) · [03 — Formulario + DOM](../ejercicios-simulacion/03-formulario-clase-dom/)
