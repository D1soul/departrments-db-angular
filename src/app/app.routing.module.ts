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
import {MainDeptEmployeeDetailByFullNameComponent} from './main-dept-employee/main-dept-employee-detail-by-full-name/main-dept-employee-detail-by-full-name.component';
import {UpdateMainDeptEmployeeByFullNameComponent} from './main-dept-employee/update-main-dept-employee-by-full-name/update-main-dept-employee-by-full-name.component';
import {UpdateSubDeptEmployeeByFullNameComponent} from './sub-dept-employee/update-sub-dept-employee-by-full-name/update-sub-dept-employee-by-full-name.component';
import {SubDeptEmployeeDetailByFullNameComponent} from './sub-dept-employee/sub-dept-employee-detail-by-full-name/sub-dept-employee-detail-by-full-name.component';
import {MainDepartmentDetailByNameComponent} from './main-department/main-department-detail-by-name/main-department-detail-by-name.component';
import {UpdateMainDepartmentByNameComponent} from './main-department/update-main-department-by-name/update-main-department-by-name.component';
import {SubDepartmentDetailByNameComponent} from './sub-department/sub-department-detail-by-name/sub-department-detail-by-name.component';
import {UpdateSubDepartmentByNameComponent} from './sub-department/update-sub-department-by-name/update-sub-department-by-name.component';

const routes: Routes = [
  {path: '', redirectTo: '/main_dept_employees', pathMatch: 'full'},

  {path: 'main_departments', component: MainDepartmentsListComponent},
  {path: 'main_department-detail/:name', component: MainDepartmentDetailByNameComponent},
  {path: 'add-main_department', component: CreateMainDepartmentComponent},
  {path: 'update-main_department/:name', component: UpdateMainDepartmentByNameComponent},

  {path: 'main_dept_employees', component: MainDeptEmployeeListComponent},
  {path: 'main_dept_employee-detail/:lastName,:firstName,:middleName',
        component: MainDeptEmployeeDetailByFullNameComponent},
  {path: 'add-main_dept_employee', component: CreateMainDeptEmployeeComponent},
  {path: 'update-main_dept_employee/:lastName,:firstName,:middleName',
        component: UpdateMainDeptEmployeeByFullNameComponent},

  {path: 'sub-departments', component: SubDepartmentsListComponent},
  {path: 'sub-department-detail/:name', component: SubDepartmentDetailByNameComponent},
  {path: 'add-sub-department', component: CreateSubDepartmentComponent},
  {path: 'update-sub-department/:name', component: UpdateSubDepartmentByNameComponent},

  {path: 'sub-dept_employees', component: SubDeptEmployeeListComponent},
  {path: 'sub-dept_employee-detail/:lastName,:firstName,:middleName',
        component: SubDeptEmployeeDetailByFullNameComponent},
  {path: 'add-sub-dept_employee', component: CreateSubDeptEmployeeComponent},
  {path: 'update-sub-dept_employee/:lastName,:firstName,:middleName',
        component: UpdateSubDeptEmployeeByFullNameComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
