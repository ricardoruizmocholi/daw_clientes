// =====================================================
// Simulacro 08 — PARTE TESTING (tiempo: ~25 min)
// =====================================================
// Instrucciones:
//   1. cd testing
//   2. npm install
//   3. npm test
//
// Las funciones están en funciones.js.
// Escribe al menos 3 tests por cada describe().
// =====================================================

const {
  calcularTiempoEstimado,
  calcularCosteAtencion,
  esTituloValido,
  formatearTiempo,
  esDescripcionValida,
  calcularResumenTiempos
} = require("./funciones");

// =====================================================
// TODO 1: Tests de calcularTiempoEstimado(prioridad)
// Regla: critica→1h, alta→4h, media→8h, baja→24h
// Casos a cubrir:
//   - "critica" → 1
//   - "alta"    → 4
//   - "media"   → 8
//   - "baja"    → 24
//   - valor desconocido ("urgente") → 24 (valor por defecto)
// =====================================================
describe("calcularTiempoEstimado", () => {

});


// =====================================================
// TODO 2: Tests de calcularCosteAtencion(horas, tarifaHora)
// Casos a cubrir:
//   - 4 horas a 50 €/h → 200
//   - 1 hora  a 75 €/h → 75
//   - 0 horas a cualquier tarifa → 0
// =====================================================
describe("calcularCosteAtencion", () => {

});


// =====================================================
// TODO 3: Tests de esTituloValido(titulo)
// Válido (TRUE):  "Error de red" (10 chars), "PC" → FALSE (solo 2)
// Casos TRUE:  "Error de red", "Fallo crítico sistema"
// Casos FALSE: "ab" (muy corto), "" (vacío), 123 (no string)
// =====================================================
describe("esTituloValido", () => {

});


// =====================================================
// TODO 4: Tests de formatearTiempo(horas)
// Casos a cubrir:
//   - 1    → "1 hora"
//   - 4    → "4 horas"
//   - 24   → "24 horas"
//   - 0.5  → "30 min"
// =====================================================
describe("formatearTiempo", () => {

});


// =====================================================
// TODO 5: Tests de esDescripcionValida(descripcion)
// Válido: mínimo 10 caracteres (después de trim)
// Casos TRUE:  "El servidor no responde desde las 9h"
// Casos FALSE: "Falla" (solo 5), "" (vacío), null (no string)
// =====================================================
describe("esDescripcionValida", () => {

});


// =====================================================
// TODO 6: Tests de calcularResumenTiempos(prioridad, tarifaHora)
// Casos a cubrir:
//   - "alta", 50  → { tiempoEstimado: 4, coste: 200, descripcionTiempo: "4 horas" }
//   - "critica", 80 → { tiempoEstimado: 1, coste: 80, descripcionTiempo: "1 hora" }
//   - tarifaHora negativa (-10) → lanza Error
//     "La tarifa por hora no puede ser negativa."
// Pista: usa toEqual para comparar el objeto completo
// =====================================================
describe("calcularResumenTiempos", () => {

});
