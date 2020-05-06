import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  localStorageEmail = '';
  isAuthenticated: Boolean = false;

  items = []

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    const emailFromStorage = localStorage.getItem('email')
    if (emailFromStorage) {
      this.localStorageEmail = emailFromStorage
    }

    if (localStorage.getItem('authToken') !== '') {
      this.isAuthenticated = true;
    } else {
      this.isAuthenticated = false;
    }
  }

  logout() {
    this.isAuthenticated = !this.isAuthenticated
    const token = 'Bearer ' + localStorage.getItem('authToken')
    this.userService.logoutUser(token).subscribe((user) => {
      localStorage.setItem('authToken', '');
      this.router.navigate(['/']);
    })
  }

}
