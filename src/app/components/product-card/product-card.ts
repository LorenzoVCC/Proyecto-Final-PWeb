import { RouterLink } from "@angular/router";
import { Component, input } from '@angular/core';
import { ProductForReadDTO } from "../../interfaces/product-interface";

@Component({
  selector: 'product-card',
  imports: [RouterLink],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  product = input.required<ProductForReadDTO>();
}
