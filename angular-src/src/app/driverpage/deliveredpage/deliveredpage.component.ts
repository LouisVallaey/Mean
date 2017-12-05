import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { Router } from '@angular/router';
import { UserService } from '../../_services/user.service';
import { AlertService } from '../../_services/alert.service';
import { PackageService } from '../../_services/package.service';
import { Package } from '../../_models/package';
import { NgxPermissionsService } from 'ngx-permissions';
@Component({
    selector: 'app-deliveredpage',
    moduleId: module.id,
    templateUrl: 'deliveredpage.component.html'
})
export class DeliveredpageComponent implements OnInit {
    currentUser: User;
    deliveredPackages: Package[] = [];
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
                    if (element._userId == "" && element._driverId == this.currentUser._id) {
                        this.deliveredPackages.push(element);
                    }
                });
            },
            error => {
                this.alertService.error(error);
            });
    }
}