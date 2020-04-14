import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Router} from '@angular/router';
import {AuthenticationService} from "./service/authentication.service";
import {catchError} from "rxjs/operators";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{
  constructor(private router: Router, private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(catchError(error => {
      if (error.status === 401) {
        this.authenticationService.logout();
        this.router.navigate(['login']);
      }
      return throwError(error.error.message || error.statusText);
    }))
  }
}
