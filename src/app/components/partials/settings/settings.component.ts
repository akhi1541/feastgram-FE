import { Component, OnInit, inject } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit{
  showFeedbackForm = false;
  feedbackEmail = '';
  feedbackText = '';

  private location = inject(Location)
  private router = inject(Router)
  ngOnInit() { }

  toggleFeedbackForm() {
    this.showFeedbackForm = !this.showFeedbackForm;
    this.feedbackEmail = '';
    this.feedbackText = '';
  }

  changePassword(){
    // goes here
  }

  goback(){
    this.location.back()
  }

  logout() {
    localStorage.clear()
    this.router.navigate(['login'])
  }

}
