import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

import { CreateMainDeptEmployeeComponent } from './create-main-dept-employee/create-main-dept-employee.component';
import { UpdateMainDeptEmployeeComponent } from './update-main-dept-employee/update-main-dept-employee.component';
import { MainDeptEmployeeDetailsComponent } from './main-dept-employee-details/main-dept-employee-details.component';
import { MainDeptEmployeeListComponent } from './main-dept-employee-list/main-dept-employee-list.component';
import { SubDeptEmployeeDetailsComponent } from './sub-dept-employee-details/sub-dept-employee-details.component';
import { SubDeptEmployeeListComponent } from './sub-dept-employee-list/sub-dept-employee-list.component';
import { UpdateSubDeptEmployeeComponent } from './update-sub-dept-employee/update-sub-dept-employee.component';
import { CreateSubDeptEmployeeComponent } from './create-sub-dept-employee/create-sub-dept-employee.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateMainDeptEmployeeComponent,
    UpdateMainDeptEmployeeComponent,
    MainDeptEmployeeDetailsComponent,
    MainDeptEmployeeListComponent,
    SubDeptEmployeeDetailsComponent,
    SubDeptEmployeeListComponent,
    UpdateSubDeptEmployeeComponent,
    CreateSubDeptEmployeeComponent
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
