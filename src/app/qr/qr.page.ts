import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import * as QRCode from 'qrcode-generator';



@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage implements OnInit {
  idseccion: string = '';
  qrData: string = '';

  constructor(private route: ActivatedRoute, private router: Router) {
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


  ngOnInit() {
    this.QR();
  }

}
