import { Component } from '@angular/core';
import { LoadingServiceService } from 'src/app/shared/partials/loading-service.service';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent {
  isLoading!: boolean
  constructor(loadingService: LoadingServiceService){
    loadingService.isLoading.subscribe((isloading: boolean) => {
      this.isLoading = isloading
    })
  }
}
