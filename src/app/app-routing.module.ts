import { CommentsComponent } from './components/home/posts/comments/comments.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './components/home/posts/posts.component';

const routes: Routes = [{path:'',component:PostsComponent},{path:'comments/:id',component:CommentsComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
