# Tercera Evaluación — El DOM: Manipulación y Eventos

> Guía de estudio completa para **Desarrollo de Entorno Cliente (DAW 2)**.  
> Si no asististe a alguna clase, este documento te da todo lo necesario para entender los conceptos, con ejemplos reales extraídos de los ejercicios del curso.

---

## Tabla de Contenidos

- [¿Qué es el DOM?](#-qué-es-el-dom)
- [Módulo 1 — El árbol DOM y sus nodos](#módulo-1--el-árbol-dom-y-sus-nodos)
- [Módulo 2 — Propiedades y métodos de los nodos](#módulo-2--propiedades-y-métodos-de-los-nodos)
- [Módulo 3 — Acceso y manipulación desde código](#módulo-3--acceso-y-manipulación-desde-código)
- [Módulo 4 — Programación de eventos](#módulo-4--programación-de-eventos)
- [Guía rápida de referencia](#guía-rápida-de-referencia)

---

## ¿Qué es el DOM?

**El DOM (Document Object Model) es el mapa vivo de tu página HTML en memoria.**

Cuando el navegador carga un archivo HTML, no trabaja con el texto en crudo. Lo convierte en un árbol de objetos JavaScript que puedes leer y modificar. Cada etiqueta, cada trozo de texto, cada comentario se transforma en un **nodo** dentro de ese árbol.

**Analogía:** Imagina una empresa con organigrama. El CEO es `document`, debajo están los directores (`<html>`, `<head>`, `<body>`), y debajo sus equipos (`<main>`, `<section>`, `<p>`...). JavaScript puede entrar a esa empresa, hablar con cualquier empleado, cambiarle el nombre, despedirle o contratar a uno nuevo, y eso se refleja inmediatamente en la pantalla.

```
document
└── html
    ├── head
    │   └── title → "Mi página"
    └── body
        └── main#zonaPrincipal
            ├── h2#titulo → "Mi tienda"
            ├── p#parrafo
            │   ├── #text → "Bienvenido a la "
            │   ├── strong#palabraImportante → "zona premium"
            │   └── #text → " del sitio."
            └── ul#lista
                ├── li → "Producto A"
                └── li → "Producto B"
```

> Este árbol concreto es el del ejercicio `inspectorNodos.html`. Cada caja de ese árbol es un **nodo**.

---

## Módulo 1 — El árbol DOM y sus nodos

### 1.1 Tipos de nodos

**No todo en el DOM es una etiqueta HTML.** Hay varios tipos de nodo y cada uno tiene un número identificador (`nodeType`):

| Constante | Valor | Qué representa |
|---|---|---|
| `Node.ELEMENT_NODE` | 1 | Una etiqueta HTML: `<p>`, `<div>`, `<button>`... |
| `Node.TEXT_NODE` | 3 | El texto dentro de una etiqueta, o los espacios/saltos de línea entre etiquetas |
| `Node.COMMENT_NODE` | 8 | Un comentario HTML: `<!-- esto -->` |
| `Node.DOCUMENT_NODE` | 9 | El objeto `document` en sí |
| `Node.DOCUMENT_TYPE_NODE` | 10 | La declaración `<!DOCTYPE html>` |

```js
// Detectar el tipo de un nodo con un switch
function tipoNodoTexto(nodeType) {
  switch (nodeType) {
    case Node.ELEMENT_NODE:   return "ELEMENT_NODE (1)";  // etiqueta HTML
    case Node.TEXT_NODE:      return "TEXT_NODE (3)";     // texto o espacio
    case Node.COMMENT_NODE:   return "COMMENT_NODE (8)";  // comentario
    case Node.DOCUMENT_NODE:  return "DOCUMENT_NODE (9)"; // el objeto document
    default: return "Otro tipo (" + nodeType + ")";
  }
}
```

> Extraído de `inspectorNodos.html`. Este patrón se usa en el inspector para mostrar qué tipo de nodo estás inspeccionando.

**¿Por qué importa saber esto?** Porque cuando recorras los hijos de un elemento, te vas a encontrar con nodos de texto inesperados. Los saltos de línea y espacios entre etiquetas también son nodos `TEXT_NODE`. Si intentas acceder a `.children` de un nodo de texto, fallará. Necesitas saber con qué tipo de nodo estás tratando.

---

### 1.2 Propiedades básicas de un nodo

Todo nodo del DOM tiene estas tres propiedades fundamentales:

| Propiedad | Qué devuelve |
|---|---|
| `nodeType` | El número del tipo (1, 3, 8, 9...) |
| `nodeName` | El nombre en mayúsculas: `"DIV"`, `"P"`, `"#text"`, `"#document"` |
| `nodeValue` | El texto si es un `TEXT_NODE`; `null` para elementos HTML |

```js
const titulo = document.getElementById("titulo"); // <h2 id="titulo">Mi tienda</h2>

console.log(titulo.nodeType);  // 1  (es un elemento)
console.log(titulo.nodeName);  // "H2"
console.log(titulo.nodeValue); // null (los elementos no tienen nodeValue)

// El texto dentro del h2 sí tiene nodeValue:
const textoDelTitulo = titulo.firstChild; // nodo de texto
console.log(textoDelTitulo.nodeType);   // 3
console.log(textoDelTitulo.nodeName);   // "#text"
console.log(textoDelTitulo.nodeValue);  // "Mi tienda"
```

---

### 1.3 Relaciones entre nodos — navegar por el árbol

Cada nodo conoce a sus vecinos. Puedes subir, bajar y moverte lateralmente por el árbol usando estas propiedades:

```
                  parentNode
                      ↑
[previousSibling] ← nodo → [nextSibling]
                      ↓
              firstChild ... lastChild
              (todos los hijos en childNodes)
```

| Propiedad | Qué devuelve |
|---|---|
| `parentNode` | El nodo padre |
| `firstChild` | El primer hijo (puede ser un nodo de texto) |
| `lastChild` | El último hijo |
| `previousSibling` | El hermano anterior |
| `nextSibling` | El hermano siguiente |
| `childNodes` | Todos los hijos (NodeList, incluyendo textos y comentarios) |

```js
const parrafo = document.getElementById("parrafo");
// <p id="parrafo">Bienvenido a la <strong>zona premium</strong> del sitio.</p>

// Subir: el padre del párrafo
console.log(parrafo.parentNode.nodeName); // "MAIN"

// Primer hijo del párrafo: NO es el <strong>, es el nodo de texto "Bienvenido a la "
console.log(parrafo.firstChild.nodeType);  // 3 (TEXT_NODE)
console.log(parrafo.firstChild.nodeValue); // "Bienvenido a la "

// El <strong> es el SEGUNDO hijo (índice 1)
console.log(parrafo.childNodes[1].nodeName); // "STRONG"
```

> **Trampa clásica:** Mucha gente asume que `firstChild` devuelve el primer elemento HTML hijo. En realidad puede devolver un nodo de texto (el espacio o salto de línea que hay antes del primer elemento en el HTML). Usa `firstElementChild` si quieres saltar los nodos de texto.

---

### 1.4 `childNodes` vs `children` — la diferencia más importante del módulo

Esta es **la confusión más frecuente** y el inspector de nodos del ejercicio está diseñado exactamente para que la veas en acción.

**`childNodes`** → devuelve **TODOS** los hijos: elementos, textos, comentarios. Es un `NodeList`.  
**`children`** → devuelve **SOLO los elementos HTML** hijos. Es un `HTMLCollection`.

```html
<!-- En el HTML hay saltos de línea entre las etiquetas, que generan TEXT_NODEs -->
<div id="contenedorPrueba">

  <h3>Título de prueba</h3>

  <p>Primer párrafo</p>

  <ul>
    <li>Elemento 1</li>
  </ul>

</div>
```

```js
const contenedor = document.getElementById("contenedorPrueba");

// childNodes cuenta TODO: etiquetas + saltos de línea entre ellas
console.log(contenedor.childNodes.length); // 9 (aprox: saltos + etiquetas + más saltos)

// children cuenta solo las etiquetas HTML
console.log(contenedor.children.length);   // 3 (h3, p, ul)

// Recorrer solo elementos HTML (la manera más segura):
for (let i = 0; i < contenedor.children.length; i++) {
  console.log(contenedor.children[i].tagName); // "H3", "P", "UL"
}
```

> Extraído de `childNodesYChildren.html`. Ejecuta ese archivo y pulsa "Analizar contenedor" para ver exactamente cuántos nodos de texto hay y dónde están.

**Analogía:** `childNodes` es como la lista de todos los archivos en una carpeta (incluidos los archivos ocultos del sistema). `children` es solo los archivos que tú creaste conscientemente.

---

### Ejemplo de uso completo — Módulo 1

> Basado en `inspectorNodos.html`

```js
// Inspeccionar cualquier nodo y mostrar toda su información relevante
function inspeccionar(nodo) {
  // Resaltar visualmente si es un elemento
  if (nodo.nodeType === Node.ELEMENT_NODE) {
    nodo.classList.add("resaltado");
  }

  // Construir el informe del nodo
  let info = "";
  info += "Tipo: " + nodo.nodeType + "\n";
  info += "Nombre: " + nodo.nodeName + "\n";
  info += "Valor: " + (nodo.nodeValue === null ? "null" : nodo.nodeValue) + "\n";
  info += "Padre: " + (nodo.parentNode ? nodo.parentNode.nodeName : "ninguno") + "\n";
  info += "Primer hijo: " + (nodo.firstChild ? nodo.firstChild.nodeName : "ninguno") + "\n";
  info += "Hijos (childNodes): " + nodo.childNodes.length + "\n";

  // Solo los elementos tienen .children
  if ("children" in nodo) {
    info += "Elementos hijo (children): " + nodo.children.length + "\n";
  }

  document.getElementById("salida").textContent = info;
}

// Ejemplo de uso: inspeccionar el párrafo de la página
const parrafo = document.getElementById("parrafo");
inspeccionar(parrafo);
```

---

## Módulo 2 — Propiedades y métodos de los nodos

### 2.1 Leer y modificar atributos HTML

Los atributos HTML (`id`, `class`, `href`, `src`, `title`, `disabled`...) se leen y escriben con tres métodos:

| Método | Uso |
|---|---|
| `element.getAttribute("nombre")` | Leer el valor de un atributo |
| `element.setAttribute("nombre", "valor")` | Crear o modificar un atributo |
| `element.removeAttribute("nombre")` | Eliminar completamente un atributo |

```js
const tarjeta = document.getElementById("tarjetaAlumno");
const enlace  = document.getElementById("enlaceAlumno");
const foto    = document.getElementById("fotoAlumno");

// LEER atributos
console.log(tarjeta.getAttribute("title"));       // "Tarjeta de alumno estándar"
console.log(tarjeta.getAttribute("data-nivel"));  // "normal"
console.log(enlace.getAttribute("href"));         // "https://es.wikipedia.org/..."
console.log(foto.getAttribute("src"));            // "pablo.png"

// MODIFICAR atributos
enlace.setAttribute("href", "https://es.wikipedia.org/wiki/JavaScript");
foto.setAttribute("src", "hector.png");
tarjeta.setAttribute("data-nivel", "destacado");

// ELIMINAR un atributo (el elemento deja de tenerlo)
tarjeta.removeAttribute("title");
console.log(tarjeta.getAttribute("title")); // null (ya no existe)
```

> Extraído de `cambiarContenido.html`. Al pulsar "Cambiar a destacado", el código ejecuta exactamente estos pasos sobre la tarjeta de alumno.

**¿Cuándo usar `getAttribute` vs acceder directamente?**  
Para la mayoría de atributos estándar puedes hacer `elemento.href` o `elemento.src` directamente. Para atributos personalizados (`data-*`) y cuando quieras saber si el atributo existe, usa siempre `getAttribute`.

---

### 2.2 Atributos personalizados: `data-*`

Los atributos `data-*` son atributos que tú inventas para guardar información en el HTML sin afectar su comportamiento visual. Son la forma estándar de almacenar estado en los elementos del DOM.

**Por qué importan:** Te permiten saber el estado de un elemento (qué prioridad tiene, si está pendiente o completada, cuánto cuesta) sin necesidad de variables JavaScript externas. El estado vive en el propio elemento.

```html
<!-- Guardamos el estado de la tarea directamente en el elemento -->
<li class="tarea"
    data-id="1"
    data-estado="pendiente"
    data-prioridad="3"
    data-url="https://wikipedia.org/...">
  Preparar práctica de DOM
</li>
```

```js
const tarea = document.querySelector(".tarea");

// Leer datos
const id       = tarea.getAttribute("data-id");       // "1"
const estado   = tarea.getAttribute("data-estado");   // "pendiente"
const prioridad = tarea.getAttribute("data-prioridad"); // "3"

// Modificar estado
tarea.setAttribute("data-estado", "completada");

// También puedes usar dataset (acceso más limpio):
console.log(tarea.dataset.estado);    // "pendiente"  (equivale a getAttribute("data-estado"))
console.log(tarea.dataset.prioridad); // "3"
```

> Extraído de `ejercicio-003.html`. El gestor de tareas avanzado usa `data-estado`, `data-prioridad` y `data-url` para guardar toda la información de cada tarea en el propio elemento `<li>`.

**Caso de uso real:** En la tienda online (`ejercicoUsoCompletoDOM.html`), cada tarjeta de producto tiene `data-nombre` y `data-precio`. Cuando el usuario pulsa "Añadir al carrito", el listener sube hasta la tarjeta con `closest()` y lee esos atributos para saber qué producto añadir.

---

### 2.3 Modificar contenido: `textContent` vs `innerHTML`

| Propiedad | Lee/escribe | Interpreta HTML |
|---|---|---|
| `textContent` | Solo texto plano | No. Las etiquetas se muestran como texto |
| `innerHTML` | HTML completo | Sí. Puede crear elementos con etiquetas |

```js
const titulo = document.getElementById("nombreAlumno");

// textContent: seguro y simple, para texto sin formato
titulo.textContent = "Héctor Bordes";

// Si escribes HTML con textContent, lo muestra literalmente:
titulo.textContent = "<strong>Héctor</strong>"; // muestra: <strong>Héctor</strong>

// innerHTML: para insertar etiquetas HTML dentro de un elemento
const info = document.getElementById("panel");
info.innerHTML = "<strong>Nombre:</strong> Héctor Bordes";
// Resultado: "Nombre:" en negrita + " Héctor Bordes" normal

// CUIDADO con innerHTML: nunca insertes texto del usuario directamente
// (riesgo de XSS). Usa textContent para datos del usuario.
const inputUsuario = document.getElementById("txtTarea").value;
spanTexto.textContent = inputUsuario; // CORRECTO: escapa caracteres peligrosos
// span.innerHTML = inputUsuario;     // MAL si el texto viene de un usuario externo
```

> La regla es simple: si solo necesitas texto, usa `textContent`. Si necesitas crear estructura HTML, usa `innerHTML`, pero solo con datos de tu propio código.

---

### 2.4 Manipulación de clases con `classList`

En lugar de sobreescribir todo el atributo `class`, usa `classList` para modificarlo de forma quirúrgica:

| Método | Qué hace |
|---|---|
| `classList.add("clase")` | Añade la clase si no estaba |
| `classList.remove("clase")` | Quita la clase si existía |
| `classList.toggle("clase")` | La añade si no está; la quita si ya está |
| `classList.contains("clase")` | Devuelve `true`/`false` |

```js
const tarjeta = document.getElementById("tarjetaAlumno");

// Cambiar el estilo visual de la tarjeta cambiando sus clases
function limpiarEstados() {
  tarjeta.classList.remove("normal");    // quita "normal" si existe
  tarjeta.classList.remove("destacada"); // quita "destacada" si existe
  tarjeta.classList.remove("premium");   // quita "premium" si existe
}

function ponerDestacado() {
  limpiarEstados();
  tarjeta.classList.add("destacada"); // ahora tiene class="tarjeta destacada"
}

// toggle: muy útil para estados on/off (seleccionado / no seleccionado)
tarjeta.classList.toggle("seleccionada");

// Comprobar estado actual
if (tarjeta.classList.contains("destacada")) {
  console.log("La tarjeta está destacada");
}
```

> Extraído de `cambiarContenido.html`. Los botones "Cambiar a destacado" y "Cambiar a premium" usan exactamente este patrón: primero limpian todas las clases de estado, luego añaden la nueva.

**Analogía:** `classList` es como las etiquetas de una carpeta física. Puedes añadir etiquetas, quitarlas o darles la vuelta, sin tener que reescribir toda la carpeta. `className = "..."` sería como tirar la carpeta y hacer una nueva.

---

### 2.5 La propiedad `disabled`

Los botones e inputs tienen una propiedad booleana `disabled` que los desactiva:

```js
const boton = document.getElementById("btnFavorito");

// Deshabilitar
boton.disabled = true;   // el botón se ve gris y no responde a clicks

// Habilitar
boton.disabled = false;  // el botón vuelve a funcionar

// Alternar estado (muy útil para botones toggle)
boton.disabled = !boton.disabled;

// Leer estado
console.log(boton.disabled ? "deshabilitado" : "habilitado");
```

> En el ejercicio `cambiarContenido.html`, el botón "Enviar mensaje" se deshabilita o habilita dependiendo del estado del alumno (premium, destacado, normal). En `ejercicio-002.html`, la lógica es: si el juego está pendiente O tiene PEGI 18, el botón de favoritos se deshabilita.

---

### Ejemplo de uso completo — Módulo 2

> Patrón extraído de `cambiarContenido.html` y `ejercicio-002.html`

```js
// Tarjeta de videojuego con control completo de atributos y clases
function actualizarTarjeta() {
  const estado   = document.getElementById('inEstado').value;   // "pendiente"/"jugando"/"completado"
  const pegi     = document.getElementById('inPegi').value;     // "3", "12", "16", "18"
  const plataforma = document.getElementById('inPlataforma').value; // "pc", "playstation"...

  const card   = document.getElementById('cardJuego');
  const btnFav = document.getElementById('btnFavorito');
  const badge  = document.getElementById('domEstado');

  // 1. Actualizar contenido de texto
  badge.textContent = estado.toUpperCase();

  // 2. Cambiar clases (estado visual del badge)
  badge.className = `estado-badge ${estado}`; // limpia y reasigna en un paso

  // 3. Cambiar clases (apariencia de la tarjeta según plataforma)
  card.className = `tarjeta-juego ${plataforma}`; // pc, playstation, xbox, nintendo

  // 4. Lógica con atributos personalizados + disabled
  const esElegible = !(estado === 'pendiente' || pegi === '18');
  card.setAttribute('data-fav-eligible', esElegible); // guarda el estado en el DOM

  // 5. Refleja el atributo en la propiedad del botón
  btnFav.disabled = !esElegible;
}
```

---

## Módulo 3 — Acceso y manipulación desde código

### 3.1 Seleccionar elementos del DOM

Antes de modificar cualquier cosa, necesitas obtener una referencia al elemento. Hay varias formas:

| Método | Busca por | Devuelve |
|---|---|---|
| `getElementById("id")` | Atributo `id` (único) | Un elemento o `null` |
| `querySelector(".clase")` | Selector CSS (el primero) | Un elemento o `null` |
| `querySelectorAll(".clase")` | Selector CSS (todos) | NodeList (estática) |

```js
// Por id: la forma más rápida cuando el elemento tiene id único
const lista = document.getElementById("listaTareas");

// Por selector CSS: flexible, igual que en CSS
const primerBoton = document.querySelector("button.btn-eliminar");
const titulo      = document.querySelector("#parrafo .titulo");

// Todos los elementos que coincidan
const todasLasTareas = document.querySelectorAll(".tarea");

// IMPORTANTE: querySelector también funciona dentro de un elemento
// Busca dentro de esa tarjeta concreta, no en toda la página
const tarjeta = document.querySelector(".tarjeta");
const nombre  = tarjeta.querySelector(".nombre");  // solo busca dentro de tarjeta
const estado  = tarjeta.querySelector(".estado");
```

> Buscar dentro de un elemento con `querySelector` es un patrón fundamental que aparece en `recorridoRelaciones.html` y en todos los ejercicios de eventos.

---

### 3.2 Crear elementos dinámicamente

Para añadir algo nuevo a la página, el proceso siempre son tres pasos: **crear, configurar, insertar**.

```js
function crearTarea(textoTarea, contador) {
  // PASO 1: Crear el elemento raíz
  const li = document.createElement("li");
  li.classList.add("tarea");
  li.setAttribute("data-id", contador);   // guardamos el id como atributo personalizado

  // PASO 2: Crear los hijos y montarlos entre sí
  const divTexto = document.createElement("div");

  const titulo = document.createElement("strong");
  titulo.textContent = textoTarea;         // texto plano: seguro para datos del usuario

  const meta = document.createElement("span");
  meta.classList.add("meta");
  meta.textContent = "Tarea número " + contador;

  divTexto.appendChild(titulo);  // strong dentro de div
  divTexto.appendChild(meta);    // span dentro de div

  const btnEliminar = document.createElement("button");
  btnEliminar.textContent = "Eliminar";
  btnEliminar.classList.add("btn-eliminar");
  btnEliminar.setAttribute("title", "Eliminar esta tarea");

  // PASO 3: Montar la estructura completa del li
  li.appendChild(divTexto);     // div dentro del li
  li.appendChild(btnEliminar);  // botón dentro del li

  return li; // devolvemos el elemento creado para que quien llame lo inserte
}
```

> Extraído de `creacionDeElementos.html`. La función devuelve el elemento en lugar de insertarlo directamente — esto es una buena práctica que separa la creación de la inserción.

**Alternativa con `innerHTML`:** Para estructuras complejas, `innerHTML` puede ser más legible:

```js
// Equivalente con innerHTML (más compacto, pero mezcla JS y HTML)
tr.innerHTML = `
  <td class="nombre-cart">${nombre}</td>
  <td>
    <button data-action="minus" class="btn-qty">-</button>
    <span class="cant-val">1</span>
    <button data-action="plus" class="btn-qty">+</button>
  </td>
  <td class="subtotal-cart">${precio}€</td>
`;
```

> Patrón usado en `ejercicoUsoCompletoDOM.html` para crear las filas del carrito. Elegir entre `createElement` e `innerHTML` depende de la complejidad: para estructuras simples de pocos elementos, `createElement` es más explícito; para tablas con muchas celdas, `innerHTML` con template literals es más legible.

---

### 3.3 Insertar elementos en el DOM

```js
const lista = document.getElementById("listaTareas");
const nuevaLi = crearTarea("Estudiar para el examen", 5);

// Insertar al FINAL
lista.appendChild(nuevaLi);

// Insertar ANTES de otro elemento
const primerElemento = lista.firstElementChild;
lista.insertBefore(nuevaLi, primerElemento); // inserta antes del primero → al inicio

// Reordenar elementos existentes: appendChild mueve si ya existe
// (muy útil para ordenar listas sin crear elementos nuevos)
lista.appendChild(elemento); // si 'elemento' ya está en la lista, lo mueve al final
```

> La reordenación por prioridad en `ejercicio-003.html` usa exactamente `appendChild` sobre elementos ya existentes para moverlos a su nueva posición.

---

### 3.4 Eliminar elementos del DOM

```js
const lista = document.getElementById("listaTareas");

// MÉTODO 1: removeChild — el padre elimina a un hijo conocido
const ultimoElemento = lista.lastElementChild;
lista.removeChild(ultimoElemento);

// MÉTODO 2: remove() — el elemento se elimina a sí mismo (más moderno)
const elemento = document.querySelector(".tarea");
elemento.remove(); // equivale a elemento.parentElement.removeChild(elemento)

// MÉTODO 3: desde un evento, navegando por el DOM
function eliminarTarea(e) {
  // El botón pulsado (e.currentTarget) sube a su padre (la tarjeta li)
  const tarjeta = e.currentTarget.parentElement.parentElement;
  tarjeta.parentElement.removeChild(tarjeta);
}
```

> En `eliminacionYRemplazoDeElementos.html` se practican los tres escenarios: borrar el último, borrar desde dentro de la estructura, y limpiar todo el contenido con `innerHTML = ""`.

---

### 3.5 Reemplazar elementos

`replaceChild(nuevo, antiguo)` sustituye un hijo por otro dentro del mismo padre:

```js
const cajaTexto = document.getElementById("cajaTexto");

// El nodo actual dentro de la caja
const parrafoActual = cajaTexto.firstElementChild;

// Crear el nuevo nodo que lo sustituirá
const nuevoStrong = document.createElement("strong");
nuevoStrong.textContent = "ATENCIÓN: mensaje reemplazado.";

// El padre (caja) reemplaza al hijo viejo por el nuevo
cajaTexto.replaceChild(nuevoStrong, parrafoActual);
// Resultado: donde había un <p>, ahora hay un <strong>
```

> Extraído de `eliminacionYRemplazoDeElementos.html`. La función "Cambiar tarjeta" usa el mismo patrón para sustituir una tarjeta completa por otra.

---

### 3.6 Navegar por la jerarquía del DOM desde código

Este es el patrón más importante del módulo: **a partir de un elemento conocido, encontrar elementos relacionados sin usar ids**.

```
         parentElement
              ↑
[previousElementSibling] ← elemento → [nextElementSibling]
              ↓
  firstElementChild  ...  lastElementChild
  (solo cuenta elementos HTML, ignora texto)
```

```js
// Ejemplo del ejercicio recorridoRelaciones.html
// Todos los botones comparten el mismo handler
function cambiarTarjeta(evento) {
  // 1. Obtenemos el botón que disparó el evento
  const botonPulsado = evento.currentTarget;

  // 2. SUBIMOS al padre: la tarjeta que contiene ese botón
  const tarjeta = botonPulsado.parentElement; // <article class="tarjeta">

  // 3. BAJAMOS a elementos específicos dentro de ESA tarjeta
  const nombre   = tarjeta.querySelector(".nombre");   // <h2 class="nombre">
  const estado   = tarjeta.querySelector(".estado");   // <span class="estado">
  const contador = tarjeta.querySelector(".contador"); // <span class="contador">

  // 4. Modificamos solo esa tarjeta (las otras no se tocan)
  let veces = Number(contador.textContent);
  veces++;
  contador.textContent = veces;
  tarjeta.classList.toggle("destacada");
}
```

> Este patrón sube con `parentElement` y luego baja con `querySelector`. Es la base de los ejercicios de eventos donde los botones están dentro de tarjetas y necesitan modificar solo su tarjeta padre.

**Propiedad especial: `element.closest(".selector")`**

`closest` sube por el árbol buscando el ancestro más cercano que coincida con el selector. Es más robusto que encadenar `.parentElement` porque no depende de cuántos niveles hay:

```js
// Sin closest: frágil, asume una estructura fija
const fila = boton.parentElement.parentElement; // Botón → TD → TR

// Con closest: robusto, funciona aunque cambie la estructura intermedia
const fila = boton.closest("tr");
const tarjeta = boton.closest(".producto");
```

---

### Ejemplo de uso completo — Módulo 3

> Patrón completo de gestor de tareas extraído de `ejercicio-003.html`

```js
// Creación, inserción, eliminación y navegación en un solo flujo
function crearTarea() {
  const nombre   = document.getElementById("inputTarea").value;
  const link     = document.getElementById("inputLink").value || "#";
  const prioridad = document.getElementById("selectPrioridad").value;

  const lista = document.getElementById("listaTareas");

  // 1. CREAR el elemento con todos sus atributos de estado
  const li = document.createElement("li");
  li.className = "tarea";
  li.setAttribute("data-estado", "pendiente");
  li.setAttribute("data-prioridad", prioridad);
  li.setAttribute("data-url", link);

  // 2. CONSTRUIR la estructura interna con innerHTML
  li.innerHTML = `
    <img src="icono-pendiente.png" alt="Estado">
    <div class="info-tarea">
      <strong class="titulo">${nombre}</strong>
      <a href="${link}" target="_blank" class="enlace">Ver info</a>
    </div>
    <div class="controles">
      <button data-action="completar" title="Cambiar estado">✔</button>
      <button data-action="editar" title="Editar texto">✏</button>
      <button data-action="eliminar" title="Borrar" style="color:red">✖</button>
    </div>
  `;

  // 3. INSERTAR en el DOM
  lista.appendChild(li);
}

// Función de eliminación que navega por el DOM para encontrar su tarjeta
function eliminarTarea(e) {
  // Sube desde el botón hasta el li que lo contiene
  const tarjeta = e.currentTarget.closest("li.tarea");
  tarjeta.parentElement.removeChild(tarjeta);
}

// Reorganizar por prioridad: mover elementos existentes, no crear nuevos
function reorganizarPrioridad() {
  const lista  = document.getElementById("listaTareas");
  const tareas = Array.from(lista.children); // NodeList → Array para poder usar .sort()

  tareas.sort((a, b) => {
    // Leer el atributo de cada elemento para comparar
    return b.getAttribute("data-prioridad") - a.getAttribute("data-prioridad");
  });

  // Vaciar y reinsertar en orden: appendChild mueve elementos ya existentes
  lista.innerHTML = "";
  tareas.forEach(tarea => lista.appendChild(tarea));
}
```

---

## Módulo 4 — Programación de Eventos

### 4.1 `addEventListener` — suscribirse a eventos

Un evento es algo que ocurre en la página: un click, una tecla pulsada, el ratón moviéndose. `addEventListener` te permite "escuchar" ese momento y ejecutar código cuando ocurra.

```js
// Sintaxis:
elemento.addEventListener("tipo-de-evento", funcionHandler, useCapture);
//                                                           ^--- true=captura, false=burbujeo (por defecto)

// Ejemplos:
const boton = document.getElementById("btnAgregar");

// Forma simple (función flecha inline)
boton.addEventListener("click", () => {
  console.log("Botón pulsado");
});

// Mejor: función con nombre (se puede reutilizar, probar y eliminar después)
function agregarTarea() {
  const texto = document.getElementById("txtTarea").value.trim();
  if (texto === "") { alert("Escribe algo"); return; }
  // ... lógica de creación ...
}

boton.addEventListener("click", agregarTarea);

// También puedes escuchar teclas
document.getElementById("txtTarea").addEventListener("keydown", function(evento) {
  if (evento.key === "Enter") {
    agregarTarea(); // misma función al pulsar Enter
  }
});
```

> Extraído de `creacionDeElementos.html`. El mismo patrón de doble listener (click en botón + Enter en input) aparece en casi todos los ejercicios del curso.

---

### 4.2 `event.target` vs `event.currentTarget`

Esta es **la diferencia más importante de todo el módulo de eventos**.

Cuando ocurre un evento, el objeto `event` tiene dos referencias de elemento distintas:

| Propiedad | Qué es |
|---|---|
| `event.target` | El elemento donde el usuario realmente hizo click (el origen del evento) |
| `event.currentTarget` | El elemento que tiene el listener registrado (donde pusiste `addEventListener`) |

**Pueden ser el mismo elemento o elementos distintos.** Son distintos cuando el click ocurre en un hijo pero el listener está en el padre (porque el evento burbujea hacia arriba).

```js
// El listener está en la tarjeta, pero el usuario puede clicar en el título, párrafo o botón
const tarjeta = document.getElementById("tarjeta");

tarjeta.addEventListener("click", function(event) {
  const target        = event.target;        // ¿DÓNDE clicó el usuario?
  const currentTarget = event.currentTarget; // ¿QUIÉN tiene el listener?

  // Si el usuario clicó en el título (h2 dentro de la tarjeta):
  // event.target       → <h2 id="tituloTarjeta">
  // event.currentTarget → <article id="tarjeta">   ← siempre la tarjeta

  console.log("Clicaste en:", target.tagName);
  console.log("El listener está en:", currentTarget.id); // siempre "tarjeta"
});
```

**Analogía:** Imagina que pones una cámara de seguridad (listener) en la puerta de una empresa (tarjeta). `currentTarget` es siempre la puerta donde está la cámara. `target` es la persona concreta que entró: puede ser el CEO, un repartidor o un técnico.

> Practica esto con `targetVsCurrenTarget.html`. Haz click en el título, en el párrafo y en el botón interior. Observa cómo `currentTarget` nunca cambia (siempre es la tarjeta) pero `target` cambia con cada click.

---

### 4.3 Las tres fases de propagación de un evento

Cuando haces click en un elemento, el evento no se queda ahí. Viaja por todo el árbol del DOM en tres fases:

```
                    document
                        ↓  ① CAPTURA (el evento baja)
                      body
                        ↓
                    div#exterior
                        ↓
                   div#medio
                        ↓
                  button#interior   ← ② TARGET (el evento llega al destino)
                        ↑
                   div#medio
                        ↑  ③ BURBUJEO (el evento sube)
                    div#exterior
                        ↑
                      body
```

1. **Captura** (`useCapture = true`): el evento desciende desde `document` hasta el elemento pulsado. Los listeners en captura se ejecutan de fuera hacia dentro.
2. **Target**: el evento llega al elemento donde ocurrió el click. Se ejecutan sus listeners.
3. **Burbujeo** (`useCapture = false`, por defecto): el evento asciende desde el elemento pulsado hasta `document`. Los listeners en burbujeo se ejecutan de dentro hacia fuera.

```js
const cajaExterior = document.getElementById("cajaExterior");
const cajaMedia    = document.getElementById("cajaMedia");
const btnInterior  = document.getElementById("btnInterior");

// CAPTURA (true como tercer argumento): se ejecuta mientras el evento BAJA
cajaExterior.addEventListener("click", () => console.log("Exterior - CAPTURA"), true);
cajaMedia.addEventListener("click",    () => console.log("Media - CAPTURA"),    true);
btnInterior.addEventListener("click",  () => console.log("Interior - TARGET"),  true);

// BURBUJEO (false, el valor por defecto): se ejecuta mientras el evento SUBE
cajaExterior.addEventListener("click", () => console.log("Exterior - BURBUJEO"), false);
cajaMedia.addEventListener("click",    () => console.log("Media - BURBUJEO"),    false);
btnInterior.addEventListener("click",  () => console.log("Interior - TARGET"),   false);

// Al pulsar el botón, el orden de ejecución es:
// 1. Exterior - CAPTURA
// 2. Media - CAPTURA
// 3. Interior - TARGET (captura)
// 4. Interior - TARGET (burbujeo)
// 5. Media - BURBUJEO
// 6. Exterior - BURBUJEO
```

> Extraído de `propagacion.html`. Ejecútalo y pulsa el botón interior para ver el orden exacto en el registro.

---

### 4.4 Detener la propagación: `stopPropagation()`

A veces no quieres que el evento continúe su viaje. `stopPropagation()` lo detiene en el elemento donde se llama.

**Caso de uso típico:** Una tarjeta entera es clicable (la seleccionas), pero dentro tiene un botón de "Editar". Si el usuario pulsa "Editar", no quieres que también se dispare el listener de selección de la tarjeta.

```js
const tarjeta  = document.getElementById("tarjeta");
const btnEditar = document.getElementById("btnEditar");

// Listener de la tarjeta: selecciona/deselecciona
tarjeta.addEventListener("click", function() {
  tarjeta.classList.toggle("seleccionada");
  console.log("Tarjeta toggled");
});

// Listener del botón: edita, y PARA AHÍ el evento
btnEditar.addEventListener("click", function(event) {
  console.log("Botón de editar pulsado");

  // Sin esto, el click seguiría burbujeando y también ejecutaría el listener de la tarjeta
  event.stopPropagation();

  // ... lógica de edición ...
});
```

> Practica esto con `stopPropagation.html`. Cambia entre el modo "con stopPropagation" y "sin stopPropagation" y observa los contadores: sin él, cada click en el botón cuenta tanto para el botón como para la tarjeta.

**Cuándo NO usar stopPropagation:** No lo uses por defecto para "limpiar" el código. Detener la propagación puede romper otras funcionalidades que dependen de eventos en ancestros. La delegación de eventos (siguiente sección) es casi siempre la solución correcta.

---

### 4.5 Delegación de eventos

**La técnica más importante de este módulo.**

En lugar de poner un listener en cada botón individual, pones un único listener en el elemento padre, y desde ahí gestionas todos los hijos usando `event.target`.

**¿Por qué es mejor?**
- Si añades elementos dinámicamente (con `createElement`), **no necesitas añadirles listeners** porque el padre ya los cubre.
- Con 100 tareas, tienes 1 listener en lugar de 100.
- El código es más fácil de mantener.

```js
const listaTareas = document.getElementById("listaTareas");

// Un único listener en el <ul> para gestionar TODOS los botones de TODAS las tareas
listaTareas.addEventListener("click", function(event) {
  const botonPulsado = event.target; // ¿qué elemento generó el click?

  // Ignorar clicks que no sean en un botón de acción
  if (!botonPulsado.matches("button[data-accion]")) {
    return;
  }

  // Leer qué acción hay que ejecutar
  const accion = botonPulsado.getAttribute("data-accion"); // "completar" o "eliminar"

  // Subir hasta la tarea que contiene ese botón
  const tarea = botonPulsado.closest(".tarea");
  const textoTarea = tarea.querySelector(".texto-tarea");

  if (accion === "completar") {
    tarea.classList.toggle("completada");
  }

  if (accion === "eliminar") {
    listaTareas.removeChild(tarea);
  }
});
```

> Extraído de `tareas.html`. Observa que las tareas creadas dinámicamente con `crearTarea()` y `appendChild()` NO necesitan que se les añada ningún listener. El listener del `<ul>` las cubre automáticamente desde el momento en que se insertan en el DOM.

**Esquema mental de la delegación:**

```
<ul id="listaTareas">  ← LISTENER ÚNICO AQUÍ
  <li class="tarea">   ← creada al inicio o dinámicamente, sin listener propio
    <span>Preparar práctica</span>
    <button data-accion="completar">Completar</button>  ← el click burbujea hasta el ul
    <button data-accion="eliminar">Eliminar</button>
  </li>
  <li class="tarea">   ← añadida dinámicamente, tampoco necesita listener
    ...
  </li>
</ul>
```

---

### 4.6 Identificar acciones con `data-action`

En la delegación de eventos, necesitas saber qué tipo de botón fue pulsado. El patrón más limpio es usar un atributo `data-action` en cada botón:

```html
<!-- Cada botón declara qué acción representa -->
<button data-action="completar" class="btn-completar">Completar</button>
<button data-action="eliminar" class="btn-eliminar">Eliminar</button>
<button data-action="plus" class="btn-qty">+</button>
<button data-action="minus" class="btn-qty">-</button>
```

```js
contenedor.addEventListener("click", function(e) {
  // Acceder al atributo data-action del elemento clicado
  const accion = e.target.getAttribute("data-action");
  // o usando dataset:
  const accion2 = e.target.dataset.action; // equivalente, más moderno

  switch (accion) {
    case "plus":      modificarCantidad(fila, +1); break;
    case "minus":     modificarCantidad(fila, -1); break;
    case "eliminar":  eliminarFila(fila);           break;
  }
});
```

> Este patrón aparece en `ejercicoUsoCompletoDOM.html` y `ejercicio-tienda.html`. El carrito usa `data-action="plus"` y `data-action="minus"` para distinguir los dos botones de cantidad dentro de la misma fila.

---

### Ejemplo de uso completo — Módulo 4

> Tienda online completa — patrón extraído de `ejercicoUsoCompletoDOM.html`

Este ejercicio integra todos los conceptos del módulo de eventos en una aplicación real:

```js
const tienda  = document.getElementById('bloqueTienda');
const carrito = document.getElementById('bloqueCarrito');

/* -------------------------------------------
   LISTENER DE TIENDA
   - Delegación: un listener para toda la tienda
   - Captura target + closest para identificar producto
   - data-action para distinguir "seleccionar" de "añadir"
   ------------------------------------------- */
tienda.addEventListener('click', function(e) {
  // Subir hasta la tarjeta de producto más cercana al elemento clicado
  const tarjeta = e.target.closest('.producto');
  if (!tarjeta) return; // click fuera de una tarjeta → ignorar

  if (e.target.dataset.action === "add") {
    // El usuario pulsó el botón "Añadir al carrito"
    const nombre = tarjeta.getAttribute('data-nombre');
    const precio = parseFloat(tarjeta.getAttribute('data-precio'));
    agregarOActualizarCarrito(nombre, precio);
  } else {
    // El usuario clicó en la tarjeta (no en el botón): resaltar
    document.querySelectorAll('.producto').forEach(p => p.classList.remove('resaltado'));
    tarjeta.classList.add('resaltado');
  }
});

/* -------------------------------------------
   LISTENER DE CARRITO
   - Delegación: un listener para todas las filas
   - Navegación jerárquica para modificar cantidad
   - Eliminación automática cuando cantidad llega a 0
   ------------------------------------------- */
carrito.addEventListener('click', function(e) {
  const fila = e.target.closest('.fila-carrito');
  if (!fila) return;

  if (e.target.dataset.action === "plus") {
    modificarCantidad(fila, +1);
  } else if (e.target.dataset.action === "minus") {
    modificarCantidad(fila, -1);
  } else {
    // Click en la fila (no en botón): resaltar
    document.querySelectorAll('.fila-carrito').forEach(f => f.classList.remove('resaltada'));
    fila.classList.add('resaltada');
  }
});

/* -------------------------------------------
   FUNCIÓN DE SOPORTE: navegación para modificar cantidad
   ------------------------------------------- */
function modificarCantidad(fila, cambio) {
  let cant      = parseInt(fila.getAttribute('data-cantidad'));
  const precio  = parseFloat(fila.getAttribute('data-precio-base'));
  cant += cambio;

  if (cant <= 0) {
    fila.parentElement.removeChild(fila); // eliminar si llega a 0
  } else {
    fila.setAttribute('data-cantidad', cant);
    fila.querySelector('.cant-val').textContent = cant;
    fila.querySelector('.subtotal-cart').textContent = (cant * precio) + "€";
  }
  recalcularTotal();
}
```

---

## Guía Rápida de Referencia

### Nodos

```js
nodo.nodeType      // 1=elemento, 3=texto, 8=comentario, 9=document
nodo.nodeName      // "DIV", "P", "#text", "#document"
nodo.nodeValue     // contenido si es texto, null si es elemento
```

### Relaciones entre nodos

```js
nodo.parentNode / parentElement
nodo.firstChild / firstElementChild       // con o sin nodos de texto
nodo.lastChild / lastElementChild
nodo.previousSibling / previousElementSibling
nodo.nextSibling / nextElementSibling
nodo.childNodes   // todos los hijos (incluye texto)
nodo.children     // solo elementos HTML hijos
```

### Selección

```js
document.getElementById("id")
document.querySelector(".clase")          // primero que coincida
document.querySelectorAll(".clase")       // todos
elemento.querySelector(".clase")          // busca dentro del elemento
elemento.closest(".clase")               // sube buscando ancestro
```

### Atributos

```js
elemento.getAttribute("nombre")
elemento.setAttribute("nombre", "valor")
elemento.removeAttribute("nombre")
elemento.dataset.nombre                   // equivale a getAttribute("data-nombre")
```

### Contenido y clases

```js
elemento.textContent = "texto plano"
elemento.innerHTML   = "<strong>html</strong>"
elemento.classList.add("clase")
elemento.classList.remove("clase")
elemento.classList.toggle("clase")
elemento.classList.contains("clase")     // true / false
elemento.disabled = true / false
```

### Crear, insertar, eliminar, reemplazar

```js
document.createElement("div")
padre.appendChild(hijo)
padre.insertBefore(nuevo, referencia)
padre.removeChild(hijo)
padre.replaceChild(nuevo, antiguo)
elemento.remove()                        // el elemento se elimina a sí mismo
```

### Eventos

```js
elemento.addEventListener("click", handler, false)  // burbujeo (por defecto)
elemento.addEventListener("click", handler, true)   // captura

// Dentro del handler:
event.target          // elemento donde ocurrió el click
event.currentTarget   // elemento que tiene el listener
event.stopPropagation()
event.eventPhase      // 1=captura, 2=target, 3=burbujeo
event.target.dataset.action  // leer data-action del elemento clicado
event.target.closest(".selector")        // navegar hacia arriba
event.target.matches("selector")         // comprobar si coincide
```

---

*Generado a partir del análisis completo de los ejercicios de la tercera evaluación: `001-El modelo de objetos del Dom`, `002-Objetos del modelo. Propiedades y metodos`, `003-Acceso al documento desde codigo` y `004-Programacion de evetos`.*
