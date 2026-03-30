/**
 * CONCEPTO: extends y super
 * - 'extends' establece la relación de herencia.
 * - 'super()' llama al constructor del padre.
 */
class Administrador extends Usuario {
    constructor(nombre, email, nivel) {
        // 1. Llamada obligatoria al padre antes de usar 'this'
        super(nombre, email); 
        
        // 2. Propiedades exclusivas de la clase hija
        this.nivel = nivel;
    }

    // Polimorfismo: Sobrescribimos un método del padre
    saludar() {
        console.log(`Acceso Total: Administrador ${this.nombre} (Nivel ${this.nivel})`);
    }

    borrarUsuario(id) {
        console.log(`Usuario ${id} eliminado por ${this.nombre}`);
    }
}

const admin1 = new Administrador("Ana", "admin@asir.com", 5);
admin1.saludar(); // Usa su propio método saludar
admin1.subirPuntos(10); // Usa el método heredado del padre (Usuario)