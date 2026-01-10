import { Routes } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page';
import { RegisterPage } from './pages/register-page/register-page';
import { RestaurantListPage } from './pages/restaurant-list-page/restaurant-list-page';
import { RestaurantPage } from './pages/restaurant-page/restaurant-page';
import { ProductPage } from './pages/product-page/product-page';
import { ClientLayout } from './layouts/client-layout/client-layout';
import { NewCategoryPage } from './pages/new-category-page/new-category-page';
import { NewProductPage } from './pages/new-product-page/new-product-page';


export const routes: Routes = [
  {
    path: "login",
    component: LoginPage,
  },
  {
    path: "register",
    component: RegisterPage,
  },
  {
    path: "",
    component: ClientLayout,
    children: [
      {
        path: "",
        component: RestaurantListPage,
      },
      {
        path: 'restaurant-page/:id',
        component: RestaurantPage,
      },
      {
        path: "product-page/:id",
        component: ProductPage,
      },
      {
        path: "create-category",
        component: NewCategoryPage,
      },
      {
        path: "new-product-page",
        component: NewProductPage,
      }
    ],
  },

  { path: "**", redirectTo: "" },
];
