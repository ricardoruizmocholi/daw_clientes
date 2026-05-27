# Documentación y Testing — JSDoc + Jest

## ¿Qué es?
JSDoc permite documentar funciones JavaScript con comentarios estructurados para generar automáticamente documentación HTML. Jest es el framework de testing que permite verificar que las funciones se comportan correctamente con casos de prueba automatizados.

## Sintaxis esencial

### JSDoc
```js
/**
 * Descripción de la función.
 *
 * @param {number} precioUnitario Precio de una unidad.
 * @param {number} cantidad Número de unidades.
 * @returns {number} Subtotal de la compra.
 *
 * @example
 * calcularSubtotal(10, 3);
 * // Devuelve 30
 */
function calcularSubtotal(precioUnitario, cantidad) {
  return precioUnitario * cantidad;
}
```

### Jest
```js
const Modulo = require('./archivo');

describe('Nombre del grupo de tests', () => {
  test('descripción del comportamiento esperado', () => {
    expect(Modulo.sumar(2, 3)).toBe(5);
  });

  test('lanza error en caso inválido', () => {
    expect(() => Modulo.dividir(8, 0)).toThrow('No se puede dividir entre cero.');
  });
});
```

## Ejemplo básico funcional
```js
// precios.js — función documentada con JSDoc
/**
 * Calcula el IVA sobre un importe base.
 * @param {number} importeBase Importe sobre el que se aplica el IVA.
 * @param {number} porcentajeIVA Porcentaje de IVA (ej: 21).
 * @returns {number} Importe del IVA.
 */
function calcularIVA(importeBase, porcentajeIVA) {
  return importeBase * porcentajeIVA / 100;
}
module.exports = { calcularIVA };

// precios.test.js — test con Jest
const { calcularIVA } = require('./precios');

describe('calcularIVA', () => {
  test('21% sobre 100 devuelve 21', () => {
    expect(calcularIVA(100, 21)).toBe(21);
  });
});
```

## Errores comunes
- Olvidar `module.exports` en el archivo JS → Jest no puede importar las funciones con `require`
- No iniciar con `npm init -y` antes de instalar Jest → falta el `package.json`
- Poner `"test": "jest"` fuera de `"scripts"` en package.json → `npm test` no encuentra el comando
- Usar `toBe` con objetos → `toBe` compara por referencia; usa `toEqual` para comparar objetos por valor

## Para el examen recuerda
- Flujo: `npm init -y` → `npm install --save-dev jest` → `"test": "jest"` en scripts → crear `archivo.test.js` → `npm test`
- `describe` agrupa; `test` / `it` define un caso concreto; `expect` hace la aserción
- `toBe` para primitivos; `toEqual` para objetos y arrays; `toThrow` para errores
- Para generar docs: `npm install --save-dev jsdoc` → `npx jsdoc archivo.js -d docs/`
- `@param {tipo} nombre Descripción` · `@returns {tipo} Descripción` · `@example` son las etiquetas más importantes

---

## Tests unitarios vs. tests de integración

Ambos usan la misma sintaxis de Jest; la diferencia está en **qué se testa**:

| | Unitario | Integración |
|---|---|---|
| Alcance | Una sola función | Varias funciones encadenadas |
| `beforeEach` | Opcional | Casi siempre (para resetear estado) |
| Matcher típico | `toBe` | `toEqual`, `toHaveLength`, `toBeCloseTo` |
| Ejercicio | 04, parte testing de 07 y 08 | 09 y 10 |

```js
// TEST UNITARIO — prueba calcularIva de forma aislada
test("21% sobre 100 → 21", () => {
  expect(calcularIva(100, 21)).toBe(21);
});

// TEST DE INTEGRACIÓN — prueba el pipeline crearProducto → agregarAlCarrito → calcularSubtotal
describe("Integración carrito", () => {
  let carrito;
  beforeEach(() => { carrito = []; });   // resetear estado entre tests

  test("añadir y calcular", () => {
    const prod = crearProducto("Teclado", 50, 10);
    agregarAlCarrito(carrito, prod, 2);              // usa la salida de crearProducto
    expect(calcularSubtotal(carrito)).toBe(100);     // usa el carrito mutado
  });
});
```

## JSDoc con @typedef — para funciones que devuelven objetos

```js
/**
 * @typedef  {Object} ResumenTiempos
 * @property {number} tiempoEstimado    Horas estimadas según la prioridad.
 * @property {number} coste             Coste total (horas × tarifa).
 * @property {string} descripcionTiempo Tiempo formateado como texto.
 */

/**
 * Calcula el resumen completo de tiempos y costes.
 * @param {string} prioridad   Prioridad de la incidencia.
 * @param {number} tarifaHora  Tarifa por hora (>= 0).
 * @returns {ResumenTiempos}
 * @throws {Error} Si tarifaHora es negativa.
 */
function calcularResumenTiempos(prioridad, tarifaHora) { ... }
```

**Ejercicios relacionados:** [04 — Testing unitario](../ejercicios-simulacion/04-testing-jest/) · [09 — Integración carrito](../ejercicios-simulacion/09-testing-integracion-carrito/) · [10 — Integración pedidos](../ejercicios-simulacion/10-testing-integracion-pedidos/) · [07 JSDoc](../ejercicios-simulacion/07-simulacro-hotel/) · [08 JSDoc](../ejercicios-simulacion/08-simulacro-incidencias/)
