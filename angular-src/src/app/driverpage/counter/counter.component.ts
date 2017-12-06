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
    selector: 'app-counterpage',
    moduleId: module.id,
    templateUrl: 'counter.component.html',

    animations: [trigger(
        'rightCenter',
        [
            state('right, void', style({left:'-400%', position:'absolute'})),
            state('center', style({left:'0', position:'relative'})),
          transition(
              'right <=> center', [animate('0.5s ease-in-out'), animate('0.5s ease-in-out')]),
        ])],
})
export class CounterpageComponent implements OnInit {
    currentUser: User;
    activecount: number = 0;
    availablecount: number = 0;
    deliveredcount: number = 0;

    stateExpression: string ="center";
    
        constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService,
        private packageService: PackageService,
        private dashboardService: DashboardService
    ) { }
    ngOnInit() {
        this.dashboardService.getCounterPage().subscribe(
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
                    if (element._driverId == this.currentUser._id && element._userId != "") {
                        this.activecount = this.activecount + 1     
                    }else if(element._driverId == "") {
                        this.availablecount = this.availablecount + 1 
                    }else if (element._userId == "" && element._driverId == this.currentUser._id) {
                        this.deliveredcount = this.deliveredcount + 1
                    }
                });
            },
            error => {
                this.alertService.error(error);
            });
    }
}