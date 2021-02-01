import { TestBed } from '@angular/core/testing';

import { EvidenceService } from './evidence.service';

describe('EvidenceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EvidenceService = TestBed.get(EvidenceService);
    expect(service).toBeTruthy();
  });
});
