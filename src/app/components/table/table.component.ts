import { Component, OnInit } from '@angular/core';
import { Item } from '../../interfaces/item.interface';
import { ItemService } from '../../services/item.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent implements OnInit {
  items?: Item[];

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.items = this.itemService.getAll();
  }

  onDeleteItem(item: Item): void {
    this.itemService.deleteItem(item);
    this.items = this.itemService.getAll().filter((i) => i != item);
  }
}
