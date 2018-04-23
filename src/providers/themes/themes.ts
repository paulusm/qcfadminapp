//Created By AListair Dewar: 20/02/2018
//Type definition for Themes collection and all behaviours...

import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Auth } from '../auth/auth';
import 'rxjs/add/operator/map';
 
@Injectable()
export class Themes {
 
  constructor(public http: Http, public authService: Auth) {
 
  }
 
  getThemes(){
 
    return new Promise((resolve, reject) => {
 
      let headers = new Headers();
      headers.append('Authorization', this.authService.token);
 
      this.http.get('https://ionic2-qcf-auth.herokuapp.com/api/themes/getThemes', {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
 
  }

  getThemeByID(id){
    
        return new Promise((resolve, reject) => {
            
                 let headers = new Headers();
                 headers.append('Authorization', this.authService.token);
            
                 this.http.get('https://ionic2-qcf-auth.herokuapp.com/api/themes/getThemeByID/' + id, {headers: headers})
                   .map(res => res.json())
                   .subscribe(data => {
                     resolve(data);
                   }, (err) => {
                     reject(err);
                   });
               });
    }

  createTheme(theme){
    
       return new Promise((resolve, reject) => {
        console.log("Create Theme Running");

         let headers = new Headers();
         headers.append('Content-Type', 'application/json');
         headers.append('Authorization', this.authService.token);
         var strtheme = JSON.stringify(theme).replace(/"area":/g,'');

         strtheme = strtheme.replace("[{", "[");
         strtheme = strtheme.replace(/},{/g, ",");
         strtheme = strtheme.replace(/}]/g, "]");

         strtheme = strtheme.replace(/\\n/g, "\\n")
         strtheme = strtheme.replace(/\\n/g, "\\n")
         strtheme = strtheme.replace(/\\n/g, "\\n")  
         .replace(/\\'/g, "\\'")
         .replace(/\\"/g, '\\"')
         .replace(/\\&/g, "\\&")
         .replace(/\\r/g, "\\r")
         .replace(/\\t/g, "\\t")
         .replace(/\\b/g, "\\b")
         .replace(/\\f/g, "\\f");
          // remove non-printable and other non-valid JSON chars
          strtheme = strtheme.replace(/[\u0000-\u0019]+/g,""); 
         console.log(strtheme);
        
         this.http.post('https://ionic2-qcf-auth.herokuapp.com/api/themes/createTheme', strtheme, {headers: headers})
           .map(res => res.json())
           .subscribe(res => {
             console.log("Saved");
             resolve(res);
           }, (err) => {
             console.log("Error");
             reject(err);
           });
    
       });
    
     }
     
     deleteTheme(id){
        
           return new Promise((resolve, reject) => {
        
               let headers = new Headers();
               headers.append('Authorization', this.authService.token);
              console.log(id);
               this.http.delete('https://ionic2-qcf-auth.herokuapp.com/api/themes/deleteTheme/' + id, {headers: headers}).subscribe((res) => {
                   resolve(res);
               }, (err) => {
                   reject(err);
               });   
        
           });
        
         }


CheckDataValid(value):boolean {
    console.log("Value was:" + value);
    if(value !== null){
        return true;

    }else{
        return false;
    }
}

}