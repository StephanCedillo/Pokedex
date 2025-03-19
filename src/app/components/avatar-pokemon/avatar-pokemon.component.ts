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
      message: "¡Pokémon, te elijo a ti!",
      level: 80, // Agregar un nivel para Ash

    },
    {
      title: "Brock",
      name: "Takeshi",
      type: 2,
      image: "assets/img/Brock.png",
      description: "Es un criador Pokémon, y un verdadero experto cocinero que siempre maravilla a los demás con sus platos. ",
      message: "¡Lo dije! ¡La clave para ser un buen entrenador es conocer a tus Pokémon y confiar en ellos!",
      level: 60,
    },
    {
      title: "Tracey Sketchit",
      name: "Kenji",
      type: 3,
      image: "assets/img/Tracey.png",
      description: "Es un artista dibujante y observador Pokémon, que se dedica a ver las costumbres de estas criaturas.",
      message: "¡Mira este Pokémon, es una maravilla! ¡Voy a dibujarlo para capturar su esencia!",
      level: 50,
    },
    {
      title: "Maya",
      name: "Maya",
      type: 4,
      image: "assets/img/Maya.png",
      description: "Su objetivo siempre ha sido llegar a ser una gran coordinadora Pokémon, como lo fue su madre.",
      message: "¡Vamos, no hay tiempo que perder! ¡Este Pokémon no se va a atrapar solo!",
      level: 65,
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
