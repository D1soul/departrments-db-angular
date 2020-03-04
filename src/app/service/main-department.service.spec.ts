import { TestBed } from '@angular/core/testing';

import { MainDepartmentService } from './main-department.service';

describe('MainDepartmentService', () => {
  let service: MainDepartmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainDepartmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
