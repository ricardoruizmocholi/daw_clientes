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
