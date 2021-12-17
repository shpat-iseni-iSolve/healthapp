import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { stringify } from 'querystring';
import { empty } from 'rxjs';

import { AccountService } from '../_services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private accountService: AccountService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.accountService.userValue;
        console.log(route);
        console.log('path: ', route.routeConfig.path);
        console.log('user?.role: ', user.role);


        if (user.role == 'user' && route.routeConfig.path == '' || route.routeConfig.path == 'make-appointment' ) {
            // authorised so return true
            return true;
        }
        if (user.role == 'admin' && route.routeConfig.path == '' || route.routeConfig.path == 'users' ) {
            // authorised so return true
            return true;
        }
        if (user.role == 'lab' && route.routeConfig.path == '' || route.routeConfig.path == 'make-appointment' ) {
            // authorised so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}