# Testing de Formulario de Registro con Jest

## ¿Qué es?
Proyecto que valida un formulario de registro (nombre, email, edad, contraseña, términos) con funciones puras testables, separando la lógica de validación (`formularioRegistro.js`) del DOM (`script.js`).

## Sintaxis esencial
```js
// Patrón de validación: devuelve string vacío si OK, mensaje si error
function validarNombre(nombre) {
  if (estaVacio(nombre)) return 'El nombre es obligatorio.';
  if (!tieneLongitudMinima(nombre, 3)) return 'Mínimo 3 caracteres.';
  return '';
}

// validarRegistro() agrupa todas las validaciones
function validarRegistro(datos) {
  const errores = {
    nombre: validarNombre(datos.nombre),
    email: validarEmail(datos.email),
    // ...
  };
  const esValido = Object.values(errores).every(e => e === '');
  return { esValido, errores, datosLimpios: { ... } };
}
```

## Ejemplo básico funcional
```js
// formularioRegistro.test.js
const F = require('./formularioRegistro');

describe('validarNombre', () => {
  test('nombre vacío devuelve error', () => {
    expect(F.validarNombre('')).toBe('El nombre es obligatorio.');
  });

  test('nombre corto devuelve error', () => {
    expect(F.validarNombre('ab')).toBe('El nombre debe tener al menos 3 caracteres.');
  });

  test('nombre válido devuelve cadena vacía', () => {
    expect(F.validarNombre('Ricardo')).toBe('');
  });
});

describe('validarRegistro completo', () => {
  test('datos válidos → esValido true', () => {
    const resultado = F.validarRegistro({
      nombre: 'Ricardo', email: 'r@test.com',
      edad: '25', password: 'abc123',
      repetirPassword: 'abc123', terminos: true
    });
    expect(resultado.esValido).toBe(true);
  });
});
```

## Errores comunes
- Comparar resultado de validación con `==` en el test → usa siempre `.toBe('')` para éxito, `.toBe('mensaje')` para error
- Olvidar testear `validarRegistro` como conjunto → los tests individuales no garantizan que la función compuesta funcione
- No testear `terminos: false` → es el error más olvidado y suele salir en el examen

## Para el examen recuerda
- El patrón de validación: función devuelve `''` si válido, `'mensaje de error'` si inválido
- `validarRegistro` devuelve `{ esValido, errores, datosLimpios }` — prueba las tres propiedades
- `emailValido` comprueba: sin espacios, con `@` en posición > 0, con `.` después del `@`
- `passwordsCoinciden` compara dos strings → cubre el caso donde coinciden Y donde no coinciden
