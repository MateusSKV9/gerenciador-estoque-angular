import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Item } from '../../interfaces/item.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-item',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-item.component.html',
  styleUrl: './new-item.component.css',
})
export class NewItemComponent implements OnInit {
  form!: FormGroup;
  idItem!: number;
  item!: Item;

  constructor(
    private itemService: ItemService,
    private fb: FormBuilder,
    private activedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let id = this.generateId();
    const date = new Date();
    const edit = this.activedRoute.snapshot.data['edit'];

    if (edit) {
      this.idItem = Number(this.activedRoute.snapshot.paramMap.get('id'));
      this.item = this.itemService.getOne(this.idItem);
    }

    this.form = this.fb.group({
      id: [this.idItem ? this.item.id : id],
      name: [this.idItem ? this.item.name : ''],
      quantity: [this.idItem ? this.item.quantity : null],
      price: [this.idItem ? this.item.price : null],
      category: [this.idItem ? this.item.category : ''],
      description: [this.idItem ? this.item.description : ''],
      createdAt: [this.idItem ? this.item.createdAt : date],
    });
  }

  onSubmit(): void {
    const item = this.form.value as Item;

    if (this.idItem) {
      this.itemService.updateItem(this.idItem, item);
    } else {
      this.itemService.addItem(item);
    }

    this.form.reset();
  }

  generateId(): number {
    let n1 = Math.floor(Math.random() * 10).toString();
    let n2 = Math.floor(Math.random() * 10).toString();
    let n3 = Math.floor(Math.random() * 10).toString();
    let n4 = Math.floor(Math.random() * 10).toString();

    let id: string = n1 + n2 + n3 + n4;
    return Number(id);
  }
}
