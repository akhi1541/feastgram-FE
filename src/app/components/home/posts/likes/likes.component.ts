import { Location } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostServiceService } from 'src/app/shared/posts/post-service.service';

@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.css']
})
export class LikesComponent implements OnInit{
  likes:any = []
  user = { _id: localStorage.getItem('uid'), name: localStorage.getItem('name') };
  postId: string = ''
  postService = inject(PostServiceService)
  activatedRoute = inject(ActivatedRoute)
  router = inject(Router)
  location = inject(Location)

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(parms=>{
      this.postId=parms['id']
    })
    this.postService.getLikedUsers(this.postId).subscribe(res => {
      this.likes = res.data
      console.log(res.data[0]);

    })
  }

  openProfile(id:string){
    this.router.navigate(['user',id])

  }

  getDisplayName(like: any): string {
    return like.userLikedBy.name === this.user.name ? 'You' : like.userLikedBy.name;
  }

  goback(){
    this.location.back()
  }

}
