/**
 * @file calculos-incidencias.js
 * Módulo de cálculos para gestión de incidencias de soporte técnico.
 * ⚠️ Intenta resolver ejercicio.js antes de consultar esta solución.
 */

"use strict";

/**
 * Devuelve el tiempo estimado de resolución en horas según la prioridad.
 *
 * Regla de negocio:
 * - crítica: 1 hora
 * - alta: 4 horas
 * - media: 8 horas
 * - baja: 24 horas
 * - valor desconocido: 24 horas (por defecto)
 *
 * @param {string} prioridad Prioridad de la incidencia: "critica", "alta", "media" o "baja".
 * @returns {number} Tiempo estimado en horas.
 *
 * @example
 * calcularTiempoEstimado("critica"); // 1
 * calcularTiempoEstimado("media");   // 8
 */
function calcularTiempoEstimado(prioridad) {
  const tiempos = { critica: 1, alta: 4, media: 8, baja: 24 };
  return tiempos[prioridad] !== undefined ? tiempos[prioridad] : 24;
}

/**
 * Calcula el coste de atención de una incidencia.
 *
 * @param {number} horas      Número de horas estimadas de atención.
 * @param {number} tarifaHora Coste por hora en euros.
 * @returns {number} Coste total de atención en euros.
 *
 * @example
 * calcularCosteAtencion(4, 50);
 * // Devuelve 200
 */
function calcularCosteAtencion(horas, tarifaHora) {
  return horas * tarifaHora;
}

/**
 * Comprueba si el título de una incidencia es válido.
 *
 * Un título es válido si es una cadena de texto de entre 3 y 100 caracteres
 * (se aplica trim antes de medir la longitud).
 *
 * @param {*} titulo Valor a validar.
 * @returns {boolean} `true` si es string entre 3 y 100 chars; `false` en otro caso.
 *
 * @example
 * esTituloValido("Error de red");        // true
 * esTituloValido("ab");                  // false (muy corto)
 * esTituloValido(123);                   // false (no es string)
 */
function esTituloValido(titulo) {
  if (typeof titulo !== "string") return false;
  const longitud = titulo.trim().length;
  return longitud >= 3 && longitud <= 100;
}

/**
 * Formatea un número de horas como texto legible.
 *
 * - Si horas < 1 → convierte a minutos: "X min"
 * - Si horas === 1 → "1 hora"
 * - Si horas > 1 → "X horas"
 *
 * @param {number} horas Tiempo en horas a formatear.
 * @returns {string} Texto formateado.
 *
 * @example
 * formatearTiempo(1);   // "1 hora"
 * formatearTiempo(4);   // "4 horas"
 * formatearTiempo(0.5); // "30 min"
 */
function formatearTiempo(horas) {
  if (horas < 1)   return (horas * 60) + " min";
  if (horas === 1) return "1 hora";
  return horas + " horas";
}

/**
 * Comprueba si la descripción de una incidencia es válida.
 *
 * Una descripción es válida si es una cadena de texto de al menos 10 caracteres
 * (después de aplicar trim).
 *
 * @param {*} descripcion Valor a validar.
 * @returns {boolean} `true` si es string con 10+ chars; `false` en otro caso.
 *
 * @example
 * esDescripcionValida("El servidor no arranca");  // true
 * esDescripcionValida("Falla");                   // false
 */
function esDescripcionValida(descripcion) {
  if (typeof descripcion !== "string") return false;
  return descripcion.trim().length >= 10;
}

/**
 * @typedef  {Object} ResumenTiempos
 * @property {number} tiempoEstimado     Horas estimadas según la prioridad.
 * @property {number} coste              Coste total de atención (horas × tarifa).
 * @property {string} descripcionTiempo  Tiempo formateado como texto legible.
 */

/**
 * Calcula un resumen completo de tiempos y costes para una incidencia.
 *
 * Lanza un error si la tarifa es negativa.
 *
 * @param {string} prioridad   Prioridad de la incidencia.
 * @param {number} tarifaHora  Tarifa por hora en euros (debe ser >= 0).
 * @returns {ResumenTiempos} Objeto con tiempoEstimado, coste y descripcionTiempo.
 * @throws {Error} Si tarifaHora es negativa.
 *
 * @example
 * calcularResumenTiempos("alta", 50);
 * // Devuelve { tiempoEstimado: 4, coste: 200, descripcionTiempo: "4 horas" }
 */
function calcularResumenTiempos(prioridad, tarifaHora) {
  if (tarifaHora < 0) {
    throw new Error("La tarifa por hora no puede ser negativa.");
  }
  const tiempoEstimado    = calcularTiempoEstimado(prioridad);
  const coste             = calcularCosteAtencion(tiempoEstimado, tarifaHora);
  const descripcionTiempo = formatearTiempo(tiempoEstimado);
  return { tiempoEstimado, coste, descripcionTiempo };
}
