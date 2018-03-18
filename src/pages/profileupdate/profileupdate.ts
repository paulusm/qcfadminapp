import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Auth } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { Users } from '../../providers/users/users';
import { Storage } from '@ionic/storage';

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
        public loadingCtrl: LoadingController, public usersService: Users, public storage: Storage) {
   
        this.storage.get('user').then((value) => {
                
                           
        //bind properties to logged on user profile...
        this.role = value["role"];
        this.email =  value["email"];
        this.department =  value["department"];
        this.companyid =  value["companyid"];
        this.forename =  value["forename"];
        this.surname =  value["surname"];
        this.imagepath =  value["imagepath"];
        this.displayname =  value["displayname"];
        });
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

          this.storage.get('user').then((value) => {
            //bind properties to logged on user profile...
            console.log("User Forename after Update:" + value["forename"]);
            this.role = value["role"];
            this.email =  value["email"];
            this.department =  value["department"];
            this.companyid =  value["companyid"];
            this.forename =  value["forename"];
            this.surname =  value["surname"];
            this.imagepath =  value["imagepath"];
            this.displayname =  value["displayname"];
            });


          this.navCtrl.setRoot(HomePage);
        }, (err) => {
            //this.loading.dismiss();
        });
    }
}