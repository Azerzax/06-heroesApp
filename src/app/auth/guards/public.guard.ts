import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable, map, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PublicGuard implements CanActivate{

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  private checkPublicStatus(): boolean | Observable<boolean>{

    return this.authService.checkAuthentication()
      .pipe(
        tap(isAuthenticated => {
          console.log('authenticated:', isAuthenticated)
        }),
        tap(isAuthenticated => {
          if(isAuthenticated){
            console.log("ya estas logado, no puedes entrar a la pagina de login");
            this.router.navigate(['./']);
          }else{
            console.log("no estas logado, puedes entrar a la pagina de login");
          }
        }),
        map(isAuthenticated => !isAuthenticated) //este map lo que hace es cambiar el valor porque sino entraria en bucke para la linea 26 (console.log("no estas logado, puedes entrar a la pagina de login");)
      )
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    return this.checkPublicStatus();
  }

}
