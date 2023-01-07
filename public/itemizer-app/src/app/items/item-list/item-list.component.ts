import { Component, OnInit, OnDestroy } from '@angular/core';
import { ItemService } from '../item.service';
import { Item } from '../item.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css'],
})
export class ItemListComponent implements OnInit, OnDestroy {
  items: Item[] = [];
  currency: String = '';
  private itemsSubscription: Subscription;

  constructor(private itemService: ItemService, private router: Router) {}

  ngOnInit(): void {
    this.itemsSubscription = this.itemService.getItems().subscribe(
      (items: Item[]) => {
        // console.log(`ngOnInit - items.length[]: ${items.length}`);
        this.items = items;
      },
      (error) => {
        // console.error(error);
      }
    );
  }

  ngOnDestroy(): void {
    // console.log('Inside item-list component ngOnDestroy');
    this.itemsSubscription.unsubscribe();
    this.items = [];
  }

  addItem() {
    this.router.navigate(['add-item/-1']);
  }

  onSelect(item: Item) {
    // console.log(`value of i: ${JSON.stringify(item)}`);
  }
}
