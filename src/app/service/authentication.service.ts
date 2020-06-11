import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../entities/user';
import { LogInUser } from '../entities/login-user';
import { Role } from '../entities/role';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly loginUrl: string;
  private readonly adminUrl: string;
  private readonly userUrl: string;
  private readonly changePasUrl: string;
  private readonly registrationUrl: string;
  private readonly forgotPasswordUrl: string;
  private readonly resetPasswordUrl: string;
  private behaviorSubject: BehaviorSubject<LogInUser>;
  private redirectUrl: string = '/';
  public currentUser: string = 'currentUser';
  role: Role;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private router: Router) {
    this.loginUrl = 'http://localhost:8080/departments-app/auth/login';
    this.adminUrl = 'http://localhost:8080/departments-app/auth/admin';
    this.userUrl = 'http://localhost:8080/departments-app/auth/users';
    this.changePasUrl = 'http://localhost:8080/departments-app/auth/changing-password';
    this.registrationUrl = 'http://localhost:8080/departments-app/auth/registration';
    this.forgotPasswordUrl = 'http://localhost:8080/departments-app/auth/forgot-password';
    this.resetPasswordUrl = 'http://localhost:8080/departments-app/auth/reset-password';
    this.behaviorSubject = new BehaviorSubject<LogInUser>(JSON.parse(localStorage.getItem(this.currentUser)));
    this.role = new Role();
  }

  public get currentUserValue(): LogInUser{
    return this.behaviorSubject.value;
  }

  setRedirectUrl(url: string): void {
    this.redirectUrl = url;
  }

  login(username: string, password: string) {
    return this.http.post<any>(this.loginUrl, {username, password})
      .pipe(map(user => {
        if (user && user.token) {
           localStorage.setItem(this.currentUser, JSON.stringify(user));
           this.behaviorSubject.next(user);
        }
        return user;
    }),
        catchError(this.handleError<string>(`Log In: `)));
  }

  changeOldPassword(username: string, password: string, newPassword: string, newConfirmPassword): Observable<any> {
    return this.http.put<any>(this.changePasUrl,{username, password, newPassword, newConfirmPassword
    }).pipe(
        catchError(this.handleError<string>(`change old password: `)));
  }

  sendResetPasswordTokenToEmail(email: string) {
    return this.http.post<any>(this.forgotPasswordUrl + `?email=${email}`, this.httpOptions)
     .pipe(map(result => {
       return result.successMessage;
      }),  catchError(this.handleError<string>(`Forgot password: `)
     ));
  }

  resetPasswordByToken(password:string, confirmPassword: string, token: string) {
    return this.http.put<any>(this.resetPasswordUrl, {token, password, confirmPassword},
      this.httpOptions).pipe(map( result =>{
        return result;
        }),
      catchError(this.handleError<string>(`Reset password token: `)
    ));
  }

  isAdmin(): boolean{
    if (this.currentUserValue) {
      return this.currentUserValue.roles.includes(this.role.admin);
    }
  }

  logout() {
    localStorage.removeItem(this.currentUser);
    this.behaviorSubject.next(null);
    this.router.navigate(['login']).then();
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl).pipe(
      catchError(this.handleError<User[]>('User List:')));
  }

  getUserDetails(username: string): Observable<User> {
    const getUserDetailUrl = `${this.userUrl}/${username}`;
    return this.http.get<User>(getUserDetailUrl).pipe(
      catchError(this.handleError<User>(`User with username: ${username} detail`)));
  }

  registration(user: User): Observable<User> {
    return this.http.post<any>(this.registrationUrl, user, this.httpOptions).pipe(
      catchError(this.handleError<any>('Adding New User')))
  }

  updateUser(username: string, user: User): Observable<any>{
    const urlUpdateUser = `${this.userUrl}/${username}`;
    return this.http.put<any>(urlUpdateUser, user, this.httpOptions).pipe(map(result => {
        if (result.newAuthUser && result.newAuthUser.token) {
          localStorage.removeItem(this.currentUser);
          localStorage.setItem(this.currentUser, JSON.stringify(result.newAuthUser));
          this.behaviorSubject.next(result.newAuthUser);
        }
        return result.newAuthUser;
      }),
      catchError(this.handleError<User>(`Updating User with username: ${username}`)));
  }

  deleteUser(username: string): Observable<User> {
    const urlDeleteUser = `${this.userUrl}/${username}`;
    return this.http.delete<User>(urlDeleteUser).pipe(
      catchError(this.handleError<User>(`Deleting User with Username: ${username}`)));
  }

  private handleError<T> (operation = 'operation') {
    return (error: any): Observable<T> => {
      console.error(operation + ': ' + error);
      return  throwError(error);
    }
  }
}
