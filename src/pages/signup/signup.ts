import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Auth } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { Company } from '../../providers/companies/company';
import { Companies } from '../../providers/companies/companies';

@Component({
  selector: 'signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
 
  roles:string[] = ['Employee','BusinessAdmin','QCFAdmin'];
  
  user:any;
  role: string;
  email: string;
  password: string;
  companyid: string;
  isfirstlogin: 'true';
  loading: any;

  accountnames:string;
  companies:any;
  selectedCompany:any;
  selectedRole:any;


  constructor(public navCtrl: NavController, public authService: Auth, 
    public loadingCtrl: LoadingController, public companiesService:Companies) {
 
  }
 
  ngOnInit(){
    
    //get all companies and bind to select drop down
    this.companiesService.getCompanies().then((data) => {
      console.log(data);
      this.companies = data;
      //this.loadDataList();
    },(err) => {
      console.log("not allowed");
    });
    
    this.authService.getUser().then((data) => {
      this.user = data;
      this.role = this.user.role;
      if(this.role != 'QCFAdmin' )
      {
        this.roles = ['Employee','BusinessAdmin'];
      }
    },(err) => {
      console.log("not allowed");
    });
  }

  selectCompany(companyid){
     this.companyid =  companyid;
     if(companyid!='5ab7dbc0bc24e3001440543c')
     {
       this.selectedRole =  null;
     }
  }

  selectRole(role){
    if(role=='QCFAdmin')
    {
      this.companyid = '5ab7dbc0bc24e3001440543c';
      this.selectedCompany = '5ab7dbc0bc24e3001440543c';
    }
  }

  registerEmployees(){
 
    console.log("Running Register");
    this.showLoader();
 
    var aacountnames = this.accountnames.split(",");

    for(let str of aacountnames)
    {

      let details = {
        email: str,
        password: 'password',
        role: 'Employee',
        companyid: this.companyid
      }

      console.log(details);
      this.authService.createAccount(details).then((result) => {
        this.loading.dismiss();
        console.log(result);
        //this.navCtrl.setRoot(HomePage);
      }, (err) => {
          this.loading.dismiss();
      });

    }
 
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
 
}
