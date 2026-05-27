/**
 * @file calculos-hotel.js
 * Módulo de cálculos para el sistema de reservas de hotel.
 * ⚠️ Intenta resolver ejercicio.js antes de consultar esta solución.
 */

"use strict";

/**
 * Calcula el importe base de una reserva (sin IVA).
 *
 * @param {number} precioNoche Precio por noche de la habitación en euros.
 * @param {number} noches      Número de noches de la estancia.
 * @returns {number} Importe base de la reserva.
 *
 * @example
 * calcularImporte(89, 3);
 * // Devuelve 267
 */
function calcularImporte(precioNoche, noches) {
  return precioNoche * noches;
}

/**
 * Calcula el importe del IVA aplicado a una reserva.
 *
 * El tipo de IVA depende del tipo de habitación:
 * - Suite: 21%
 * - Individual y Doble: 10%
 *
 * @param {number} importe         Importe base sobre el que se aplica el IVA.
 * @param {string} tipoHabitacion  Tipo de habitación: "individual", "doble" o "suite".
 * @returns {number} Importe correspondiente al IVA.
 *
 * @example
 * calcularIva(200, "individual");
 * // Devuelve 20
 *
 * @example
 * calcularIva(200, "suite");
 * // Devuelve 42
 */
function calcularIva(importe, tipoHabitacion) {
  const porcentaje = tipoHabitacion === "suite" ? 21 : 10;
  return importe * porcentaje / 100;
}

/**
 * Calcula el importe total de una reserva sumando IVA al importe base.
 *
 * @param {number} importe Importe base sin IVA.
 * @param {number} iva     Importe del IVA calculado.
 * @returns {number} Total final con IVA incluido.
 *
 * @example
 * calcularTotalConIva(267, 26.7);
 * // Devuelve 293.7
 */
function calcularTotalConIva(importe, iva) {
  return importe + iva;
}

/**
 * Comprueba si el número de noches introducido es válido.
 *
 * Un valor es válido si es un número entero entre 1 y 30 (ambos incluidos).
 *
 * @param {*} noches Valor a validar.
 * @returns {boolean} `true` si es un entero entre 1 y 30; `false` en caso contrario.
 *
 * @example
 * esNochesValido(3);   // true
 * esNochesValido(0);   // false
 * esNochesValido(1.5); // false
 * esNochesValido(31);  // false
 */
function esNochesValido(noches) {
  const n = Number(noches);
  return Number.isInteger(n) && n >= 1 && n <= 30;
}

/**
 * Formatea un número como precio en euros con dos decimales.
 *
 * @param {number} numero Valor numérico a formatear.
 * @returns {string} Cadena con el precio formateado (ej: "25.00 €").
 *
 * @example
 * formatearEuros(25);    // "25.00 €"
 * formatearEuros(293.7); // "293.70 €"
 */
function formatearEuros(numero) {
  return Number(numero).toFixed(2) + " €";
}

/**
 * @typedef  {Object} ResumenReserva
 * @property {number} importe Importe base sin IVA.
 * @property {number} iva     Importe del IVA aplicado.
 * @property {number} total   Importe total con IVA incluido.
 */

/**
 * Calcula un resumen completo de los importes de una reserva.
 *
 * Lanza un error si el número de noches no es válido.
 *
 * @param {number} precioNoche    Precio por noche en euros.
 * @param {number} noches         Número de noches (entero, 1–30).
 * @param {string} tipoHabitacion Tipo: "individual", "doble" o "suite".
 * @returns {ResumenReserva} Objeto con importe, iva y total.
 * @throws {Error} Si el número de noches no es válido.
 *
 * @example
 * calcularResumen(89, 3, "individual");
 * // Devuelve { importe: 267, iva: 26.7, total: 293.7 }
 */
function calcularResumen(precioNoche, noches, tipoHabitacion) {
  if (!esNochesValido(noches)) {
    throw new Error("El número de noches no es válido (debe ser entre 1 y 30).");
  }
  const importe = calcularImporte(precioNoche, noches);
  const iva     = calcularIva(importe, tipoHabitacion);
  const total   = calcularTotalConIva(importe, iva);
  return { importe, iva, total };
}
