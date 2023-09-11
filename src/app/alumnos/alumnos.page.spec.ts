import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlumnosPage } from './alumnos.page';

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
