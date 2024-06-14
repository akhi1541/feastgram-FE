import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostsComponent } from './components/home/posts/posts.component';
import { HttpClientModule } from '@angular/common/http';

import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Bootstrap JS
import { FormsModule } from '@angular/forms';
import { LikesComponent } from './components/home/posts/likes/likes.component';
import { CommentsComponent } from './components/home/posts/comments/comments.component';


@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    LikesComponent,
    CommentsComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
