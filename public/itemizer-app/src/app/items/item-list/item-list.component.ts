import { Component, OnInit, OnDestroy } from '@angular/core';
import { ItemService } from '../item.service';
import { Item } from '../item.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css'],
})
export class ItemListComponent implements OnInit, OnDestroy {
  items: Item[] = [];
  private itemsSubscription: Subscription;

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    const authToken = 'Bearer ' + localStorage.getItem('authToken');
    this.itemsSubscription = this.itemService.getItems(authToken).subscribe(
      (items: Item[]) => {
        console.debug(
          `ngOnInit - item get subscription\r\n: ${JSON.stringify(items)}`
        );
        this.items = items;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  ngOnDestroy(): void {
    console.debug('Inside item-list component ngOnDestroy');
    this.itemsSubscription.unsubscribe();
    this.items = [];
  }

  addItem() {
    
  }

  onSelect(item: Item) {
    console.log(`value of i: ${JSON.stringify(item)}`);
  }
}
