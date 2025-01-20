

import { TestBed } from "@angular/core/testing";
import { PokemonService } from "./pokemon.service";
import { provideHttpClient } from "@angular/common/http";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { PokeAPIResponse, SimplePokemon } from "../interfaces";
import { catchError } from "rxjs";

const mockResponse: PokeAPIResponse = {
  "count": 1302,
  "next": "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20",
  "previous": null,
  "results": [
    {
      "name": "Bulbasaur",
      "url": "https://pokeapi.co/api/v2/pokemon/1/"
    },
    {
      "name": "Ivysaur",
      "url": "https://pokeapi.co/api/v2/pokemon/2/"
    }
  ]
}

const mockPokemons: SimplePokemon[] = [
  {id:'1', name: 'Bulbasaur'},
  {id:'2', name: 'Ivysaur'}
]
const mockPokemon = {
  id:'1',
  name: 'Bulbasaur'
}
describe('PokemonService', () => {
  let service: PokemonService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(PokemonService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(()=> {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load a page of simple pokemons', () => {
    service.loadPage(1).subscribe(pokemons => {
      expect(pokemons).toEqual(mockPokemons)
    });

    const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=20`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });


  it('should load a page 5 of pokemons', () => {
    service.loadPage(5).subscribe(pokemons => {
      expect(pokemons).toEqual(mockPokemons)
    });

    const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon?offset=80&limit=20`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should load a pokemon by id', () => {
    service.loadPokemon(mockPokemon.id).subscribe((pokemon:any) => {
      expect(pokemon).toEqual(mockPokemon);
    })
    const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon/${mockPokemon.id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPokemon)

  });

  it('should catch error pokemon not found', () => {
    const pokemon = 'im-not-exists';
    service.loadPokemon(pokemon)
    .pipe(
      catchError(err => {
        expect(err.message).toContain('Pokemon not found');
        return[];
      })
    )
    .subscribe((pokemon:any) => {
      expect(pokemon).toEqual(mockPokemon);
    })
    const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    expect(req.request.method).toBe('GET');
    req.flush('Pokemon not found', {
      status: 404,
      statusText: 'Not Found'
    });
  });

});
