import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import { PhotoPokemonComponent } from '../../components/photo-pokemon/photo-pokemon.component';
import { CardPokemonComponent } from '../../components/card-pokemon/card-pokemon.component';
import { DetailPokemonComponent } from '../../components/detail-pokemon/detail-pokemon.component';
import { PokemonService } from '../../services/pokemon.service';
import { Result } from '../../interfaces/pokeapi';
import { Pokemon } from '../../interfaces/pokemon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PhotoPokemonComponent, CardPokemonComponent, DetailPokemonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

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
        return this.changeStateDetail()
      }
      this.selectedPokemon = await this.pokemonService.getById(id)
    }

    changeStateDetail(){
      if(this.selectedPokemon) this.detail= !this.detail
      console.log(this.detail)
      
    }
  
  }

  
  
