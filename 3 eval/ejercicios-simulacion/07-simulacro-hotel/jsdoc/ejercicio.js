/**
 * @file calculos-hotel.js
 * Módulo de cálculos para el sistema de reservas de hotel.
 *
 * INSTRUCCIONES (tiempo estimado: 20 minutos):
 * Cada función ya está implementada y funciona correctamente.
 * Tu tarea es añadir el bloque JSDoc COMPLETO encima de cada función:
 *   - @param  para cada parámetro (tipo + nombre + descripción)
 *   - @returns para el valor devuelto (tipo + descripción)
 *   - @example con al menos un ejemplo de uso y el resultado esperado
 *
 * Para calcularResumen(), añade también el @typedef ResumenReserva
 * que describa las tres propiedades del objeto devuelto.
 *
 * Genera la documentación al terminar con:
 *   npx jsdoc ejercicio.js -d docs/
 */

"use strict";

// ===================================================
// TODO 1: Añade el bloque JSDoc a calcularImporte
// ===================================================
/**
 * 
 * @param {number} precioNoche  Precio por noche de la habiarcion en euros
 * @param {number} noches numro de nomches
 * @returns {number} Importe base de la reserva.
 * calcularImporte(100, 3);
 * //Devuelve 267
 * /
 * @example
 * 
 */
function calcularImporte(precioNoche, noches) {
  return precioNoche * noches;
}


// ===================================================
// TODO 2: Añade el bloque JSDoc a calcularIva
// Pista en la descripción: suite → 21%, resto → 10%
// ===================================================
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


// ===================================================
// TODO 3: Añade el bloque JSDoc a calcularTotalConIva
// ===================================================
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


// ===================================================
// TODO 4: Añade el bloque JSDoc a esNochesValido
// Debe indicar el rango válido (1–30) en la descripción
// ===================================================
/**
 *  Comprueba si el número de noches introducido es válido.
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


// ===================================================
// TODO 5: Añade el bloque JSDoc a formatearEuros
// ===================================================
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


// ===================================================
// TODO 6: Define el @typedef ResumenReserva aquí arriba
// y añade el bloque JSDoc completo a calcularResumen.
//
// El objeto devuelto tiene tres propiedades:
//   importe {number} — base sin IVA
//   iva     {number} — importe del IVA
//   total   {number} — importe final con IVA
// ===================================================
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
  const importe = calcularImporte(precioNoche, noches);
  const iva     = calcularIva(importe, tipoHabitacion);
  const total   = calcularTotalConIva(importe, iva);
  return { importe, iva, total };
}
