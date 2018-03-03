import { Component, OnInit} from "@angular/core";
import { NavController, ModalController, AlertController, LoadingController } from 'ionic-angular';
import { Theme } from '../../providers/themes/theme';
import { Themes } from '../../providers/themes/themes';
import { Auth } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
//import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
 // moduleId: module.id,
  selector: 'themes-admin',
  templateUrl: 'themesadmin.html'
})
export class ThemesAdminComponent implements OnInit {
  
  public themeForm: FormGroup;
    //public theme:Theme;
  //themes: any;
  loading: any;
  model = new Theme('','','','','Y');

  constructor(public navCtrl: NavController, public modalCtrl: ModalController,
    public alertCtrl: AlertController, public authService: Auth, public loadingCtrl: LoadingController,
    private _fb: FormBuilder, public themesService: Themes) {
 
  }

  ngOnInit() {
   /*    console.log("initialising form")
    /* this.themeForm = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      areaname: ['', [Validators.required, Validators.minLength(5)]],
      companyname: ['', [Validators.required, Validators.minLength(5)]],
      subject: ['', [Validators.required, Validators.minLength(5)]],
      selected: ['', [Validators.required, Validators.minLength(1)]]
      /* subThemes: this._fb.array([ 
          this.initSubTheme(),
      ]) 
  });
  console.log("completed sub theme") */
  }

  initSubTheme() {
    console.log("initialising sub theme")
    // initialize our address
    return this._fb.group({
        area: ['', Validators.required]
        
    });
    
    }

addSubTheme() {
// add address to the list
const control = <FormArray>this.themeForm.controls['subThemes'];
control.push(this.initSubTheme());
}

removeSubTheme(i: number) {
// remove address from the list
const control = <FormArray>this.themeForm.controls['subThemes'];
control.removeAt(i);
}
  
save() {
    // call API to save customer
    console.log(this.model);
    console.log("AReaname" + this.model.areaname);

    let ltheme = {
    name : this.model.name,
    areaname : this.model.areaname,
    companyname : this.model.companyname,
    subject : this.model.subject,
    selected : this.model.selected
    
    }

    this.themesService.createTheme(ltheme).then((result) => {
        //this.loading.dismiss();
        console.log(result);
        //this.causeitems = result;
        console.log("causeitem created");
    }, (err) => {
        //this.loading.dismiss();
        console.log(err);
    });

}
get currentTheme() { return JSON.stringify(this.model); }
}



