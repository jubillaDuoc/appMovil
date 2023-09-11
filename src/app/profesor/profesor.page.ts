import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.page.html',
  styleUrls: ['./profesor.page.scss'],
})
export class ProfesorPage implements OnInit {

  nombre: string = '';
  apellido: string = '';
  correo: string = '';
  rol: string = '';

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras.state) {
          this.nombre = this.router.getCurrentNavigation()?.extras.state?.['nombre'];
          this.apellido = this.router.getCurrentNavigation()?.extras.state?.['apellido'];
          this.correo = this.router.getCurrentNavigation()?.extras.state?.['correo'];
          this.rol = this.router.getCurrentNavigation()?.extras.state?.['rol'];
      }
    });
  }

  ngOnInit(): void{
    if (this.rol !== 'profesor') {
      this.router.navigate(['/login']);
    }
  }

}
