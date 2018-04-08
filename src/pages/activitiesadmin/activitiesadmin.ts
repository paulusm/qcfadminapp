import { Component } from "@angular/core";
import { NavController, ModalController, AlertController, LoadingController } from 'ionic-angular';
//import { Todos } from '../../providers/to-dos/to-dos';
import { Auth } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import { Company } from '../../providers/companies/company';
import { Companies } from '../../providers/companies/companies';
import { Themes } from '../../providers/themes/themes';
import { Theme} from '../../providers/themes/theme';
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
  company:any;
  themes:any;
  user:any;
  activitytypes:string[] = ['Volunteering','Sponsorship','Other'];
  selectedActivityType:any;

//page controls
  sponsorship:boolean = false;
  volunteering:boolean = false;
  general:boolean = false;
  approval:boolean = false;
  activities:any;

  public model = new Activity('','','','',0,false,'','','','',this.likes,this.volunteers,this.sponsors);

  constructor(public navCtrl: NavController, public modalCtrl: ModalController,
    public alertCtrl: AlertController, public authService: Auth, 
    public loadingCtrl: LoadingController, public activitiesService:Activities,
    public companiesService:Companies, public themesService:Themes) {
 
  }

  ngOnInit(){
    

    this.authService.getUser().then((data) => {
      console.log(data);
      this.user = data;
      this.model.activityowner = this.user._id;
      console.log("User _id:"+ this.user._id);
      this.model.companyid = this.user.companyid;
      console.log("Company _id:"+ this.user.companyid);
          //get all companies and bind to select drop down
        this.companiesService.getCompanyByCompanyID(this.user.companyid).then((data) => {
          console.log(data);
          this.company = data;
          //this.model.companyid= this.company.companyid;
          //this.loadDataList();
        },(err) => {
          console.log("not allowed");
        });

    },(err) => {
      console.log("not allowed");
    });
    
    //console.log("User:" + this.user);
    

   
    
    this.themesService.getThemes().then((result) => {
      //this.loading.dismiss();
      console.log(result);
      this.themes = result;
    }, (err) => {
      //this.loading.dismiss();
      console.log(err);
    });

  }

  createVolunteer(){
    this.sponsorship = false;
    this.volunteering = true;
    this.approval = false;
    this.general = false;
    //this.selectedActivityType = "Volunteering";
  }

  createSponsorship(){
    this.sponsorship = true;
    this.volunteering = false;
    this.approval = false;
    this.general = false;
    //this.selectedActivityType = "Sponsorship";
  }

  createActivity(){
    this.sponsorship = false;
    this.volunteering = false;
    this.approval = false;
    this.general = false;
    //this.selectedActivityType = "Other";
    this.model = new Activity('','','','',0,false,'','','','',this.likes,this.volunteers,this.sponsors);
    this.model.activityowner = this.user._id;
    this.model.companyid = this.user.companyid;
  }

  approveActvities(){
    this.sponsorship = false;
    this.volunteering = false;
    this.approval = true;
    this.general = false;
    this.selectedActivityType = "";
    //Need to get all Activities for QCF, company ones for user...
    this.activitiesService.getActivitiesUnapproved(this.user.companyid).then((result) => {
      //this.loading.dismiss();
      console.log(result);
      this.activities = result;
    }, (err) => {
      //this.loading.dismiss();
      console.log(err);
    });

  }

  updateActivity(activity){

    this.model = activity;
    this.sponsorship = false;
    this.volunteering = false;
    this.approval = false;
    this.general = false;
    this.selectedActivityType = "";
  }

  approveActivity(activity){
    activity.approved = true;
    this.activitiesService.updateActivity(activity).then((result) => {
      console.log(result);
      this.model = new Activity('','','','',0,false,'','','','',this.likes,this.volunteers,this.sponsors);
      this.sponsorship = false;
      this.volunteering = false;
      this.approval = false;
      this.general = false;
      this.selectedActivityType = "";
    }, (err) => {
      //this.loading.dismiss();
      console.log(err);
    });
  }

  onselectedActivityType(type){
    this.model.activitytype = type;
    if(type.indexOf('Sponsorship')>=0){
      this.sponsorship = true;
    }else{
      this.sponsorship = false;
    }
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

  logout(){
    
       this.authService.logout();
       this.navCtrl.setRoot(LoginPage);
    
     }
}