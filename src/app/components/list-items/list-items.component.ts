import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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

  addLineAllItem() {
    this.lineAllItem = true;
    this.lineNewItem = false;
  }

  addLineNewItem() {
    this.lineNewItem = true;
    this.lineAllItem = false;
  }
}
