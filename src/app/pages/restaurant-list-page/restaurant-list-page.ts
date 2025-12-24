import { Component } from '@angular/core';
import { RestaurantItem } from '../../components/restaurant-item/restaurant-item';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-restaurant-list-page',
  imports: [RestaurantItem, RouterLink],
  templateUrl: './restaurant-list-page.html',
  styleUrl: './restaurant-list-page.scss',
})

export class RestaurantListPage {

}
