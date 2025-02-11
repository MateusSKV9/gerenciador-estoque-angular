import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ListItemsComponent } from './components/list-items/list-items.component';
import { NewItemComponent } from './components/new-item/new-item.component';
import { TableComponent } from './components/table/table.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'items',
    component: ListItemsComponent,
    children: [
      { path: '', component: TableComponent },
      { path: 'new', component: NewItemComponent },
    ],
  },
];
