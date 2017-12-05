import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { User } from '../_models/user';
import 'rxjs'; 
@Injectable()
export class UserService {
    isDev:boolean;

    constructor(private http: Http) { 
        //this.isDev=false; //bij deployen
        this.isDev=true; //bij development
    }
 
    getAll() {
        return this.http.get(this.prepEndpoint('/user')).map((response: Response) => response.json());
    }
 
    getById(_id: string) {
        return this.http.get(this.prepEndpoint('/user/' + _id)).map((response: Response) => response.json());
    }
 
    create(user: User) {
        return this.http.post(this.prepEndpoint('/user/register'), user);
    }
 
    update(user: User) {
        return this.http.put(this.prepEndpoint('/user/' + user._id), user);
    }
 
    delete(_id: string) {
        return this.http.delete(this.prepEndpoint('/user/' + _id));
    }

    prepEndpoint(ep){
        if(this.isDev){
            return 'http://localhost:4000'+ep;
        } else {
          return 'https://projectwebappslouis.herokuapp.com'+ep;
        }
    }
}