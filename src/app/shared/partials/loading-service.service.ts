import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingServiceService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  constructor() {}

  showLoading() {
    this.loadingSubject.next(true);
  }
  hideLoading() {
    this.loadingSubject.next(false);
  }

  get isLoading()
  {
    return this.loadingSubject.asObservable()
  }
}
