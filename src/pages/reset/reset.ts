import { Component } from '@angular/core';
/*
Class created by: Alistair Dewar
Date Created: Feb 2018
Purpose: Reset password manager.
*/
import { NavController, LoadingController, NavParams } from 'ionic-angular';
import { Auth } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';
import { LoginPage } from '../login/login';

@Component({
    selector: 'reset-page',
    templateUrl: 'reset.html'
  })
  export class ResetPage {
   
      email: string;
      loading: any;
      code:string;
      newpassword:string;
      contactemail:string;
      errortext:string;
  
      constructor(public navCtrl: NavController, public authService: Auth, 
        public loadingCtrl: LoadingController, public navParams:NavParams) {
            this.email = this.navParams.get('email');
    }

    showLoader(){
        
               this.loading = this.loadingCtrl.create({
                   content: 'Authenticating...'
               });
        
               this.loading.present();
        
           }

    submitreset(){

        var credentials
        
        this.authService.resetpassword(this.newpassword, this.code).then((result) => {
            //this.loading.dismiss();
            console.log('Result from server: ' + result);
            if(JSON.stringify(result).indexOf('Password reset token is invalid or has expired') !== -1)
            {
                 this.errortext = JSON.stringify(result);
            }else{
                 this.navCtrl.push(HomePage);
            }
            
            //this.navCtrl.setRoot(HomePage);
        }, (err) => {
            //this.loading.dismiss();
            console.log(err);
            this.errortext = err;
        });
    }
                    

}
