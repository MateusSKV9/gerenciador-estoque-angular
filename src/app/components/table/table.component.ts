import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Item } from '../../interfaces/item.interface';
import { ItemService } from '../../services/item.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent implements OnInit, OnChanges {
  @Input() inputItems!: Item[];
  items?: Item[];
  category!: string;
  openModal: boolean = false;
  item!: Item | null;

  emiterItems = new EventEmitter();

  constructor(
    private itemService: ItemService,
    private activedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.category = this.activedRoute.snapshot.data['category'];

    if (this.category) {
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

    if (!this.category) {
      this.items = this.itemService.getAll().filter((i) => i != item);
    } else {
      this.items = this.itemService
        .getAll()
        .filter((i) => i.category == item.category);
    }

    this.openModal = false;
  }

  deleteConfirm(item: Item) {
    this.item = item;
    this.openModal = true;
  }

  deleteCancel() {
    this.openModal = false;
    this.item = null;
  }
}
