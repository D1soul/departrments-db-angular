import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { MainDeptEmployee } from '../entities/main-dept-employee';
import { catchError } from 'rxjs/operators';

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
    return this.http.get<MainDeptEmployee[]>(this.url).pipe(
      catchError(this.handleError<MainDeptEmployee[]>('Main Dept Employees List')));
  }

  getMainDeptEmployeeDetail(
    lastName: string, firstName: string, middleName: string): Observable<MainDeptEmployee> {
      const urlFullName =  `${this.url}/${lastName}/${firstName}/${middleName}`;
      return this.http.get<MainDeptEmployee>(urlFullName).pipe(
        catchError(this.handleError<MainDeptEmployee>(
          `Main Dept Employee with with Full Name: ${lastName} ${firstName} ${middleName} detail`)));
  }

  addMainDeptEmployee(mainDeptEmployee: MainDeptEmployee): Observable<MainDeptEmployee> {
    return this.http.post<MainDeptEmployee>(this.url, mainDeptEmployee, this.httpOptions).pipe(
      catchError(this.handleError<MainDeptEmployee>('Adding New Main Dept Employee')));
  }

  updateMainDeptEmployee(
    lastName: string, firstName: string, middleName: string,
    mainDeptEmployee: MainDeptEmployee): Observable<Object>{
      const urlFullName = `${this.url}/${lastName}/${firstName}/${middleName}`;
      return this.http.put(urlFullName, mainDeptEmployee, this.httpOptions).pipe(
        catchError(this.handleError<MainDeptEmployee>(
          `Updating Main Dept Employee with Full Name: ${lastName} ${firstName} ${middleName}`)));
  }

  deleteMainDeptEmployee(
    lastName: string, firstName: string, middleName: string): Observable<any> {
      const urlFullName = `${this.url}/${lastName}/${firstName}/${middleName}`;
      return this.http.delete<MainDeptEmployee>(urlFullName).pipe(
        catchError(this.handleError<MainDeptEmployee>(
          `Deleting Main Dept Employee with Full Name: ${lastName} ${firstName} ${middleName}`)));
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return  of (result as T);
    }
  }
}
