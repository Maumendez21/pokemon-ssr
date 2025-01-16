import { ChangeDetectionStrategy, Component, OnInit, signal, PLATFORM_ID, inject } from '@angular/core';
import { Pokemon } from '../../pokemons/interfaces';
import { PokemonService } from '../../pokemons/services/pokemon.service';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'pokemon-page',
  imports: [],
  templateUrl: './pokemon-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone:true
})
export default class PokemonPageComponent implements OnInit {

  private service =inject(PokemonService);
  private route = inject(ActivatedRoute);
  private title = inject(Title);
  private meta = inject(Meta);

  public pokemon = signal<Pokemon | null>(null);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.service.loadPokemon(id)
    .pipe(
      tap(({name,id})=>{
        const pageTitle = `#${id} - ${name}`;
        const pageDescription = `Pokemon Page ${name}`;
        this.title.setTitle(pageTitle);
        this.meta.updateTag({name:'description',content:pageDescription});
        this.meta.updateTag({name:'og:title',content:pageTitle});
        this.meta.updateTag({name:'og:description',content:pageDescription});
        this.meta.updateTag({name:'og:image',content:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${id}.png`});
      })
    )
    .subscribe(this.pokemon.set);
  }


}
