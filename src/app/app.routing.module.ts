import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainDeptEmployeeListComponent } from './main-dept-employee/main-dept-employee-list/main-dept-employee-list.component';
import { CreateMainDeptEmployeeComponent } from './main-dept-employee/create-main-dept-employee/create-main-dept-employee.component';
import { SubDeptEmployeeListComponent } from './sub-dept-employee/sub-dept-employee-list/sub-dept-employee-list.component';
import { CreateSubDeptEmployeeComponent } from './sub-dept-employee/create-sub-dept-employee/create-sub-dept-employee.component';
import { MainDepartmentsListComponent } from './main-department/main-departments-list/main-departments-list.component';
import { SubDepartmentsListComponent } from './sub-department/sub-departments-list/sub-departments-list.component';
import { CreateSubDepartmentComponent } from './sub-department/create-sub-department/create-sub-department.component';
import { CreateMainDepartmentComponent } from './main-department/create-main-department/create-main-department.component';
import { MainDeptEmployeeDetailComponent } from './main-dept-employee/main-dept-employee-detail/main-dept-employee-detail.component';
import { UpdateMainDeptEmployeeComponent } from './main-dept-employee/update-main-dept-employee/update-main-dept-employee.component';
import { UpdateSubDeptEmployeeComponent } from './sub-dept-employee/update-sub-dept-employee/update-sub-dept-employee.component';
import { SubDeptEmployeeDetailComponent } from './sub-dept-employee/sub-dept-employee-detail/sub-dept-employee-detail.component';
import { MainDepartmentDetailComponent } from './main-department/main-department-detail/main-department-detail.component';
import { UpdateMainDepartmentComponent } from './main-department/update-main-department/update-main-department.component';
import { SubDepartmentDetailComponent } from './sub-department/sub-department-detail/sub-department-detail.component';
import { UpdateSubDepartmentComponent } from './sub-department/update-sub-department/update-sub-department.component';
import { LoginComponent } from './authentification/login/login.component';
import { RegistrationComponent } from './authentification/registration/registration.component';
import { UserDetailComponent } from './authentification/user-detail/user-detail.component';
import { UserListComponent } from './authentification/user-list/user-list.component';
import { AuthGuard } from './guard/auth.guard';
import { UpdateUserComponent } from './authentification/update-user/update-user.component';
import { ForgotPasswordComponent } from './authentification/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './authentification/reset-password/reset-password.component';
import { Role } from './entities/role';
import { NonAuthGuard } from './guard/non-auth.guard';

let roles: Role = new Role();
const routes: Routes = [

  {path: '', redirectTo: '/login', pathMatch: 'full'},

  {path: 'login', component: LoginComponent, canActivate: [NonAuthGuard]},
  {path: 'registration', component: RegistrationComponent, canActivate: [NonAuthGuard] },
  {path: 'users', component: UserListComponent,
          canActivate: [AuthGuard], data:{ roles: [roles.admin] }},
  {path: 'user_detail/:username', component: UserDetailComponent,
          canActivate: [AuthGuard], data:{ roles: [roles.user, roles.admin] }, },
  {path: 'update_user/:username', component: UpdateUserComponent,
          canActivate: [AuthGuard], data:{ roles: [roles.user, roles.admin] }},
  {path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [NonAuthGuard] },
  {path: 'reset-password', component: ResetPasswordComponent, canActivate: [NonAuthGuard] },

  {path: 'main_departments', component: MainDepartmentsListComponent,
          canActivate: [AuthGuard], data:{ roles: [roles.user, roles.admin] }},
  {path: 'main_department-detail/:name', component: MainDepartmentDetailComponent,
          canActivate: [AuthGuard], data:{ roles: [roles.user, roles.admin] }},
  {path: 'add-main_department', component: CreateMainDepartmentComponent,
          canActivate: [AuthGuard], data:{ roles: [roles.admin] }},
  {path: 'update-main_department/:name', component: UpdateMainDepartmentComponent,
          canActivate: [AuthGuard], data:{ roles: [roles.admin] }},

  {path: 'main_dept_employees', component: MainDeptEmployeeListComponent,
          canActivate: [AuthGuard], data:{ roles: [roles.user, roles.admin] }},
  {path: 'main_dept_employee-detail/:lastName/:firstName/:middleName',
          component: MainDeptEmployeeDetailComponent,
          canActivate: [AuthGuard], data:{ roles: [roles.user, roles.admin] }},
  {path: 'add-main_dept_employee', component: CreateMainDeptEmployeeComponent,
          canActivate: [AuthGuard], data:{ roles: [roles.admin] }},
  {path: 'update-main_dept_employee/:lastName/:firstName/:middleName',
          component: UpdateMainDeptEmployeeComponent,
          canActivate: [AuthGuard], data:{ roles: [roles.admin] }},

  {path: 'sub-departments', component: SubDepartmentsListComponent,
          canActivate: [AuthGuard], data:{ roles: [roles.user, roles.admin] }},
  {path: 'sub-department-detail/:name', component: SubDepartmentDetailComponent,
          canActivate: [AuthGuard], data:{ roles: [roles.user, roles.admin] }},
  {path: 'add-sub-department', component: CreateSubDepartmentComponent,
          canActivate: [AuthGuard], data:{ roles: [roles.admin] }},
  {path: 'update-sub-department/:name', component: UpdateSubDepartmentComponent,
          canActivate: [AuthGuard], data:{ roles: [roles.admin] }},

  {path: 'sub-dept_employees', component: SubDeptEmployeeListComponent,
          canActivate: [AuthGuard], data:{ roles: [roles.user, roles.admin] }},
  {path: 'sub-dept_employee-detail/:lastName/:firstName/:middleName',
          component: SubDeptEmployeeDetailComponent,
          canActivate: [AuthGuard], data:{ roles: [roles.user, roles.admin] }},
  {path: 'add-sub-dept_employee', component: CreateSubDeptEmployeeComponent,
          canActivate: [AuthGuard], data:{ roles: [roles.admin] }},
  {path: 'update-sub-dept_employee/:lastName/:firstName/:middleName',
          component: UpdateSubDeptEmployeeComponent,
          canActivate: [AuthGuard], data:{ roles: [roles.admin] }}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
