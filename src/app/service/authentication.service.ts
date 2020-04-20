import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import { User } from '../entities/user';
import {MainDepartment} from '../entities/main-department';

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
  private jwtToken = localStorage.getItem('token');
  public currentUser: Observable<User>;

  public getToken :string;


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
          //localStorage.setItem('currentUser', JSON.stringify(user.result));
          //localStorage.setItem('token', JSON.stringify(user.result));

           localStorage.setItem('token', user.token);

          // this.getToken = user.token;
          this.behaviorSubject.next(user);
        }
        return user;
      }));
  }
















  /*


  login() {
    let url = 'http://localhost:8082/login';
    let result = this.http.post(url, {
      userName: this.model.username,
      password: this.model.password
    }).map(res => res.json()).subscribe(isValid => {
      if (isValid) {
        sessionStorage.setItem(
          'token',
          btoa(this.model.username + ':' + this.model.password)
        );
        this.router.navigate(['']);
      } else {
        alert("Authentication failed.");
      }
    });
  }



      login(data: any): Observable<any> {
  return this.http.post<any>(apiUrl + 'login', data)
    .pipe(
      tap(_ => this.isLoggedIn = true),
      catchError(this.handleError('login', []))
    );

  login(username: string, password: string) {
        return this.http.post<any>(`${config.apiUrl}/users/authenticate`, { username, password })
            .pipe(map(user => {
                // login successful if there's a jwt jwtToken in the response
                if (user && user.token) {
                    // store user details and jwt jwtToken in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }

                return user;
            }));
    }


  login(email: string, password: string) {
    return this.http.post<any>(`auth/login`, { email, password })
      .pipe(map(user => {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user.result));
          this.currentUserSubject.next(user);
        }
        return user;
      }));
  }





    login(user: { username: string, password: string }): Observable<boolean> {
    return this.http.post<any>(`${config.apiUrl}/login`, user)
      .pipe(
        tap(tokens => this.doLoginUser(user.username, tokens)),
        mapTo(true),
        catchError(error => {
          alert(error.error);
          return of(false);
        }));
  }



}



   */

  logout() {
    localStorage.removeItem('currentUser');
  }

  getJwtToken() {
    this.getToken = localStorage.getItem(this.jwtToken);
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
      //console.error(error);
      return  of (result as T);
    }
  }

}
