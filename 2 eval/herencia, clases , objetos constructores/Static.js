/**
 * CONCEPTO: static
 * - Se acceden directamente desde el nombre de la Clase.
 * - No pueden usar 'this' (porque no hay objeto instanciado).
 */
class Validador {
    static esEmailValido(email) {
        return email.includes("@");
    }

    static compararPrecios(p1, p2) {
        return p1.precio - p2.precio;
    }
}

// No hacemos: const v = new Validador();
// Usamos directamente la clase:
console.log(Validador.esEmailValido("test@web.com")); // true