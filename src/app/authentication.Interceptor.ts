import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Router} from '@angular/router';
import {AuthenticationService} from "./service/authentication.service";
import {catchError} from "rxjs/operators";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor{
  constructor(private router: Router, private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if(this.authenticationService.getJwtToken()){
      request = request.clone({
        setHeaders: {
          'Authorization': 'Bearer ' + this.authenticationService.getJwtToken()
        }
      });
    }
    else {

    }



    return next.handle(request).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return this.handle401Error(request, next);
      } else {
        return throwError(error);
      }
    }));
  }

}
