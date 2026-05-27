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
function calcularImporte(precioNoche, noches) {
  return precioNoche * noches;
}


// ===================================================
// TODO 2: Añade el bloque JSDoc a calcularIva
// Pista en la descripción: suite → 21%, resto → 10%
// ===================================================
function calcularIva(importe, tipoHabitacion) {
  const porcentaje = tipoHabitacion === "suite" ? 21 : 10;
  return importe * porcentaje / 100;
}


// ===================================================
// TODO 3: Añade el bloque JSDoc a calcularTotalConIva
// ===================================================
function calcularTotalConIva(importe, iva) {
  return importe + iva;
}


// ===================================================
// TODO 4: Añade el bloque JSDoc a esNochesValido
// Debe indicar el rango válido (1–30) en la descripción
// ===================================================
function esNochesValido(noches) {
  const n = Number(noches);
  return Number.isInteger(n) && n >= 1 && n <= 30;
}


// ===================================================
// TODO 5: Añade el bloque JSDoc a formatearEuros
// ===================================================
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
function calcularResumen(precioNoche, noches, tipoHabitacion) {
  const importe = calcularImporte(precioNoche, noches);
  const iva     = calcularIva(importe, tipoHabitacion);
  const total   = calcularTotalConIva(importe, iva);
  return { importe, iva, total };
}
