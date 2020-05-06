import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemListComponent } from './item-list/item-list.component';
import { AddItemComponent } from './add-item/add-item.component';
import { AuthGuard } from './auth.guard';
import { UserComponent } from './user/user.component';


const routes: Routes = [{path:'items', component: ItemListComponent, canActivate: [AuthGuard]},
  {path:'add-item', component: AddItemComponent, canActivate: [AuthGuard]},
  {path:'user', component: UserComponent},
  {path:'**', redirectTo: '/'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
