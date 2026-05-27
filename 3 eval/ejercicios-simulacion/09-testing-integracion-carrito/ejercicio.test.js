// =====================================================
// Ejercicio 09 — TESTING DE INTEGRACIÓN: Carrito (~30 min)
// =====================================================
//
// ¿Qué es un test de integración?
// ─────────────────────────────────────────────────────
// Un test UNITARIO comprueba UNA función de forma aislada.
// Un test de INTEGRACIÓN comprueba cómo VARIAS funciones
// trabajan juntas: la salida de A se pasa a B, y el
// resultado final es el que verificamos.
//
// Ejemplo:
//   UNITARIO:    expect(calcularSubtotal(carrito)).toBe(...)
//   INTEGRACIÓN: crearProducto → agregarAlCarrito → calcularSubtotal → ???
//
// Instrucciones:
//   1. cd 09-testing-integracion-carrito
//   2. npm install
//   3. npm test
//
// Las funciones están en funciones.js.
// NO las modifiques. Escribe los tests en los describe de abajo.
// =====================================================

const {
  crearProducto,
  agregarAlCarrito,
  calcularSubtotal,
  aplicarDescuento,
  calcularResumenCarrito
} = require("./funciones");

// ─────────────────────────────────────────────────────
// BLOQUE 1: crearProducto + agregarAlCarrito
//
// Integración: probamos que el objeto que devuelve
// crearProducto() puede usarse directamente en agregarAlCarrito().
//
// Casos a cubrir:
//   A. Crear un producto y añadirlo al carrito → el carrito tiene 1 línea
//      con la cantidad correcta.
//   B. Añadir el MISMO producto dos veces → se acumula la cantidad
//      (1 sola línea en el carrito con la suma).
//   C. Intentar añadir más unidades de las que hay en stock → lanza Error
//      "Stock insuficiente."  (usa toThrow con cadena parcial)
//   D. crearProducto con precio negativo → lanza Error antes de llegar
//      a agregarAlCarrito. (Prueba que los errores se propagan.)
// ─────────────────────────────────────────────────────
describe("Integración: crearProducto + agregarAlCarrito", () => {
  let carrito;

  // beforeEach resetea el carrito antes de cada test
  beforeEach(() => {
    carrito = [];
  });

  // TODO A: añadir un producto nuevo → 1 línea, cantidad correcta

  // TODO B: añadir el mismo producto dos veces → acumula cantidad

  // TODO C: stock insuficiente → lanza Error con "Stock insuficiente"

  // TODO D: precio negativo en crearProducto → lanza Error antes de agregar
});


// ─────────────────────────────────────────────────────
// BLOQUE 2: agregarAlCarrito + calcularSubtotal
//
// Integración: verificamos que calcularSubtotal() produce
// el valor correcto con el carrito que devuelve agregarAlCarrito().
//
// Casos a cubrir:
//   A. Un solo producto (precio=10, cantidad=3) → subtotal = 30.
//   B. Dos productos distintos → subtotal = suma de ambas líneas.
//   C. Carrito vacío → subtotal = 0  (caso límite).
// ─────────────────────────────────────────────────────
describe("Integración: agregarAlCarrito + calcularSubtotal", () => {
  let carrito;

  beforeEach(() => {
    carrito = [];
  });

  // TODO A: 1 producto (10€ × 3) → subtotal 30

  // TODO B: 2 productos distintos → subtotal correcto

  // TODO C: carrito vacío → subtotal 0
});


// ─────────────────────────────────────────────────────
// BLOQUE 3: calcularSubtotal + aplicarDescuento
//
// Integración: la salida de calcularSubtotal() alimenta
// directamente a aplicarDescuento().
//
// Casos a cubrir:
//   A. Subtotal 200€ con 10 % de descuento → total 180.
//   B. Subtotal 100€ con 0 % → total 100 (sin cambio).
//   C. Subtotal 50€ con 100 % → total 0 (descuento total).
//   D. aplicarDescuento con porcentaje 150 → lanza Error.
// ─────────────────────────────────────────────────────
describe("Integración: calcularSubtotal + aplicarDescuento", () => {
  let carrito;

  beforeEach(() => {
    carrito = [];
  });

  // TODO A: subtotal 200, descuento 10% → 180

  // TODO B: descuento 0% → total = subtotal

  // TODO C: descuento 100% → total 0

  // TODO D: porcentaje fuera de rango → lanza Error
});


// ─────────────────────────────────────────────────────
// BLOQUE 4: flujo COMPLETO → calcularResumenCarrito
//
// Integración real: encadenamos TODAS las funciones y
// verificamos el objeto resumen final.
//
// Casos a cubrir:
//   A. 2 productos, 15% descuento → objeto ResumenCarrito correcto:
//      { subtotal, descuento:15, total, totalArticulos }.
//      Usa toEqual para comparar el objeto completo.
//   B. Carrito vacío → calcularResumenCarrito lanza Error "carrito está vacío".
//   C. Sin descuento (por defecto 0) → total === subtotal.
//   D. totalArticulos es la suma de TODAS las unidades, no el número de líneas.
//      (Ej: 2 líneas con 3 y 5 unidades → totalArticulos = 8)
// ─────────────────────────────────────────────────────
describe("Integración: flujo completo → calcularResumenCarrito", () => {
  let carrito;

  beforeEach(() => {
    carrito = [];
  });

  // TODO A: 2 productos + 15% → objeto completo correcto (toEqual)

  // TODO B: carrito vacío → lanza Error

  // TODO C: sin descuento → total === subtotal

  // TODO D: totalArticulos suma todas las unidades
});
