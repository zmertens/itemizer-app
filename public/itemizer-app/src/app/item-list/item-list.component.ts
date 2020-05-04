import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { Item } from '../item.model'

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  items = []
  str: String = ''

  constructor(private itemService: ItemService) {
    const totalItems = 10
    for (let i = 0; i < totalItems; i += 1) {
      this.items.push(new Item('A description', 10.0))
      console.log(this.items[i])
    }
  }

  ngOnInit(): void {
    this.itemService.getItems().subscribe((items) => {
      console.log(JSON.stringify(items));
      this.str = items['str'];
    }, (error) => {
      console.error(error)
    })
  }

  onSelect(i) {
    console.log(`value of i: ${i}`)
  }
}
