import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessegeService {
  messagesSubj = new BehaviorSubject<string[]>([]);
  messages: string[] = []

  constructor() { }

  getMessages(): Observable<string[]> {
    return this.messagesSubj;
  }

  getMessage(id: number): string {
    if (id < this.messages.length) {
      return this.messages[id];
    } else {
      this.messages.push(`Error. ${id} out of range`);
    }
  }

  addMessage(m: string): boolean {
    this.messages.push(m);
    this.messagesSubj.next(this.messages);
    return true;
  }

  deleteMessages(): boolean {
    this.messages = [];
    this.messagesSubj.next([]);
    return true;
  }
}
