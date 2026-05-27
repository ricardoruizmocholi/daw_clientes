// =====================================================
// Ejercicio 10 — TESTING DE INTEGRACIÓN: Pedidos (~30 min)
// =====================================================
//
// ¿Qué diferencia hay con los tests del ejercicio 09?
// ─────────────────────────────────────────────────────
// Aquí llevamos la integración un paso más lejos:
//   - procesarPedido() llama internamente a crearLineaPedido(),
//     calcularTotalPedido() y calcularGastosEnvio().
//   - Si alguna función interna falla, el error sube hasta el test.
//   - calcularResumenPedidos() recibe la SALIDA de varios
//     procesarPedido() y genera estadísticas globales.
//
// Flujo completo que vas a testear:
//   datos brutos → crearLineaPedido → calcularTotalLinea
//     → calcularTotalPedido → calcularGastosEnvio
//       → procesarPedido → calcularResumenPedidos
//
// Instrucciones:
//   1. cd 10-testing-integracion-pedidos
//   2. npm install
//   3. npm test
//
// Las funciones están en funciones.js. NO las modifiques.
// =====================================================

const {
  crearLineaPedido,
  calcularTotalLinea,
  calcularTotalPedido,
  calcularGastosEnvio,
  procesarPedido,
  calcularResumenPedidos
} = require("./funciones");


// ─────────────────────────────────────────────────────
// BLOQUE 1: crearLineaPedido + calcularTotalLinea
//
// Integración: el objeto que crea crearLineaPedido() es el que
// consume calcularTotalLinea(). Ambas deben funcionar en cadena.
//
// Casos a cubrir:
//   A. Línea válida (precio=15, cantidad=4) → calcularTotalLinea → 60.
//   B. Línea válida (precio=9.99, cantidad=3) → 29.97  (usa toBeCloseTo).
//   C. crearLineaPedido con cantidad=0 → lanza Error antes de calcular.
//   D. crearLineaPedido con nombre vacío "" → lanza Error.
// ─────────────────────────────────────────────────────
describe("Integración: crearLineaPedido + calcularTotalLinea", () => {

  // TODO A: linea(15, 4) → 60

  // TODO B: linea(9.99, 3) → 29.97 (toBeCloseTo)

  // TODO C: cantidad=0 → lanza Error

  // TODO D: nombre vacío → lanza Error
});


// ─────────────────────────────────────────────────────
// BLOQUE 2: calcularTotalPedido + calcularGastosEnvio
//
// Integración: el total que devuelve calcularTotalPedido() se pasa
// a calcularGastosEnvio() para determinar el coste de envío.
//
// Reglas de envío:
//   total >= 50 → 0 €  |  total < 50 → 5.99 €
//   urgente → +4 € sobre lo anterior
//
// Casos a cubrir:
//   A. 2 líneas, total = 60€ (>= 50) → envío gratis (0).
//   B. 1 línea, total = 30€ (< 50)  → envío 5.99.
//   C. Total 30€ + urgente           → 5.99 + 4 = 9.99.
//   D. Total 60€ + urgente           → 0 + 4 = 4.
// ─────────────────────────────────────────────────────
describe("Integración: calcularTotalPedido + calcularGastosEnvio", () => {

  // TODO A: 2 líneas, total >= 50 → envío 0

  // TODO B: 1 línea, total < 50 → envío 5.99

  // TODO C: total < 50, urgente → 9.99

  // TODO D: total >= 50, urgente → 4
});


// ─────────────────────────────────────────────────────
// BLOQUE 3: procesarPedido (integración de todo el pipeline)
//
// procesarPedido() llama internamente a crearLineaPedido(),
// calcularTotalPedido() y calcularGastosEnvio().
// Testea el objeto ResultadoPedido completo.
//
// Casos a cubrir:
//   A. Pedido normal (2 artículos, total >= 50, no urgente) →
//      objeto correcto: { totalLineas, gastosEnvio:0, totalFinal, urgente:false, numArticulos:2 }
//      Usa toEqual.
//   B. Pedido urgente (total < 50) →
//      gastosEnvio = 9.99, urgente = true.
//   C. Datos de línea inválidos (precio negativo) →
//      el error de crearLineaPedido() sube hasta el test.
//   D. Array vacío → lanza Error "al menos una línea".
// ─────────────────────────────────────────────────────
describe("Integración: procesarPedido (pipeline completo)", () => {

  // TODO A: 2 líneas válidas, no urgente → objeto completo (toEqual)

  // TODO B: 1 línea (total < 50), urgente → gastosEnvio 9.99

  // TODO C: precio negativo en datos → lanza Error propagado

  // TODO D: array vacío → lanza Error
});


// ─────────────────────────────────────────────────────
// BLOQUE 4: calcularResumenPedidos (estadísticas globales)
//
// Integración final: procesas varios pedidos con procesarPedido()
// y calcularResumenPedidos() agrega sus resultados.
//
// Casos a cubrir:
//   A. 3 pedidos (2 normales + 1 urgente) → ResumenPedidos correcto:
//      { totalPedidos:3, importeTotal, pedidosUrgentes:1, mediaImporte }.
//      Usa toEqual con los valores exactos que hayas calculado.
//   B. Un solo pedido → mediaImporte === totalFinal del pedido.
//   C. Array vacío → lanza Error "No hay pedidos".
// ─────────────────────────────────────────────────────
describe("Integración: calcularResumenPedidos (estadísticas)", () => {

  // TODO A: 3 pedidos mixtos → objeto ResumenPedidos correcto

  // TODO B: 1 pedido → mediaImporte === su totalFinal

  // TODO C: array vacío → lanza Error
});
