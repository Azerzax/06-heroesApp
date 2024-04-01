import { ActivatedRoute, Router } from '@angular/router';
import { HeroesService } from './../../services/heroes.service';
import { Component, OnInit } from '@angular/core';
import { delay, switchMap } from 'rxjs';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: ``
})
export class HeroPageComponent implements OnInit{

  public hero?: Hero;

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ){
  }

  /*
  ngOnInit(): void {
    this.activatedRoute.params
    .subscribe( params => {
      console.log({params})
    })
  } ESTO LO QUE HARIA SERIA OBTENER DIRECTAMENTE LOS PARAMETROS QUE LLEGAN POR URL, EN ESTE CASO ID*/

  //PERO DE ESTA FORMA CON EL PIPE PUEDO USAR EL SWITCHMAP PARA EXTRAER EL ID DE PARAMS Y USARLO
  //PARA HACER OTRO REQUEST Y DESPUES SUSCRIBIRME A LO QUE DEVUELVE EL REQUEST DE GETHEROEBYID

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      delay(1000),
      switchMap(({id}) => this.heroesService.getHeroeById(id))
    ).subscribe( heroResponse => {
      console.log(heroResponse)
      if (!heroResponse) {
        this.router.navigate(['/heroes/list'])
      }
      this.hero = heroResponse;
    })
  }

  goBack():void{
    this.router.navigateByUrl('/heroes/list')
  }

}
