import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {
  // contextRoute:string = 'http://localhost:3000/'
  contextRoute:string = 'http://192.168.145.186:3000/'

  constructor(private http:HttpClient) { }

  // getPosts():Observable<any>{
  //   return this.http.get(`${this.contextRoute}api/v1/posts/allposts`)
  // }

  getPosts(page: number): Observable<any> {
    return this.http.get(`${this.contextRoute}api/v1/posts/allposts?page=${page}`);
  }




  updateLike(userId:string,recipeId:string):Observable<any>{
    const reqObj={'recipeId':recipeId,'userId':userId}
    return this.http.post(`${this.contextRoute}api/v1/posts/post/like`,reqObj)
  }
  updateSaved(userId:string,recipeId:string):Observable<any>{
    const reqObj = {'userId':userId,'recipeId':recipeId}
    return this.http.post(`${this.contextRoute}api/v1/posts/savedPost`,reqObj)
  }
  getUserSavedPosts(userId:string):Observable<any>{
    return this.http.get(`${this.contextRoute}api/v1/posts/savedPosts/userSavedPosts/${userId}`)
  }
  getComments(recipeID:string):Observable<any>{
    return this.http.get(`${this.contextRoute}api/v1/posts/post/getComments/${recipeID}`)
  }
  getLikedUsers(recipeID:string):Observable<any>{
    return this.http.get(`${this.contextRoute}api/v1/posts/postlikes/${recipeID}`)
  }
  postComment(newComment: any):Observable<any>{
    return this.http.post(`${this.contextRoute}api/v1/posts/post/comment`, newComment)
  }

  createPost(postData: any): Observable<any>{
    return this.http.post(`${this.contextRoute}api/v1/posts/post`, postData)
  }

  getUserSpecificPosts(userId: string):Observable<any>{
    return this.http.get(`${this.contextRoute}api/v1/posts/userPosts/${userId}`)
  }

  userSpecificPost(postId: string):Observable<any>{
    return this.http.get(`${this.contextRoute}api/v1/posts/post/${postId}`)
  }

  getProfileInfo(userId: string): Observable<any>{
    return this.http.get(`${this.contextRoute}api/v1/users/getInfo/${userId}`)
  }

  updateProfileInfo(userId: string,formdata: FormData){
    console.log(formdata)
    return this.http.patch(`${this.contextRoute}api/v1/users/profile/${userId}`, formdata)
  }
}
