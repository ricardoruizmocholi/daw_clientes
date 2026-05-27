// ⚠️ Intenta resolver ejercicio.test.js antes de consultar esta solución.

const {
  crearLineaPedido,
  calcularTotalLinea,
  calcularTotalPedido,
  calcularGastosEnvio,
  procesarPedido,
  calcularResumenPedidos
} = require("./funciones");


// ─────────────────────────────────────────────────────
describe("Integración: crearLineaPedido + calcularTotalLinea", () => {

  test("A — linea(15€ × 4) → totalLinea 60", () => {
    const linea = crearLineaPedido("Cuaderno A5", 15, 4);
    expect(calcularTotalLinea(linea)).toBe(60);
  });

  test("B — linea(9.99€ × 3) → 29.97 (toBeCloseTo)", () => {
    const linea = crearLineaPedido("Bolígrafo", 9.99, 3);
    expect(calcularTotalLinea(linea)).toBeCloseTo(29.97, 2);
  });

  test("C — cantidad=0 → lanza Error antes de calcular", () => {
    expect(() => {
      const linea = crearLineaPedido("Goma", 1.5, 0);
      calcularTotalLinea(linea);
    }).toThrow("cantidad");
  });

  test("D — nombre vacío → lanza Error", () => {
    expect(() => crearLineaPedido("", 10, 2)).toThrow("nombre");
  });
});


// ─────────────────────────────────────────────────────
describe("Integración: calcularTotalPedido + calcularGastosEnvio", () => {

  test("A — 2 líneas, total 60€ (>= 50) → envío gratis", () => {
    const lineas = [
      crearLineaPedido("Monitor", 50, 1),
      crearLineaPedido("Cable",   10, 1)
    ];
    const total = calcularTotalPedido(lineas); // 60
    expect(calcularGastosEnvio(total)).toBe(0);
  });

  test("B — 1 línea, total 30€ (< 50) → envío 5.99", () => {
    const lineas = [crearLineaPedido("Ratón", 30, 1)];
    const total  = calcularTotalPedido(lineas); // 30
    expect(calcularGastosEnvio(total)).toBeCloseTo(5.99, 2);
  });

  test("C — total 30€ + urgente → 9.99", () => {
    const lineas = [crearLineaPedido("Auriculares", 30, 1)];
    const total  = calcularTotalPedido(lineas);
    expect(calcularGastosEnvio(total, true)).toBeCloseTo(9.99, 2);
  });

  test("D — total 60€ + urgente → 4€ (envío base gratis + 4 urgente)", () => {
    const lineas = [crearLineaPedido("Tablet", 60, 1)];
    const total  = calcularTotalPedido(lineas);
    expect(calcularGastosEnvio(total, true)).toBe(4);
  });
});


// ─────────────────────────────────────────────────────
describe("Integración: procesarPedido (pipeline completo)", () => {

  test("A — 2 artículos, total >= 50, no urgente → objeto completo", () => {
    const datos = [
      { nombre: "Teclado", precio: 45, cantidad: 1 },
      { nombre: "Alfombrilla", precio: 15, cantidad: 1 }
    ]; // totalLineas = 60, gastosEnvio = 0, totalFinal = 60
    expect(procesarPedido(datos, false)).toEqual({
      totalLineas:  60,
      gastosEnvio:  0,
      totalFinal:   60,
      urgente:      false,
      numArticulos: 2
    });
  });

  test("B — 1 línea (total < 50), urgente → gastosEnvio 9.99", () => {
    const datos = [{ nombre: "USB Hub", precio: 20, cantidad: 1 }];
    // totalLineas = 20, gastosEnvio = 5.99 + 4 = 9.99, totalFinal = 29.99
    const resultado = procesarPedido(datos, true);
    expect(resultado.urgente).toBe(true);
    expect(resultado.gastosEnvio).toBeCloseTo(9.99, 2);
    expect(resultado.totalFinal).toBeCloseTo(29.99, 2);
  });

  test("C — precio negativo en datos → error de crearLineaPedido se propaga", () => {
    const datos = [{ nombre: "Producto roto", precio: -5, cantidad: 2 }];
    expect(() => procesarPedido(datos)).toThrow("precio");
  });

  test("D — array vacío → lanza Error 'al menos una línea'", () => {
    expect(() => procesarPedido([])).toThrow("al menos una línea");
  });
});


// ─────────────────────────────────────────────────────
describe("Integración: calcularResumenPedidos (estadísticas)", () => {

  test("A — 3 pedidos (2 normales + 1 urgente) → ResumenPedidos correcto", () => {
    // Pedido 1: totalLineas=100, gastosEnvio=0 → totalFinal=100 (no urgente)
    const p1 = procesarPedido([{ nombre: "Silla", precio: 100, cantidad: 1 }], false);
    // Pedido 2: totalLineas=60,  gastosEnvio=0 → totalFinal=60  (no urgente)
    const p2 = procesarPedido([{ nombre: "Lámpara", precio: 60, cantidad: 1 }], false);
    // Pedido 3: totalLineas=20,  gastosEnvio=9.99 → totalFinal=29.99 (urgente)
    const p3 = procesarPedido([{ nombre: "Enchufe", precio: 20, cantidad: 1 }], true);

    const resumen = calcularResumenPedidos([p1, p2, p3]);
    expect(resumen.totalPedidos).toBe(3);
    expect(resumen.pedidosUrgentes).toBe(1);
    expect(resumen.importeTotal).toBeCloseTo(189.99, 2);
    expect(resumen.mediaImporte).toBeCloseTo(63.33, 2);
  });

  test("B — 1 pedido → mediaImporte === totalFinal del pedido", () => {
    const p = procesarPedido([{ nombre: "Monitor 4K", precio: 350, cantidad: 1 }], false);
    const resumen = calcularResumenPedidos([p]);
    expect(resumen.mediaImporte).toBe(p.totalFinal);
  });

  test("C — array vacío → lanza Error 'No hay pedidos'", () => {
    expect(() => calcularResumenPedidos([])).toThrow("No hay pedidos");
  });
});
