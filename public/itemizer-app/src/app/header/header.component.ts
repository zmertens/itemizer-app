import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  localStorageEmail = '';
  isAuthenticated: Boolean = false;

  items = []

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    const emailFromStorage = localStorage.getItem('email')
    if (emailFromStorage) {
      this.localStorageEmail = emailFromStorage
    }
  }

  onSubmit(f: NgForm) {
    const userEmail = f.controls['email'].value
    const userPassword = f.controls['password'].value
    console.debug(`userEmail: ${userEmail}, userPassword: ${userPassword}`)
    this.userService.loginUser(userEmail, userPassword).subscribe((user) => {
      console.log(JSON.stringify(user))
      this.isAuthenticated = true
      // @TODO use NGRX methods to store auth token
      localStorage.setItem('authToken', user['token'])
      console.log(`authToken: ${localStorage.getItem('authToken')}`)
    }, (error) => {
      console.error(error)
    })
  
  }

  logout() {
    this.isAuthenticated = !this.isAuthenticated
    const token = 'Bearer ' + localStorage.getItem('authToken')
    this.userService.logoutUser(token).subscribe((user) => {
      localStorage.setItem('authToken', '')
    })
  }

}
