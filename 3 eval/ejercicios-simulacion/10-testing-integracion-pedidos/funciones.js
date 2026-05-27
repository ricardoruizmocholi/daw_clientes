/**
 * @file funciones.js
 * Módulo de gestión de pedidos online.
 * Exportado para Jest (testing de integración).
 */

"use strict";

/**
 * Crea una línea de pedido validada.
 *
 * @param {string} nombre   Nombre del artículo (no vacío).
 * @param {number} precio   Precio unitario (> 0).
 * @param {number} cantidad Unidades (entero > 0).
 * @returns {{ nombre: string, precio: number, cantidad: number }}
 * @throws {Error} Si algún parámetro no es válido.
 */
function crearLineaPedido(nombre, precio, cantidad) {
  if (typeof nombre !== "string" || nombre.trim() === "") {
    throw new Error("El nombre del artículo no es válido.");
  }
  if (typeof precio !== "number" || precio <= 0) {
    throw new Error("El precio debe ser un número mayor que 0.");
  }
  if (!Number.isInteger(cantidad) || cantidad <= 0) {
    throw new Error("La cantidad debe ser un entero mayor que 0.");
  }
  return { nombre: nombre.trim(), precio, cantidad };
}

/**
 * Calcula el importe de una línea de pedido (precio × cantidad).
 *
 * @param {{ precio: number, cantidad: number }} linea Línea de pedido.
 * @returns {number} Importe total de la línea.
 */
function calcularTotalLinea(linea) {
  return linea.precio * linea.cantidad;
}

/**
 * Calcula el importe total de un pedido sumando todas sus líneas.
 *
 * @param {Array} lineas Array de líneas de pedido.
 * @returns {number} Suma de todos los importes de línea.
 */
function calcularTotalPedido(lineas) {
  return lineas.reduce((acc, linea) => acc + calcularTotalLinea(linea), 0);
}

/**
 * Calcula los gastos de envío según el importe y si el pedido es urgente.
 *
 * Reglas:
 * - Total >= 50 € → envío gratis (0 €), salvo que sea urgente.
 * - Total < 50 €  → 5.99 €.
 * - Urgente        → se añaden 4 € extra (sobre lo anterior).
 *
 * @param {number}  total     Importe total del pedido.
 * @param {boolean} urgente   Si el envío es urgente.
 * @returns {number} Gastos de envío en euros.
 */
function calcularGastosEnvio(total, urgente = false) {
  const base = total >= 50 ? 0 : 5.99;
  return urgente ? base + 4 : base;
}

/**
 * @typedef  {Object} ResultadoPedido
 * @property {number}  totalLineas    Suma de importes de línea (sin envío).
 * @property {number}  gastosEnvio    Coste de envío.
 * @property {number}  totalFinal     totalLineas + gastosEnvio.
 * @property {boolean} urgente        Si el envío es urgente.
 * @property {number}  numArticulos   Número de líneas del pedido.
 */

/**
 * Procesa un pedido completo: valida, calcula importes y devuelve un resumen.
 * Integra crearLineaPedido, calcularTotalPedido y calcularGastosEnvio.
 *
 * @param {Array<{ nombre:string, precio:number, cantidad:number }>} datosLineas
 *   Array de objetos con los datos en bruto de cada línea.
 * @param {boolean} urgente Si el envío es urgente.
 * @returns {ResultadoPedido}
 * @throws {Error} Si datosLineas está vacío o alguna línea tiene datos inválidos.
 */
function procesarPedido(datosLineas, urgente = false) {
  if (!Array.isArray(datosLineas) || datosLineas.length === 0) {
    throw new Error("El pedido debe tener al menos una línea.");
  }
  // Esto llama a crearLineaPedido para cada dato en bruto (puede lanzar)
  const lineas      = datosLineas.map(d => crearLineaPedido(d.nombre, d.precio, d.cantidad));
  const totalLineas = calcularTotalPedido(lineas);
  const gastosEnvio = calcularGastosEnvio(totalLineas, urgente);
  const totalFinal  = totalLineas + gastosEnvio;
  return { totalLineas, gastosEnvio, totalFinal, urgente, numArticulos: lineas.length };
}

/**
 * @typedef  {Object} ResumenPedidos
 * @property {number} totalPedidos    Número de pedidos procesados.
 * @property {number} importeTotal    Suma de todos los totalFinal.
 * @property {number} pedidosUrgentes Número de pedidos urgentes.
 * @property {number} mediaImporte    Importe medio por pedido.
 */

/**
 * Calcula estadísticas de una lista de ResultadoPedido.
 *
 * @param {ResultadoPedido[]} pedidos Array de pedidos ya procesados.
 * @returns {ResumenPedidos}
 * @throws {Error} Si el array está vacío.
 */
function calcularResumenPedidos(pedidos) {
  if (!Array.isArray(pedidos) || pedidos.length === 0) {
    throw new Error("No hay pedidos para resumir.");
  }
  const totalPedidos    = pedidos.length;
  const importeTotal    = pedidos.reduce((acc, p) => acc + p.totalFinal, 0);
  const pedidosUrgentes = pedidos.filter(p => p.urgente).length;
  const mediaImporte    = importeTotal / totalPedidos;
  return { totalPedidos, importeTotal, pedidosUrgentes, mediaImporte };
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    crearLineaPedido,
    calcularTotalLinea,
    calcularTotalPedido,
    calcularGastosEnvio,
    procesarPedido,
    calcularResumenPedidos
  };
}
