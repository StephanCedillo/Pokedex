import { Component, ElementRef, OnInit, ViewChild, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PhotoPokemonComponent } from '../../components/photo-pokemon/photo-pokemon.component';
import { CardPokemonComponent } from '../../components/card-pokemon/card-pokemon.component';
import { DetailPokemonComponent } from '../../components/detail-pokemon/detail-pokemon.component';
import { PokemonService } from '../../services/pokemon.service';
import { Result } from '../../interfaces/pokeapi';
import { Pokemon } from '../../interfaces/pokemon';
import { InventaryPokemonComponent } from '../../components/inventary-pokemon/inventary-pokemon.component';
import { CatchingPokemonComponent } from '../../components/catching-pokemon/catching-pokemon.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    PhotoPokemonComponent, 
    CardPokemonComponent, 
    FormsModule, 
    DetailPokemonComponent, 
    InventaryPokemonComponent, 
    CatchingPokemonComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  
  // --- Variables de Estado ---
  menuActive: boolean = false;
  activeView: string = 'inicio';
  closeMenuTimeout: any;
  loading: boolean = false;
  detail: boolean = false;

  // --- Variables de Datos ---
  pokemonList: Result[] = [];
  page: number = 0;
  selectedPokemon?: Pokemon;

  // --- Variables de Filtros ---
  searchTerm: string = ''; // Reemplaza a searchNumber para aceptar texto
  selectedGeneration: string = '';
  selectedType: string = '';

  // Datos estáticos para los selectores
  generations = [
    { name: 'Gen 1 (Kanto)', id: '1' },
    { name: 'Gen 2 (Johto)', id: '2' },
    { name: 'Gen 3 (Hoenn)', id: '3' },
    { name: 'Gen 4 (Sinnoh)', id: '4' },
    { name: 'Gen 5 (Unova)', id: '5' },
    { name: 'Gen 6 (Kalos)', id: '6' },
    { name: 'Gen 7 (Alola)', id: '7' },
    { name: 'Gen 8 (Galar)', id: '8' },
    { name: 'Gen 9 (Paldea)', id: '9' }
  ];

  pokemonTypes = [
    { name: 'normal' }, { name: 'fighting' }, { name: 'flying' },
    { name: 'poison' }, { name: 'ground' }, { name: 'rock' },
    { name: 'bug' }, { name: 'ghost' }, { name: 'steel' },
    { name: 'fire' }, { name: 'water' }, { name: 'grass' },
    { name: 'electric' }, { name: 'psychic' }, { name: 'ice' },
    { name: 'dragon' }, { name: 'dark' }, { name: 'fairy' }
  ];

  @ViewChild('cards') cardsElement!: ElementRef;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.loadPokemonList();
  }

  // --- CARGA DE DATOS (Paginación) ---
  async loadPokemonList() {
    // Si hay filtros activos, no usamos la paginación normal
    if (this.selectedGeneration || this.selectedType) return;

    this.loading = true;
    try {
      const newPokemons = await this.pokemonService.getByPage(this.page);
      this.pokemonList = [...this.pokemonList, ...newPokemons];
      this.page++;
    } catch (error) {
      console.error('Error cargando lista:', error);
    }
    this.loading = false;
  }

  // --- SCROLL INFINITO ---
  onScroll(e: any) {
    if (this.loading) return;
    
    // IMPORTANTE: Desactivar scroll infinito si estamos filtrando
    // (Los filtros traen todos los resultados de golpe)
    if (this.selectedGeneration || this.selectedType) return;

    if (
      Math.round(
        this.cardsElement.nativeElement.clientHeight + this.cardsElement.nativeElement.scrollTop
      ) === e.srcElement.scrollHeight
    ) {
      this.loadPokemonList();
    }
  }

  // --- BÚSQUEDA ESPECÍFICA (Nombre o ID) ---
  async searchPokemon() {
    // 1. Si hay texto escrito (Prioridad Alta)
    if (this.searchTerm && this.searchTerm.trim().length > 0) {
      this.loading = true;
      try {
        // Convertir a minúsculas y quitar espacios
        const term = this.searchTerm.toLowerCase().trim();
        this.selectedPokemon = await this.pokemonService.getById(term);
        
        if (this.selectedPokemon) {
          this.setActiveView('detalle');
          this.detail = true;
          this.searchTerm = ''; // Opcional: limpiar el input
        }
      } catch (error) {
        alert('Pokémon no encontrado. Verifica el nombre o ID.');
      } finally {
        this.loading = false;
      }
      return; 
    }

    // 2. Si el input está vacío, revisar si hay filtros de Gen/Tipo
    if (this.selectedGeneration || this.selectedType) {
      this.onFilterChange();
    } else {
      // 3. Si no hay nada, resetear a lista normal
      this.resetToDefaultList();
    }
  }

  // --- CAMBIO DE FILTROS (Generación o Tipo) ---
  async onFilterChange() {
    this.loading = true;
    this.pokemonList = []; // Limpiamos la lista actual
    this.page = 0;         // Reseteamos página

    try {
      // A. Filtrar por Generación
      if (this.selectedGeneration) {
        // Al seleccionar generación, limpiamos el tipo para evitar conflictos lógicos
        this.selectedType = ''; 
        this.pokemonList = await this.pokemonService.getByGeneration(this.selectedGeneration);
      } 
      // B. Filtrar por Tipo
      else if (this.selectedType) {
        this.pokemonList = await this.pokemonService.getByType(this.selectedType);
      } 
      // C. Sin filtros
      else {
        this.resetToDefaultList();
      }
    } catch (error) {
      console.error('Error al filtrar:', error);
    } finally {
      this.loading = false;
    }
  }

  // Auxiliar para volver al estado inicial
  resetToDefaultList() {
    this.pokemonList = [];
    this.page = 0;
    this.selectedGeneration = '';
    this.selectedType = '';
    this.loadPokemonList();
  }

  // --- INTERACCIONES Y VISTAS ---
  async clickedCard(id: string) {
    if (this.selectedPokemon && id === this.selectedPokemon?.id.toString()) {
      return this.toggleDetail();
    }
    this.selectedPokemon = await this.pokemonService.getById(id);
  }

  toggleDetail() {
    if (this.selectedPokemon) this.detail = !this.detail;
  }
  
  changeStateDetail(){
    if(this.selectedPokemon) this.detail= !this.detail
  }

  setActiveView(view: string): void {
    this.activeView = view;
  }

  // --- MENU LOGIC ---
  toggleMenu() {
    this.menuActive = !this.menuActive;
    if (this.menuActive) clearTimeout(this.closeMenuTimeout);
  }

  onMouseEnter() {
    if (this.menuActive) clearTimeout(this.closeMenuTimeout);
  }

  onMouseLeave() {
    if (this.menuActive) {
      this.closeMenuTimeout = setTimeout(() => {
        this.menuActive = false;
      }, 3000);
    }
  }

  @HostListener('document:touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    const menuElement = document.querySelector('.nav'); 
    const touchInsideMenu = menuElement?.contains(event.target as Node);
    if (!touchInsideMenu && this.menuActive) {
      this.menuActive = false;
    }
  }

  scrollTo(section: string): void {
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
    if (window.innerWidth <= 768) {
      this.menuActive = false;
    }
  }
}