import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './includes/header/header.component';
import { HomeComponent } from './home/home.component';

// services
import { PostService } from './services/post.service';

import { AppRoutingModule } from './app.routing';

import { AgmCoreModule } from '@agm/core';
import {TimeAgoPipe} from 'time-ago-pipe';
import { ExploreComponent } from './explore/explore.component';
import { ProfileComponent } from './profile/profile.component';
import { AboutComponent } from './cms/about/about.component';
import { PrivacyComponent } from './cms/privacy/privacy.component';
import { TermsComponent } from './cms/terms/terms.component';
import { FaqComponent } from './cms/faq/faq.component';
import { FooterComponent } from './includes/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    TimeAgoPipe,
    ExploreComponent,
    ProfileComponent,
    AboutComponent,
    PrivacyComponent,
    TermsComponent,
    FaqComponent,
    FooterComponent
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDTaqYmYZO3Wjhna-mrrCGUWTLVcFQjKSE'
    }),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    PostService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
