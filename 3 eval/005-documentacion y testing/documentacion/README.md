# JSDoc — Documentación de Funciones JavaScript

## ¿Qué es?
JSDoc es un sistema de comentarios estructurados que describe el contrato de cada función (parámetros, retorno, ejemplos) y permite generar documentación HTML navegable con el comando `npx jsdoc`.

## Sintaxis esencial
```js
/**
 * Breve descripción de lo que hace la función.
 *
 * @param {tipo}   nombreParam  Descripción del parámetro.
 * @returns {tipo} Descripción del valor devuelto.
 *
 * @example
 * nombreFuncion(arg1, arg2);
 * // Resultado esperado
 */

// Tipos habituales: {number} {string} {boolean} {Array} {Object}

// @typedef para documentar un objeto personalizado
/**
 * @typedef {Object} ResultadoCompra
 * @property {number} subtotal   Importe sin descuento ni IVA.
 * @property {number} descuento  Importe descontado.
 * @property {number} total      Importe final.
 */
```

## Ejemplo básico funcional
```js
/**
 * Calcula el subtotal de una compra.
 *
 * @param {number} precioUnitario Precio de una unidad del producto.
 * @param {number} cantidad Número de unidades compradas.
 * @returns {number} Subtotal de la compra.
 *
 * @example
 * calcularSubtotal(10, 3);
 * // Devuelve 30
 */
function calcularSubtotal(precioUnitario, cantidad) {
  return precioUnitario * cantidad;
}

// Generar documentación:
// npx jsdoc precios.js -d docs/
// Abrir docs/index.html en el navegador
```

## Errores comunes
- Usar `//` en lugar de `/** ... */` → JSDoc solo reconoce bloques que empiezan con `/**`
- Olvidar el tipo entre llaves `{number}` → la documentación generada queda incompleta
- No añadir `@example` → los ejemplos son la parte más útil para quien lee la doc

## Para el examen recuerda
- El bloque JSDoc va **justo encima** de la función, sin líneas en blanco entre ellos
- Etiquetas clave: `@param`, `@returns`, `@example`, `@typedef`, `@property`
- Para generar HTML: `npx jsdoc archivo.js -d docs/` → abre `docs/index.html`
- `@param {number} precio` → tipo entre llaves, nombre sin símbolo
