import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class NonAuthGuard implements CanActivate{

  constructor(private router: Router, private authenticationService: AuthenticationService) {
  }

  canActivate(routeSnapshot: ActivatedRouteSnapshot,
              stateSnapshot: RouterStateSnapshot) {

    const url: string = stateSnapshot.url;
    const authUser = this.authenticationService.currentUserValue;

    if (!authUser) {
        return true;
    }

    if (this.authenticationService.isAdmin()){
      this.router.navigate(['/users']).then();
    }
    else {
      this.router.navigate(['/main_departments']).then();
    }

    this.authenticationService.setRedirectUrl(url);
    this.router.navigate(['/user_detail/',this.authenticationService.currentUserValue.username]).then();

    return false;
  }
}
