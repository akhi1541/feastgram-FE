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
  recipe: any = {chefId : "662937b597d2fb16591d88b0"};
  imageFile!: File;


  postService = inject(PostServiceService)
  router = inject(Router)
  location = inject(Location)
  constructor() {}

  onSubmit(): void {
    if (this.imageFile) {
      const ingredientsArray = this.recipe.ingredients.split(',').map((item: string) => item.trim());

      this.recipe.ingredients = ingredientsArray;

      const formData = new FormData();

      // Append recipe object to formData as JSON string
      formData.append('title', JSON.stringify(this.recipe));

      // Append image file
      formData.append('image', this.imageFile);

      // Log FormData for verification
      console.log('FormData before submission:');
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });
      this.postService.createPost(formData).subscribe(res => {
        console.log(res);

      })
      this.router.navigate([""])
    }
  }

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.imageFile = inputElement.files[0];
    }
  }

  resetForm(): void {
    this.recipe = {};
    // this.imageFile = undefined;
  }

  goback(){
    this.location.back()
  }
}
