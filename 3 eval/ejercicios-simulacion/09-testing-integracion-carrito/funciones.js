/**
 * @file funciones.js
 * Módulo de gestión de carrito de compras.
 * Exportado para Jest (testing de integración).
 */

"use strict";

/**
 * Crea un objeto producto validado.
 * @param {string} nombre  Nombre del producto (no vacío).
 * @param {number} precio  Precio unitario (> 0).
 * @param {number} stock   Unidades disponibles (entero >= 0).
 * @returns {{ nombre: string, precio: number, stock: number }}
 * @throws {Error} Si algún parámetro no es válido.
 */
function crearProducto(nombre, precio, stock) {
  if (typeof nombre !== "string" || nombre.trim() === "") {
    throw new Error("El nombre del producto no es válido.");
  }
  if (typeof precio !== "number" || precio <= 0) {
    throw new Error("El precio debe ser un número mayor que 0.");
  }
  if (typeof stock !== "number" || !Number.isInteger(stock) || stock < 0) {
    throw new Error("El stock debe ser un entero mayor o igual a 0.");
  }
  return { nombre: nombre.trim(), precio, stock };
}

/**
 * Añade un producto al carrito respetando el stock disponible.
 * Si el producto ya existe en el carrito, acumula la cantidad.
 *
 * @param {Array}  carrito   Array de líneas { producto, cantidad }.
 * @param {Object} producto  Objeto producto creado con crearProducto().
 * @param {number} cantidad  Unidades a añadir (entero > 0).
 * @returns {Array} El mismo array carrito (mutado).
 * @throws {Error} Si cantidad es inválida o supera el stock.
 */
function agregarAlCarrito(carrito, producto, cantidad) {
  if (!Number.isInteger(cantidad) || cantidad <= 0) {
    throw new Error("La cantidad debe ser un entero mayor que 0.");
  }
  // Calcula cuántas unidades hay ya en el carrito para este producto
  const yaEnCarrito = carrito
    .filter(item => item.producto.nombre === producto.nombre)
    .reduce((acc, item) => acc + item.cantidad, 0);

  if (yaEnCarrito + cantidad > producto.stock) {
    throw new Error(`Stock insuficiente. Disponible: ${producto.stock - yaEnCarrito}.`);
  }
  const existente = carrito.find(item => item.producto.nombre === producto.nombre);
  if (existente) {
    existente.cantidad += cantidad;
  } else {
    carrito.push({ producto, cantidad });
  }
  return carrito;
}

/**
 * Calcula el subtotal del carrito (suma de precio × cantidad).
 * @param {Array} carrito Array de líneas { producto, cantidad }.
 * @returns {number} Subtotal en euros.
 */
function calcularSubtotal(carrito) {
  return carrito.reduce((acc, item) => acc + item.producto.precio * item.cantidad, 0);
}

/**
 * Aplica un descuento porcentual a un importe dado.
 * @param {number} subtotal   Importe base.
 * @param {number} porcentaje Porcentaje de descuento (0–100).
 * @returns {number} Importe con descuento aplicado.
 * @throws {Error} Si el porcentaje está fuera del rango 0–100.
 */
function aplicarDescuento(subtotal, porcentaje) {
  if (typeof porcentaje !== "number" || porcentaje < 0 || porcentaje > 100) {
    throw new Error("El porcentaje de descuento debe estar entre 0 y 100.");
  }
  return subtotal * (1 - porcentaje / 100);
}

/**
 * @typedef  {Object} ResumenCarrito
 * @property {number} subtotal       Importe sin descuento.
 * @property {number} descuento      Porcentaje aplicado.
 * @property {number} total          Importe final tras descuento.
 * @property {number} totalArticulos Suma de todas las unidades.
 */

/**
 * Genera un resumen completo del carrito integrando subtotal y descuento.
 * @param {Array}  carrito   Array de líneas { producto, cantidad }.
 * @param {number} descuento Porcentaje de descuento (0–100). Por defecto 0.
 * @returns {ResumenCarrito}
 * @throws {Error} Si el carrito está vacío.
 */
function calcularResumenCarrito(carrito, descuento = 0) {
  if (carrito.length === 0) {
    throw new Error("El carrito está vacío.");
  }
  const subtotal       = calcularSubtotal(carrito);
  const total          = aplicarDescuento(subtotal, descuento);
  const totalArticulos = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  return { subtotal, descuento, total, totalArticulos };
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    crearProducto,
    agregarAlCarrito,
    calcularSubtotal,
    aplicarDescuento,
    calcularResumenCarrito
  };
}
