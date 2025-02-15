import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Item } from '../../interfaces/item.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-item',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './new-item.component.html',
  styleUrl: './new-item.component.css',
})
export class NewItemComponent implements OnInit {
  form!: FormGroup;
  idItem!: number;
  item!: Item;
  listCategory!: string[];

  constructor(
    private itemService: ItemService,
    private fb: FormBuilder,
    private activedRoute: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.listCategory = this.categoryService.getAllCategories();
  }

  initializeForm(): void {
    const date = new Date();
    const edit = this.activedRoute.snapshot.data['edit'];

    if (edit) {
      this.idItem = Number(this.activedRoute.snapshot.paramMap.get('id'));
      this.item = this.itemService.getOne(this.idItem);
    }

    this.form = this.fb.group({
      id: [this.idItem ? this.item.id : ''],
      name: [
        this.idItem ? this.item.name : '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30),
        ],
      ],
      quantity: [
        this.idItem ? this.item.quantity : null,
        [Validators.required, Validators.min(0.05)],
      ],
      price: [
        this.idItem ? this.item.price : null,
        [Validators.required, Validators.min(0.05)],
      ],
      category: [this.idItem ? this.item.category : '', [Validators.required]],
      description: [
        this.idItem ? this.item.description : '',
        [Validators.maxLength(150)],
      ],
      createdAt: [this.idItem ? this.item.createdAt : date],
      history: [this.idItem ? this.item.history : []],
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const item = this.form.value as Item;

    if (this.idItem) {
      this.itemService.updateItem(this.idItem, item);
      this.router.navigate([`/items/${this.item.id}`]);
    } else {
      let id = this.generateId();
      item.id = id;
      this.itemService.addItem(item);
      this.router.navigate([`/items/`]);
    }

    this.onReset();
  }

  onReset(): void {
    this.form.reset();
    this.form.patchValue({ category: '' });
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
