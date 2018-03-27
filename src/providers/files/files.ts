import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Auth } from '../auth/auth';

import 'rxjs/add/operator/map';
 
const URL = "https://ionic2-qcf-auth.herokuapp.com/api/files";

@Injectable()
export class Files {
 
  


  constructor(public http: Http, public authService: Auth) {
    

  }
 
  getFiles(filename){
 
    return new Promise((resolve, reject) => {
 
      let headers = new Headers();
      headers.append('Authorization', this.authService.token);
 
      this.http.get('https://ionic2-qcf-auth.herokuapp.com/api/files/file/:' + filename, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
 
  }

  getAllFiles(){
    
       return new Promise((resolve, reject) => {
    
         let headers = new Headers();
         headers.append('Authorization', this.authService.token);
    
         this.http.get('https://ionic2-qcf-auth.herokuapp.com/api/files/getFiles', {headers: headers})
           .map(res => res.json())
           .subscribe(data => {
             resolve(data);
           }, (err) => {
             reject(err);
           });
       });
    
     }
 
  createFile(file){
  console.log("Creating File.");
  console.log(file);
    return new Promise((resolve, reject) => {
 
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.authService.token);
 
      this.http.post('https://ionic2-qcf-auth.herokuapp.com/api/files', file, {headers: headers})
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
 
    });
 
  }
 
  deleteFile(id){
 
    return new Promise((resolve, reject) => {
 
        let headers = new Headers();
        headers.append('Authorization', this.authService.token);
 
        this.http.delete('https://ionic2-qcf-auth.herokuapp.com/api/files/deleteFile/' + id, {headers: headers}).subscribe((res) => {
            resolve(res);
        }, (err) => {
            reject(err);
        });   
 
    });
 
  }

  uploadFiles(file){
       //post the form data to the url defined above and map the response. Then subscribe //to initiate the post. if you don't subscribe, angular wont post.
       //this.http.post(URL, formData, {headers:headers}).map((res:Response) => res.json()).subscribe(
        //map the success function and alert the response
        // (success) => {
        //         alert(success._body);
        //},
       // (error) => alert(error))



        /* console.log("Creating File.");
        console.log(file);
          return new Promise((resolve, reject) => {
       
              
       
            this.http.post('https://ionic2-qcf-auth.herokuapp.com/api/files', file)
              .map((res:Response) => res.json())
              .subscribe( //map the success function and alert the response
               (success) => {
                        alert(success._body);
               },
               (error) => alert(error))
       
          }); */
       

  }
 
}