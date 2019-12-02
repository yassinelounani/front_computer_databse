import { TestBed } from '@angular/core/testing';

import { IsSignedInService } from './is-signed-in.service';

describe('IsSignedInService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IsSignedInService = TestBed.get(IsSignedInService);
    expect(service).toBeTruthy();
  });
});
