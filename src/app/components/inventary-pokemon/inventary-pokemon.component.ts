import { Component, OnInit } from '@angular/core';
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
  
  pokemons: Pokemon[] = [];

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.loadPokemonsFromLocalStorage();
  }

  loadPokemonsFromLocalStorage(): void {
    const stored = localStorage.getItem('pokemons');
    if (stored) {
      this.pokemons = JSON.parse(stored);
      // Invertimos el orden para ver los últimos capturados primero (opcional)
      this.pokemons.reverse(); 
    }
  }

  // Eliminar un Pokémon específico
  releasePokemon(index: number, event: Event): void {
    event.stopPropagation(); // Evita que se dispare el click de la tarjeta
    
    // Confirmación simple (puedes quitarla si prefieres borrado rápido)
    if(confirm(`¿Deseas liberar a ${this.pokemons[index].name}?`)) {
      this.pokemons.splice(index, 1);
      this.updateLocalStorage();
    }
  }

  // Borrar todo el inventario
  clearInventory(): void {
    if(confirm('¿Estás seguro de liberar a TODOS tus Pokémon? Esta acción no se puede deshacer.')) {
      this.pokemons = [];
      localStorage.removeItem('pokemons');
    }
  }

  // Guardar cambios en LocalStorage
  private updateLocalStorage(): void {
    // Si invertiste el array al cargar, recuerda invertirlo de nuevo o guardar tal cual
    // dependiendo de tu lógica. Aquí guardamos lo que se ve en pantalla.
    localStorage.setItem('pokemons', JSON.stringify(this.pokemons));
  }

  onClick(id: string): void {
    console.log('Navegar a detalle del ID:', id);
    // Aquí podrías inyectar el Router y navegar:
    // this.router.navigate(['/detalle', id]);
  }
}