import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { CounterpageComponent } from './driverpage/counter/counter.component';
import { ActivepageComponent } from './driverpage/activepage/activepage.component';
import { UserService } from './_services/user.service';
import { PackageService } from './_services/package.service';
import { AlertComponent } from './_directives/alert.component';
import { AlertService } from './_services/alert.service';
import { DashboardService} from './_services/dashboard.service';
import { NgxPermissionsModule } from 'ngx-permissions';
import { AuthenticationService } from './_services/authentication.service';
import { AuthGuard } from './_guards/auth.guard';
import { from } from 'rxjs/observable/from';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
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
        CounterpageComponent,
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
      AuthGuard,
      DashboardService
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it('should render an alert tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('alert'));
  }));
  it('should render an router-outlet tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('router-outlet'));
  }));
});
