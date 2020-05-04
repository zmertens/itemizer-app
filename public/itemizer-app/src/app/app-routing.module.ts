import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemListComponent } from './item-list/item-list.component';
import { AddItemComponent } from './add-item/add-item.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [{path:'items', component: ItemListComponent, canActivate: [AuthGuard]},
  {path:'add-item', component: AddItemComponent},
  {path:'*', redirectTo: '/'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
