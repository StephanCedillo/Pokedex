//src/app/app.component.ts

import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PokemonService } from './services/pokemon.service';
import { Pokemon } from './interfaces/pokemon';
import { CardPokemonComponent } from './components/card-pokemon/card-pokemon.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'Pokedex';
  pokemon: Pokemon | null = null;
  error: string | null = null;

  constructor(private pokemonService: PokemonService) {}
  ngOnInit(): void {
    this.playMusic();
  }

  pauseMusic() {
    const audio = document.getElementById('backgroundMusic') as HTMLAudioElement;
    audio.pause();
  }

  playMusic() {
    console.log("Música empieza")
    const audio = document.getElementById('backgroundMusic') as HTMLAudioElement;
    audio.volume = 0.10
    audio.play();
  }
   // Buscar por nombre
   async searchByName(name: string) {
    this.pokemon = await this.pokemonService.getByName(name);
    if (this.pokemon === null) {
      this.error = 'Pokémon no encontrado';
    }
  }

  // Buscar por ID
  async searchById(id: string) {
    this.pokemon = await this.pokemonService.getById(id);
  }

}
