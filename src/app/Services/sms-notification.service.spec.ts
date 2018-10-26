import { TestBed, inject } from '@angular/core/testing';

import { SmsNotificationService } from './sms-notification.service';

describe('SmsNotificationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SmsNotificationService]
    });
  });

  it('should be created', inject([SmsNotificationService], (service: SmsNotificationService) => {
    expect(service).toBeTruthy();
  }));
});
