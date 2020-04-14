import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../entities/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly loginUrl: string;
  private readonly adminUrl: string;
  private readonly userUrl: string;
  private readonly registrationUrl: string;
  private isLoggedIn = false;

  private redirectUrl: string = '/';

  private token = localStorage.getItem('token');

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };



  constructor(private http: HttpClient) {
    this.loginUrl = 'http://localhost:8080/login';
    this.adminUrl = 'http://localhost:8080/admin';
    this.userUrl = 'http://localhost:8080/users';
    this.registrationUrl = 'http://localhost:8080/registration';
  }

  isUserLoggedIn(): boolean {
    return this.isLoggedIn;
  }

  setRedirectUrl(url: string): void {
    this.redirectUrl = url;
  }

  logout() {
    localStorage.removeItem('token');
  }

  getJwtToken() {
    return localStorage.getItem(this.token);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl).pipe(
      catchError(this.handleError<User[]>('User List')));
  }

  getUserDetails(username: string): Observable<User> {
    const getUserDetailUrl = `${this.userUrl}/${username}`;
    return this.http.get<User>(getUserDetailUrl).pipe(
      catchError(this.handleError<User>(`User with username: ${username} detail`)));
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.registrationUrl, user, this.httpOptions).pipe(
      catchError(this.handleError<User>('Adding New User')));
  }

  updateUser(username: string, user: User): Observable<Object>{
    const urlUpdateUser = `${this.userUrl}/${username}`;
    return this.http.put(urlUpdateUser, User, this.httpOptions).pipe(
      catchError(this.handleError<User>(`Updating User with username: ${username}`)));
  }

  deleteUser(username: string): Observable<User> {
    const urlDeleteUser = `${this.userUrl}/${username}`;
    return this.http.delete<User>(urlDeleteUser).pipe(
      catchError(this.handleError<User>(`Deleting User with Username: ${username}`)));
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return  of (result as T);
    }
  }

}
