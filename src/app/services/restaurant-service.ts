import { Inject, Injectable } from '@angular/core';
import { RestaurantPublicDTO } from '../interfaces/restaurant-interface';

@Injectable({ providedIn: 'root' })

export class RestaurantService {

  restaurants: RestaurantPublicDTO[] = [
    
    {  
      id: 1,
      name: 'Restaurante 1',
      description: 'Descripción mock',
      imageUrl: '/restaurant-generic-img.jpg',
      address: 'Moreno 37',
      slug: 'res1-moreno'
    },
    {
      id: 2,
      name: 'Restaurante 2',
      description: 'Otro restaurante',
      address: 'Av Siempre Viva 742',
      imageUrl: '/restaurant-generic-img.jpg',
      slug: 'restaurante-2',
    },

  ];

  getAll(): RestaurantPublicDTO[] {
    return this.restaurants;
  }

  getById(id:number): RestaurantPublicDTO | null {
    return this.restaurants.find(r => r.id === id) ?? null
  }
}
