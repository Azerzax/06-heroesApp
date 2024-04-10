import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environments } from '../../../environments/environments';

@Injectable({providedIn: 'root'})
export class HeroesService {

  private baseUrl: string =environments.baseUrl;

  constructor(private httpClient: HttpClient) {

  }

  getHeroes(): Observable<Hero[]>{
    return this.httpClient.get<Hero[]>(`${ this.baseUrl }/heroes`);
  }

  getHeroeById(id: string): Observable<Hero|undefined>{
    return this.httpClient.get<Hero>(`${ this.baseUrl }/heroes/${id}`)
    .pipe(
      catchError(error => of(undefined))
    );
    //El of se pone porque sino no estaria devolviendo un observable, que es lo que espera el getherobyid
  }

  getSuggestions(busqueda: string): Observable<Hero[]>{
    return this.httpClient.get<Hero[]>(`${ this.baseUrl }/heroes?q=${busqueda}&_limit=6`);
  }

  addHero(hero: Hero): Observable<Hero>{
    return this.httpClient.post<Hero>(`${ this.baseUrl }/heroes`, hero);
  }

  updateHero(hero: Hero): Observable<Hero>{
    if(!hero.id){
      throw Error('Hero is is requireed')
    }
    return this.httpClient.patch<Hero>(`${ this.baseUrl }/heroes/${hero.id}`, hero);
  }

  deleteHeroById( id:string ): Observable<boolean>{
    return this.httpClient.delete(`${ this.baseUrl }/heroes/${id}`)
            .pipe(
              map(resp => true),
              catchError(err => of(false))
            )
  }



}
