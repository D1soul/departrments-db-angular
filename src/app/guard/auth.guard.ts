import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor(private router: Router, private authenticationService: AuthenticationService) {
  }

  canActivate(routeSnapshot: ActivatedRouteSnapshot,
              stateSnapshot: RouterStateSnapshot) {

    const url: string = stateSnapshot.url;
    const authUser = this.authenticationService.currentUserValue;
    let dataRoles = routeSnapshot.data.roles;
    let equalRoles: boolean = false;

    for (let dataRole in dataRoles) {
      if (dataRoles.hasOwnProperty(dataRole)){
        if (authUser.roles.includes(dataRoles[dataRole])) {
            equalRoles = true;
        }
      }
    }

    if (authUser && authUser.token) {
      if (!dataRoles){
        return true;
      }
      else if(dataRoles && equalRoles) {
        return true;
      }
    }

    this.authenticationService.setRedirectUrl(url);
    this.router.navigate(['/login']).then();
    return false;
  }
}
