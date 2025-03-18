import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { CardPokemonComponent } from '../card-pokemon/card-pokemon.component';
import { Pokemon } from '../../interfaces/pokemon';
import { PokemonService } from '../../services/pokemon.service';


@Component({
  selector: 'app-detail-pokemon',
  standalone: true,
  imports: [CommonModule, CardPokemonComponent,NgClass],
  templateUrl: './detail-pokemon.component.html',
  styleUrl: './detail-pokemon.component.css'
})
export class DetailPokemonComponent implements OnChanges {
  @Input() pokemon?: Pokemon;
  @Input() openned: boolean = false;
  @Output() clicker = new EventEmitter();

  description: string = "";

  constructor(private pokemonService: PokemonService) {}

  ngOnChanges(): void {
    if (this.pokemon) {
      this.pokemonService.getDescription(this.pokemon.id).then(res => {
        this.description = res;
        
      });
    }
  }

  

  getStatPercentage(baseStat: number): number {
    return Math.min((baseStat / 255) * 100, 100); // Calcula el porcentaje
  }
}