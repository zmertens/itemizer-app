import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  localStorageEmail = '';
  isAuthenticated: Boolean = false;

  constructor(private itemServer: ItemService) { }

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
    this.itemServer.loginUser(userEmail, userPassword).subscribe((user) => {
      console.log(JSON.stringify(user))
    }, (error) => {
      console.error(error)
    })
  }

}
