import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: ``
})
export class LoginPageComponent {

  constructor(
    private authService: AuthService,
    private router:Router
  ){

  }

  onLogin():void{
    this.authService.login('fernando@gmail.com', '1234')
      .subscribe( user =>{
        this.router.navigate(['/'])
      });
  }

}
