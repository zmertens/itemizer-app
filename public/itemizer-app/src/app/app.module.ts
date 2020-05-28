import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ItemListComponent } from './items/item-list/item-list.component';
<<<<<<< HEAD
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
=======
import { HttpClientModule } from '@angular/common/http';
>>>>>>> heroku/master
import { ItemService } from './items/item.service';
import { AddItemComponent } from './items/add-item/add-item.component';
import { FormsModule } from '@angular/forms';
import { UserService } from './user/user.service';
import { UserComponent } from './user/user.component';
<<<<<<< HEAD
import { UserInterceptor } from './user/user.interceptor';
=======
>>>>>>> heroku/master

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ItemListComponent,
    AddItemComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
<<<<<<< HEAD
  providers: [ItemService, UserService, {
    provide: HTTP_INTERCEPTORS,
    useClass: UserInterceptor,
    multi: true
  }],
=======
  providers: [ItemService, UserService],
>>>>>>> heroku/master
  bootstrap: [AppComponent]
})
export class AppModule { }
