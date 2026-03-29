/**
 * CONCEPTO: Definición de Clase
 * - Siempre empieza con mayúscula (convención).
 * - El constructor es obligatorio si quieres pasar datos al crear el objeto.
 */
class Usuario {
    constructor(nombre, email) {
        this.nombre = nombre; // Propiedad
        this.email = email;   // Propiedad
        this.puntos = 0;      // Propiedad por defecto
    }

    // Método: define qué puede HACER el objeto
    saludar() {
        console.log(`Hola, soy ${this.nombre}`);
    }

    subirPuntos(cantidad) {
        this.puntos += cantidad;
    }
}

// INSTANCIACIÓN: Crear el objeto real
const usuario1 = new Usuario("Ricardo", "ricardo@correo.com");
usuario1.saludar(); // Imprime: Hola, soy Ricardo