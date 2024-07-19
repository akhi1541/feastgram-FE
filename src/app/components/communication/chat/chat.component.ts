import { Location } from '@angular/common';
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from 'src/app/shared/chat/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  messages: any[] = [];
  message: any = {};
  msg: string='';
  receiverId!: string;
  receivername!: string
  senderId:any =localStorage.getItem('uid');
  private chatService = inject(ChatService);
  private route = inject(ActivatedRoute);
  private location = inject(Location)

  @ViewChild('chatContainer') private chatContainer!: ElementRef;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
        this.receiverId = params['receiverId']
        this.receivername = params['name']
  });
    this.chatService.getPrivateMessages().subscribe((message: string) => {
      console.log(message);
      this.messages.push(message);
      this.scrollToBottom()
    });

    this.chatService.fetchMessages(this.receiverId, this.senderId).subscribe((messagesArr) => {
      this.messages = messagesArr
      console.log(messagesArr);
      this.scrollToBottom()
    });
  }

  sendMessage(): void {
    this.message['senderId'] = this.senderId;
    this.message['receiverId'] = this.receiverId;
    this.message['timeStamp']=Date.now()
    this.message['message'] = this.msg;
    this.chatService.sendPrivateMessage(this.message);
    this.msg = '';
  }
  goback() {
    this.location.back();
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      if (this.chatContainer && this.chatContainer.nativeElement) {
        const container = this.chatContainer.nativeElement;
        container.scrollTop = container.scrollHeight;
      }
    }, 0); // Timeout to ensure the DOM is updated
  }
}
