import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Page404Page } from './page404.page';

describe('Page404Page', () => {
  let component: Page404Page;
  let fixture: ComponentFixture<Page404Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Page404Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
