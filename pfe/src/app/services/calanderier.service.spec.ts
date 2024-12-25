import { TestBed } from '@angular/core/testing';

import { CalanderierService } from './calanderier.service';

describe('CalanderierService', () => {
  let service: CalanderierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalanderierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
