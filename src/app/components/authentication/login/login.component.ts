import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/authentication/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errMsg:string='';
  private authService = inject(AuthService);
  private router = inject(Router)
  onSubmit() {
    console.log('Login submitted', {
      email: this.email,
      password: this.password,
    });
    const reqObj = { email: this.email, password: this.password };
    this.authService.login(reqObj).subscribe({
      next: (res) => {
        if (res.status === 'fail') {
          console.log('Error:', res.message);
          this.errMsg = res.message;
        } else {
          console.log(res);
          localStorage.setItem('name', res.data.name);
          localStorage.setItem('uid', res.data._id);
          localStorage.setItem('profilePicture', res.data.profilePicture);
          localStorage.setItem('token', res.token);
          localStorage.setItem('bio', res.data.bio)
          this.router.navigate(['/home']);
        }
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
    })
  }
}
