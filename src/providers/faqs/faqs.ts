/*
Class created by: Alistair Dewar
Date Created: Feb 2018
Purpose: Controller for FAQs. Not used in Admin app yet.
*/
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Auth } from '../auth/auth';
import 'rxjs/add/operator/map';
 
@Injectable()
export class Faqs {
 
  constructor(public http: Http, public authService: Auth) {
 
  }
 
  getFaqs(){
 
    return new Promise((resolve, reject) => {
 
      let headers = new Headers();
      headers.append('Authorization', this.authService.token);
 
      this.http.get('https://ionic2-qcf-auth.herokuapp.com/api/faqs/getFaqd', {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
 
  }

  

    
 
  createFaq(faq){
 
    return new Promise((resolve, reject) => {
 
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', this.authService.token);
 
      this.http.post('https://ionic2-qcf-auth.herokuapp.com/api/faqs/createFaq', JSON.stringify(faq), {headers: headers})
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
 
    });
 
  }
 
  updateFaq(faq){
    
        console.log("Running updateFaq");
        return new Promise((resolve, reject) => {
     
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Authorization', this.authService.token);
    
    
            this.http.post('https://ionic2-qcf-auth.herokuapp.com/api/faqs/updateFaq', JSON.stringify(faq), {headers: headers})
              .subscribe(res => {
     
                let data = res.json();
                console.log(data);
                resolve(data);
     
              }, (err) => {
                reject(err);
              });
     
        });
     
      
    }

  deleteFaq(id){
 
    return new Promise((resolve, reject) => {
 
        let headers = new Headers();
        headers.append('Authorization', this.authService.token);
 
        this.http.delete('https://ionic2-qcf-auth.herokuapp.com/api/faqs/deleteFaq/' + id, {headers: headers}).subscribe((res) => {
            resolve(res);
        }, (err) => {
            reject(err);
        });   
 
    });
 
  }
 
}