import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SimplePokemon } from '../../../../pokemons/interfaces';

@Component({
  selector: 'pokemon-list-skeleton',
  imports: [],
  templateUrl: './pokemon-list-skeleton.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone:true
})
export class PokemonListSkeletonComponent {


}
