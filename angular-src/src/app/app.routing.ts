import { Routes, RouterModule } from '@angular/router';
import {HomepageComponent} from './homepage/homepage.component';
import{LoginpageComponent} from './loginpage/loginpage.component';
import{RegisterpageComponent} from './registerpage/registerpage.component';
import{ApplypageComponent} from './applypage/applypage.component';

const appRoutes: Routes = [
   { path: '', component: HomepageComponent },
   { path: 'login', component: LoginpageComponent},
   { path: 'register', component: RegisterpageComponent},
   { path: 'applydriver', component: ApplypageComponent},
   // otherwise redirect to home
   { path: '**', component: HomepageComponent}
];

export const routing = RouterModule.forRoot(appRoutes);