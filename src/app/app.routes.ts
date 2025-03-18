import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CardPokemonComponent } from './components/card-pokemon/card-pokemon.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { CatchingPokemonComponent } from './components/catching-pokemon/catching-pokemon.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { AvatarPokemonComponent } from './components/avatar-pokemon/avatar-pokemon.component';
import { InventaryPokemonComponent } from './components/inventary-pokemon/inventary-pokemon.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'registro', component: RegisterComponent},
    {path: 'home', component: HomeComponent},
    {path: 'avatar', component: AvatarPokemonComponent},
    {path: 'capturar', component: CatchingPokemonComponent},
    {path: 'detalle', component: CardPokemonComponent},
    {path: 'inventario', component: InventaryPokemonComponent},
    {path: '', component: HomeComponent }
];
