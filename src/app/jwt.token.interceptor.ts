import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { Router } from '@angular/router';
import { AuthenticationService } from "./service/authentication.service";

@Injectable()
export class JwtTokenInterceptor implements HttpInterceptor{
  constructor(private router: Router, private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if(this.authenticationService.currentUserValue() && this.authenticationService.getJwtToken()){
      request = request.clone({
        setHeaders: {
          'Authorization': 'Bearer ' + this.authenticationService.getJwtToken()
        }
      });
    }
    return next.handle(request);
  }
}
