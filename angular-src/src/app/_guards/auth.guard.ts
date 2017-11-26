import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {AuthenticationService} from '../_services/authentication.service';
import {NgxPermissionsService} from 'ngx-permissions';

@Injectable()
export class AuthGuard implements CanActivate{
  constructor(private authService:AuthenticationService, private router:Router,private permissionsService: NgxPermissionsService){

  }

  canActivate(){
    if(this.authService.loggedIn()){
      if (localStorage.getItem('currentUser')) {
        // logged in so return true
        const perm = JSON.parse(localStorage.getItem('currentUser')).roles;
        this.permissionsService.addPermission(perm);
      }
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}