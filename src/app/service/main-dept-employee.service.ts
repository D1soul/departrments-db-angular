import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MainDeptEmployee } from '../entities/main-dept-employee';

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

  /*
  getMainDeptEmployeeDetailById(id: number): Observable<MainDeptEmployee> {
    const urlId = `${this.url}/${id}`;
    return this.http.get<MainDeptEmployee>(urlId);
  }

   */

  getMainDeptEmployeeDetailByFullName(
    lastName: string, firstName: string, middleName: string): Observable<MainDeptEmployee> {
      const urlFullName = `${this.url}/${lastName},${firstName},${middleName}`;
      return this.http.get<MainDeptEmployee>(urlFullName);
  }

  addMainDeptEmployee(mainDeptEmployee: MainDeptEmployee): Observable<MainDeptEmployee> {
    return this.http.post<MainDeptEmployee>(this.url, mainDeptEmployee, this.httpOptions);
  }

  /*
  updateMainDeptEmployeeById(id: number, mainDeptEmployee: MainDeptEmployee): Observable<Object>{
    const urlId = `${this.url}/${id}`;
    return this.http.put(urlId, mainDeptEmployee, this.httpOptions);
  }

   */

  updateMainDeptEmployeeByFullName(
    lastName: string, firstName: string, middleName: string,
    mainDeptEmployee: MainDeptEmployee): Observable<Object>{
      const urlFullName = `${this.url}/${lastName},${firstName},${middleName}`;
      return this.http.put(urlFullName, mainDeptEmployee, this.httpOptions);
  }

   deleteMainDeptEmployeeById(id: number): Observable<any> {
     const urlId = `${this.url}/${id}`;
     return this.http.delete(urlId, { responseType: 'text' });
   }
  deleteMainDeptEmployeeByFullName(
    lastName: string, firstName: string, middleName: string): Observable<any> {
      const urlFullName = `${this.url}/${lastName},${firstName},${middleName}`;
      return this.http.delete(urlFullName, { responseType: 'text' });
  }
}
