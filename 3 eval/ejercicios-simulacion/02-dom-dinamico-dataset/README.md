# 02 — DOM Dinámico y dataset

## En qué consiste
Generar tarjetas HTML de empleados a partir de un array de datos usando `createElement`, guardar los datos en atributos `data-*` y aplicar estilos dinámicos con `classList`.

---

## Sintaxis utilizada

### Crear un elemento y configurarlo
```js
// 1. Crear el nodo (aún no está en la página)
const article = document.createElement("article");

// 2. Añadir clases CSS
article.classList.add("tarjeta");
article.classList.add("tarjeta-activo");   // segunda clase independiente

// 3. Guardar datos en data-* (accesibles después desde JS)
article.dataset.id         = empleado.id;       // → data-id="1"
article.dataset.nombre     = empleado.nombre;   // → data-nombre="Ana"
article.dataset.departamento = empleado.depto;  // → data-departamento="IT"

// 4. Añadir texto a un nodo hijo
const h3 = document.createElement("h3");
h3.textContent = empleado.nombre;  // textContent es seguro (no interpreta HTML)
article.appendChild(h3);

// 5. Insertar en la página
document.getElementById("listaEmpleados").appendChild(article);
```

### Iterar un array y crear un nodo por elemento
```js
const empleados = [
  { id: 1, nombre: "Ana", depto: "IT" },
  { id: 2, nombre: "Luis", depto: "RRHH" }
];

empleados.forEach(function(emp) {
  const tarjeta = crearTarjeta(emp);   // función que devuelve el article
  lista.appendChild(tarjeta);
});
```

### Leer datos guardados con dataset
```js
// En el evento click, recuperar lo que guardamos antes
const tarjeta = document.querySelector(".tarjeta");
console.log(tarjeta.dataset.nombre);      // "Ana"
console.log(tarjeta.dataset.id);          // "1"  ← siempre string, convertir si hace falta
const id = Number(tarjeta.dataset.id);    // → 1  (número)
```

### classList — gestionar clases dinámicamente
```js
tarjeta.classList.add("resaltada");       // añade clase
tarjeta.classList.remove("resaltada");    // quita clase
tarjeta.classList.toggle("resaltada");    // añade si no está, quita si está
tarjeta.classList.contains("resaltada"); // true / false

// Quitar todas las de un tipo antes de poner la nueva:
tarjeta.classList.remove("estado-activo", "estado-inactivo", "estado-baja");
tarjeta.classList.add(`estado-${empleado.estado}`);  // clase dinámica con template literal
```

### Montar una tarjeta completa paso a paso
```js
function crearTarjeta(emp) {
  const article = document.createElement("article");
  article.classList.add("tarjeta", `depto-${emp.depto.toLowerCase()}`);
  article.dataset.id     = emp.id;
  article.dataset.nombre = emp.nombre;
  article.dataset.estado = emp.estado;

  const titulo = document.createElement("h3");
  titulo.textContent = emp.nombre;

  const info = document.createElement("p");
  info.textContent = `Departamento: ${emp.depto}`;

  article.appendChild(titulo);
  article.appendChild(info);
  return article;   // devuelve el nodo, el caller lo inserta donde quiera
}
```

---

## Conceptos clave aplicados

| Patrón | Para qué sirve |
|--------|---------------|
| `createElement` | Crea un nodo nuevo en memoria (sin insertarlo aún) |
| `appendChild` | Inserta el nodo al final del contenedor |
| `dataset.x = valor` | Guarda datos en `data-x` para leerlos después en eventos |
| `textContent` | Escribe texto plano, sin riesgo de inyección HTML |
| `classList.add/remove` | Cambia el aspecto visual sin tocar el CSS directamente |
| Template literal `` `clase-${var}` `` | Construye nombres de clase dinámicos |
| `forEach` sobre array | Crea un nodo por cada elemento del array de datos |

---

## Flujo de datos en este ejercicio

```
Array de datos
      ↓  forEach
crearTarjeta(emp)
  → createElement("article")
  → article.dataset.campo = valor   ← guardar para después
  → createElement("h3"), etc.
  → article.appendChild(h3)
  → return article
      ↓  lista.appendChild(tarjeta)
Página actualizada
```
