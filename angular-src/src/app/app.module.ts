import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import {HomepageComponent} from './homepage/homepage.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {LoginpageComponent} from './loginpage/loginpage.component';
import {RegisterpageComponent} from './registerpage/registerpage.component';
import {ApplypageComponent} from './applypage/applypage.component';
import {UserService} from './_services/user.service';
import{AlertComponent} from './_directives/alert.component';
import{AlertService} from './_services/alert.service';
@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    HomepageComponent,
    LoginpageComponent,
    RegisterpageComponent,
    ApplypageComponent,
    AlertComponent,
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpModule              // <-Add HttpModule
  ],
  providers: [UserService,
  AlertService
  ], 
  bootstrap: [AppComponent]
})
export class AppModule { }
