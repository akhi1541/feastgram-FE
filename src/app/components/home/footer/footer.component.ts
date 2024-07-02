import { Component, EventEmitter, Output } from '@angular/core';
import { PostServiceService } from 'src/app/shared/posts/post-service.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent{
  userId : string = localStorage.getItem('uid') || ''

  @Output() fetchPostsClicked = new EventEmitter<void>();

  handleFetchPosts() {
    this.fetchPostsClicked.emit();
  }
}
