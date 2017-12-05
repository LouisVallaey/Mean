import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { HomepageComponent } from './homepage/homepage.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { RegisterpageComponent } from './registerpage/registerpage.component';
import { ApplypageComponent } from './applypage/applypage.component';
import { ListingpageUserComponent } from './listingUsers/listingpageUser.component';
import { DriverpageComponent } from './driverpage/driverpage.component';
import { DeliveredpageComponent } from './driverpage/deliveredpage/deliveredpage.component';
import { AvailablepageComponent } from './driverpage/availablepage/availablepage.component';
import { ActivepageComponent } from './driverpage/activepage/activepage.component';
import { UserService } from './_services/user.service';
import { PackageService } from './_services/package.service';
import { AlertComponent } from './_directives/alert.component';
import { AlertService } from './_services/alert.service';
import { NgxPermissionsModule } from 'ngx-permissions';
import { AuthenticationService } from './_services/authentication.service';
import { AuthGuard } from './_guards/auth.guard';
import { from } from 'rxjs/observable/from';
@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    HomepageComponent,
    LoginpageComponent,
    RegisterpageComponent,
    ListingpageUserComponent,
    DriverpageComponent,
    AvailablepageComponent,
    DeliveredpageComponent,
    ActivepageComponent,
    ApplypageComponent,
    AlertComponent,
    AppComponent
  ],
  imports: [
    NgxPermissionsModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    routing,
    HttpModule              // <-Add HttpModule
  ],
  providers: [
  PackageService,
  UserService,
  AlertService,
  AuthenticationService,
  AuthGuard
  ], 
  bootstrap: [AppComponent]
})
export class AppModule { }
