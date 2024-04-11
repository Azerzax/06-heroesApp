import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, GuardResult, MaybeAsync, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanMatch, CanActivate /*Canload esta deprecado */{

  //los guards son servicios que implementan al menos una interfaz

  //Esto esta deprecated en verdad

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  private checkAuthStatus(): boolean | Observable<boolean>{

    return this.authService.checkAuthentication()
      .pipe(
        tap(isAuthenticated => {
          console.log('authenticated:', isAuthenticated)
        }),
        tap(isAuthenticated => {
          if(!isAuthenticated){
            this.router.navigate(['./auth/login']);
          }
        }),
      )
  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    //console.log("Can activate");
    //console.log({route, state});
    //return false;
    //dependiendo de si se devuelve true o false se enseña la pagina o se esneña la pagina de error
    return this.checkAuthStatus();
  }

  canMatch(route: Route, segments: UrlSegment[]): MaybeAsync<GuardResult> {
    //console.log("Can match");
    //console.log({route, segments});
    //return false;
    //dependiendo de si se devuelve true o false se enseña la pagina o se esneña la pagina de error
    return this.checkAuthStatus();
  }

}
