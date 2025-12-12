import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CardPokemonComponent } from './components/card-pokemon/card-pokemon.component';

import { CatchingPokemonComponent } from './components/catching-pokemon/catching-pokemon.component';


import { InventaryPokemonComponent } from './components/inventary-pokemon/inventary-pokemon.component';

export const routes: Routes = [
    
    {path: 'home', component: HomeComponent},
    {path: 'capturar', component: CatchingPokemonComponent},
    {path: 'detalle', component: CardPokemonComponent},
    {path: 'inventario', component: InventaryPokemonComponent},
    {path: '', component: HomeComponent }
];
