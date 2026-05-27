# 09 — Testing de Integración: Carrito de Compras

## En qué consiste
Testear cómo las funciones del módulo de carrito trabajan **en cadena**: la salida de `crearProducto` alimenta a `agregarAlCarrito`, cuya salida alimenta a `calcularSubtotal`, que alimenta a `aplicarDescuento`, y todo culmina en `calcularResumenCarrito`.

---

## Tests unitarios vs. tests de integración

```
TEST UNITARIO            TEST DE INTEGRACIÓN
─────────────────        ──────────────────────────────────────────
Testa 1 función          Testa el pipeline de varias funciones
Entrada fija             La salida de A es la entrada de B
No depende de otras      Si cualquier función del pipeline falla → falla el test
expect(fn(x)).toBe(y)    crearProducto → agregarAlCarrito → calcularSubtotal → expect
```

---

## Sintaxis utilizada

### beforeEach — resetear el estado compartido entre tests
```js
describe("Integración: agregarAlCarrito + calcularSubtotal", () => {
  let carrito;

  // Se ejecuta ANTES de cada test de este bloque
  beforeEach(() => {
    carrito = [];  // el carrito empieza vacío en cada test
  });

  test("1 producto → subtotal correcto", () => {
    const prod = crearProducto("Ratón", 25, 10);
    agregarAlCarrito(carrito, prod, 2);
    expect(calcularSubtotal(carrito)).toBe(50);
  });

  // El carrito de este test NO está contaminado por el anterior
  test("carrito vacío → subtotal 0", () => {
    expect(calcularSubtotal(carrito)).toBe(0);
  });
});
```

### Testear el pipeline completo
```js
test("flujo completo con descuento", () => {
  // 1. Crear objetos válidos con la función de creación
  const laptop = crearProducto("Laptop", 1000, 5);
  const mouse  = crearProducto("Mouse", 50, 20);

  // 2. Añadir al carrito (el carrito se mutó)
  agregarAlCarrito(carrito, laptop, 1);  // 1000
  agregarAlCarrito(carrito, mouse, 2);   //  100 → subtotal = 1100

  // 3. Calcular subtotal (usa el carrito mutado)
  const subtotal = calcularSubtotal(carrito);  // 1100

  // 4. Aplicar descuento sobre ese subtotal
  const total = aplicarDescuento(subtotal, 10);  // 1100 * 0.90 = 990

  expect(total).toBe(990);
});
```

### toEqual — comparar el objeto resumen completo
```js
test("calcularResumenCarrito devuelve objeto correcto", () => {
  agregarAlCarrito(carrito, crearProducto("Teclado", 80, 10), 1);
  agregarAlCarrito(carrito, crearProducto("Monitor", 120, 5), 1);
  // subtotal = 200, descuento = 20%, total = 160, totalArticulos = 2

  expect(calcularResumenCarrito(carrito, 20)).toEqual({
    subtotal: 200,
    descuento: 20,
    total: 160,
    totalArticulos: 2
  });
  // toEqual compara PROPIEDAD A PROPIEDAD — necesario para objetos
  // toBe fallaría porque compararía por referencia de memoria
});
```

### toHaveLength — comprobar tamaño de arrays
```js
test("añadir mismo producto dos veces acumula en 1 línea", () => {
  const prod = crearProducto("Auriculares", 60, 20);
  agregarAlCarrito(carrito, prod, 3);
  agregarAlCarrito(carrito, prod, 2);

  expect(carrito).toHaveLength(1);          // sigue siendo 1 línea
  expect(carrito[0].cantidad).toBe(5);      // cantidad acumulada
});
```

### Testear que los errores se propagan entre funciones
```js
test("error en crearProducto impide llegar a agregarAlCarrito", () => {
  expect(() => {
    const prod = crearProducto("USB", -5, 10);  // ← lanza Error aquí
    agregarAlCarrito(carrito, prod, 1);          // ← nunca se ejecuta
  }).toThrow("precio");

  // Verificar que el carrito sigue vacío (el error cortó el flujo)
  expect(carrito).toHaveLength(0);
});
```

---

## Matchers utilizados en este ejercicio

| Matcher | Cuándo usarlo |
|---------|--------------|
| `toBe(valor)` | Primitivos: números, strings, booleanos |
| `toEqual(objeto)` | Objetos y arrays — comparación por valor |
| `toHaveLength(n)` | Verificar longitud de array o string |
| `toBeCloseTo(n, decimales)` | Decimales con posible imprecisión de punto flotante |
| `toThrow("mensaje")` | Verificar que se lanza un Error con ese texto |
| `expect(() => ...).toThrow()` | La función que lanza va dentro de una arrow function |

---

## Las 4 funciones del pipeline y qué integración testa cada bloque

```
crearProducto(nombre, precio, stock)
        ↓  Bloque 1
agregarAlCarrito(carrito, producto, cantidad)
        ↓  Bloque 2
calcularSubtotal(carrito)
        ↓  Bloque 3
aplicarDescuento(subtotal, porcentaje)
        ↓  Bloque 4
calcularResumenCarrito(carrito, descuento) → { subtotal, descuento, total, totalArticulos }
```
