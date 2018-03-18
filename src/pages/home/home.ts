import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Auth } from '../../providers/auth/auth';
import { Files} from '../../providers/files/files';
import { LoginPage } from '../login/login';
import { CompanyAdmin } from '../companyadmin/companyadmin';
import { SignupPage } from '../signup/signup';
import { ArticlesAdmin } from '../articlesadmin/articlesadmin';
import { EventsAdmin } from '../eventsadmin/eventsadmin';
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


  constructor(public navCtrl: NavController, public authService: Auth,public loadingCtrl:LoadingController) {
 
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

    goToCompanyAdmin(){
      this.navCtrl.push(CompanyAdmin);
    }

    goToUserAdmin(){
      this.navCtrl.push(SignupPage);
    }
   
    goToArticlesAdmin(){
     this.navCtrl.push(ArticlesAdmin);
    }
    goToEventsAdmin(){
     this.navCtrl.push(EventsAdmin);
    }
   
    goToStoriesAdmin(){
     this.navCtrl.push(StoriesAdmin);
    }
   
    goToThemesAdmin(){
      this.navCtrl.push(ThemesAdminComponent);
    }

    goToProfileUpdate(){
      this.navCtrl.push(ProfileUpdatePage);
    }
   
    
  
}
