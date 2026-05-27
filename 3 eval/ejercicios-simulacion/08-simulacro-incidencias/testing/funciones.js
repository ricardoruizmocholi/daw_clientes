/**
 * @file funciones.js
 * Módulo de cálculos para gestión de incidencias. Exportado para Jest.
 */

"use strict";

function calcularTiempoEstimado(prioridad) {
  const tiempos = { critica: 1, alta: 4, media: 8, baja: 24 };
  return tiempos[prioridad] !== undefined ? tiempos[prioridad] : 24;
}

function calcularCosteAtencion(horas, tarifaHora) {
  return horas * tarifaHora;
}

function esTituloValido(titulo) {
  if (typeof titulo !== "string") return false;
  const longitud = titulo.trim().length;
  return longitud >= 3 && longitud <= 100;
}

function formatearTiempo(horas) {
  if (horas < 1)   return (horas * 60) + " min";
  if (horas === 1) return "1 hora";
  return horas + " horas";
}

function esDescripcionValida(descripcion) {
  if (typeof descripcion !== "string") return false;
  return descripcion.trim().length >= 10;
}

function calcularResumenTiempos(prioridad, tarifaHora) {
  if (tarifaHora < 0) {
    throw new Error("La tarifa por hora no puede ser negativa.");
  }
  const tiempoEstimado    = calcularTiempoEstimado(prioridad);
  const coste             = calcularCosteAtencion(tiempoEstimado, tarifaHora);
  const descripcionTiempo = formatearTiempo(tiempoEstimado);
  return { tiempoEstimado, coste, descripcionTiempo };
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { calcularTiempoEstimado, calcularCosteAtencion, esTituloValido, formatearTiempo, esDescripcionValida, calcularResumenTiempos };
}
