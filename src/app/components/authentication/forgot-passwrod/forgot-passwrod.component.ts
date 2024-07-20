import { Component, inject } from '@angular/core';
import { AuthService } from 'src/app/shared/authentication/auth.service';

@Component({
  selector: 'app-forgot-passwrod',
  templateUrl: './forgot-passwrod.component.html',
  styleUrls: ['./forgot-passwrod.component.css'],
})
export class ForgotPasswrodComponent {
  Email: string = '';
  errMsg:string=''
  private authService = inject(AuthService);
  statusMessage: string='';
  onSubmit() {
    
    const reqObj = { email: this.Email };
    this.authService.VerifyEmail(reqObj).subscribe({
      next: (res) => {
        console.log(res);
            this.statusMessage = res.message;
            setTimeout(() => {
              this.statusMessage = '';
            }, 3000);
      },
          error: (err) => {
            console.log('Error:', err);
            this.errMsg = err.error.message;
            setTimeout(() => {
              this.errMsg=''
            }, 3000);
          },
          complete: () => {
            console.log('Request complete');
          }
    });
  }
}
