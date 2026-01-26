import { Component, input, inject, OnInit, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';

import { Auth } from '../../services/auth-service';
import { CategoryService } from '../../services/category-service';
import { ProductService } from '../../services/product.service';
import { ProductForCreateUpdateDTO, ProductForReadDTO } from '../../interfaces/product-interface';

////////////////////////////////////////////////////////////////////////////////

@Component({
  selector: 'new-product-page',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './new-product-page.html',
  styleUrl: './new-product-page.scss',
})

export class NewProductPage implements OnInit {

  productService = inject(ProductService);
  categoryService = inject(CategoryService);

  auth = inject(Auth);
  router = inject(Router);

  //Paso los parametros recibidos por la URL a las variables restaurantId y categoryId
  restaurantId = input.required<string>();
  categoryId = input.required<string>();
  //Para edit
  productId = input<string | null>(null);

  isEdit = false;
  productBack: ProductForReadDTO | null = null;

  form = viewChild<NgForm>('newProductForm');

  errorEnBack = false;
  solicitudABackEnCurso = false;

  ngOnInit() {
    const loggedRestaurant = this.auth.restaurantId;
    if (!loggedRestaurant) {
      this.router.navigate(['/login'])
      return;
    }

    const urlRestaurantId = Number(this.restaurantId());
    const urlCategoryId = Number(this.categoryId());

    //Validaciones
    if (Number.isNaN(urlRestaurantId) || Number.isNaN(urlCategoryId)) {
      this.errorEnBack = true;
      return;
    }

    if (loggedRestaurant !== urlRestaurantId) {
      this.router.navigate(['/restaurant-page', urlRestaurantId]);
      return;
    }

    const cat = this.categoryService.getById(urlCategoryId);
    if (!cat || cat.Id_Restaurant !== urlRestaurantId) {
      this.router.navigate(['/restaurant-page', urlRestaurantId]);
      return;
    }

    //Proceso para ir parseando el id
    const productIdx = this.productId();
    if (!productIdx) return; //create

    const prodId = Number(productIdx);
    if (Number.isNaN(prodId)) return;

    const prod = this.productService.getById(prodId);
    if (!prod) return;

    if (prod.id_Category !== urlCategoryId) {
      this.router.navigate(['/restaurant-page', urlRestaurantId])
      return;
    }

    this.isEdit = true;
    this.productBack = prod;

    setTimeout(() => {
      this.form()?.setValue({
        name: prod.name,
        description: prod.description ?? '',
        price: prod.price,
        discount: prod.discount ?? '',
        urlImage: prod.urlImage ?? '',
      });
    }, 0);
  }

  handleFormSubmission(form: NgForm) {
    this.errorEnBack = false;
    this.solicitudABackEnCurso = true;

    const loggedRestaurant = this.auth.restaurantId;
    if (!loggedRestaurant) {
      this.solicitudABackEnCurso = false;
      this.router.navigate(['/login']);
      return;
    }

    const urlRestaurantId = Number(this.restaurantId());
    const urlCategoryId = Number(this.categoryId());

    if (Number.isNaN(urlRestaurantId) || Number.isNaN(urlCategoryId)) {
      this.solicitudABackEnCurso = false;
      this.errorEnBack = true;
      return;
    }

    const dto: ProductForCreateUpdateDTO = {
      name: form.value.name ?? '',
      description: form.value.description ?? '',
      price: Number(form.value.price),
      discount: form.value.discount === '' ? undefined : Number(form.value.discount),
      urlImage: (form.value.urlImage ?? '').trim(),
      id_Category: urlCategoryId,
    };

    if (!dto.name || Number.isNaN(dto.price)) {
      this.solicitudABackEnCurso = false;
      this.errorEnBack = true;
      return;
    }

    if (this.isEdit) {
      const productIdx = this.productId() ? Number(this.productId()) : NaN;
      if (Number.isNaN(productIdx)) {
        this.solicitudABackEnCurso = false;
        this.errorEnBack = true;
        return;
      }

      const updated = this.productService.updateProduct(productIdx, dto);
      this.solicitudABackEnCurso = false;

      if (!updated) {
        this.errorEnBack = true;
        return;
      }
      this.router.navigate(['/product-page', updated.id_Product]);
      return;
    }

    const created = this.productService.createProduct(dto);
    this.solicitudABackEnCurso = false;

    if (!created) {
      this.errorEnBack = true;
      return;
    }

    form.resetForm();
    //Volvemo pa' tra...
    this.router.navigate(['/restaurant-page', urlRestaurantId]);
  }
}