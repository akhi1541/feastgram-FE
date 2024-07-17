import { Component, OnInit, inject, HostListener } from '@angular/core';
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
  showDesc: { [key: string]: boolean } = {};
  saved: { [key: string]: boolean } = {};
  imageLoaded: { [key: string]: boolean } = {};
  name: string =  ''
  uid: string = ''
  profilePic: string = ''
  currentPage: number = 1;
  totalPages: number = 1;
  showContent: boolean = false;

  constructor() {}
  postService = inject(PostServiceService);
  router = inject(Router)
  ngOnInit(): void {
    this.name = localStorage.getItem('name') || ''
    this.uid = localStorage.getItem('uid') || ''
    this.profilePic = localStorage.getItem('profilePicture') || ''
      this.fetchPosts()
  }



  // ------------------------------

  fetchPosts(page: number = 1) {
    this.postService.getPosts(page).subscribe((res) => {
      const newPosts = res.data.filter((post:any) => !this.posts.some((existingPost: any) => existingPost._id === post._id));
      this.posts = [...this.posts, ...newPosts];
      this.totalPages = res.pages
      console.log(newPosts);
      if (page === 1) {
        this.postService.getUserSavedPosts(this.uid).subscribe((res) => {
          this.savedPosts = res.data;
          this.initializeSavedStatus();
          this.initializeLikedStatus();
        });
      }
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    const max = document.documentElement.scrollHeight;

    if(pos >= max - 1 && this.currentPage < this.totalPages) { // Ensure not to fetch beyond total pages
      this.currentPage++;
      this.fetchPosts(this.currentPage);
    }
  }
  // ------------------------------

  openComments(postId:string){
    this.router.navigate(['/comments',postId])
  }
  toggleContent(postId:string) {
    // this.showContent = !this.showContent;
    this.showDesc[postId] = !this.showContent;
  }
  less(postId:string){
    this.showDesc[postId] =false
  }

  openLikes(postId: string){
    this.router.navigate(['/likes', postId])
  }

  initializeSavedStatus() {
    this.posts.forEach((post:any) => {
      this.saved[post._id] = this.savedPosts.some((savedPost:any) => savedPost.recipeId._id === post._id);
    });
  }

  initializeLikedStatus() {
    this.posts.forEach((post: any) => {
      this.liked[post._id] = post.likedByIds.includes(this.uid);
    });
  }

  postLiked(postId: string): void {
    const post = this.posts.find((p: any) => p._id === postId);

      if (post) {
        if (post.likedByIds.includes(this.uid)) {
          post.likedByIds.pop();
        } else {
          post.likedByIds.push(this.uid);
        }
        post.likesCount = post.likedByIds.length;
      }
    this.postService.updateLike(this.uid, postId).subscribe((res) => {
      this.liked[postId] = res.status;

    });
  }

  postSaved(postId: string): void {
    this.postService.updateSaved(this.uid, postId).subscribe((res) => {
      this.saved[postId] = res.statusBool;
      const post = this.posts.find((p: any) => p._id === postId);

      if (post) {
        const savedObj = { userId: this.uid, recipeId: postId };
        const index = this.savedPosts.findIndex((savedPost:any) => savedPost.recipeId === postId && savedPost.userId === this.uid);

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

  openProfile(chefId: string){
    this.router.navigate(['/user',chefId])
  }
}