import { TestBed } from '@angular/core/testing';

import { SubDeptEmployeeService } from './sub-dept-employee.service';

describe('SubEmployeeService', () => {
  let service: SubDeptEmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubDeptEmployeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
