# 10 — Testing de Integración: Gestión de Pedidos

## En qué consiste
Pipeline más profundo que el ejercicio 09. La función `procesarPedido` llama **internamente** a `crearLineaPedido`, `calcularTotalPedido` y `calcularGastosEnvio`. Los tests verifican que el pipeline completo funciona, y que **un error en cualquier función interna sube hasta el test**.

---

## ¿Por qué este ejercicio es más difícil que el 09?

En el ejercicio 09 el test llama a las funciones en cadena explícitamente.  
Aquí `procesarPedido()` encapsula todo el pipeline — el test no puede observar los pasos intermedios, solo el resultado final.

```
Ejercicio 09 — el test ve cada paso:
  crearProducto() → agregarAlCarrito() → calcularSubtotal()

Ejercicio 10 — procesarPedido() oculta los pasos:
  procesarPedido(datos) → internamente llama a crearLineaPedido + calcularTotal + calcularEnvío
                        → el test solo ve el ResultadoPedido final
```

---

## Sintaxis utilizada

### Testear el objeto de resultado con toEqual
```js
test("pedido estándar → objeto ResultadoPedido correcto", () => {
  const datos = [
    { nombre: "Teclado", precio: 45, cantidad: 1 },
    { nombre: "Alfombrilla", precio: 15, cantidad: 1 }
  ];
  // totalLineas = 60, gastosEnvio = 0 (≥50€), totalFinal = 60

  expect(procesarPedido(datos, false)).toEqual({
    totalLineas:  60,
    gastosEnvio:  0,
    totalFinal:   60,
    urgente:      false,
    numArticulos: 2
  });
});
```

### toBeCloseTo para decimales en el envío
```js
test("total < 50€ + urgente → gastosEnvio 9.99", () => {
  const datos = [{ nombre: "USB Hub", precio: 20, cantidad: 1 }];
  const resultado = procesarPedido(datos, true);

  // 5.99 + 4 = 9.99 — puede tener imprecisión decimal
  expect(resultado.gastosEnvio).toBeCloseTo(9.99, 2);
  expect(resultado.totalFinal).toBeCloseTo(29.99, 2);
});
```

### Error interno que sube hasta el test
```js
test("precio negativo en datos: el error de crearLineaPedido sube hasta el test", () => {
  const datos = [{ nombre: "Producto roto", precio: -5, cantidad: 2 }];

  // procesarPedido llama internamente a crearLineaPedido(-5) que lanza Error.
  // Ese error no se captura dentro de procesarPedido → sube al test.
  expect(() => procesarPedido(datos)).toThrow("precio");
});
```

### Testear estadísticas agregadas
```js
test("resumen de 3 pedidos: 2 normales + 1 urgente", () => {
  // Primero procesar los pedidos (usar las funciones reales, no datos inventados)
  const p1 = procesarPedido([{ nombre: "Silla",  precio: 100, cantidad: 1 }], false);
  const p2 = procesarPedido([{ nombre: "Lámpara",precio: 60,  cantidad: 1 }], false);
  const p3 = procesarPedido([{ nombre: "Enchufe",precio: 20,  cantidad: 1 }], true);

  const resumen = calcularResumenPedidos([p1, p2, p3]);

  expect(resumen.totalPedidos).toBe(3);
  expect(resumen.pedidosUrgentes).toBe(1);
  expect(resumen.importeTotal).toBeCloseTo(189.99, 2);
  expect(resumen.mediaImporte).toBeCloseTo(63.33, 2);
});
```

### Verificar una propiedad concreta sin toEqual
```js
test("1 pedido → mediaImporte igual a su totalFinal", () => {
  const p = procesarPedido([{ nombre: "Monitor 4K", precio: 350, cantidad: 1 }]);
  const resumen = calcularResumenPedidos([p]);

  // No hace falta toEqual para todo el objeto; comprobamos solo lo relevante
  expect(resumen.mediaImporte).toBe(p.totalFinal);
  expect(resumen.totalPedidos).toBe(1);
});
```

---

## El pipeline completo en este ejercicio

```
datosLineas (array de objetos en bruto)
        ↓  procesarPedido() llama internamente a:
crearLineaPedido(nombre, precio, cantidad)  ← puede lanzar Error
        ↓
calcularTotalLinea(linea)  ← precio × cantidad
        ↓
calcularTotalPedido(lineas)  ← suma todas las líneas
        ↓
calcularGastosEnvio(total, urgente)  ← lógica de envío gratis / urgente
        ↓
return { totalLineas, gastosEnvio, totalFinal, urgente, numArticulos }
        ↓  calcularResumenPedidos([p1, p2, ...])
return { totalPedidos, importeTotal, pedidosUrgentes, mediaImporte }
```

---

## Matchers y patrones usados en este ejercicio

| Patrón | Dónde se aplica |
|--------|----------------|
| `toEqual({...})` | Comparar el objeto `ResultadoPedido` completo |
| `toBeCloseTo(n, 2)` | Gastos de envío con decimales (5.99, 9.99) |
| `toThrow("texto")` | Errores internos de `crearLineaPedido` que suben |
| `toBe` en propiedades aisladas | Cuando solo interesa verificar una propiedad |
| Usar `procesarPedido()` en el setup del bloque 4 | Los pedidos del resumen se generan con las funciones reales |

---

## Diferencias respecto al ejercicio 09

| | Ejercicio 09 — Carrito | Ejercicio 10 — Pedidos |
|---|---|---|
| Tipo de pipeline | Explícito: el test llama cada función | Encapsulado: `procesarPedido` contiene el pipeline |
| Estado compartido | `carrito[]` mutable con `beforeEach` | Sin estado mutable: `procesarPedido` es pura |
| Función de agregado | `calcularResumenCarrito` | `calcularResumenPedidos` |
| Regla de negocio extra | Descuento porcentual | Lógica de envío gratis / urgente |
