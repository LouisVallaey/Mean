import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { AlertService } from '../_services/alert.service';
import { PackageService } from '../_services/package.service';
import { Package } from '../_models/package';
import { NgxPermissionsService } from 'ngx-permissions';
import { DashboardService } from '../_services/dashboard.service';
@Component({
    selector: 'app-driverpage',
    moduleId: module.id,
    templateUrl: 'driverpage.component.html'
})
export class DriverpageComponent implements OnInit {
    currentUser: User;
    activecount: number = 0;
    availablecount: number = 0;
    deliveredcount: number = 0;
    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService,
        private packageService: PackageService,
        private dashboardService: DashboardService
    ) { }
    ngOnInit() {
        this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
        this.setCounterPage();
    }

    setActivePage(){
        this.dashboardService.setActivePage();
    }
    setAvailablePage(){
        this.dashboardService.setAvailablePage();
    }
    setDeliveredPage(){
        this.dashboardService.setDeliveredPage();
    }
    setCounterPage(){
        this.dashboardService.setCounterPage();
    }

}