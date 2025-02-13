import { Injectable } from '@angular/core';
import { Item } from '../interfaces/item.interface';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  constructor() {}

  registerLog(item: Item, message: string) {
    // console.log("Item no servive Log", item);
    // console.log("Mensagem", message);
    item.history.push(`Atualizou ${message}`);
  }
}
