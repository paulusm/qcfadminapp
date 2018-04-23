/*
Class created by: Alistair Dewar
Date Created: Feb 2018
Purpose: Controller for Stories.
*/
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Auth } from '../auth/auth';
import 'rxjs/add/operator/map';
 
@Injectable()
export class Stories {
 
  constructor(public http: Http, public authService: Auth) {
 
  }
 
  getStories(){
 
    return new Promise((resolve, reject) => {
 
      let headers = new Headers();
      headers.append('Authorization', this.authService.token);
 
      this.http.get('https://ionic2-qcf-auth.herokuapp.com/api/stories/getStories', {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
 
  }

  getStoriesByCompanyId(companyid){
    
       return new Promise((resolve, reject) => {
    
         let headers = new Headers();
         headers.append('Authorization', this.authService.token);
    
         this.http.get('https://ionic2-qcf-auth.herokuapp.com/api/stories/getStoriesByCompanyId/' + companyid, {headers: headers})
           .map(res => res.json())
           .subscribe(data => {
             resolve(data);
           }, (err) => {
             reject(err);
           });
       });
    
     }

  getApprovedStories(companyid){
    
       return new Promise((resolve, reject) => {
    
         let headers = new Headers();
         headers.append('Authorization', this.authService.token);
    
         this.http.get('https://ionic2-qcf-auth.herokuapp.com/api/stories/getApprovedStories/' + companyid, {headers: headers})
           .map(res => res.json())
           .subscribe(data => {
             resolve(data);
           }, (err) => {
             reject(err);
           });
       });
    
     }

     getUnapprovedStories(companyid){
        
           return new Promise((resolve, reject) => {
        
             let headers = new Headers();
             headers.append('Authorization', this.authService.token);
        
             this.http.get('https://ionic2-qcf-auth.herokuapp.com/api/stories/getUnapprovedStories/' + companyid, {headers: headers})
               .map(res => res.json())
               .subscribe(data => {
                 resolve(data);
               }, (err) => {
                 reject(err);
               });
           });
        
         }
 
  createStory(story){
 
    return new Promise((resolve, reject) => {
 
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', this.authService.token);
 
      this.http.post('https://ionic2-qcf-auth.herokuapp.com/api/stories/createStory', JSON.stringify(story), {headers: headers})
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
 
    });
 
  }
 
  updateStory(story){
    
        console.log("Running updateStory");
        return new Promise((resolve, reject) => {
     
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Authorization', this.authService.token);
    
    
            this.http.post('https://ionic2-qcf-auth.herokuapp.com/api/stories/updateStory', JSON.stringify(story), {headers: headers})
              .subscribe(res => {
     
                let data = res.json();
                console.log(data);
                resolve(data);
     
              }, (err) => {
                reject(err);
              });
     
        });
     
      
    }

  deleteStory(id){
 
    return new Promise((resolve, reject) => {
 
        let headers = new Headers();
        headers.append('Authorization', this.authService.token);
 
        this.http.delete('https://ionic2-qcf-auth.herokuapp.com/api/stories/deleteStory/' + id, {headers: headers}).subscribe((res) => {
            resolve(res);
        }, (err) => {
            reject(err);
        });   
 
    });
 
  }
 
}