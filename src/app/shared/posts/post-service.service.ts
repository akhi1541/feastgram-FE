import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {
  contextRoute:string = 'http://localhost:3000/'

  constructor(private http:HttpClient) { }

  getPosts():Observable<any>{
    return this.http.get(`${this.contextRoute}api/v1/posts/allposts`)
  }
  updateLike(userId:string,recipeId:string):Observable<any>{
    const reqObj={'recipeId':recipeId,'userId':userId}
    return this.http.post(`${this.contextRoute}api/v1/posts/post/like`,reqObj)
  }
  updateSaved(userId:string,recipeId:string):Observable<any>{
    const reqObj = {'userId':userId,'recipeId':recipeId}
    return this.http.post(`${this.contextRoute}api/v1/posts/savedPost`,reqObj)
  }
  getUserSavedPosts(uesrId:string):Observable<any>{
    return this.http.get(`${this.contextRoute}api/v1/posts/savedPosts/userSavedPosts/${uesrId}`)
  }
  getComments(recipeID:string):Observable<any>{
    return this.http.get(`${this.contextRoute}api/v1/posts/post/getComments/${recipeID}`)
  }
}
