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
  test("89 x 3 noches → 267", () => {
    expect(calcularImporte(89, 3)).toBe(267);
  });
  test("129 x 1 noche → 129", () => {
    expect(calcularImporte(129, 1)).toBe(129);
  });
  test("249 x 7 noches → 1743", () => {
    expect(calcularImporte(249, 7)).toBe(1743);
  });
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
  test("individula: 10% sobre 200 -> 20",()=>{
    expect(calcularIva(200,"individula")).toBe(20);
  })
   test("doble: 10% sobre 200 → 20", () => {
    expect(calcularIva(200, "doble")).toBe(20);
  });
  test("suite: 21% sobre 200 → 42", () => {
    expect(calcularIva(200, "suite")).toBe(42);
  });
  test("importe 0 → IVA 0", () => {
    expect(calcularIva(0, "suite")).toBe(0);
  });

});


// =====================================================
// TODO 3: Tests de calcularTotalConIva(importe, iva)
// Casos a cubrir:
//   - 267 + 26.7 → 293.7
//   - 100 + 21   → 121
//   - 0   + 0    → 0
// =====================================================
describe("calcularTotalConIva", () => {
   test("267 + 26.7 → 293.7", () => {
    expect(calcularTotalConIva(267, 26.7)).toBeCloseTo(293.7);
  });
  test("100 + 21 → 121", () => {
    expect(calcularTotalConIva(100, 21)).toBe(121);
  });
  test("0 + 0 → 0", () => {
    expect(calcularTotalConIva(0, 0)).toBe(0);
  });

});


// =====================================================
// TODO 4: Tests de esNochesValido(noches)
// Casos TRUE  → 1, 15, 30
// Casos FALSE → 0, -1, 31, 1.5, "hola", null
// =====================================================
describe("esNochesValido", () => {
  test("1 es válido",  () => expect(esNochesValido(1)).toBe(true));
  test("15 es válido", () => expect(esNochesValido(15)).toBe(true));
  test("30 es válido", () => expect(esNochesValido(30)).toBe(true));
  test("0 no es válido",   () => expect(esNochesValido(0)).toBe(false));
  test("-1 no es válido",  () => expect(esNochesValido(-1)).toBe(false));
  test("31 no es válido",  () => expect(esNochesValido(31)).toBe(false));
  test("1.5 no es válido", () => expect(esNochesValido(1.5)).toBe(false));
  test("texto no es válido", () => expect(esNochesValido("hola")).toBe(false));

});


// =====================================================
// TODO 5: Tests de formatearEuros(numero)
// Casos a cubrir:
//   - 25     → "25.00 €"
//   - 293.7  → "293.70 €"
//   - 0      → "0.00 €"
// =====================================================
describe("formatearEuros", () => {
  test("25 → '25.00 €'",    () => expect(formatearEuros(25)).toBe("25.00 €"));
  test("293.7 → '293.70 €'",() => expect(formatearEuros(293.7)).toBe("293.70 €"));
  test("0 → '0.00 €'",      () => expect(formatearEuros(0)).toBe("0.00 €"));

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
   
  test("89 x 3 individual → { importe:267, iva:26.7, total:293.7 }", () => {
    const r = calcularResumen(89, 3, "individual");
    expect(r.importe).toBe(267);
    expect(r.iva).toBeCloseTo(26.7);
    expect(r.total).toBeCloseTo(293.7);
  });

  test("249 x 2 suite → { importe:498, iva:104.58, total:602.58 }", () => {
    const r = calcularResumen(249, 2, "suite");
    expect(r.importe).toBe(498);
    expect(r.iva).toBeCloseTo(104.58);
    expect(r.total).toBeCloseTo(602.58);
  });

  test("noches=0 lanza error", () => {
    expect(() => calcularResumen(89, 0, "individual"))
      .toThrow("El número de noches no es válido (debe ser entre 1 y 30).");
  });

  test("noches=31 lanza error", () => {
    expect(() => calcularResumen(89, 31, "individual"))
      .toThrow("El número de noches no es válido (debe ser entre 1 y 30).");
  });


});
