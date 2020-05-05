import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { Item } from '../item.model'

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  items: Array<Item> = []
  str: String = ''

  constructor(private itemService: ItemService) {

  }

  ngOnInit(): void {
    const authToken = 'Bearer ' + localStorage.getItem('authToken')
    this.itemService.getItems(authToken).subscribe((items) => {
      for (let i = 0; i < items.length; i += 1) {
        items.push[new Item(items[i]['description'], items[i]['price'])]
        console.log(items)
      }
      // console.log(JSON.stringify(items));
      // items.forEach((item) => {
      //   this.items.push[new Item(item['description'], item['price'])]
      // })
    }, (error) => {
      console.error(error)
    })
  }

  onSelect(i) {
    console.log(`value of i: ${i}`)
  }
}
