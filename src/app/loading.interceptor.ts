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

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private pendingRequests = 0;

  constructor(private loadingService: LoadingServiceService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.pendingRequests++;
    if(this.pendingRequests === 1){
      this.loadingService.showLoading()
    }

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
  private handleHideLoading(){
    this.pendingRequests--;
    console.log(`Request completed. Pending requests: ${this.pendingRequests}`);
    if(this.pendingRequests === 0){
      this.loadingService.hideLoading()
    }
  }
}
