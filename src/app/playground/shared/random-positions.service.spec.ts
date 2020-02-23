import { TestBed } from '@angular/core/testing';

import { RandomPositionsService } from './random-positions.service';

describe('RandomPositionsService', () => {
  let service: RandomPositionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RandomPositionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
