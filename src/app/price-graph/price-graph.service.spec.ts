import { TestBed, inject } from '@angular/core/testing';

import { PriceGraphService } from './price-graph.service';

describe('PriceGraphService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PriceGraphService]
    });
  });

  it('should be created', inject([PriceGraphService], (service: PriceGraphService) => {
    expect(service).toBeTruthy();
  }));
});
