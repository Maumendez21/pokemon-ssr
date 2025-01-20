import { ApplicationRef, ChangeDetectionStrategy, Component, effect, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { PokemonListComponent } from '../../pokemons/components/pokemon-list/pokemon-list.component';
import { PokemonListSkeletonComponent } from "./ui/pokemon-list-skeleton/pokemon-list-skeleton.component";
import { PokemonService } from '../../pokemons/services/pokemon.service';
import { SimplePokemon } from '../../pokemons/interfaces';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal,toObservable } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'pokemons-page',
  imports: [PokemonListComponent, PokemonListSkeletonComponent,RouterLink],
  templateUrl: './pokemons-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone:true
})
export default class PokemonsPageComponent  implements  OnDestroy{

  public isLoading  = signal(true);
  public pokemons = signal<SimplePokemon[]>([]);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private title = inject(Title);

  public currentPage = toSignal<number>(
    this.route.params.pipe(
      map(params => params['page']??'1'),
      map(page=> (isNaN(+page)? 1 : +page)),
      map(page => Math.max(1,page))
    )
  )

  private appRef = inject(ApplicationRef);
  private pokemonService = inject(PokemonService);
  private $appState = this.appRef.isStable.subscribe(isStable => {})

  // ngOnInit(): void {
  //   this.loadPokemons();
  //   setTimeout(() => {
  //     this.isLoading.set(false)
  //   }, 5000);
  // }

  public loadOnPageChanged= effect(()=> {
    console.log('chganged page',this.currentPage());
    this.loadPokemons(this.currentPage());
  }, {
    allowSignalWrites:true
  })

  public loadPokemons(nextPage:number=0){
    const pageToLoad = this.currentPage()!+nextPage;
    this.pokemonService.loadPage(pageToLoad).pipe(
      // tap(()=>this.router.navigate([], {queryParams:{page:pageToLoad}})),
      tap(()=> this.title.setTitle(`Pokemons SSR - Page ${pageToLoad}`))
    )
    .subscribe(this.pokemons.set);
  }

  ngOnDestroy(): void {
    this.$appState.unsubscribe();
  }
}
