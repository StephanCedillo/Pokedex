import { Component } from '@angular/core';

@Component({
  selector: 'app-hamburgernav',
  standalone: true,
  imports: [],
  templateUrl: './hamburgernav.component.html',
  styleUrl: './hamburgernav.component.css'
})
export class HamburgernavComponent {
  menuActive: boolean = false;

  toggleMenu(): void {
    this.menuActive = !this.menuActive;
  }

  scrollTo(section: string): void {
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
    if (window.innerWidth <= 768) {
      this.menuActive = false; // Cierra el menú después de hacer clic en un enlace en móviles
    }
  }

}
