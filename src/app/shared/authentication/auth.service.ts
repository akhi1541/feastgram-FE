import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient)
  contextRoute:string = 'http://localhost:3000/'
  constructor() { }

  signup(reqObj:any):Observable<any>{
    return this.http.post(`${this.contextRoute}api/v1/users/signup`,reqObj)
  }
  login(reqObj:any):Observable<any>{
    return this.http.post(`${this.contextRoute}api/v1/users/login`,reqObj)
  }
}
