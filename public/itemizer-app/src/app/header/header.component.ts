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

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    const emailFromStorage = localStorage.getItem('email')
    if (emailFromStorage) {
      this.localStorageEmail = emailFromStorage
    }

    this.userSubscription = this.userService.user.subscribe((user: User) => {
      if (user !== null) {
        console.log(`user: ${JSON.stringify(user)}`);
        this.isAuthenticated = true;
      } else {
        this.isAuthenticated = false;
      }
      console.log(`authenticated? : ${this.isAuthenticated}`);
    })
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  logout() {
    const token = 'Bearer ' + localStorage.getItem('authToken');
    this.userService.logoutUser(token).subscribe((user) => {
      console.log('Logging out');
      this.router.navigate(['/']);
    })
  }

}
