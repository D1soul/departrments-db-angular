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
import { MainDeptEmployeeDetailByFullNameComponent } from './main-dept-employee/main-dept-employee-detail-by-full-name/main-dept-employee-detail-by-full-name.component';
import { MainDepartmentDetailByNameComponent } from './main-department/main-department-detail-by-name/main-department-detail-by-name.component';
import { SubDepartmentDetailByNameComponent } from './sub-department/sub-department-detail-by-name/sub-department-detail-by-name.component';
import { SubDeptEmployeeDetailByFullNameComponent } from './sub-dept-employee/sub-dept-employee-detail-by-full-name/sub-dept-employee-detail-by-full-name.component';
import { UpdateSubDeptEmployeeByFullNameComponent } from './sub-dept-employee/update-sub-dept-employee-by-full-name/update-sub-dept-employee-by-full-name.component';
import { UpdateMainDeptEmployeeByFullNameComponent } from './main-dept-employee/update-main-dept-employee-by-full-name/update-main-dept-employee-by-full-name.component';
import { UpdateSubDepartmentByNameComponent } from './sub-department/update-sub-department-by-name/update-sub-department-by-name.component';
import { UpdateMainDepartmentByNameComponent } from './main-department/update-main-department-by-name/update-main-department-by-name.component';

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
    MainDeptEmployeeDetailByFullNameComponent,
    MainDepartmentDetailByNameComponent,
    SubDepartmentDetailByNameComponent,
    SubDeptEmployeeDetailByFullNameComponent,
    UpdateSubDeptEmployeeByFullNameComponent,
    UpdateMainDeptEmployeeByFullNameComponent,
    UpdateSubDepartmentByNameComponent,
    UpdateMainDepartmentByNameComponent
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
