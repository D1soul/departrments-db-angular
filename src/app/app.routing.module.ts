import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainDeptEmployeeListComponent } from './main-dept-employee-list/main-dept-employee-list.component';
import { MainDeptEmployeeDetailsComponent } from './main-dept-employee-details/main-dept-employee-details.component';
import { CreateMainDeptEmployeeComponent } from './create-main-dept-employee/create-main-dept-employee.component';
import { UpdateMainDeptEmployeeComponent } from './update-main-dept-employee/update-main-dept-employee.component';
import {SubDeptEmployeeListComponent} from './sub-dept-employee-list/sub-dept-employee-list.component';
import {CreateSubDeptEmployeeComponent} from './create-sub-dept-employee/create-sub-dept-employee.component';
import {UpdateSubDeptEmployeeComponent} from './update-sub-dept-employee/update-sub-dept-employee.component';


const routes: Routes = [
  {path: '', redirectTo: '/main_dept_employees', pathMatch: 'full'},
  {path: 'main_dept_employees', component: MainDeptEmployeeListComponent},
  {path: 'main_dept_employee-details/:id', component: MainDeptEmployeeDetailsComponent},
  {path: 'add-main_dept_employee', component: CreateMainDeptEmployeeComponent},
  {path: 'update-main_dept_employee/:id', component: UpdateMainDeptEmployeeComponent},
  {path: 'sub-dept_employees', component: SubDeptEmployeeListComponent},
  {path: 'sub-dept_employee-details/:id', component: SubDeptEmployeeListComponent},
  {path: 'add-sub-dept_employee', component: CreateSubDeptEmployeeComponent},
  {path: 'update-sub-dept_employee/:id', component: UpdateSubDeptEmployeeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
