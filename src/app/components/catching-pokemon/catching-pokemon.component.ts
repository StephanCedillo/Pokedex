import { Component } from '@angular/core';
// Importamos CommonModule para usar pipes como titlecase y number
import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../interfaces/pokemon';

@Component({
  selector: 'app-catching-pokemon',
  standalone: true,
  // Agregamos CommonModule aquí
  imports: [NgFor, NgIf, NgClass, CommonModule],
  templateUrl: './catching-pokemon.component.html',
  styleUrl: './catching-pokemon.component.css'
})
export class CatchingPokemonComponent {
  randomPokemon: Pokemon | null = null;
  isLoading: boolean = false;

  constructor(private pokemonService: PokemonService) { }

  getRandomPokemon(): void {
    this.isLoading = true;
    this.randomPokemon = null; // Reseteamos el pokemon anterior si hubiera
    
    // Aumentado el rango a 1010 para incluir más generaciones si la API lo soporta
    const randomId = Math.floor(Math.random() * 1010) + 1;

    // Aumenté un poco el tiempo para que se aprecie la animación de carga (1.5s)
    setTimeout(() => {
      this.pokemonService.getById(randomId.toString()).then(pokemon => {
        this.randomPokemon = pokemon;
        this.saveToLocalStorage(pokemon);
        
      }).catch(error => {
        console.error("Error al obtener el Pokémon:", error);
        // Aquí podrías mostrar un mensaje de error al usuario
      }).finally(() => {
        this.isLoading = false;
      });
    }, 1500); 
  }

  // Método para el botón "Intentar de nuevo"
  resetView(): void {
    this.randomPokemon = null;
  }

  saveToLocalStorage(pokemon: Pokemon): void {
    // Usamos un Set para evitar duplicados basados en el ID si quisieras, 
    // pero tu implementación actual está bien para empezar.
    const storedPokemons = JSON.parse(localStorage.getItem('pokemons') || '[]');
    storedPokemons.push(pokemon);
    localStorage.setItem('pokemons', JSON.stringify(storedPokemons));
  }

 
}