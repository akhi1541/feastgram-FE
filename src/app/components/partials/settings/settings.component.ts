import { Component, OnInit, inject } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/authentication/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  showFeedbackForm = false;
  feedbackEmail = '';
  feedbackText = '';
  forgotPass: string = 'http://localhost:3000/api/v1/posts/forgetPassword';

  private location = inject(Location);
  private router = inject(Router);
  private authService = inject(AuthService)
  ngOnInit() {}

  toggleFeedbackForm() {
    this.showFeedbackForm = !this.showFeedbackForm;
    this.feedbackEmail = '';
    this.feedbackText = '';
  }

  // changePassword(){

  //   // goes here
  // }

  goback() {
    this.location.back();
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

}
