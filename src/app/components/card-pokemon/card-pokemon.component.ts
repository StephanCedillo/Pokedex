import { Component, Input, OnChanges, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Result } from '../../interfaces/pokeapi';
import { Pokemon } from '../../interfaces/pokemon';

@Component({
  selector: 'app-card-pokemon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-pokemon.component.html',
  styleUrl: './card-pokemon.component.css' // Asegúrate que sea .css o .scss según tu proyecto
})
export class CardPokemonComponent implements OnChanges {
  
  @Input() data?: Result;          // Datos básicos de la lista
  @Input() fullData?: Pokemon;     // Datos completos (si ya los tienes)
  @Input() selected: boolean = false;
  @Output() clicked = new EventEmitter<string>(); 
  
  id: string = "0";
  // Pre-cargamos el audio para evitar lag al clickear
  audio: HTMLAudioElement = new Audio('assets/music/ring.mp3'); 

  ngOnChanges(changes: SimpleChanges): void {
    // Solo extraemos información si cambian los datos de entrada
    if (changes['data'] || changes['fullData']) {
      this.extractInformation();
    }
  }

  extractInformation() {
    // CASO 1: Viene el objeto Pokemon completo
    if (this.fullData) {
      this.id = this.fullData.id.toString();
      this.data = {
        name: this.fullData.name,
        url: "" // No la necesitamos aquí
      };
      return;
    }

    // CASO 2: Viene de la lista (Result) -> Extraer ID de la URL de forma segura
    if (this.data && this.data.url) {
      // La URL es tipo: https://pokeapi.co/api/v2/pokemon/25/
      // Dividimos por '/' y agarramos el penúltimo elemento o el que sea un número
      const parts = this.data.url.split('/');
      // Filtramos partes vacías y tomamos la última que sea un número
      this.id = parts.filter(part => part !== '').pop() || "0";
    }
  }

  onClick() {
    // 1. Emitimos el evento al padre
    this.clicked.emit(this.id);
    
    // 2. Reproducimos el sonido UI (Efecto visual/sonoro solamente)
    this.reproducirSonido();
  }
  
  reproducirSonido() {
    this.audio.volume = 0.3; // Volumen suave
    this.audio.currentTime = 0; // Reinicia el audio si le das click muy rápido
    this.audio.play().catch(err => console.error("Error audio", err));
  }
}