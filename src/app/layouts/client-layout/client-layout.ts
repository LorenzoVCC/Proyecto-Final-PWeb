import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { RestaurantListPage } from '../../pages/restaurant-list-page/restaurant-list-page';
import { LoginPage } from '../../pages/login-page/login-page';
import { RouterOutlet, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'Client-layout',
  standalone: true,
  imports: [Header, RouterOutlet, RouterModule],
  templateUrl: './client-layout.html',
  styleUrl: './client-layout.scss',
})

export class ClientLayout {

}
