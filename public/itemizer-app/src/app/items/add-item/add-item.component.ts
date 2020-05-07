import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../item.model';
import { ItemService } from '../item.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css'],
})
export class AddItemComponent implements OnInit, OnDestroy {
  itemToEdit: Item = null;
  editMode: Boolean = true;
  priceModel: Number;
  descModel: String;
  private itemSubscription: Subscription;
  private routeSubscription: Subscription;

  constructor(
    private itemService: ItemService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe(
      (param) => {
        if (param.item) {
          this.editMode = true;
          this.itemToEdit = param.item;
          this.priceModel = this.itemToEdit.price;
          this.descModel = this.itemToEdit.description;
        } else {
          this.editMode = false;
        }
      },
      (error) => {
        console.error(`Item: ${error} does not exist!`);
      }
    );
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

  onSubmit(f: NgForm) {
    if (f.invalid) {
      console.error(f);
      return;
    }

    const price = f.controls['price'].value;
    const desc = f.controls['description'].value;

    const authToken = 'Bearer ' + localStorage.getItem('authToken');

    let itemObs: Observable<Item>;

    if (this.editMode) {
      itemObs = this.itemService.updateItem(this.itemToEdit, authToken);
    } else {
      const newItem = new Item(0, desc, price);
      itemObs = this.itemService.createItem(newItem, authToken);
    }

    this.router.navigate(['items']);
  }

  onClear(f: NgForm) {
    f.reset();
  }

  onDelete() {
    const authToken = localStorage.getItem('authToken');
    this.itemService.deleteItem(this.itemToEdit, authToken);
    this.router.navigate(['items']);
  }

  cancel() {
    this.router.navigate(['items']);
  }
}
