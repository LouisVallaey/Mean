import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { Router } from '@angular/router';
import { UserService } from '../../_services/user.service';
import { AlertService } from '../../_services/alert.service';
import { PackageService } from '../../_services/package.service';
import { Package } from '../../_models/package';
import { NgxPermissionsService } from 'ngx-permissions';
import { DashboardService } from '../../_services/dashboard.service';

import { trigger, state, animate, transition, style } from '@angular/animations';

@Component({
    selector: 'app-availablepage',
    moduleId: module.id,
    templateUrl: 'availablepage.component.html',

    animations: [trigger(
        'rightCenter',
        [
            state('right, void', style({left:'-400%', position:'absolute'})),
            state('center', style({left:'0', position:'relative'})),
          transition(
              'right <=> center', [animate('0.5s ease-in-out'), animate('0.5s ease-in-out')]),
        ])],
})
export class AvailablepageComponent implements OnInit {
    currentUser: User;
    packages: Package[];
    stateExpression: string ="right";    
    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService,
        private packageService: PackageService,
        private dashboardService: DashboardService
        
    ) { }
    ngOnInit() {
        this.dashboardService.getAvailablePage().subscribe(
            e => {
                if(e === false) 
                {
                    this.stateExpression = "right";
                }
                else {
                    this.stateExpression = "center"
                }
        })
        this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
        this.packageService.getAll().subscribe(
            data => {
                data.forEach(element => {
                    if (element._driverId == "") {
                        if (this.packages === undefined) this.packages = [];
                        this.packages.push(element);
                    }
                });
            },
            error => {
                this.alertService.error(error);
            });
    }
}