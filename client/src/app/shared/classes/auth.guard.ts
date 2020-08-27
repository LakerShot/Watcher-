import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot,CanActivateChild, RouterStateSnapshot, Router} from "@angular/router";
import {Observable, of} from "rxjs";
 
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild{
  constructor(
    private auth: AuthService,
    private router: Router){
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot ) : Observable<boolean>{
    if (this.auth.isAuthenticated()) {
      return of(true)
      // of reterns new stream
    } else {
      this.router.navigate(['/login'], {
        queryParams: {
          accessDenied: true
        }
      })
      return of(false)
    }
  }
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot ) : Observable<boolean>{
    return this.canActivate(route, state)
  }
}