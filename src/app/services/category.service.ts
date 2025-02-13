import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  categoriesSubject = new BehaviorSubject<string[]>(this.getAllCategories());
  categroes$ = this.categoriesSubject.asObservable();

  constructor() {
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
}
