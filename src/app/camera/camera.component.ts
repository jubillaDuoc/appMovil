import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import { VIDEO_CONFIG } from './scanner.const';
import jsQR from "jsqr";
import {Subject, takeUntil, timer} from "rxjs";
import { Camera  } from '@capacitor/camera';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
})
export class CameraComponent  implements AfterViewInit, OnDestroy {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;

  videoStream!: MediaStream

  config = VIDEO_CONFIG

  private destroy$ = new Subject<void>()

  result = ''

  ngAfterViewInit(): void {
    this.prepareScanner();
  }

  async prepareScanner() {
    const available = await this.checkCamera()
    if (available) this.startScanner()
  }

   changeCamera() {
     let {facingMode} = this.config.video

     this.config.video.facingMode = facingMode === 'enviroment' ? 'user' : 'enviroment'
     this.startScanner()
   }

  async startScanner() {
    this.videoStream = await navigator.mediaDevices.getUserMedia(this.config);
    this.videoElement.nativeElement.srcObject = this.videoStream;
  
    this.videoElement.nativeElement.addEventListener('loadedmetadata', () => {
      this.spyCamera();
    });
  }
  

  spyCamera() {
    if (this.videoElement && this.videoElement.nativeElement && this.canvas && this.canvas.nativeElement) {
      const { clientWidth, clientHeight } = this.videoElement.nativeElement;
  
      this.canvas.nativeElement.width = clientWidth;
      this.canvas.nativeElement.height = clientHeight;
  
      const canvas = this.canvas.nativeElement.getContext('2d', { willReadFrequently: true }) as CanvasRenderingContext2D;
  
      canvas.drawImage(this.videoElement.nativeElement, 0, 0, clientWidth, clientHeight);
  
      const inversionAttempts = 'dontInvert';
  
      const image = canvas.getImageData(0, 0, clientWidth, clientHeight);
  
      const qrcode = jsQR(image.data, image.width, clientHeight, { inversionAttempts });
  
      if (qrcode) {
        const { data } = qrcode;
        this.result = data;
  
        // const mailtoLink = `mailto:acurincordova@gmail.com?subject=Registro de Asistencia&body=${encodeURIComponent(data)}`;
        // window.open(mailtoLink);
      } else {
        timer(100).pipe(takeUntil(this.destroy$)).subscribe(() => {
          this.spyCamera();
        });
      }
    }
  }
  
  async checkCamera() {
    try {
      const cameraStatus = await Camera.checkPermissions();
      if (!cameraStatus.camera) {
        await Camera.requestPermissions();
        const updatedCameraStatus = await Camera.checkPermissions();
        if (!updatedCameraStatus.camera) {
          alert('No se pueden acceder a los permisos de la cámara. Por favor, verifique la configuración de permisos.');
          return false;
        }
      }
      return true;
    } catch (error) {
      console.error('Error al solicitar/verificar permisos de la cámara:', error);
      return false;
    }
  }
  
  ngOnDestroy() {
    if (this.videoStream && this.videoStream.getTracks) {
      const tracks = this.videoStream.getTracks();
    }
    this.videoElement = null!

    this.destroy$.next()
    this.destroy$.complete()
  }
}
