import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AccountSerivice } from './account.service';

@Injectable({providedIn: 'platform'})
export class AdminGuard implements CanActivate {
    constructor(private accountService : AccountSerivice, private router: Router){}
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.accountService.checkIsAdmin()
        .then((isAdmin: boolean) => {
            if(isAdmin){
                return true
            } else {
                this.router.navigate(['/home'])
                return false
            }
        })
    }
}
