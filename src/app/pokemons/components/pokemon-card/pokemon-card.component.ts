import { ChangeDetectionStrategy, Component, computed, effect, input, signal } from '@angular/core';
import { SimplePokemon } from '../../interfaces';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'pokemon-card',
  imports: [RouterLink],
  templateUrl: './pokemon-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone:true
})
export class PokemonCardComponent {
  public pokemon = input.required<SimplePokemon>();

  public readonly pokemonImage = computed(()=> `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${this.pokemon().id}.png`)
  // logEffect = effect(()=> {
  //   console.log('Pokemon Card', this.pokemon());
  // })
}