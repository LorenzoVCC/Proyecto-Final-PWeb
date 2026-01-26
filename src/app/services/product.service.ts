import { inject, Injectable } from '@angular/core';
import { ProductForCreateUpdateDTO, ProductForReadDTO } from '../interfaces/product-interface';

@Injectable({ providedIn: 'root' })

export class ProductService {
  private products: ProductForReadDTO[] = [
    {
      id_Product: 1,
      name: 'Manito Durum',
      description: 'Cocción: Carne apilada en forma de cono que gira verticalmente, cocinándose uniformemente mientras la capa exterior se tuesta Adobo: Incluye especias como cardamomo, comino, pimienta de Jamaica, canela, y sumac, lo que le da un sabor complejo y aromático. Ingredientes típicos: Además de la carne, lleva lechuga, tomate, pepino, cebolla, encurtidos y salsa de yogur con hierbabuena o tahini (pasta de sésamo). Variantes: Aunque el original es de cordero, las versiones populares de pollo y ternera son comunes. ',
      price: 5000,
      discount: 20,
      urlImage: '/shawarma.jpg',
      id_Category: 1,
    }
  ];

  getById(id: number) {
    return this.products.find(p => p.id_Product === id) ?? null;
  }

  getByCategoryId(categoryid: number) {
    return this.products.filter(p => p.id_Category === categoryid);
  }

  createProduct(dto: ProductForCreateUpdateDTO): ProductForReadDTO {
    const newId = Math.max(...this.products.map(p => p.id_Product), 0) + 1;
    const created: ProductForReadDTO = { id_Product: newId, ...dto };
    this.products.push(created);
    return created;
  };

  updateProduct(productId: number, dto: ProductForCreateUpdateDTO): ProductForReadDTO | null {
    const idfound = this.products.findIndex(p => p.id_Product === productId);
    if (idfound === -1) return null;

    const updated: ProductForReadDTO = {
      ...this.products[idfound],
      ...dto,
      id_Product: this.products[idfound].id_Product
    };
    this.products[idfound] = updated;
    return updated;
  };

  deleteProduct(productId: number): boolean {
    const prev = this.products.length;
    this.products = this.products.filter(p => p.id_Product !== productId);
    return this.products.length !== prev;
  }

  deleteByCategoryId(categoryId: number): void {
    this.products = this.products.filter(p => p.id_Category !== categoryId);
  }
}
