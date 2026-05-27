# 01 — Clase con Campos Privados

## En qué consiste
Implementar la clase `Producto` con encapsulación mediante `#campos` privados, validación en los setters y métodos de instancia (`restarStock`, `calcularPrecioFinal`).

---

## Sintaxis utilizada

### Declarar campos privados y constructor
```js
class Producto {
  // Los #campos deben declararse antes del constructor
  #nombre;
  #precio;
  #stock;
  #categoria;

  constructor(nombre, precio, stock, categoria) {
    // El constructor SIEMPRE llama a los setters, nunca asigna directo.
    // Así la validación se aplica también al crear el objeto.
    this.setNombre(nombre);
    this.setPrecio(precio);
    this.setStock(stock);
    this.setCategoria(categoria);
  }
}
```

### Getters — exponer datos de solo lectura
```js
getNombre()    { return this.#nombre; }
getPrecio()    { return this.#precio; }
getStock()     { return this.#stock; }
getCategoria() { return this.#categoria; }
```

### Setters — validar antes de guardar
```js
// Validar cadena de texto
setNombre(nombre) {
  if (typeof nombre !== "string" || nombre.trim() === "") {
    throw new Error("El nombre no puede estar vacío.");
  }
  this.#nombre = nombre.trim();
}

// Convertir a número y validar rango
setPrecio(precio) {
  const p = Number(precio);        // convierte "10" → 10
  if (isNaN(p) || p < 0) {
    throw new Error("El precio debe ser un número mayor o igual a 0.");
  }
  this.#precio = p;
}

// Validar entero
setStock(stock) {
  const s = Number(stock);
  if (!Number.isInteger(s) || s < 0) {
    throw new Error("El stock debe ser un entero mayor o igual a 0.");
  }
  this.#stock = s;
}
```

### Métodos de instancia
```js
// Retorna false si no hay suficiente stock (en vez de lanzar error)
restarStock(cantidad) {
  if (this.#stock < cantidad) return false;
  this.#stock -= cantidad;
  return true;
}

// Combina propiedades para calcular un resultado derivado
calcularPrecioFinal(descuento = 0) {
  return this.#precio * (1 - descuento / 100);
}
```

### Uso desde fuera de la clase
```js
const p = new Producto("Teclado", 45, 10, "periférico");
console.log(p.getNombre());         // "Teclado"
console.log(p.restarStock(3));      // true  → stock queda en 7
console.log(p.restarStock(20));     // false → no hay suficiente stock

// Los campos privados son inaccesibles desde fuera:
console.log(p.#precio);  // ❌ SyntaxError
```

---

## Conceptos clave aplicados

| Patrón | Para qué sirve |
|--------|---------------|
| `#campo` declarado arriba | Encapsula el dato; no se puede leer ni escribir desde fuera de la clase |
| Constructor llama setters | La validación se ejecuta siempre, también al crear el objeto con `new` |
| `Number(valor)` + `isNaN()` | Convierte strings a número y detecta entradas inválidas |
| `Number.isInteger()` | Comprueba que el número es entero (sin decimales) |
| `throw new Error("msg")` | Informa del error al código que llamó al setter |
| `typeof x !== "string"` | Comprueba el tipo antes de operar sobre el valor |
| Método devuelve `false` | Alternativa a `throw` cuando el fallo no es excepcional |

---

## Errores típicos en este ejercicio

```js
// ❌ MAL: asignar directo en el constructor
constructor(nombre) {
  this.#nombre = nombre; // saltamos la validación del setter
}

// ✅ BIEN: siempre a través del setter
constructor(nombre) {
  this.setNombre(nombre);
}

// ❌ MAL: usar _campo en vez de #campo
_precio = 0;  // convención antigua, accesible desde fuera

// ✅ BIEN: campo realmente privado
#precio;
```
