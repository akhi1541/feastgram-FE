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
  user = { _id: '', name: '' };
  profile!: any;
  imageFile!: File;
  ngOnInit(): void {
    this.user._id = localStorage.getItem('uid') || ''
    this.user.name = localStorage.getItem('name') || ''
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
    this.profile.profilePicture = event;
  }

  onSubmit() {
    const formData = new FormData();
    const chefId = this.user._id
    if(chefId){
      formData.append('chefId', chefId)
    }
    formData.append('type', 'profilePic')
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
