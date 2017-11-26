import { Component, OnInit } from '@angular/core';
import {User} from '../_models/user';
import { Router,ActivatedRoute } from '@angular/router';
import { UserService } from '../_services/user.service';
import {AlertService} from '../_services/alert.service';
import {AuthenticationService} from '../_services/authentication.service';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
    selector: 'app-headerDash',
    moduleId: module.id,
    templateUrl: 'headerDash.component.html'
})
export class HeaderDashComponent { 
    constructor(){}

    
}