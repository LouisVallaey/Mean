import { Routes, RouterModule } from '@angular/router';

import {HomepageComponent} from './homepage/homepage.component';
import{LoginpageComponent} from './loginpage/loginpage.component';
const appRoutes: Routes = [
   { path: '', component: HomepageComponent },
   { path: 'login', component: LoginpageComponent},
   // otherwise redirect to home
   { path: '**', component: HomepageComponent}
];

export const routing = RouterModule.forRoot(appRoutes);