import { TestBed } from '@angular/core/testing';

import { AlgorithmsIaService } from './algorithms-ia.service';

describe('AlgorithmsIaService', () => {
  let service: AlgorithmsIaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlgorithmsIaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
