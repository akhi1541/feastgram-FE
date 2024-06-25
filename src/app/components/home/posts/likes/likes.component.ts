import { Location } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostServiceService } from 'src/app/shared/posts/post-service.service';

@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.css']
})
export class LikesComponent implements OnInit{
  likes:any = []
  user = { _id: '662937b597d2fb16591d88b0', name: 'akhil' };
  postId: string = ''
  postService = inject(PostServiceService)
  activatedRoute = inject(ActivatedRoute)
  location = inject(Location)

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(parms=>{
      this.postId=parms['id']
    })
    this.postService.getLikedUsers(this.postId).subscribe(res => {
      this.likes = res.data
    })
  }

  getDisplayName(like: any): string {
    return like.userLikedBy.name === this.user.name ? 'You' : like.userLikedBy.name;
  }

  goback(){
    this.location.back()
  }

}
