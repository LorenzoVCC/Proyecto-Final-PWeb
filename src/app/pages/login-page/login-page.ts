import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss'
})

export class LoginPage {
  router = inject(Router)
  solicitudABackEnCurso = false;

  errorlogin = false;

  async login(form:NgForm)
  {
    console.log(form.value)
    this.errorlogin = false;
    if (!form.value.email || !form.value.password)
    {
      this.errorlogin = true;
      return
    }
    this.solicitudABackEnCurso = true;
    this.solicitudABackEnCurso = false;
    this.errorlogin = true;
  }
}