import { RouterLink } from "@angular/router";
import { Component, input } from '@angular/core';
import { ProductForReadDTO } from "../../interfaces/product-interface";

@Component({
  selector: 'product-card',
  imports: [],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  product = input.required<ProductForReadDTO>();

  //Metodo para calcular descuento
  getDiscountPrice() {
    const p = this.product();
    const descuentoPorcentaje = p.discount ?? 0;
    return p.price - (p.price * descuentoPorcentaje / 100);
  }

}
