import { Routes, Router } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page';
import { RegisterPage } from './pages/register-page/register-page';
import { RestaurantListPage } from './pages/restaurant-list-page/restaurant-list-page';
import { RestaurantPage } from './pages/restaurant-page/restaurant-page';
import { ProductPage } from './pages/product-page/product-page';
import { ClientLayout } from './layouts/client-layout/client-layout';


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
        children: 
        [
            {
                path: "",
                component: RestaurantListPage,
            },
            {
                path: "restaurant-page",
                component: RestaurantPage,
            },
            {
                path: "product-page",
                component: ProductPage,
            },
        ]
    },
];