import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostsComponent } from './components/home/posts/posts.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgOptimizedImage } from '@angular/common';

import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Bootstrap JS
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LikesComponent } from './components/home/posts/likes/likes.component';
import { CommentsComponent } from './components/home/posts/comments/comments.component';

import { FooterComponent } from './components/home/footer/footer.component';
import { CreatePostComponent } from './components/home/posts/create-post/create-post.component';
import { UserProfileComponent } from './components/home/posts/user-profile/user-profile.component';
import { SinglePostComponent } from './components/home/posts/single-post/single-post.component';
import { EditProfileComponent } from './components/home/posts/edit-profile/edit-profile.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { SignupComponent } from './components/authentication/signup/signup.component';
import { LoadingSpinnerComponent } from './components/partials/loading-spinner/loading-spinner.component';
import { LoadingInterceptor } from './loading.interceptor';
import { LoadingServiceService } from './shared/partials/loading-service.service';
import { NotFoundComponent } from './components/partials/not-found/not-found.component';
import { SettingsComponent } from './components/partials/settings/settings.component';
import { ImgCropperComponent } from './components/partials/img-cropper/img-cropper.component';
import { ImageCropperComponent } from 'ngx-image-cropper';
import { LogoutComponent } from './components/authentication/logout/logout.component';
import { ResetPasswordComponent } from './components/authentication/reset-password/reset-password.component';
import { ChatComponent } from './components/communication/chat/chat.component';
import { ChatListComponent } from './components/communication/chat-list/chat-list.component';


@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    LikesComponent,
    CommentsComponent,
    LoginComponent,
    SignupComponent,
    FooterComponent,
    CreatePostComponent,
    UserProfileComponent,
    SinglePostComponent,
    EditProfileComponent,
    LoadingSpinnerComponent,
    NotFoundComponent,
    SettingsComponent,
    ImgCropperComponent,
    LogoutComponent,
    ResetPasswordComponent,
    ChatComponent,
    ChatListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollingModule,
    ImageCropperComponent,
    NgOptimizedImage
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true},
    LoadingServiceService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
