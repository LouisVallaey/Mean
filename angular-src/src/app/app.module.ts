import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import {HomepageComponent} from './homepage/homepage.component';
import {HeaderComponent} from './header/header.component';
import {HeaderDashComponent} from './headerDash/headerDash.component';
import {FooterComponent} from './footer/footer.component';
import {LoginpageComponent} from './loginpage/loginpage.component';
import {RegisterpageComponent} from './registerpage/registerpage.component';
import {ApplypageComponent} from './applypage/applypage.component';
import { ListingpageUserComponent} from './listingUsers/listingpageUser.component';
import {UserService} from './_services/user.service';
import{AlertComponent} from './_directives/alert.component';
import{AlertService} from './_services/alert.service';
import { NgxPermissionsModule} from 'ngx-permissions';
import { AuthenticationService } from './_services/authentication.service';
import { AuthGuard } from './_guards/auth.guard';
@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    HeaderDashComponent,
    HomepageComponent,
    LoginpageComponent,
    RegisterpageComponent,
    ListingpageUserComponent,
    ApplypageComponent,
    AlertComponent,
    AppComponent
  ],
  imports: [
    NgxPermissionsModule.forRoot(),
    BrowserModule,
    FormsModule,
    routing,
    HttpModule              // <-Add HttpModule
  ],
  providers: [
  UserService,
  AlertService,
  AuthenticationService,
  AuthGuard
  ], 
  bootstrap: [AppComponent]
})
export class AppModule { }
