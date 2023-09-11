import { Component } from '@angular/core';
import { Usuario } from './models/usuario';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  alumnoUser: Usuario = new Usuario('Juan', 'Perez', 'juanito@duocuc.cl', 'juanito123', 'alumno');
  profesorUser: Usuario = new Usuario('Pedro', 'Marmol', 'pedro@duoc.cl', 'pedro123', 'profesor');
  
  constructor() {}
}

