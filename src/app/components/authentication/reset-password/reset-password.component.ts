import { AuthService } from 'src/app/shared/authentication/auth.service';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  token: string = '';
  passwordConfirm: string = '';
  password: string = '';
  isForgetPassword!: boolean;
  currPassword: string = '';
  statusMessage: string = '';
  errMsg: string = '';
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private router = inject(Router);
  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.token = param['token'];
      this.isForgetPassword = !!this.token;
    });
  }

  onSubmit() {
    const reqObj = {
      ...(this.token
        ? { token: this.token }
        : { id: localStorage.getItem('uid'), currPassword: this.currPassword }),
      password: this.password,
      passwordConfirm: this.passwordConfirm,
    };
  
    const apiCall = this.isForgetPassword
      ? this.authService.resetPassword(reqObj)
      : this.authService.updatePassword(reqObj);
  
    apiCall.subscribe({
      next: (res) => this.handleResponse(res),
      error: (err) => this.handleError(err),
      complete: () => console.log('Request complete'),
    });
  }
  
  private handleResponse(res: any) {
    console.log(res);
    this.statusMessage = res.message;
    setTimeout(() => {
      this.statusMessage = '';
      this.router.navigate(['/login']);
    }, 2000);
  }
  
  private handleError(err: any) {
    console.log('Error:', err);
    this.errMsg = err.error.message;
    setTimeout(() => {
      this.errMsg = '';
    }, 3000);
  }
  
}
