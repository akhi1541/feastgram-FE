import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private socket: Socket;
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

  sendPrivateMessage(msg: {
    receiverId: string;
    senderId: string;
    message: string;
    timeStamp: Date;
  }): void {
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
        observer.next(message);
      });
    });
  }

  fetchMessages(): Observable<any> {
    return this.http.get<any>(`${this.url}/api/messages`);
  }

  storeUserId(userId: string): void {
    this.socket.emit('storeUserId', userId);
  }
}
