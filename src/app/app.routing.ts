import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ExploreComponent } from './explore/explore.component';
import { ProfileComponent } from './profile/profile.component';
import { AboutComponent } from './cms/about/about.component';
import { FaqComponent } from './cms/faq/faq.component';
import { PrivacyComponent } from './cms/privacy/privacy.component';
import { TermsComponent } from './cms/terms/terms.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent  },
  { path: 'explore', component: ExploreComponent  },
  { path: 'profile', component: ProfileComponent },
  { path: 'about', component: AboutComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'terms', component: TermsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
