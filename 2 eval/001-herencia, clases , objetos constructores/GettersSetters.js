/**
 * CONCEPTO: Get (Leer) y Set (Escribir)
 * - Permiten validar datos antes de guardarlos.
 * - Se usan como si fueran variables normales (sin paréntesis).
 */
class Producto {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this._precio = precio; // El '_' indica que es "privada" por convención
    }

    // Getter: transforma el dato al leerlo
    get precio() {
        return `${this._precio}€`;
    }

    // Setter: valida el dato al escribirlo
    set precio(nuevoPrecio) {
        if (nuevoPrecio < 0) {
            console.error("El precio no puede ser negativo");
        } else {
            this._precio = nuevoPrecio;
        }
    }
}

const raton = new Producto("Ratón Gaming", 25);
raton.precio = -10; // Salta el error del SET
console.log(raton.precio); // Salta el GET y añade el símbolo '€'