import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PostServiceService } from 'src/app/shared/posts/post-service.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent {
  recipe: any = {};
  imageFile: any;
  fileName: any;
  postCreated: boolean = false;
  errorcode: boolean = false;
  imgUploaded: boolean = false;
  statusMessage: string = '';
  cropShape:boolean = false

  postService = inject(PostServiceService);
  router = inject(Router);
  location = inject(Location);
  constructor() {}

  onSubmit(): void {
    if (this.imageFile) {
      const ingredientsArray = this.recipe.ingredients
        .split(',')
        .map((item: string) => item.trim());

      this.recipe.ingredients = ingredientsArray;
      const chefId = localStorage.getItem('uid');

      const formData = new FormData();

      // Append recipe object to formData as JSON string
      if (chefId) {
        formData.append('chefId', chefId);
      }
      formData.append('title', JSON.stringify(this.recipe));

      // Append image file
      formData.append('image', this.imageFile);
      formData.append('fileName', this.fileName);

      // Log FormData for verification
      console.log('FormData before submission:');
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });
      this.postService.createPost(formData).subscribe({
        next: (res: any) => {
          console.log(res);
          this.postCreated = true;
          this.statusMessage = res.message;
          setTimeout(() => {
            this.statusMessage = '';
            this.postCreated = true;
            this.router.navigate(['/home']);
          }, 1500);
        },
        error: (err: any) => {
          console.log('Error:', err);
          this.errorcode = true;
          this.statusMessage = err.error.message;
          setTimeout(() => {
            this.statusMessage = '';
          }, 3000);
        },
      });
    } else {
      this.errorcode = true;
      this.statusMessage = 'kindly upload image';
      setTimeout(() => {
        this.errorcode = false;
        this.statusMessage = '';
      }, 3000);
    }
  }

  onFileSelected(event: any): void {
    this.imageFile = event.blob;
    this.fileName = event.fileName;
    this.statusMessage = 'Image uploaded successfully!';
    this.imgUploaded = true;
    setTimeout(() => {
      this.statusMessage = '';
    this.imgUploaded = false;
    }, 1500);
    }

  resetForm(): void {
    this.recipe = {};
    // this.imageFile = undefined;
  }

  goback() {
    this.location.back();
  }
}
