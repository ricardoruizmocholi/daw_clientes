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
