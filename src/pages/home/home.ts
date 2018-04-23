/*
Class created by: Alistair Dewar
Date Created: Feb 2018
Purpose: home page and navigation.
*/
import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Auth } from '../../providers/auth/auth';
import { Files} from '../../providers/files/files';
import { LoginPage } from '../login/login';
import { FAQUpdatePage } from '../faq/faq';
import { CompanyAdmin } from '../companyadmin/companyadmin';
import { SignupPage } from '../signup/signup';
import { ArticlesAdmin } from '../articlesadmin/articlesadmin';
import { ActivitiesAdmin } from '../activitiesadmin/activitiesadmin';
import { StoriesAdmin } from '../storiesadmin/storiesadmin';
import { ThemesAdminComponent } from '../themesadmin/themesadmin';
import { ProfileUpdatePage } from '../profileupdate/profileupdate';
//const URL = "https://ionic2-qcf-auth.herokuapp.com/api/files/upload";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {
  loading: any;
  files:any;
  galleryType = 'pinterest';
  user:any;
  forename:any;
  surname:any;
  role:any;
  //img1:string = "https://ionic2-qcf-auth.herokuapp.com/api/files/file/" file-1519663015207.jpg

  constructor(public navCtrl: NavController, public authService: Auth,
    public loadingCtrl:LoadingController, public filesService: Files) {
 //get all companies and bind to select drop down
  /* this.filesService.getAllFiles().then((data) => {
    console.log(data);
    this.files = data;
    
    //this.loadDataList();
  },(err) => {
    console.log("not allowed");
  }); */
  
 }

  
 ngOnInit(){
   
  this.authService.getUser().then((data) => {
    //console.log("User Data:" + data);
    console.log(data);
    //this.user = data;
    this.user = data;
    this.forename = this.user.forename;
    this.surname = this.user.surname;
    //this.model.storyauthor = this.user._id;
    //console.log("User _id:"+ this.user._id);
    //this.model.companyid = this.user.companyid;
    //console.log("Company _id:"+ this.user.companyid);
    

  },(err) => {
    console.log("not allowed");
  });

  this.authService.checkRole().then((data) => {
    //console.log("User Data:" + data);
    console.log(data);
    //this.user = data;
    this.role = data;
    //this.model.storyauthor = this.user._id;
    //console.log("User _id:"+ this.user._id);
    //this.model.companyid = this.user.companyid;
    //console.log("Company _id:"+ this.user.companyid);
    

  },(err) => {
    console.log("not allowed");
  });
  
 
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

     editprofile(){
      
         
         this.navCtrl.push(ProfileUpdatePage);
      
       }

    goToCompanyAdmin(){
      this.navCtrl.push(CompanyAdmin);
    }

    goToUserAdmin(){
      this.navCtrl.push(SignupPage);
    }
   
    goToArticlesAdmin(){
     this.navCtrl.push(ArticlesAdmin);
    }

    goToNewsAdmin(){
      this.navCtrl.push(ArticlesAdmin);
     }

    goToActivitiesAdmin(){
     this.navCtrl.push(ActivitiesAdmin);
    }
   
    goToStoriesAdmin(){
     this.navCtrl.push(StoriesAdmin);
    }
   
    goToThemesAdmin(){
      this.navCtrl.push(ThemesAdminComponent);
    }

    goToFAQUpdate(){
      this.navCtrl.push(FAQUpdatePage);
    }
   
    deleteImage(id){
      console.log(id);
      this.filesService.deleteFile(id).then((result) => {
        //this.loading.dismiss();
        console.log(result);
        //this.causeitems = result;
        console.log("file deleted");
    }, (err) => {
        //this.loading.dismiss();
        console.log(err);
    });
    
    }
  
}
