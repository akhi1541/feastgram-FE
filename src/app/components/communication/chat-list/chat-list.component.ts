import { Location } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/shared/chat/chat.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {
  searchField: string = '';
  suggestions: any = [];
  previouslyCommunicatedUsers: any = []
  private chatService = inject(ChatService);
  private router = inject(Router);
  private location = inject(Location)
  private timeoutId: any = null;
  private readonly debounceTime: number = 1000; // Debounce time in milliseconds
  private uid = localStorage.getItem('uid') || ''
  ngOnInit(): void {
    this.chatService.getCommunicatedPeople(this.uid).subscribe(d => {
      this.previouslyCommunicatedUsers = d

    })
    if (this.searchField !== '') {
      this.searchUsers(this.searchField);
    }
  }

  onSearchChange(): void {
    // Clear the previous timeout if it exists
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    // Set a new timeout to trigger the search after debounceTime
    this.timeoutId = setTimeout(() => {
      this.searchUsers(this.searchField);
    }, this.debounceTime);
  }

  searchUsers(searchTerm: string): void {
    console.log('Search term:', searchTerm);
    if (searchTerm.trim() !== '') {
      this.chatService.getUsers(searchTerm).subscribe(d => {
        console.log('Suggestions:', d);
        this.suggestions = d;
      });
    } else {
      this.suggestions = [];
    }
  }

  selectSuggestion(suggestion: { _id: string, name: string }): void {
    console.log('Selected user:', suggestion);
    this.router.navigate(['/chat', suggestion._id, suggestion.name])
    this.searchField = suggestion.name;
    this.suggestions = [];
  }

  previousTexted(user: any){
    console.log(user);

    this.router.navigate(['/chat',user.receiverId, user.name])
  }

  goback() {
    this.location.back();
  }
}
