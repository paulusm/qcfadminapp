/*
Class created by: Alistair Dewar
Date Created: Feb 2018
Purpose: Pending.
*/
import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams } from 'ionic-angular';
import { Auth } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';
import { LoginPage } from '../login/login';

@Component({
    selector: 'faq-page',
    templateUrl: 'faq.html'
  })

  export class FAQUpdatePage {
   
      
      loading: any;
      
  
      constructor(public navCtrl: NavController, public authService: Auth, 
        public loadingCtrl: LoadingController, public navParams:NavParams) {
            
    }

    showLoader(){
        
               this.loading = this.loadingCtrl.create({
                   content: 'Authenticating...'
               });
        
               this.loading.present();
        
    }

    logout(){
    
        this.authService.logout();
        this.navCtrl.setRoot(LoginPage);
    
        }
                    

}
