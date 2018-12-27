import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './includes/header/header.component';
import { HomeComponent } from './home/home.component';
import {SlideshowModule} from 'ng-simple-slideshow';
import { Angular2ImageGalleryModule } from 'angular2-image-gallery';
// services
import { HomeService } from './home/home.service';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';
import { RoleGuardService as RoleGuard } from './auth/role-guard.service'; //login by type, access given by role type like admin, subadmin and etc..
import { ToastmsgsService } from './common/toastmsgs.service';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { AutocompleteModule } from 'ng2-input-autocomplete';
import 'hammerjs';
//Routing
import { AppRoutingModule } from './app.routing';

//others
import { AgmCoreModule } from '@agm/core';
import {TimeAgoPipe} from 'time-ago-pipe';
import { DeferLoadModule } from '@trademe/ng-defer-load';
import { OwlModule } from 'ngx-owl-carousel';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';

//components
import { ExploreComponent } from './explore/explore.component';
import { ProfileComponent } from './profile/profile.component';
import { AboutComponent } from './cms/about/about.component';
import { PrivacyComponent } from './cms/privacy/privacy.component';
import { TermsComponent } from './cms/terms/terms.component';
import { FaqComponent } from './cms/faq/faq.component';
import { FooterComponent } from './includes/footer/footer.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';


import { CommonModule } from '@angular/common';
import { ToastrModule, ToastContainerModule  } from 'ngx-toastr';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

// Import Social Login Module
import { SocialLoginModule, AuthServiceConfig } from "angular4-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angular4-social-login";
import { LazyLoadImagesModule } from 'ngx-lazy-load-images';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ResetpasswordComponent } from './reset_pwd/resetpassword.component';
import{ForgotPwdComponent } from './forgot-pwd/forgot-pwd.component';
 


let config = new AuthServiceConfig([
  // {
  //   // id: GoogleLoginProvider.PROVIDER_ID,
  //   // provider: new GoogleLoginProvider("Google-OAuth-Client-Id") //for google auth
  // },
  // {
  //   // id: FacebookLoginProvider.PROVIDER_ID,
  //   // provider: new FacebookLoginProvider('106481729892658') // for facebook auth
  // }
]);

export function jwtTokenGetter() {
  return '';
}

export function provideConfig() {
  return config;
}

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
    FooterComponent,
    LoginComponent,
    SignupComponent,
    EditProfileComponent,
    ResetpasswordComponent,
    ForgotPwdComponent ,
   
    
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDTaqYmYZO3Wjhna-mrrCGUWTLVcFQjKSE'
    }),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    AppRoutingModule,
    CommonModule,
    ToastrModule.forRoot({positionClass: 'inline'}),
    ToastContainerModule,
    DeferLoadModule,
    LazyLoadImagesModule,
    SlideshowModule,
    OwlModule ,
    Angular2ImageGalleryModule,
    NguiAutoCompleteModule,
    Ng2AutoCompleteModule ,
    AutocompleteModule,
    NgxSpinnerModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: jwtTokenGetter
      }
    }),
    SocialLoginModule
  ],
  providers: [
    HomeService,
    CookieService,
    JwtHelperService,
    AuthGuard,
    RoleGuard,
    ToastmsgsService,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
