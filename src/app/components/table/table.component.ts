import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Item } from '../../interfaces/item.interface';
import { ItemService } from '../../services/item.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CategoryListComponent } from '../category-list/category-list.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent implements OnInit, OnChanges {
  @Input() inputItems!: Item[];
  items?: Item[];

  constructor(
    private itemService: ItemService,
    private activedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const category = this.activedRoute.snapshot.data['category'];

    if (category) {
      this.items = this.inputItems;
    } else {
      this.items = this.itemService.getAll();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['inputItems'] && changes['inputItems'].currentValue) {
      this.items = changes['inputItems'].currentValue;
    }
  }

  onDeleteItem(item: Item): void {
    this.itemService.deleteItem(item);
    this.items = this.itemService.getAll().filter((i) => i != item);
  }
}
