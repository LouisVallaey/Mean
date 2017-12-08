import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Package } from '../_models/package';
import 'rxjs'; 
@Injectable()
export class  PackageService {
    isDev:boolean;
    constructor(private http: Http) { 
        this.isDev=false; //bij deployen
        //this.isDev=true; //bij development
    }
 
    getAll() {
        return this.http.get(this.prepEndpoint('/package/')).map((response: Response) => response.json());
    }
 
    create(_package: Package) {
        return this.http.post(this.prepEndpoint('/package/add'), _package);
    }
 
    update(_package: Package) {
        return this.http.put(this.prepEndpoint('/package/' + _package._id), _package);
    }
 
    delete(_id: string) {
        return this.http.delete(this.prepEndpoint('/package/' + _id));
    }

    prepEndpoint(ep){
        if(this.isDev){
            return 'http://localhost:4000'+ep;
        } else {
          return 'https://projectwebappslouis.herokuapp.com'+ep;
        }
    }
}