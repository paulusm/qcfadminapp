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

export class StoriesAdmin {
  likes:any;
  public model = new Story('','','','','','',this.likes,'Story', false, '5ab7dbc0bc24e3001440543c');
  public uploader:FileUploader = new FileUploader({url:'https://ionic2-qcf-auth.herokuapp.com/api/files/upload'});
  public filePreviewPath: SafeUrl;
  filename:string;
  loading: any;
   
  themescontrol = new FormControl();
  themes:any;
  selectedThemes:any;
  selectedValues:string;
  articletypes:string[] = ['Article','Story','News'];
  selectedArticleType:any;

  news:boolean = false;
  article:boolean = false;
  story:boolean = false;
  approve:boolean = false;
  approveselected:boolean = false;
  stories:any;
  user:any;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController,
    public alertCtrl: AlertController, public authService: Auth, public loadingCtrl: LoadingController,
    public storiesService :Stories, public themesService:Themes, private sanitizer: DomSanitizer) {
 
  }

ngOnInit(){
  this.uploader.onBeforeUploadItem = (item) => {
    item.withCredentials = false;
  }

  //this.uploader.
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

  this.authService.getUser().then((data) => {
    console.log(data);
    this.user = data;
    this.model.storyauthor = this.user._id;
    console.log("User _id:"+ this.user._id);
    this.model.companyid = this.user.companyid;
    console.log("Company _id:"+ this.user.companyid);
        //get all companies and bind to select drop down
      /* this.companiesService.getCompanyByCompanyID(this.user.companyid).then((data) => {
        console.log(data);
        this.company = data;
        //this.model.companyid= this.company.companyid;
        //this.loadDataList();
      },(err) => {
        console.log("not allowed");
      }); */

  },(err) => {
    console.log("not allowed");
  });


  this.themesService.getThemes().then((result) => {
    //this.loading.dismiss();
    console.log(result);
    this.themes = result;
  }, (err) => {
    //this.loading.dismiss();
    console.log(err);
  });

}

onSelectTheme(themeid){
       this.model.themeid = themeid ;
 // console.log(this.model);
}

onselectedArticleType(articleType){
  this.model.type = articleType;
}

createNews(){
  this.news = true;
  this.story = false;
  this.approve = false;
  this.article = false;
  this.approveselected = false;
  this.selectedArticleType = "News";
}

createStory(){
  this.news = false;
  this.story = true;
  this.approve = false;
  this.article = false;
  this.approveselected = false;
  this.selectedArticleType = "Story";
}

createArticle(){
  this.news = false;
  this.story = false;
  this.approve = false;
  this.article = true;
  this.approveselected = false;
  this.selectedArticleType = "Article";
}

approveStories(){
  this.news = false;
  this.story = false;
  this.approve = true;
  this.article = false;
  this.selectedArticleType = "";

  this.storiesService.getUnapprovedStories(this.model.companyid).then((result) => {
    //this.loading.dismiss();
    console.log("Returned Stories:" + result);
    this.stories = result;
  }, (err) => {
    //this.loading.dismiss();
    console.log(err);
  });
}

//Save current model.
approveStory(){

          console.log(this.model);
          this.model.approved = true;
          
          this.storiesService.updateStory(this.model).then((result) => {
            //this.loading.dismiss();
            console.log(result);
            //this.causeitems = result;
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
            //this.loading.dismiss();
            console.log(err);
        });

}

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

save(){
    // call API to save customer
    console.log(this.model);
   /*  let lArticle = {
    story : this.model.companyname,
    companydescription : this.model.companydescription,
    filename : this.model.filename,
    email : this.model.email,
    themes: this.model.themes
    } */
    this.model.publisheddate = '2018/04/01'; 
    this.storiesService.createStory(this.model).then((result) => {
        //this.loading.dismiss();
        console.log(result);
        //this.causeitems = result;
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

}