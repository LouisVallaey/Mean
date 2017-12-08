import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockBackend } from '@angular/http/testing';
import { AuthenticationService } from '../_services/authentication.service';
import { UserService } from '../_services/user.service';
import { NgxPermissionsModule } from 'ngx-permissions';

import {
  HttpModule,
  Http,
  Response,
  ResponseOptions,
  XHRBackend,
} from '@angular/http';
describe("Authentication service: logout/login", () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule,
                NgxPermissionsModule.forRoot(),
                
            ],
            providers: [
              AuthenticationService,
              UserService,
              { provide: XHRBackend, useClass: MockBackend },
            ]
          })
    });

     it("wrong login should not save user and token in sessionStorage", inject([AuthenticationService, XHRBackend], (authService, mockBackend) => {
        let response = {
            "email" : "mailtest@gmail.com",
            "password" : "tpw",
            "roles": "DRIVER"
        };

        // returns the fake response when we subscribe to a connection with the backend
        mockBackend.connections.subscribe(connection => {
            connection.mockRespond(new Response( <ResponseOptions> {
                body: JSON.stringify(response)
            }));
        });

        // clearing the localStorage for testing purposes 
        sessionStorage.clear();
        authService.login("mailtest@gmail.com","tpw").subscribe(
            data => {
                expect(sessionStorage.length).toBe(0);
            }
        );
    })); 
    it("login should save user and token in sessionStorage", inject([AuthenticationService, XHRBackend], (authService, mockBackend) => {
        let response = {
            email : "mailtest@gmail.com",
            password : "tpw",
            token: "LPYiopoggytuHG",
            roles: "DRIVER"
        };

        // returns the fake response when we subscribe to a connection with the backend
        mockBackend.connections.subscribe(connection => {
            connection.mockRespond(new Response( <ResponseOptions> {
                body: JSON.stringify(response)
            }));
        });

        // clearing the localStorage for testing purposes 
        sessionStorage.clear();
        authService.login("mailtest@gmail.com","tpw").subscribe(
            data => {
                expect(sessionStorage.length).toBe(2);
                expect(JSON.parse(sessionStorage.getItem("currentUser"))).toEqual(response);
                sessionStorage.clear();
            }
        );
    })); 

     it("logout should clear the localStorage", inject([AuthenticationService, XHRBackend], (authService, mockBackend) => {
        let fakeUser = {
            email : "mailtest@gmail.com",
            password : "tpw",
            token: "LPYiopoggytuHG",
            roles: "DRIVER",
        };

        // Clear the localStorage first and set a new item afterwards for testing purposes
        sessionStorage.clear();
        sessionStorage.setItem('currentUser', JSON.stringify(fakeUser));
        authService.logout();

        expect(sessionStorage.length).toBe(0);
    }));
})