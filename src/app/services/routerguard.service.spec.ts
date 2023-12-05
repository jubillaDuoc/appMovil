import { TestBed } from '@angular/core/testing';

import { RouterguardService } from './routerguard.service';

describe('RouterguardService', () => {
  let service: RouterguardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouterguardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
