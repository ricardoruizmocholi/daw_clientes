# 04 — Testing Unitario con Jest

## En qué consiste
Escribir tests unitarios con Jest para cinco funciones puras: `calcularIva`, `calcularDescuento`, `formatearPrecio`, `validarCantidad` y `calcularTotal`. Cada función se testa de forma independiente, cubriendo casos válidos, límite y errores.

---

## Pasos para ejecutar los tests

```bash
cd 04-testing-jest
npm install          # instala Jest (definido en package.json)
npm test             # ejecuta todos los archivos *.test.js
```

---

## Sintaxis utilizada

### Importar funciones con require
```js
// Al principio del archivo .test.js
const {
  calcularIva,
  calcularDescuento,
  calcularTotal
} = require("./funciones");   // ruta relativa al archivo con las funciones
```

### Estructura básica de un test
```js
describe("calcularIva", () => {      // agrupa los tests de una función
  test("21% sobre 100 → 21", () => { // describe el comportamiento esperado
    expect(calcularIva(100, 21)).toBe(21);  // afirmación
  });
});
```

### Los matchers más importantes

```js
// toBe — igualdad estricta (===). Para números, strings, booleanos
expect(resultado).toBe(42);
expect(esValido).toBe(true);

// toEqual — comparación profunda. Para objetos y arrays
expect(objeto).toEqual({ nombre: "Ana", precio: 10 });
expect(array).toEqual([1, 2, 3]);

// toBeCloseTo — para decimales con posible imprecisión de punto flotante
expect(calcularIva(100, 21)).toBeCloseTo(21, 2);  // 2 decimales de precisión

// toThrow — verifica que la función lanza un error
expect(() => calcularTotal(-5)).toThrow();                   // lanza cualquier error
expect(() => calcularTotal(-5)).toThrow("cantidad inválida"); // mensaje concreto
```

### Testear errores — la función va dentro de una arrow function
```js
// ❌ MAL: calcularTotal se evalúa ANTES de llegar a expect
expect(calcularTotal(-1)).toThrow("...");

// ✅ BIEN: la arrow function () => retrasa la ejecución
expect(() => calcularTotal(-1)).toThrow("La cantidad no puede ser negativa.");
```

### beforeEach — resetear estado compartido
```js
describe("calcularTotal", () => {
  let carrito;

  beforeEach(() => {
    carrito = [];  // resetea el array antes de cada test
  });

  test("carrito vacío → 0", () => {
    expect(calcularTotal(carrito)).toBe(0);
  });

  test("con un artículo → precio correcto", () => {
    carrito.push({ precio: 10, cantidad: 2 });
    expect(calcularTotal(carrito)).toBe(20);
  });
});
```

### module.exports en funciones.js — para que require() funcione
```js
// Al final de funciones.js
module.exports = {
  calcularIva,
  calcularDescuento,
  formatearPrecio,
  validarCantidad,
  calcularTotal
};
```

---

## Conceptos clave aplicados

| Patrón | Para qué sirve |
|--------|---------------|
| `describe(nombre, fn)` | Agrupa los tests de una misma función o contexto |
| `test(descripción, fn)` | Define un caso concreto a verificar |
| `expect(valor)` | Envuelve el resultado para encadenar un matcher |
| `toBe` | Igualdad estricta para primitivos |
| `toEqual` | Comparación estructural para objetos/arrays |
| `toBeCloseTo(n, decimales)` | Evita fallos por imprecisión decimal (`0.1 + 0.2 ≠ 0.3`) |
| `toThrow("mensaje")` | Verifica que se lanza un `Error` con ese mensaje |
| `() => funcion()` en toThrow | La flecha retrasa la ejecución para que Jest la controle |
| `beforeEach` | Código que se ejecuta antes de cada test del bloque |

---

## Qué es un test unitario

Un test **unitario** prueba **una sola función de forma aislada**, sin depender de otras funciones ni de un estado externo. Si la función recibe los mismos argumentos, siempre devuelve el mismo resultado.

```
entrada → [función] → salida esperada
```

Contrasta con el **test de integración** (ejercicios 09 y 10), donde se testea cómo varias funciones trabajan juntas en un pipeline.
