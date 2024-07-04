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
  fileName:any;


  postService = inject(PostServiceService)
  router = inject(Router)
  location = inject(Location)
  constructor() {}

  onSubmit(): void {
    if (this.imageFile) {
      const ingredientsArray = this.recipe.ingredients.split(',').map((item: string) => item.trim());

      this.recipe.ingredients = ingredientsArray;
      const chefId = localStorage.getItem('uid');

      const formData = new FormData();

      // Append recipe object to formData as JSON string
      if(chefId){
        formData.append('chefId', chefId)
      }
      formData.append('title', JSON.stringify(this.recipe));

      // Append image file
      formData.append('image', this.imageFile);
      formData.append('fileName',this.fileName)

      // Log FormData for verification
      console.log('FormData before submission:');
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });
      this.postService.createPost(formData).subscribe(res => {
        console.log(res);

      })
      this.router.navigate(["/home"])
    }
  }

  onFileSelected(event: any): void {
      this.imageFile = event.blob;
      this.fileName = event.fileName
  }



  resetForm(): void {
    this.recipe = {};
    // this.imageFile = undefined;
  }

  goback(){
    this.location.back()
  }
}
