import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroAsisPage } from './registro-asis.page';

describe('RegistroAsisPage', () => {
  let component: RegistroAsisPage;
  let fixture: ComponentFixture<RegistroAsisPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RegistroAsisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
