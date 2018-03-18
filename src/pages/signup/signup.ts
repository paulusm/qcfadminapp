import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Auth } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
 
@Component({
  selector: 'signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
 
  role: string;
  email: string;
  password: string;
  department: string;
  companyid: string;
  forename: string;
  surname: string;
  imagepath: string;
  isfirstlogin: 'true';
  displayname: string;
  loading: any;

  constructor(public navCtrl: NavController, public authService: Auth, public loadingCtrl: LoadingController) {
 
  }
 
  register(){
 
    console.log("Running Register");
    this.showLoader();
 
 
    let details = {
        email: this.email,
        password: this.password,
        role: this.role,
        forename: this.forename,
        surname: this.surname,
        displayname: this.displayname,
        companyid: this.companyid,
        imagepath:this.imagepath,
        department:this.department
    };
    console.log(details);
    this.authService.createAccount(details).then((result) => {
      this.loading.dismiss();
      console.log(result);
      this.navCtrl.setRoot(HomePage);
    }, (err) => {
        this.loading.dismiss();
    });
 
  }
 
  showLoader(){
 
    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });
 
    this.loading.present();
 
  }
 
}
