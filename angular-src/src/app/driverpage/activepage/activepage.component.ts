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
    selector: 'app-activepage',
    moduleId: module.id,
    templateUrl: 'activepage.component.html',

    animations: [trigger(
        'rightCenter',
        [
          state('right, void', style({left:'-400%', position:'absolute'})),
          state('center', style({left:'0', position:'relative'})),
          transition(
              'right <=> center', [animate('0.5s ease-in-out'), animate('0.5s ease-in-out')]),
        ])],
})
export class ActivepageComponent implements OnInit {
    currentUser: User;
    activePackages: Package[];
    allPackages : Package[];
    stateExpression: string ="right";
    
    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService,
        private packageService: PackageService,
        private dashboardService: DashboardService
        
    ) { }
    ngOnInit() {
        this.dashboardService.getActivePage().subscribe(
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
                this.activePackages = [];
                this.allPackages = [];
                this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
                data.forEach(element => {
                    this.allPackages.push(element);
                    if (element._driverId == this.currentUser._id && element.status != "Delivery confirmed") {
                        this.activePackages.push(element);
                    }
                });
            },
            error => {
                this.alertService.error(error);
            });
    }
    verwijderDriverid(p: Package) {
        p._driverId = "";
        this.packageService.update(p).subscribe(
            data => {
                this.alertService.success("package succesfully removed from active packages");
                this.dashboardService.setPackages(this.allPackages);
            },
            error => {
                console.log(error);
                this.alertService.error(error);
            });
    }
    ppStatus(pp:Package){
       if(pp.status == "Driver Selected"){
        pp.status = "Package pickup";
        this.updateStatus(pp);
       }
    }
    ptStatus(pp:Package){
        if(pp.status == "Package pickup"){
            pp.status = "Package in transit";
            this.updateStatus(pp);
        }
     }
    pdStatus(pp:Package){
        if(pp.status == "Package in transit"){
            pp.status = "Package Delivered";
            this.updateStatus(pp);
        }
     }
    confirmStatus(pp:Package){
        if(pp.status ==  "Package Delivered"){
            pp.status = "Delivery confirmed";
            this.updateStatus(pp);
        } 
    }
    updateStatus(p: Package) {
        this.packageService.update(p).subscribe(
            data => {
                this.alertService.success("package status succesfully changed");
                this.dashboardService.setPackages(this.allPackages);
            },
            error => {
                console.log(error);
                this.alertService.error(error);
            });
    }
}