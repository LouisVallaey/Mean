import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../_services/user.service';
import { AlertService } from '../_services/alert.service';
import { AuthenticationService } from '../_services/authentication.service';
import { NgxPermissionsService } from 'ngx-permissions';
@Component({
    selector: 'app-homepage',
    moduleId: module.id,
    templateUrl: 'homepage.component.html'
})
export class HomepageComponent implements OnInit { 
    constructor( 
        private authenticationService: AuthenticationService,
        private router: Router
    
    ){}
    logout(){
        console.log("testloguit");
        this.authenticationService.logout();
        this.router.navigate(["/"]);
    }
    ngOnInit(){
    }
}