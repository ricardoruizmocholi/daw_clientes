// =====================================================
// Simulacro 07 — PARTE TESTING (tiempo: ~25 min)
// =====================================================
// Instrucciones:
//   1. cd testing
//   2. npm install  (ya hay package.json)
//   3. npm test     (para ejecutar tus tests)
//
// Las funciones ya están en funciones.js.
// Tu tarea: escribir los tests de cada describe().
// Objetivo: al menos 3 tests por función.
// =====================================================

const {
  calcularImporte,
  calcularIva,
  calcularTotalConIva,
  esNochesValido,
  formatearEuros,
  calcularResumen
} = require("./funciones");

// =====================================================
// TODO 1: Tests de calcularImporte(precioNoche, noches)
// Casos a cubrir:
//   - 89 €/noche x 3 noches → 267
//   - 129 €/noche x 1 noche → 129
//   - 249 €/noche x 7 noches → 1743
// =====================================================
describe("calcularImporte", () => {
  // Escribe aquí tus tests
});


// =====================================================
// TODO 2: Tests de calcularIva(importe, tipoHabitacion)
// Regla: suite → 21%; individual y doble → 10%
// Casos a cubrir:
//   - 200 + "individual" → 20
//   - 200 + "doble"      → 20
//   - 200 + "suite"      → 42
//   - 0   + cualquier tipo → 0
// =====================================================
describe("calcularIva", () => {

});


// =====================================================
// TODO 3: Tests de calcularTotalConIva(importe, iva)
// Casos a cubrir:
//   - 267 + 26.7 → 293.7
//   - 100 + 21   → 121
//   - 0   + 0    → 0
// =====================================================
describe("calcularTotalConIva", () => {

});


// =====================================================
// TODO 4: Tests de esNochesValido(noches)
// Casos TRUE  → 1, 15, 30
// Casos FALSE → 0, -1, 31, 1.5, "hola", null
// =====================================================
describe("esNochesValido", () => {

});


// =====================================================
// TODO 5: Tests de formatearEuros(numero)
// Casos a cubrir:
//   - 25     → "25.00 €"
//   - 293.7  → "293.70 €"
//   - 0      → "0.00 €"
// =====================================================
describe("formatearEuros", () => {

});


// =====================================================
// TODO 6: Tests de calcularResumen(precioNoche, noches, tipoHabitacion)
// Casos a cubrir:
//   - 89, 3, "individual":
//       importe=267, iva=26.7, total=293.7
//     Pista: usa toBeCloseTo o toBe con los valores exactos
//   - noches inválidas (0 o 31) → lanza Error
//     "El número de noches no es válido (debe ser entre 1 y 30)."
// =====================================================
describe("calcularResumen", () => {

});
