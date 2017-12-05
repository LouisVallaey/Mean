import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { AlertService } from '../_services/alert.service';
import { PackageService } from '../_services/package.service';
import { Package } from '../_models/package';
import { NgxPermissionsService } from 'ngx-permissions';
@Component({
    selector: 'app-listingpageUser',
    moduleId: module.id,
    templateUrl: 'listingpageUser.component.html'
})
export class ListingpageUserComponent implements OnInit {
    add: boolean = false;
    model: any = {};
    currentUser: User;
    packages: Package[];
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
                   if (element._userId == this.currentUser._id){
                    if (this.packages === undefined) this.packages = [];
                    this.packages.push(element);
                   }
               });
            },
            error => {
                this.alertService.error(error);
            });  
    }
    showAddPackage(show: boolean) {
        this.add = show;
    }
    addPackage() {
        this.model._driverId = "";
        this.model._userId = this.currentUser._id;
        this.model.status = "package pickup by driver";
        this.packageService.create(this.model).subscribe(
            data => {
                this.add = false;
                this.alertService.success('Package added', true);
                if (this.packages === undefined) this.packages = [];
                let newPackage = new Package();
                newPackage._id= this.model._id;
                newPackage._userId = this.model._userId;
                newPackage._driverId = this.model._driverId;
                newPackage.addressline1 = this.model.addressline1;
                newPackage. addressline2 = this.model.addressline2;
                newPackage.city = this.model.city;
                newPackage.postalcode = this.model.postalcode;
                newPackage.country = this.model.country;
                newPackage.nameRec = this.model.nameRec;
                newPackage.addressline1Rec = this.model.addressline1Rec;
                newPackage.addressline2Rec= this.model.addressline2Rec;
                newPackage.cityRec = this.model.cityRec;
                newPackage.postalcodeRec = this.model.postalcodeRec;
                newPackage.countryRec = this.model.countryRec;
                newPackage.weight = this.model.weight;
                newPackage.status = this.model.status;
                this.packages.push(newPackage);
                this.model = {};
            },
            error => {
                this.alertService.error(error);
            });
    }
    
}