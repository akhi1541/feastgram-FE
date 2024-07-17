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
  cropShape: boolean = false;

  postService = inject(PostServiceService);
  router = inject(Router);
  location = inject(Location);
  constructor() {}

  onSubmit(): void {
    if (this.imageFile) {
      // Ensure ingredients is a string before splitting
      if (typeof this.recipe.ingredients !== 'string') {
        // Handle if ingredients is not a string (e.g., set default value or show error)
        this.errorcode = true;
        this.statusMessage = 'Ingredients must be a comma-separated string.';
        setTimeout(() => {
          this.errorcode = false;
          this.statusMessage = '';
        }, 3000);
        return;
      }

      const ingredientsArray = this.recipe.ingredients.split(',')
        .map((item: string) => item.trim());

      this.recipe.ingredients = ingredientsArray;
      const chefId = localStorage.getItem('uid');

      const formData = new FormData();

      if (chefId) {
        formData.append('chefId', chefId);
      }
      formData.append('title', JSON.stringify(this.recipe));

      // Resize and compress image before appending to formData
      this.resizeAndCompressImage(this.imageFile).then(resizedBlob => {
        formData.append('image', resizedBlob, this.fileName);

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
      }).catch(error => {
        console.error('Error resizing image:', error);
        this.errorcode = true;
        this.statusMessage = 'Error resizing image. Please try again.';
        setTimeout(() => {
          this.statusMessage = '';
        }, 3000);
      });
    } else {
      this.errorcode = true;
      this.statusMessage = 'Kindly upload an image.';
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

  resizeAndCompressImage(file: File): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event: any) => {
        const img = new Image();
        img.src = event.target.result;

        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject('Could not create canvas context');
            return;
          }

          // Resize image proportionally
          const maxWidth = 800;
          const maxHeight = 600;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);

          // Compress image
          canvas.toBlob(
            (blob: Blob | null) => {
              if (blob) {
                resolve(blob);
              } else {
                reject('Error creating blob after resizing');
              }
            },
            'image/jpeg',
            0.7
          ); // Adjust quality as needed (0.7 means 70% quality)
        };

        img.onerror = (error) => {
          reject(error);
        };
      };

      reader.readAsDataURL(file);
    });
  }
}