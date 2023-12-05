import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { ApiauthService } from '../services/apiauth.service';

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
  tokensession: string = '';
  cursos: any[] = [];
  profesor ="profe2@profesor.duoc.cl";

  constructor(private authService: ApiauthService, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras.state) {
          this.nombre = this.router.getCurrentNavigation()?.extras.state?.['nombre'];
          this.apellido = this.router.getCurrentNavigation()?.extras.state?.['apellido'];
          this.correo = this.router.getCurrentNavigation()?.extras.state?.['correo'];
          this.rol = this.router.getCurrentNavigation()?.extras.state?.['rol'];
          
      }
    });
  }

  qr(idseccion: number) {
    let setData: NavigationExtras = {
      state: {
        idseccion : idseccion        
      }
    };
    this.router.navigate(['/registro-asis'],setData);
}

   listarCurso(){ 
    try{               
      if (1===1) {
        console.log(this.correo)
        this.authService.GETcursosprofesor(this.correo).subscribe(data => {
          this.cursos = data;
          console.log(this.cursos)
        });
      }
      else{
        console.log("No hay cursos para listar")//Cambiar a feedback visual en el page
      }

    } catch(error){
      console.log('No hay cursos para listar');
    }

  }



  cerrarSesion(){
    this.router.navigate([`/login`]);
  }

  ngOnInit(): void{
  }

}
