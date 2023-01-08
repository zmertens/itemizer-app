import { Component, OnInit } from '@angular/core';
import { MessegeService } from '../messege.service';

@Component({
  selector: 'app-messege',
  templateUrl: './messege.component.html',
  styleUrls: ['./messege.component.css']
})
export class MessegeComponent implements OnInit {
  messeges: string[] = [];

  constructor(public messegeService: MessegeService) { }

  ngOnInit(): void {
    this.messegeService.getMessages().subscribe(messeges => this.messeges = messeges);
  }

}
