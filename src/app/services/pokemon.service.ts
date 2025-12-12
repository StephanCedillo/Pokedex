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
  async getByType(type: string): Promise<Result[]> {
    const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
    const data = await res.json();
    // La estructura de 'type' es diferente, hay que mapearla
    return data.pokemon.map((p: any) => p.pokemon);
  }

  // 2. Filtrar por Generación
  async getByGeneration(id: string): Promise<Result[]> {
    const res = await fetch(`https://pokeapi.co/api/v2/generation/${id}`);
    const data = await res.json();
    
    // Extraemos la especie y ordenamos por ID (la URL tiene el ID en la posición 6)
    return data.pokemon_species
      .map((p: any) => ({ name: p.name, url: p.url }))
      .sort((a: any, b: any) => {
        const idA = parseInt(a.url.split('/')[6]);
        const idB = parseInt(b.url.split('/')[6]);
        return idA - idB;
      });
  }
  

}
