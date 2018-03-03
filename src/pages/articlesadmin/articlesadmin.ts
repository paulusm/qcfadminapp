import { Component } from "@angular/core";
import { NavController, ModalController, AlertController, LoadingController } from 'ionic-angular';
//import { Todos } from '../../providers/to-dos/to-dos';
import { Auth } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
 
@Component({
  selector: 'articles-admin',
  templateUrl: 'articlesadmin.html'
})
export class ArticlesAdmin {
 
  todos: any;
  loading: any;
 
  constructor(public navCtrl: NavController, public modalCtrl: ModalController,
    public alertCtrl: AlertController, public authService: Auth, public loadingCtrl: LoadingController) {
 
  }
}