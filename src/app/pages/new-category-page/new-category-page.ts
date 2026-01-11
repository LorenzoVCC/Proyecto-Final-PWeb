import { Component, input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NewProductPage } from '../new-product-page/new-product-page';

@Component({
  selector: 'new-category-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './new-category-page.html',
  styleUrl: './new-category-page.scss',
})

export class NewCategoryPage {
  restaurantId = input.required<string>();
}
