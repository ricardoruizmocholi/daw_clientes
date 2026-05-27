// ⚠️ Intenta resolver ejercicio.test.js antes de consultar esta solución.

const {
  crearProducto,
  agregarAlCarrito,
  calcularSubtotal,
  aplicarDescuento,
  calcularResumenCarrito
} = require("./funciones");

// ─────────────────────────────────────────────────────
describe("Integración: crearProducto + agregarAlCarrito", () => {
  let carrito;

  beforeEach(() => { carrito = []; });

  test("A — añadir un producto nuevo: 1 línea con cantidad correcta", () => {
    const laptop = crearProducto("Laptop", 1200, 5);
    agregarAlCarrito(carrito, laptop, 2);
    expect(carrito).toHaveLength(1);
    expect(carrito[0].cantidad).toBe(2);
    expect(carrito[0].producto.nombre).toBe("Laptop");
  });

  test("B — añadir el mismo producto dos veces: acumula cantidad en 1 línea", () => {
    const mouse = crearProducto("Mouse", 25, 10);
    agregarAlCarrito(carrito, mouse, 3);
    agregarAlCarrito(carrito, mouse, 2);
    expect(carrito).toHaveLength(1);
    expect(carrito[0].cantidad).toBe(5);
  });

  test("C — cantidad > stock: lanza Error 'Stock insuficiente'", () => {
    const usb = crearProducto("USB Hub", 30, 2);
    expect(() => agregarAlCarrito(carrito, usb, 5)).toThrow("Stock insuficiente");
  });

  test("D — precio negativo en crearProducto: lanza Error antes de agregar", () => {
    expect(() => {
      const prod = crearProducto("Teclado", -50, 10);
      agregarAlCarrito(carrito, prod, 1);
    }).toThrow("precio");
    expect(carrito).toHaveLength(0); // el carrito sigue vacío
  });
});


// ─────────────────────────────────────────────────────
describe("Integración: agregarAlCarrito + calcularSubtotal", () => {
  let carrito;

  beforeEach(() => { carrito = []; });

  test("A — 1 producto (10€ × 3) → subtotal 30", () => {
    const prod = crearProducto("Cuaderno", 10, 20);
    agregarAlCarrito(carrito, prod, 3);
    expect(calcularSubtotal(carrito)).toBe(30);
  });

  test("B — 2 productos distintos → subtotal correcto", () => {
    const a = crearProducto("Bolígrafo", 2, 50);
    const b = crearProducto("Carpeta",   8, 20);
    agregarAlCarrito(carrito, a, 5); // 10
    agregarAlCarrito(carrito, b, 3); // 24
    expect(calcularSubtotal(carrito)).toBe(34);
  });

  test("C — carrito vacío → subtotal 0", () => {
    expect(calcularSubtotal(carrito)).toBe(0);
  });
});


// ─────────────────────────────────────────────────────
describe("Integración: calcularSubtotal + aplicarDescuento", () => {
  let carrito;

  beforeEach(() => {
    carrito = [];
    // Carrito con subtotal = 200 (1 producto de 100€ × 2)
    const prod = crearProducto("Monitor", 100, 10);
    agregarAlCarrito(carrito, prod, 2);
  });

  test("A — subtotal 200€ con 10% descuento → 180", () => {
    const subtotal = calcularSubtotal(carrito);
    expect(aplicarDescuento(subtotal, 10)).toBe(180);
  });

  test("B — descuento 0% → total igual al subtotal", () => {
    const subtotal = calcularSubtotal(carrito);
    expect(aplicarDescuento(subtotal, 0)).toBe(subtotal);
  });

  test("C — descuento 100% → total 0", () => {
    const subtotal = calcularSubtotal(carrito);
    expect(aplicarDescuento(subtotal, 100)).toBe(0);
  });

  test("D — porcentaje 150 → lanza Error", () => {
    const subtotal = calcularSubtotal(carrito);
    expect(() => aplicarDescuento(subtotal, 150)).toThrow("porcentaje");
  });
});


// ─────────────────────────────────────────────────────
describe("Integración: flujo completo → calcularResumenCarrito", () => {
  let carrito;

  beforeEach(() => { carrito = []; });

  test("A — 2 productos + 15% descuento → objeto ResumenCarrito correcto", () => {
    const a = crearProducto("Auriculares", 80, 10);
    const b = crearProducto("Funda",       20, 15);
    agregarAlCarrito(carrito, a, 1); // 80
    agregarAlCarrito(carrito, b, 2); // 40  → subtotal = 120
    // total = 120 * 0.85 = 102, totalArticulos = 3
    expect(calcularResumenCarrito(carrito, 15)).toEqual({
      subtotal: 120,
      descuento: 15,
      total: 102,
      totalArticulos: 3
    });
  });

  test("B — carrito vacío → lanza Error 'carrito está vacío'", () => {
    expect(() => calcularResumenCarrito(carrito)).toThrow("vacío");
  });

  test("C — sin descuento → total === subtotal", () => {
    const prod = crearProducto("Tablet", 350, 5);
    agregarAlCarrito(carrito, prod, 1);
    const resumen = calcularResumenCarrito(carrito);
    expect(resumen.total).toBe(resumen.subtotal);
  });

  test("D — totalArticulos suma todas las unidades de todas las líneas", () => {
    const a = crearProducto("Cable HDMI", 15, 20);
    const b = crearProducto("Adaptador",  10, 20);
    agregarAlCarrito(carrito, a, 3);
    agregarAlCarrito(carrito, b, 5);
    const resumen = calcularResumenCarrito(carrito);
    expect(resumen.totalArticulos).toBe(8);
  });
});
