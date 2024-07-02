import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostServiceService } from 'src/app/shared/posts/post-service.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {
  postId!: string;
  post: any;

  liked: { [postId: string]: boolean } = {};
  saved: { [postId: string]: boolean } = {};
  user = { _id: '662937b597d2fb16591d88b0', name: 'akhil' };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostServiceService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.postId = params['id'];
    });

    this.postService.userSpecificPost(this.postId).subscribe(
      (res: any) => {
        console.log(res.data);
        this.post = res.data;
        this.initializeLikedStatus();
        this.initializeSavedStatus();
      },
      error => {
        console.error('Error fetching post:', error);
      }
    );
  }

  openComments(postId: string): void {
    this.router.navigate(['/comments', postId]);
  }

  openLikes(postId: string): void {
    this.router.navigate(['/likes', postId]);
  }

  initializeSavedStatus(): void {
    this.saved[this.post._id] = this.post.savedByUsers.some((savedPost: any) => savedPost._id === this.user._id);
  }

  initializeLikedStatus(): void {
    this.liked[this.post._id] = this.post.likedBy.some((likedUser: any) => likedUser._id === this.user._id);
  }


  postLiked(postId: string): void {
    this.postService.updateLike(this.user._id, postId).subscribe(
      (res: any) => {
        this.liked[postId] = res.status;
        if (res.status) {
          this.post.likedBy.push(this.user._id);
          this.post.likesCount++;
        } else {
          this.post.likedBy = this.post.likedBy.filter((id: string) => id !== this.user._id);
          this.post.likesCount--;
        }
      }
    );
  }

  postSaved(postId: string): void {
    this.postService.updateSaved(this.user._id, postId).subscribe(
      (res: any) => {
        this.saved[postId] = res.statusBool;

        if (res.statusBool) {
          this.post.savedByUsers.push({ userId: this.user._id});
        } else {
          this.post.savedByUsers = this.post.savedByUsers.filter((savedPost: any) => savedPost.userId !== this.user._id); // Remove savedBy object
        }
      }
    );
  }

  isPortrait(imageUrl: string): boolean {
    // Example logic to determine if the image is portrait
    return true; // Replace with actual logic
  }

  isLandscape(imageUrl: string): boolean {
    // Example logic to determine if the image is landscape
    return true; // Replace with actual logic
  }

  openProfile(id: string){
    this.router.navigate(['user', id])
  }


  goback(){
    this.location.back()
  }
}
