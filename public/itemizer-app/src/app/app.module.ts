import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ItemListComponent } from './items/item-list/item-list.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ItemService } from './items/item.service';
import { AddItemComponent } from './items/add-item/add-item.component';
import { FormsModule } from '@angular/forms';
import { UserService } from './user/user.service';
import { UserComponent } from './user/user.component';
import { UserInterceptor } from './user/user.interceptor';
import { MessegeComponent } from './messege/messege.component';
import { AboutComponent } from './about/about.component';
import { CurrencyPipe } from './currency.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ItemListComponent,
    AddItemComponent,
    UserComponent,
    MessegeComponent,
    AboutComponent,
    CurrencyPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ItemService, UserService, {
    provide: HTTP_INTERCEPTORS,
    useClass: UserInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
