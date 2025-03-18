import { Component } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../interfaces/pokemon';
import { NgClass, NgFor, NgIf } from '@angular/common';
@Component({
  selector: 'app-catching-pokemon',
  standalone: true,
  imports: [NgFor,NgIf,NgClass],
  templateUrl: './catching-pokemon.component.html',
  styleUrl: './catching-pokemon.component.css'
})
export class CatchingPokemonComponent {
  randomPokemon: Pokemon | null = null;
  isLoading: boolean = false;

  constructor(private pokemonService: PokemonService) { }

  getRandomPokemon(): void {
    this.isLoading = true;  // Inicia la carga
    const randomId = Math.floor(Math.random() * 898) + 1;  // ID aleatorio entre 1 y 898

    setTimeout(() => {
      this.pokemonService.getById(randomId.toString()).then(pokemon => {
        this.randomPokemon = pokemon;  // Pokémon recibido
        this.saveToLocalStorage(pokemon);  // Guarda el Pokémon en LocalStorage
        this.playSound();  // Reproduce el sonido cuando aparece el Pokémon
      }).catch(error => {
        console.error("Error al obtener el Pokémon:", error);
      }).finally(() => {
        this.isLoading = false;  // Finaliza la carga
      });
    }, 1000);  // Retraso de 1 segundo
  }

  saveToLocalStorage(pokemon: Pokemon): void {
    const storedPokemons = JSON.parse(localStorage.getItem('pokemons') || '[]');
    storedPokemons.push(pokemon);
    localStorage.setItem('pokemons', JSON.stringify(storedPokemons));
  }

  playSound(): void {
    const audio = new Audio('https://example.com/pokemon-sound.mp3');  // URL del archivo de sonido
    audio.play();  // Reproduce el sonido
  }
}
