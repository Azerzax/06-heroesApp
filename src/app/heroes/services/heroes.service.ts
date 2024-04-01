import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
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

}