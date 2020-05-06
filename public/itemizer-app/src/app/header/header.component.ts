import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../user/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  localStorageEmail = '';
  isAuthenticated: Boolean = false;
  private userSubscription: Subscription;

  items = []

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    const emailFromStorage = localStorage.getItem('email')
    if (emailFromStorage) {
      this.localStorageEmail = emailFromStorage
    }

    this.userSubscription = this.userService.isLoggedIn().subscribe((user: User) => {
      if (localStorage.getItem('authToken') !== '') {
        this.isAuthenticated = true;
      } else {
        this.isAuthenticated = false;
      }
    })
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
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
