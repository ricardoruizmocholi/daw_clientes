# Funciones Puras con JSDoc — Cálculo de Precios

## ¿Qué es?
Una función pura recibe datos, calcula un resultado y lo devuelve sin modificar el DOM ni variables externas. Son ideales para documentar con JSDoc y testear con Jest porque su comportamiento es predecible.

## Sintaxis esencial
```js
/**
 * @param {number} base    Importe sobre el que aplicar el porcentaje.
 * @param {number} pct     Porcentaje a aplicar (0-100).
 * @returns {number}       Importe resultante.
 */
function aplicarPorcentaje(base, pct) {
  return base * pct / 100;
}

// Para usarlo tanto en Node (Jest) como en el navegador:
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { aplicarPorcentaje };
} else {
  global.MiModulo = { aplicarPorcentaje };
}
```

## Ejemplo básico funcional
```js
// precios.js — funciones puras documentadas

/**
 * Calcula el descuento aplicado sobre el subtotal.
 * @param {number} subtotal            Importe antes del descuento.
 * @param {number} porcentajeDescuento Porcentaje de descuento (ej: 10).
 * @returns {number} Importe descontado.
 * @example
 * calcularDescuento(200, 10);
 * // Devuelve 20
 */
function calcularDescuento(subtotal, porcentajeDescuento) {
  return subtotal * porcentajeDescuento / 100;
}

/**
 * Calcula el total final: subtotal − descuento + iva.
 * @param {number} subtotal  Importe inicial.
 * @param {number} descuento Importe descontado.
 * @param {number} iva       Importe del IVA.
 * @returns {number} Total final de la compra.
 */
function calcularTotal(subtotal, descuento, iva) {
  return subtotal - descuento + iva;
}
```

## Errores comunes
- Mezclar lógica de DOM dentro de la función pura → imposible de testear; separa cálculo de presentación
- No exportar con `module.exports` → Jest no puede importar las funciones
- Devolver `undefined` por olvidar `return` → el test fallará con valores inesperados

## Para el examen recuerda
- Función pura = misma entrada → misma salida, sin efectos secundarios
- El patrón `if (typeof module !== 'undefined')` hace el archivo compatible con Node y navegador
- `@example` en JSDoc muestra un uso concreto que también sirve como guía para el test
- Las funciones de este archivo **no usan `document`** — eso es responsabilidad del `script.js`
