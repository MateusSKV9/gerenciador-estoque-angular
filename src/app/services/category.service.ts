import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ItemService } from './item.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  categoriesSubject = new BehaviorSubject<string[]>(this.getAllCategories());
  categroes$ = this.categoriesSubject.asObservable();

  constructor(private itemService: ItemService) {
    this.initializeCategories();
  }

  initializeCategories() {
    if (!localStorage.getItem('categories')) {
      const defaultCategories = ['📚Livro', '🥖Alimentos', '🧋Bebidas'];
      this.saveCategory(defaultCategories);
    }
  }

  saveCategory(categories: string[]) {
    localStorage.setItem('categories', JSON.stringify(categories));
    this.categoriesSubject.next(categories);
  }

  getAllCategories(): string[] {
    const categories = JSON.parse(localStorage.getItem('categories')!);
    return categories;
  }

  addCategory(category: string) {
    const categories = this.getAllCategories();
    if (!categories.includes(category)) {
      const updatedCategories = [...categories, category];
      this.saveCategory(updatedCategories);
    }
  }

  updateCategory(category: string, updatedCategory: string) {
    const items = this.itemService.getAll().map((item) => {
      if (item.category === category) {
        return { ...item, category: updatedCategory };
      }
      return item;
    });

    const index = this.getAllCategories().findIndex((cat) => cat == category);

    const categories = this.getAllCategories();
    categories[index] = updatedCategory;

    this.saveCategory(categories);
    this.itemService.saveItems(items);
  }

  deleteCategory(name: string) {
    const categories = this.getAllCategories().filter((cat) => cat != name);
    this.saveCategory(categories);
  }
}
