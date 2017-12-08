
import { routes } from './app.routing';
import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { Router} from '@angular/router';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_BASE_HREF } from '@angular/common';
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

describe("App: router", () => {
    let location: Location;
    let router: Router;
    let fixure;

    beforeEach(() => {
        TestBed.configureTestingModule({
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
              ], 
            schemas: [NO_ERRORS_SCHEMA],
        });

        router = TestBed.get(Router);
        location = TestBed.get(Location);
    
        fixure = TestBed.createComponent(AppComponent);
        router.initialNavigation();
    });
    it("first time is /home.html", fakeAsync( () => {
        router.navigate(['']);
        tick(100);
        location.forward();
        expect(location.path()).toBe('/home.html');
    }));
    
    it("navigating to '' should navigate to /home", fakeAsync( () => {
        router.navigate(['/home']);
        tick(100);
        location.forward();
        expect(location.path()).toBe('');
    }));
    it("navigating to '/home' should navigate to /home", fakeAsync( () => {
        router.navigate(['Home']);
        tick(100);
        expect(location.path()).toBe('/home');
    }));
    it("navigating to '/login' should navigate to /login", fakeAsync( () => {
        router.navigate(['login']);
        tick(100);
        expect(location.path()).toBe('/login');
    }));
    it("navigating to '/register' should navigate to /register", fakeAsync( () => {
        router.navigate(['register']);
        tick(100);
        expect(location.path()).toBe('/register');
    }));
    it("navigating to '/applydriver' should navigate to /applydriver", fakeAsync( () => {
        router.navigate(['applydriver']);
        tick(100);
        expect(location.path()).toBe('/applydriver');
    }));
}) 
