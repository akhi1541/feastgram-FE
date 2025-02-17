import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgCropperComponent } from './img-cropper.component';

describe('ImgCropperComponent', () => {
  let component: ImgCropperComponent;
  let fixture: ComponentFixture<ImgCropperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImgCropperComponent]
    });
    fixture = TestBed.createComponent(ImgCropperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
