import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';
import { RoleGuardService as RoleGuard } from './auth/role-guard.service'; //login by type, access given by role type like admin, subadmin and etc..

import { HomeComponent } from './home/home.component';
import { ExploreComponent } from './explore/explore.component';
import { ProfileComponent } from './profile/profile.component';
import { AboutComponent } from './cms/about/about.component';
import { FaqComponent } from './cms/faq/faq.component';
import { PrivacyComponent } from './cms/privacy/privacy.component';
import { TermsComponent } from './cms/terms/terms.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  // { 
  //   path: 'admin', 
  //   component: AdminComponent, 
  //   canActivate: [RoleGuard], 
  //   data: { 
  //     expectedRole: 'admin'
  //   } 
  // },
  {
    path: 'explore',
    component: ExploreComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-profile',
    component: EditProfileComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: ':name',
    component: ProfileComponent,
    //canActivate: [AuthGuard]
  },
 

  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'faq',
    component: FaqComponent
  },
  {
    path: 'privacy',
    component: PrivacyComponent
  },
  {
    path: 'terms',
    component: TermsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
