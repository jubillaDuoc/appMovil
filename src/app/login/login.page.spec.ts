// import { ComponentFixture, TestBed, async } from '@angular/core/testing';
// import { LoginPage } from './login.page';

// describe('LoginPage', () => {
//   let component: LoginPage;
//   let fixture: ComponentFixture<LoginPage>;

//   beforeEach(async(() => {
//     fixture = TestBed.createComponent(LoginPage);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   }));

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiauthService } from '../services/apiauth.service';

describe('ApiauthService', () => {
  let service: ApiauthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiauthService],
    });

    service = TestBed.inject(ApiauthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Verifica que no haya solicitudes pendientes.
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make a POST request to login endpoint', () => {
    const mockUser = { username: 'testuser', password: 'testpassword' };

    // Simula una respuesta exitosa del servidor
    const mockResponse = [{ rol: 'Usuario', nombre: 'John', apellido: 'Doe' }];

    // Llama al método login del servicio
    service.login(mockUser.username, mockUser.password).subscribe(response => {
      expect(response).toEqual(mockResponse, 'should return the expected response');
    });

    // Verifica que se haya hecho una solicitud POST al endpoint correcto con los parámetros esperados
    const req = httpTestingController.expectOne('http://127.0.0.1:8080/api/login');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body.get('username')).toEqual(mockUser.username);
    expect(req.request.body.get('password')).toEqual(mockUser.password);

    // Completa la solicitud simulando una respuesta exitosa
    req.flush(mockResponse);
  });
});

