import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  isLoggedIn = !!localStorage.getItem('final-project-token');
  constructor(private _router: Router) {}

  logout() {
    localStorage.removeItem('final-project-token');
    localStorage.removeItem('final-project-role');
    this._router.navigate(['/login']);
  }
}
