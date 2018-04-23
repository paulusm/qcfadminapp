/*
Class created by: Alistair Dewar
Date Created: Feb 2018
Purpose: Users controller.
*/
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Auth } from '../auth/auth';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
 
@Injectable()
export class Users {

    public role: any;
    public user: any;

  constructor(public http: Http, public authService: Auth, public storage: Storage) {
 
  }


  updateProfile(details){
    
       console.log("Running updateProfile");
       return new Promise((resolve, reject) => {
    
           let headers = new Headers();
           headers.append('Content-Type', 'application/json');
           headers.append('Authorization', this.authService.token);


           this.http.post('https://ionic2-qcf-auth.herokuapp.com/api/users/updateprofile', JSON.stringify(details), {headers: headers})
             .subscribe(res => {
    
               let data = res.json();
               //this.token = data.token;
               this.role = data.user["role"];
               this.user = data.user;
               this.authService.user = data.user;
               console.log("Role - " + this.role)
               //this.storage.set('token', data.token);
               this.storage.set('role', data.user["role"]);
               this.storage.set('user', data.user);
               
               resolve(data);
    
             }, (err) => {
               reject(err);
             });
    
       });
    
     }

     getUsersByCompanyId(companyid){

      return new Promise((resolve, reject) => {
        
             let headers = new Headers();
             headers.append('Authorization', this.authService.token);
        
             this.http.get('https://ionic2-qcf-auth.herokuapp.com/api/users/getUsersByCompanyId/'+companyid, {headers: headers})
               .map(res => res.json())
               .subscribe(data => {
                 resolve(data);
               }, (err) => {
                 reject(err);
               });
           });
     }

     deleteUser(id){
      
         return new Promise((resolve, reject) => {
      
             let headers = new Headers();
             headers.append('Authorization', this.authService.token);
      
             this.http.delete('https://ionic2-qcf-auth.herokuapp.com/api/users/deleteUser/' + id, {headers: headers}).subscribe((res) => {
                 resolve(res);
             }, (err) => {
                 reject(err);
             });   
      
         });
      
       }
}
 