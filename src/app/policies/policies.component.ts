﻿import { Component, OnInit } from '@angular/core';
import { PoliciesService } from './policies.service';  
import { User } from '../_models/index';
import { UserService } from '../_services/index';
import { Observable } from 'rxjs/Rx';
import { Policies } from './policies';  
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
    moduleId: module.id.toString(),
    selector: 'policies.component',  
    templateUrl: 'policies.component.html',
    providers: [PoliciesService]  
})

export class PoliciesComponent implements OnInit { 
    policies: Observable<Policies[]>;
   policy: Policies;
   errorMessage: String;
   dataAvailableById= true;
  //  policies: Observable<any[]>;
    currentUser: User;
        users: User[] = [];  
    cust_code :String;

    constructor(
       private router: Router,
        private _policiesService: PoliciesService,
        private userService: UserService) 
        {
            this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
            this.cust_code=localStorage.getItem('cust_code')
         }
      
       
         ngOnInit() {  
            this.loadAllUsers();  
            this.getPolicies()
            }
            getPolicies() {  
                debugger  
                console.log('this.currentUser',this.currentUser);
                this.policies = this._policiesService.getPolicies(this.currentUser.cust_code);  
                } 
                private loadAllUsers() {
                    this.userService.getAll().subscribe(users => { this.users = users; });
                } 

             *  getPolicyById(client_number: string) {
                   this.dataAvailableById= true;
                this.policy = null;
                    this._policiesService.getPolicyById(client_number)
                    .subscribe(
                            data => {  
                            if(data.length > 0) {
                          this.policy= data[0]; 
                        } else {
                        this.dataAvailableById= false; 
                        }	
                        },
                            error =>  this.errorMessage = <any>error
                     );     
               }

             policyById(policyByIdForm: NgForm) {
                let client_number= policyByIdForm.controls['policyId'].value;
                this.getPolicyById(client_number);
              } 
  }  
