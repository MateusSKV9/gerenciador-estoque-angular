import { Component, OnInit } from '@angular/core';
import { Item } from '../../interfaces/item.interface';
import { ItemService } from '../../services/item.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  recentsItems!: Item[];
  lowStockItems!: Item[];
  Items!: Item[];
  itemsQuantity!: number;

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.getRecentItems();
    this.getLowStockItems();
    this.Items = this.itemService.getAll();
    this.itemsQuantity = this.getQuantityItems();
  }

  getRecentItems(): void {
    this.recentsItems = this.itemService.getAll().reverse().slice(-0, 5);
  }

  getLowStockItems(): void {
    this.lowStockItems = this.itemService
      .getAll()
      .filter((item) => item.quantity <= 10);
  }

  getQuantityItems(): number {
    const items = this.itemService.getAll();
    const quantity = items.reduce((count, item) => {
      return count + item.quantity;
    }, 0);

    return quantity;
  }
}
