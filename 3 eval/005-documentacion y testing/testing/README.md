# Testing con Jest — Guía de Referencia

## ¿Qué es?
Jest es un framework de testing para JavaScript que permite escribir pruebas unitarias y de integración. Se ejecuta en Node.js y verifica automáticamente que las funciones devuelven los valores esperados.

## Sintaxis esencial
```js
// Estructura de un archivo .test.js
const Modulo = require('./miArchivo');

describe('Nombre del grupo', () => {

  // Código que se ejecuta antes de cada test
  beforeEach(() => { /* reset de estado */ });

  test('descripción del comportamiento', () => {
    expect(Modulo.funcion(entrada)).toBe(salidaEsperada);
  });

  it('lanza error cuando...', () => {
    expect(() => Modulo.funcion(entradaInvalida)).toThrow('Mensaje de error');
  });
});
```

## Ejemplo básico funcional
```js
// suma.test.js
const { sumar, dividir } = require('./calculadora');

describe('operaciones básicas', () => {
  test('2 + 3 es 5', () => {
    expect(sumar(2, 3)).toBe(5);
  });

  test('dividir entre cero lanza error', () => {
    expect(() => dividir(8, 0)).toThrow('No se puede dividir entre cero.');
  });
});

// Ejecutar: npm test
```

## Errores comunes
- Usar `toBe` con objetos → compara por referencia (falla); usa `toEqual` para comparar por valor
- Olvidar `() =>` al testear funciones que lanzan error → `expect(funcion())` evalúa ya; debe ser `expect(() => funcion())`
- No poner el `"test": "jest"` en `scripts` de package.json → `npm test` dice "missing script"

## Para el examen recuerda
- `toBe` → igualdad estricta (`===`) para primitivos
- `toEqual` → comparación profunda para objetos y arrays
- `toThrow('mensaje')` → verifica que se lanza un error con ese mensaje
- `beforeEach` → se ejecuta antes de cada `test/it` del bloque
- `describe` es opcional pero agrupa los tests de una misma función

---

## Tests de integración — lo nuevo en los ejercicios 09 y 10

Los tests de integración usan la misma sintaxis Jest, pero prueban **pipelines** de funciones:

```js
// En integración el test encadena varias funciones reales
describe("Pipeline carrito", () => {
  let carrito;

  beforeEach(() => { carrito = []; });  // ← imprescindible para aislar los tests

  test("crear → añadir → subtotal → descuento", () => {
    // Cada función recibe la salida de la anterior
    const prod  = crearProducto("Ratón", 25, 10);
    agregarAlCarrito(carrito, prod, 4);             // subtotal = 100
    const base  = calcularSubtotal(carrito);
    const total = aplicarDescuento(base, 10);       // 100 * 0.90 = 90
    expect(total).toBe(90);
  });
});
```

### Matchers que aparecen en integración y no en unitario

```js
// toHaveLength — tamaño de array
expect(carrito).toHaveLength(1);

// toBeCloseTo — decimales (p.ej. 5.99 + 4 = 9.99)
expect(resultado.gastosEnvio).toBeCloseTo(9.99, 2);

// toEqual — objeto de resumen completo
expect(calcularResumenCarrito(carrito, 20)).toEqual({
  subtotal: 200, descuento: 20, total: 160, totalArticulos: 3
});

// Verificar que el estado NO cambió tras un error
expect(() => agregarAlCarrito(carrito, prod, 999)).toThrow("Stock insuficiente");
expect(carrito).toHaveLength(0);  // el carrito sigue vacío
```

**Subcarpetas con ejercicios:**
- [`calculadora_con_testing/`](calculadora_con_testing/) — testing unitario de operaciones matemáticas
- [`formularionConTesting/`](formularionConTesting/) — testing unitario de validaciones de formulario
- [Ejercicio 09 — integración carrito](../../ejercicios-simulacion/09-testing-integracion-carrito/)
- [Ejercicio 10 — integración pedidos](../../ejercicios-simulacion/10-testing-integracion-pedidos/)
