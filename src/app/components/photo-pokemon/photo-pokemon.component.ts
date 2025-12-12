import { Component, Input } from '@angular/core';
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
  @Input() pokemon?: Pokemon;
  
  // Variable para manejar si la imagen falla y mostrar un fallback
  imageError: boolean = false;

  get animatedPhoto(): string | undefined {
    if (this.pokemon && this.pokemon.id) {
      // Si hubo error cargando el gif, mostramos la estática oficial
      if (this.imageError) {
        return this.pokemon.sprites.front_default;
      }

      // Lógica: Pokémon < 650 usan el GIF de Black/White (Gen 5)
      // Pokémon >= 650 usan la imagen estática (o podrías usar 'showdown' de la API)
      if (this.pokemon.id >= 650) {
        // Opción: Usar sprites "Showdown" para animación moderna si la API lo tiene
        // return this.pokemon.sprites.other?.showdown?.front_default || this.pokemon.sprites.front_default;
        return this.pokemon.sprites.front_default;
      } else {
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${this.pokemon.id}.gif`;
      }
    }
    return undefined;
  }

  // Obtiene el tipo principal para colorear el fondo (ej: 'fire', 'water')
  get primaryType(): string {
    return this.pokemon?.types[0].type.name || 'normal';
  }

  // Si la imagen falla (404), cambiamos a la versión segura
  handleError() {
    this.imageError = true;
  }
}