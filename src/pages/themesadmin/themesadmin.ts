import {ChangeDetectorRef, AfterViewInit, Component, OnInit,NgZone} from "@angular/core";
import { NavController, ModalController, AlertController, LoadingController, Events } from 'ionic-angular';
import { Theme } from '../../providers/themes/theme';
import { Themes } from '../../providers/themes/themes';
//import { Companies } from '../../providers/companies/companies';
import { Auth } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
//import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Validators, FormBuilder,FormControl, FormGroup, FormArray } from '@angular/forms';
import * as _ from 'lodash';
import { Location } from "@angular/common";

@Component({
 // moduleId: module.id,
  selector: 'themes-admin',
  templateUrl: 'themesadmin.html'
})
export class ThemesAdminComponent implements OnInit {
  public myForm:FormGroup;
  model = new Theme('',null);
  loading: any;
  themes:any;

  

  constructor(public navCtrl: NavController, public modalCtrl: ModalController,
    public alertCtrl: AlertController, public authService: Auth, public loadingCtrl: LoadingController,
    public themesService: Themes,private cd: ChangeDetectorRef,private _fb: FormBuilder,
    public events:Events, private zone: NgZone) {
        
        this.events.subscribe('updateScreen', () => {
            this.zone.run(() => {
              console.log('force update the screen');
            });
          });
      

       
  }

ngOnInit() {

    this.themesService.getThemes().then((result) => {
        //this.loading.dismiss();
        console.log("Result" + result);
        console.log(result[0].name);
        console.log(result[0].id);
        this.themes = result;
        console.log(this.themes[0].name)
      }, (err) => {
        //this.loading.dismiss();
        console.log(err);
      });
    

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
    //window.location.reload();
    this.events.publish('updateScreen');
  }

  deleteTheme(theme){
    this.themesService.deleteTheme(theme.name).then((result) => {
        //this.loading.dismiss();
        console.log(result);
        //this.causeitems = result;
        console.log("theme deleted");
    }, (err) => {
        //this.loading.dismiss();
        console.log(err);
    });
    this.events.publish('updateScreen');
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


