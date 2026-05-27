/**
 * @file funciones.js
 * Funciones de cálculo para el sistema de reservas de hotel.
 * Exportadas para Node.js / Jest.
 */

"use strict";

function calcularImporte(precioNoche, noches) {
  return precioNoche * noches;
}

function calcularIva(importe, tipoHabitacion) {
  const porcentaje = tipoHabitacion === "suite" ? 21 : 10;
  return importe * porcentaje / 100;
}

function calcularTotalConIva(importe, iva) {
  return importe + iva;
}

function esNochesValido(noches) {
  const n = Number(noches);
  return Number.isInteger(n) && n >= 1 && n <= 30;
}

function formatearEuros(numero) {
  return Number(numero).toFixed(2) + " €";
}

function calcularResumen(precioNoche, noches, tipoHabitacion) {
  if (!esNochesValido(noches)) {
    throw new Error("El número de noches no es válido (debe ser entre 1 y 30).");
  }
  const importe = calcularImporte(precioNoche, noches);
  const iva     = calcularIva(importe, tipoHabitacion);
  const total   = calcularTotalConIva(importe, iva);
  return { importe, iva, total };
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { calcularImporte, calcularIva, calcularTotalConIva, esNochesValido, formatearEuros, calcularResumen };
}
