import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Result } from '../../interfaces/pokeapi';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../interfaces/pokemon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardPokemonComponent } from '../card-pokemon/card-pokemon.component';
@Component({
  selector: 'app-detail-pokemon',
  standalone: true,
  imports: [CommonModule, FormsModule,CardPokemonComponent],
  templateUrl: './detail-pokemon.component.html',
  styleUrls: ['./detail-pokemon.component.css']
})
export class DetailPokemonComponent implements OnChanges {
  @Input() data?: Result;
  @Input() selected: boolean = false;
  @Input() fullData?: Pokemon;
  @Output() clicked = new EventEmitter<string>();
  @Input() pokemon? : Pokemon;
  @Input() openned: boolean = false
  @Output() clicker = new EventEmitter();

  id: string = "0";
  audio: HTMLAudioElement = new Audio();
  selectedPokemon?: Pokemon;
  description: string = "";
   // Agregado para manejar el backdrop

  constructor(private pokemonService: PokemonService) {}
  ngOnChanges(): void {
    if (this.pokemon) {
      this.pokemonService.getDescription(this.pokemon.id).then(res => {
        this.description = res;
      });
  
      // Asegurar que hay un sonido disponible antes de llamar a la función
      if (this.pokemon.cries?.latest) {
        this.extractInformation();
      }
    }
  }

  extractInformation() {
    if (this.data && this.data.url) {
      this.id = this.data.url.substring(34, this.data.url.length - 1);
    } else if (this.fullData) {
      this.id = this.fullData.species.url.substring(42, this.fullData.species.url.length - 1);
      this.data = {
        name: this.fullData.species.name,
        url: ""
      };
    }
  }

  async onClick(id: string) {
    this.clicked.emit(id);
    this.selectedPokemon = await this.pokemonService.getById(id);
    
    // Cambia el estado de `selected`
    this.selected = !this.selected;
    
    // Obtiene la descripción del Pokémon
    this.description = await this.pokemonService.getDescription(id);

    // Alterna el estado de `openned`
    this.openned = !this.openned;
  }

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
