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
  errMsg:string='';
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
      passwordModifiedAt:Date.now()
    };
    this.authService.signup(reqObj).subscribe({
      next:(res)=>{
        console.log(res);
      localStorage.setItem('name', res.data.name)
      localStorage.setItem('uid', res.data._id)
      localStorage.setItem('profilePicture', res.data.profilePicture)
      localStorage.setItem('token', res.token)
      this.router.navigate(['/home']);
      },error: (err:any) => {
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
