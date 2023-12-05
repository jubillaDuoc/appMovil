import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { AlumnosPage } from './alumnos.page';
import {  HttpClientModule } from '@angular/common/http';

describe('AlumnosPage', () => {
  let component: AlumnosPage;
  let fixture: ComponentFixture<AlumnosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AlumnosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
