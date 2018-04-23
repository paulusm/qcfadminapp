/*
Class created by: Alistair Dewar
Date Created: Feb 2018
Purpose: Add new articles and storeis and view and approve.
*/
import { Component } from "@angular/core";
import { NavController, ModalController, AlertController, LoadingController } from 'ionic-angular';
import { Auth } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import { Story } from '../../providers/stories/story';
import { Stories } from '../../providers/stories/stories'; 
import { Themes } from '../../providers/themes/themes';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { HomePage } from '../home/home';

@Component({
  selector: 'stories-admin',
  templateUrl: 'storiesadmin.html'
})

//This component is used to edit, create and view News, Articles and Stories..
export class StoriesAdmin {
  likes:any;
  //Main model for data objects being displayed
  public model = new Story('','','','','','',this.likes,'Story', false, '5ab7dbc0bc24e3001440543c','');
  //File uploader
  public uploader:FileUploader = new FileUploader({url:'https://ionic2-qcf-auth.herokuapp.com/api/files/upload'});
  public filePreviewPath: SafeUrl;
  filename:string;
  loading: any;
   
  //themescontrol = new FormControl();
  themes:any;
  selectedThemes:any;
  selectedValues:string;
  articletypes:string[] = ['Article','Story','News'];
  selectedArticleType:any;

  //Switches for controlling display controls
  news:boolean = false;
  article:boolean = false;
  story:boolean = false;
  approve:boolean = false;
  approveselected:boolean = false;
  stories:any;
  user:any;
  //Role, setting default to lowest level of access.
  role:string='Employee';
  getall:boolean=false;
  getunapproved:boolean=false;
  createnew:boolean = true;


  constructor(public navCtrl: NavController, public modalCtrl: ModalController,
    public alertCtrl: AlertController, public authService: Auth, public loadingCtrl: LoadingController,
    public storiesService :Stories, public themesService:Themes, private sanitizer: DomSanitizer) {
 
  }

  //Get key data on loading view and setup objects
ngOnInit(){
  this.uploader.onBeforeUploadItem = (item) => {
    item.withCredentials = false;
  }

  this.uploader.onAfterAddingFile = (fileItem) => {
    console.log("onAfterAddingFile");
    this.filePreviewPath  = this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(fileItem._file)));
    
    console.log(fileItem.file.name);
  };

  this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
    console.log("ImageUpload:uploaded:", item, status, response);
    let obj = JSON.parse(response);
    this.model.imagepath = obj.filename;
  };

  //Get logged on user object and change choice list settings.
  this.authService.getUser().then((data) => {
    console.log("User Data:" + data);
    this.user = data;
    this.role = this.user.role;
    if(this.role=='BusinessAdmin'){
      this.articletypes = ['Story'];
    }
    this.model.storyauthor = this.user._id;
    console.log("User _id:"+ this.user._id);
    this.model.companyid = this.user.companyid;
    console.log("Company _id:"+ this.user.companyid);
      
  },(err) => {
    console.log("not allowed");
  });

  //Get themes for drop down choice.
  this.themesService.getThemes().then((result) => {
    console.log(result);
    this.themes = result;
  }, (err) => {
    console.log(err);
  });

}

//Theme Drop Down event handler
onSelectTheme(themeid){
  //update model with selected Theme.
       this.model.themeid = themeid ;
}

//Article Type event handler
onselectedArticleType(articleType){
  this.model.type = articleType;
}

createArticle(){
  this.news = false;
  this.story = false;
  this.approve = false;
  this.article = true;
  this.approveselected = false;
  this.selectedArticleType = "Article";
}

//Called only by QCF Admin
createStories(){
  this.news = false;
  this.story = false;
  this.approve = false;
  this.article = false;
  this.selectedArticleType = "";
  this.model = new Story('','','','','','',this.likes,'Story', false, this.user.companyid,'');
  this.createnew=true;
  this.getall=false;
  this.getunapproved=false;
}

//Called only by Business Admin
approveStories(){
  this.news = false;
  this.story = false;
  this.approve = true;
  this.article = false;
  this.selectedArticleType = "";
  var theme:any;

  this.storiesService.getStoriesByCompanyId(this.user.companyid).then((result) => {
    console.log("Returned Stories:" + result);
    this.stories = result;
    for(let i=0; i< this.stories.length;i++){
      console.log(this.stories[i].themeid);
      theme = this.themes.find(theme => theme._id === this.stories[i].themeid);
      console.log("Theme:" + theme);
      if(theme){
        this.stories[i].themename = theme.name;
      }
      
    }
  }, (err) => {
    console.log(err);
  });
  this.createnew=false;
  this.getall=false;
  this.getunapproved=true;
}

//Called only by QCFAdmin
updateStories(){
  this.news = false;
  this.story = true;
  this.approve = false;
  this.article = false;
  this.selectedArticleType = "";
  var theme:any;

  this.storiesService.getStories().then((result) => {
    console.log("Returned Stories:" + result);
    this.stories = result;
    for(let i=0; i< this.stories.length;i++){
      console.log(this.stories[i].themeid);
      theme = this.themes.find(theme => theme._id === this.stories[i].themeid);
      console.log("Theme:" + theme);
      if(theme){
        this.stories[i].themename = theme.name;
      }
      
    }
  }, (err) => {
    console.log(err);
  });
  this.createnew=false;
  this.getall=true;
  this.getunapproved=false;
}

//Save current model as approved..
approveStory(){
          this.model.approved = true;
          this.storiesService.updateStory(this.model).then((result) => {
            console.log("Article created");
            let alert = this.alertCtrl.create({
              title: 'Article Approved Successfully',
              subTitle: 'This article has been updated and saved to the database.',
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
            title: 'Error Approving Article',
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
            console.log(err);
        });

}

//Call the Update method for existing story
updateStory(){
  console.log(this.model);
  this.storiesService.updateStory(this.model).then((result) => {
      console.log(result);
      console.log("Article updated");

      let alert = this.alertCtrl.create({
        title: 'Article Updated Successfully',
        subTitle: 'This article has been updated and saved to the database.',
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
      title: 'Error Updating Article',
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
      console.log(err);
  });

}

//Called when individual article selected for update.
editStory(story){
this.story = true;
this.createnew = true;
this.getall = false;
this.getunapproved = false;
this.model = story;
this.selectedThemes = story.themeid;
this.selectedArticleType = story.type;
}

//called when individual article selected for preview
viewStory(story){
  
  this.model = story;
  }

//now redundant.
onSelectStory(storyid){
  console.log("StoryID:" + storyid);
  //console.log("Stories:" + this.stories);
 this.model.storytitle = storyid.storytitle;
 this.model.story = storyid.story;
 this.model.storyauthor = storyid.storyauthor;
 this.approveselected = true;
  /* this.model = this.stories.find(function (obj) { 
    console.log("Object:" + obj);
    return obj._id === storyid; 
  }); */
  
}

//Call the create method
save(){
    // call API to save customer
    console.log(this.model);
    this.model.publisheddate = Date(); 
    if(this.user.role == 'QCFAdmin'){
      this.model.approved = true;
    }
    this.storiesService.createStory(this.model).then((result) => {
        console.log("Article created");
        let alert = this.alertCtrl.create({
          title: 'Article Created Successfully',
          subTitle: 'This article has been created and saved to the database.',
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
        title: 'Error Updating Article',
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