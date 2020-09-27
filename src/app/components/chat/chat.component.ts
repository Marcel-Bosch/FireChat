import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/providers/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: [
  ]
})
export class ChatComponent implements OnInit {

  element: any;
  message: string = "";

  constructor(public cs: ChatService) {
    this.cs.loadMessages()
      .subscribe(() => {
        setTimeout(() => {
          this.element.scrollTop = this.element.scrollHeight;
        },20)
      })
  }

  ngOnInit() {
    this.element = document.getElementById('app-messages')
  }

  sendMessage() {
    if (this.message.length == 0) { return; }
    this.cs.addMessage(this.message).then(() => this.message = "")
      .catch((err) => console.error('Sending error', err))


  }

}
