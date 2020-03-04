import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MainDepartment } from '../entities/main-department';

@Injectable({
  providedIn: 'root'
})
export class MainDepartmentService {

  private readonly url: string;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/departments-app/main_departments';
  }

  getAllMainDepartments(): Observable<MainDepartment[]> {
    return this.http.get<MainDepartment[]>(this.url);
  }

 /* getMainDepartmentDetailById(id: number): Observable<MainDepartment> {
    const urlId = `${this.url}/${id}`;
    return this.http.get<MainDepartment>(urlId);
  }

  */

  getMainDepartmentDetailByName(name: string): Observable<MainDepartment> {
    const urlName = `${this.url}/${name}`;
    return this.http.get<MainDepartment>(urlName);
  }

  addMainDepartment(mainDepartment: MainDepartment): Observable<MainDepartment> {
    return this.http.post<MainDepartment>(this.url, mainDepartment, this.httpOptions);
  }

  /*
  updateMainDepartmentById(id: number, mainDepartment: MainDepartment): Observable<Object>{
    const urlId = `${this.url}/${id}`;
    return this.http.put(urlId, mainDepartment, this.httpOptions);
  }

   */

  updateMainDepartmentByName(name: string, mainDepartment: MainDepartment): Observable<Object>{
    const urlId = `${this.url}/${name}`;
    return this.http.put(urlId, mainDepartment, this.httpOptions);
  }

  deleteMainDepartmentById(id: number): Observable<any> {
    const urlId = `${this.url}/${id}`;
    return this.http.delete(urlId, { responseType: 'text' });
  }

  deleteMainDepartmentByName(name: string): Observable<any> {
    const urlName = `${this.url}/${name}`;
    return this.http.delete(urlName, { responseType: 'text' });
  }


}
