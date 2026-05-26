# 3ª Evaluación — Índice de READMEs y Checklist Examen

## Índice de Temas

| # | Carpeta | Tema |
|---|---------|------|
| 001 | [El Modelo de Objetos del DOM](001-El%20modelo%20de%20objeros%20del%20Dom/README.md) | Árbol DOM, nodeType, childNodes vs children |
| 002 | [Objetos del Modelo — Propiedades y Métodos](002-Objetos%20del%20modelo.%20Propiedades%20y%20metodos/README.md) | innerHTML, textContent, navegación relacional |
| 003 | [Acceso al Documento desde Código](003-Acceso%20al%20documento%20desde%20codigo/README.md) | createElement, appendChild, removeChild, dataset |
| 004 | [Programación de Eventos](004-Programacion%20de%20evetos/README.md) | Delegación, closest(), data-*, classList |
| 005 | [Documentación y Testing — Visión general](005-documentacion%20y%20testing/README.md) | JSDoc + Jest resumen ejecutivo |
| 005a | [JSDoc — Documentación](005-documentacion%20y%20testing/documentacion/README.md) | @param, @returns, @example, @typedef, npx jsdoc |
| 005b | [Funciones Puras con JSDoc](005-documentacion%20y%20testing/documentacion/js/README.md) | precios.js, module.exports, funciones puras |
| 005c | [Testing con Jest — Guía](005-documentacion%20y%20testing/testing/README.md) | describe, test, expect, toBe, toEqual, toThrow |
| 005d | [Calculadora con Testing](005-documentacion%20y%20testing/testing/calculadora_con_testing/README.md) | Tests de operaciones matemáticas y validaciones |
| 005e | [Formulario con Testing](005-documentacion%20y%20testing/testing/formularionConTesting/README.md) | Validación registro, patrón error-string |

> El `README.md` de la raíz contiene el temario completo con ejemplos de todos los ejercicios.

---

## CHECKLIST EXAMEN FINAL

- [ ] **1. Clases JS** — campos privados `#campo`, getters/setters, constructor
- [ ] **2. Manipulación del DOM** — `createElement`, `appendChild`, `querySelector`, `dataset`
- [ ] **3. Delegación de eventos** — listener en el padre, `closest()`, `dataset.accion`
- [ ] **4. Eventos de formulario** — `submit`, `preventDefault`, `reset`, `focus`
- [ ] **5. Atributos `data-*`** — `data-estado`, `data-id` en HTML → `dataset.estado` en JS
- [ ] **6. Gestión de clases CSS** — `classList.add/remove/toggle/contains`
- [ ] **7. Testing con Jest** — `describe`, `it/test`, `expect`, `toBe`, `toEqual`, `beforeEach`
- [ ] **8. JSDoc con Node.js** — `@param`, `@returns`, `@typedef`, `@example` + `npx jsdoc`

### Repaso rápido punto por punto

**1 — Clases con campos privados**
```js
class Producto {
  #precio;
  constructor(nombre, precio) {
    this.nombre = nombre;
    this.#precio = precio;
  }
  get precio() { return this.#precio; }
  set precio(v) { if (v >= 0) this.#precio = v; }
}
const p = new Producto('Ratón', 45);
console.log(p.precio); // 45
```

**2 — Manipulación del DOM**
```js
const li = document.createElement('li');
li.textContent = 'Nueva tarea';
li.dataset.id = '5';                       // data-id="5"
document.querySelector('#lista').appendChild(li);
```

**3 — Delegación de eventos**
```js
contenedor.addEventListener('click', function(e) {
  const tarjeta = e.target.closest('.producto');
  if (!tarjeta) return;
  const accion = e.target.dataset.action;  // data-action="add"
  const nombre = tarjeta.dataset.nombre;   // data-nombre="Ratón"
});
```

**4 — Eventos de formulario**
```js
formulario.addEventListener('submit', function(e) {
  e.preventDefault();                      // evita recarga de página
  // validar y procesar...
  formulario.reset();                      // limpia todos los campos
});
campo.addEventListener('focus', () => campo.classList.remove('error'));
```

**5 — Atributos data-***
```html
<article data-id="1" data-estado="pendiente"></article>
```
```js
const id = elemento.dataset.id;            // "1"
elemento.dataset.estado = 'completado';    // actualiza data-estado
```

**6 — classList**
```js
elem.classList.add('activo');
elem.classList.remove('activo');
elem.classList.toggle('activo');           // añade si no está, quita si está
const estaActivo = elem.classList.contains('activo'); // true/false
```

**7 — Jest**
```js
describe('grupo', () => {
  beforeEach(() => { /* reset de estado */ });
  test('caso básico', () => {
    expect(sumar(2, 3)).toBe(5);
  });
  test('error esperado', () => {
    expect(() => dividir(8, 0)).toThrow('No se puede dividir entre cero.');
  });
});
```

**8 — JSDoc**
```js
/**
 * Suma dos números.
 * @param {number} a Primer sumando.
 * @param {number} b Segundo sumando.
 * @returns {number} Resultado de la suma.
 * @example sumar(2, 3); // 5
 */
function sumar(a, b) { return a + b; }
// npx jsdoc archivo.js -d docs/
```

---

## FLUJO TESTING + JSDOC

1. `npm init -y`
2. `npm install --save-dev jest`
3. En `package.json` → `"scripts": { "test": "jest" }`
4. Crear `suma.test.js`:
   ```js
   const { sumar } = require('./suma');
   test('2 + 3 = 5', () => expect(sumar(2, 3)).toBe(5));
   ```
5. `npm test`
6. `npm install --save-dev jsdoc`
7. Añadir JSDoc a las funciones con `@param` y `@returns`
8. `npx jsdoc archivo.js -d docs/`
9. Abrir `docs/index.html` en el navegador
