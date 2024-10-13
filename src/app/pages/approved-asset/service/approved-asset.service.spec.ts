import { TestBed } from '@angular/core/testing';

import { ApprovedAssetService } from './approved-asset.service';

describe('ApprovedAssetService', () => {
  let service: ApprovedAssetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApprovedAssetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
