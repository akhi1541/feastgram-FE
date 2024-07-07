import { Location } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostServiceService } from 'src/app/shared/posts/post-service.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute)
  postService = inject(PostServiceService)
  location = inject(Location)
  router = inject(Router)
  // user = { _id: '662937b597d2fb16591d88b0', name: 'akhil' };
  comments: any = [];
  postId=''

  user = {
  _id : '',
  name : '',
  profilePicture: ''
  }


  newComment: string = '';
  ngOnInit(): void {
    this.user._id = localStorage.getItem('uid') || ''
    this.user.name = localStorage.getItem('name') || ''
    this.user.profilePicture = localStorage.getItem('profilePicture') || ''

      this.activatedRoute.params.subscribe(parms=>{
        this.postId=parms['id']
      })
      this.postService.getComments(this.postId).subscribe(res=>{
        this.comments = res.data
        console.log(res.data);

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
      this.comments.push({comment: newComment.comment,user: this.user.name,profilePicture: this.user.profilePicture, createdAt: currentTime});
      this.newComment = '';

    }
  }

  openProfile(userId: string){
    this.router.navigate(['user', userId])

  }

  goback(){
    this.location.back()
  }
}
