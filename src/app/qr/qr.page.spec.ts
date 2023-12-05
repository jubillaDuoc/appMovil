import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { QrPage } from './qr.page';
import { ActivatedRoute } from '@angular/router';

describe('QrPage', () => {
  let component: QrPage;
  let fixture: ComponentFixture<QrPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(QrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
