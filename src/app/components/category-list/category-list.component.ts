import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { Item } from '../../interfaces/item.interface';
import { CategoryService } from '../../services/category.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css',
})
export class CategoryListComponent implements OnInit {
  catAlimentos!: Item[];
  category: string = '';
  listCategories: string[] = [];
  groupCategories: string[] = [];
  categoryItems!: Item[];
  categorySelected!: string;

  constructor(
    private itemService: ItemService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    const items = this.itemService.getAll();
    this.catAlimentos = items.filter((item) =>
      item.category.includes('Alimentos')
    );

    this.categoryService.categroes$.subscribe(
      (response) => (this.listCategories = response)
    );
  }

  onAddCategory(category: string) {
    this.categoryService.addCategory(category);
    this.category = '';
  }

  selectedCategory(category: string) {
    this.categorySelected = category;

    this.categoryItems = this.itemService
      .getAll()
      .filter((item) => item.category == category);
  }
}
