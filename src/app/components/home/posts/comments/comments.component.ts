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
  user = { _id: '662937b597d2fb16591d88b0', name: 'akhil' };
  comments: any = [];
  postId=''

  newComment: string = '';
  ngOnInit(): void {
      this.activatedRoute.params.subscribe(parms=>{
        this.postId=parms['id']
      })
      this.postService.getComments(this.postId).subscribe(res=>{
        this.comments = res.data
        console.log(this.comments);
      })

  }
  addComment() {
    if (this.newComment.trim()) {
      const newComment: any = {
        userId: this.user._id,
        recipeId: this.postId,
        comment: this.newComment
      };
      this.postService.postComment(newComment).subscribe(res => {
        console.log(res);
      })
      const currentTime = new Date()
      this.comments.push({comment: newComment.comment,user: this.user.name, createdAt: currentTime});
      this.newComment = '';
      console.log(this.comments);

    }
  }
}
