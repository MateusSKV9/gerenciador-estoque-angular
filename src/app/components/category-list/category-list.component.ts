import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { Item } from '../../interfaces/item.interface';
import { CategoryService } from '../../services/category.service';
import { FormControl, FormsModule, Validators } from '@angular/forms';
import { TableComponent } from '../table/table.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [FormsModule, TableComponent, CommonModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css',
})
export class CategoryListComponent implements OnInit {
  listCategories: string[] = [];
  categoryItems: Item[] = [];

  category: string = '';
  categorySelected!: string;
  categoryUpdated!: string;
  open: boolean = true;
  openModal: boolean = false;

  constructor(
    private itemService: ItemService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.categoryService.categroes$.subscribe(
      (response) => (this.listCategories = response)
    );

    console.log('category: ', this.category);
    console.log('selected: ', this.categorySelected);
  }

  onAddCategory(category: string) {
    this.categoryService.addCategory(category);
    this.category = '';
  }

  onDeleteCategory(category: string) {
    this.categoryService.deleteCategory(category);
    this.categorySelected = '';
    this.confirm = false;
    this.category = '';
    this.categoryItems = [];
    this.openModal = false;
  }

  selectedCategory(category: string) {
    console.log(category);

    this.open = !this.open;
    console.log(this.open);

    if (this.open && this.category == category) {
      this.category = '';
      this.confirm = false;
      this.categorySelected = '';
    } else {
      this.category = category;
      this.categorySelected = category;
    }

    this.categoryItems = this.itemService
      .getAll()
      .filter((item) => item.category == category);
  }

  confirm: boolean = false;

  onEdit() {
    this.confirm = !this.confirm;
    // console.log(this.confirm);
    this.categoryUpdated = this.category;
  }

  onUpdateCategory(selectedCategory: string) {
    // console.log('Update');
    const oldCategory = this.category;
    this.categoryUpdated = selectedCategory;

    // console.log('olDCategory', oldCategory);
    // console.log(oldCategory);
    // console.log('Teste');
    // console.log(this.categoryUpdated);
    // console.log(this.categoryUpdated);
    this.categoryService.updateCategory(oldCategory, this.categoryUpdated);

    this.selectedCategory(this.categoryUpdated);
    console.log(this.category);
    this.confirm = false;
    // this.category = '';
  }

  onCancelUpdate() {
    this.confirm = false;
  }

  deleteConfirm(category: string) {
    // this.item = item;
    this.openModal = true;
  }

  deleteCancel() {
    this.openModal = false;
    // this.item = null;
  }
}
