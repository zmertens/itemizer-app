import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemListComponent } from './item-list/item-list.component';
import { AddItemComponent } from './add-item/add-item.component';


const routes: Routes = [{path:'items', component: ItemListComponent},
  {path:'add-item', component: AddItemComponent},
  {path:'*', redirectTo: '/items'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
