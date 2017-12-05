import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { AlertService } from '../_services/alert.service';
import { PackageService } from '../_services/package.service';
import { Package } from '../_models/package';
import { NgxPermissionsService } from 'ngx-permissions';
import { slideRightLeftAnimation } from '../_animations/slide-right-left.animation';
@Component({
    selector: 'app-driverpage',
    moduleId: module.id,
    templateUrl: 'driverpage.component.html',
    animations: [slideRightLeftAnimation],
        host: { '[@slideRightLeftAnimation]': '' }
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
        private packageService: PackageService
    ) { }
    ngOnInit() {
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