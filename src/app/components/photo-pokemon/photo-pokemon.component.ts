import { Component , Input, OnChanges} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pokemon } from '../../interfaces/pokemon';

@Component({
  selector: 'app-photo-pokemon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './photo-pokemon.component.html',
  styleUrl: './photo-pokemon.component.css'
})
export class PhotoPokemonComponent {
  @Input() pokemon?:Pokemon;
  get animatedPhoto(): string | undefined {
    if (this.pokemon && this.pokemon.id) {
      if(this.pokemon.id >= 650){
        return this.pokemon.sprites.front_default.toString()
      } else {
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${this.pokemon.id}.gif`;
      }
    }
    return undefined;
  }
}
