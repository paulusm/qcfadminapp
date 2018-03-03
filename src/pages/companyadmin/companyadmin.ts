import { Component, OnInit, ElementRef, Input  } from "@angular/core";
import { NavController, ModalController, AlertController, LoadingController } from 'ionic-angular';
import { Auth } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import { FileUploader } from 'ng2-file-upload';
import { Http, Response } from '@angular/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Company } from '../../providers/companies/company';
import { Companies } from '../../providers/companies/companies';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'company-admin',
  templateUrl: 'companyadmin.html'
})
export class CompanyAdmin implements OnInit {
 
  public uploader:FileUploader = new FileUploader({url:'https://ionic2-qcf-auth.herokuapp.com/api/files/upload'});
  
 
  public filePreviewPath: SafeUrl;
 
  public companyForm : FormGroup;
  model = new Company('','','','');
  //companies:any;
  loading: any;
 
  constructor(public navCtrl: NavController, public modalCtrl: ModalController,
    public alertCtrl: AlertController, public authService: Auth, 
    public loadingCtrl: LoadingController, private sanitizer: DomSanitizer,
    public companiesService:Companies) {
 
      
  }

  ngOnInit(){
    
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
  }

  save() {
    // call API to save customer
    console.log(this.model);
    let lcompany = {
    companyname : this.model.companyname,
    companydescription : this.model.companydescription,
    filename : this.model.filename,
    email : this.model.email
    }

    this.companiesService.createCompany(lcompany).then((result) => {
        //this.loading.dismiss();
        console.log(result);
        //this.causeitems = result;
        console.log("causeitem created");
    }, (err) => {
        //this.loading.dismiss();
        console.log(err);
    });

}
get currentCompany()
{
   return JSON.stringify(this.model); 
}


}
 
