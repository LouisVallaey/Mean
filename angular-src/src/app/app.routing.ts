import { Routes, RouterModule } from '@angular/router';
import {HomepageComponent} from './homepage/homepage.component';
import{LoginpageComponent} from './loginpage/loginpage.component';
import{RegisterpageComponent} from './registerpage/registerpage.component';
import{ApplypageComponent} from './applypage/applypage.component';
import{ListingpageUserComponent} from './listingUsers/listingpageUser.component';
import { AuthGuard } from './_guards/auth.guard';
import { NgxPermissionsGuard } from 'ngx-permissions';

const appRoutes: Routes = [
   { path: '', component: HomepageComponent },
   { path: 'Home', component: HomepageComponent },
   { path: 'login', component: LoginpageComponent},
   { path: 'register', component: RegisterpageComponent},
   { path: 'applydriver', component: ApplypageComponent},
   { path: 'listing', component: ListingpageUserComponent, canActivate: [AuthGuard, NgxPermissionsGuard],
   data:{
       permissions: {
           only: ['USER'],
           redirectTo: 'Home'
       }
   }},
   { path: '**', component: HomepageComponent}
];

export const routing = RouterModule.forRoot(appRoutes);