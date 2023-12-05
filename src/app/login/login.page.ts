import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AppComponent } from '../app.component';
import { ApiauthService } from '../services/apiauth.service';
import { ToastController } from '@ionic/angular';
import { AnimationController } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  correo: string = '';
  contrasena: string = '';
  rol: string = '';

  tokenlogin: string = '';
  rolusuario: string = '';

  constructor(
    private authService: ApiauthService,
    private router: Router,
    private appComponent: AppComponent,
    public toastController: ToastController,
    private animationCtrl: AnimationController,
    private testObject: ApiauthService
  ) { }

  ngOnInit() {
  }

  iniciarSesion() {
    // Verifica las credenciales (ejemplo: juanitoperez / juanito123 y pedromarmol / pedro123)
    this.authService.login(this.correo, this.contrasena).subscribe(
      (response) => {
        // Manejar la respuesta de la función login aquí, si es necesario.
        console.log('Inicio de sesión exitoso:', response);
        this.rolusuario = response[0].rol;
        console.log(this.rolusuario);

        const navigationExtras: NavigationExtras = {
          state: {
            nombre: this.authService.getNombre(),
            apellido: this.authService.getApellido(),
            correo: this.correo,
            rol: this.rolusuario,
          },
        };

        //Deje en true el autenticar.
        //SETDATA AL GUARD rol: string = '';

        if (this.rolusuario === 'Alumno') {
          console.log('Redirigir a alumno');
          this.router.navigate(['/alumnos'], navigationExtras);
        } else if (this.rolusuario === 'Docente') {
          console.log('Redirigir a profesor');
          this.router.navigate(['/profesor'], navigationExtras);
        } else {
          console.log('Credenciales Incorrectas');
          this.presentToast('Credenciales incorrectas');
        }
      },
      (error) => {
        console.error('Error en la autenticación:', error);
        this.presentToast('Error en la autenticación');
      }
    );
  }

  async presentToast(message: string, duration?: number) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration ? duration : 2000,
    });
    toast.present();
  }
}
