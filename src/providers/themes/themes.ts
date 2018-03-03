//Created By AListair Dewar: 20/02/2018
//Type definition for CauseItem collection and all behaviours...

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
 
      this.http.get('https://ionic2-qcf-auth.herokuapp.com/api/themes', {headers: headers})
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

         console.log(JSON.stringify(theme));

         this.http.post('https://ionic2-qcf-auth.herokuapp.com/api/themes', JSON.stringify(theme), {headers: headers})
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
        
               this.http.delete('https://ionic2-qcf-auth.herokuapp.com/api/themes/' + id, {headers: headers}).subscribe((res) => {
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