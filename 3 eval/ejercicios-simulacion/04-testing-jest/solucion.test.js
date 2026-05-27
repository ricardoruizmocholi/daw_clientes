// =====================================================
// SOLUCIÓN — Ejercicio 04 — Testing con Jest
// =====================================================
// ⚠️  Intenta resolver ejercicio.test.js antes de consultar esto.
// =====================================================

const { calcularIva, calcularDescuento, formatearPrecio, validarCantidad, calcularTotal } = require("./operaciones");

// =====================================================
// calcularIva
// =====================================================
describe("calcularIva", () => {
  test("21% sobre 100 devuelve 21", () => {
    expect(calcularIva(100, 21)).toBe(21);
  });

  test("10% sobre 200 devuelve 20", () => {
    expect(calcularIva(200, 10)).toBe(20);
  });

  test("0% sobre cualquier importe devuelve 0", () => {
    expect(calcularIva(500, 0)).toBe(0);
  });
});

// =====================================================
// calcularDescuento
// =====================================================
describe("calcularDescuento", () => {
  test("10% sobre 200 devuelve 20", () => {
    expect(calcularDescuento(200, 10)).toBe(20);
  });

  test("50% sobre 80 devuelve 40", () => {
    expect(calcularDescuento(80, 50)).toBe(40);
  });

  test("0% devuelve 0", () => {
    expect(calcularDescuento(100, 0)).toBe(0);
  });
});

// =====================================================
// formatearPrecio
// =====================================================
describe("formatearPrecio", () => {
  test("25.5 devuelve '25.50 €'", () => {
    expect(formatearPrecio(25.5)).toBe("25.50 €");
  });

  test("100 devuelve '100.00 €'", () => {
    expect(formatearPrecio(100)).toBe("100.00 €");
  });

  test("0 devuelve '0.00 €'", () => {
    expect(formatearPrecio(0)).toBe("0.00 €");
  });
});

// =====================================================
// validarCantidad
// =====================================================
describe("validarCantidad", () => {
  // Casos que devuelven TRUE
  test("1 es válido", () => {
    expect(validarCantidad(1)).toBe(true);
  });

  test("10 es válido", () => {
    expect(validarCantidad(10)).toBe(true);
  });

  // Casos que devuelven FALSE
  test("0 no es válido", () => {
    expect(validarCantidad(0)).toBe(false);
  });

  test("-1 no es válido", () => {
    expect(validarCantidad(-1)).toBe(false);
  });

  test("1.5 no es válido (decimal)", () => {
    expect(validarCantidad(1.5)).toBe(false);
  });

  test("texto no es válido", () => {
    expect(validarCantidad("hola")).toBe(false);
  });
});

// =====================================================
// calcularTotal
// =====================================================
describe("calcularTotal", () => {
  test("100 x 2 unidades sin descuento con IVA 21% → 242", () => {
    // subtotal=200, descuento=0, iva de 200=42 → total=242
    expect(calcularTotal(100, 2, 0, 21)).toBe(242);
  });

  test("100 x 2 unidades con 10% descuento y 21% IVA → 217.8", () => {
    // subtotal=200, descuento=20, base_iva=180, iva=37.8 → total=217.8
    expect(calcularTotal(100, 2, 10, 21)).toBeCloseTo(217.8, 5);
  });

  test("cantidad 0 lanza error", () => {
    expect(() => calcularTotal(100, 0, 0, 21))
      .toThrow("La cantidad debe ser un número entero mayor que 0.");
  });

  test("cantidad -1 lanza error", () => {
    expect(() => calcularTotal(100, -1, 0, 21))
      .toThrow("La cantidad debe ser un número entero mayor que 0.");
  });

  test("cantidad decimal lanza error", () => {
    expect(() => calcularTotal(100, 1.5, 0, 21))
      .toThrow("La cantidad debe ser un número entero mayor que 0.");
  });
});
