import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PostServiceService } from 'src/app/shared/posts/post-service.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  posts: any = [];
  savedPosts:any = [];
  liked: { [key: string]: boolean } = {};
  saved: { [key: string]: boolean } = {};
  user = { _id: '662937b597d2fb16591d88b0', name: 'akhil', profilePicture: 'https://akhi-data-dump.s3.ap-south-1.amazonaws.com/1718899953028_men.jpeg' };

  constructor() {}
  postService = inject(PostServiceService);
  router = inject(Router)
  ngOnInit(): void {
      this.fetchposts()
  }



  fetchposts(){
    this.postService.getPosts().subscribe((res) => {
      this.posts = res.data;
      this.postService.getUserSavedPosts(this.user._id).subscribe((res) => {
        this.savedPosts = res.data;//[{},{}]
        this.initializeSavedStatus()
        this.initializeLikedStatus()
      });
    });
  }

  openComments(postId:string){
    this.router.navigate(['/comments',postId])
  }

  openLikes(postId: string){
    this.router.navigate(['/likes', postId])
  }

  initializeSavedStatus() {
    this.posts.forEach((post:any) => {
      this.saved[post._id] = this.savedPosts.some((savedPost:any) => savedPost.recipeId === post._id);
    });
  }

  initializeLikedStatus() {
    this.posts.forEach((post: any) => {
      this.liked[post._id] = post.likedByIds.includes(this.user._id);
    });
  }

  postLiked(postId: string): void {
    this.postService.updateLike(this.user._id, postId).subscribe((res) => {
      this.liked[postId] = res.status;
      const post = this.posts.find((p: any) => p._id === postId);

      if (post) {
        if (post.likedByIds.includes(this.user._id)) {
          post.likedByIds.pop();
        } else {
          post.likedByIds.push(this.user._id);
        }
        post.likesCount = post.likedByIds.length;
      }
    });
  }

  postSaved(postId: string): void {
    this.postService.updateSaved(this.user._id, postId).subscribe((res) => {
      this.saved[postId] = res.statusBool;
      const post = this.posts.find((p: any) => p._id === postId);

      if (post) {
        const savedObj = { userId: this.user._id, recipeId: postId };
        const index = this.savedPosts.findIndex((savedPost:any) => savedPost.recipeId === postId && savedPost.userId === this.user._id);

        if (index !== -1) {
          // Remove the saved object from the array
          this.savedPosts.splice(index, 1);
        } else {
          // Add the new saved object to the array
          this.savedPosts.push(savedObj);
        }
      }
    });
  }

  isPortrait(imageUrl: string): boolean {
    return true;
  }
  isLandscape(imageUrl: string): boolean {
    // Example logic to determine if the image is landscape
    // Replace with your actual logic based on image dimensions or aspect ratio
    return true; // Replace with actual condition
  }
}
