import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  itemId: Number;
  editMode: Boolean = true;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.itemId = +param.id
    }, (error) => {
      console.error(`Item id: ${error} does not exist!`);
    });
  }

  onSubmit(f: NgForm) {
    if (f.invalid) {
      console.error(f)
    }
  }

  onClear() {
    
  }

  onDelete() {

  }

}
