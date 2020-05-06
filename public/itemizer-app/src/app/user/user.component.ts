import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {

  signUp: Boolean = false;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.signUp = false;
  }

  onSubmit(f: NgForm) {
    const userEmail = f.controls['email'].value
    const userPassword = f.controls['password'].value

    console.debug(`userEmail: ${userEmail}, userPassword: ${userPassword}`)

    if (!this.signUp) {
      this.userService.loginUser(userEmail, userPassword).subscribe((user: User) => {
        console.debug(JSON.stringify(user))
        // @TODO use NGRX methods to store auth token
        localStorage.setItem('authToken', user['token'])
        console.log(`authToken: ${localStorage.getItem('authToken')}`)
        this.router.navigate(['items']);
      }, (error) => {
        console.error(error)
      })
    } else {
      const name = f.controls['name'].value;
      this.userService.createUser(name, userEmail, userPassword).subscribe((user: User) => {
        console.debug(JSON.stringify(user))
        // @TODO use NGRX methods to store auth token
        localStorage.setItem('authToken', user['token'])
        console.log(`authToken: ${localStorage.getItem('authToken')}`)
        this.router.navigate(['items']);
      }, (error) => {
        console.error(error)
      })
    }
  }

  signup() {
    this.signUp = true;
  }

}
