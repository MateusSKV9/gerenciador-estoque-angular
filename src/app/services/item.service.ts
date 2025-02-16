import { EventEmitter, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Item } from '../interfaces/item.interface';
import { LogService } from './log.service';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  emiterItems = new EventEmitter();

  constructor(private logService: LogService) {}

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

    if (!item.history) {
      item.history = []; // Inicializa um array vazio se for undefined
    }

    console.log('item adicionado', item);

    items.push(item);
    this.saveItems(items);
  }

  updateItem(id: number, updatedItem: Item): void {
    const items: Item[] = this.getAll();
    const index = items.findIndex((i) => i.id === id);

    console.log('Items[index]:', items[index]);
    console.log('Updated: ', updatedItem);

    if (items[index].name !== updatedItem.name) {
      this.logService.registerLog(
        updatedItem,
        `nome: ${items[index].name} ➡️ ${updatedItem.name}`
      );
    }

    if (items[index].quantity !== updatedItem.quantity) {
      this.logService.registerLog(
        updatedItem,
        `quantidade: ${items[index].quantity} ➡️ ${updatedItem.quantity}`
      );
    }

    if (items[index].price !== updatedItem.price) {
      this.logService.registerLog(
        updatedItem,
        `preço: ${items[index].price} ➡️ ${updatedItem.price}`
      );
    }

    if (items[index].category !== updatedItem.category) {
      this.logService.registerLog(
        updatedItem,
        `categoria: ${items[index].category} ➡️ ${updatedItem.category}`
      );
    }

    if (items[index].description !== updatedItem.description) {
      this.logService.registerLog(
        updatedItem,
        `descrição: ${items[index].description} ➡️ ${updatedItem.description}`
      );
    }

    items[index] = updatedItem;
    console.log('atualizou', items[index]);
    this.saveItems(items);
    console.log(items);
  }

  deleteItem(item: Item): void {
    let items = this.getAll();
    items = items.filter((i) => i.id != item.id);
    this.saveItems(items);

    this.emiterItems.emit(item.category);
  }
}
