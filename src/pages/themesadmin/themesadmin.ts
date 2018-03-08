import {ChangeDetectorRef, AfterViewInit, Component, OnInit} from "@angular/core";
import { NavController, ModalController, AlertController, LoadingController } from 'ionic-angular';
import { Theme } from '../../providers/themes/theme';
import { Themes } from '../../providers/themes/themes';
//import { Companies } from '../../providers/companies/companies';
import { Auth } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
//import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Validators, FormBuilder,FormControl, FormGroup, FormArray } from '@angular/forms';
import * as _ from 'lodash';

@Component({
 // moduleId: module.id,
  selector: 'themes-admin',
  templateUrl: 'themesadmin.html'
})
export class ThemesAdminComponent implements OnInit {
  public myForm:FormGroup;
  model = new Theme('',null);
  loading: any;
  
  

  constructor(public navCtrl: NavController, public modalCtrl: ModalController,
    public alertCtrl: AlertController, public authService: Auth, public loadingCtrl: LoadingController,
    public themesService: Themes,private cd: ChangeDetectorRef,private _fb: FormBuilder) {
        
       
  }

ngOnInit() {

    this.myForm = this._fb.group({
    name: ['', [Validators.required, Validators.minLength(5)]],
    areas: this._fb.array([
        this.initSubTheme(),
    ])
    });

}

initSubTheme() {
// initialize our address
    return this._fb.group({
    area: ['', Validators.required]
    });
}

addSubTheme() {
    // add address to the list
    const control = <FormArray>this.myForm.controls['areas'];
    control.push(this.initSubTheme());
}

removeSubTheme(i: number) {
    // remove address from the list
    const control = <FormArray>this.myForm.controls['areas'];
    control.removeAt(i);
}


  save(model:Theme){
    console.log(this.myForm.value);
    //var ltheme = JSON.parse(this.myForm.value);
    console.log(this.myForm.controls['areas'].value);
    //model.name = 

    console.log("Name:" + this.model.name + "; subThemes:" + this.model.areas);
        this.themesService.createTheme(this.myForm.value).then((result) => {
            //this.loading.dismiss();
            console.log(result);
            //this.causeitems = result;
            console.log("theme created");
        }, (err) => {
            //this.loading.dismiss();
            console.log(err);
        });
    
    console.log(model);
  }

    
private getThemeData(): Theme {
    this.themesService.getThemes().then((result) => {
        //this.loading.dismiss();
        console.log(result);
        return result;
    }, (err) => {
        //this.loading.dismiss();
        console.log(err);
        return err;
    });
    return null;

}

}


