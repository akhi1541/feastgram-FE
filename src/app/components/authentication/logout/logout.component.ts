import { Router } from '@angular/router';
import { Component, OnInit, inject } from '@angular/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit{
  private router =inject(Router)
  ngOnInit(): void {
      localStorage.clear()
      this.router.navigate(['/login'])

  }
}
