¡Oído cocina! Reseteamos por completo. Nada de malentendidos ni formatos raros. Vamos a hacerlo exactamente como me pides: 

Primero te voy a dar la **explicación teórica súper completa** de cada concepto y tipo de evento. Como me has dicho que pare si no cabe, voy a ponerte aquí todas las explicaciones al detalle y, para no saturar la respuesta ni cortar el código por la mitad, **me detendré justo antes de empezar con los bloques de código**. En cuanto me des el visto bueno, te suelto toda la parte de código en la siguiente respuesta.

---

## PARTE 1: EXPLICACIONES TEÓRICAS COMPLETAS

### 1. Tipos de Asociación de Eventos
Es la forma en la que le decimos al navegador: *"Oye, cuando pase X cosa en este elemento HTML, ejecuta este trozo de código JavaScript"*. Existen tres métodos históricos para hacerlo:

* **Asociación en línea (Atributos HTML):** Consiste en meter el código JS directamente dentro de la etiqueta HTML usando atributos como `onclick`, `onmouseover`, etc. Es una mala práctica porque mezcla el diseño (HTML) con la lógica (JS), haciendo que el código sea difícil de mantener.
* **Asociación por propiedad del DOM:** Se busca el elemento en JavaScript y se le asigna una función a su propiedad de evento (ejemplo: `miBoton.onclick = function() {...}`). El gran problema de este método es que **solo puedes asociar una única función por evento**. Si más adelante en el código asignas otra función al mismo `onclick`, la primera se borrará.
* **Asociación mediante Escuchadores (`addEventListener`):** Es el estándar moderno y la mejor práctica. Permite añadir tantos escuchadores como quieras a un mismo evento en el mismo elemento sin que se pisen entre ellos. Además, permite un tercer parámetro para controlar fases avanzadas como el "Bubbling" (Burbujeo) y "Capturing" (Captura).



---

### 2. `removeEventListener` (Eliminar escuchadores)
Es el método que se utiliza para "apagar" o dejar de escuchar un evento que previamente habíamos activado con `addEventListener`. Es vital para optimizar la memoria de la web o para desactivar mecánicas (como pausar un juego).

* **La regla de oro de la memoria:** Para que `removeEventListener` funcione, **tienes que pasarle exactamente la misma función con nombre** que usaste al crearlo. 
* Si al crear el evento usaste una función anónima o de flecha directamente (`() => { ... }`), JavaScript crea un espacio nuevo en la memoria para esa función. Como no tiene nombre ni referencia guardada, luego es **imposible** que `removeEventListener` sepa cuál quieres borrar.

---

### 3. Eventos de Teclado (`KeyboardEvent`)
Capturan cualquier interacción física que el usuario haga sobre el teclado. No se aplican a elementos concretos a menos que estén enfocados (como un input), por lo que casi siempre se escuchan de forma global en el objeto `document`.

* **`keydown`:** Se dispara en el milisegundo en el que el usuario aprieta una tecla hacia abajo. Si dejas la tecla pulsada, el evento se repetirá continuamente como una ráfaga. Es el mejor para videojuegos (moverse con flechas).
* **`keyup`:** Se dispara únicamente cuando el usuario suelta la tecla y esta vuelve a su posición original. Solo ocurre una vez por pulsación. Es el mejor para validar formularios mientras el usuario escribe, porque te aseguras de que el carácter ya se ha escrito.
* **Propiedades clave que viajan en el evento (`e`):**
    * `e.key`: El carácter resultante (ej: `"a"`, `"A"`, `"Enter"`).
    * `e.code`: La posición física de la tecla (ej: `"KeyA"`, `"Numpad1"`). No cambia aunque cambies el idioma del teclado.
    * `e.ctrlKey`, `e.shiftKey`, `e.altKey`: Devuelven `true` o `false` si esas teclas especiales estaban pulsadas al mismo tiempo.

---

### 4. Eventos de Formulario
Se aplican sobre la etiqueta `<form>` o sobre sus elementos internos como `<input>`, `<select>` y `<textarea>`. Son el núcleo de la validación de datos.

* **`submit`:** Se dispara cuando el usuario intenta enviar el formulario (haciendo click en el botón de enviar o pulsando Enter). **¡Cuidado!** Este evento siempre se debe escuchar en la etiqueta `<form>`, no en el botón. Casi siempre requiere usar `e.preventDefault()` para evitar que la página se refresque.
* **`reset`:** Se dispara cuando el formulario vuelve a sus valores por defecto (al pulsar un botón tipo reset).
* **`input`:** Se dispara de forma inmediata cada vez que el valor de un campo cambia. Si escribes una letra, se dispara; si borras una letra, se dispara. Es perfecto para contar caracteres o hacer búsquedas en tiempo real.
* **`change`:** También se dispara cuando el valor de un campo cambia, pero con una diferencia: no lo hace al instante, sino cuando el usuario termina de escribir y "sale" del campo (hace click fuera o pulsa Tabulador).
* **`focus` / `blur`:** `focus` ocurre cuando el usuario entra a rellenar un campo (el cursor empieza a parpadear dentro). `blur` ocurre cuando el usuario sale de él. Muy útiles para pintar los bordes de color rojo o verde.

---

### 5. Eventos de Portapapeles
Te permiten controlar lo que entra y sale de la memoria temporal del sistema operativo del usuario.

* **`copy`:** Se dispara cuando el usuario copia texto (con `Ctrl+C` o botón derecho).
* **`cut`:** Se dispara cuando el usuario corta texto.
* **`paste`:** Se dispara cuando el usuario intenta pegar texto en un campo.
* **Control de datos:** A través del objeto de evento (`e.clipboardData`), JavaScript puede leer qué texto se está intentando pegar (`getData`) o modificar el texto que el usuario se lleva copiado (`setData`).

---

### 6. Eventos de Ratón (`MouseEvent`)
Controlan el puntero en la pantalla. Son los más interactivos.

* **`click`:** Se dispara al pulsar y soltar el botón izquierdo del ratón sobre un elemento.
* **`dblclick`:** Doble click rápido.
* **`mousedown`:** Se dispara en cuanto el botón del ratón baja (antes de soltarlo).
* **`mouseup`:** Se dispara en cuanto el botón del ratón sube (se suelta).
* **`mousemove`:** Se dispara miles de veces por segundo mientras el ratón se esté moviendo sobre el elemento.
* **`mouseenter` / `mouseleave`:** Ocurren cuando el puntero entra o sale de los límites visuales de un elemento. No "burbujean" (no afectan a los elementos hijos).

---

### 7. Eventos de Navegador y Páginas
Tienen que ver con el estado global de la ventana (`window`) y la carga del documento.

* **`DOMContentLoaded`:** Se dispara cuando el navegador ha terminado de leer el HTML y ha creado el árbol de nodos (DOM). No espera a que carguen imágenes pesadas ni estilos. Es el evento ideal para arrancar tus scripts de JS de forma segura. Se escucha en `document`.
* **`load`:** Se dispara cuando la página está **completamente** cargada, incluyendo imágenes, frames y estilos CSS. Es más lento que el anterior. Se escucha en `window`.
* **`resize`:** Se dispara cada vez que el usuario cambia el tamaño de la ventana del navegador. Vital para hacer diseños responsivos mediante código. Se escucha en `window`.
* **`beforeunload`:** Se dispara justo antes de que el usuario cierre la pestaña del navegador o recargue la página. Se usa para mostrar el típico mensaje de *"¿Estás seguro de que quieres salir? Los cambios no se guardarán"*. Se escucha en `window`.

---

Como me has pedido que pare si no cabe para no saturar, **aquí me detengo**. 

He cubierto la explicación completa y profunda de cada uno de los puntos que me pediste. ¿Te parece bien cómo ha quedado explicado? Si me das el "ok", en la siguiente respuesta te pongo única y exclusivamente el bloque de código con los ejemplos prácticos de todo esto.

🔗 1. Tipos de Asociación de Eventos

```

// A. EN LÍNEA (HTML) -> No recomendada
// HTML: <button onclick="saludar('Pepe')">Click</button>
function saludar(nombre) {
    alert("Hola " + nombre);
}

// B. POR PROPIEDAD DEL DOM -> Regular (se pisan entre sí)
const btnPropiedad = document.querySelector('#btn-prop');
btnPropiedad.onclick = function() {
    console.log("Primera función ejecutada.");
};
btnPropiedad.onclick = function() {
    console.log("Segunda función. ¡He pisado a la primera!");
};

// C. MEDIANTE addEventListener -> La mejor opción
const btnEscuchador = document.querySelector('#btn-esc');

function accionUno() { console.log("Acción 1 ejecutada."); }
function accionDos() { console.log("Acción 2 ejecutada."); }

// Podemos añadir tantas como queramos al mismo evento
btnEscuchador.addEventListener('click', accionUno);
btnEscuchador.addEventListener('click', accionDos);
```
🗑️ 2. removeEventListener
```
const btnOnOff = document.querySelector('#btn-on-off');

// 1. La función DEBE tener nombre para poder borrarla
function clickHandler() {
    console.log("Haciendo click...");
}

// 2. Añadimos el evento
btnOnOff.addEventListener('click', clickHandler);

// 3. Cuando queramos apagarlo (por ejemplo, tras pulsar otro botón)
const btnDesactivar = document.querySelector('#btn-desactivar');
btnDesactivar.addEventListener('click', () => {
    // Para borrarlo, pasamos exactamente el mismo tipo y la misma función
    btnOnOff.removeEventListener('click', clickHandler);
    console.log("Evento de click desactivado con éxito.");
});
```

Evento Teclado
```
// Se suelen escuchar en el documento global
document.addEventListener('keydown', (e) => {
    console.log(`--- Tecla Pulsada (keydown) ---`);
    console.log(`Carácter visual: ${e.key}`); // Ej: "a", "A", "Enter"
    console.log(`Posición física: ${e.code}`); // Ej: "KeyA", "Numpad1"
    
    // Detectar combinaciones (Truco de examen)
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault(); // Evitamos que el navegador intente guardar la web
        console.log("¡Combinación Ctrl + S detectada! Guardando partida...");
    }
});

document.addEventListener('keyup', (e) => {
    console.log(`Has soltado la tecla: ${e.key}`);
});
```

4. Eventos de Formulario
```
const miForm = document.querySelector('#formulario');
const inputUser = document.querySelector('#username');

// SUBMIT: Se escucha en el <form>, no en el botón
miForm.addEventListener('submit', (e) => {
    // ⚠️ IMPRESCINDIBLE PARA EL EXAMEN: frena la recarga de la página
    e.preventDefault(); 
    
    console.log("Formulario interceptado. Validando datos...");
});

// INPUT: Se dispara letra a letra (ideal para validar longitud)
inputUser.addEventListener('input', (e) => {
    console.log(`Valor actual en tiempo real: ${e.target.value}`);
    if (e.target.value.length < 3) {
        inputUser.style.borderColor = "red";
    } else {
        inputUser.style.borderColor = "green";
    }
});

// CHANGE: Solo se dispara al salir del campo tras haber modificado algo
inputUser.addEventListener('change', (e) => {
    console.log(`Has terminado de escribir y has salido. Valor final: ${e.target.value}`);
});

// FOCUS y BLUR: Estilos visuales
inputUser.addEventListener('focus', () => {
    console.log("El usuario está rellenando el campo.");
});
inputUser.addEventListener('blur', () => {
    console.log("El usuario ha salido del campo.");
});

```
📋 5. Eventos de Portapapeles
```
const areaTexto = document.querySelector('#mi-texto');

// COPY: Modificar lo que el usuario se lleva
areaTexto.addEventListener('copy', (e) => {
    e.preventDefault(); // Bloqueamos la copia nativa
    
    // Le metemos un texto falso en el portapapeles
    e.clipboardData.setData('text/plain', 'Contenido protegido por copyright ©');
    alert("¡Se ha copiado un texto diferente al seleccionado!");
});

// PASTE: Validar lo que el usuario intenta meter
areaTexto.addEventListener('paste', (e) => {
    // Leemos lo que hay en el portapapeles del sistema
    let textoPegado = e.clipboardData.getData('text');
    
    if (textoPegado.includes("palabrota")) {
        e.preventDefault(); // Bloqueamos el pegado
        alert("No se permiten palabras malsonantes en este campo.");
    }
});

```

🖱️ 6. Eventos de Ratón

```
const caja = document.querySelector('#mi-caja');

// MOUSEMOVE: Seguimiento de coordenadas
caja.addEventListener('mousemove', (e) => {
    // clientX y clientY dan la posición respecto a la ventana del navegador
    console.log(`Ratón en X: ${e.clientX}, Y: ${e.clientY}`);
});

// MOUSEDOWN y MOUSEUP: El click dividido en dos partes
caja.addEventListener('mousedown', () => {
    caja.style.backgroundColor = "blue";
});

caja.addEventListener('mouseup', () => {
    caja.style.backgroundColor = "white";
});

// ENTER y LEAVE: Hover manual
caja.addEventListener('mouseenter', () => {
    console.log("El ratón ha entrado en la caja.");
});
caja.addEventListener('mouseleave', () => {
    console.log("El ratón ha salido de la caja.");
});

```
🌐 7. Eventos de Navegador y Páginas
```
// DOMContentLoaded: Se ejecuta en el document
document.addEventListener('DOMContentLoaded', () => {
    console.log("El HTML ya es accesible. ¡Arrancamos la lógica de la web!");
});

// LOAD: Se ejecuta en el window (espera a imágenes pesadas)
window.addEventListener('load', () => {
    console.log("Toda la página, imágenes y estilos cargados al 100%.");
});

// RESIZE: Detectar cambios de tamaño
window.addEventListener('resize', () => {
    console.log(`La ventana ahora mide: ${window.innerWidth}px de ancho.`);
});

// BEFOREUNLOAD: Bloquear la salida del usuario
window.addEventListener('beforeunload', (e) => {
    // Para que el navegador muestre el aviso nativo, se suele requerir:
    e.preventDefault();
    e.returnValue = ''; // Necesario en navegadores modernos como Chrome
});
```