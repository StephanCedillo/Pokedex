import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Result } from '../../interfaces/pokeapi';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../interfaces/pokemon';

@Component({
  selector: 'app-card-pokemon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-pokemon.component.html',
  styleUrl: './card-pokemon.component.css'
})
export class CardPokemonComponent implements OnChanges {
  ngOnChanges(): void {
    this.extractInformation()
  }

  constructor(private pokemonService: PokemonService){}

  @Input() data?:Result;
  @Input() selected:boolean = false;
  @Input() fullData?: Pokemon
  @Output() clicked = new EventEmitter<string>(); 
  id:string = "0";
  audio: HTMLAudioElement = new Audio();
  selectedPokemon?:Pokemon

  extractInformation() {
    if(this.data && this.data.url !== ""){
      this.id = this.data.url.substring(34,this.data.url.length-1)
      return
    } if(this.fullData){
      this.id = this.fullData.species.url.substring(42,this.fullData.species.url.length-1)
      this.data = {
        name: this.fullData.species.name,
        url: ""
      }
    }
  }

  async onClick(id: string) {
    this.clicked.emit(id);
    this.selectedPokemon = await this.pokemonService.getById(id);
    this.reproducirSonido(this.selectedPokemon.cries.latest);
  }

  reproducirSonido(url: string) {
    this.audio.src = url;
    this.audio.load();
    this.audio.volume = 0.05;
    this.audio.play();
  }


}
