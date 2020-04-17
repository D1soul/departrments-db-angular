import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainDeptEmployeeListComponent } from './main-dept-employee/main-dept-employee-list/main-dept-employee-list.component';
import { CreateMainDeptEmployeeComponent } from './main-dept-employee/create-main-dept-employee/create-main-dept-employee.component';
import {SubDeptEmployeeListComponent} from './sub-dept-employee/sub-dept-employee-list/sub-dept-employee-list.component';
import {CreateSubDeptEmployeeComponent} from './sub-dept-employee/create-sub-dept-employee/create-sub-dept-employee.component';
import {MainDepartmentsListComponent} from './main-department/main-departments-list/main-departments-list.component';
import {SubDepartmentsListComponent} from './sub-department/sub-departments-list/sub-departments-list.component';
import {CreateSubDepartmentComponent} from './sub-department/create-sub-department/create-sub-department.component';
import {CreateMainDepartmentComponent} from './main-department/create-main-department/create-main-department.component';
import {MainDeptEmployeeDetailComponent} from './main-dept-employee/main-dept-employee-detail/main-dept-employee-detail.component';
import {UpdateMainDeptEmployeeComponent} from './main-dept-employee/update-main-dept-employee/update-main-dept-employee.component';
import {UpdateSubDeptEmployeeComponent} from './sub-dept-employee/update-sub-dept-employee/update-sub-dept-employee.component';
import {SubDeptEmployeeDetailComponent} from './sub-dept-employee/sub-dept-employee-detail/sub-dept-employee-detail.component';
import {MainDepartmentDetailComponent} from './main-department/main-department-detail/main-department-detail.component';
import {UpdateMainDepartmentComponent} from './main-department/update-main-department/update-main-department.component';
import {SubDepartmentDetailComponent} from './sub-department/sub-department-detail/sub-department-detail.component';
import {UpdateSubDepartmentComponent} from './sub-department/update-sub-department/update-sub-department.component';
import {LoginComponent} from './authentification/login/login.component';
import {AdminComponent} from './authentification/admin/admin.component';
import {RegistrationComponent} from './authentification/registration/registration.component';
import {UserDetailComponent} from './authentification/user-detail/user-detail.component';
import {UserListComponent} from './authentification/user-list/user-list.component';
import {AuthGuard} from './auth.guard';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},

  {path: 'login', component: LoginComponent },
  {path: 'registration', component: RegistrationComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'users', component: UserListComponent},
  {path: 'user_detail/:username', component: UserDetailComponent},

  {path: 'main_departments', component: MainDepartmentsListComponent},
  {path: 'main_department-detail/:name', component: MainDepartmentDetailComponent},
  {path: 'add-main_department', component: CreateMainDepartmentComponent},
  {path: 'update-main_department/:name', component: UpdateMainDepartmentComponent},

  {path: 'main_dept_employees', component: MainDeptEmployeeListComponent},
  {path: 'main_dept_employee-detail/:lastName/:firstName/:middleName',
        component: MainDeptEmployeeDetailComponent},
  {path: 'add-main_dept_employee', component: CreateMainDeptEmployeeComponent},
  {path: 'update-main_dept_employee/:lastName/:firstName/:middleName',
        component: UpdateMainDeptEmployeeComponent},

  {path: 'sub-departments', component: SubDepartmentsListComponent},
  {path: 'sub-department-detail/:name', component: SubDepartmentDetailComponent},
  {path: 'add-sub-department', component: CreateSubDepartmentComponent},
  {path: 'update-sub-department/:name', component: UpdateSubDepartmentComponent},

  {path: 'sub-dept_employees', component: SubDeptEmployeeListComponent},
  {path: 'sub-dept_employee-detail/:lastName/:firstName/:middleName',
        component: SubDeptEmployeeDetailComponent},
  {path: 'add-sub-dept_employee', component: CreateSubDeptEmployeeComponent},
  {path: 'update-sub-dept_employee/:lastName/:firstName/:middleName',
        component: UpdateSubDeptEmployeeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
