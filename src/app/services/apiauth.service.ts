import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import axios from 'axios';




@Injectable({
  providedIn: 'root'
})
export class ApiauthService {

  //private apiUrl = 'http://127.0.0.1:8080/api'; // Reemplaza con la URL de tu API.
  //private apiUrl = 'http://172.26.203.78:8080/api'; // Reemplaza con la URL de tu API.
  private apiUrl = 'http://173.249.47.239:8080/api';

  private userRole: string;
  private nombre: string;
  private apellido: string
  private tokensesion: string;
  private estado: string;
  private tokenres: string;
  private logoutres: string;
  private cursos : string;
  private Alumnoseccion: string;
  private correo: string;
  
  

  constructor(private http: HttpClient) {
    this.userRole = '';
    this.nombre = '';
    this.apellido = '';
    this.tokensesion = '';
    this.estado = '';
    this.tokenres = '';
    this.logoutres = '';
    this.cursos ='';
    this.Alumnoseccion ='';
    this.correo = '';
  }

  // Método para enviar una solicitud POST de autenticación a la API.
  public login(usuario: string, passwd: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const body = {
      'username': usuario,
      'password': passwd,
    }

    console.log(body.toString);

    return this.http.post(`${this.apiUrl}/login`, body, { headers: headers }).pipe(
      map((response: any) => {
        this.userRole = response[0].rol;
        this.nombre = response[0].nombre;
        this.apellido = response[0].apellido;
        this.tokensesion = response[0].token;
        return response;
      })
    );
  }

  public GETcursosprofesor(profesor:string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const body = {
      'profesor': profesor
    }
    console.log(body.toString);
    return this.http.post(`${this.apiUrl}/clases`, body, { headers: headers }).pipe(
      map((response: any) => {
        this.cursos = response[0].curso;
        return response;
      })
    );
  }
  
  public GETalumnosseccion(idseccion:string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const body = {
      'idseccion': idseccion
    }
    console.log(body.toString);
    return this.http.post(`${this.apiUrl}/seccionalumno`, body, { headers: headers }).pipe(
      map((response: any) => {
        this.Alumnoseccion = response[0].Alumnoseccion;
        return response;
      })
    );

  }


  public getUserRole(): string {
    return this.userRole;
  }

  public getNombre(): string {
    return this.nombre;
  }

  public getApellido(): string {
    return this.apellido;
  }

  public getToken(): string {
    return this.tokensesion;
  }


  // Método para verificar si el usuario está autenticado (eliminar de todo el codigo).


  // Puedes agregar métodos adicionales aquí, como cerrar sesión o verificar el estado de la autenticación.
}
