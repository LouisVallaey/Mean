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
@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    HomepageComponent,
    LoginpageComponent,
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpModule              // <-Add HttpModule
  ],
  providers: [], 
  bootstrap: [AppComponent]
})
export class AppModule { }
