import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  editMode: Boolean = true;

  constructor() { }

  ngOnInit(): void {
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
