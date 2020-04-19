import {ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {AuthenticationService} from './service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor(private router: Router, private authenticationService: AuthenticationService) {
  }

  canActivate(routeSnapshot: ActivatedRouteSnapshot,
              stateSnapshot: RouterStateSnapshot) {
    const url: string = stateSnapshot.url;
    if (this.authenticationService.currentUserValue){
      return true;
    }
    this.authenticationService.setRedirectUrl(url);
    this.router.navigate(['/login']);
    return false;
  }
}
