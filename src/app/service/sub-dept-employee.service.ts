import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SubDeptEmployee } from '../entities/sub-dept-employee';

@Injectable({
  providedIn: 'root'
})
export class SubDeptEmployeeService {

  private readonly url: string;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/departments-app/sub-dept_employees';
  }

  getAllSubDeptEmployees(): Observable<SubDeptEmployee[]> {
    return this.http.get<SubDeptEmployee[]>(this.url);
  }

  /*
  getSubDeptEmployeeDetailById(id: number): Observable<SubDeptEmployee> {
    const urlId = `${this.url}/${id}`;
    return this.http.get<SubDeptEmployee>(urlId);
  }

   */

  getSubDeptEmployeeDetailByFullName(
    lastName: string, firstName: string, middleName: string): Observable<SubDeptEmployee> {
      const urlFullName = `${this.url}/${lastName},${firstName},${middleName}`;
      return this.http.get<SubDeptEmployee>(urlFullName);
  }

  addSubDeptEmployee(subDeptEmployee: SubDeptEmployee): Observable<SubDeptEmployee> {
    return this.http.post<SubDeptEmployee>(this.url, subDeptEmployee, this.httpOptions);
  }

  /*
  updateSubDeptEmployeeById(id: number, subDeptEmployee: SubDeptEmployee): Observable<Object>{
    const urlId = `${this.url}/${id}`;
    return this.http.put(urlId, subDeptEmployee, this.httpOptions);
  } */

  updateSubDeptEmployeeByFullName(
    lastName: string, firstName: string, middleName: string,
    subDeptEmployee: SubDeptEmployee): Observable<Object>{
      const urlFullName = `${this.url}/${lastName},${firstName},${middleName}`;
      return this.http.put(urlFullName, subDeptEmployee, this.httpOptions);
  }

  deleteSubDeptEmployeeDyId(id: number): Observable<any> {
    const urlId = `${this.url}/${id}`;
    return this.http.delete(urlId, { responseType: 'text' });
  }

  deleteSubDeptEmployeeByFullName(
    lastName: string, firstName: string, middleName: string, ): Observable<any> {
    const urlFullName = `${this.url}/${lastName},${firstName},${middleName}`;
    return this.http.delete(urlFullName, { responseType: 'text' });
  }

}
