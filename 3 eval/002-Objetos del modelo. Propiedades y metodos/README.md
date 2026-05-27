# Objetos del DOM — Propiedades y Métodos

## ¿Qué es?
Cada nodo del DOM expone propiedades para leer/escribir contenido (`innerHTML`, `textContent`) y métodos para navegar entre nodos padre, hijo y hermanos.

## Sintaxis esencial
```js
// Leer y escribir contenido
elemento.innerHTML   // lee/escribe HTML interno (puede contener etiquetas)
elemento.textContent // lee/escribe texto plano (sin etiquetas)

// Navegación relacional
elemento.parentNode        // nodo padre
elemento.children          // hijos elemento (HTMLCollection)
elemento.firstElementChild // primer hijo elemento
elemento.lastElementChild  // último hijo elemento
elemento.nextElementSibling     // hermano siguiente
elemento.previousElementSibling // hermano anterior
```

## Ejemplo básico funcional
```js
const lista = document.querySelector('ul');

// Cambiar contenido
lista.firstElementChild.textContent = 'Primer elemento editado';

// Recorrer hijos
Array.from(lista.children).forEach(function(li) {
  li.innerHTML = '<strong>' + li.textContent + '</strong>';
});

// Subir al padre
const padre = lista.parentNode;
console.log(padre.nodeName); // "DIV", "SECTION"...
```

## Errores comunes
- Usar `innerHTML` con datos del usuario → riesgo XSS; usa `textContent` para texto sin etiquetas
- Confundir `firstChild` con `firstElementChild` → `firstChild` puede ser un nodo de texto en blanco
- Modificar `children` mientras se itera → convierte a `Array.from()` primero

## Para el examen recuerda
- `innerHTML` renderiza HTML; `textContent` muestra texto literal
- `children` y `firstElementChild` ignoran nodos de texto (más fiable para iterar)
- Para cambiar varios hijos, convierte `HTMLCollection` con `Array.from()` y usa `forEach`
- `parentNode` siempre existe excepto en el nodo `document` raíz

---

## Cómo se usa esto en los ejercicios de simulación

En las tarjetas dinámicas del examen se usan estas propiedades constantemente para leer y actualizar partes concretas de la tarjeta sin recrearla entera:

```js
// Actualizar el texto de un span de estado dentro de una tarjeta
const spanEstado = tarjeta.querySelector(".etiqueta-estado");
spanEstado.textContent = "En progreso";  // textContent para texto plano

// Actualizar el texto de un párrafo de descripción
tarjeta.querySelector("p.muted").textContent = nuevaDescripcion;

// Leer datos de la tarjeta para calcular el resumen
tarjeta.querySelector("h3").textContent;  // título de la tarjeta

// Navegar al padre para eliminar la tarjeta
tarjeta.parentElement.removeChild(tarjeta);
// parentElement es igual a parentNode pero solo devuelve elementos (no nodos de texto)
```

**Regla práctica del examen:** usa siempre `textContent` para insertar texto (nunca `innerHTML` con datos del usuario). Usa `querySelector` para encontrar un hijo concreto dentro de la tarjeta.

**Ejercicios relacionados:** [03 — Formulario + DOM](../ejercicios-simulacion/03-formulario-clase-dom/) · [06 — Simulacro completo](../ejercicios-simulacion/06-simulacro-completo/)
