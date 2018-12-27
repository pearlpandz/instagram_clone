import { TestBed, inject } from '@angular/core/testing';

import { ForgotPwdService } from './forgot-pwd.service';

describe('ForgotPwdService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ForgotPwdService]
    });
  });

  it('should be created', inject([ForgotPwdService], (service: ForgotPwdService) => {
    expect(service).toBeTruthy();
  }));
});
