import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { Router } from '@angular/router';
import { UserService } from '../../_services/user.service';
import { AlertService } from '../../_services/alert.service';
import { PackageService } from '../../_services/package.service';
import { Package } from '../../_models/package';
import { NgxPermissionsService } from 'ngx-permissions';
@Component({
    selector: 'app-activepage',
    moduleId: module.id,
    templateUrl: 'activepage.component.html'
})
export class ActivepageComponent implements OnInit {
    currentUser: User;
    activePackages: Package[] = [];
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
                        this.activePackages.push(element);
                    }
                });
            },
            error => {
                this.alertService.error(error);
            });
    }
}