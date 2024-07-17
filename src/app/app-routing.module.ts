import { CommentsComponent } from './components/home/posts/comments/comments.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './components/home/posts/posts.component';
import { LikesComponent } from './components/home/posts/likes/likes.component';
import { CreatePostComponent } from './components/home/posts/create-post/create-post.component';
import { UserProfileComponent } from './components/home/posts/user-profile/user-profile.component';
import { SinglePostComponent } from './components/home/posts/single-post/single-post.component';
import { EditProfileComponent } from './components/home/posts/edit-profile/edit-profile.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { SignupComponent } from './components/authentication/signup/signup.component';
import { NotFoundComponent } from './components/partials/not-found/not-found.component';
import { AuthGuard } from './shared/authGuards/authguard.service';
import { SettingsComponent } from './components/partials/settings/settings.component';
import { LogoutComponent } from './components/authentication/logout/logout.component';
import { ResetPasswordComponent } from './components/authentication/reset-password/reset-password.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component:LogoutComponent },
  { path: 'resetPage/:token',component:ResetPasswordComponent },
  { path: 'home', component: PostsComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: SignupComponent },
  { path: 'comments/:id', component: CommentsComponent, canActivate: [AuthGuard] },
  { path: 'likes/:id', component: LikesComponent, canActivate: [AuthGuard] },
  { path: 'createpost', component: CreatePostComponent, canActivate: [AuthGuard] },
  { path: 'user/:id', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'post/:id', component: SinglePostComponent,canActivate: [AuthGuard] },
  { path: 'edit-profile', component: EditProfileComponent, canActivate: [AuthGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: '**', component: NotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
