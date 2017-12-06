import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
 
//injectable
//kan in alle components gezet worden om succes/error bootschappen te tonen
@Injectable()
export class DashboardService {
    private activePage = new Subject<any>();
    private availablePage = new Subject<any>();
    private counterPage = new Subject<any>();
    private deliveredPage = new Subject<any>();

 
    constructor() {
        
    }
 
    //onderstaande 2 methoden hebben invloed op de css
    //succes message tonen
    setActivePage(){
        this.activePage.next(true);
        this.availablePage.next(false);
        this.counterPage.next(false);
        this.deliveredPage.next(false);
    }
    setAvailablePage(){
        this.activePage.next(false);
        this.availablePage.next(true);
        this.counterPage.next(false);
        this.deliveredPage.next(false);
    }
    setCounterPage(){
        this.activePage.next(false);
        this.availablePage.next(false);
        this.counterPage.next(true);
        this.deliveredPage.next(false);
    }
    setDeliveredPage(){
        this.activePage.next(false);
        this.availablePage.next(false);
        this.counterPage.next(false);
        this.deliveredPage.next(true);
    }
 
    getActivePage(): Observable<any> {
        return this.activePage.asObservable();
    }
    getAvailablePage(): Observable<any> {
        return this.availablePage.asObservable();
    }
    getDeliveredPage(): Observable<any> {
        return this.deliveredPage.asObservable();
    }
    getCounterPage(): Observable<any> {
        return this.counterPage.asObservable();
    }
}