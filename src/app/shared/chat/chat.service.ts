import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private socket: Socket;
  contextRoute:string = 'http://localhost:3000/'
  private url = 'http://localhost:3001'; // Ensure this matches your server URL

  constructor(private http: HttpClient) {
    this.socket = io(this.url, {
      transports: ['websocket', 'polling'],
    });

    const userId = localStorage.getItem('uid');
    if (userId) {
      this.storeUserId(userId);
    }
  }

  sendMessage(message: string): void {
    this.socket.emit('chatMessage', { message });
  }

  sendPrivateMessage(msg:any): void {
    this.socket.emit('privateMessage', msg);
  }

  getMessages(): Observable<any> {
    return new Observable<any>((observer) => {
      this.socket.on('chatMessage', (message: any) => {
        observer.next(message);
      });
    });
  }

  getPrivateMessages(): Observable<any> {
    return new Observable<any>((observer) => {
      this.socket.on('receivePrivate', (message: any) => {
        console.log(message)
        observer.next(message);
      });
    });
  }

  fetchMessages(receiverId:string, senderId: string): Observable<any> {
    return this.http.get<any>(`${this.contextRoute}api/v1/chats/messages/${receiverId}/${senderId}`);
  }

  storeUserId(userId: string): void {
    this.socket.emit('storeUserId', userId);
  }

  getUsers(name: string){
    return this.http.get(`${this.contextRoute}api/v1/posts/chat-list/${name}`)
  }

  getCommunicatedPeople(senderId: string){
    return this.http.get(`${this.contextRoute}api/v1/chats/messages/${senderId}`)
  }
}
