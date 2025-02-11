import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ListItemsComponent } from './components/list-items/list-items.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'items', component: ListItemsComponent },
];
