import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Auth } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { Users } from '../../providers/users/users'

@Component({
    selector: 'profileupdate',
    templateUrl: 'profileupdate.html'
  })
  export class ProfileUpdatePage {
   
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
    user:any;
  
    constructor(public navCtrl: NavController, public authService: Auth, 
        public loadingCtrl: LoadingController, public usersService: Users) {
   
        //bind properties to logged on user profile...
        this.role = this.authService.user["role"];
        this.email = this.authService.user["email"];
        this.department = this.authService.user["department"];
        this.companyid = this.authService.user["companyid"];
        this.forename = this.authService.user["forename"];
        this.surname = this.authService.user["surname"];
        this.imagepath = this.authService.user["imagepath"];
        this.displayname = this.authService.user["displayname"];

    }

    updateprofile(){

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
        this.usersService.updateProfile(details).then((result) => {
          //this.loading.dismiss();
          console.log(result);
          this.navCtrl.setRoot(HomePage);
        }, (err) => {
            //this.loading.dismiss();
        });
    }
}