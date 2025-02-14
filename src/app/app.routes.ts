import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ListItemsComponent } from './components/list-items/list-items.component';
import { NewItemComponent } from './components/new-item/new-item.component';
import { TableComponent } from './components/table/table.component';
import { ItemComponent } from './components/item/item.component';
import { CategoryListComponent } from './components/category-list/category-list.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'items',
    component: ListItemsComponent,
    children: [
      { path: '', component: TableComponent },
      {
        path: 'category',
        component: CategoryListComponent,
        data: { category: true },
      },
      {
        path: 'new',
        component: NewItemComponent,
        data: { edit: false },
      },
      { path: ':id', component: ItemComponent },
      {
        path: 'edit/:id',
        component: NewItemComponent,
        data: { edit: true },
      },
    ],
  },
];
