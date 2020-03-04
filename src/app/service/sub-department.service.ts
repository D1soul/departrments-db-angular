import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SubDepartment } from '../entities/sub-department';
import {MainDepartment} from '../entities/main-department';

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
    return this.http.get<SubDepartment[]>(this.url);
  }

  /*
  getSubDepartmentDetailById(id: number): Observable<SubDepartment> {
    const urlId = `${this.url}/${id}`;
    return this.http.get<SubDepartment>(urlId);
  }

   */

  getSubDepartmentDetailByName(name: string): Observable<SubDepartment> {
    const urlName = `${this.url}/${name}`;
    return this.http.get<SubDepartment>(urlName);
  }

  addSubDepartment(subDepartment: SubDepartment): Observable<SubDepartment> {
    return this.http.post<SubDepartment>(this.url, subDepartment, this.httpOptions);
  }

  /*
  updateSubDepartmentById(id: number, subDepartment: SubDepartment): Observable<Object>{
    const urlId = `${this.url}/${id}`;
    return this.http.put(urlId, subDepartment, this.httpOptions);
  } */

  updateSubDepartmentByName(name: string, subDepartment: SubDepartment): Observable<Object>{
    const urlName = `${this.url}/${name}`;
    return this.http.put(urlName, subDepartment, this.httpOptions);
  }

  deleteSubDepartmentById(id: number): Observable<any> {
    const urlId = `${this.url}/${id}`;
    return this.http.delete(urlId, { responseType: 'text' });
  }

  deleteSubDepartmentByName(name: string): Observable<any> {
    const urlName = `${this.url}/${name}`;
    return this.http.delete(urlName, { responseType: 'text' });
  }

}
