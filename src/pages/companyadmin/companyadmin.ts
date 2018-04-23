/*
Class created by: Alistair Dewar
Date Created: Feb 2018
Purpose: Code behind for Company Admin page  used to create and update companies in Civitaz.
*/


import { Component, OnInit, ElementRef, Input, ViewChild  } from "@angular/core";
import { NavController, ModalController, AlertController, LoadingController, Select } from 'ionic-angular';
import { Auth } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import { FileUploader } from 'ng2-file-upload';
import { Http, Response } from '@angular/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Company } from '../../providers/companies/company';
import { Companies } from '../../providers/companies/companies';
import { Themes } from '../../providers/themes/themes';
import { Theme} from '../../providers/themes/theme';
import { Files } from '../../providers/files/files';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { HomePage } from '../home/home';
import { Events } from 'ionic-angular';

@Component({
  selector: 'company-admin',
  templateUrl: 'companyadmin.html'
})

export class CompanyAdmin implements OnInit {
 
  //Handles file uploads
  public uploader:FileUploader = new FileUploader({url:'https://ionic2-qcf-auth.herokuapp.com/api/files/upload'});
  public filePreviewPath: SafeUrl;
  public companyForm : FormGroup;
  //model:Company;
  loading: any;
  companies:any;
  themescontrol = new FormControl();
  themes:any;
  model = new Company('','','','','',this.themes);
  
  selectedThemes:any;
  selectedValues:string;
  filename:string;

  updateexistingcompany:any;
  createnewcompany:any;
  updatecompany:any;

  fileRetrievePath:string;
  user:any;
  role:string = 'Employee';

  @ViewChild('select1') select1: Select;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController,
    public alertCtrl: AlertController, public authService: Auth, 
    public loadingCtrl: LoadingController, private sanitizer: DomSanitizer,
    public companiesService:Companies, public themesService:Themes,
  public filesService:Files, public events:Events ) {
 
      
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
      this.model.filename = obj.filename;
    };

    //get all companies and bind to select drop down
    this.companiesService.getCompanies().then((data) => {
      console.log(data);
      this.companies = data;
      //this.loadDataList();
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

    this.authService.getUser().then((data) => {
      //console.log("User Data:" + data);
      this.user = data;
      this.role = this.user.role;
      //this.model.storyauthor = this.user._id;
      //console.log("User _id:"+ this.user._id);
      //this.model.companyid = this.user.companyid;
      //console.log("Company _id:"+ this.user.companyid);
      
  
    },(err) => {
      console.log("not allowed");
    });

  }

  openSelect()
  {
      this.select1.open();
  }

  closeSelect()
  {
      this.select1.close();
  }


get currentCompany()
{
   return JSON.stringify(this.model); 
}



//Selection event handlers, used to maintain model state....
onSelectTheme(theme){
  
  //console.log(theme); //Here I want the changed value
 
  
  //console.log("Array Length:" + theme.length);
  this.model.themes = [];
  for(let theme of this.selectedThemes)
  {
    this.model.themes.push(theme);

  } 
  
  console.log(this.model);
}

//When updating a company and selected one from list....
selectItem(company){
  console.log(company);
  this.companiesService.getCompanyByCompanyName(company).then((result) => {
    //this.loading.dismiss();
    console.log("Test1" + result['company']['companydescription']);
    this.model._id = result['company']['_id'];
    this.model.companyname =  result['company']['companyname'];
    this.model.companydescription =  result['company']['companydescription'];
    this.model.email =  result['company']['email'];
    this.model.filename =  result['company']['filename'];
    this.model.themes = result['company']['themes'];
    this.selectedThemes = result['company']['themes'];
    this.fileRetrievePath = "https://ionic2-qcf-auth.herokuapp.com/api/files/file/" + result['company']['filename'];

  }, (err) => {
      //this.loading.dismiss();
      console.log(err);
  });
}

//Button event handlers, used to change state of controls
updateexisting(){
  this.updateexistingcompany = 'true';
  this.createnewcompany = 'false';
  this.updatecompany='false';
}

updatemycompany(){
  this.updateexistingcompany = 'true';
  this.createnewcompany = 'false';
  this.updatecompany='true';
  this.companiesService.getCompanyByCompanyID(this.user.companyid).then((result) => {
    this.model._id = result['company']['_id'];
    this.model.companyname =  result['company']['companyname'];
    this.model.companydescription =  result['company']['companydescription'];
    this.model.email =  result['company']['email'];
    this.model.filename =  result['company']['filename'];
    this.model.themes = result['company']['themes'];
    this.selectedThemes = result['company']['themes'];
    //this.colourtheme = 'app-color-theme-3';
    this.fileRetrievePath = "https://ionic2-qcf-auth.herokuapp.com/api/files/file/" + result['company']['filename'];

  }, (err) => {
      //this.loading.dismiss();
      console.log(err);
  });
}

createnew(){
  this.updateexistingcompany = 'false';
  this.createnewcompany = 'true';
  this.updatecompany='false';
  this.model = new Company('','','','','',this.themes);
}

//CRUD methods for model in this form...
save() {
  // call API to save customer
  console.log(this.model);
  let lcompany = {
  companyname : this.model.companyname,
  companydescription : this.model.companydescription,
  filename : this.model.filename,
  email : this.model.email,
  themes: this.model.themes
  }

  this.companiesService.createCompany(lcompany).then((result) => {
      //this.loading.dismiss();
      console.log(result);
      //this.causeitems = result;
      console.log("Company created");

      let alert = this.alertCtrl.create({
        title: 'Company Created Successfully',
        subTitle: 'This company has been created and saved to the database.',
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
      title: 'Error Updating Company',
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

update(){
  let lcompany = {
    _id: this.model._id,
    companyname : this.model.companyname,
    companydescription : this.model.companydescription,
    filename : this.model.filename,
    email : this.model.email,
    themes : this.model.themes
    }

    this.companiesService.updateCompany(lcompany).then((result) => {
      console.log(result);

      let alert = this.alertCtrl.create({
        title: 'Company Updated Successfully',
        subTitle: 'This company has been updated and saved to the database.',
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
        title: 'Error Updating Company',
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
    });

}

delete(company){

}

logout(){
  
     this.authService.logout();
     this.navCtrl.setRoot(LoginPage);
  
   }

}
 
