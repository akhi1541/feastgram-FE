import { Location } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingServiceService } from 'src/app/shared/partials/loading-service.service';
import { PostServiceService } from 'src/app/shared/posts/post-service.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{

  posts: any[] = []
  profile : any

  name: string =  ''
  uid: string = ''
  profilePic: string = ''
  bio: string = ''

  someone: string = ''
  showEdit: boolean = false

  isLoading: boolean = false;
  saved = false

  constructor(){}
  postsService = inject(PostServiceService)
  location = inject(Location)
  actRoute = inject(ActivatedRoute)
  loadingService = inject(LoadingServiceService)



  ngOnInit(): void {

    this.uid = localStorage.getItem('uid') || ''
    this.actRoute.params.subscribe(params => {
      this.someone =params['id']
    })

    if(this.someone === this.uid){
      this.profilePic = localStorage.getItem('profilePicture') || ''
      this.name = localStorage.getItem('name') || ''
      this.bio = localStorage.getItem('bio') || ''


      this.showEdit = true
      this.fetchUserPosts(this.uid)
      this.getProfileInfo(this.uid)
    }else{
      this.fetchUserPosts(this.someone)
      this.getProfileInfo(this.someone)
    }

    this.loadingService.isLoading.subscribe(loading => {
      this.isLoading = loading;
    });
  }

  getProfileInfo(userId: string){
    this.loadingService.showLoading()
    this.postsService.getProfileInfo(this.someone).subscribe((res: any) => {
      this.profile = res.data
      console.log(res.data);

      this.bio = res.data.bio

      this.profilePic = res.data.profilePicture
      this.loadingService.hideLoading()
    })
  }

  fetchUserPosts(userId: string){
    this.saved = false
    this.loadingService.showLoading
    this.postsService.getUserSpecificPosts(userId).subscribe((res)=>{
      this.posts = res.data
      this.loadingService.hideLoading()
    })
  }

  fetchSaved(userId: string){
    this.saved = true
    this.loadingService.showLoading
    this.postsService.getUserSavedPosts(userId).subscribe((res)=>{
      this.posts = res.data
      console.log(res.data);

      this.loadingService.hideLoading()
    })
  }

  goback(){
    this.location.back()
  }
}
