import { TestBed, inject } from '@angular/core/testing';

import { ExcelUploadService } from './excel-upload.service';

describe('ExcelUploadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExcelUploadService]
    });
  });

  it('should be created', inject([ExcelUploadService], (service: ExcelUploadService) => {
    expect(service).toBeTruthy();
  }));
});
