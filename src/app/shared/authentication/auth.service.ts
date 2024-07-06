import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient)
  private router = inject(Router)
  contextRoute:string = 'http://localhost:3000/'
  constructor() { }

  signup(reqObj:any):Observable<any>{
    return this.http.post(`${this.contextRoute}api/v1/users/signup`,reqObj)
  }
  login(reqObj:any):Observable<any>{
    return this.http.post(`${this.contextRoute}api/v1/users/login`,reqObj)
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token')
    if(!token){
      this.router.navigate(['/login'])
    }
    return !!token
  }
}
