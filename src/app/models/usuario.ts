export class Usuario {
    nombre: string;
    apellido: string;
    correo: string;
    clave: string;
    rol: string;
  
    constructor(
          nombre: string,
          apellido: string,
          correo: string,
          clave: string,
          rol: string,
          ) {
      this.nombre = nombre;
      this.apellido = apellido;
      this.correo = correo;
      this.clave = clave;
      this.rol = rol;
    }
  }