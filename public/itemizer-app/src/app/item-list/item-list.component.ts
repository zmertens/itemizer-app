import { Component, OnInit, OnDestroy } from '@angular/core';
import { ItemService } from '../item.service';
import { Item } from '../item.model'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit, OnDestroy {

  items: Array<Item> = [new Item(1, 'cool item 1', 33.2),
    new Item(2, 'jetplane (black)', 51.2),
    new Item(3, 'yoyo (yellow)', 12.31)]
  itemsSubscription: Subscription;

  constructor(private itemService: ItemService) {

  }

  ngOnInit(): void {
    const authToken = 'Bearer ' + localStorage.getItem('authToken')
    this.itemsSubscription = this.itemService.getItems(authToken).subscribe((items) => {
      let itemsArr = JSON.parse(JSON.stringify(items));
      itemsArr.entries((item: Item) => this.items.push(new Item(item['_id'],
        item['description'], item['price'])));
      this.itemService.items.next(this.items)
    }, (error) => {
      console.error(error)
    })
  }

  ngOnDestroy(): void {
    this.itemsSubscription.unsubscribe();
  }

  onSelect(item: Item) {
    console.log(`value of i: ${JSON.stringify(item)}`)
  }
}
