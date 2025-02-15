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
  catAlimentos!: Item[];
  listCategories: string[] = [];
  groupCategories: string[] = [];
  categoryItems: Item[] = [];

  category: string = '';
  categorySelected!: string;
  categoryUpdated!: string;

  nameCategory = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
  ]);

  constructor(
    private itemService: ItemService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.categoryService.categroes$.subscribe(
      (response) => (this.listCategories = response)
    );
  }

  onAddCategory(category: string) {
    this.categoryService.addCategory(category);
    this.category = '';
  }

  onDeleteCategory(category: string) {
    this.categoryService.deleteCategory(category);
    this.categorySelected = '';
  }

  selectedCategory(category: string) {
    this.category = category;
    this.categorySelected = category;
    console.log(category);
    console.log(this.categorySelected);

    this.categoryItems = this.itemService
      .getAll()
      .filter((item) => item.category == category);
  }

  onUpdateCategory(selectedCategory: string) {

    

    const oldCategory = this.category;
    this.categoryUpdated = selectedCategory;

    this.categoryService.updateCategory(oldCategory, this.categoryUpdated);

    this.selectedCategory(this.categoryUpdated);
  }

  onCancelUpdate() {
    
  }
}
