import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map'
import {NgxPermissionsService} from 'ngx-permissions';
import {UserService} from "./user.service";
 
@Injectable()
export class AuthenticationService {
    authToken: any;
    user: any;
    isDev:boolean;
    constructor(private http:Http,private router: Router, private userService:UserService, private permissionsService: NgxPermissionsService) {
       // this.isDev=false; //bij deployen
        this.isDev=true; //bij development
    }

    //hier aanpassen voor de rechten? user.token
    login(email: string, password: string) {
        return this.http.post(this.prepEndpoint('/user/authenticate'), { email: email, password: password })
            .map((response: Response) => {
                //login in gelukt als er een jwt token is in de response
                let user = response.json();
                if (user && user.token) {
                    //user en de token opslaan in local storage om ingelogd te blijven
                    this.storeUserData(user.token, user);
                }
                return user;
            });
    }

    logout() {
        // remove user from local storage to log user out
        let user = JSON.parse(localStorage.getItem('currentUser'));
        user.online = false;
        this.userService.update(user).subscribe();
        this.authToken = null;
        this.user = null;
        localStorage.clear();
        this.permissionsService.flushPermissions();
        this.router.navigate(['/login']);
    }
    
      storeUserData(token, user){
        localStorage.setItem('id_token', token);
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.authToken = token;
        this.user = user;
      }
    
      loadToken(){
        const token = localStorage.getItem('id_token');
        this.authToken = token;
      }
    
      loggedIn(){
        return tokenNotExpired();
      }

      prepEndpoint(ep){
        if(this.isDev){
          return 'http://localhost:4000'+ep;
        } else {
          return 'https://projectwebappsdaniel.herokuapp.com'+ep;
        }
      }
} 