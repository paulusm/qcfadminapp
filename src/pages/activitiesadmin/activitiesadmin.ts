import { Component } from "@angular/core";
import { NavController, ModalController, AlertController, LoadingController } from 'ionic-angular';
//import { Todos } from '../../providers/to-dos/to-dos';
import { Auth } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import { Themes } from '../../providers/themes/themes';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Activities } from '../../providers/activities/activities';
import { Activity } from '../../providers/activities/activity';

//import { FileUploader } from 'ng2-file-upload';
//import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { HomePage } from '../home/home';


@Component({
  selector: 'activities-admin',
  templateUrl: 'activitiesadmin.html'
})
export class ActivitiesAdmin {
 
  todos: any;
  loading: any;
  sponsors:any;
  volunteers:any;
  likes:any;
  public model = new Activity('','','','',0,false,'','','','',this.likes,this.volunteers,this.sponsors);

  constructor(public navCtrl: NavController, public modalCtrl: ModalController,
    public alertCtrl: AlertController, public authService: Auth, 
    public loadingCtrl: LoadingController, public activitiesService:Activities) {
 
  }


  createVolunteer(){

  }

  createSponsorship(){

  }

  createOther(){

  }

  save(){
    // call API to save customer
  console.log(this.model);
 /*  let lcompany = {
  companyname : this.model.companyname,
  companydescription : this.model.companydescription,
  filename : this.model.filename,
  email : this.model.email,
  themes: this.model.themes
  } */

  this.activitiesService.createActivity(this.model).then((result) => {
      //this.loading.dismiss();
      console.log(result);
      //this.causeitems = result;
      console.log("Activity created");

      let alert = this.alertCtrl.create({
        title: 'Activity Created Successfully',
        subTitle: 'This activity has been created and saved to the database.',
        buttons: [{
          text: 'OK',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
            this.navCtrl.setRoot(HomePage);
          }
        }]
      });
      alert.present();

  }, (err) => {

    let alert = this.alertCtrl.create({
      title: 'Error Updating Activity',
      subTitle: 'Please contact admin :-(',
      buttons: [{
        text: 'OK',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
          this.navCtrl.setRoot(HomePage);
        }
      }]
    });
    alert.present();
      //this.loading.dismiss();
      console.log(err);
  });
  }

}