# Testing de Calculadora con Jest

## ¿Qué es?
Proyecto completo que separa la lógica de cálculo (`calculadora.js`) de la presentación (`script.js`) para poder testear las funciones matemáticas de forma independiente del navegador.

## Sintaxis esencial
```js
// calculadora.js — exportar para Node y navegador
const api = { sumar, restar, multiplicar, dividir, calcular };

if (typeof module !== 'undefined' && module.exports) {
  module.exports = api;
} else {
  global.Calculadora = api;
}

// calculadora.test.js — tests con Jest
const Calculadora = require('./calculadora');

describe('operaciones', () => {
  test('sumar', () => expect(Calculadora.sumar(2, 3)).toBe(5));
  test('dividir entre cero', () => {
    expect(() => Calculadora.dividir(8, 0)).toThrow('No se puede dividir entre cero.');
  });
});
```

## Ejemplo básico funcional
```js
// Test completo de la función calcular()
describe('Función calcular', () => {
  test('calcula correctamente una suma', () => {
    const resultado = Calculadora.calcular('2', '3', 'sumar');
    expect(resultado.numero1).toBe(2);
    expect(resultado.resultado).toBe(5);
    expect(resultado.simbolo).toBe('+');
    expect(resultado.resultadoFormateado).toBe('5');
  });

  test('lanza error si falta un número', () => {
    expect(() => Calculadora.calcular('', '3', 'sumar'))
      .toThrow('Debes introducir los dos números.');
  });
});
```

## Errores comunes
- Testear solo el caso feliz → añade siempre casos de error (vacío, texto, división por cero)
- `calcular` devuelve un objeto → comprueba cada propiedad con `expect(resultado.x).toBe(y)`
- `formatearResultado` con decimales → usa `toBe('3.3333')` no `toBe(3.333333...)` porque devuelve `string`

## Para el examen recuerda
- La función `calcular()` devuelve `{ numero1, numero2, operacion, simbolo, resultado, resultadoFormateado }`
- Testear validaciones: vacío, texto no numérico, operación inválida, división por cero
- Instalar Jest: `npm init -y` → `npm install --save-dev jest` → `"test": "jest"` en scripts
- Ejecutar: `npm test` (o `npm.cmd test` en Windows si el PATH no incluye npm)
