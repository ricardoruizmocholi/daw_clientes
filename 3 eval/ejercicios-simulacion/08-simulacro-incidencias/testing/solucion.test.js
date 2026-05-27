// ⚠️ Intenta resolver ejercicio.test.js antes de consultar esta solución.
const {
  calcularTiempoEstimado, calcularCosteAtencion, esTituloValido,
  formatearTiempo, esDescripcionValida, calcularResumenTiempos
} = require("./funciones");

describe("calcularTiempoEstimado", () => {
  test("critica → 1",  () => expect(calcularTiempoEstimado("critica")).toBe(1));
  test("alta → 4",     () => expect(calcularTiempoEstimado("alta")).toBe(4));
  test("media → 8",    () => expect(calcularTiempoEstimado("media")).toBe(8));
  test("baja → 24",    () => expect(calcularTiempoEstimado("baja")).toBe(24));
  test("valor desconocido → 24", () => expect(calcularTiempoEstimado("urgente")).toBe(24));
});

describe("calcularCosteAtencion", () => {
  test("4 horas a 50 €/h → 200",  () => expect(calcularCosteAtencion(4, 50)).toBe(200));
  test("1 hora  a 75 €/h → 75",   () => expect(calcularCosteAtencion(1, 75)).toBe(75));
  test("0 horas → 0",             () => expect(calcularCosteAtencion(0, 50)).toBe(0));
});

describe("esTituloValido", () => {
  test("'Error de red' es válido",           () => expect(esTituloValido("Error de red")).toBe(true));
  test("'Fallo crítico sistema' es válido",  () => expect(esTituloValido("Fallo crítico sistema")).toBe(true));
  test("'ab' (2 chars) no es válido",        () => expect(esTituloValido("ab")).toBe(false));
  test("string vacío no es válido",          () => expect(esTituloValido("")).toBe(false));
  test("número no es válido",                () => expect(esTituloValido(123)).toBe(false));
});

describe("formatearTiempo", () => {
  test("1 → '1 hora'",     () => expect(formatearTiempo(1)).toBe("1 hora"));
  test("4 → '4 horas'",    () => expect(formatearTiempo(4)).toBe("4 horas"));
  test("24 → '24 horas'",  () => expect(formatearTiempo(24)).toBe("24 horas"));
  test("0.5 → '30 min'",   () => expect(formatearTiempo(0.5)).toBe("30 min"));
});

describe("esDescripcionValida", () => {
  test("descripción larga es válida",    () => expect(esDescripcionValida("El servidor no arranca desde las 9h")).toBe(true));
  test("'Falla' (5 chars) no es válido", () => expect(esDescripcionValida("Falla")).toBe(false));
  test("string vacío no es válido",      () => expect(esDescripcionValida("")).toBe(false));
  test("null no es válido",              () => expect(esDescripcionValida(null)).toBe(false));
});

describe("calcularResumenTiempos", () => {
  test("alta, 50 → objeto correcto", () => {
    expect(calcularResumenTiempos("alta", 50))
      .toEqual({ tiempoEstimado: 4, coste: 200, descripcionTiempo: "4 horas" });
  });
  test("critica, 80 → objeto correcto", () => {
    expect(calcularResumenTiempos("critica", 80))
      .toEqual({ tiempoEstimado: 1, coste: 80, descripcionTiempo: "1 hora" });
  });
  test("tarifa negativa lanza error", () => {
    expect(() => calcularResumenTiempos("media", -10))
      .toThrow("La tarifa por hora no puede ser negativa.");
  });
});
