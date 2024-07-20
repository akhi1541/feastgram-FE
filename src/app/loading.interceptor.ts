import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoadingServiceService } from './shared/partials/loading-service.service';
import { AuthService } from './shared/authentication/auth.service';
import { PostServiceService } from './shared/posts/post-service.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private pendingRequests = 0;

  constructor(private loadingService: LoadingServiceService ,private postService:PostServiceService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.pendingRequests++;
    if(this.pendingRequests === 1){
      if(!this.postService.postLikedbool && !this.postService.postSavedBool){
        this.loadingService.showLoading()
      }
    }

    const currentUserToken = localStorage.getItem('token');
    const modifiedRequest = request.clone({
      setHeaders:{ jwt:`Bearer ${currentUserToken}` }
    })

    //*we then  pass the request to the next interceptor in the chain or ultimately sending it to the server.
    if(!currentUserToken){
      return next.handle(request).pipe(
        tap({
          next: (event) =>{
            if(event.type === HttpEventType.Response){
              this.handleHideLoading();
            }
          },
          error: () => {
            console.log(`Request completed. Pending requests: ${this.pendingRequests}`);
            this.handleHideLoading();
          }
        })
      )
    }
    return next.handle(modifiedRequest).pipe(
      tap({
        next: (event) =>{
          if(event.type === HttpEventType.Response){
            this.handleHideLoading();
          }
        },
        error: () => {
          console.log(`Request completed. Pending requests: ${this.pendingRequests}`);
          this.handleHideLoading();
        }
      })
    )
  }
  private handleHideLoading(){
    this.pendingRequests--;
    console.log(`Request completed. Pending requests: ${this.pendingRequests}`);
    if(this.pendingRequests === 0){
      this.loadingService.hideLoading()
    }
  }
}
