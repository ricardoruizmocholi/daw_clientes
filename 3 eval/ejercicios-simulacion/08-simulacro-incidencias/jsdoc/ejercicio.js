/**
 * @file calculos-incidencias.js
 * Módulo de cálculos para el sistema de gestión de incidencias de soporte.
 *
 * INSTRUCCIONES (tiempo estimado: 20 minutos):
 * Las funciones ya están implementadas y son correctas.
 * Añade el bloque JSDoc COMPLETO encima de cada función:
 *   - @param  para cada parámetro (tipo + nombre + descripción)
 *   - @returns para el valor devuelto
 *   - @example con al menos un ejemplo y su resultado
 *
 * Para calcularResumenTiempos(), define primero el @typedef ResumenTiempos
 * con las tres propiedades del objeto devuelto.
 *
 * Genera docs al terminar:
 *   npx jsdoc ejercicio.js -d docs/
 */

"use strict";

// ===================================================
// TODO 1: JSDoc para calcularTiempoEstimado
// Regla: critica→1h, alta→4h, media→8h, baja→24h
// ===================================================
function calcularTiempoEstimado(prioridad) {
  const tiempos = { critica: 1, alta: 4, media: 8, baja: 24 };
  return tiempos[prioridad] !== undefined ? tiempos[prioridad] : 24;
}


// ===================================================
// TODO 2: JSDoc para calcularCosteAtencion
// ===================================================
function calcularCosteAtencion(horas, tarifaHora) {
  return horas * tarifaHora;
}


// ===================================================
// TODO 3: JSDoc para esTituloValido
// Regla: string, entre 3 y 100 caracteres (trim)
// ===================================================
function esTituloValido(titulo) {
  if (typeof titulo !== "string") return false;
  const longitud = titulo.trim().length;
  return longitud >= 3 && longitud <= 100;
}


// ===================================================
// TODO 4: JSDoc para formatearTiempo
// Casos: < 1 → "X min", === 1 → "1 hora", > 1 → "X horas"
// ===================================================
function formatearTiempo(horas) {
  if (horas < 1)    return (horas * 60) + " min";
  if (horas === 1)  return "1 hora";
  return horas + " horas";
}


// ===================================================
// TODO 5: JSDoc para esDescripcionValida
// Regla: string, mínimo 10 caracteres (trim)
// ===================================================
function esDescripcionValida(descripcion) {
  if (typeof descripcion !== "string") return false;
  return descripcion.trim().length >= 10;
}


// ===================================================
// TODO 6: Define @typedef ResumenTiempos aquí arriba,
// luego añade JSDoc completo a calcularResumenTiempos.
//
// El objeto devuelto tiene:
//   tiempoEstimado {number} — horas estimadas según prioridad
//   coste          {number} — coste de atención (horas * tarifa)
//   descripcionTiempo {string} — tiempo formateado (ej: "4 horas")
// ===================================================
function calcularResumenTiempos(prioridad, tarifaHora) {
  const tiempoEstimado    = calcularTiempoEstimado(prioridad);
  const coste             = calcularCosteAtencion(tiempoEstimado, tarifaHora);
  const descripcionTiempo = formatearTiempo(tiempoEstimado);
  return { tiempoEstimado, coste, descripcionTiempo };
}
