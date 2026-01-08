import { Component, inject, input, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import { RestaurantService } from '../../services/restaurant-service';
import { RestaurantPublicDTO } from '../../interfaces/restaurant-interface';
import { ProductCard } from '../../components/product-card/product-card';
import { CategoryPill } from '../../components/category-pill/category-pill';
import { CategoryService } from '../../services/category-service';
import { CategoryPublicDTO } from '../../interfaces/category-interface';

@Component({
  selector: 'restaurant-page',
  standalone: true,
  imports: [CategoryPill, ProductCard, RouterLink],
  templateUrl: './restaurant-page.html',
  styleUrl: './restaurant-page.scss',
})

export class RestaurantPage implements OnInit {

  private categoryService = inject(CategoryService);
  categories: CategoryPublicDTO[] = [];

  id = input.required<string>();
  readonly restaurantService = inject(RestaurantService);

  restaurant: RestaurantPublicDTO | undefined;
  cargandoRestaurant = false;

  async ngOnInit() {

    console.log('ID que llega por la ruta:', this.id());

    this.cargandoRestaurant = true;

    this.restaurant = this.restaurantService.restaurants.find(
      r => r.id.toString() === this.id()
    );

    console.log('Restaurant encontrado:', this.restaurant);

    if (this.restaurant) {
      this.categories = this.categoryService.getByRestaurantId(this.restaurant.id);
    }

    console.log('Categorias cargadas:', this.categories);

    this.cargandoRestaurant = false;
  }
}
