import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostServiceService } from 'src/app/shared/posts/post-service.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute)
  postService = inject(PostServiceService)
  comments: any = [
  ];
  postId=''

  newComment: string = '';
  ngOnInit(): void {
      this.activatedRoute.params.subscribe(parms=>{
        this.postId=parms['id']
      })
      this.postService.getComments(this.postId).subscribe(res=>{
        this.comments = res.data

      })
      
  }
  addComment() {
    if (this.newComment.trim()) {
      const newComment: any = {
        username: 'YourUsername',  // Replace with actual username
        text: this.newComment,
        likes: 0,
        replies: [],
        timestamp: 'Just now'
      };
      this.comments.push(newComment);
      this.newComment = '';
    }
  }
}
