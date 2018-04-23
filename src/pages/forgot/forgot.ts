/*
Class created by: Alistair Dewar
Date Created: Feb 2018
Purpose: Forgot password view..
*/
import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams } from 'ionic-angular';
import { Auth } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';
import { ResetPage } from '../reset/reset';
import { LoginPage } from '../login/login';

@Component({
  selector: 'forgot-page',
  templateUrl: 'forgot.html'
})
export class ForgotPage {
 
    email: string;
    password: string;
    loading: any;
    confirm:string;
    newpassword:string;
    contactemail:string;

 
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

    //User has clicked reset having input email address
    reset(){

    }
 
    
    forgot(){
        let lcoontactemail = {
            email:this.contactemail
        }
        this.authService.forgot(lcoontactemail).then((result) => {
            //this.loading.dismiss();
            console.log('Result from server' + result);
            this.navCtrl.push(ResetPage);
            //this.navCtrl.setRoot(HomePage);
        }, (err) => {
            //this.loading.dismiss();
            console.log(err);
        });
    }

    logout(){
        
           this.authService.logout();
           this.navCtrl.setRoot(LoginPage);
        
         }

         
}