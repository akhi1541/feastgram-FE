import { Location } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { PostServiceService } from 'src/app/shared/posts/post-service.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  location = inject(Location);
  postService = inject(PostServiceService);
  user = { _id: '662937b597d2fb16591d88b0', name: 'akhil' };
  profile!: any;
  imageFile!: File;
  ngOnInit(): void {
    this.postService.getProfileInfo(this.user._id).subscribe((res: any) => {
      this.profile = res.data;
    });
  }

  goback() {
    this.location.back();
  }

  triggerFileInputClick() {
    const fileInput = document.getElementById(
      'profilePictureInput'
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.imageFile = inputElement.files[0];

      // Preview the selected image (if supported by browser)
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profile.profilePicture = e.target.result;
      };
      reader.readAsDataURL(this.imageFile);
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('name', this.profile.name);
    formData.append('email', this.profile.email);
    if (this.imageFile) {
      formData.append('image', this.imageFile);
    }
    formData.forEach((value, key) => {
    });

    this.postService.updateProfileInfo(this.user._id, formData).subscribe((res) => {
      console.log(res);

    })
  }
}
