import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from './user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from './user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  errorMessage: String = '';
  signUp: Boolean = false;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.signUp = false;
  }

  onSubmit(f: NgForm) {
    if (!f.valid) {
      // console.log('form invalid');
      return;
    }

    const userEmail = f.controls['email'].value;
    const userPassword = f.controls['password'].value;

    let userOservable: Observable<User>;

    if (!this.signUp) {
      userOservable = this.userService.loginUser(userEmail, userPassword);
    } else {
      const name = f.controls['name'].value;
      userOservable = this.userService.createUser(name, userEmail, userPassword);
    }

    userOservable.subscribe((user: User) => {
        // @TODO use NGRX methods to store auth token
        // console.log(`user: ${JSON.stringify(user)}}`)
        localStorage.setItem('authToken', user.token.toString())
        this.router.navigate(['items']);
    }, (err) => {
      // console.error(err);
      this.errorMessage = err.toString();
    });

    f.reset();
  }

  cancel() {
    this.signUp = false;
    this.errorMessage = '';
    this.router.navigate(['/']);
  }

  toggleSignup() {
    this.signUp = !this.signUp;
  }

}
