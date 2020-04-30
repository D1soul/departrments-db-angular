import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AuthenticationService } from "./service/authentication.service";
import { Observable } from 'rxjs';

@Injectable()
export class JwtTokenInterceptor implements HttpInterceptor{

  constructor(private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let jwtRequest = request;
    const authUser = this.authenticationService.currentUserValue;
    if(authUser && authUser.token){
      jwtRequest = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + authUser.token
        }
      });
    }
    return next.handle(jwtRequest);
  }
}
