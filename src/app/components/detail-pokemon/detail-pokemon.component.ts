import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardPokemonComponent } from '../card-pokemon/card-pokemon.component';
import { Pokemon } from '../../interfaces/pokemon';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-detail-pokemon',
  standalone: true,
  imports: [CommonModule, CardPokemonComponent],
  templateUrl: './detail-pokemon.component.html',
  styleUrl: './detail-pokemon.component.css'
})
export class DetailPokemonComponent implements OnChanges{
  @Input() pokemon? : Pokemon;
  @Input() openned: boolean = false
  @Output() clicker = new EventEmitter();
  description:string = "";

  constructor(private pokemonService:PokemonService){}

  ngOnChanges(): void {
    if(this.pokemon){
      this.pokemonService.getDescription(this.pokemon.id).then(res => {
        this.description = res
      })
    }
    
  }

}
