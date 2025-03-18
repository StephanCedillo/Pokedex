// src/app/components/avatar-pokemon/avatar-pokemon.component.ts
import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-avatar-pokemon',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './avatar-pokemon.component.html',
  styleUrl: './avatar-pokemon.component.css'
})
export class AvatarPokemonComponent {
  avatars = [
    {
      title: "Ash Ketchum",
      name: "Satoshi",
      type: 1,
      image: "assets/img/Ash.png",
      description: "Es un Entrenador Pokémon originario de Pueblo Paleta...",
      message: "¡Hola! Soy Ash Ketchum, ¡voy a convertirme en un Maestro Pokémon!"
    },
    {
      title: "Brock",
      name: "Takeshi",
      type: 2,
      image: "assets/img/Brock.png",
      description: "Es un criador Pokémon, y un verdadero experto cocinero...",
      message: "Hola, soy Takeshi. ¡Te ayudaré en la captura de Pokémon!"
    },
    {
      title: "Tracey Sketchit",
      name: "Kenji",
      type: 3,
      image: "assets/img/Tracey.png",
      description: "Es un artista dibujante y observador Pokémon...",
      message: "¡Hola! Soy Tracey y me encanta dibujar Pokémon."
    }
  ];

  selectedAvatar: any = null; // Para almacenar el avatar seleccionado

  seleccionarAvatar(avatar: any) {
    this.selectedAvatar = avatar;
  }

  cambiarAvatar() {
    this.selectedAvatar = null; // Restablece la selección para volver a la lista
  }
}
