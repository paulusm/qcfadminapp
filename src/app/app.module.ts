import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CompanyAdmin } from '../pages/companyadmin/companyadmin';
import { ArticlesAdmin } from '../pages/articlesadmin/articlesadmin';
import { EventsAdmin } from '../pages/eventsadmin/eventsadmin';
import { StoriesAdmin } from '../pages/storiesadmin/storiesadmin';
import { ThemesAdminComponent } from '../pages/themesadmin/themesadmin';
import { ForgotPage } from '../pages/forgot/forgot';
import { ResetPage } from '../pages/reset/reset';
import { ImageUploadModule } from "angular2-image-upload";
import { IonicStorageModule } from '@ionic/storage';
import { Auth } from '../providers/auth/auth';
import { Events } from '../providers/events/events';
import { Themes } from '../providers/themes/themes';
import { Files } from '../providers/files/files';
import { Companies } from '../providers/companies/companies';
import { FileSelectDirective } from 'ng2-file-upload';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    CompanyAdmin,
    ArticlesAdmin,
    EventsAdmin,
    StoriesAdmin,
    ThemesAdminComponent,
    FileSelectDirective,
    ForgotPage,
    ResetPage
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    IonicModule.forRoot(MyApp),
    ImageUploadModule.forRoot(),
    IonicStorageModule.forRoot(
      {
        name:'__mydb',
        driverOrder:['indexeddb','sqlite','websql']
      }
    )
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    CompanyAdmin,
    ArticlesAdmin,
    ThemesAdminComponent,
    EventsAdmin,
    StoriesAdmin,
    ForgotPage,
    ResetPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Auth,
    Themes,
    Events,
    Files,
    Companies
    
  ]
})
export class AppModule {}
