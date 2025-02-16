import { Injectable } from '@angular/core';
import { Item } from '../interfaces/item.interface';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  constructor() {}

  registerLog(item: Item, message: string) {
    item.history.push(`Atualizou ${message}`);
  }
}
