import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDepartmentsListComponent } from './main-departments-list.component';

describe('MainDepartmentsListComponent', () => {
  let component: MainDepartmentsListComponent;
  let fixture: ComponentFixture<MainDepartmentsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainDepartmentsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainDepartmentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
