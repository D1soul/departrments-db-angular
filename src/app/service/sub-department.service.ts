import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { SubDepartment } from '../entities/sub-department';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SubDepartmentService {

  private readonly url: string;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/departments-app/sub-departments';
  }

  getAllSubDepartments(): Observable<SubDepartment[]> {
    return this.http.get<SubDepartment[]>(this.url).pipe(
      catchError(this.handleError<SubDepartment[]>('Sub-Departments List')));
  }

  getSubDepartmentDetail(name: string): Observable<SubDepartment> {
    const urlName = `${this.url}/${name}`;
    return this.http.get<SubDepartment>(urlName).pipe(
      catchError(this.handleError<SubDepartment>(`Sub-Department with name: ${name} detail`)));
  }

  addSubDepartment(subDepartment: SubDepartment): Observable<SubDepartment> {
    return this.http.post<SubDepartment>(this.url, subDepartment, this.httpOptions).pipe(
      catchError(this.handleError<SubDepartment>('Adding New Sub-Department')));
  }

  updateSubDepartment(name: string, subDepartment: SubDepartment): Observable<Object>{
    const urlName = `${this.url}/${name}`;
    return this.http.put(urlName, subDepartment, this.httpOptions).pipe(
      catchError(this.handleError<SubDepartment>(`Updating Sub-Department with name: ${name}`)));
  }

  deleteSubDepartment(name: string): Observable<SubDepartment> {
    const urlName = `${this.url}/${name}`;
    return this.http.delete<SubDepartment>(urlName).pipe(
      catchError(this.handleError<SubDepartment>(`Deleting Sub-Department with name: ${name}`)));
  }

  private handleError<T> (operation = 'operation') {
    return (error: any): Observable<T> => {
      console.error(operation + ': ' + error);
      return  throwError(error);
    }
  }
}
