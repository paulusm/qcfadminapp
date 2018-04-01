//Created By: Alistair Dewar : 20/02/2018
//Important file...this type is the provider for the whole application to do Authentication related stuff
//We will ned new methods for.....
//..Initial Login....as we need to return a value that prompts for new password...so a method
//that checks for original password state
//..Registering batches of users
//..Registering users without signing in as them...
//..etc

import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
 
//New class Auth...
@Injectable()
export class Auth {
 
  public token: any;
  public role: any;
  public user: any;
 
  //Class constructor
  constructor(public http: Http, public storage: Storage) {
 
  }
 
  //Checks is=f user is already authenticated with a valid token...
  //If token exists get the data in the response...i.e. Name, Email, Token, Role etc..i.e. Returns a User object
  //If not I think it returns an error....
  checkAuthentication(){
 
    return new Promise((resolve, reject) => {
 
        //Load token if exists
        this.storage.get('token').then((value) => {
 
            this.token = value;
 
            let headers = new Headers();
            headers.append('Authorization', this.token);
 
            this.http.get('https://ionic2-qcf-auth.herokuapp.com/api/auth/protected', {headers: headers})
                .subscribe(res => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
 
        });        
 
    });
 
  }
 

  //If we are authenticated, we have a user object in storage...now we can check role locally....
  checkRole(){
    
       return new Promise((resolve, reject) => {
    
           //Load token if exists
           this.storage.get('role').then((value) => {
    
               this.role = value;
              resolve(value);
           }, (err) => {
            console.log("Not already authorized");
            reject(err);        
           });
       });
    
     }


getUser(){
  return new Promise((resolve, reject) => {
    
           //Load token if exists
           this.storage.get('user').then((value) => {
    
               this.user = value;
              resolve(value);
           }, (err) => {
            console.log("Not already authorized");
            reject(err);        
           });
       });
}

  createAccount(details){
 
    console.log("Running createAccount");
    return new Promise((resolve, reject) => {
 
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
 
        this.http.post('https://ionic2-qcf-auth.herokuapp.com/api/auth/register', JSON.stringify(details), {headers: headers})
          .subscribe(res => {
 
            let data = res.json();
            //this.token = data.token;
            //this.role = data.user["role"];
            //this.user = data.user;
            console.log("Role - " + this.role)
            //this.storage.set('token', data.token);
            //this.storage.set('role', data.user["role"]);
            //this.storage.set('user',data.user);
            resolve(data);
 
          }, (err) => {
            reject(err);
          });
 
    });
 
  }
 
  login(credentials){
 
    return new Promise((resolve, reject) => {
 
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
 
        this.http.post('https://ionic2-qcf-auth.herokuapp.com/api/auth/login', JSON.stringify(credentials), {headers: headers})
          .subscribe(res => {
 
            let data = res.json();
            this.token = data.token;
            this.role = data.user["role"];
            this.user = data.user;
            console.log("Role - " + this.role)
            this.storage.set('token', data.token);
            this.storage.set('role', data.user["role"]);
            this.storage.set('user',data.user);
            resolve(data);
 
            resolve(res.json());
          }, (err) => {
            reject(err);
          });
 
    });
 
  }
 

  loginchangepassword(credentials){
    
    console.log("Running loginchangepassword service");
       return new Promise((resolve, reject) => {
    
           let headers = new Headers();
           headers.append('Content-Type', 'application/json');
           //headers.append('Authorization', this.token);
    
           this.http.post('https://ionic2-qcf-auth.herokuapp.com/api/auth/changepassword', JSON.stringify(credentials), {headers: headers})
             .subscribe(res => {
    
               let data = res.json();
               this.token = data.token;
               this.role = data.user["role"];
               console.log("Role - " + this.role)
               this.storage.set('token', data.token);
               this.storage.set('role', data.user["role"]);
               resolve(data);
    
               resolve(res.json());
             }, (err) => {
               console.log("Error in Change Password");
               reject(err);
             });
    
       });
    
     }

  //First call for reset that gereates email with token for reset....
  forgot(email){
    return new Promise((resolve, reject) => {
      
             let headers = new Headers();
             headers.append('Content-Type', 'application/json');

             console.log(JSON.stringify(email));

             this.http.post('https://ionic2-qcf-auth.herokuapp.com/api/auth/forgot', JSON.stringify(email), {headers: headers})
               .subscribe(res => {
      
                 let data = res.json();
                 //this.token = data.token;
                 //this.role = data.user["role"];
                 console.log("Called forgot service")
                 //this.storage.set('token', data.token);
                 //this.storage.set('role', data.user["role"]);
                 resolve(data);
      
               }, (err) => {
                //console.warn(jqxhr.responseText)
                 reject(err);
               });
      
         });
  }

  logout(){
    this.storage.set('token', '');
  }
 

  resetpassword(newpassword, token){

    let credentials = {
      newpassword: newpassword,
      token: token
    };

    return new Promise((resolve, reject) => {
      
             let headers = new Headers();
             headers.append('Content-Type', 'application/json');

             console.log(JSON.stringify(credentials));

             this.http.post('https://ionic2-qcf-auth.herokuapp.com/api/auth/resetchg', JSON.stringify(credentials), {headers: headers})
               .subscribe(res => {
      
                 let data = res.json();
                 //this.token = data.token;
                 //this.role = data.user["role"];
                 console.log("Called resetchange service")
                 //this.storage.set('token', data.token);
                 //this.storage.set('role', data.user["role"]);
                 resolve(data);
      
               }, (err) => {
                //console.warn(jqxhr.responseText)
                 reject(err);
               });
      
         });
  }

  changePassword(){

  }

  firstLogin(){

  }
}