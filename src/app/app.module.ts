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
import { ActivitiesAdmin } from '../pages/activitiesadmin/activitiesadmin';
import { StoriesAdmin } from '../pages/storiesadmin/storiesadmin';
import { ThemesAdminComponent } from '../pages/themesadmin/themesadmin';
import { ForgotPage } from '../pages/forgot/forgot';
import { ResetPage } from '../pages/reset/reset';
import { ProfileUpdatePage } from '../pages/profileupdate/profileupdate';
import { ImageUploadModule } from "angular2-image-upload";
import { IonicStorageModule } from '@ionic/storage';
import { Auth } from '../providers/auth/auth';
import { Activities } from '../providers/activities/activities';
import { Themes } from '../providers/themes/themes';
import { Files } from '../providers/files/files';
import { Users } from '../providers/users/users';
import { Companies } from '../providers/companies/companies';
import { Stories } from '../providers/stories/stories';
import { FileSelectDirective } from 'ng2-file-upload';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FAQUpdatePage } from '../pages/faq/faq';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    CompanyAdmin,
    ArticlesAdmin,
    ActivitiesAdmin,
    StoriesAdmin,
    ThemesAdminComponent,
    FileSelectDirective,
    ForgotPage,
    ResetPage,
    ProfileUpdatePage,
    FAQUpdatePage
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
    ActivitiesAdmin,
    StoriesAdmin,
    ForgotPage,
    ResetPage,
    ProfileUpdatePage,
    FAQUpdatePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Auth,
    Themes,
    Activities,
    Files,
    Companies,
    Users,
    Stories
    
  ]
})
export class AppModule {}
