/*
Class created by: Alistair Dewar
Date Created: Feb 2018
Purpose: Controller for activities.
*/
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Auth } from '../auth/auth';
import 'rxjs/add/operator/map';
 
@Injectable()
export class Activities {
 
  constructor(public http: Http, public authService: Auth) {
 
  }
 
  getActivities(){
 
    return new Promise((resolve, reject) => {
 
      let headers = new Headers();
      headers.append('Authorization', this.authService.token);
 
      this.http.get('https://ionic2-qcf-auth.herokuapp.com/api/activities/getActivities', {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
 
  }
 
  getActivitiesUnapproved(id){
    
       return new Promise((resolve, reject) => {
    
         let headers = new Headers();
         headers.append('Authorization', this.authService.token);
    
         this.http.get('https://ionic2-qcf-auth.herokuapp.com/api/activities/getActivitiesUnapproved/'+id, {headers: headers})
           .map(res => res.json())
           .subscribe(data => {
             resolve(data);
           }, (err) => {
             reject(err);
           });
       });
    
     }

     getFutureActivitiesApprovedByCompanyID(id){
      
         return new Promise((resolve, reject) => {
      
           let headers = new Headers();
           headers.append('Authorization', this.authService.token);
      
           this.http.get('https://ionic2-qcf-auth.herokuapp.com/api/activities/getFutureActivitiesApprovedByCompanyID/'+id, {headers: headers})
             .map(res => res.json())
             .subscribe(data => {
               resolve(data);
             }, (err) => {
               reject(err);
             });
         });
      
       }


       getActivityByOwnerID(id){
        
           return new Promise((resolve, reject) => {
        
             let headers = new Headers();
             headers.append('Authorization', this.authService.token);
        
             this.http.get('https://ionic2-qcf-auth.herokuapp.com/api/activities/getActivityByOwnerID/'+id, {headers: headers})
               .map(res => res.json())
               .subscribe(data => {
                 resolve(data);
               }, (err) => {
                 reject(err);
               });
           });
        
         }

  createActivity(activity){
 
    return new Promise((resolve, reject) => {
 
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', this.authService.token);
 
      this.http.post('https://ionic2-qcf-auth.herokuapp.com/api/activities/createActivity', JSON.stringify(activity), {headers: headers})
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
 
    });
 
  }
 
  updateActivity(activity){
    
        console.log("Running updateActivity");
        return new Promise((resolve, reject) => {
     
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Authorization', this.authService.token);
    
    
            this.http.post('https://ionic2-qcf-auth.herokuapp.com/api/activities/updateActivity', JSON.stringify(activity), {headers: headers})
              .subscribe(res => {
     
                let data = res.json();
               
                console.log(data);
                resolve(data);
     
              }, (err) => {
                reject(err);
              });
     
        });
     
      
    }

    updateActivityAsEmployee(activity){
      
          console.log("Running updateActivity");
          return new Promise((resolve, reject) => {
       
              let headers = new Headers();
              headers.append('Content-Type', 'application/json');
              headers.append('Authorization', this.authService.token);
      
      
              this.http.post('https://ionic2-qcf-auth.herokuapp.com/api/activities/updateActivityAsEmployee', JSON.stringify(activity), {headers: headers})
                .subscribe(res => {
       
                  let data = res.json();
                 
                  console.log(data);
                  resolve(data);
       
                }, (err) => {
                  reject(err);
                });
       
          });
       
        
      }
  

  deleteActivity(id){
 
    return new Promise((resolve, reject) => {
 
        let headers = new Headers();
        headers.append('Authorization', this.authService.token);
 
        this.http.delete('https://ionic2-qcf-auth.herokuapp.com/api/activities/deleteActivity/' + id, {headers: headers}).subscribe((res) => {
            resolve(res);
        }, (err) => {
            reject(err);
        });   
 
    });
 
  }
 
}