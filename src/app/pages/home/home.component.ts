//src/app/pages/home/home.component.ts
import { Component, ElementRef, OnInit, ViewChild, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PhotoPokemonComponent } from '../../components/photo-pokemon/photo-pokemon.component';
import { CardPokemonComponent } from '../../components/card-pokemon/card-pokemon.component';
import { DetailPokemonComponent } from '../../components/detail-pokemon/detail-pokemon.component';
import { PokemonService } from '../../services/pokemon.service';
import { Result } from '../../interfaces/pokeapi';
import { Pokemon } from '../../interfaces/pokemon';
import { AvatarPokemonComponent } from '../../components/avatar-pokemon/avatar-pokemon.component';
import { InventaryPokemonComponent } from '../../components/inventary-pokemon/inventary-pokemon.component';
import { CatchingPokemonComponent } from '../../components/catching-pokemon/catching-pokemon.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PhotoPokemonComponent, CardPokemonComponent, FormsModule, DetailPokemonComponent, AvatarPokemonComponent,InventaryPokemonComponent,CatchingPokemonComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  menuActive: boolean = false;
  activeView: string = 'avatar';  // La vista por defecto es 'inicio'
  selectedAvatar: string = '';  // ✅ Variable para almacenar el avatar seleccionado
  closeMenuTimeout: any; // Declara la propiedad closeMenuTimeout

 

  // Método para cambiar la vista activa
  setActiveView(view: string): void {
    this.activeView = view;
  }
  toggleMenu() {
    this.menuActive = !this.menuActive;
    if (this.menuActive) {
      clearTimeout(this.closeMenuTimeout); // Limpiar el temporizador si el menú se abre
    }
  }

  // Manejo de la visibilidad del navbar
  onMouseEnter() {
    // Detener el temporizador cuando el mouse está sobre el menú
    if (this.menuActive) {
      clearTimeout(this.closeMenuTimeout); // Cancelar cualquier temporizador pendiente
    }
  }

  onMouseLeave() {
    // Cerrar el menú si el mouse sale del área después de 3 segundos
    if (this.menuActive) {
      this.closeMenuTimeout = setTimeout(() => {
        this.menuActive = false;
      }, 3000); // Cerrar después de 3 segundos sin interacción
    }
  }

  // Método para detectar toques en cualquier parte de la pantalla
  @HostListener('document:touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    const menuElement = document.querySelector('.nav'); // Obtén el navbar
    const touchInsideMenu = menuElement?.contains(event.target as Node); // Verifica si el toque es dentro del navbar

    // Si el toque no es dentro del navbar y el menú está abierto, cierra el menú
    if (!touchInsideMenu && this.menuActive) {
      this.menuActive = false;
    }
  }
  

  scrollTo(section: string): void {
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
    if (window.innerWidth <= 768) {
      this.menuActive = false; // Cierra el menú después de hacer clic en un enlace en móviles
    }
  }

  constructor(private pokemonService: PokemonService) {}
  @ViewChild('cards') cardsElement!:ElementRef;

  pokemonList:Result[] = [];
  page: number = 0;
  loading: boolean = false
  selectedPokemon?:Pokemon
  detail: boolean = false

  ngOnInit(): void {
    this.loadPokemonList();
    this.pokemonService.getById("1")
  }

  async loadPokemonList(){
    this.loading = true
    this.pokemonList = [...this.pokemonList,  ...await this.pokemonService.getByPage(this.page)];
    console.log(this.pokemonList)
    this.loading= false;
    this.page++;
    
  }

  onScroll(e:any){
    if(this.loading) return;
    if(
      Math.round(
        this.cardsElement.nativeElement.clientHeight + this.cardsElement.nativeElement.scrollTop
      ) 
      === e.srcElement.scrollHeight){
        this.loadPokemonList()
      }
    }

    async clickedCard(id:string){
      if(this.selectedPokemon && id === this.selectedPokemon?.id.toString()){
        return this.toggleDetail();
        //return this.changeStateDetail()
      }
      this.selectedPokemon = await this.pokemonService.getById(id)
    }

    changeStateDetail(){
      if(this.selectedPokemon) this.detail= !this.detail
      console.log(this.detail)
      
    }
    toggleDetail() {
      if (this.selectedPokemon) this.detail = !this.detail;
      console.log(this.detail);
    }
  
    toggleView() {
      this.detail = !this.detail;
    }
  
    

      // ✅ Método para actualizar el avatar y cambiar de vista a Inventario
  seleccionarAvatar(nombre: string) {
    this.selectedAvatar = nombre;
    this.setActiveView('inventario');
  }
  searchNumber: number | null = null;

async searchPokemon() {
  if (this.searchNumber !== null && this.searchNumber > 0) {
    this.selectedPokemon = await this.pokemonService.getById(this.searchNumber.toString());
    this.setActiveView('detalle'); // Cambia la vista al detalle del Pokémon encontrado
  }
}

  
  }