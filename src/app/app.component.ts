import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'Pokedex';
  ngOnInit(): void {
    this.playMusic();
  }

  pauseMusic() {
    const audio = document.getElementById('backgroundMusic') as HTMLAudioElement;
    audio.pause();
  }

  playMusic() {
    console.log("Música empieza")
    const audio = document.getElementById('backgroundMusic') as HTMLAudioElement;
    audio.volume = 0.10
    audio.play();
  }

}
