/**
 * @file operaciones.js
 * Módulo de operaciones matemáticas para una tienda.
 * Compatible con Node.js (Jest) y navegador.
 */

"use strict";

/**
 * Calcula el importe del IVA sobre un precio base.
 * @param {number} importe     Precio antes de IVA.
 * @param {number} porcentaje  Porcentaje de IVA (ej: 21 para 21%).
 * @returns {number} Importe del IVA.
 * @example calcularIva(100, 21); // 21
 */
function calcularIva(importe, porcentaje) {
  return importe * porcentaje / 100;
}

/**
 * Calcula el importe del descuento sobre un precio base.
 * @param {number} importe     Precio original.
 * @param {number} porcentaje  Porcentaje de descuento (ej: 10 para 10%).
 * @returns {number} Importe descontado.
 * @example calcularDescuento(200, 10); // 20
 */
function calcularDescuento(importe, porcentaje) {
  return importe * porcentaje / 100;
}

/**
 * Formatea un número como precio en euros con 2 decimales.
 * @param {number} numero Valor a formatear.
 * @returns {string} Cadena con el precio (ej: "25.50 €").
 * @example formatearPrecio(25.5); // "25.50 €"
 */
function formatearPrecio(numero) {
  return Number(numero).toFixed(2) + " €";
}

/**
 * Valida si una cantidad es un entero positivo.
 * @param {*} cantidad Valor a validar.
 * @returns {boolean} true si es entero y mayor que 0.
 * @example
 * validarCantidad(3);    // true
 * validarCantidad(-1);   // false
 * validarCantidad(1.5);  // false
 */
function validarCantidad(cantidad) {
  const n = Number(cantidad);
  return Number.isInteger(n) && n > 0;
}

/**
 * Calcula el total final de una compra (precio * cantidad - descuento + iva).
 * Lanza un Error si la cantidad no es válida.
 * @param {number} precio     Precio unitario.
 * @param {number} cantidad   Número de unidades (debe ser entero > 0).
 * @param {number} descuento  Porcentaje de descuento (0-100).
 * @param {number} iva        Porcentaje de IVA (0-100).
 * @returns {number} Total final de la compra.
 * @throws {Error} Si la cantidad no es un entero positivo.
 */
function calcularTotal(precio, cantidad, descuento, iva) {
  if (!validarCantidad(cantidad)) {
    throw new Error("La cantidad debe ser un número entero mayor que 0.");
  }
  const subtotal   = precio * cantidad;
  const impDescuento = calcularDescuento(subtotal, descuento);
  const impIva       = calcularIva(subtotal - impDescuento, iva);
  return subtotal - impDescuento + impIva;
}

// Exportar para Node.js / Jest
if (typeof module !== "undefined" && module.exports) {
  module.exports = { calcularIva, calcularDescuento, formatearPrecio, validarCantidad, calcularTotal };
}
