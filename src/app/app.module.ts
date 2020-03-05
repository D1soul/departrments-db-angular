import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CreateMainDeptEmployeeComponent } from './main-dept-employee/create-main-dept-employee/create-main-dept-employee.component';
import { MainDeptEmployeeListComponent } from './main-dept-employee/main-dept-employee-list/main-dept-employee-list.component';
import { SubDeptEmployeeListComponent } from './sub-dept-employee/sub-dept-employee-list/sub-dept-employee-list.component';
import { CreateSubDeptEmployeeComponent } from './sub-dept-employee/create-sub-dept-employee/create-sub-dept-employee.component';
import { SubDepartmentsListComponent } from './sub-department/sub-departments-list/sub-departments-list.component';
import { MainDepartmentsListComponent } from './main-department/main-departments-list/main-departments-list.component';
import { CreateMainDepartmentComponent } from './main-department/create-main-department/create-main-department.component';
import { CreateSubDepartmentComponent } from './sub-department/create-sub-department/create-sub-department.component';
import { MainDeptEmployeeDetailComponent } from './main-dept-employee/main-dept-employee-detail/main-dept-employee-detail.component';
import { MainDepartmentDetailComponent } from './main-department/main-department-detail/main-department-detail.component';
import { SubDepartmentDetailComponent } from './sub-department/sub-department-detail/sub-department-detail.component';
import { SubDeptEmployeeDetailComponent } from './sub-dept-employee/sub-dept-employee-detail/sub-dept-employee-detail.component';
import { UpdateSubDeptEmployeeComponent } from './sub-dept-employee/update-sub-dept-employee/update-sub-dept-employee.component';
import { UpdateMainDeptEmployeeComponent } from './main-dept-employee/update-main-dept-employee/update-main-dept-employee.component';
import { UpdateSubDepartmentComponent } from './sub-department/update-sub-department/update-sub-department.component';
import { UpdateMainDepartmentComponent } from './main-department/update-main-department/update-main-department.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateMainDeptEmployeeComponent,
    MainDeptEmployeeListComponent,
    SubDeptEmployeeListComponent,
    CreateSubDeptEmployeeComponent,
    SubDepartmentsListComponent,
    MainDepartmentsListComponent,
    CreateMainDepartmentComponent,
    CreateSubDepartmentComponent,
    MainDeptEmployeeDetailComponent,
    MainDepartmentDetailComponent,
    SubDepartmentDetailComponent,
    SubDeptEmployeeDetailComponent,
    UpdateSubDeptEmployeeComponent,
    UpdateMainDeptEmployeeComponent,
    UpdateSubDepartmentComponent,
    UpdateMainDepartmentComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
