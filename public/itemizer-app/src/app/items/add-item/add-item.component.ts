import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../item.model';
import { ItemService } from '../item.service';
import { Observable, Subscription } from 'rxjs';

/**
 * The add-item component handles all stages of item life:
 *  add / edit / update / deletions
 */
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
        // console.log(`param.id: ${param.id}`);
        const itemIndex = Number(param.id);
        if (itemIndex !== -1 && itemIndex < this.itemService.items.length) {
          this.itemSubscription = this.itemService.getItems().subscribe(
            (items: Item[]) => {
              this.itemToEdit = items[itemIndex];
              this.priceModel = this.itemToEdit.price;
              this.descModel = this.itemToEdit.description;
            },
            (err) => {
              // console.error(err);
            }
          );

          this.editMode = true;
        } else {
          this.priceModel = null;
          this.descModel = null;
          this.editMode = false;
        }
      },
      (error) => {
        // console.error(`${error}, item: does not exist!`);
      }
    );
  }

  ngOnDestroy(): void {
    this.editMode = true;
    this.routeSubscription.unsubscribe();
    // this.itemSubscription.unsubscribe();
  }

  onSubmit(f: NgForm) {
    if (f.invalid) {
      // console.error(f);
      return;
    }

    const price = f.controls['price'].value;
    const desc = f.controls['description'].value;

    let itemObs: Observable<Item>;

    if (this.editMode) {
      this.itemToEdit.price = price;
      this.itemToEdit.description = desc;
      itemObs = this.itemService.updateItem(this.itemToEdit);
    } else {
      const newItem = new Item(0, desc, price);
      itemObs = this.itemService.createItem(newItem);
    }

    itemObs.subscribe((item: Item) => {
      // console.log(`Created or edited item: ${JSON.stringify(item)}`);
    });

    this.onClear(f);
    this.router.navigate(['items']);
  }

  onClear(f: NgForm) {
    f.reset();
  }

  onDelete() {
    this.itemService.deleteItem(this.itemToEdit['_id']).subscribe(
      (item) => {
        // console.log(`Deleting item: ${item}`);
      },
      (err) => {
        // console.log(`Error deleting item: ${err}`);
      }
    );
    this.router.navigate(['items']);
  }

  cancel() {
    this.router.navigate(['items']);
  }
}
