
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonCardComponent } from './pokemon-card.component';
import { provideRouter } from '@angular/router';
import { SimplePokemon } from '../../interfaces';

const mockPockemon: SimplePokemon = {
  id:'1',
  name: 'Bulbasaur'
}

describe('PokemonCardComponent', () => {

  let fixture: ComponentFixture<PokemonCardComponent>;
  let compiled: HTMLElement;
  let component: PokemonCardComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonCardComponent],
      providers:[provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonCardComponent);
    fixture.componentRef.setInput('pokemon', mockPockemon);


    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have the simplePokemon signal inputValue', () => {
    expect(component.pokemon()).toEqual(mockPockemon);
  });

  it('should render the pokemon name and image correctly', () => {
    const imgSrc = compiled.querySelector('img')?.getAttribute('src');
    const name = compiled.querySelector('span');
    expect(name?.innerText.trim()).toEqual(mockPockemon.name.trim());
    expect(imgSrc).toEqual(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${mockPockemon.id}.png`)
  });

  it('should hace te proper ng-reflect-router-link', () => {
    const divWithLink = compiled.querySelector('div');
    expect(
      divWithLink?.attributes.getNamedItem('ng-reflect-router-link')?.value
    ).toBe(`/pokemons,${mockPockemon.name}`)
  });


});
