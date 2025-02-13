import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { flush } from '@angular/core/testing';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-list-items',
  standalone: true,
  imports: [RouterModule, RouterOutlet],
  templateUrl: './list-items.component.html',
  styleUrl: './list-items.component.css',
})
export class ListItemsComponent {
  lineAllItem: boolean = true;
  lineNewItem: boolean = false;
  lineCategories: boolean = false;

  addLineAllItem() {
    this.lineAllItem = true;
    this.lineNewItem = false;
    this.lineCategories = false;
  }

  addLineNewItem() {
    this.lineNewItem = true;
    this.lineAllItem = false;
    this.lineCategories = false;
  }

  addLineCategories() {
    this.lineCategories = true;
    this.lineNewItem = false;
    this.lineAllItem = false;
  }
}
