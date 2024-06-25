import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/authentication/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  username: string = '';
  email: string = '';
  dob: string = '';
  gender: string = '';
  password: string = '';
  confirm_password: string = '';
  private authService = inject(AuthService);
  private router = inject(Router);

  onSubmit() {
    // Implement your signup logic here
    console.log('Signup submitted', {
      username: this.username,
      email: this.email,
      password: this.password,
    });
    const reqObj = {
      name: this.username,
      email: this.email,
      password: this.password,
      passwordConfirm: this.password,
    };
    this.authService.signup(reqObj).subscribe((res: any) => {
      console.log(res);
      this.router.navigate(['/home']);
    });
  }
}
