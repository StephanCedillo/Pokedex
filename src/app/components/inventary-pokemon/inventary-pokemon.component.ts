//src/app/components/inventary-pokemon/inventary-pokemon.component.ts
import { Component, Input, OnChanges, Output, EventEmitter ,ViewChild, OnInit} from '@angular/core';
import { Result } from '../../interfaces/pokeapi';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../interfaces/pokemon';


@Component({
  selector: 'app-inventary-pokemon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inventary-pokemon.component.html',
  styleUrl: './inventary-pokemon.component.css'
})
export class InventaryPokemonComponent implements OnInit {
  
  pokemons: Pokemon[] = [];  // Array to hold all Pokémon from localStorage
  
  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.loadPokemonsFromLocalStorage();
  }

  // Load Pokémon data from localStorage
  loadPokemonsFromLocalStorage(): void {
    const storedPokemons = JSON.parse(localStorage.getItem('pokemons') || '[]');
    this.pokemons = storedPokemons;
  }

  onClick(id: string): void {
    // Logic for handling Pokémon click, if necessary
  }
}
