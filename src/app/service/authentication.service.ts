import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
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
  private  behaviorSubject: BehaviorSubject<User>;
  private redirectUrl: string = '/';
  private jwtToken: string = 'token';
  public currentUser: Observable<User>;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {
    this.loginUrl = 'http://localhost:8080/auth/login';
    this.adminUrl = 'http://localhost:8080/admin';
    this.userUrl = 'http://localhost:8080/users';
    this.registrationUrl = 'http://localhost:8080/registration';
    this.behaviorSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.behaviorSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.behaviorSubject.value;
  }

  isUserLoggedIn(): boolean {
    return this.isLoggedIn;
  }

  setRedirectUrl(url: string): void {
    this.redirectUrl = url;
  }

  login(username: string, password: string) {
    return this.http.post<any>(this.loginUrl, {username, password})
      .pipe(map(user => {
        if (user && user.token) {

           localStorage.setItem(this.jwtToken, user.token);
          //localStorage.setItem('currentUser', JSON.stringify(user));
           this.behaviorSubject.next(user);
        }
        return user;
      }));
  }


  logout() {
    return localStorage.removeItem(this.jwtToken);
  }

  getJwtToken() {
    return localStorage.getItem(this.jwtToken);
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

  registration(user: User): Observable<User> {
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
      //console.error(error);
      return  of (result as T);
    }
  }

}
