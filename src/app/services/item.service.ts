import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Item } from '../interfaces/item.interface';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor() {}

  saveItems(items: Item[]): void {
    localStorage.setItem('arrayItems', JSON.stringify(items));
  }

  getAll(): Item[] {
    const items = localStorage.getItem('arrayItems');
    return items ? JSON.parse(items) : [];
  }

  getOne(idSearch: number): Item {
    const item: Item = this.getAll().find((i) => i.id === idSearch)!;
    return item;
  }

  addItem(item: Item): void {
    const items = this.getAll();
    items.push(item);
    this.saveItems(items);
  }

  updateItem(id: number, updatedItem: Item): void {
    const items = this.getAll();
    const index = items.findIndex((i) => i.id === id);
    items[index] = updatedItem;
    this.saveItems(items);
    console.log(updatedItem);
  }

  deleteItem(item: Item): void {
    let items = this.getAll();
    items = items.filter((i) => i.id != item.id);
    this.saveItems(items);
  }
}
