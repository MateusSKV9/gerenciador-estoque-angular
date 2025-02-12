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

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.getRecentItems();
    this.getLowStockItems();
  }

  getRecentItems(): void {
    this.recentsItems = this.itemService.getAll().reverse().slice(-0, 5);
  }

  getLowStockItems(): void {
    this.lowStockItems = this.itemService
      .getAll()
      .filter((item) => item.quantity <= 10);
  }
}
