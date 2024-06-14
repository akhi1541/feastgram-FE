import { CommentsComponent } from './components/home/posts/comments/comments.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './components/home/posts/posts.component';
import { LikesComponent } from './components/home/posts/likes/likes.component';
import { CreatePostComponent } from './components/home/posts/create-post/create-post.component';

const routes: Routes = [
  { path: '', component: PostsComponent },
  { path: 'comments/:id', component: CommentsComponent },
  { path: 'likes/:id', component: LikesComponent },
  { path: 'createpost', component: CreatePostComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
