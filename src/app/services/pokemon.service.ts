// src/app/services/pokemon.service.ts
import { Injectable } from '@angular/core';
import { Result } from '../interfaces/pokeapi';
import { Pokemon } from '../interfaces/pokemon';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {


  constructor() { }

  async getByPage(page: number = 0, size: number = 100): Promise<Result[]> {
    const offset = size * page;
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${size}&offset=${offset}`);
    const resJson = await res.json();
    if (resJson.results.length > 0) return resJson.results;
    return [];
  }

  async getById(id: string): Promise<Pokemon> {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return await res.json();
  }
  // Buscar por ID (ya lo tienes)
  // Buscar por nombre
  async getByName(name: string): Promise<Pokemon | null> {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
      const pokemon = await res.json();
      return pokemon;
    } catch (error) {
      console.error(`Pokemon with name ${name} not found`);
      return null; // Retorna null si no se encuentra el Pokémon
    }
  }

  async getDescription(id: string | number): Promise<string> {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
    const resJson = await res.json();
    const texto = resJson.flavor_text_entries.find((texto: any) => texto.language.name === 'es');
    return texto.flavor_text;
  }

}
