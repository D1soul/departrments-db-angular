import { Injectable } from '@angular/core';
import {HttpClient, HttpHandler, HttpHeaders, HttpRequest} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { MainDepartment } from '../entities/main-department';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MainDepartmentService {

  private readonly url: string;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient ) {
    this.url = 'http://localhost:8080/departments-app/main_departments';
  }

  getAllMainDepartments(): Observable<MainDepartment[]> {
    return this.http.get<MainDepartment[]>(this.url).pipe(
      catchError(this.handleError<MainDepartment[]>('Main Departments List')));
  }

  getMainDepartmentDetail(name: string): Observable<MainDepartment> {
    const urlName = `${this.url}/${name}`;
    return this.http.get<MainDepartment>(urlName).pipe(
      catchError(this.handleError<MainDepartment>(`Main Department with name: ${name} detail`)));
  }

  addMainDepartment(mainDepartment: MainDepartment): Observable<MainDepartment> {
    return this.http.post<MainDepartment>(this.url, mainDepartment, this.httpOptions).pipe(
      catchError(this.handleError<MainDepartment>('Adding New Main Department')));
  }

  updateMainDepartment(name: string, mainDepartment: MainDepartment){
    const urlId = `${this.url}/${name}`;
    return this.http.put(urlId, mainDepartment, this.httpOptions).pipe(
      catchError(this.handleError<MainDepartment>(`Updating Main Department with name: ${name}`)));
  }

  deleteMainDepartment(name: string): Observable<MainDepartment> {
    const urlName = `${this.url}/${name}`;
    return this.http.delete<MainDepartment>(urlName).pipe(
      catchError(this.handleError<MainDepartment>(`Deleting Main Department with name: ${name}`)));
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return  of (result as T);
    }
  }
}
