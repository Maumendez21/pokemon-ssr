import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { PokeAPIResponse, Pokemon, SimplePokemon } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private http = inject(HttpClient);

  constructor() { }

  public loadPage(page:number): Observable<SimplePokemon[]>{
    if (page!==0) --page;
    page = Math.max(0, page);
    return this.http.get<PokeAPIResponse>(
      `https://pokeapi.co/api/v2/pokemon?offset=${page*20}&limit=20`
    )
    .pipe(
      map(resp => {
        const simplePokemons:SimplePokemon[] = resp.results.map(p => ({
          id:p.url.split('/').at(-2)??'',
          name: p.name
        }));
        return simplePokemons;
      })
    )
  }

  public loadPokemon(id:string){
    return this.http.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse){
    if (error.status === 0)  console.log('An error ocurred: ', error.error);
    else  console.log(`Backend return code: ${error.status}, body: `, error.error);
    const errorMessage = error.error ?? 'Error Ocurred';
    return throwError(()=> new Error(errorMessage))
  }

}
