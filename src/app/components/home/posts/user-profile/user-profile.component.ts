import { Location } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PostServiceService } from 'src/app/shared/posts/post-service.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{
  postsService = inject(PostServiceService)
  location = inject(Location)
  posts: any[] = []
  profile : any

  ngOnInit(): void {
    this.fetchUserPosts()
    this.postsService.getProfileInfo(this.user._id).subscribe((res: any) => {
      this.profile = res.data
    })
  }
  user = { _id: '662937b597d2fb16591d88b0', name: 'akhil', profilePicture: 'https://akhi-data-dump.s3.ap-south-1.amazonaws.com/1718899953028_men.jpeg' };

  fetchUserPosts(){
    this.postsService.getUserSpecificPosts(this.user._id).subscribe((res)=>{
      this.posts = res.data
    })
  }

  goback(){
    this.location.back()
  }
}
