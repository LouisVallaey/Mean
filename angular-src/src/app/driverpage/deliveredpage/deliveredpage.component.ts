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
    selector: 'app-deliveredpage',
    moduleId: module.id,
    templateUrl: 'deliveredpage.component.html',

    animations: [trigger(
        'rightCenter',
        [
            state('right, void', style({left:'-400%', position:'absolute'})),
            state('center', style({left:'0', position:'relative'})),
          transition(
              'right <=> center', [animate('0.5s ease-in-out'), animate('0.5s ease-in-out')]),
        ])],
})
export class DeliveredpageComponent implements OnInit {
    currentUser: User;
    deliveredPackages: Package[] = [];
    stateExpression: string ="right";    
    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService,
        private packageService: PackageService,
        private dashboardService: DashboardService
        
    ) { }
    ngOnInit() {
        this.dashboardService.getDeliveredPage().subscribe(
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
        this.dashboardService.getPackages().subscribe(
            data => {
                this.deliveredPackages = [];
                data.forEach(element => {
                    if (element.status == "Delivery confirmed" && element._driverId == this.currentUser._id) {
                        this.deliveredPackages.push(element);
                    }
                });
            },
            error => {
                this.alertService.error(error);
            });
    }
}