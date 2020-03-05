import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { SubDeptEmployee } from '../entities/sub-dept-employee';
import { catchError } from 'rxjs/operators';

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
    return this.http.get<SubDeptEmployee[]>(this.url).pipe(
      catchError(this.handleError<SubDeptEmployee[]>('Sub-Dept Employees List')));
  }

  getSubDeptEmployeeDetail(
    lastName: string, firstName: string, middleName: string): Observable<SubDeptEmployee> {
      const urlFullName = `${this.url}/${lastName}/${firstName}/${middleName}`;
      return this.http.get<SubDeptEmployee>(urlFullName).pipe(
        catchError(this.handleError<SubDeptEmployee>(
          `Sub-Dept Employee with with Full Name: ${lastName} ${firstName} ${middleName} detail`)));
  }

  addSubDeptEmployee(subDeptEmployee: SubDeptEmployee): Observable<SubDeptEmployee> {
    return this.http.post<SubDeptEmployee>(this.url, subDeptEmployee, this.httpOptions).pipe(
      catchError(this.handleError<SubDeptEmployee>('Adding New Sub-Dept Employee')));
  }

  updateSubDeptEmployee(
    lastName: string, firstName: string, middleName: string,
    subDeptEmployee: SubDeptEmployee): Observable<Object>{
      const urlFullName = `${this.url}/${lastName}/${firstName}/${middleName}`;
      return this.http.put(urlFullName, subDeptEmployee, this.httpOptions).pipe(
        catchError(this.handleError<SubDeptEmployee>(
          `Updating Sub-Dept Employee with Full Name: ${lastName} ${firstName} ${middleName}`)));
  }

  deleteSubDeptEmployee(
    lastName: string, firstName: string, middleName: string, ): Observable<any> {
    const urlFullName = `${this.url}/${lastName}/${firstName}/${middleName}`;
    return this.http.delete<SubDeptEmployee>(urlFullName).pipe(
      catchError(this.handleError<SubDeptEmployee>(
        `Deleting Sub-Dept Employee with Full Name: ${lastName} ${firstName} ${middleName}`)));
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return  of (result as T);
    }
  }
}
