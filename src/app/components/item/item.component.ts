import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../../interfaces/item.interface';
import { ItemService } from '../../services/item.service';
import { ActivatedRoute, Route, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css',
})
export class ItemComponent implements OnInit {
  item!: Item;

  constructor(
    private itemService: ItemService,
    private activedRoute: ActivatedRoute,
    private route: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.activedRoute.snapshot.paramMap.get('id'));
    this.item = this.itemService.getOne(id);
  }

  onDeleteItem(item: Item): void {
    this.itemService.deleteItem(item);
    this.route.navigate(['/items']);
  }

  onDeleteLog(item: Item): void {
    item.history = [];
    this.itemService.updateItem(item.id, item);
  }
}
