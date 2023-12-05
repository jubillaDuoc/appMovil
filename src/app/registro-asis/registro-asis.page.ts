import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import * as QRCode from 'qrcode-generator';
import { ApiauthService } from '../services/apiauth.service';
import { async } from 'rxjs';


@Component({
  selector: 'app-registro-asis',
  templateUrl: './registro-asis.page.html',
  styleUrls: ['./registro-asis.page.scss'],
})
export class RegistroAsisPage implements OnInit {
  idseccion: string = '';
  qrData: string = '';
  idSeccionAlumno: string='';
  nombrealumno: string='';
  Alumnoseccion: any[] = [];

  constructor(private authService: ApiauthService,private route: ActivatedRoute, private router: Router) {
    this.idseccion = this.router.getCurrentNavigation()?.extras.state?.['idseccion'];
    console.log(this.idseccion)
   }

    generateQRCode(text: string): string {
    const typeNumber = 4;
    const errorCorrectionLevel = 'L';
    const qr = QRCode(typeNumber, errorCorrectionLevel);
    qr.addData(text);
    qr.make();
    return qr.createDataURL(10, 0);
  }


   QR() {
    if (this.idseccion) {
      console.log(this.idseccion)
      console.log('prueba')
      
      // const fechaActual = new Date().toLocaleString('es-ES', {
      //   day: '2-digit',
      //   month: '2-digit',
      //   year: 'numeric',
      //   hour: '2-digit',
      //   minute: '2-digit',
      // });
  
      const qrText = `${this.idseccion}`;
      this.qrData = this.generateQRCode(qrText);
    }
  }
  
  
   async listarAlumnos(){ 
    console.log('prueba5')
    try{               
      if (1===1) {
        console.log('prueba')
        console.log(this.idseccion)
        this.authService.GETalumnosseccion(this.idseccion).subscribe(data => {
          this.Alumnoseccion = data;
          console.log(this.Alumnoseccion)
        });
      }
      else{
        console.log("No hay Alumnos para listar")//Cambiar a feedback visual en el page
      }

    } catch(error){
      console.log('No hay Alumnos para listar');
    }

  }


  ngOnInit() {
    this.QR();
    this.listarAlumnos();
  }


}
