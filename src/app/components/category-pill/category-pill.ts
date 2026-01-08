import { Component, Input } from '@angular/core';
import { CategoryPublicDTO } from '../../interfaces/category-interface';

@Component({
  selector: 'category-pill',
  imports: [],
  templateUrl: './category-pill.html',
  styleUrl: './category-pill.scss',
})
export class CategoryPill {
  @Input() category!: CategoryPublicDTO
}
