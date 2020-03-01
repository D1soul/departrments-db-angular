import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {MainDeptEmployee} from '../entities/main-dept-employee';

@Injectable({
  providedIn: 'root'
})
export class MainDeptEmployeeService {

  private readonly url: string;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {
   this.url = 'http://localhost:8080/departments-app/main_dept_employees';
  }

   getAllMainDeptEmployees(): Observable<MainDeptEmployee[]> {
      return this.http.get<MainDeptEmployee[]>(this.url);
   }

   getMainDeptEmployeeDetails(id: number): Observable<MainDeptEmployee> {
    const urlId = `${this.url}/${id}`;
      return this.http.get<MainDeptEmployee>(urlId);
   }


   addMainDeptEmployee(mainDeptEmployee: MainDeptEmployee): Observable<MainDeptEmployee> {
      return this.http.post<MainDeptEmployee>(this.url, mainDeptEmployee, this.httpOptions);
   }

   updateMainDeptEmployee(id: number, mainDeptEmployee: MainDeptEmployee): Observable<Object>{
     const urlId = `${this.url}/${id}`;
      return this.http.put(urlId, mainDeptEmployee, this.httpOptions);
   }

   deleteMainDeptEmployeeDetails(id: number): Observable<any> {
      return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
   }
}
