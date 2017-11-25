import { Component, OnInit } from '@angular/core';
import { UserService} from '../_services/user.service';
import { User } from '../_models/user';
import { error } from 'util';
@Component({
    selector: 'app-loginpage',
    moduleId: module.id,
    templateUrl: 'loginpage.component.html'
})
export class LoginpageComponent implements OnInit { 
    constructor(private userService:UserService){
    }
    ngOnInit(){
       
    }
}