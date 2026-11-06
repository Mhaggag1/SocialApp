import { TestBed } from '@angular/core/testing';

import { UploadProfilePicService } from './upload-profile-pic.service';

describe('UploadProfilePicService', () => {
  let service: UploadProfilePicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadProfilePicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
