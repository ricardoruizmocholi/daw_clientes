/**
 * CONCEPTO: Visibilidad de Variables
 * 1. Públicas: Accesibles desde cualquier lugar.
 * 2. Protegidas (_): Convención para decir "no me toques", pero JS no las bloquea.
 * 3. Privadas (#): Sintaxis real de JS que da error si intentas leerlas fuera.
 */

class Producto {
    // Definición de campos privados (deben declararse arriba con #)
    #id; 

    constructor(id, nombre, precio, categoria) {
        this.#id = id;               // PRIVADA REAL (#)
        this.nombre = nombre;        // PÚBLICA (por defecto)
        this._precio = precio;       // PROTEGIDA (convención '_')
        this.categoria = categoria;  // PÚBLICA
    }

    // GETTER para leer la variable protegida con formato
    get precio() {
        return `${this._precio}€`;
    }

    // SETTER para validar la variable protegida
    set precio(nuevoPrecio) {
        if (nuevoPrecio >= 0) {
            this._precio = nuevoPrecio;
        } else {
            console.error("Precio no válido");
        }
    }

    // Método público que accede a la privada
    mostrarCodigoInterno() {
        // Dentro de la clase SÍ podemos leer #id
        return `ID Interno: ${this.#id}`;
    }
}

// --- PRUEBAS DE ACCESO ---
const raton = new Producto(101, "Logitech G", 50, "Periféricos");

// 1. Acceso a PÚBLICA: OK
console.log(raton.nombre); // "Logitech G"

// 2. Acceso a PROTEGIDA (_): OK (Pero no deberías hacerlo)
console.log(raton._precio); // 50 (JS lo permite porque es solo una convención)

// 3. Acceso a PRIVADA (#): ERROR
// console.log(raton.#id); // ❌ Uncaught SyntaxError: Private field '#id' must be declared...

// 4. Uso de GET/SET: OK
raton.precio = 60;        // Usa el SET
console.log(raton.precio); // "60€" (Usa el GET)

// 5. Ver la privada mediante un método público: OK
console.log(raton.mostrarCodigoInterno()); // "ID Interno: 101"