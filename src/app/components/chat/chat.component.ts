import { Location } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
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
  receiverId: any;
  senderId:any =localStorage.getItem('uid');
  private chatService = inject(ChatService);
  private route = inject(ActivatedRoute);
  private location = inject(Location)
  ngOnInit(): void {
    this.route.params.subscribe(
      (prams) => (this.receiverId = prams['receiverId'])
    );
    this.chatService.getPrivateMessages().subscribe((message: string) => {
      console.log(message);
      this.messages.push(message);
    });

    // this.chatService.fetchMessages().subscribe((messagesArr) => {
    //   messagesArr.forEach((messageObj: any) => {
    //     this.messages.push(messageObj.message);
    //   });
    // });
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
}
