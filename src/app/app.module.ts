import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
import { LoginComponent } from './authentification/login/login.component';
import { AdminComponent } from './authentification/admin/admin.component';
import { UserDetailComponent } from './authentification/user-detail/user-detail.component';
import { UpdateUserComponent } from './authentification/update-user/update-user.component';
import { UserListComponent } from './authentification/user-list/user-list.component';
import { RegistrationComponent } from './authentification/registration/registration.component';
import {ErrorInterceptor} from './error.interceptor';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {JwtTokenInterceptor} from './jwt.token.interceptor';

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
    UpdateMainDepartmentComponent,
    LoginComponent,
    AdminComponent,
    UserDetailComponent,
    UpdateUserComponent,
    UserListComponent,
    RegistrationComponent
  ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
    ],
    providers: [
      { provide: HTTP_INTERCEPTORS, useClass: JwtTokenInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
