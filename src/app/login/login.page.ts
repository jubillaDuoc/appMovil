import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  correo: string = '';
  contrasena: string = '';
  rol: string = '';

  constructor(private router: Router, private appComponent: AppComponent) { }

  navigate(){
    this.router.navigate(['/home'])
  }

  ngOnInit() {
  }

  iniciarSesion() {
    // Verifica las credenciales (ejemplo: juanitoperez / juanito123 y pedromarmol / pedro123)
    if (this.correo === this.appComponent.alumnoUser.correo &&
        this.contrasena === this.appComponent.alumnoUser.clave) {
      // Usuario es Juanito Pérez, redirige a la vista de alumnos
      const navigationExtras: NavigationExtras = {
        state: {
          nombre: this.appComponent.alumnoUser.nombre,
          apellido: this.appComponent.alumnoUser.apellido,
          correo: this.appComponent.alumnoUser.correo,
          rol: this.appComponent.alumnoUser.rol,
        },
      };
      this.router.navigate([`/alumnos`], navigationExtras);
    } else if (this.correo === this.appComponent.profesorUser.correo &&
               this.contrasena === this.appComponent.profesorUser.clave) {
      // Usuario es Pedro Mármol, redirige a la vista de profesores
      const navigationExtras: NavigationExtras = {
        state: {
          nombre: this.appComponent.profesorUser.nombre,
          apellido: this.appComponent.profesorUser.apellido,
          correo: this.appComponent.profesorUser.correo,
          rol: this.appComponent.profesorUser.rol,
        },
      };
      this.router.navigate([`/profesor`], navigationExtras);
    } else {
      // Credenciales incorrectas, muestra un mensaje de error o maneja de otra manera.
      console.log('Credenciales incorrectas');
      return;
    }
  }

}

