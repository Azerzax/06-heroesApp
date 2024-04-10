import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { filter, switchMap, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: ``
})
export class NewPageComponent  implements OnInit{

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    if ( !this.router.url.includes('edit')) return;
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.heroesService.getHeroeById(id)),
      )
      .subscribe( response=>{
          if (!response ) {
            return this.router.navigateByUrl('/');
          }
          this.heroForm.reset(response);
          return;
        }
      )

  }

  public heroForm = new FormGroup({
    id: new FormControl<string>(''),
    superhero: new FormControl<string>('', {nonNullable: true}),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl(''),
  })

  public publishers = [
    {id: 'DC Comics', desc: 'DC - Comics'},
    {id: 'Marvel Comics', desc: 'Marvel - Comics'}
  ]

  get currentHero(): Hero{
    const hero = this.heroForm.value as Hero;
    return hero;
  }

  onSubmit(): void{

    if (this.heroForm.invalid){
      return
    }

    if (this.currentHero.id) {
      this.heroesService.updateHero(this.currentHero)
      .subscribe( hero => {
        this.showSnackbar(`${hero.superhero} actualizado`)
      });
      return;
    }

    this.heroesService.addHero( this.currentHero)
    .subscribe(hero => {
      this.router.navigate(['/heroes/edit', hero.id]);
      this.showSnackbar(`${hero.superhero} añadido`);
    })

  }

  showSnackbar(message: string):void{
    this.snackbar.open(message, 'done', {
      duration: 2500,
    })
  }

  onDelete(){
    if (!this.currentHero.id) {
      throw Error("no id");
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value
    });

    /*
    dialogRef.afterClosed()
    .subscribe(result => {
      if (!result) {
        return
      }else{
        this.heroesService.deleteHeroById(this.currentHero.id)
        .subscribe(wasdeleted => {
          if (wasdeleted) {
            this.router.navigate(['/heroes']);
          }
        })

      }
    });*/ //hay una forma de que esto sea mas limpio y entendible, optimizacion de codigo:

    dialogRef.afterClosed()
    .pipe(
      filter((result:boolean) => result),
      switchMap( () => this.heroesService.deleteHeroById(this.currentHero.id)),
      filter((wasDeleted:boolean) => wasDeleted),
    )
    .subscribe(wasdeleted => {
        this.router.navigate(['/heroes']);
    })

  }


}
