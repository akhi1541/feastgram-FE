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
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService)
  private router = inject(Router)
  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.token = param['token'];
    });
  }

  onSubmit() {
    const reqObj={
      token:this.token,
      password:this.password,
      passwordConfirm:this.passwordConfirm
    }
    this.authService.resetPassword(reqObj).subscribe(res=>{
      console.log(res);
      this.router.navigate(['/login'])
      
    })

  }
}
