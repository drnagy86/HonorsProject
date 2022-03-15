import { TestBed } from '@angular/core/testing';

import { RubricDataService } from './rubric-data.service';

describe('RubricDataService', () => {
  let service: RubricDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RubricDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
