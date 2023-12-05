import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiauthService } from '../services/apiauth.service';
import {  } from '../camera/camera.component';
import {  HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.page.html',
  styleUrls: ['./alumnos.page.scss'],
})
export class AlumnosPage implements OnInit {

  nombre: string = '';
  apellido: string = '';
  correo: string = '';
  rol: string = '';
  tokensession: string = '';

  constructor(private authService: ApiauthService, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras.state) {
          this.nombre = this.router.getCurrentNavigation()?.extras.state?.['nombre'];
          this.apellido = this.router.getCurrentNavigation()?.extras.state?.['apellido'];
          this.correo = this.router.getCurrentNavigation()?.extras.state?.['correo'];
          this.rol = this.router.getCurrentNavigation()?.extras.state?.['rol'];
          this.tokensession = this.router.getCurrentNavigation()?.extras.state?.['tokensession'];
      }
    });
  }

  cerrarSesion(){
    this.router.navigate([`/login`]);
  }

  ngOnInit(): void{
  }

}
