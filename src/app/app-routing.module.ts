import { CommentsComponent } from './components/home/posts/comments/comments.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './components/home/posts/posts.component';
import { LikesComponent } from './components/home/posts/likes/likes.component';
import { CreatePostComponent } from './components/home/posts/create-post/create-post.component';
import { UserProfileComponent } from './components/home/posts/user-profile/user-profile.component';
import { SinglePostComponent } from './components/home/posts/single-post/single-post.component';
import { EditProfileComponent } from './components/home/posts/edit-profile/edit-profile.component';

const routes: Routes = [
  { path: '', component: PostsComponent },
  { path: 'comments/:id', component: CommentsComponent },
  { path: 'likes/:id', component: LikesComponent },
  { path: 'createpost', component: CreatePostComponent },
  { path: 'user', component: UserProfileComponent },
  { path: 'post/:id', component: SinglePostComponent },
  { path: 'edit-profile', component: EditProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
