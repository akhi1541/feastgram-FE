import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';

import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-img-cropper',
  templateUrl: './img-cropper.component.html',
  styleUrls: ['./img-cropper.component.css'],
})
export class ImgCropperComponent {
  imageChangedEvent: any = '';
  croppedImage: any = '';
  previewImage:any=''
  type: string = 'text';
  rotation: number = 0;
  @Input() cropShape:any;
  @Output() image: EventEmitter<any> = new EventEmitter();

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.previewImage = event.objectUrl
    this.croppedImage = {fileName:this.imageChangedEvent.srcElement.files[0].name,blob:event.blob}
  }
  

  imageLoaded() {
    // show cropper
  }

  cropperReady() {
    // cropper ready
  }

  loadImageFailed() {
    // show message
  }

  uploadImage() {
    this.image.emit(this.croppedImage);
  }

  rotateImage() {
    // Logic to rotate the image
    this.rotation += 1;
    if (this.rotation === 4) this.rotation = 0;
  }
}
