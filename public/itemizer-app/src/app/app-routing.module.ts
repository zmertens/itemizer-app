import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemListComponent } from './items/item-list/item-list.component';
import { AddItemComponent } from './items/add-item/add-item.component';
import { AuthGuard } from './user/auth.guard';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: '', redirectTo: 'user', pathMatch: 'full' },
  {
    path: 'items',
    component: ItemListComponent,
    canActivate: [AuthGuard],
  },
  { path: 'add-item/:id', component: AddItemComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserComponent },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
