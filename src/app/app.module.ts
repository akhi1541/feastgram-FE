import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostsComponent } from './components/home/posts/posts.component';
import { HttpClientModule } from '@angular/common/http';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
