//Created By Alistair Dewar: 20/02/2018
//Here you will see how we make calls to the Auth provider.......

import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Auth } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';
 
@Component({
  selector: 'login-page',
  templateUrl: 'login.html'
})
export class LoginPage {
 
    email: string;
    password: string;
    loading: any;
 
    constructor(public navCtrl: NavController, public authService: Auth, public loadingCtrl: LoadingController) {
 
    }
 
    ionViewDidLoad() {
 
        this.showLoader();
 
        //Check if already authenticated
        //Here is the call to the Auth Provider ...... works on a success of failure basis as I 
        //guessed in my comment in the provider file i.e. No Token returns error....not authenticated...
        //Also note, this runs in an Ionic Method that runs on ViewDidLoad...i.e. Event bubbling on page loading.
        //there are lots of these event handlers and they are good places to stick code you want to run at certain points in the app
        //i.e. Before displaying, after displaying, to work out what to display etc...This one runs near the end of the stack..
        this.authService.checkAuthentication().then((res) => {
            console.log("Already authorized");
            this.loading.dismiss();
            this.navCtrl.setRoot(HomePage);
        }, (err) => {
            console.log("Not already authorized");
            this.loading.dismiss();
        });
 
    }
 
    login(){
 
        this.showLoader();
 
        //Build object to pass as parameter to provider...
        let credentials = {
            email: this.email,
            password: this.password
        };
 
        //Another call to the Auth provider....also handles response as success or error.
        //
        this.authService.login(credentials).then((result) => {
            this.loading.dismiss();
            console.log(result);
            this.navCtrl.setRoot(HomePage);
        }, (err) => {
            this.loading.dismiss();
            console.log(err);
        });
 
    }
 
    launchSignup(){
        this.navCtrl.push(SignupPage);
        console.log("Loading Signup Page.");
    }
 
    showLoader(){
 
        this.loading = this.loadingCtrl.create({
            content: 'Authenticating...'
        });
 
        this.loading.present();
 
    }
 
}