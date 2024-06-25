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
  private authService = inject(AuthService);
  private router = inject(Router)
  onSubmit() {
    // Implement your login logic here
    console.log('Login submitted', {
      email: this.email,
      password: this.password,
    });
    const reqObj = { email: this.email, password: this.password };
    this.authService.login(reqObj).subscribe(res=>{
      console.log(res)
      this.router.navigate(['/home'])

    });
  }
}
