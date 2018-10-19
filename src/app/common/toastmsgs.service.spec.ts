import { TestBed, inject } from '@angular/core/testing';

import { ToastmsgsService } from './toastmsgs.service';

describe('ToastmsgsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToastmsgsService]
    });
  });

  it('should be created', inject([ToastmsgsService], (service: ToastmsgsService) => {
    expect(service).toBeTruthy();
  }));
});
