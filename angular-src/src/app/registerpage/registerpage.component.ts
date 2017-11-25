import { Component, OnInit } from '@angular/core';
import {User} from '../_models/user';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import {AlertService} from '../_services/alert.service';
@Component({
    selector: 'app-registerpage',
    moduleId: module.id,
    templateUrl: 'registerpage.component.html'
})
export class RegisterpageComponent {
    model:User = new User("","","","",""); 
    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { 
        }

    register() {
        if (this.model.password === this.model.confirmPassword){
            console.log(this.model);
            this.model.username = this.model.email;
            this.userService.create(this.model)
                .subscribe(
                    data => {
                        this.alertService.success('Registration successful', true);
                        this.router.navigate(['/login']);
                    },
                    error => {
                        this.alertService.error(error);
                    });
        }
    }
}