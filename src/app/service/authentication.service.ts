import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {User} from '../entities/user';
import {LoggingUser} from '../entities/logging.user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly loginUrl: string;
  private readonly adminUrl: string;
  private readonly userUrl: string;
  private readonly changePasUrl: string;
  private readonly registrationUrl: string;
  private  behaviorSubject: BehaviorSubject<LoggingUser>;
  private redirectUrl: string = '/';
  public currentUser: string = 'currentUser';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient ) {
    this.loginUrl = 'http://localhost:8080/auth/login';
    this.adminUrl = 'http://localhost:8080/admin';
    this.userUrl = 'http://localhost:8080/auth/users';
    this.changePasUrl = 'http://localhost:8080/auth/changing-password';
    this.registrationUrl = 'http://localhost:8080/auth/registration';
    this.behaviorSubject = new BehaviorSubject<LoggingUser>(JSON.parse(localStorage.getItem(this.currentUser)));
  }

  public get currentUserValue(): LoggingUser{
    return this.behaviorSubject.value;
  }

  setRedirectUrl(url: string): void {
    this.redirectUrl = url;
  }

  login(username: string, password: string) {
    return this.http.post<any>(this.loginUrl, {username, password})
      .pipe(map(user => {
        if (user && user.token) {
            console.log(user.roles.values());
           localStorage.setItem(this.currentUser, JSON.stringify(user));
           this.behaviorSubject.next(user);
        }
        return user;
    }));
  }

  changeOldPassword(username: string, password: string, newPassword: string, newConfirmPassword): Observable<any> {
    return this.http.put<any>(this.changePasUrl,{username, password, newPassword, newConfirmPassword
    }, this.httpOptions).pipe(
        catchError(this.handleError<User>(`User with username: ${username} detail`)));
  }

  logout() {
    localStorage.removeItem(this.currentUser);
    this.behaviorSubject.next(null);
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
    return this.http.put(urlUpdateUser, user, this.httpOptions).pipe(
      catchError(this.handleError<User>(`Updating User with username: ${username}`)));
  }


  /*
    updateMainDeptEmployee(
    lastName: string, firstName: string, middleName: string,
    mainDeptEmployee: MainDeptEmployee): Observable<Object>{
      const urlFullName = `${this.url}/${lastName}/${firstName}/${middleName}`;
      return this.http.put(urlFullName, mainDeptEmployee, this.httpOptions).pipe(
        catchError(this.handleError<MainDeptEmployee>(
          `Updating Main Dept Employee with Full Name: ${lastName} ${firstName} ${middleName}`)));
  }
   */

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
