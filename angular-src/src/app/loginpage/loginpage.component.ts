import { Component, OnInit } from '@angular/core';
import {User} from '../_models/user';
import { Router,ActivatedRoute } from '@angular/router';
import { UserService } from '../_services/user.service';
import {AlertService} from '../_services/alert.service';
import {AuthenticationService} from '../_services/authentication.service';
import { NgxPermissionsService } from 'ngx-permissions';
@Component({
    selector: 'app-loginpage',
    moduleId: module.id,
    templateUrl: 'loginpage.component.html'
})
export class LoginpageComponent implements OnInit { 
    model: any = {};
    showPassword:boolean=false;
    loading = false;
    returnUrl: string;

    constructor(
        private authenticationService: AuthenticationService,
        private route: ActivatedRoute,
        private router: Router,
        private alertService: AlertService) { }
    
    ngOnInit(){
        // login resetten
        // return url nemen
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        //als er geen retourn url is dan /home als standaard zetten
        if(this.returnUrl == "/") this.returnUrl = '/listing';
    }
 
    //inloggen en indien gelukt verder gaan naar de return url
    
    login() {
        this.loading = true;
        this.authenticationService.login(this.model.email, this.model.password).subscribe(
                data => {
                    this.authenticationService.storeUserData(data.token, data);
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error(error._body);
                    this.loading = false;
                });
    }
} 
