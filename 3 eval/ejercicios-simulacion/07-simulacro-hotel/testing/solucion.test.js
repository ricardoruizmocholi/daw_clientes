// ⚠️ Intenta resolver ejercicio.test.js antes de consultar esta solución.
const {
  calcularImporte, calcularIva, calcularTotalConIva,
  esNochesValido, formatearEuros, calcularResumen
} = require("./funciones");

describe("calcularImporte", () => {
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

describe("calcularIva", () => {
  test("individual: 10% sobre 200 → 20", () => {
    expect(calcularIva(200, "individual")).toBe(20);
  });
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

describe("formatearEuros", () => {
  test("25 → '25.00 €'",    () => expect(formatearEuros(25)).toBe("25.00 €"));
  test("293.7 → '293.70 €'",() => expect(formatearEuros(293.7)).toBe("293.70 €"));
  test("0 → '0.00 €'",      () => expect(formatearEuros(0)).toBe("0.00 €"));
});

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
