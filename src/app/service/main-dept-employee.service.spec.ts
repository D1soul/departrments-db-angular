import { TestBed } from '@angular/core/testing';

import { MainDeptEmployeeService } from './main-dept-employee.service';

describe('MainEmployeeService', () => {
  let service: MainDeptEmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainDeptEmployeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
