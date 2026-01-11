import { Injectable } from '@angular/core';
import { CategoryCreateUpdateDTO, CategoryForReadDTO } from '../interfaces/category-interface';

@Injectable({
  providedIn: 'root',
})

export class CategoryService {

  private categories: CategoryForReadDTO[] = [
    { Id_Category: 1, Name: 'Appetizers', Id_Restaurant: 1 },
    { Id_Category: 2, Name: 'Main Courses', Id_Restaurant: 1 },
    { Id_Category: 3, Name: 'Appetizers', Id_Restaurant: 2 },
  ];

  getByRestaurantId(restaurantId: number): CategoryForReadDTO[] {
    return this.categories.filter(c => c.Id_Restaurant === restaurantId);
  }

  getById(id: number): CategoryForReadDTO | null {
    return this.categories.find(c => c.Id_Category === id) ?? null;
  }

  createCategory(dtodata: CategoryCreateUpdateDTO, restaurantId: number) {

    const newId = this.categories.length + 1;

    const created: CategoryForReadDTO = {
      Id_Category: newId,
      Name: dtodata.Name,
      Id_Restaurant: restaurantId,
    };
    this.categories.push(created);
    return created;
  }
}

